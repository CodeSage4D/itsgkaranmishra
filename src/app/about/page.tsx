"use client";

import React from "react";
import Link from "next/link";
import { RoadTimelineExperience } from "@/components/RoadTimelineExperience";

export default function AboutPage() {
  return (
    <>
      {/* Banner Area */}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-center">
              <h2>About Karan Mishra</h2>
              <div className="page_link">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start About Us Area */}
      <section className="about_area section_gap">
        <div className="container">
          <div className="row justify-content-start align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="about_img_wrapper position-relative text-center">
                <div className="about_glow_halo"></div>
                <img className="img-fluid rounded-lg shadow-lg position-relative" src="/img/founder/karan-mishra-founder.jpg" alt="Karan Mishra (Karann Mishra, G Karan Mishra) - Founder & Chief AI Architect, Aurxon" />
                <div className="founder_badge_overlay">
                  <span className="founder_pulse_dot"></span>
                  <span>Founder &bull; Aurxon</span>
                </div>
              </div>
            </div>

            <div className="offset-lg-1 col-lg-6">
              <div className="main_title text-left mb-4">
                <span className="text-uppercase text-gold font-mono small tracking-widest font-weight-bold">
                  Executive Dossier &bull; Architectural Vision
                </span>
                <h2 className="mt-2 font-weight-bold">Karan Mishra (Karann Mishra)</h2>
                <p className="lead text-gold font-weight-500 mb-3">
                  Founder &amp; Chief AI Architect at Aurxon (KArann Mishra AURXON) &bull; Applied AI Researcher at SUAS Indore &bull; G Karan Mishra (@CodeSage4D)
                </p>
                <p>
                  I architect production-grade artificial intelligence systems, high-velocity full-stack software, and institutional digital engines. Based in Smart City Indore, India, my engineering focus bridges deep mathematical transformer research with scalable zero-downtime distributed systems.
                </p>
                <p>
                  As the founder of <strong>Aurxon</strong> (<em>Where Intelligence Meets Innovation</em>), I drive the creation of high-impact products—from multi-tenant educational platforms (<strong>Aurxon ERP Lite</strong>) to vector talent matching engines (<strong>Cognivex</strong>) and critical blood bank shortage forecasters (<strong>HemoAI</strong>).
                </p>
                <p>
                  With an academic Computer Science foundation from SAIT, 47+ open-source codebases authored on GitHub (@CodeSage4D), and on-site research instruction at Symbiosis University of Applied Sciences, I partner with ambitious founders and institutions to transform complex problems into deployed software.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a className="primary_btn" href="/pdf/Karann_Mishra_Python_Software_Engineer_Resume.pdf" download="Karann_Mishra_Resume.pdf">
                    <span>Download CV</span>
                  </a>
                  <a className="primary_btn tr-bg" href="https://aurxon.com" target="_blank" rel="noopener noreferrer">
                    <span>Aurxon Platform &rarr;</span>
                  </a>
                  <Link className="primary_btn tr-bg" href="/contact">
                    <span>Initiate Contact</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos 1 to 9 & Experience Area */}
      <section className="brand_area section_gap_bottom" id="about-brands">
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

      {/* Aurxon Company Section (Luxury Glassmorphic Studio Card) */}
      <section id="about" className="aurxon_venture_section section_gap_bottom">
        <div className="container">
          <div className="venture_glass_card p-4 p-md-5">
            <div className="row align-items-center mb-4">
              <div className="col-md-3 text-center text-md-left mb-3 mb-md-0">
                <img
                  src="/img/logo/aurxon-logo-official.png"
                  alt="Aurxon Official Logo"
                  className="img-fluid venture_official_logo"
                  style={{ maxHeight: "75px", objectFit: "contain" }}
                />
              </div>
              <div className="col-md-9 text-center text-md-left">
                <div className="d-inline-flex align-items-center gap-2 mb-1">
                  <span className="venture_tag">Official Enterprise Venture</span>
                  <span className="venture_tag tagline_tag">Where Intelligence Meets Innovation</span>
                </div>
                <h3 className="text-white font-weight-bold mb-1">AURXON</h3>
                <p className="text-gold font-mono small mb-0">
                  Headquarters: Killa Maidan, VIP Road, Indore, Madhya Pradesh – 452006, India
                </p>
              </div>
            </div>

            <div className="venture_mission_body mt-4">
              <h4 className="font-weight-bold text-white mb-3">Enterprise Mission &amp; Technological Pillars</h4>
              <p className="text-light-muted">
                At <strong>Aurxon</strong>, we build resilient software, production ML inference pipelines, and scalable enterprise automation engines. Recognizing the explosive digital acceleration in Tier-II, III, and IV economic centers, Aurxon engineers institutional infrastructure so educational networks, healthcare organizations, and high-velocity enterprises operate with elite reliability.
              </p>
              <p className="text-light-muted">
                Every line of code is driven by research-backed benchmarking, deterministic SLAs, and glassmorphic user experiences.
              </p>

              <div className="row g-3 mt-4 focus_pillars_grid">
                <div className="col-md-6 mb-3">
                  <div className="pillar_card d-flex align-items-start gap-3 p-3">
                    <span className="pillar_icon"><i className="fas fa-brain text-gold"></i></span>
                    <div>
                      <strong className="text-white d-block">Production Machine Learning &amp; NLP</strong>
                      <span className="small text-muted">Fine-tuned miniLM vector transformers and real-time semantic inference.</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="pillar_card d-flex align-items-start gap-3 p-3">
                    <span className="pillar_icon"><i className="fas fa-building text-opal"></i></span>
                    <div>
                      <strong className="text-white d-block">Enterprise SaaS &amp; Multi-Tenant ERP</strong>
                      <span className="small text-muted">Aurxon ERP Lite deployed for school records, fee tracking, and student telemetry.</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="pillar_card d-flex align-items-start gap-3 p-3">
                    <span className="pillar_icon"><i className="fas fa-heartbeat text-danger"></i></span>
                    <div>
                      <strong className="text-white d-block">Predictive Healthcare AI (HemoAI)</strong>
                      <span className="small text-muted">Forecasting inventory shortages and donor-patient optimization.</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="pillar_card d-flex align-items-start gap-3 p-3">
                    <span className="pillar_icon"><i className="fas fa-shield-alt text-warning"></i></span>
                    <div>
                      <strong className="text-white d-block">Real-Time Anomaly Detection &amp; Security</strong>
                      <span className="small text-muted">Sub-15ms fraud classification and zero-downtime event brokers.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 pt-3">
                <a
                  href="https://aurxon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary_btn"
                >
                  <span>Explore Aurxon Official Platform &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Road Timeline Experience Area */}
      <RoadTimelineExperience />

      <style dangerouslySetInnerHTML={{ __html: `
        .text-gold {
          color: #CEA17A !important;
        }

        .text-opal {
          color: #73C4BF !important;
        }

        .text-light-muted {
          color: #94a3b8;
          line-height: 1.7;
        }

        .about_img_wrapper {
          position: relative;
          display: inline-block;
          max-width: 100%;
        }

        .about_glow_halo {
          position: absolute;
          inset: -15px;
          background: radial-gradient(circle, rgba(206, 161, 122, 0.2) 0%, rgba(6, 36, 86, 0.2) 70%, transparent 80%);
          filter: blur(25px);
          z-index: 0;
          border-radius: 24px;
        }

        .founder_badge_overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 2;
          background: rgba(9, 23, 31, 0.9);
          backdrop-filter: blur(12px);
          color: #CEA17A;
          font-family: monospace;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .founder_pulse_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #73C4BF;
          box-shadow: 0 0 8px #73C4BF;
        }

        .venture_glass_card {
          background: rgba(9, 23, 31, 0.8);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 24px;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.5);
          border: none !important;
          outline: none !important;
        }

        .venture_tag {
          background: rgba(206, 161, 122, 0.15);
          color: #CEA17A;
          font-family: monospace;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
        }

        .tagline_tag {
          background: rgba(115, 196, 191, 0.12);
          color: #73C4BF;
        }

        .pillar_card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          transition: all 0.3s ease;
        }

        .pillar_card:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px);
        }

        .pillar_icon {
          font-size: 1.3rem;
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .venture_glass_card {
            padding: 24px 18px !important;
          }
          .founder_badge_overlay {
            bottom: 10px;
            left: 10px;
            font-size: 0.7rem;
          }
        }
      `}} />
    </>
  );
}
