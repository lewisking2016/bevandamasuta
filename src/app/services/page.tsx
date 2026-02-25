"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Wine, BarChart3, CheckCircle2 } from "lucide-react";

const services = [
    {
        icon: <BarChart3 size={40} />,
        title: "Content Creation & Promotion",
        tagline: "Digitize your brand's presence.",
        description: "Elevate your brand through high-impact digital storytelling. From YouTube features to full social media campaigns, we bridge the gap between hospitality craft and digital influence, ensuring your brand resonates with the right audience.",
        image: "/images/im14.jpeg",
        includes: [
            "YouTube Video Features & Collaborations",
            "Podcast Sponsorships & Special Guest Appearances",
            "Instagram Reels, Shorts & TikTok Content",
            "Full Multi-Platform Digital Campaigns",
            "Influencer Strategy & Beverage Storytelling",
        ],
    },
    {
        icon: <Wine size={40} />,
        title: "Event Hosting / Brand Activation",
        tagline: "Immersive experiences, professional execution.",
        description: "Bring your beverage brand to life with professional hosting and immersive activations. We don't just pour drinks; we create memories that guests talk about long after the last glass is empty, positioning your brand at the center of the action.",
        image: "/images/im10.jpg",
        includes: [
            "High-Energy Cocktail Party Hosting",
            "Bar Takeovers & Guest Shift Management",
            "Sensory Tasting Sessions & Interactive Workshops",
            "On-Site Brand Ambassador & Host Services",
            "Menu Development & Signature Activation Drinks",
        ],
    },
    {
        icon: <GraduationCap size={40} />,
        title: "Consultation & Training",
        tagline: "Technical skill meets hospitality heart.",
        description: "Refine every touchpoint of your guest journey. Our consulting and training services are designed for boutique excellence, focusing on technical skill, brand alignment, and operational efficiency that drives measurable results.",
        image: "/images/im8.jpg",
        includes: [
            "Custom Beverage & Technical Bar Training",
            "Strategic Brand Consultation & Identity Alignment",
            "Personalized Hospitality Tips & Leadership Coaching",
            "Service Standard Audits & Quality Control",
            "Staff Performance Engineering & Assessments",
        ],
    },
];

