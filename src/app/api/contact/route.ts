import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

type ContactPayload = {
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    phone_number: string;
    service_interest: string;
    subject: string;
    message: string;
};

const mailboxEmail = "info@bevandamasuta.com";

function normalize(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderDetailsHtml(contact: ContactPayload) {
    const fullName = escapeHtml(`${contact.first_name} ${contact.last_name}`);
    const email = escapeHtml(contact.email);
    const phone = escapeHtml(`${contact.country_code} ${contact.phone_number}`);
    const service = escapeHtml(contact.service_interest);
    const subject = escapeHtml(contact.subject);
    const message = escapeHtml(contact.message).replace(/\n/g, "<br />");

    return `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1a1a1a; max-width: 640px; border: 1px solid #eee; border-radius: 12px;">
            <h2 style="color: #8D1B3D; margin: 0 0 8px;">New Website Inquiry</h2>
            <p style="margin: 0 0 22px; color: #666;">A new submission came through the Bevanda Masuta contact form.</p>

            <div style="background: #f8f6f2; padding: 20px; border-radius: 8px;">
                <p style="margin: 8px 0; font-size: 14px;"><strong>Name:</strong> ${fullName}</p>
                <p style="margin: 8px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 8px 0; font-size: 14px;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 8px 0; font-size: 14px;"><strong>Interest:</strong> ${service}</p>
                <p style="margin: 8px 0; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
            </div>

            <div style="margin-top: 24px;">
                <h3 style="font-size: 16px; margin: 0 0 10px;">Message</h3>
                <div style="background: #fff; border: 1px solid #eee; padding: 16px; border-radius: 8px; line-height: 1.6;">${message}</div>
            </div>

            <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 18px;">
                Sent from bevandamasuta.com.
            </p>
        </div>
    `;
}

function renderClientHtml(contact: ContactPayload) {
    const firstName = escapeHtml(contact.first_name);
    const service = escapeHtml(contact.service_interest);
    const subject = escapeHtml(contact.subject);
    const message = escapeHtml(contact.message).replace(/\n/g, "<br />");

    return `
        <div style="font-family: Arial, sans-serif; color: #24181b; max-width: 640px; margin: 0 auto; padding: 28px; border: 1px solid #eadfcb; border-radius: 14px; background: #fffdf8;">
            <p style="margin: 0 0 8px; color: #C5A059; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">Bevanda Masuta</p>
            <h1 style="margin: 0 0 16px; color: #8D1B3D; font-size: 28px; line-height: 1.2;">We received your message</h1>
            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 18px;">Hi ${firstName},</p>
            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 18px;">
                Thank you for reaching out to Bevanda Masuta. Your inquiry has been received, and our team will review it and get back to you shortly.
            </p>

            <div style="background: #f8f1e4; border-radius: 10px; padding: 18px; margin: 24px 0;">
                <p style="margin: 0 0 8px;"><strong>Service:</strong> ${service}</p>
                <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 0;"><strong>Your message:</strong><br />${message}</p>
            </div>

            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 18px;">
                For anything urgent, you can reply to this email or call us on +254 707 643570.
            </p>
            <p style="font-size: 16px; line-height: 1.7; margin: 0;">Warm regards,<br />Bevanda Masuta</p>
        </div>
    `;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const contact: ContactPayload = {
            first_name: normalize(body.first_name),
            last_name: normalize(body.last_name),
            email: normalize(body.email),
            country_code: normalize(body.country_code),
            phone_number: normalize(body.phone_number) || "N/A",
            service_interest: normalize(body.service_interest),
            subject: normalize(body.subject),
            message: normalize(body.message),
        };
        const { first_name, last_name, email, country_code, phone_number, service_interest, subject, message } = contact;

        // 1. Basic Validation
        if (!first_name || !last_name || !email || !service_interest || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
        }

        // 2. Save to MySQL Database (with Bridge Option)
        let savedToDb = false;

        if (process.env.DB_BRIDGE_URL) {
            try {
                console.log("Using DB Bridge for database access...");
                const bridgeResponse = await fetch(process.env.DB_BRIDGE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        key: 'bevanda_emergency_2026', // Access key for the bridge
                        first_name, last_name, email, country_code, phone_number, service_interest, subject, message
                    })
                });

                if (bridgeResponse.ok) {
                    savedToDb = true;
                    console.log("Data saved via PHP Bridge.");
                } else {
                    const bridgeError = await bridgeResponse.text();
                    console.error("Bridge Error Response:", bridgeError);
                }
            } catch (bridgeErr) {
                console.error("Bridge Connection Failed:", bridgeErr);
            }
        }

        // If bridge failed or wasn't configured, try direct SQL
        if (!savedToDb) {
            try {
            const dbConnection = await mysql.createConnection({
                host: process.env.DB_HOST || '145.239.19.134',
                user: process.env.DB_USER || 'vnsbhpwh_bevanda',
                password: process.env.DB_PASSWORD || 'lewisking2005',
                database: process.env.DB_NAME || 'vnsbhpwh_bevandamasuta_db',
                connectTimeout: 3000,
            });

            const insertQuery = `
                INSERT INTO contacts (first_name, last_name, email, country_code, phone_number, service_interest, subject, message) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            await dbConnection.execute(insertQuery, [first_name, last_name, email, country_code, phone_number, service_interest, subject, message]);
            await dbConnection.end();
            savedToDb = true;
            } catch (dbErr) {
                console.error("Database connection/insert failed (continuing to email delivery):", dbErr);
            }
        }

        // 3. Send Email Notification via Nodemailer
        const smtpUser = process.env.SMTP_USER || mailboxEmail;
        const smtpPass = process.env.SMTP_PASS;

        if (!smtpPass) {
            return NextResponse.json({ error: "SMTP password is not configured" }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "my.mailbux.com",
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            requireTLS: true,
            connectionTimeout: 10000,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            }
        });

        const notificationMail = {
            from: `"Bevanda Masuta Website" <${smtpUser}>`,
            to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
            replyTo: `${first_name} ${last_name} <${email}>`,
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
            html: renderDetailsHtml(contact),
            headers: {
                'Message-ID': `<${Date.now()}@bevandamasuta.com>`,
                'Date': new Date().toUTCString(),
            }
        };

        const clientMail = {
            from: `"Bevanda Masuta" <${smtpUser}>`,
            to: email,
            replyTo: smtpUser,
            subject: "We received your Bevanda Masuta inquiry",
            text: `Hi ${first_name},

Thank you for reaching out to Bevanda Masuta. Your inquiry has been received, and our team will review it and get back to you shortly.

Service: ${service_interest}
Subject: ${subject}

Your message:
${message}

For anything urgent, reply to this email or call us on +254 707 643570.

Warm regards,
Bevanda Masuta`,
            html: renderClientHtml(contact),
        };

        await transporter.sendMail(notificationMail);
        await transporter.sendMail(clientMail);

        return NextResponse.json({ success: true, message: "Message received successfully." });

    } catch (error) {
        console.error("Contact Form API Error:", error);
        const msg = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
