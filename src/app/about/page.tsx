"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Target, Users, Heart } from "lucide-react";

const values = [
    { icon: <Award size={32} />, title: "Excellence", desc: "We hold ourselves to the highest standard in every engagement, from training sessions to brand activations." },
    { icon: <Target size={32} />, title: "Precision", desc: "Every recommendation is rooted in rigorous analysis of your specific operation, market, and guest profile." },
    { icon: <Users size={32} />, title: "Partnership", desc: "We don't deliver and disappear. We walk alongside you throughout implementation and beyond." },
    { icon: <Heart size={32} />, title: "Passion", desc: "Hospitality is our craft, not just our career. That love for the work shows in every detail we touch." },
];

const team = [
    { name: "theegreatshepherd", role: "Founder & Lead Consultant", bio: "A seasoned hospitality professional with over a decade of experience running premium bar programs and training teams across East Africa." },
    { name: "Creative Team", role: "Brand & Experience Design", bio: "Our creatives specialize in translating your brand's identity into immersive beverage experiences that guests remember long after the last sip." },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section style={{ background: "var(--secondary)", color: "white", paddingTop: "200px", paddingBottom: "120px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "800px" }}>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "20px" }}>
                            Who We Are
                        </motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "30px" }}>
                            Architects of the <br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>Guest Experience.</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ fontSize: "1.2rem", opacity: 0.7, lineHeight: 1.8 }}>
                            Bevanda Masuta was founded on a singular conviction: that the standard of hospitality across Africa deserves to be world-class.
                        </motion.p>
                    </div>
                </section>

                {/* Story */}
                <section style={{ padding: "var(--section-padding)", background: "var(--background)" }}>
                    <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", maxWidth: "1100px" }}>
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p style={{ textTransform: "uppercase", letterSpacing: "3px", fontSize: "0.8rem", color: "var(--primary)", marginBottom: "20px" }}>Our Story</p>
                            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "30px", lineHeight: 1.2 }}>
                                Born from a passion for <span style={{ color: "var(--primary)", fontStyle: "italic" }}>craft.</span>
                            </h2>
                            <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: "var(--text-muted)", marginBottom: "25px" }}>
                                Bevanda Masuta started as a dream behind the bar—a belief that every great hospitality venue needs a strategic backbone behind its creativity. That venues don't just need passionate teams, they need empowered ones.
                            </p>
                            <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: "var(--text-muted)" }}>
                                Today, we partner with hotels, restaurants, event brands, and corporate clients to build bar programs that are operationally sound, culturally resonant, and commercially successful. Our work spans Nairobi and beyond.
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ position: "relative", height: "500px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background-alt)" }}>
                            <motion.img
                                src="/images/im6.png"
                                alt="Bevanda Masuta Story"
                                whileHover={{ scale: 1.04 }}
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                                style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", clipPath: "inset(0 0 6% 0 round 24px)", objectFit: "contain" }}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Values */}
                <section style={{ padding: "var(--section-padding)", background: "var(--background-alt)" }}>
                    <div className="container">
                        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            Our Core Values
                        </motion.h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "40px", marginTop: "60px" }}>
                            {values.map((v, i) => (
                                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    style={{ background: "white", padding: "50px 40px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}>
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        style={{ color: "var(--gold)", marginBottom: "25px", display: "inline-block" }}
                                    >
                                        {v.icon}
                                    </motion.div>
                                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>{v.title}</h3>
                                    <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section style={{ padding: "var(--section-padding)", background: "var(--secondary)", color: "white" }}>
                    <div className="container">
                        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            The Team
                        </motion.h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginTop: "60px" }}>
                            {team.map((member, i) => (
                                <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                                    style={{ background: "rgba(255,255,255,0.04)", padding: "50px", borderRadius: "20px", border: "1px solid rgba(197,160,89,0.15)" }}>
                                    <div style={{ width: "60px", height: "3px", background: "var(--gold)", marginBottom: "30px" }} />
                                    <h3 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>{member.name}</h3>
                                    <p style={{ color: "var(--gold)", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "25px" }}>{member.role}</p>
                                    <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>{member.bio}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
