"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import CustomDropdown from "@/components/CustomDropdown";

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
            <div style={{ textAlign: "center", padding: "100px 20px", background: "var(--background-alt)", borderRadius: "24px" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: "4rem", color: "var(--gold)", marginBottom: "30px" }}>✓</motion.div>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Application Received!</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "40px" }}>Thank you for your interest. Bevanda Masuta will contact you within 24 hours.</p>
                <Link href="/services" className="btn-primary" style={{ borderRadius: "100px", padding: "15px 40px" }}>
                    Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div style={{ background: "var(--background-alt)", padding: "50px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 50px rgba(0,0,0,0.05)" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>First Name</label>
                        <input
                            type="text"
                            value={form.first_name}
                            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                            required
                            style={{ width: "100%", padding: "15px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white" }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>Last Name</label>
                        <input
                            type="text"
                            value={form.last_name}
                            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                            required
                            style={{ width: "100%", padding: "15px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white" }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", fontWeight: 600 }}>Email Address</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        style={{ width: "100%", padding: "15px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white" }}
                    />
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
                                label: "Content Creation",
                                options: [
                                    { value: "YouTube Video Feature", label: "YouTube Video Feature" },
                                    { value: "Podcast Sponsorship", label: "Podcast Sponsorship" },
                                    { value: "Instagram Reel/Short", label: "Instagram Reel/Short" },
                                    { value: "Full Campaign", label: "Full Campaign" },
                                ]
                            },
                            {
                                label: "Event Hosting",
                                options: [
                                    { value: "Cocktail Party Hosting", label: "Cocktail Party Hosting" },
                                    { value: "Bar Takeover", label: "Bar Takeover / Guest Shift" },
                                    { value: "Tasting Session", label: "Tasting Session / Workshop" },
                                ]
                            },
                            {
                                label: "Consultation",
                                options: [
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
                        style={{ width: "100%", padding: "15px 20px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", background: "white" }}
                    ></textarea>
                </div>

                {error && <p style={{ color: "red", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{ padding: "18px", borderRadius: "100px", marginTop: "10px", opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
}

export default function ApplyPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: "100vh", paddingTop: "150px", paddingBottom: "100px", background: "var(--background)" }}>
                <div className="container" style={{ maxWidth: "1000px" }}>
                    <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", marginBottom: "40px", fontSize: "0.9rem", textDecoration: "none" }}>
                        <ChevronLeft size={16} /> Back to Services
                    </Link>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "60px", alignItems: "start" }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                            <p style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.75rem", color: "var(--gold)", marginBottom: "15px" }}>Collaboration</p>
                            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "30px" }}>
                                Let's Start a <br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>Partnership.</span>
                            </h1>
                            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "40px" }}>
                                Fill out the application form and we will review your request. Our goal is to create authentic, high-impact content and experiences.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                    <CheckCircle2 size={20} color="var(--gold)" />
                                    <span style={{ fontSize: "0.95rem" }}>Direct contact within 24 hours</span>
                                </div>
                                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                    <CheckCircle2 size={20} color="var(--gold)" />
                                    <span style={{ fontSize: "0.95rem" }}>Tailored strategy for your brand</span>
                                </div>
                                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                    <CheckCircle2 size={20} color="var(--gold)" />
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
