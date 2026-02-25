import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />

        {/* Call to Action with Background */}
        <section style={{
          position: "relative",
          background: "var(--secondary)",
          color: "white",
          textAlign: "center",
          padding: "150px 20px",
          overflow: "hidden"
        }}>
          {/* Background Image Overlay */}
          <div style={{
            position: "absolute",
            top: "-2%", left: "-2%", right: "-2%", bottom: "-8%",
            backgroundImage: "url('/images/b1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            zIndex: 1
          }} />

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "30px", fontWeight: 800 }}>
              Let&apos;s Create Meaningful Hospitality
            </h2>
            <p style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "40px", maxWidth: "700px", margin: "0 auto 40px", fontWeight: 400 }}>
              Purpose-driven hospitality built on care, clarity, and real-world experience. Elevate your brand today.
            </p>
            <Link href="/contact">
              <button className="btn-primary" style={{ padding: "18px 50px" }}>Contact Us Today</button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
