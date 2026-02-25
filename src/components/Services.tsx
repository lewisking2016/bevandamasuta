"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Wine, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
    {
        title: "Hospitality Training",
        description: "Comprehensive staff development focusing on technical proficiency, soft skills, and international service standards. We build high-performance teams that deliver consistent guest satisfaction.",
        image: "/images/im8.jpg",
        icon: <GraduationCap size={28} />,
    },
    {
        title: "Brand Experiences",
        description: "Strategic beverage programming and activation design that transforms bars into brand destinations. From menu innovation to sensory storytelling, we curate every detail of the guest journey.",
        image: "/images/im10.jpg",
        icon: <Wine size={28} />,
    },
    {
        title: "Strategic Consulting",
        description: "Data-driven operational auditing and concept development. We optimize COGS, labor models, and workflow design to maximize profitability without compromising service quality.",
        image: "/images/im14.jpeg",
        icon: <BarChart3 size={28} />,
    },
];

export default function Services() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 6000); // Auto-slide every 6 seconds

        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.98
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.98
        })
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + services.length) % services.length);
    };

    if (!isMounted) return null;

    return (
        <section id="services" style={{ background: "var(--background-alt)", overflow: "hidden", paddingBottom: "120px" }}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    What We Offer
                </motion.h2>

                <div className="slideshow-wrapper">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 }
                            }}
                            className="slideshow-card"
                        >
                            <div className="slide-image-container">
                                <motion.img
                                    src={services[currentIndex].image}
                                    alt={services[currentIndex].title}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    style={{
                                        maxWidth: "85%",
                                        maxHeight: "85%",
                                        borderRadius: "16px",
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                        objectFit: "contain",
                                        clipPath: "inset(0 0 6% 0 round 16px)"
                                    }}
                                />
                            </div>
                            <div className="slide-content">
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    color: "var(--gold)",
                                    marginBottom: "20px"
                                }}>
                                    <motion.span
                                        style={{ opacity: 0.9, display: "inline-block" }}
                                        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                                        transition={{ duration: 0.5, delay: 0.5, repeatType: "loop", repeatDelay: 5 }}
                                    >
                                        {services[currentIndex].icon}
                                    </motion.span>
                                    Service 0{currentIndex + 1}
                                </div>
                                <h3 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "25px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                                    {services[currentIndex].title}
                                </h3>
                                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "40px", fontSize: "1.05rem" }}>
                                    {services[currentIndex].description}
                                </p>
                                <Link href="/contact" style={{ display: "inline-block" }}>
                                    <motion.button
                                        whileHover={{ x: 8 }}
                                        style={{
                                            color: "var(--primary)",
                                            fontWeight: 800,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            fontSize: "0.9rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "1.5px",
                                            borderBottom: "2px solid var(--primary)",
                                            paddingBottom: "5px",
                                            width: "fit-content"
                                        }}
                                    >
                                        Explore Expertise
                                        <span style={{ fontSize: "1.2rem" }}>→</span>
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="slideshow-controls">
                        <button onClick={() => paginate(-1)} className="slide-btn" aria-label="Previous service">
                            <ChevronLeft size={24} />
                        </button>

                        <div style={{ display: "flex", gap: "12px" }}>
                            {services.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        background: currentIndex === idx ? "var(--primary)" : "rgba(0,0,0,0.15)",
                                        transition: "var(--transition)",
                                        transform: currentIndex === idx ? "scale(1.2)" : "scale(1)"
                                    }}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button onClick={() => paginate(1)} className="slide-btn" aria-label="Next service">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
