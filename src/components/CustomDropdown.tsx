"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    label: string;
    options: Option[] | { label: string; options: Option[] }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function CustomDropdown({ label, options, value, onChange, placeholder, disabled }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOptionLabel = options.flatMap(opt => 'options' in opt ? opt.options : opt).find(opt => opt.value === value)?.label || placeholder || "Select an option...";

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
            <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: "var(--foreground)", fontWeight: 600 }}>{label}</label>

            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    background: "var(--background-alt)",
                    cursor: disabled ? "not-allowed" : "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.95rem",
                    transition: "border 0.3s, box-shadow 0.3s",
                    boxShadow: isOpen ? "0 4px 20px rgba(141, 27, 51, 0.08)" : "none",
                    borderColor: isOpen ? "var(--primary)" : "rgba(0,0,0,0.1)"
                }}
            >
                <span style={{ opacity: value ? 1 : 0.5 }}>{selectedOptionLabel}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={18} opacity={0.5} />
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: 0,
                            right: 0,
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                            zIndex: 100,
                            maxHeight: "300px",
                            overflowY: "auto",
                            padding: "8px",
                            border: "1px solid rgba(0,0,0,0.05)"
                        }}
                    >
                        {options.map((opt, i) => {
                            if ('options' in opt) {
                                return (
                                    <div key={i}>
                                        <div style={{ padding: "12px 16px 6px", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--gold)", fontWeight: 700 }}>{opt.label}</div>
                                        {opt.options.map(item => (
                                            <div
                                                key={item.value}
                                                onClick={() => handleSelect(item.value)}
                                                style={{
                                                    padding: "12px 16px",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    fontSize: "0.9rem",
                                                    background: value === item.value ? "rgba(141, 27, 51, 0.05)" : "transparent",
                                                    color: value === item.value ? "var(--primary)" : "var(--foreground)",
                                                    transition: "background 0.2s"
                                                }}
                                                className="dropdown-item"
                                            >
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                            return (
                                <div
                                    key={opt.value}
                                    onClick={() => handleSelect(opt.value)}
                                    style={{
                                        padding: "12px 16px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        background: value === opt.value ? "rgba(141, 27, 51, 0.05)" : "transparent",
                                        color: value === opt.value ? "var(--primary)" : "var(--foreground)",
                                        transition: "background 0.2s"
                                    }}
                                    className="dropdown-item"
                                >
                                    {opt.label}
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
