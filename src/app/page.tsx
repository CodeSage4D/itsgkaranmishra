"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NeuralBackground } from "@/components/NeuralBackground";
import { RoadTimelineExperience } from "@/components/RoadTimelineExperience";
import { ModernContactSection } from "@/components/ModernContactSection";
import { ModernProjectsSection } from "@/components/ModernProjectsSection";
import { FeedbackSection } from "@/components/FeedbackSection";
import { generateAndDownloadBusinessCard, downloadVCardContact } from "@/lib/card-canvas";

export default function Home() {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [cardToast, setCardToast] = useState<string | null>(null);

  // Auto-download Atlantic Glacier Blue business card & phone contact on opening portfolio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyDownloaded = sessionStorage.getItem("portfolio_card_auto_downloaded_v4");
      if (!alreadyDownloaded) {
        sessionStorage.setItem("portfolio_card_auto_downloaded_v4", "true");
        const timer = setTimeout(async () => {
          try {
            await generateAndDownloadBusinessCard("png", "glacier");
            downloadVCardContact();
            setCardToast("🪪 Karan Mishra's Official Aurxon Business Card (PNG) & Phone Contact (.vcf) saved to your device!");
            setTimeout(() => setCardToast(null), 6500);
          } catch (e) {
            console.error("Auto card download error:", e);
          }
        }, 1600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <>
      {/* Toast Alert for Auto-Downloaded Card */}
      {cardToast && (
        <div className="card_auto_download_toast">
          <div className="toast_inner">
            <span className="toast_pulse_dot"></span>
            <span className="toast_text">{cardToast}</span>
            <Link href="/card" className="toast_action_link">
              View HD Card &rarr;
            </Link>
            <button
              onClick={() => setCardToast(null)}
              className="toast_close_btn"
              aria-label="Close Toast"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* ================ Home Banner Area (Full Desktop Expansive Redesign) ================= */}
      <section className="home_banner_area full_desktop_hero" id="home">
        <div className="banner_inner">
          <div className="container-fluid container_panoramic">
            <div className="row align-items-center hero_main_row">
              {/* Left Column: Founder Manifesto & Core Identity */}
              <div className="col-lg-6 col-xl-7 hero_left_col">
                <div className="banner_content">
                  {/* Founder Status Strip */}
                  <div className="founder_intro_strip mb-3">
                    <span className="founder_chip">
                      <span className="neon_beacon_dot"></span> FOUNDER &bull; AURXON
                    </span>
                    <span className="tagline_chip">
                      Next Gen AI Solutions
                    </span>
                    <span className="motto_chip d-none d-md-inline-flex">
                      Where Intelligence Meets Innovation
                    </span>
                  </div>

                  <h3 className="hero_greeting text-uppercase">Hello, I Am</h3>
                  <h1 className="hero_person_name text-uppercase">
                    <span className="hero_name_highlight">Karan Mishra</span>
                  </h1>

                  <h5 className="hero_person_subtitle">
                    Founder &bull; Aurxon &bull; Machine Learning &amp; Python Architect
                  </h5>

                  <p className="hero_narrative">
                    Architecting production-grade enterprise AI platforms, autonomous neural systems, and institutional software. Leading <strong>Aurxon</strong> with 47+ open-source GitHub repositories and cutting-edge applied AI research.
                  </p>

                  {/* Symmetrical CTA Action Strip */}
                  <div className="hero_cta_group">
                    <a
                      className="primary_btn heartbeat_soft"
                      href="#direct-contact-section"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("direct-contact-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span><i className="fa fa-handshake-o mr-2"></i>Collaborate with Founder</span>
                    </a>
                    <Link className="primary_btn tr-bg" href="/card" title="9:16 Portrait Smart Business Card">
                      <span><i className="fa fa-id-card-o mr-2"></i>Smart Card</span>
                    </Link>
                    <button
                      className="primary_btn tr-bg"
                      onClick={async () => {
                        await generateAndDownloadBusinessCard("png", "glacier");
                        downloadVCardContact();
                        setCardToast("🪪 Atlantic Glacier Blue Card (PNG) & Phone Contact (.vcf) downloaded!");
                        setTimeout(() => setCardToast(null), 4500);
                      }}
                      title="Direct Download Business Card & VCF Contact"
                    >
                      <span><i className="fa fa-download mr-2"></i>Card + Contact</span>
                    </button>
                    <a className="primary_btn tr-bg" href="/pdf/Karan_Mishra_ResumeDetailed.pdf" download="Karan_Mishra_CV.pdf">
                      <span><i className="fa fa-file-text-o mr-2"></i>Get CV</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Founder Command Card & Tech Dashboard */}
              <div className="col-lg-6 col-xl-5 hero_right_col">
                <div className="hero_command_card">
                  {/* Top Status Bar */}
                  <div className="command_card_header">
                    <div className="d-flex align-items-center gap-2">
                      <span className="status_led_green"></span>
                      <span className="command_header_title">AURXON &bull; FOUNDER COMMAND DECK</span>
                    </div>
                    <span className="engine_badge">AI ENGINE LIVE</span>
                  </div>

                  {/* Founder Visual Frame with Orbiting Badges */}
                  <div className="command_avatar_area">
                    <img
                      className="img-fluid hero_person_image"
                      src="/img/banner/home-right.png"
                      alt="Karan Mishra - Founder Aurxon"
                    />

                    {/* Floating Holographic Telemetry Cards */}
                    <div className="holo_tag tag_top_right">
                      <span className="holo_icon">⚡</span>
                      <div>
                        <div className="holo_label">Venture Platform</div>
                        <div className="holo_val">Aurxon AI Systems</div>
                      </div>
                    </div>

                    <div className="holo_tag tag_bottom_left">
                      <span className="holo_icon">🧠</span>
                      <div>
                        <div className="holo_label">Cognivex AI</div>
                        <div className="holo_val">Sentence Transformers</div>
                      </div>
                    </div>

                    <div className="holo_tag tag_bottom_right">
                      <span className="holo_icon">🌐</span>
                      <div>
                        <div className="holo_label">Open Source</div>
                        <div className="holo_val">47+ GitHub Repos</div>
                      </div>
                    </div>
                  </div>

                  {/* Micro Footer inside Command Deck */}
                  <div className="command_card_footer">
                    <div className="footer_micro_stat">
                      <span className="stat_dot"></span>
                      <span>Next Gen AI Solutions</span>
                    </div>
                    <div className="footer_motto_text">
                      Where Intelligence Meets Innovation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Live Analytics Stats Bar: Full-Width 4-Column Balanced Grid */}
            <div className="hero_analytics_container mt-5 pt-3">
              <div className="row justify-content-center text-center">
                <div className="col-6 col-lg-3 mb-3">
                  <div className="hero_stat_card">
                    <div className="stat_number">3+</div>
                    <div className="stat_label">Years Experience &bull; AI/ML Systems</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 mb-3">
                  <div className="hero_stat_card">
                    <a href="https://github.com/CodeSage4D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div className="stat_number">47+</div>
                      <div className="stat_label">GitHub Repositories (@CodeSage4D)</div>
                    </a>
                  </div>
                </div>
                <div className="col-6 col-lg-3 mb-3">
                  <div className="hero_stat_card">
                    <div className="stat_number">15+</div>
                    <div className="stat_label">Deployed AI Architectures</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 mb-3">
                  <div className="hero_stat_card stat_brand_card">
                    <div className="stat_number brand_highlight_text">AURXON</div>
                    <div className="stat_label">Next Gen AI Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Home Banner Area ================= */}

      {/* ================ Start About Us Area (Balanced Full-Desktop Redesign) ================= */}
      <section className="about_area section_gap" id="about-section">
        <div className="container-fluid container_panoramic">
          <div className="row align-items-center">
            {/* Left Column: Portrait & Credentials */}
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <div className="about_img_wrapper">
                <img
                  className="img-fluid about_portrait_img"
                  src="/img/about-us.png"
                  alt="Karan Mishra - Founder Aurxon"
                />

                {/* Floating Dual Venture Badge */}
                <div className="about_floating_pill heartbeat_soft">
                  <span className="pulse_dot heartbeat_fluctuate"></span>
                  <div className="pill_text_group">
                    <span className="pill_title">Founder &bull; Aurxon</span>
                    <span className="pill_sub">Next Gen AI Solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Dossier & Curiosity Architecture */}
            <div className="col-lg-7">
              <div className="main_title text-left mb-3">
                <span className="badge_about_kicker">
                  FOUNDER DOSSIER &bull; AURXON VISION
                </span>
                <h2 className="about_main_heading mt-2">
                  Where Intelligence Meets Innovation
                </h2>

                <p className="about_lead_teaser">
                  Where theoretical machine learning meets high-velocity venture execution. As the founder of <strong>Aurxon</strong>, I engineer intelligent platforms, distributed enterprise ERPs, and transformer-based semantic engines designed for high-growth ecosystems.
                </p>

                {/* 3 Intriguing Highlights Cards */}
                <div className="about_curiosity_grid mb-4">
                  <div className="curiosity_item">
                    <div className="curiosity_icon">⚡</div>
                    <div>
                      <h4 className="curiosity_title">Autonomous Neural Systems</h4>
                      <p className="curiosity_desc">Architecting deep sentence transformer models (Cognivex) and predictive clinical algorithms (HemoAI).</p>
                    </div>
                  </div>

                  <div className="curiosity_item">
                    <div className="curiosity_icon">🚀</div>
                    <div>
                      <h4 className="curiosity_title">Enterprise ERP &amp; Scale</h4>
                      <p className="curiosity_desc">Spearheading Aurxon ERP Lite to automate administration and records for regional institutions.</p>
                    </div>
                  </div>

                  <div className="curiosity_item">
                    <div className="curiosity_icon">🌐</div>
                    <div>
                      <h4 className="curiosity_title">Research &amp; Open Source</h4>
                      <p className="curiosity_desc">Collaborating on applied AI research while publishing 47+ open-source codebases on GitHub.</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Toggle: Reveal Full Story */}
                <div className="about_interactive_expand_block mb-4">
                  <button
                    type="button"
                    onClick={() => setShowFullAbout(!showFullAbout)}
                    className="btn_reveal_dossier"
                  >
                    <span>{showFullAbout ? "Hide Extended Dossier" : "⚡ Reveal Full Founder Journey & Technical Depth"}</span>
                    <i className={`fa ${showFullAbout ? "fa-angle-up" : "fa-angle-down"}`}></i>
                  </button>

                  {showFullAbout && (
                    <div className="full_about_dossier animate_fade_in mt-3">
                      <p>
                        With over <strong>3+ years of professional engineering experience</strong>, my journey bridges the gap between complex research and production systems. I founded <strong>Aurxon</strong> (previously established as i AIM LABS) to democratize cutting-edge digital infrastructure—giving schools, healthcare facilities, and growing enterprises the software horsepower typically reserved for tech giants.
                      </p>
                      <p>
                        My background in Computer Science from Sri Aurobindo Institute of Technology, coupled with ongoing research collaboration at <strong>Symbiosis University of Applied Sciences (SUAS), Indore</strong>, anchors my approach in sound algorithmic theory and pragmatic full-stack execution (Python, PyTorch, Next.js, FastAPI).
                      </p>
                      <p>
                        Beyond software architecture, I am committed to mentoring aspiring developers, fostering tech entrepreneurship in Central India, and sharing open-source tools with global developers.
                      </p>
                    </div>
                  )}
                </div>

                {/* Action CTA Group */}
                <div className="about_cta_group">
                  <a
                    className="primary_btn"
                    href="/pdf/Karan_Mishra_ResumeDetailed.pdf"
                    download="Karan_Mishra_CV.pdf"
                  >
                    <span><i className="fa fa-download mr-2"></i>Download Full CV</span>
                  </a>
                  <a
                    className="primary_btn tr-bg heartbeat_soft"
                    href="#direct-contact-section"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("direct-contact-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span><i className="fa fa-comments mr-2"></i>Discuss Collaboration<i className="fa fa-arrow-right ml-2"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End About Us Area ================= */}

      {/* ================ Start Features Area (Transparent Glass with Neon Hover Effects) ================= */}
      <section className="features_area" id="services-section">
        <div className="container-fluid container_panoramic">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="main_title mb-5">
                <span className="road_section_badge mb-2">
                  <i className="fa fa-cogs mr-1"></i> Technical Capabilities
                </span>
                <h2>Core Engineering &amp; Services</h2>
                <p>
                  High-velocity software engineering, production machine learning architectures, and scalable full-stack platforms built for founders and enterprise clients.
                </p>
              </div>
            </div>
          </div>
          <div className="row feature_inner">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item feature_glass_card">
                <div className="feature_icon_frame icon_brain">
                  <i className="fa fa-code-fork"></i>
                </div>
                <h4>Machine Learning &amp; NLP</h4>
                <p>
                  Fine-tuning deep neural networks, transformer embeddings, and predictive classifiers for real-time production inference.
                </p>
                <span className="neon_petal_accent"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item feature_glass_card">
                <div className="feature_icon_frame icon_code">
                  <i className="fa fa-laptop"></i>
                </div>
                <h4>Full-Stack Web Architectures</h4>
                <p>
                  Engineering resilient Next.js, React, and Python FastAPI platforms with responsive UI, real-time analytics, and high uptime.
                </p>
                <span className="neon_petal_accent"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item feature_glass_card">
                <div className="feature_icon_frame icon_chart">
                  <i className="fa fa-line-chart"></i>
                </div>
                <h4>Enterprise ERP &amp; Automation</h4>
                <p>
                  Developing automated management systems (Aurxon ERP) to eliminate manual workflows and consolidate operational records.
                </p>
                <span className="neon_petal_accent"></span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item feature_glass_card">
                <div className="feature_icon_frame icon_robot">
                  <i className="fa fa-microchip"></i>
                </div>
                <h4>AI Strategy &amp; Advisory</h4>
                <p>
                  Collaborating with founders and enterprise leaders to evaluate feasibility, design technical roadmaps, and deploy AI models.
                </p>
                <span className="neon_petal_accent"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Features Area ================= */}

      {/* ================ Start Modern Projects Section ================= */}
      <ModernProjectsSection />
      {/* ================ End Modern Projects Section ================= */}

      {/* ================ Start Storytelling Road Timeline Experience Area ================= */}
      <RoadTimelineExperience />
      {/* ================ End Storytelling Road Timeline Experience Area ================= */}

      {/* ================ Start Client & Peer Feedback Endorsements ================= */}
      <FeedbackSection />
      {/* ================ End Client & Peer Feedback Endorsements ================= */}

      {/* ================ Start Modern Direct Contact & Consultation Area ================= */}
      <ModernContactSection />
      {/* ================ End Modern Direct Contact & Consultation Area ================= */}

      {/* Scoped Page Component Styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Panoramic Full Desktop Container */
        .container_panoramic {
          max-width: 1360px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        .full_desktop_hero {
          padding-top: 35px;
          padding-bottom: 30px;
        }

        .hero_main_row {
          min-height: 540px;
        }

        .founder_intro_strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .founder_chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 50px;
          background: rgba(2, 132, 199, 0.1);
          color: #0284c7;
          border: 1px solid rgba(2, 132, 199, 0.3);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .dark .founder_chip {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.4);
        }

        .tagline_chip {
          padding: 5px 12px;
          border-radius: 50px;
          background: rgba(168, 85, 247, 0.1);
          color: #9333ea;
          border: 1px solid rgba(168, 85, 247, 0.25);
          font-size: 0.78rem;
          font-weight: 750;
        }

        .dark .tagline_chip {
          background: rgba(168, 85, 247, 0.18);
          color: #c084fc;
          border-color: rgba(168, 85, 247, 0.35);
        }

        .motto_chip {
          padding: 5px 12px;
          border-radius: 50px;
          background: #f1f5f9;
          color: #475569;
          font-size: 0.76rem;
          font-weight: 650;
        }

        .dark .motto_chip {
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
        }

        .neon_beacon_dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }

        .hero_narrative {
          max-width: 620px;
          line-height: 1.8;
          font-size: 1.08rem;
        }

        /* Right Column: Founder Command Card */
        .hero_command_card {
          position: relative;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(226, 232, 240, 0.9);
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08), 0 0 30px rgba(56, 189, 248, 0.15);
          transition: all 0.35s ease;
        }

        .dark .hero_command_card {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(56, 189, 248, 0.2);
        }

        .command_card_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          margin-bottom: 16px;
        }

        .dark .command_card_header {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .status_led_green {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .command_header_title {
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #0284c7;
        }

        .dark .command_header_title {
          color: #38bdf8;
        }

        .engine_badge {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(16, 185, 129, 0.15);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .dark .engine_badge {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
        }

        .command_avatar_area {
          position: relative;
          text-align: center;
          padding: 10px 0;
        }

        .hero_person_image {
          max-height: 420px;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.15));
        }

        /* Floating Holographic Telemetry Cards */
        .holo_tag {
          position: absolute;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 14px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.1);
          text-align: left;
          transition: all 0.25s ease;
        }

        .dark .holo_tag {
          background: rgba(15, 23, 42, 0.85);
          border-color: rgba(56, 189, 248, 0.35);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .holo_tag:hover {
          transform: translateY(-3px) scale(1.03);
          border-color: #38bdf8;
        }

        .tag_top_right {
          top: 20px;
          right: -10px;
        }

        .tag_bottom_left {
          bottom: 40px;
          left: -15px;
        }

        .tag_bottom_right {
          bottom: 10px;
          right: 5px;
        }

        .holo_icon {
          font-size: 1.2rem;
        }

        .holo_label {
          font-size: 0.68rem;
          font-weight: 750;
          color: #64748b;
          text-transform: uppercase;
        }

        .dark .holo_label {
          color: #94a3b8;
        }

        .holo_val {
          font-size: 0.82rem;
          font-weight: 850;
          color: #0f172a;
        }

        .dark .holo_val {
          color: #ffffff;
        }

        .command_card_footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(226, 232, 240, 0.8);
          margin-top: 12px;
        }

        .dark .command_card_footer {
          border-top-color: rgba(255, 255, 255, 0.1);
        }

        .footer_micro_stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 750;
          color: #0284c7;
        }

        .dark .footer_micro_stat {
          color: #38bdf8;
        }

        .stat_dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0284c7;
        }

        .footer_motto_text {
          font-size: 0.74rem;
          font-weight: 650;
          color: #64748b;
        }

        .dark .footer_motto_text {
          color: #94a3b8;
        }

        /* Hero Stat Cards */
        .hero_stat_card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
          transition: all 0.25s ease;
        }

        .dark .hero_stat_card {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .hero_stat_card:hover {
          transform: translateY(-3px);
          border-color: #38bdf8;
          box-shadow: 0 12px 28px rgba(56, 189, 248, 0.25);
        }

        .stat_number {
          font-size: 2rem;
          font-weight: 850;
          color: #0f172a;
        }

        .dark .stat_number {
          color: #ffffff;
        }

        .stat_label {
          font-size: 0.8rem;
          font-weight: 650;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .dark .stat_label {
          color: #94a3b8;
        }

        .brand_highlight_text {
          background: linear-gradient(135deg, #0284c7 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* About Section Improvements */
        .about_img_wrapper {
          position: relative;
          display: inline-block;
          max-width: 440px;
        }

        .about_portrait_img {
          border-radius: 28px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.14);
        }

        .about_floating_pill {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 50px;
          padding: 8px 16px;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }

        .pill_text_group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .pill_title {
          font-size: 0.84rem;
          font-weight: 800;
          color: #ffffff;
        }

        .pill_sub {
          font-size: 0.7rem;
          font-weight: 600;
          color: #38bdf8;
        }

        .badge_about_kicker {
          font-size: 0.82rem;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 0.06em;
        }

        .dark .badge_about_kicker {
          color: #38bdf8;
        }

        .about_main_heading {
          font-size: 2.3rem;
          font-weight: 850;
          line-height: 1.25;
          color: #0f172a;
        }

        .dark .about_main_heading {
          color: #ffffff;
        }

        .about_lead_teaser {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #334155;
          margin-bottom: 20px;
        }

        .dark .about_lead_teaser {
          color: #cbd5e1;
        }

        /* Curiosity Grid */
        .about_curiosity_grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .curiosity_item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 18px;
          transition: all 0.25s ease;
        }

        .dark .curiosity_item {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .curiosity_item:hover {
          transform: translateY(-2px);
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 8px 20px rgba(56, 189, 248, 0.15);
        }

        .curiosity_icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(2, 132, 199, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          flex-shrink: 0;
        }

        .dark .curiosity_icon {
          background: rgba(56, 189, 248, 0.15);
        }

        .curiosity_title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 2px 0;
        }

        .dark .curiosity_title {
          color: #ffffff;
        }

        .curiosity_desc {
          font-size: 0.85rem;
          line-height: 1.5;
          color: #64748b;
          margin: 0;
        }

        .dark .curiosity_desc {
          color: #94a3b8;
        }

        /* Reveal Dossier Toggle */
        .btn_reveal_dossier {
          background: none;
          border: 1px dashed rgba(2, 132, 199, 0.4);
          border-radius: 12px;
          padding: 10px 16px;
          font-size: 0.86rem;
          font-weight: 750;
          color: #0284c7;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .dark .btn_reveal_dossier {
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.4);
        }

        .btn_reveal_dossier:hover {
          background: rgba(2, 132, 199, 0.08);
          border-color: #0284c7;
        }

        .full_about_dossier {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 18px;
          padding: 22px;
          font-size: 0.94rem;
          line-height: 1.75;
          color: #334155;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .dark .full_about_dossier {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
        }

        /* Responsive Fixes */
        @media (max-width: 991px) {
          .tag_top_right, .tag_bottom_left, .tag_bottom_right {
            position: static;
            margin-top: 8px;
          }
          .hero_command_card {
            margin-top: 32px;
          }
        }
      `}} />
    </>
  );
}
