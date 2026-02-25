"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                padding: 0,
                background: "#000"
            }}
        >
            {/* Background Overlay */}
            <div
                style={{
                    position: "absolute",
                    top: "-2%",
                    left: "-2%",
                    right: "-2%",
                    bottom: "-8%",
                    backgroundImage: "url('/images/im4.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center 25%",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.6,
                    zIndex: 1
                }}
            />

            {/* Gradient Overlay for Text Readability */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)",
                    zIndex: 2
                }}
            />

            <div
                className="container"
                style={{
                    position: "relative",
                    zIndex: 3,
                    textAlign: "center",
                    color: "white",
                    maxWidth: "900px"
                }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontFamily: "var(--font-inter)",
                        textTransform: "uppercase",
                        letterSpacing: "4px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        marginBottom: "20px",
                        color: "var(--gold)"
                    }}
                >
                    Mixology • Bar Leadership • Hospitality Training & Brand Experiences
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: "clamp(3rem, 10vw, 6.5rem)",
                        fontWeight: 400,
                        lineHeight: 1,
                        marginBottom: "40px",
                        letterSpacing: "-0.02em",
                        textShadow: "0 10px 40px rgba(0,0,0,0.5)"
                    }}
                >
                    Refining the <br />
                    <span style={{
                        color: "var(--white)",
                        display: "inline-block",
                        marginTop: "10px",
                        fontStyle: "italic",
                        borderBottom: "2px solid var(--gold)",
                        paddingBottom: "10px"
                    }}>
                        Art of Hospitality
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link href="#contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "20px 50px", borderRadius: "100px", background: "linear-gradient(135deg, var(--primary), var(--accent))", border: "1px solid var(--gold)" }}>
                        Learn More
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    opacity: 0.6
                }}
            >
                <div style={{ width: "1px", height: "60px", background: "white" }} />
            </motion.div>
        </section>
    );
}
