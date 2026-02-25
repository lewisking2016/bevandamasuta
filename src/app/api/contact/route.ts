import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { first_name, last_name, email, country_code, phone_number, service_interest, subject, message } = body;

        // 1. Basic Validation
        if (!first_name || !last_name || !email || !country_code || !phone_number || !service_interest || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // 2. Save to MySQL Database
        const dbConnection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'bevandamasuta_db',
        });

        const insertQuery = `
            INSERT INTO contacts (first_name, last_name, email, country_code, phone_number, service_interest, subject, message) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await dbConnection.execute(insertQuery, [first_name, last_name, email, country_code, phone_number, service_interest, subject, message]);
        await dbConnection.end();

        // 3. Send Email Notification via Nodemailer
        // NOTE: Make sure these environment variables are actually configured in .env.local
        // For local development without SMTP, we can log to console, but the user requested an active email system
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "mail.bevandamasuta.com",
            port: 587, // Try 587 for STARTTLS
            secure: false, // false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Test configuration (optional but good for debugging)
        // await transporter.verify();

        const mailOptions = {
            from: process.env.SMTP_USER, // Simplest possible from address to avoid being flagged as spoofing
            to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
            subject: `Inquiry from ${first_name} - Ref: ${Date.now().toString().slice(-6)}`,
            text: `
Hello,

You have received a new contact submission from your website.

Sender: ${first_name} ${last_name}
Email: ${email}
Phone: ${country_code} ${phone_number}
Service Requested: ${service_interest}
Topic: ${subject}

---
Message:
${message}
---

This is an automated notification from bevandamasuta.com.
            `,
            html: `
                <div style="font-family: sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
                    <h2 style="color: #8D1B3D; margin-top: 0;">New Website Inquiry</h2>
                    <p style="margin-bottom: 20px; color: #666;">You've received a new message from the Bevanda Masuta contact form.</p>
                    
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 8px;">
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Name:</strong> ${first_name} ${last_name}</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Phone:</strong> ${country_code} ${phone_number}</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Interest:</strong> ${service_interest}</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
                    </div>

                    <div style="margin-top: 24px;">
                        <h4 style="margin-bottom: 10px;">Message:</h4>
                        <div style="background: #fff; border: 1px solid #eee; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
                    </div>

                    <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                        This inquiry was sent from the official Bevanda Masuta website.
                    </p>
                </div>
            `,
            headers: {
                'Message-ID': `<${Date.now()}@bevandamasuta.com>`,
                'Date': new Date().toUTCString(),
            }
        };

        // If SMTP credentials aren't provided in the environment, prevent crashing and just log
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
            console.log("Email notification sent.");
        } else {
            console.log("SMTP Credentials missing. Email notification skipped, but data saved to DB.");
        }

        return NextResponse.json({ success: true, message: "Message received successfully." });

    } catch (error) {
        console.error("Contact Form API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
