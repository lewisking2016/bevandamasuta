"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaWhatsapp, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa6";
import CustomDropdown from "@/components/CustomDropdown";

const countryOptions = [
    { value: "+254", label: "🇰🇪 +254 (Kenya)" },
    { value: "+255", label: "🇹🇿 +255 (Tanzania)" },
    { value: "+256", label: "🇺🇬 +256 (Uganda)" },
    { value: "+250", label: "🇷🇼 +250 (Rwanda)" },
    { value: "+1", label: "🇺🇸 +1 (USA)" },
    { value: "+44", label: "🇬🇧 +44 (UK)" },
    { value: "+971", label: "🇦🇪 +971 (UAE)" },
    { value: "+27", label: "🇿🇦 +27 (SA)" },
];

const serviceOptions = [
    { value: "Hospitality Training", label: "Hospitality Training & Workshops" },
    { value: "Strategic Consulting", label: "Strategic Consulting" },
    { value: "Brand Experiences", label: "Brand Experiences & Events" },
    { value: "General Inquiry", label: "General Inquiry / Other" },
];

const contactInfo = [
    { icon: <Mail size={24} />, label: "Email", value: "info@bevandamasuta.com" },
    { icon: <Phone size={24} />, label: "Phone", value: "+254 707 643570" },
    { icon: <MapPin size={24} />, label: "Location", value: "Nairobi, Kenya" },
    { icon: <Clock size={24} />, label: "Availability", value: "Mon–Fri, 9am–6pm EAT" },
];

export default function ContactPage() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        country_code: "+254",
        phone_number: "",
        service_interest: "",
        subject: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(data.error || "Failed to send message. Please try again.");
            }
        } catch (err) {
            setError("A network error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section style={{ background: "var(--secondary)", color: "white", paddingTop: "200px", paddingBottom: "120px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "700px" }}>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "20px" }}>
                            Get in Touch
                        </motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 400, lineHeight: 1.1 }}>
                            Let's Build Something <br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>Exceptional Together.</span>
                        </motion.h1>
                    </div>
                </section>

                {/* Contact Grid */}
                <section style={{ padding: "var(--section-padding)", background: "var(--background)" }}>
                    <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", maxWidth: "1100px" }}>

                        {/* Info Column */}
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "40px", lineHeight: 1.2 }}>
                                Reach out and let's start the conversation.
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                                {contactInfo.map((item) => (
                                    <div key={item.label} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                                        <div style={{ color: "var(--gold)", flexShrink: 0, marginTop: "4px" }}>{item.icon}</div>
                                        <div>
                                            <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--primary)", marginBottom: "6px" }}>{item.label}</p>
                                            <p style={{ fontSize: "1.05rem", color: "var(--foreground)", fontWeight: 500 }}>{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: "40px", paddingTop: "40px", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                                <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--foreground)", marginBottom: "20px", fontWeight: 700 }}>Follow Us</p>
                                <div style={{ display: "flex", gap: "15px" }}>
                                    <a href="https://wa.me/254707643570" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", background: "rgba(141, 27, 51, 0.05)", padding: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon-light">
                                        <FaWhatsapp size={20} />
                                    </a>
                                    <a href="https://youtube.com/@bevandamasuta" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", background: "rgba(141, 27, 51, 0.05)", padding: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon-light">
                                        <FaYoutube size={20} />
                                    </a>
                                    <a href="https://www.tiktok.com/@bevanda.masuta?_r=1&_t=ZS-94CT6ZyG9CR" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", background: "rgba(141, 27, 51, 0.05)", padding: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon-light">
                                        <FaTiktok size={20} />
                                    </a>
                                    <a href="https://www.instagram.com/bevandamasuta?igsh=MWd3Mm43ZWtpaGRhbA==" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", background: "rgba(141, 27, 51, 0.05)", padding: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon-light">
                                        <FaInstagram size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Column */}
                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            {submitted ? (
                                <div style={{ textAlign: "center", padding: "80px 40px", background: "var(--background-alt)", borderRadius: "20px" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✓</div>
                                    <h3 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Message Sent!</h3>
                                    <p style={{ color: "var(--text-muted)" }}>We'll be in touch within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                                        <div>
                                            <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: "var(--foreground)" }}>First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Jane"
                                                value={form.first_name}
                                                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                                                required
                                                disabled={isSubmitting}
                                                style={{ width: "100%", padding: "18px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "1rem", background: "var(--background-alt)", outline: "none", transition: "border 0.3s" }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: "var(--foreground)" }}>Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Wanjiru"
                                                value={form.last_name}
                                                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                                                required
                                                disabled={isSubmitting}
                                                style={{ width: "100%", padding: "18px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "1rem", background: "var(--background-alt)", outline: "none", transition: "border 0.3s" }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: "var(--foreground)" }}>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="jane@example.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            required
                                            disabled={isSubmitting}
                                            style={{ width: "100%", padding: "18px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "1rem", background: "var(--background-alt)", outline: "none", transition: "border 0.3s" }}
                                        />
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: "20px" }}>
                                        <CustomDropdown
                                            label="Country"
                                            value={form.country_code}
                                            options={countryOptions}
                                            onChange={(val) => setForm({ ...form, country_code: val })}
                                            disabled={isSubmitting}
                                        />
                                        <div>
                                            <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: "var(--foreground)" }}>Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="700 000 000"
                                                value={form.phone_number}
                                                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                                                required
                                                disabled={isSubmitting}
                                                style={{ width: "100%", padding: "18px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "1rem", background: "var(--background-alt)", outline: "none", transition: "border 0.3s" }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <CustomDropdown
                                            label="Service of Interest"
                                            value={form.service_interest}
                                            options={serviceOptions}
                                            placeholder="Select a service..."
                                            onChange={(val) => setForm({ ...form, service_interest: val })}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: "var(--foreground)" }}>Subject</label>
                                        <input
                                            type="text"
                                            placeholder="What's this about?"
                                            value={form.subject}
                                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                            required
                                            disabled={isSubmitting}
                                            style={{ width: "100%", padding: "18px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "1rem", background: "var(--background-alt)", outline: "none", transition: "border 0.3s" }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: "var(--foreground)" }}>Message</label>
                                        <textarea
                                            placeholder="Tell us about your project or inquiry..."
                                            rows={5}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            required
                                            disabled={isSubmitting}
                                            style={{ width: "100%", padding: "18px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "1rem", background: "var(--background-alt)", outline: "none", resize: "vertical" }}
                                        />
                                    </div>

                                    {error && (
                                        <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>
                                    )}

                                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ borderRadius: "100px", padding: "20px", fontSize: "0.9rem", border: "1px solid rgba(197,160,89,0.3)", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                                        {isSubmitting ? "Sending..." : "Send Message →"}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
