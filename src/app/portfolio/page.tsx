"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const projects = [
    {
        tag: "Brand Experience",
        title: "Signature Cocktail Launch — Premium Spirits Brand",
        description: "Developed a multi-sensory cocktail program for a premium spirits launch event attended by over 300 guests. Designed 6 signature serves, led a team of 8 bartenders, and created tableside narrative guides for each drink.",
        image: "/images/im11.jpeg",
        outcomes: ["300+ Guests Served", "6 Signature Cocktails", "4.9 / 5 Guest Rating"],
    },
    {
        tag: "Hospitality Training",
        title: "Bar Team Transformation — Boutique Hotel, Nairobi",
        description: "Conducted a 3-week intensive training programme for a 12-person bar team at a boutique hotel. Covered service standards, upselling psychology, and cocktail technique from basics to advanced.",
        image: "/images/im7.jpg",
        outcomes: ["12 Staff Trained", "38% Increase in Bar Revenue", "Ongoing Retainer Secured"],
    },
    {
        tag: "Strategic Consulting",
        title: "F&B Audit & Menu Overhaul — Restaurant Group",
        description: "Performed a full F&B audit for a 3-outlet restaurant group. Identified a 22% COGS reduction opportunity through menu streamlining and renegotiated supplier contracts.",
        image: "/images/im5.png",
        outcomes: ["3 Outlets Audited", "22% COGS Reduction", "New Menu Launched in 6 Weeks"],
    },
];

export default function PortfolioPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section style={{ background: "var(--secondary)", color: "white", paddingTop: "200px", paddingBottom: "120px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "800px" }}>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "20px" }}>
                            Our Work
                        </motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "30px" }}>
                            Results That Speak <br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>for Themselves.</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontSize: "1.1rem", opacity: 0.65, lineHeight: 1.8 }}>
                            A selection of engagements that showcase the depth and breadth of our hospitality craft.
                        </motion.p>
                    </div>
                </section>

                {/* Projects */}
                <section style={{ padding: "var(--section-padding)", background: "var(--background)" }}>
                    <div className="container" style={{ display: "flex", flexDirection: "column", gap: "100px", maxWidth: "1100px" }}>
                        {projects.map((project, index) => (
                            <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                style={{ display: "grid", gridTemplateColumns: index % 2 === 0 ? "1.2fr 1fr" : "1fr 1.2fr", gap: "70px", alignItems: "center" }}>

                                {index % 2 !== 0 && (
                                    <div style={{ position: "relative", height: "480px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background-alt)" }}>
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            whileHover={{ scale: 1.05, rotate: -2 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", clipPath: "inset(0 0 6% 0 round 24px)", objectFit: "contain" }}
                                        />
                                    </div>
                                )}

                                <div>
                                    <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: "100px", background: "rgba(141,27,51,0.08)", color: "var(--primary)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "25px" }}>
                                        {project.tag}
                                    </span>
                                    <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", marginBottom: "25px", lineHeight: 1.3 }}>{project.title}</h2>
                                    <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-muted)", marginBottom: "35px" }}>{project.description}</p>
                                    <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                                        {project.outcomes.map((outcome) => (
                                            <div key={outcome} style={{ textAlign: "center" }}>
                                                <div style={{ width: "50px", height: "2px", background: "var(--gold)", margin: "0 auto 10px" }} />
                                                <p style={{ fontSize: "0.85rem", color: "var(--foreground)", fontWeight: 700 }}>{outcome}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {index % 2 === 0 && (
                                    <div style={{ position: "relative", height: "480px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background-alt)" }}>
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            whileHover={{ scale: 1.05, rotate: 2 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", clipPath: "inset(0 0 6% 0 round 24px)", objectFit: "contain" }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: "var(--section-padding)", background: "var(--background-alt)", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "700px" }}>
                        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "25px" }}>Ready to create your success story?</h2>
                        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "40px", lineHeight: 1.8 }}>
                            Every great result starts with a conversation. Let's talk about what's possible for your venue or brand.
                        </p>
                        <Link href="/contact" className="btn-primary" style={{ borderRadius: "100px", padding: "20px 55px" }}>
                            Start the Conversation
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
