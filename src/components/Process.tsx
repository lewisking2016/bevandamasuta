"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Lightbulb, TrendingUp } from "lucide-react";

const steps = [
    {
        title: "Discovery & Audit",
        description: "We begin by analyzing your current operations, brand DNA, and market position to identify untapped opportunities for growth.",
        icon: <Search size={32} />
    },
    {
        title: "Strategic Design",
        description: "Our experts craft a bespoke roadmap, from menu engineering to service blueprints, designed specifically for your target demographic.",
        icon: <PenTool size={32} />
    },
    {
        title: "Implementation",
        description: "We work alongside your team to deploy new standards, train staff, and launch refined beverage programs with meticulous attention to detail.",
        icon: <Lightbulb size={32} />
    },
    {
        title: "Performance Review",
        description: "Post-launch, we monitor KPIs and guest feedback, performing continuous optimizations to ensure long-term operational success.",
        icon: <TrendingUp size={32} />
    }
];

export default function Process() {
    return (
        <section id="process" style={{ background: "var(--secondary)", color: "var(--white)", padding: "var(--section-padding)" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "80px" }}>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textTransform: "uppercase", letterSpacing: "3px", fontSize: "0.8rem", color: "var(--primary)", marginBottom: "20px" }}
                    >
                        Our Methodology
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", maxWidth: "800px", margin: "0 auto" }}
                    >
                        A Disciplined Approach to <br />
                        <span style={{ fontStyle: "italic", opacity: 0.9 }}>Boutique Excellence.</span>
                    </motion.h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                padding: "50px",
                                borderRadius: "20px",
                                border: "1px solid rgba(255,255,255,0.05)",
                                transition: "all 0.4s ease"
                            }}
                            whileHover={{
                                background: "rgba(255,255,255,0.05)",
                                y: -10,
                                borderColor: "rgba(141, 27, 51, 0.3)"
                            }}
                        >
                            <div style={{ color: "var(--gold)", marginBottom: "30px" }}>
                                {step.icon}
                            </div>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "20px", fontWeight: 600 }}>{step.title}</h3>
                            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
