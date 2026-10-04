"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RoadTimelineExperience } from "@/components/RoadTimelineExperience";
import { ModernContactSection } from "@/components/ModernContactSection";
import { ModernProjectsSection } from "@/components/ModernProjectsSection";
import { RealBlogsAndFeedback } from "@/components/RealBlogsAndFeedback";

const dynamicRoles = [
  "Architecting Autonomous Realities",
  "Synthesizing Neural Intelligence",
  "Deciphering Cognitive Algorithms",
  "Engineering Enterprise Horizons",
  "Building Scalable Machine Minds",
];

export default function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);
  const [isDossierUnlocked, setIsDossierUnlocked] = useState<boolean>(false);
  const [activeDossierTab, setActiveDossierTab] = useState<string>("neural-code");
  const [activeServiceDrawer, setActiveServiceDrawer] = useState<"ml" | "web" | "analytics" | "automation" | null>(null);
  const [pinnedServiceDrawer, setPinnedServiceDrawer] = useState<string | null>(null);
  const [serviceSearchQuery, setServiceSearchQuery] = useState<string>("");

  // Interactive Hero Visual Mode (Anime & Vector Artwork)
  const [heroGraphicMode, setHeroGraphicMode] = useState<"anime" | "analytics" | "enterprising" | "screens" | "classic">("anime");
  const heroGraphics = {
    anime: {
      src: "/img/vectors/vector-anime-avatar.jpeg",
      label: "Cyber Anime Creator Persona",
      badge: "⚡ Anime Creator Persona",
    },
    analytics: {
      src: "/img/vectors/vector-ui-analytics-3d.jpeg",
      label: "3D AI Analytics Dashboard",
      badge: "📊 3D Telemetry Architecture",
    },
    enterprising: {
      src: "/img/vectors/vector-enterprising-man.jpeg",
      label: "Enterprising Systems Engineer",
      badge: "💻 Sprint Execution & Systems",
    },
    screens: {
      src: "/img/vectors/vector-ui-animation-screens.jpeg",
      label: "Reactive Animated Screens",
      badge: "📱 Reactive UI/UX Interfaces",
    },
    classic: {
      src: "/img/banner/home-right.png",
      label: "Aurxon Neural Core",
      badge: "🌐 Aurxon Digital Grid",
    },
  };

  // Region, Date and Live Clock Auto-Detection
  const [liveClock, setLiveClock] = useState<string>("");
  const [liveDate, setLiveDate] = useState<string>("");
  const [visitorRegion, setVisitorRegion] = useState<{
    isIndia: boolean;
    label: string;
    timezone: string;
  }>({
    isIndia: true,
    label: "🇮🇳 India Registered Hub (Indore Central Central)",
    timezone: "Asia/Kolkata (IST • UTC+5:30)",
  });

  // Dynamic changing of words every 2.4s
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % dynamicRoles.length);
    }, 2400);
    return () => clearInterval(roleInterval);
  }, []);

  // Time, Date & Region Auto-Detection Engine
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setLiveDate(now.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }));
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Auto-detect visitor location from browser timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const isIndiaTz = tz.toLowerCase().includes("kolkata") || tz.toLowerCase().includes("calcutta") || tz.toLowerCase().includes("india") || (new Date().getTimezoneOffset() === -330);
      if (isIndiaTz) {
        setVisitorRegion({
          isIndia: true,
          label: "🇮🇳 India Registered Hub (Indore Central Central)",
          timezone: "Asia/Kolkata (IST • UTC+5:30)",
        });
      } else {
        setVisitorRegion({
          isIndia: false,
          label: `🌐 Global Client Origin (${tz || "International"})`,
          timezone: `${tz} • Linked to Indore HQ`,
        });
      }
    } catch {
      // Fallback
    }

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <>
      {/* ================ Start Home Banner Area (Cinematic & Founder Dedicated) ================= */}
      <section className="home_banner_area" id="home">
        <div className="banner_inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="banner_content">
                  {/* Official Aurxon Branding Badge */}
                  <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                    <a
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aurxon_header_badge"
                      title="Visit Aurxon Official Website (aurxon.com)"
                    >
                      <img src="/img/logo/aurxon-logo-official.png" alt="Aurxon Official Logo" className="aurxon_header_logo_img" />
                      <span className="badge_divider">|</span>
                      <span>FOUNDER &bull; CHIEF AI ARCHITECT</span>
                    </a>
                    <span className="tagline_mini_pill">Next Gen AI Solutions</span>
                  </div>

                  <h3 className="text-uppercase hero_greeting">Hello, I Am</h3>
                  <h1 className="text-uppercase hero_name">Karan Mishra</h1>
                  <div className="hero_alias_subtitle mb-2">
                    <span className="badge badge-dark border border-secondary text-gold px-2 py-1 small font-mono mr-2">Karann Mishra</span>
                    <span className="text-muted small font-mono">G Karan Mishra &bull; Founder @ Aurxon &bull; @CodeSage4D</span>
                  </div>
                  
                  {/* Dynamic Changing Words Rotating Banner */}
                  <div className="dynamic_role_cycler_box">
                    <span className="role_cycler_spark">⚡</span>
                    <span className="role_cycler_text" key={currentRoleIndex}>
                      {dynamicRoles[currentRoleIndex]}
                    </span>
                  </div>

                  <p className="banner_bio_text">
                    Architecting production-grade enterprise AI platforms, autonomous neural systems, and institutional software. Leading <strong>Aurxon</strong> with 47+ open-source GitHub repositories and cutting-edge applied AI research.
                  </p>

                  <div className="d-flex align-items-center flex-wrap banner_btn_row">
                    <a
                      className="primary_btn hero_consult_btn"
                      href="#direct-contact-section"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("direct-contact-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <i className="fa fa-handshake-o mr-2"></i>
                      <span>Initiate Executive Consultation</span>
                    </a>
                    <a
                      className="primary_btn tr-bg hero_cv_btn"
                      href="/pdf/Karann_Mishra_Python_Software_Engineer_Resume.pdf"
                      download="Karann_Mishra_Resume.pdf"
                      title="Download Updated Python Software Engineer Resume"
                    >
                      <i className="fa fa-file-pdf-o mr-2"></i>
                      <span>Get CV</span>
                    </a>
                    <a
                      className="primary_btn tr-bg hero_aurxon_btn"
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Official Aurxon Platform"
                    >
                      <i className="fa fa-external-link mr-2"></i>
                      <span>Aurxon.com &rarr;</span>
                    </a>
                    <Link
                      className="primary_btn tr-bg hero_card_btn"
                      href="/card"
                      title="9:16 Portrait Smart Business Card"
                    >
                      <i className="fa fa-id-card-o mr-2"></i>
                      <span>Smart Card</span>
                    </Link>
                    <button
                      type="button"
                      className="primary_btn tr-bg hero_share_btn"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("open-portfolio-share"));
                        }
                      }}
                      title="Share Portfolio URL with Auto-Generated Message"
                    >
                      <i className="fa fa-share-alt mr-2"></i>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="home_right_img_wrapper text-center">
                  <div className="hero_img_aurora_glow"></div>
                  
                  {/* Interactive Graphic Container */}
                  <div className="hero_main_graphic_frame position-relative">
                    <img
                      className="img-fluid hero_main_graphic rounded"
                      src={heroGraphics[heroGraphicMode].src}
                      alt={heroGraphics[heroGraphicMode].label}
                      style={{ maxHeight: "420px", objectFit: "cover", boxShadow: "0 15px 45px rgba(0,0,0,0.6)" }}
                    />
                    <div className="hero_mode_floating_tag font-mono">
                      <span>{heroGraphics[heroGraphicMode].badge}</span>
                    </div>
                  </div>

                  {/* Interactive Visual Switcher Controls */}
                  <div className="hero_visual_switcher_pills mt-3 d-flex justify-content-center gap-1 flex-wrap">
                    <button
                      type="button"
                      className={`visual_pill_btn ${heroGraphicMode === "anime" ? "active" : ""}`}
                      onClick={() => setHeroGraphicMode("anime")}
                      title="View Karan Mishra's Cyber Anime Persona"
                    >
                      ⚡ Anime
                    </button>
                    <button
                      type="button"
                      className={`visual_pill_btn ${heroGraphicMode === "analytics" ? "active" : ""}`}
                      onClick={() => setHeroGraphicMode("analytics")}
                      title="View 3D AI Analytics Dashboard"
                    >
                      📊 3D UI
                    </button>
                    <button
                      type="button"
                      className={`visual_pill_btn ${heroGraphicMode === "enterprising" ? "active" : ""}`}
                      onClick={() => setHeroGraphicMode("enterprising")}
                      title="View Enterprising Software Engineer"
                    >
                      💻 Architect
                    </button>
                    <button
                      type="button"
                      className={`visual_pill_btn ${heroGraphicMode === "screens" ? "active" : ""}`}
                      onClick={() => setHeroGraphicMode("screens")}
                      title="View Animated UI Screens"
                    >
                      📱 Screens
                    </button>
                    <button
                      type="button"
                      className={`visual_pill_btn ${heroGraphicMode === "classic" ? "active" : ""}`}
                      onClick={() => setHeroGraphicMode("classic")}
                      title="View Core Architecture Graphic"
                    >
                      🌐 Core
                    </button>
                  </div>

                  <div className="hero_floating_badge heartbeat_soft">
                    <img src="/img/logo/aurxon-logo-official.png" alt="Aurxon" className="badge_logo_mini" />
                    <div className="text-left ml-2">
                      <div className="badge_lead">Where Intelligence</div>
                      <div className="badge_sub">Meets Innovation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Home Banner Area ================= */}

      {/* ================ Start About Us Area (Mysterious, Heavy & Interactive Founder Dossier) ================= */}
      <section className="about_area section_gap" id="about-section">
        <div className="container">
          <div className="row justify-content-start align-items-center">
            <div className="col-lg-5">
              <div className="about_visual_stack">
                <div className="about_card_glass_backdrop"></div>
                <img
                  className="img-fluid about_primary_portrait"
                  src="/img/founder/karan_mishra_founder.jpg"
                  alt="Karan Mishra (Karann Mishra, G Karan Mishra) - Founder & Chief AI Architect at Aurxon"
                />
                <div className="about_classified_badge">
                  <span className="radar_ping"></span>
                  <span>DOSSIER STATUS: LEVEL 4 CLEARED</span>
                </div>
                {/* Dual Anime & Vector Persona Badges */}
                <div className="vector_accent_bubble vector_anime_chip" title="Karan Mishra - Cyber Anime Creator Persona">
                  <img src="/img/vectors/vector-anime-avatar.jpeg" alt="Cyber Anime Persona" className="vector_img_mini" />
                  <span className="vector_bubble_label font-mono">Anime Persona</span>
                </div>
                <div className="vector_accent_bubble vector_engineer_chip" title="Enterprising Systems Engineer">
                  <img src="/img/vectors/vector-enterprising-man.jpeg" alt="Enterprise Engineering" className="vector_img_mini" />
                  <span className="vector_bubble_label font-mono">Systems Architect</span>
                </div>
              </div>
            </div>

            <div className="offset-lg-1 col-lg-6">
              <div className="main_title text-left">
                <span className="about_eyebrow">
                  <i className="fa fa-fingerprint mr-2"></i> THE ARCHITECT'S CODEX &bull; ORIGINS
                </span>
                <h2 className="mt-2 font-weight-bold">
                  Deciphering The <br />
                  Mind Behind Aurxon
                </h2>

                <p className="about_lead_philosophy">
                  "Most see algorithms as code. I see them as living cognitive scaffolds—autonomous architectures engineered to liberate human capacity from institutional inertia."
                </p>

                <p className="about_story_body">
                  Operating at the intersection of production machine learning, neural model benchmarking, and distributed software systems, I founded <strong>Aurxon</strong> to build technological infrastructure that transforms complex enterprises into agile, intelligent engines. Known in the developer and AI community as <strong>Karann Mishra</strong> (G Karan Mishra • @CodeSage4D), my mission is to deliver deterministic, high-throughput autonomous systems.
                </p>

                {/* Interactive Dossier Toggle */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setIsDossierUnlocked(!isDossierUnlocked)}
                    className="btn_unlock_dossier"
                  >
                    <span>{isDossierUnlocked ? "🔒 Minimize Dossier Archive" : "🔓 Decrypt Classified Founder Dossier & Intelligence"}</span>
                    <i className={`fa ${isDossierUnlocked ? "fa-chevron-up" : "fa-shield"} ml-2`}></i>
                  </button>
                </div>

                {/* Collapsible Decrypted Deep Dossier */}
                {isDossierUnlocked && (
                  <div className="decrypted_dossier_box mt-4">
                    <div className="dossier_tabs_bar">
                      <button
                        type="button"
                        className={`dossier_tab_btn ${activeDossierTab === "neural-code" ? "active" : ""}`}
                        onClick={() => setActiveDossierTab("neural-code")}
                      >
                        ⚡ Cognitive Blueprint
                      </button>
                      <button
                        type="button"
                        className={`dossier_tab_btn ${activeDossierTab === "aurxon-odyssey" ? "active" : ""}`}
                        onClick={() => setActiveDossierTab("aurxon-odyssey")}
                      >
                        🚀 The Aurxon Odyssey
                      </button>
                      <button
                        type="button"
                        className={`dossier_tab_btn ${activeDossierTab === "suas-fellowship" ? "active" : ""}`}
                        onClick={() => setActiveDossierTab("suas-fellowship")}
                      >
                        🏛️ SUAS Fellowship
                      </button>
                    </div>

                    <div className="dossier_tab_content">
                      {activeDossierTab === "neural-code" && (
                        <div>
                          <h5>Vector Embeddings &amp; High-Frequency Inference</h5>
                          <p>
                            Engineered <strong>Cognivex</strong>, utilizing fine-tuned transformer layers to map technical competencies into dense vector spaces, achieving 98.4% contextual semantic alignment. Built <strong>HemoAI</strong> to forecast critical blood inventory shortages with predictive regression curves.
                          </p>
                          <div className="d-flex gap-2 flex-wrap mt-2">
                            <span className="code_tag">#SentenceTransformers</span>
                            <span className="code_tag">#VectorSearch</span>
                            <span className="code_tag">#FastAPI</span>
                            <span className="code_tag">#PyTorch</span>
                          </div>
                        </div>
                      )}

                      {activeDossierTab === "aurxon-odyssey" && (
                        <div>
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <img src="/img/logo/aurxon-logo-official.png" alt="Aurxon" style={{ height: "24px" }} />
                            <h5 className="mb-0">Zero-to-One Venture Engineering</h5>
                          </div>
                          <p>
                            Founded Aurxon (<em>Where Intelligence Meets Innovation</em>) to provide modular AI and institutional SaaS engines like <strong>Aurxon ERP Lite</strong>. Deployed across regional institutions to manage records, multi-tenant billing, and high-volume student telemetry.
                          </p>
                          <a href="https://aurxon.com" target="_blank" rel="noopener noreferrer" className="dossier_link">
                            Explore Aurxon Official Platform &rarr;
                          </a>
                        </div>
                      )}

                      {activeDossierTab === "suas-fellowship" && (
                        <div>
                          <div className="d-flex align-items-center gap-3 mb-2 flex-wrap">
                            <img src="/img/logos/suas-logo.png" alt="SUAS Indore" style={{ height: "26px" }} />
                            <div>
                              <h5 className="mb-0">Trainer – Applied AI &amp; Systems (SCSIT, Symbiosis)</h5>
                              <small className="text-muted">
                                Symbiosis University of Applied Sciences &bull; Full-time &bull; Sep 2025 - Present &bull; 1 yr 2 mos &bull; Indore, MP (On-site)
                              </small>
                            </div>
                          </div>
                          <p className="mt-2 mb-2 font-weight-500">
                            Supporting academic and applied research activities at the School of Computer Science and IT (SCSIT).
                          </p>
                          <ul className="dossier_bullet_list">
                            <li>Worked closely with faculty on academic and technical projects related to software development and applied AI.</li>
                            <li>Assisted students with Python, machine learning, and NLP concepts through hands-on guidance and debugging support.</li>
                            <li>Helped review, test, and refine student-built applications and early research prototypes.</li>
                            <li>Contributed to the development and testing of AI-based modules and data-driven solutions used in academic settings.</li>
                          </ul>
                          <div className="d-flex gap-2 flex-wrap mt-2">
                            <span className="code_tag">#Python Programming</span>
                            <span className="code_tag">#Machine Learning</span>
                            <span className="code_tag">#Applied AI &amp; Systems</span>
                            <span className="code_tag">#Natural Language Processing</span>
                            <span className="code_tag">#System Architecture</span>
                          </div>
                          <a href="https://www.suas.ac.in" target="_blank" rel="noopener noreferrer" className="dossier_link mt-3 d-inline-block">
                            Visit SUAS Indore Portal &rarr;
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="d-flex align-items-center gap-3 flex-wrap mt-4">
                  <a
                    className="primary_btn"
                    href="/pdf/Karann_Mishra_Python_Software_Engineer_Resume.pdf"
                    download="Karann_Mishra_Resume.pdf"
                  >
                    <span>Download CV</span>
                  </a>
                  <a
                    className="primary_btn tr-bg"
                    href="https://aurxon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Visit Aurxon Platform &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End About Us Area ================= */}

      {/* ================ Start Brand & Experience Area ================= */}
      <section className="brand_area section_gap_bottom" id="brand-partners">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-7">
              <div className="row g-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="col-lg-4 col-md-4 col-sm-4 col-4 mb-3">
                    <div
                      className={`single-brand-item brand_chromatic_item brand_color_${num}`}
                    >
                      <div className="brand_img_box">
                        <img
                          src={`/img/brands/logo${num}.png`}
                          alt="Partner Brand"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="offset-lg-1 col-lg-4 col-md-6 mt-4 mt-lg-0">
              <div className="client-info">
                <div className="d-flex align-items-center">
                  <span className="exper">3+</span>
                  <div className="exper_content ml-3">
                    <h2>Years</h2>
                    <p className="mb-0">Working Experience</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-muted mb-2">
                    <i className="fa fa-phone mr-2 text-primary"></i>
                    Call us now: <strong>+91 83058 39396</strong>
                  </p>
                  <p className="text-muted mb-0">
                    <i className="fa fa-envelope mr-2 text-primary"></i>
                    Email: <strong>karannmishra136@gmail.com</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Brand Area ================= */}

      {/* ================ Start Services & Core Engineering Area ================= */}
      <section className="features_area" id="services-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="main_title">
                <h2>Core Engineering &amp; Services</h2>
                <p>
                  High-velocity software engineering, production machine learning architectures, and scalable full-stack platforms built for founders and enterprise clients.
                </p>
              </div>
            </div>
          </div>

          {/* Architecture & Capabilities Quick Global Search */}
          <div className="row justify-content-center mb-4">
            <div className="col-lg-7 col-md-9">
              <div className="global_arch_search_bar">
                <i className="fa fa-search search_bar_icon"></i>
                <input
                  type="text"
                  className="global_arch_input"
                  placeholder="Quick search architecture &amp; stack (e.g. PyTorch, Next.js, Transformers, Qdrant, Docker, Redis...)"
                  value={serviceSearchQuery}
                  onChange={(e) => {
                    const q = e.target.value;
                    setServiceSearchQuery(q);
                    const lq = q.toLowerCase();
                    if (!q.trim()) {
                      if (!pinnedServiceDrawer) setActiveServiceDrawer(null);
                    } else if (lq.includes("torch") || lq.includes("ml") || lq.includes("neural") || lq.includes("bert") || lq.includes("transform") || lq.includes("qdrant") || lq.includes("cuda")) {
                      setActiveServiceDrawer("ml");
                    } else if (lq.includes("web") || lq.includes("react") || lq.includes("next") || lq.includes("postgres") || lq.includes("node") || lq.includes("typescript") || lq.includes("docker")) {
                      setActiveServiceDrawer("web");
                    } else if (lq.includes("data") || lq.includes("analytic") || lq.includes("python") || lq.includes("pandas") || lq.includes("arrow") || lq.includes("plotly") || lq.includes("redis")) {
                      setActiveServiceDrawer("analytics");
                    } else if (lq.includes("ai") || lq.includes("agent") || lq.includes("langchain") || lq.includes("celery") || lq.includes("broker") || lq.includes("autom")) {
                      setActiveServiceDrawer("automation");
                    }
                  }}
                />
                {serviceSearchQuery && (
                  <button
                    type="button"
                    className="search_clear_pill"
                    onClick={() => {
                      setServiceSearchQuery("");
                      if (!pinnedServiceDrawer) setActiveServiceDrawer(null);
                    }}
                    title="Clear search"
                  >
                    <i className="fa fa-times mr-1"></i> Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div
            className="services_interactive_dock"
            onMouseLeave={() => {
              if (!pinnedServiceDrawer) {
                setActiveServiceDrawer(null);
              }
            }}
          >
            {/* Interactive Service Grid */}
            <div className="row feature_inner">
              {/* 1. Machine Learning Development */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div
                  className={`feature_item feature_interactive ${activeServiceDrawer === "ml" ? "active_service" : ""}`}
                  onMouseEnter={() => setActiveServiceDrawer("ml")}
                  onClick={() => {
                    if (pinnedServiceDrawer === "ml") {
                      setPinnedServiceDrawer(null);
                      setActiveServiceDrawer(null);
                    } else {
                      setPinnedServiceDrawer("ml");
                      setActiveServiceDrawer("ml");
                    }
                  }}
                >
                  <div className="icon" style={{ fontSize: "3.2rem", color: "#007FFF" }}>
                    <i className="fas fa-brain"></i>
                  </div>
                  <h4>Machine Learning Development</h4>
                  <p>
                    Building intelligent systems with advanced machine learning algorithms, sentence transformers, and real-time production inference pipelines.
                  </p>
                  <div className="service_expand_prompt">
                    <span>{activeServiceDrawer === "ml" ? (pinnedServiceDrawer === "ml" ? "Pinned (Click to Unpin) ▲" : "Architecture Active ▲") : "Hover to Inspect ▼"}</span>
                  </div>
                </div>
              </div>

              {/* 2. Web Application Development */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div
                  className={`feature_item feature_interactive ${activeServiceDrawer === "web" ? "active_service" : ""}`}
                  onMouseEnter={() => setActiveServiceDrawer("web")}
                  onClick={() => {
                    if (pinnedServiceDrawer === "web") {
                      setPinnedServiceDrawer(null);
                      setActiveServiceDrawer(null);
                    } else {
                      setPinnedServiceDrawer("web");
                      setActiveServiceDrawer("web");
                    }
                  }}
                >
                  <div className="icon" style={{ fontSize: "3.2rem", color: "#FF5733" }}>
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <h4>Web Application Development</h4>
                  <p>
                    Crafting responsive, user-friendly web applications that are both aesthetically pleasing and functionally robust, using the latest web technologies.
                  </p>
                  <div className="service_expand_prompt">
                    <span>{activeServiceDrawer === "web" ? (pinnedServiceDrawer === "web" ? "Pinned (Click to Unpin) ▲" : "Architecture Active ▲") : "Hover to Inspect ▼"}</span>
                  </div>
                </div>
              </div>

              {/* 3. Data Analytics & Visualization */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div
                  className={`feature_item feature_interactive ${activeServiceDrawer === "analytics" ? "active_service" : ""}`}
                  onMouseEnter={() => setActiveServiceDrawer("analytics")}
                  onClick={() => {
                    if (pinnedServiceDrawer === "analytics") {
                      setPinnedServiceDrawer(null);
                      setActiveServiceDrawer(null);
                    } else {
                      setPinnedServiceDrawer("analytics");
                      setActiveServiceDrawer("analytics");
                    }
                  }}
                >
                  <div className="icon" style={{ fontSize: "3.2rem", color: "#28A745" }}>
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h4>Data Analytics &amp; Visualization</h4>
                  <p>
                    Transforming data into actionable insights with advanced analytics and visually compelling dashboards to drive business growth and efficiency.
                  </p>
                  <div className="service_expand_prompt">
                    <span>{activeServiceDrawer === "analytics" ? (pinnedServiceDrawer === "analytics" ? "Pinned (Click to Unpin) ▲" : "Architecture Active ▲") : "Hover to Inspect ▼"}</span>
                  </div>
                </div>
              </div>

              {/* 4. AI & Automation Solutions */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div
                  className={`feature_item feature_interactive ${activeServiceDrawer === "automation" ? "active_service" : ""}`}
                  onMouseEnter={() => setActiveServiceDrawer("automation")}
                  onClick={() => {
                    if (pinnedServiceDrawer === "automation") {
                      setPinnedServiceDrawer(null);
                      setActiveServiceDrawer(null);
                    } else {
                      setPinnedServiceDrawer("automation");
                      setActiveServiceDrawer("automation");
                    }
                  }}
                >
                  <div className="icon" style={{ fontSize: "3.2rem", color: "#FFC107" }}>
                    <i className="fas fa-robot"></i>
                  </div>
                  <h4>AI &amp; Automation Solutions</h4>
                  <p>
                    Implementing AI-driven automation to streamline processes, reduce manual effort, and boost productivity across various industries.
                  </p>
                  <div className="service_expand_prompt">
                    <span>{activeServiceDrawer === "automation" ? (pinnedServiceDrawer === "automation" ? "Pinned (Click to Unpin) ▲" : "Architecture Active ▲") : "Hover to Inspect ▼"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Interactive Drawer Showing Deep Tech Stack & Probability Specs */}
            {activeServiceDrawer && (
              <div className="service_deep_specs_drawer mt-2 mb-4 animate_fade_in">
                <div className="d-flex justify-content-end mb-2">
                  <button
                    type="button"
                    className="drawer_dismiss_btn"
                    onClick={() => {
                      setPinnedServiceDrawer(null);
                      setActiveServiceDrawer(null);
                    }}
                    title="Dismiss Architecture Drawer"
                  >
                    <i className="fa fa-times mr-1"></i> Close Drawer
                  </button>
                </div>
                <div className="drawer_inner">
                  {activeServiceDrawer === "ml" && (
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="specs_badge">TRANSFORMERS &amp; EMBEDDINGS</span>
                          <h4 className="specs_title mb-0">Production Neural Architectures</h4>
                        </div>
                        <p className="specs_desc">
                          Custom fine-tuning of miniLM and BERT checkpoints with FP16 quantization for GPU-accelerated low-latency vector indexing. Built with high-throughput FastAPI microservices and sub-15ms semantic matching pipelines.
                        </p>
                        <div className="d-flex gap-2 flex-wrap mt-2 tech_stack_icons_row">
                          <span className="tech_pill"><i className="fas fa-fire mr-1 text-danger"></i> PyTorch</span>
                          <span className="tech_pill"><i className="fas fa-brain mr-1 text-primary"></i> SentenceTransformers</span>
                          <span className="tech_pill"><i className="fas fa-bolt mr-1 text-warning"></i> FastAPI</span>
                          <span className="tech_pill"><i className="fas fa-microchip mr-1 text-info"></i> TensorRT / CUDA</span>
                          <span className="tech_pill"><i className="fas fa-database mr-1 text-success"></i> Qdrant Vector DB</span>
                        </div>
                      </div>
                      <div className="col-lg-4 mt-3 mt-lg-0 text-lg-right">
                        <div className="metrics_telemetry_box">
                          <div className="metric_stat">
                            <span className="m_label">Inference Latency:</span>
                            <span className="m_val text-success">14.2ms</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">Cosine Accuracy:</span>
                            <span className="m_val text-info">98.4%</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">Uptime Probability:</span>
                            <span className="m_val text-warning">P(SLA) &gt; 0.999</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeServiceDrawer === "web" && (
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="specs_badge">DISTRIBUTED FULL-STACK</span>
                          <h4 className="specs_title mb-0">Enterprise Next.js &amp; Edge Platforms</h4>
                        </div>
                        <p className="specs_desc">
                          Full-stack architectures featuring React Server Components, TypeScript type-safety, and edge caching for sub-100ms first contentful paint (FCP). Scalable to millions of requests with PostgreSQL and Prisma connection pooling.
                        </p>
                        <div className="d-flex gap-2 flex-wrap mt-2 tech_stack_icons_row">
                          <span className="tech_pill"><i className="fab fa-react mr-1 text-info"></i> Next.js 15</span>
                          <span className="tech_pill"><i className="fab fa-js mr-1 text-primary"></i> TypeScript</span>
                          <span className="tech_pill"><i className="fas fa-server mr-1 text-success"></i> PostgreSQL / Prisma</span>
                          <span className="tech_pill"><i className="fab fa-node mr-1 text-warning"></i> Node.js Edge</span>
                          <span className="tech_pill"><i className="fab fa-docker mr-1 text-info"></i> Dockerized</span>
                        </div>
                      </div>
                      <div className="col-lg-4 mt-3 mt-lg-0 text-lg-right">
                        <div className="metrics_telemetry_box">
                          <div className="metric_stat">
                            <span className="m_label">Lighthouse Performance:</span>
                            <span className="m_val text-success">99 / 100</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">First Contentful Paint:</span>
                            <span className="m_val text-info">&lt; 0.4s</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">Throughput Capacity:</span>
                            <span className="m_val text-warning">1,400+ Req/s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeServiceDrawer === "analytics" && (
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="specs_badge">TIME-SERIES &amp; HEURISTICS</span>
                          <h4 className="specs_title mb-0">Visual Data Telemetry &amp; Forecasting</h4>
                        </div>
                        <p className="specs_desc">
                          Transforming high-frequency telemetry streams into actionable mathematical graphs. Integrated with Python Pandas, Plotly dynamic charting, and Apache Arrow for instantaneous batch analytics.
                        </p>
                        <div className="d-flex gap-2 flex-wrap mt-2 tech_stack_icons_row">
                          <span className="tech_pill"><i className="fab fa-python mr-1 text-warning"></i> Python Pandas</span>
                          <span className="tech_pill"><i className="fas fa-chart-pie mr-1 text-primary"></i> Plotly / D3</span>
                          <span className="tech_pill"><i className="fas fa-stream mr-1 text-success"></i> Apache Arrow</span>
                          <span className="tech_pill"><i className="fas fa-memory mr-1 text-danger"></i> Redis In-Memory</span>
                        </div>
                      </div>
                      <div className="col-lg-4 mt-3 mt-lg-0 text-lg-right">
                        <div className="metrics_telemetry_box">
                          <div className="metric_stat">
                            <span className="m_label">Stream Processing:</span>
                            <span className="m_val text-success">50k records/s</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">Anomaly Sensitivity:</span>
                            <span className="m_val text-info">99.7%</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">Cache Hit Ratio:</span>
                            <span className="m_val text-warning">96.8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeServiceDrawer === "automation" && (
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="specs_badge">AUTONOMOUS WORKFLOWS</span>
                          <h4 className="specs_title mb-0">AI Agent Orchestration &amp; Workers</h4>
                        </div>
                        <p className="specs_desc">
                          Multi-agent task distribution with LangChain, Celery asynchronous queue workers, and self-healing task schedulers. Eliminates operational bottlenecks with deterministic event triggers and audit logging.
                        </p>
                        <div className="d-flex gap-2 flex-wrap mt-2 tech_stack_icons_row">
                          <span className="tech_pill"><i className="fas fa-robot mr-1 text-warning"></i> LangChain Agents</span>
                          <span className="tech_pill"><i className="fas fa-tasks mr-1 text-info"></i> Celery Workers</span>
                          <span className="tech_pill"><i className="fas fa-network-wired mr-1 text-primary"></i> Redis Event Broker</span>
                          <span className="tech_pill"><i className="fas fa-shield-alt mr-1 text-success"></i> Automated Failover</span>
                        </div>
                      </div>
                      <div className="col-lg-4 mt-3 mt-lg-0 text-lg-right">
                        <div className="metrics_telemetry_box">
                          <div className="metric_stat">
                            <span className="m_label">Task Reliability:</span>
                            <span className="m_val text-success">99.99%</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">Queue Latency:</span>
                            <span className="m_val text-info">&lt; 5ms</span>
                          </div>
                          <div className="metric_stat">
                            <span className="m_label">Automation ROI:</span>
                            <span className="m_val text-warning">10x Speed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Vector Feature Spotlights */}
          <div className="row mt-4 align-items-center justify-content-center">
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="vector_spotlight_card d-flex align-items-center gap-3">
                <img src="/img/vectors/vector-scalable-solutions.jpeg" alt="Scalable Solutions" className="spotlight_vector_thumb" />
                <div>
                  <h5 className="mb-1 font-weight-bold" style={{ fontSize: "0.95rem" }}>Scalable Enterprise</h5>
                  <p className="small text-muted mb-0">High-throughput microservices &amp; zero downtime.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="vector_spotlight_card d-flex align-items-center gap-3">
                <img src="/img/vectors/vector-hybrid-apps.jpeg" alt="Hybrid App Systems" className="spotlight_vector_thumb" />
                <div>
                  <h5 className="mb-1 font-weight-bold" style={{ fontSize: "0.95rem" }}>Hybrid Mobile &amp; Edge</h5>
                  <p className="small text-muted mb-0">Native sensor hooks &amp; low-latency edge AI.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="vector_spotlight_card d-flex align-items-center gap-3">
                <img src="/img/vectors/vector-brand-trust.jpeg" alt="Brand Trust" className="spotlight_vector_thumb" />
                <div>
                  <h5 className="mb-1 font-weight-bold" style={{ fontSize: "0.95rem" }}>Enterprise Trust</h5>
                  <p className="small text-muted mb-0">Verifiable architecture &amp; long-term contracts.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="vector_spotlight_card d-flex align-items-center gap-3">
                <img src="/img/vectors/vector-worker-creative.jpeg" alt="Engineering Craftsmanship" className="spotlight_vector_thumb" />
                <div>
                  <h5 className="mb-1 font-weight-bold" style={{ fontSize: "0.95rem" }}>Craftsmanship</h5>
                  <p className="small text-muted mb-0">Obsessive attention to code &amp; system quality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Services Area ================= */}

      {/* ================ Start Real-Time GitHub Projects & Codebases Area ================= */}
      <ModernProjectsSection />
      {/* ================ End Real-Time GitHub Projects Area ================= */}

      {/* ================ Start Storytelling Road Timeline Experience Area ================= */}
      <RoadTimelineExperience />
      {/* ================ End Storytelling Road Timeline Experience Area ================= */}

      {/* ================ Start Real Technical Publications & Client Feedback Area ================= */}
      <RealBlogsAndFeedback />
      {/* ================ End Real Technical Publications & Client Feedback Area ================= */}

      {/* ================ Start Modern Direct Contact Area ================= */}
      <ModernContactSection />
      {/* ================ End Modern Direct Contact Area ================= */}

      {/* Scoped CSS for Landing Page */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Auto download toast */
        .card_auto_download_toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          animation: slideUpToast 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toast_inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          background: rgba(15, 23, 42, 0.95);
          color: #ffffff;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          font-size: 0.85rem;
          backdrop-filter: blur(8px);
        }

        .toast_pulse_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .toast_action_link {
          color: #38bdf8;
          font-weight: 700;
          text-decoration: none;
        }

        .toast_close_btn {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0 4px;
        }

        @keyframes slideUpToast {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Glassmorphism Section Transitions */
        .home_banner_area, .about_area, .brand_area, .features_area {
          background: transparent !important;
          position: relative;
        }

        /* Hero Banner */
        .home_banner_area {
          position: relative;
          padding: 130px 0 75px;
        }

        .aurxon_header_badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 16px;
          background: rgba(2, 132, 199, 0.1);
          color: #0284c7;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .dark .aurxon_header_badge {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .aurxon_header_logo_img {
          height: 20px;
          width: auto;
          object-fit: contain;
        }

        .badge_divider {
          color: rgba(2, 132, 199, 0.4);
        }

        .tagline_mini_pill {
          font-size: 0.76rem;
          font-weight: 750;
          color: #64748b;
          background: rgba(241, 245, 249, 0.8);
          padding: 4px 10px;
          border-radius: 50px;
          backdrop-filter: blur(8px);
        }

        .dark .tagline_mini_pill {
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
        }

        .hero_greeting {
          font-size: 1.1rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .hero_name {
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
          color: #0f172a;
        }

        .dark .hero_name {
          color: #ffffff;
        }

        /* Dynamic Changing Words Box */
        .dynamic_role_cycler_box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(2, 132, 199, 0.08);
          padding: 8px 18px;
          border-radius: 50px;
          margin-bottom: 18px;
          animation: glowPulse 3s infinite alternate;
        }

        .dark .dynamic_role_cycler_box {
          background: rgba(56, 189, 248, 0.12);
        }

        .role_cycler_spark {
          font-size: 1rem;
          color: #f59e0b;
        }

        .role_cycler_text {
          font-size: 1.02rem;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 0.02em;
          animation: fadeInSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .role_cycler_text {
          color: #38bdf8;
        }

        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glowPulse {
          from { box-shadow: 0 0 10px rgba(2, 132, 199, 0.1); }
          to { box-shadow: 0 0 20px rgba(2, 132, 199, 0.25); }
        }

        .banner_bio_text {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #475569;
          max-width: 600px;
          margin-bottom: 28px;
        }

        .dark .banner_bio_text {
          color: #94a3b8;
        }

        /* Hero Right Graphic & Floating Glass Badge */
        .home_right_img_wrapper {
          position: relative;
        }

        .hero_img_aurora_glow {
          position: absolute;
          inset: 10%;
          background: radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, rgba(168, 85, 247, 0.18) 50%, transparent 75%);
          filter: blur(40px);
          z-index: 0;
          pointer-events: none;
        }

        .hero_main_graphic {
          position: relative;
          z-index: 1;
        }

        .hero_floating_badge {
          position: absolute;
          bottom: 20px;
          left: 10px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 8px 14px;
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
          display: flex;
          align-items: center;
        }

        .dark .hero_floating_badge {
          background: rgba(15, 23, 42, 0.88);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.6);
        }

        .badge_logo_mini {
          height: 22px;
          width: auto;
          object-fit: contain;
        }

        .badge_lead {
          font-size: 0.74rem;
          font-weight: 800;
          color: #0284c7;
          line-height: 1.1;
        }

        .dark .badge_lead {
          color: #38bdf8;
        }

        .badge_sub {
          font-size: 0.68rem;
          color: #64748b;
        }

        /* About Section: Mysterious & Unique Visual Stack */
        .about_visual_stack {
          position: relative;
          text-align: center;
        }

        .about_card_glass_backdrop {
          position: absolute;
          inset: 5%;
          background: radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, rgba(133, 79, 238, 0.12) 60%, transparent 80%);
          filter: blur(35px);
          z-index: 0;
        }

        .about_primary_portrait {
          position: relative;
          z-index: 1;
        }

        .about_classified_badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 2;
          background: rgba(9, 23, 31, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #CEA17A;
          font-family: monospace;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          border: none !important;
          outline: none !important;
        }

        .radar_ping {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #73C4BF;
          box-shadow: 0 0 8px #73C4BF;
        }

        /* Regional Telemetry Bar */
        .regional_telemetry_bar {
          background: rgba(9, 23, 31, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 12px 20px;
          border-radius: 50px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
          border: none !important;
          outline: none !important;
        }

        .regional_pulse_beacon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #73C4BF;
          box-shadow: 0 0 10px #73C4BF;
        }

        .regional_label {
          font-size: 0.85rem;
          color: #CEA17A;
        }

        .regional_divider {
          color: rgba(255, 255, 255, 0.2);
        }

        .regional_tz {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .regional_time_box {
          font-size: 0.86rem;
          color: #ffffff;
        }

        .live_digital_clock {
          color: #73C4BF;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .date_indicator {
          color: #CEA17A;
          font-size: 0.8rem;
          background: rgba(206, 161, 122, 0.12);
          padding: 2px 8px;
          border-radius: 6px;
        }

        /* Feature Interactive Cards & Drawer */
        .feature_interactive {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: none !important;
          outline: none !important;
          position: relative;
        }

        .feature_interactive:hover, .feature_interactive.active_service {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 24px rgba(115, 196, 191, 0.12) !important;
        }

        .feature_interactive.active_service {
          background: rgba(9, 23, 31, 0.95) !important;
        }

        .service_expand_prompt {
          margin-top: 12px;
          font-size: 0.76rem;
          color: #73C4BF;
          font-weight: 700;
          font-family: monospace;
          letter-spacing: 0.04em;
        }

        .service_deep_specs_drawer {
          background: rgba(9, 23, 31, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 24px 28px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          animation: fadeInSpecs 0.35s ease;
          border: none !important;
          outline: none !important;
        }

        @keyframes fadeInSpecs {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .specs_badge {
          font-family: monospace;
          font-size: 0.7rem;
          color: #CEA17A;
          background: rgba(206, 161, 122, 0.15);
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 700;
        }

        .specs_title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }

        .specs_desc {
          font-size: 0.88rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-top: 6px;
        }

        .tech_stack_icons_row .tech_pill {
          background: rgba(255, 255, 255, 0.05);
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 0.78rem;
          color: #f1f5f9;
          display: inline-flex;
          align-items: center;
        }

        .metrics_telemetry_box {
          background: rgba(6, 36, 86, 0.3);
          border-radius: 12px;
          padding: 14px 18px;
        }

        .metric_stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          padding: 4px 0;
        }

        .metric_stat .m_label {
          color: #94a3b8;
        }

        .metric_stat .m_val {
          font-family: monospace;
          font-weight: 700;
        }

        /* Toast Actions */
        .toast_heading {
          display: block;
          font-size: 0.84rem;
          color: #CEA17A;
        }

        .toast_desc {
          display: block;
          font-size: 0.72rem;
          color: #94a3b8;
        }

        .btn_toast_action {
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn_toast_png {
          background: #CEA17A;
          color: #09171F;
        }

        .btn_toast_png:hover {
          background: #dfb28c;
        }

        .btn_toast_vcard {
          background: rgba(115, 196, 191, 0.2);
          color: #73C4BF;
        }

        .btn_toast_vcard:hover {
          background: rgba(115, 196, 191, 0.35);
        }

        .vector_accent_bubble {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 2;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        }

        .vector_img_mini {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about_eyebrow {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #0284c7;
          text-transform: uppercase;
        }

        .dark .about_eyebrow {
          color: #38bdf8;
        }

        .about_lead_philosophy {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.6;
          margin: 14px 0 12px;
          font-style: italic;
        }

        .dark .about_lead_philosophy {
          color: #f1f5f9;
        }

        .about_story_body {
          font-size: 1rem;
          line-height: 1.7;
          color: #475569;
        }

        .dark .about_story_body {
          color: #94a3b8;
        }

        .btn_unlock_dossier {
          background: rgba(2, 132, 199, 0.1);
          border: none !important;
          outline: none !important;
          color: #0284c7;
          font-weight: 800;
          font-size: 0.88rem;
          padding: 10px 20px;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          transition: all 0.25s ease;
        }

        .dark .btn_unlock_dossier {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .btn_unlock_dossier:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.25);
        }

        /* Decrypted Classified Dossier Card */
        .decrypted_dossier_box {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: none !important;
          outline: none !important;
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
          animation: fadeInSlide 0.4s ease-out;
        }

        .dark .decrypted_dossier_box {
          background: rgba(15, 23, 42, 0.9);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.6);
        }

        .dossier_tabs_bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .dossier_tab_btn {
          background: transparent;
          border: none !important;
          outline: none !important;
          font-size: 0.82rem;
          font-weight: 750;
          color: #64748b;
          padding: 6px 14px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark .dossier_tab_btn {
          color: #94a3b8;
        }

        .dossier_tab_btn.active {
          background: #0284c7;
          color: #ffffff;
        }

        .dark .dossier_tab_btn.active {
          background: #38bdf8;
          color: #090d16;
        }

        .dossier_tab_content h5 {
          font-size: 1.08rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: #0f172a;
        }

        .dark .dossier_tab_content h5 {
          color: #ffffff;
        }

        .dossier_tab_content p {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 10px;
        }

        .dark .dossier_tab_content p {
          color: #cbd5e1;
        }

        .code_tag {
          font-family: monospace;
          font-size: 0.78rem;
          background: rgba(2, 132, 199, 0.08);
          color: #0284c7;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .dark .code_tag {
          background: rgba(56, 189, 248, 0.12);
          color: #7dd3fc;
        }

        .dossier_link {
          font-size: 0.84rem;
          font-weight: 750;
          color: #0284c7;
          text-decoration: none;
        }

        .dark .dossier_link {
          color: #38bdf8;
        }

        /* BORDERLESS Brand & Feature items */
        .single-brand-item {
          width: 100%;
          height: 100px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: none !important;
          outline: none !important;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
          transition: all 0.3s ease;
        }

        .dark .single-brand-item {
          background: rgba(15, 23, 42, 0.75);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .single-brand-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.12);
        }

        .single-brand-item img {
          max-height: 48px;
          max-width: 80%;
          filter: grayscale(100%);
          opacity: 0.75;
          transition: all 0.3s ease;
        }

        .single-brand-item:hover img {
          filter: grayscale(0%);
          opacity: 1;
        }

        .client-info {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: none !important;
          outline: none !important;
          border-radius: 24px;
          padding: 35px 30px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .dark .client-info {
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .client-info .exper {
          font-size: 3.5rem;
          font-weight: 900;
          color: #0284c7;
          line-height: 1;
        }

        .dark .client-info .exper {
          color: #38bdf8;
        }

        /* BORDERLESS Service Feature Items */
        .feature_item {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: none !important;
          outline: none !important;
          border-radius: 22px;
          padding: 36px 28px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
        }

        .dark .feature_item {
          background: rgba(15, 23, 42, 0.85);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6);
        }

        .feature_item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
        }

        .dark .feature_item:hover {
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.8);
        }

        .feature_item h4 {
          font-size: 1.22rem;
          font-weight: 800;
          margin: 18px 0 10px;
          color: #0f172a;
        }

        .dark .feature_item h4 {
          color: #ffffff;
        }

        .feature_item p {
          font-size: 0.92rem;
          line-height: 1.65;
          color: #64748b;
          margin: 0;
        }

        .dark .feature_item p {
          color: #94a3b8;
        }

        /* Vector Spotlight Cards */
        .vector_spotlight_card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 16px 20px;
          box-shadow: 0 6px 25px rgba(15, 23, 42, 0.04);
        }

        .dark .vector_spotlight_card {
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }

        .spotlight_vector_thumb {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          object-fit: cover;
          flex-shrink: 0;
        }
      `}} />
    </>
  );
}
