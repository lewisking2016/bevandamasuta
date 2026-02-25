"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Media", href: "/media" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                pointerEvents: "none",
                padding: "20px 0"
            }}
        >
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="container header-pill"
                style={{
                    pointerEvents: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "var(--glass)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "100px",
                    padding: "10px 30px",
                    maxWidth: "1200px",
                    width: "95%",
                    margin: "0 auto",
                    boxShadow: "var(--shadow-premium)",
                    border: "1px solid rgba(197, 160, 89, 0.2)", // Subtle Gold border
                    transition: "var(--transition)"
                }}
            >
                <Link href="/" style={{ display: "flex", alignItems: "center", transition: "transform 0.3s ease", marginLeft: "-30px" }} className="logo-hover">
                    <Image
                        src="/images/blogo.png"
                        alt="Bevanda Masuta Logo"
                        width={280}
                        height={85}
                        style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul style={{ display: "flex", listStyle: "none", gap: "40px", alignItems: "center" }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    style={{
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: "0.8rem",
                                        transition: "var(--transition)",
                                        opacity: 0.7,
                                        letterSpacing: "2px",
                                        textTransform: "uppercase"
                                    }}
                                    className="nav-link"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/contact" className="btn-primary" style={{ padding: "12px 32px", fontSize: "0.8rem", borderRadius: "100px", background: "var(--primary)" }}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Toggle (Only visible on mobile) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ color: "white", display: "none" }}
                    className="mobile-toggle"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </motion.div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        style={{
                            position: "absolute",
                            top: "100px",
                            left: "20px",
                            right: "20px",
                            background: "rgba(25, 25, 25, 0.98)",
                            backdropFilter: "blur(20px)",
                            padding: "50px 40px",
                            borderRadius: "32px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "35px",
                            alignItems: "center",
                            border: "1px solid rgba(141, 27, 51, 0.3)",
                            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                            pointerEvents: "auto",
                            zIndex: 999
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                style={{ color: "white", fontSize: "1.2rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "3px" }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="btn-primary"
                            onClick={() => setIsOpen(false)}
                            style={{ width: "100%", textAlign: "center", borderRadius: "100px", padding: "18px" }}
                        >
                            Work With Us
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}
