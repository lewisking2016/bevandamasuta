import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Chatbot from "@/components/Chatbot";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bevanda Masuta | Refining the Art of Hospitality",
  description: "Boutique hospitality consultancy specializing in mixology, service training, and brand experiences.",
  icons: {
    icon: "/images/blogo.png",
    shortcut: "/images/blogo.png",
    apple: "/images/blogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <CustomCursor />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
