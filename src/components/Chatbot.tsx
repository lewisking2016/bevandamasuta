"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, HelpCircle } from "lucide-react";

type Message = {
    id: string;
    text: string;
    isBot: boolean;
};

const predefinedQA = [
    {
        question: "What services do you offer?",
        answer: "We specialize in Hospitality Training, Brand Experiences, and Strategic Consulting. We elevate bar programs, train high-performance teams, and optimize hospitality operations."
    },
    {
        question: "Where are you located?",
        answer: "We are based in Nairobi, Kenya, but we offer our consulting and training services globally."
    },
    {
        question: "How can I book a session?",
        answer: "You can reach out to us via our Contact Page, email us directly at info@bevandamasuta.com, or call us at +254 707 643570."
    },
    {
        question: "Do you train individuals or just teams?",
        answer: "Both! We offer masterclasses for individuals looking to elevate their craft, as well as comprehensive system rollouts for entire hospitality teams."
    },
    {
        question: "What is your consulting approach?",
        answer: "We take a data-driven approach: auditing your current operations, optimizing COGS and labor models, and designing workflows that maximize profitability without sacrificing guest experience."
    }
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hello! I'm the Bevanda Masuta assistant. How can I help you elevate your hospitality experience today?", isBot: true }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasInteracted = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Auto-open logic
    useEffect(() => {
        // Open after 2.5 seconds
        const openTimer = setTimeout(() => {
            if (!hasInteracted.current) {
                setIsOpen(true);

                // Close after 8 seconds if still no interaction
                setTimeout(() => {
                    if (!hasInteracted.current) {
                        setIsOpen(false);
                    }
                }, 8000);
            }
        }, 2500);

        return () => clearTimeout(openTimer);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(scrollToBottom, 100);
        }
    }, [messages, isOpen, isTyping]);

    const handleQuestionClick = (qa: typeof predefinedQA[0]) => {
        hasInteracted.current = true;
        // Add user message
        const userMsgId = Date.now().toString();
        setMessages(prev => [...prev, { id: userMsgId, text: qa.question, isBot: false }]);

        // Simulate typing
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now().toString(), text: qa.answer, isBot: true }]);
        }, 1000);
    };

    return (
        <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: "absolute",
                            bottom: "80px",
                            right: "0",
                            width: "calc(100vw - 40px)",
                            maxWidth: "400px",
                            background: "var(--background)",
                            borderRadius: "24px",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                            border: "1px solid rgba(0,0,0,0.05)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            height: "600px",
                            maxHeight: "calc(100vh - 120px)"
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            background: "var(--primary)",
                            color: "white",
                            padding: "20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ background: "white", padding: "8px", borderRadius: "50%", color: "var(--primary)" }}>
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: "1rem", margin: 0, fontWeight: 700 }}>Bevanda Concierge</h3>
                                    <p style={{ fontSize: "0.75rem", opacity: 0.8, margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                                        <span style={{ display: "inline-block", width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%" }} />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    hasInteracted.current = true;
                                    setIsOpen(false);
                                }}
                                style={{ color: "white", opacity: 0.8, transition: "opacity 0.2s" }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}
                                aria-label="Close chat"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            background: "var(--background-alt)"
                        }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: msg.isBot ? "flex-start" : "flex-end",
                                        maxWidth: "85%",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px"
                                    }}
                                >
                                    <div style={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        gap: "8px",
                                        flexDirection: msg.isBot ? "row" : "row-reverse"
                                    }}>
                                        <div style={{
                                            width: "28px",
                                            height: "28px",
                                            borderRadius: "50%",
                                            background: msg.isBot ? "var(--gold)" : "var(--foreground)",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}>
                                            {msg.isBot ? <Bot size={14} /> : <User size={14} />}
                                        </div>
                                        <div style={{
                                            background: msg.isBot ? "var(--white)" : "var(--foreground)",
                                            color: msg.isBot ? "var(--foreground)" : "white",
                                            padding: "12px 16px",
                                            borderRadius: "18px",
                                            borderBottomLeftRadius: msg.isBot ? "4px" : "18px",
                                            borderBottomRightRadius: msg.isBot ? "18px" : "4px",
                                            fontSize: "0.9rem",
                                            lineHeight: 1.5,
                                            boxShadow: msg.isBot ? "0 4px 15px rgba(0,0,0,0.03)" : "none",
                                            border: msg.isBot ? "1px solid rgba(0,0,0,0.05)" : "none"
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ alignSelf: "flex-start", display: "flex", gap: "8px", alignItems: "flex-end" }}
                                >
                                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--gold)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Bot size={14} />
                                    </div>
                                    <div style={{ background: "var(--white)", padding: "12px 16px", borderRadius: "18px", borderBottomLeftRadius: "4px", border: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: "4px" }}>
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: "6px", height: "6px", background: "var(--gold)", borderRadius: "50%" }} />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: "6px", height: "6px", background: "var(--gold)", borderRadius: "50%" }} />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: "6px", height: "6px", background: "var(--gold)", borderRadius: "50%" }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Question Chips */}
                        <div style={{ padding: "15px", background: "var(--white)", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px", fontWeight: 700 }}>
                                <HelpCircle size={14} /> Frequently Asked
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {predefinedQA.map((qa, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuestionClick(qa)}
                                        disabled={isTyping}
                                        style={{
                                            background: "var(--background-alt)",
                                            border: "1px solid rgba(0,0,0,0.05)",
                                            padding: "8px 14px",
                                            borderRadius: "100px",
                                            fontSize: "0.8rem",
                                            color: "var(--primary)",
                                            cursor: isTyping ? "not-allowed" : "pointer",
                                            transition: "all 0.2s",
                                            opacity: isTyping ? 0.6 : 1,
                                            textAlign: "left"
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isTyping) {
                                                e.currentTarget.style.background = "var(--primary)";
                                                e.currentTarget.style.color = "white";
                                                e.currentTarget.style.borderColor = "var(--primary)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isTyping) {
                                                e.currentTarget.style.background = "var(--background-alt)";
                                                e.currentTarget.style.color = "var(--primary)";
                                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
                                            }
                                        }}
                                    >
                                        {qa.question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    hasInteracted.current = true;
                    setIsOpen(!isOpen);
                }}
                style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: isOpen ? "var(--foreground)" : "var(--primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 25px rgba(141, 27, 51, 0.4)",
                    transition: "background 0.3s ease"
                }}
                aria-label="Toggle chat"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.button>
        </div>
    );
}
