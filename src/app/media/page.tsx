import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getChannelVideos, formatDate, YouTubeVideo } from "@/lib/youtube";
import Link from "next/link";
import { FaWhatsapp, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa6";

// Revalidate this page every hour so it always shows the latest uploads
export const revalidate = 3600;

function VideoCard({ video }: { video: YouTubeVideo }) {
    return (
        <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                borderRadius: "16px",
                overflow: "hidden",
                background: "var(--background)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
                transition: "all 0.4s ease",
                border: "1px solid rgba(0,0,0,0.06)",
            }}
            className="video-card"
        >
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                    className="video-thumb"
                />
                {/* Play Overlay */}
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,0,0,0.2)", transition: "background 0.3s"
                }} className="play-overlay">
                    <div style={{
                        width: "56px", height: "56px", borderRadius: "50%",
                        background: "rgba(141,27,51,0.9)", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        backdropFilter: "blur(4px)"
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }}>
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                    </div>
                </div>
            </div>
            <div style={{ padding: "24px" }}>
                <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--gold)", marginBottom: "10px" }}>
                    {formatDate(video.publishedAt)}
                </p>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.4, color: "var(--foreground)", marginBottom: "10px" }}>
                    {video.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {video.description}
                </p>
            </div>
        </a>
    );
}

export default async function MediaPage() {
    const { videos, error } = await getChannelVideos();
    const [featured, ...rest] = videos;

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section style={{ background: "var(--secondary)", color: "white", paddingTop: "180px", paddingBottom: "80px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "750px" }}>
                        <p style={{ textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "20px" }}>
                            Media & Content
                        </p>
                        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "25px" }}>
                            Watch. Learn. <br />
                            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Be Inspired.</span>
                        </h1>
                        <p style={{ fontSize: "1.05rem", opacity: 0.6, lineHeight: 1.8, marginBottom: "30px" }}>
                            Tutorials, behind-the-scenes, and hospitality insights from the Bevanda Masuta team — all in one place.
                        </p>
                        <a
                            href="https://youtube.com/@bevandamasuta"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "10px",
                                padding: "12px 28px", borderRadius: "100px",
                                background: "rgba(197,160,89,0.1)", border: "1px solid rgba(197,160,89,0.3)",
                                color: "var(--gold)", fontSize: "0.85rem", textTransform: "uppercase",
                                letterSpacing: "2px", textDecoration: "none", fontWeight: 600
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" /></svg>
                            Subscribe on YouTube
                        </a>

                        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "30px" }}>
                            <a href="https://wa.me/254707643570" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", background: "rgba(197,160,89,0.1)", padding: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                                <FaWhatsapp size={22} />
                            </a>
                            <a href="https://youtube.com/@bevandamasuta" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", background: "rgba(197,160,89,0.1)", padding: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                                <FaYoutube size={22} />
                            </a>
                            <a href="https://www.tiktok.com/@bevanda.masuta?_r=1&_t=ZS-94CT6ZyG9CR" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", background: "rgba(197,160,89,0.1)", padding: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                                <FaTiktok size={22} />
                            </a>
                            <a href="https://www.instagram.com/bevandamasuta?igsh=MWd3Mm43ZWtpaGRhbA==" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", background: "rgba(197,160,89,0.1)", padding: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }} className="social-icon">
                                <FaInstagram size={22} />
                            </a>
                        </div>
                    </div>
                </section>

                <section style={{ padding: "var(--section-padding)", background: "var(--background-alt)" }}>
                    <div className="container">

                        {/* Error State */}
                        {error && (
                            <div style={{ textAlign: "center", padding: "80px 40px", maxWidth: "600px", margin: "0 auto" }}>
                                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>📺</div>
                                <h3 style={{ fontSize: "1.6rem", marginBottom: "15px" }}>Videos Coming Soon</h3>
                                <p style={{ color: "var(--text-muted)", marginBottom: "30px", lineHeight: 1.7 }}>
                                    {error === "YouTube API key not configured."
                                        ? "A YouTube API key needs to be configured to display videos. Once set up, all videos from the Bevanda Masuta channel will appear here automatically."
                                        : "We're having trouble loading the videos right now. Please check the YouTube channel directly."}
                                </p>
                                <a href="https://youtube.com/@bevandamasuta" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ borderRadius: "100px", padding: "16px 40px" }}>
                                    Visit YouTube Channel →
                                </a>
                            </div>
                        )}

                        {/* Featured Latest Video */}
                        {featured && (
                            <div style={{ marginBottom: "80px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)", animation: "pulse 2s infinite" }} />
                                    <p style={{ textTransform: "uppercase", letterSpacing: "3px", fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700 }}>
                                        Latest Upload
                                    </p>
                                </div>
                                <a
                                    href={`https://www.youtube.com/watch?v=${featured.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "50px", alignItems: "center", textDecoration: "none", color: "inherit" }}
                                    className="featured-video"
                                >
                                    <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: "20px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.15)" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={featured.thumbnail} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                                            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(141,27,51,0.5)" }}>
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "4px" }}>
                                                    <polygon points="5,3 19,12 5,21" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--gold)", marginBottom: "15px" }}>
                                            {formatDate(featured.publishedAt)}
                                        </p>
                                        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.3, marginBottom: "20px" }}>{featured.title}</h2>
                                        <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "30px", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {featured.description}
                                        </p>
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--primary)", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1.5px", borderBottom: "1px solid var(--primary)", paddingBottom: "5px" }}>
                                            Watch Now →
                                        </span>
                                    </div>
                                </a>
                            </div>
                        )}

                        {/* All Videos Grid */}
                        {rest.length > 0 && (
                            <>
                                <h2 style={{ fontSize: "1.8rem", marginBottom: "40px", fontWeight: 700 }}>All Videos</h2>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" }}>
                                    {rest.map((video) => (
                                        <VideoCard key={video.id} video={video} />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Empty State (no error, no videos) */}
                        {!error && videos.length === 0 && (
                            <div style={{ textAlign: "center", padding: "80px" }}>
                                <p style={{ color: "var(--text-muted)" }}>No videos found. Check back soon.</p>
                            </div>
                        )}
                    </div>
                </section>

                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.4; }
                    }
                    .video-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 30px 60px rgba(0,0,0,0.12) !important;
                    }
                    .video-card:hover .video-thumb {
                        transform: scale(1.05);
                    }
                    @media (max-width: 768px) {
                        .featured-video {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </main>
            <Footer />
        </>
    );
}
