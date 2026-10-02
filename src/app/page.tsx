"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RoadTimelineExperience } from "@/components/RoadTimelineExperience";
import { ModernContactSection } from "@/components/ModernContactSection";
import { ModernProjectsSection } from "@/components/ModernProjectsSection";
import { generateAndDownloadBusinessCard } from "@/lib/card-canvas";

export default function Home() {
  const [cardToast, setCardToast] = useState<string | null>(null);

  // Auto-download Digital Business Card on first landing page visit
  useEffect(() => {
    const hasDownloaded = sessionStorage.getItem("karan_card_auto_downloaded");
    if (!hasDownloaded) {
      sessionStorage.setItem("karan_card_auto_downloaded", "true");
      const timer = setTimeout(async () => {
        try {
          await generateAndDownloadBusinessCard("png", "glacier");
          setCardToast("Digital Business Card automatically generated & saved.");
          setTimeout(() => {
            setCardToast(null);
          }, 8000);
        } catch (err) {
          console.error("Auto card download:", err);
        }
      }, 1800);
      return () => clearTimeout(timer);
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

      {/* ================ Start Home Banner Area (Founder Dedicated with Authentic Graphic) ================= */}
      <section className="home_banner_area" id="home">
        <div className="banner_inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="banner_content">
                  <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                    <a
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aurxon_header_badge"
                      title="Visit Aurxon Official Website (aurxon.com)"
                    >
                      <img src="/img/png/logo-color.png" alt="Aurxon Logo" className="aurxon_mini_logo" />
                      <span>FOUNDER &bull; AURXON</span>
                    </a>
                    <span className="tagline_mini_pill">Next Gen AI Solutions</span>
                  </div>

                  <h3 className="text-uppercase hero_greeting">Hello, I Am</h3>
                  <h1 className="text-uppercase hero_name">Karan Mishra</h1>
                  <h5 className="text-uppercase hero_title">
                    Founder &bull; Aurxon &bull; AI &amp; Machine Learning Engineer
                  </h5>

                  <p className="banner_bio_text">
                    Architecting production-grade enterprise AI platforms, autonomous neural systems, and institutional software. Leading <strong>Aurxon</strong> with 47+ open-source GitHub repositories and cutting-edge applied AI research.
                  </p>

                  <div className="d-flex align-items-center flex-wrap gap-2 banner_btn_row">
                    <a
                      className="primary_btn"
                      href="#direct-contact-section"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("direct-contact-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>Hire Me</span>
                    </a>
                    <a
                      className="primary_btn tr-bg"
                      href="/pdf/Karan_Mishra_ResumeDetailed.pdf"
                      download="Karan_Mishra_CV.pdf"
                    >
                      <span>Get CV</span>
                    </a>
                    <a
                      className="primary_btn tr-bg"
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Official Aurxon Platform"
                    >
                      <span>Aurxon.com &rarr;</span>
                    </a>
                    <Link
                      className="primary_btn tr-bg"
                      href="/card"
                      title="9:16 Portrait Smart Business Card"
                    >
                      <span>Smart Card</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="home_right_img text-center">
                  <img
                    className="img-fluid"
                    src="/img/banner/home-right.png"
                    alt="Karan Mishra - Founder Aurxon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Home Banner Area ================= */}

      {/* ================ Start About Us Area (Founder Narrative & Authentic Graphic) ================= */}
      <section className="about_area section_gap" id="about-section">
        <div className="container">
          <div className="row justify-content-start align-items-center">
            <div className="col-lg-5">
              <div className="about_img text-center">
                <img
                  className="img-fluid"
                  src="/img/about-us.png"
                  alt="Karan Mishra - About Us"
                />
              </div>
            </div>

            <div className="offset-lg-1 col-lg-6">
              <div className="main_title text-left">
                <h2>
                  let’s <br />
                  Introduce about <br />
                  myself
                </h2>
                <p>
                  Hey there! I'm Karan Mishra, a tech innovator and machine learning engineer with a passion for turning complex computational models into practical, scalable enterprise platforms.
                </p>
                <p>
                  As the founder of <strong>Aurxon</strong> (<em>Where Intelligence Meets Innovation</em>), I direct our neural model benchmarking and distributed software engineering. Our platforms automate workflows for educational institutions, healthcare facilities, and fast-growing organizations.
                </p>
                <p>
                  Concurrently serving as an Applied AI Researcher at <strong>SUAS Indore</strong>, I bridge academic deep learning research with production-grade startup engineering, publishing 47+ open-source GitHub codebases.
                </p>
                <div className="d-flex align-items-center gap-3 flex-wrap mt-4">
                  <a
                    className="primary_btn"
                    href="/pdf/Karan_Mishra_ResumeDetailed.pdf"
                    download="Karan_Mishra_CV.pdf"
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
      <section className="brand_area section_gap_bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="col-lg-4 col-md-4 col-sm-6 mb-3">
                    <div className="single-brand-item d-table">
                      <div className="d-table-cell text-center">
                        <img src={`/img/brands/logo${num}.png`} alt={`Brand Logo ${num}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="offset-lg-2 col-lg-4 col-md-6 mt-4 mt-lg-0">
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
          <div className="row feature_inner">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#007FFF" }}>
                  <i className="fas fa-brain"></i>
                </div>
                <h4>Machine Learning Development</h4>
                <p>
                  Building intelligent systems with advanced machine learning algorithms, sentence transformers, and real-time production inference pipelines.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#FF5733" }}>
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h4>Web Application Development</h4>
                <p>
                  Crafting responsive, user-friendly web applications that are both aesthetically pleasing and functionally robust, using the latest web technologies.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#28A745" }}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4>Data Analytics &amp; Visualization</h4>
                <p>
                  Transforming data into actionable insights with advanced analytics and visually compelling dashboards to drive business growth and efficiency.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#FFC107" }}>
                  <i className="fas fa-robot"></i>
                </div>
                <h4>AI &amp; Automation Solutions</h4>
                <p>
                  Implementing AI-driven automation to streamline processes, reduce manual effort, and boost productivity across various industries.
                </p>
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

        /* Hero Banner */
        .home_banner_area {
          position: relative;
          padding: 140px 0 80px;
        }

        .aurxon_header_badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
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

        .aurxon_mini_logo {
          width: 18px;
          height: 18px;
          object-fit: contain;
        }

        .tagline_mini_pill {
          font-size: 0.76rem;
          font-weight: 750;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 50px;
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

        .hero_title {
          font-size: 1rem;
          font-weight: 750;
          color: #0284c7;
          letter-spacing: 0.05em;
          margin-bottom: 18px;
        }

        .dark .hero_title {
          color: #38bdf8;
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

        .banner_btn_row {
          margin-top: 10px;
        }

        /* BORDERLESS Brand & Feature items */
        .single-brand-item {
          width: 100%;
          height: 100px;
          background: #ffffff;
          border: none !important;
          outline: none !important;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
          transition: all 0.3s ease;
        }

        .dark .single-brand-item {
          background: rgba(15, 23, 42, 0.7);
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
          background: #ffffff;
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
          background: #ffffff;
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
      `}} />
    </>
  );
}
