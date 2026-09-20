"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
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

function ApplyFormContent() {
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get("service");

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        country_code: "+254",
        phone_number: "",
        service_interest: serviceParam || "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (serviceParam) {
            setForm(prev => ({ ...prev, service_interest: serviceParam }));
        }
    }, [serviceParam]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    subject: `Rate Card Application: ${form.service_interest}`,
                    message: `Service Interest: ${form.service_interest}\n\nClient Message:\n${form.message}`
                })
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(data.error || "Failed to submit application. Please try again.");
            }
        } catch (err) {
            setError("A network error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                    textAlign: "center",
                    padding: "clamp(30px, 6vw, 70px) clamp(20px, 5vw, 40px)",
                    background: "var(--background-alt)",
                    borderRadius: "24px",
                    border: "1px solid rgba(197, 160, 89, 0.3)",
                    boxShadow: "0 20px 50px rgba(141, 27, 51, 0.06)"
                }}
            >
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--primary), var(--accent))",
                        color: "var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        margin: "0 auto 24px",
                        boxShadow: "0 10px 30px rgba(141, 27, 51, 0.3)",
                        border: "2px solid var(--gold)"
                    }}
                >
                    ✓
                </motion.div>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.3rem)", marginBottom: "14px", fontWeight: 700, color: "var(--foreground)" }}>
                    Application Received!
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 24px" }}>
                    Thank you, <strong style={{ color: "var(--primary)" }}>{form.first_name}</strong>. Your rate card request for <strong style={{ color: "var(--gold)" }}>{form.service_interest}</strong> has been received.
                </p>
                <div style={{ background: "rgba(197, 160, 89, 0.08)", padding: "16px 24px", borderRadius: "14px", border: "1px dashed rgba(197, 160, 89, 0.4)", marginBottom: "36px" }}>
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--foreground)", fontWeight: 500 }}>
                        📧 A confirmation copy has been sent to <strong style={{ textDecoration: "underline" }}>{form.email}</strong>. Our team will contact you within 24 hours.
                    </p>
                </div>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/services" className="btn-primary" style={{ borderRadius: "100px", padding: "14px 36px", fontSize: "0.85rem" }}>
                        Back to Services
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <div style={{ background: "var(--background-alt)", padding: "clamp(24px, 5vw, 50px)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 50px rgba(0,0,0,0.05)" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="form-row-2">
                    <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>First Name</label>
                        <input
                            type="text"
                            placeholder="Jane"
                            value={form.first_name}
                            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                            required
                            disabled={isSubmitting}
                            style={{ width: "100%", padding: "16px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white", fontSize: "1rem", outline: "none" }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>Last Name</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            value={form.last_name}
                            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                            required
                            disabled={isSubmitting}
                            style={{ width: "100%", padding: "16px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white", fontSize: "1rem", outline: "none" }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>Email Address</label>
                    <input
                        type="email"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                        style={{ width: "100%", padding: "16px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white", fontSize: "1rem", outline: "none" }}
                    />
                </div>

                <div className="form-row-phone">
                    <CustomDropdown
                        label="Country"
                        value={form.country_code}
                        options={countryOptions}
                        onChange={(val) => setForm(prev => ({ ...prev, country_code: val }))}
                        disabled={isSubmitting}
                    />
                    <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="700 000 000"
                            value={form.phone_number}
                            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                            disabled={isSubmitting}
                            style={{ width: "100%", padding: "16px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white", fontSize: "1rem", outline: "none" }}
                        />
                    </div>
                </div>

                <div>
                    <CustomDropdown
                        label="Selected Service"
                        value={form.service_interest}
                        placeholder="Select a package..."
                        onChange={(val) => setForm(prev => ({ ...prev, service_interest: val }))}
                        disabled={isSubmitting}
                        options={[
                            {
                                label: "Content Creation & Promotion",
                                options: [
                                    { value: "Content Creation & Promotion", label: "Content Creation & Promotion (Full Package)" },
                                    { value: "Content Creation", label: "Content Creation" },
                                    { value: "YouTube Video Feature", label: "YouTube Video Feature" },
                                    { value: "Podcast Sponsorship", label: "Podcast Sponsorship" },
                                    { value: "Instagram Reel/Short", label: "Instagram Reel/Short" },
                                    { value: "Full Campaign", label: "Full Campaign" },
                                ]
                            },
                            {
                                label: "Event Hosting & Brand Activation",
                                options: [
                                    { value: "Event Hosting / Brand Activation", label: "Event Hosting / Brand Activation (Full Package)" },
                                    { value: "Event Hosting", label: "Event Hosting" },
                                    { value: "Cocktail Party Hosting", label: "Cocktail Party Hosting" },
                                    { value: "Bar Takeover", label: "Bar Takeover / Guest Shift" },
                                    { value: "Tasting Session", label: "Tasting Session / Workshop" },
                                ]
                            },
                            {
                                label: "Consultation & Training",
                                options: [
                                    { value: "Consultation & Training", label: "Consultation & Training (Full Package)" },
                                    { value: "Consultation", label: "Consultation" },
                                    { value: "Beverage Training", label: "Beverage Training" },
                                    { value: "Brand Consultation", label: "Brand Consultation" },
                                    { value: "Coaching", label: "Hospitality Tips & Coaching" },
                                ]
                            }
                        ]}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>Brief Description of Needs</label>
                    <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us a bit more about your requirements..."
                        style={{ width: "100%", padding: "16px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white", fontSize: "1rem", outline: "none", resize: "vertical" }}
                    ></textarea>
                </div>

                {error && <p style={{ color: "red", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{ padding: "18px", borderRadius: "100px", marginTop: "10px", opacity: isSubmitting ? 0.7 : 1, width: "100%", fontSize: "0.9rem" }}
                >
                    {isSubmitting ? "Submitting..." : "Submit Application →"}
                </button>
            </form>
        </div>
    );
}

export default function ApplyPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: "100vh", paddingTop: "clamp(110px, 14vh, 150px)", paddingBottom: "clamp(60px, 8vh, 100px)", background: "var(--background)" }}>
                <div className="container" style={{ maxWidth: "1000px" }}>
                    <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", marginBottom: "30px", fontSize: "0.9rem", textDecoration: "none" }}>
                        <ChevronLeft size={16} /> Back to Services
                    </Link>

                    <div className="contact-grid-wrapper" style={{ alignItems: "start" }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                            <p style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.75rem", color: "var(--gold)", marginBottom: "15px" }}>Collaboration</p>
                            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "25px" }}>
                                Let's Start a <br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>Partnership.</span>
                            </h1>
                            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "30px" }}>
                                Fill out the application form and we will review your request. Our goal is to create authentic, high-impact content and experiences.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                    <CheckCircle2 size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: "0.95rem" }}>Direct contact within 24 hours</span>
                                </div>
                                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                    <CheckCircle2 size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: "0.95rem" }}>Tailored strategy for your brand</span>
                                </div>
                                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                    <CheckCircle2 size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: "0.95rem" }}>Professional hospitality execution</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                            <Suspense fallback={<div>Loading application...</div>}>
                                <ApplyFormContent />
                            </Suspense>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
