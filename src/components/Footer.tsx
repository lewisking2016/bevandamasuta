"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer style={{
            background: "#0a0a0a",
            color: "rgba(255,255,255,0.6)",
            padding: "120px 20px 60px",
            borderTop: "1px solid rgba(141, 27, 51, 0.1)"
        }}>
            <div className="container" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "60px",
                textAlign: "left"
            }}>
                <div>
                    <Image
                        src="/images/blogo.png"
                        alt="Bevanda Masuta"
                        width={250}
                        height={70}
                        style={{ objectFit: "contain", marginBottom: "30px", filter: "brightness(0) invert(1)", marginLeft: "-25px" }}
                    />
                    <p style={{ lineHeight: 1.8, fontSize: "1rem", maxWidth: "320px" }}>
                        We elevate the guest experience through meticulous training and curated cocktail programs. Precision, passion, and purpose in every pour.
                    </p>
                </div>

                <div>
                    <h4 style={{ color: "white", marginBottom: "30px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px" }}>Navigation</h4>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "15px" }}><Link href="/services" className="footer-link">Services</Link></li>
                        <li style={{ marginBottom: "15px" }}><Link href="/portfolio" className="footer-link">Portfolio</Link></li>
                        <li style={{ marginBottom: "15px" }}><Link href="/media" className="footer-link">Media</Link></li>
                        <li style={{ marginBottom: "15px" }}><Link href="/about" className="footer-link">About Us</Link></li>
                        <li style={{ marginBottom: "15px" }}><Link href="/contact" className="footer-link">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: "white", marginBottom: "30px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px" }}>Connect</h4>
                    <p style={{ marginBottom: "15px", fontSize: "1rem" }}>Nairobi, Kenya.</p>
                    <p style={{ marginBottom: "15px", fontSize: "1rem" }}>+254 707 643570</p>
                    <p style={{ marginBottom: "15px", fontSize: "1rem" }}>info@bevandamasuta.com</p>

                    <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
                        <a href="https://wa.me/254707643570" target="_blank" rel="noopener noreferrer" style={{ color: "var(--white)", background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                            <FaWhatsapp size={18} />
                        </a>
                        <a href="https://youtube.com/@bevandamasuta" target="_blank" rel="noopener noreferrer" style={{ color: "var(--white)", background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                            <FaYoutube size={18} />
                        </a>
                        <a href="https://www.tiktok.com/@bevanda.masuta?_r=1&_t=ZS-94CT6ZyG9CR" target="_blank" rel="noopener noreferrer" style={{ color: "var(--white)", background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                            <FaTiktok size={18} />
                        </a>
                        <a href="https://www.instagram.com/bevandamasuta?igsh=MWd3Mm43ZWtpaGRhbA==" target="_blank" rel="noopener noreferrer" style={{ color: "var(--white)", background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container" style={{
                marginTop: "100px",
                paddingTop: "40px",
                borderTop: "1px solid rgba(255,255,255,0.03)",
                textAlign: "center",
                fontSize: "0.85rem",
                opacity: 0.5
            }}>
                <p>© {new Date().getFullYear()} Bevanda Masuta. Designed for excellence. Developed by I MEAN TECH.</p>
            </div>

        </footer>
    );
}
