"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Bouncing ball state for mobile
    const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
    const [velocity, setVelocity] = useState({ x: 2, y: 2 });

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const updateMousePosition = (e: MouseEvent) => {
            if (!isMobile) {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (isMobile) return;
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isMobile]);

    // Mobile bouncing logic
    useEffect(() => {
        if (!isMobile || !isMounted) return;

        let animationFrameId: number;

        const animate = () => {
            setBallPos(prev => {
                let newX = prev.x + velocity.x;
                let newY = prev.y + velocity.y;
                let newVelX = velocity.x;
                let newVelY = velocity.y;

                // Bounce off edges (accounting for 10px ball size)
                if (newX <= 0 || newX >= window.innerWidth - 10) {
                    newVelX = -newVelX;
                    newX = Math.max(0, Math.min(newX, window.innerWidth - 10));
                }
                if (newY <= 0 || newY >= window.innerHeight - 10) {
                    newVelY = -newVelY;
                    newY = Math.max(0, Math.min(newY, window.innerHeight - 10));
                }

                if (newVelX !== velocity.x || newVelY !== velocity.y) {
                    setVelocity({ x: newVelX, y: newVelY });
                }

                return { x: newX, y: newY };
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isMobile, isMounted, velocity]);

    if (!isMounted) return null;

    return (
        <>
            {/* The main small dot cursor / mobile bouncing ball */}
            <motion.div
                className="custom-cursor-dot"
                animate={{
                    x: isMobile ? ballPos.x : mousePosition.x - 5,
                    y: isMobile ? ballPos.y : mousePosition.y - 5,
                    scale: isHovering && !isMobile ? 0 : 1,
                    opacity: 1
                }}
                transition={isMobile ? { duration: 0 } : { type: "tween", ease: "linear", duration: 0 }}
            />

            {/* The trailing ring / hover state (Hidden on mobile) */}
            {!isMobile && (
                <motion.div
                    className="custom-cursor-ring"
                    animate={{
                        x: mousePosition.x - 18,
                        y: mousePosition.y - 18,
                        scale: isHovering ? 1.5 : 1,
                        borderColor: isHovering ? "var(--primary)" : "var(--gold)"
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
                />
            )}

            <style jsx global>{`
                /* Kept native cursor visible */

                .custom-cursor-dot {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 10px;
                    height: 10px;
                    background-color: var(--primary);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                }

                .custom-cursor-ring {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 36px;
                    height: 36px;
                    border: 2px solid var(--gold);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    background-color: transparent;
                }

                @media (max-width: 991px) {
                    /* On mobile, keep the dot bouncing but hide the trailing ring, and allow normal pointer interaction */
                    .custom-cursor-ring {
                        display: none !important;
                    }
                    .custom-cursor-dot {
                        mix-blend-mode: normal;
                        background-color: var(--primary);
                        box-shadow: 0 0 10px rgba(141, 27, 51, 0.4);
                        z-index: 1; /* keep it behind fixed headers if possible so it doesnt get in the way */
                    }
                }
            `}</style>
        </>
    );
}