const pricingData = [
    {
        category: "Content Creation & Promotion",
        items: [
            { label: "YouTube Video Feature", price: "ksh 10,000 - 20,000" },
            { label: "Podcast Sponsorship", price: "ksh 8,000 - 20,000" },
            { label: "Instagram Reel/Short", price: "ksh 3,000 - 10,000" },
            { label: "Full Campaign (YouTube + Podcast + IG + X)", price: "ksh 30,000", highlight: true },
        ],
        color: "rgba(141, 27, 51, 0.05)"
    },
    {
        category: "Event Hosting / Brand Activation",
        items: [
            { label: "Cocktail Party Hosting", price: "ksh 20,000 - 50,000" },
            { label: "Bar Takeover / Guest Shift", price: "ksh 15,000 - 40,000" },
            { label: "Tasting Session / Workshop", price: "ksh 10,000 - 25,000" },
        ],
        color: "rgba(197, 160, 89, 0.05)"
    },
    {
        category: "Consultation & Training",
        items: [
            { label: "Beverage Training (1hr)", price: "ksh 5,000 - 10,000" },
            { label: "Brand Consultation (1hr)", price: "ksh 4,000 - 8,000" },
            { label: "Hospitality Tips & Coaching", price: "ksh 3,000 per session" },
        ],
        color: "rgba(25, 25, 25, 0.03)"
    }
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section style={{ background: "var(--secondary)", color: "white", paddingTop: "200px", paddingBottom: "120px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "800px" }}>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "20px" }}>
                            Our Expertise
                        </motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "30px" }}>
                            Services Designed for <br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>Boutique Excellence.</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontSize: "1.1rem", opacity: 0.65, lineHeight: 1.8 }}>
                            Every engagement is tailored to your specific venue, brand, and objectives. We don't do one-size-fits-all.
                        </motion.p>
                    </div>
                </section>

                {/* Services */}
                {services.map((service, index) => (
                    <section key={service.title} style={{ padding: "var(--section-padding)", background: index % 2 === 0 ? "var(--background)" : "var(--background-alt)" }}>
                        <div className="container" style={{ display: "grid", gridTemplateColumns: index % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: "80px", alignItems: "center", maxWidth: "1100px", direction: index % 2 === 0 ? "ltr" : "rtl" }}>
                            <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ direction: "ltr" }}>
                                <div style={{ color: "var(--gold)", marginBottom: "25px" }}>{service.icon}</div>
                                <p style={{ textTransform: "uppercase", letterSpacing: "3px", fontSize: "0.75rem", color: "var(--primary)", marginBottom: "15px" }}>{service.tagline}</p>
                                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "25px", lineHeight: 1.2 }}>{service.title}</h2>
                                <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-muted)", marginBottom: "35px" }}>{service.description}</p>
                                <ul style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                                    {service.includes.map((item) => (
                                        <li key={item} style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.95rem", color: "var(--foreground)" }}>
                                            <CheckCircle2 size={18} color="var(--gold)" style={{ flexShrink: 0 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={`/apply?service=${encodeURIComponent(service.title)}`} className="btn-primary" style={{ borderRadius: "100px", padding: "18px 45px" }}>
                                    Enquire About This Service
                                </Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ position: "relative", height: "520px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", direction: "ltr", background: "var(--background-alt)" }}>
                                <img src={service.image} alt={service.title} style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", clipPath: "inset(0 0 6% 0 round 24px)", objectFit: "contain" }} />
                            </motion.div>
                        </div>
                    </section>
                ))}

                {/* Rates & Packages */}
                <section style={{ padding: "var(--section-padding)", background: "var(--background)" }}>
                    <div className="container" style={{ maxWidth: "1200px" }}>
                        <div style={{ textAlign: "center", marginBottom: "80px" }}>
                            <p style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.8rem", color: "var(--primary)", marginBottom: "15px" }}>Investment</p>
                            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 400 }}>Rates & <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Packages</span></h2>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
                            {pricingData.map((group, idx) => (
                                <motion.div
                                    key={group.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    style={{
                                        background: "var(--background-alt)",
                                        borderRadius: "24px",
                                        padding: "40px",
                                        border: "1px solid rgba(0,0,0,0.05)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontSize: "1.4rem", marginBottom: "30px", paddingBottom: "15px", borderBottom: `2px solid var(--gold)`, display: "inline-block" }}>{group.category}</h3>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "25px", marginBottom: "40px" }}>
                                            {group.items.map((item) => (
                                                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "15px" }}>
                                                    <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: 1.4 }}>{item.label}</div>
                                                    <div style={{ fontSize: "0.9rem", fontWeight: 600, whiteSpace: "nowrap", color: "var(--primary)" }}>{item.price}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Link href={`/apply?service=${encodeURIComponent(group.category)}`} className="btn-primary" style={{ textAlign: "center", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "2px", padding: "15px", borderRadius: "100px", width: "100%", background: idx === 0 ? "var(--primary)" : "transparent", color: idx === 0 ? "white" : "var(--foreground)", border: "1px solid rgba(141, 27, 51, 0.2)" }}>
                                        Apply Now
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: "var(--section-padding)", background: "var(--secondary)", color: "white", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "700px" }}>
                        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "25px" }}>Not sure where to start?</h2>
                        <p style={{ fontSize: "1.1rem", opacity: 0.65, marginBottom: "40px", lineHeight: 1.8 }}>
                            Book a free 30-minute discovery call and we'll identify the best path forward for your venue or brand.
                        </p>
                        <Link href="/contact" className="btn-primary" style={{ borderRadius: "100px", padding: "20px 55px", border: "1px solid rgba(197,160,89,0.3)" }}>
                            Book a Discovery Call
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
