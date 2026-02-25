"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Zap, Heart } from "lucide-react";

export default function About() {
    return (
        <section id="about" style={{ background: "var(--white)", overflow: "hidden" }}>
            <div className="container">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "60px",
                    alignItems: "center"
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{
                            textTransform: "uppercase",
                            letterSpacing: "3px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "var(--primary)",
                            marginBottom: "20px"
                        }}>
                            Founded on Excellence
                        </div>
                        <h2 className="section-title" style={{ textAlign: "left", marginBottom: "40px", fontSize: "clamp(3rem, 7vw, 4.5rem)", lineHeight: 1.1 }}>
                            The Blueprint of <br />
                            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>Modern Hospitality.</span>
                        </h2>
                        <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "var(--foreground)", marginBottom: "25px", fontWeight: 400 }}>
                            Bevanda Masuta isn't just a consultancy; we are architects of experience. In an industry where precision meets emotion, we provide the technical mastery and creative vision required to transcend the ordinary.
                        </p>
                        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "40px" }}>
                            Our approach is rooted in the belief that every touchpoint—from the curvature of a glass to the tone of a server—is an opportunity to build brand loyalty and operational excellence. We partner with visionary owners to refine their service standards and design cocktail programs that define the market.
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}>
                            <div>
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ display: "inline-block", marginBottom: "15px" }}
                                >
                                    <ShieldCheck size={32} color="var(--gold)" />
                                </motion.div>
                                <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "var(--foreground)" }}>Operational Integrity</h4>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Ensuring every system and standard is optimized for efficiency and profit.</p>
                            </div>
                            <div>
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                                    style={{ display: "inline-block", marginBottom: "15px" }}
                                >
                                    <Zap size={32} color="var(--gold)" />
                                </motion.div>
                                <h4 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "var(--foreground)" }}>Creative Velocity</h4>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Rapidly deploying innovative beverage programs that capture guest attention.</p>
                            </div>
                        </div>

                        <Link href="/services">
                            <button className="btn-primary" style={{ borderRadius: "100px", padding: "20px 45px", marginTop: "10px" }}>Discover Our Philosophy</button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: "relative", height: "650px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background-alt)" }}
                    >
                        <motion.img
                            src="/images/im1.png"
                            alt="Hospitality Professionals"
                            whileHover={{ scale: 1.04 }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5, delay: 0.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", clipPath: "inset(0 0 6% 0 round 24px)", objectFit: "contain" }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
