"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { recordLead } from "@/lib/analytics-client";

export const Footer: React.FC = () => {
  const [liveClock, setLiveClock] = useState<string>("");
  const [liveDate, setLiveDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setLiveDate(now.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [shareToast, setShareToast] = useState<string | null>(null);

  const portfolioUrl = "https://itsgkaranmishra.web.app";
  const shareTitle = "Karan Mishra | Founder & Chief AI Architect, Aurxon";
  const shareText = "Karan Mishra — Founder & Chief AI Architect @ Aurxon | Applied AI Researcher @ SUAS Indore\nExplore portfolio & codebases:";

  const executeSystemShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: shareTitle,
          text: `${shareText}\n${portfolioUrl}`,
          url: portfolioUrl,
        });
        return;
      } catch (err: any) {
        if (err?.name === "AbortError") return;
      }
    }

    // Direct clipboard copy fallback
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(
          `${shareTitle}\n${shareText}\n${portfolioUrl}\nWhatsApp: https://wa.me/917804895074\nGitHub: https://github.com/CodeSage4D`
        );
        setShareToast("Link & Profile copied to clipboard!");
        setTimeout(() => setShareToast(null), 3000);
      } catch {
        setShareToast("Share URL: " + portfolioUrl);
        setTimeout(() => setShareToast(null), 3000);
      }
    }
  };

  useEffect(() => {
    const handleOpenShare = () => {
      executeSystemShare();
    };
    window.addEventListener("open-portfolio-share", handleOpenShare);
    return () => window.removeEventListener("open-portfolio-share", handleOpenShare);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="modern_footer_root">
      {/* Top Accent Gradient Border */}
      <div className="footer_gradient_bar"></div>

      <div className="container footer_main_container">
        <div className="row g-4 justify-content-between">
          {/* Column 1: Brand & Bio */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="footer_brand_block">
              <Link href="/" className="footer_brand_link">
                <div className="footer_logo_circle">
                  <img
                    src="/img/png/logo-no-background.png"
                    alt="Karan Mishra"
                    className="footer_logo_img"
                  />
                </div>
                <div className="footer_brand_text">
                  <span className="footer_brand_name">
                    Karan <span className="footer_brand_accent">Mishra</span>
                  </span>
                  <span className="footer_brand_sub">Founder &bull; AURXON</span>
                </div>
              </Link>

              <p className="footer_bio_text">
                Machine Learning &amp; Python Engineer building modern intelligent
                systems and transformative software platforms at <strong>Aurxon</strong>.
                Empowering businesses with production-grade AI solutions and scalable architectures.
              </p>

              <div className="footer_status_pill">
                <span className="footer_status_dot heartbeat_fluctuate"></span>
                <span>Open for AI/ML Consulting &amp; Collaboration</span>
              </div>

              {/* Social Media Links */}
              <div className="footer_social_grid">
                <a
                  href="https://github.com/CodeSage4D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="footer_social_btn"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/karannmishra136"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Founder LinkedIn: @karannmishra136"
                  title="LinkedIn: @karannmishra136"
                  className="footer_social_btn"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
                <a
                  href="https://www.instagram.com/karannmishra136"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Founder Instagram: @karannmishra136"
                  title="Founder Instagram: @karannmishra136"
                  className="footer_social_btn"
                >
                  <i className="fa fa-instagram"></i>
                </a>
                <a
                  href="https://www.instagram.com/buildwithaurxon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aurxon Official Instagram: @buildwithaurxon"
                  title="Aurxon Official Instagram: @buildwithaurxon"
                  className="footer_social_btn"
                >
                  <i className="fa fa-instagram" style={{ color: "#ec4899" }}></i>
                </a>
                <a
                  href="https://www.behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance Profile"
                  className="footer_social_btn"
                >
                  <i className="fa fa-behance"></i>
                </a>
                <a
                  href="https://wa.me/917804895074?text=Hello%20Karan%20Mishra,%20I%20am%20reaching%20out%20via%20your%20portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct WhatsApp Chat"
                  title="Direct WhatsApp (+91 7804895074)"
                  className="footer_social_btn footer_whatsapp_btn"
                >
                  <i className="fa fa-whatsapp" style={{ color: "#25d366" }}></i>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6 mb-4 mb-lg-0">
            <div className="footer_nav_group">
              <h5 className="footer_section_heading">Navigation</h5>
              <ul className="footer_link_list">
                <li>
                  <Link href="/" className="footer_nav_anchor">
                    <i className="fa fa-angle-right"></i> Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="footer_nav_anchor">
                    <i className="fa fa-angle-right"></i> About Me
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="footer_nav_anchor">
                    <i className="fa fa-angle-right"></i> Services
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="footer_nav_anchor">
                    <i className="fa fa-angle-right"></i> Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="footer_nav_anchor">
                    <i className="fa fa-angle-right"></i> Tech Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="footer_nav_anchor">
                    <i className="fa fa-angle-right"></i> Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Featured GitHub Repos & Projects */}
          <div className="col-lg-2 col-md-6 col-6 mb-4 mb-lg-0">
            <div className="footer_nav_group">
              <h5 className="footer_section_heading">Key Projects</h5>
              <ul className="footer_link_list">
                <li>
                  <a
                    href="https://github.com/CodeSage4D/aurxon-erp-lite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_nav_anchor"
                  >
                    <i className="fa fa-code-fork"></i> Aurxon ERP
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/CodeSage4D/cognivex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_nav_anchor"
                  >
                    <i className="fa fa-bolt"></i> Cognivex AI
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/CodeSage4D/HemoAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_nav_anchor"
                  >
                    <i className="fa fa-heartbeat"></i> HemoAI
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/CodeSage4D/Sentiment-Negation-Analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_nav_anchor"
                  >
                    <i className="fa fa-comments"></i> SentiVoice NLP
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/CodeSage4D/Anomaly-Detection"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_nav_anchor"
                  >
                    <i className="fa fa-shield"></i> Anomaly ML
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Executive Headquarters & Enterprise Presence (No email form) */}
          <div className="col-lg-4 col-md-6">
            <div className="footer_direct_contact_card">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img
                  src="/img/logo/aurxon-logo-official.png"
                  alt="Aurxon Official"
                  style={{ height: "24px", width: "auto" }}
                />
                <span className="badge_hq_verified">OFFICIAL HQ</span>
              </div>
              <h5 className="footer_section_heading mb-2">
                Executive Headquarters
              </h5>
              <p className="footer_direct_hint mb-3">
                Directing production enterprise AI platforms, neural research at SUAS Indore, and autonomous software platforms.
              </p>

              {/* Direct Info Footnote */}
              <div className="footer_contact_subrows">
                <div className="footer_subrow_item">
                  <i className="fa fa-map-marker text-indigo"></i>
                  <span>AURXON Headquarters, Killa Maidan, VIP Road, Indore, Madhya Pradesh – 452006, India</span>
                </div>
                <div className="footer_subrow_item">
                  <i className="fa fa-envelope text-indigo"></i>
                  <a href="mailto:karannmishra136@gmail.com">karannmishra136@gmail.com</a>
                </div>
                <div className="footer_subrow_item">
                  <i className="fa fa-phone text-indigo"></i>
                  <a href="tel:+917804895074">+91 7804895074</a>
                </div>
                <div className="footer_subrow_item">
                  <i className="fa fa-globe text-indigo"></i>
                  <a href="https://aurxon.com" target="_blank" rel="noopener noreferrer">https://aurxon.com</a>
                </div>
              </div>

              <div className="mt-3">
                <a
                  href="https://aurxon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn_footer_portal"
                >
                  <i className="fa fa-external-link mr-2"></i> Visit Aurxon Corporate &rarr;
                </a>
              </div>

              {/* Seamless Regional Telemetry & Live Clock Integration */}
              <div className="footer_hq_live_telemetry mt-3 pt-3 border-top border-secondary">
                <div className="d-flex align-items-center justify-content-between text-muted small font-mono flex-wrap gap-2">
                  <span className="d-inline-flex align-items-center gap-2">
                    <span className="telemetry_pulse_beacon"></span>
                    <span className="text-white-50">Indore Central &bull; IST (UTC+5:30)</span>
                  </span>
                  <span className="footer_clock_badge text-cyan font-weight-bold">
                    {liveClock || "00:00:00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="footer_bottom_row mt-4">
          <div className="footer_copy_col">
            <p className="footer_copy_text">
              &copy; {new Date().getFullYear()} <strong>Karan Mishra</strong> &bull; Founder &amp; Chief AI Architect,{" "}
              <span className="text-white font-weight-bold">Aurxon</span> &bull; Next Gen AI Solutions &bull; Where Intelligence Meets Innovation. All rights reserved.{" "}
              <Link href="/dashboard" className="footer_admin_lock_link" title="Operator Dashboard Login">
                <i className="fa fa-lock"></i>
              </Link>
            </p>
          </div>
          <div className="footer_top_btn_col d-flex align-items-center gap-2">
            <button
              onClick={executeSystemShare}
              className="footer_share_btn"
              aria-label="Share Portfolio"
              title="Share via System Apps (WhatsApp, Bluetooth, etc.)"
            >
              <i className="fa fa-share-alt mr-2"></i>
              <span>Share</span>
            </button>
            <button
              onClick={scrollToTop}
              className="footer_scroll_top_btn"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <i className="fa fa-arrow-up ml-2"></i>
            </button>
          </div>
        </div>

        {/* Lightweight Non-Intrusive Floating Toast Notification */}
        {shareToast && (
          <div className="share_floating_toast" role="status" aria-live="polite">
            <div className="d-flex align-items-center gap-2">
              <span className="toast_check_circle">✓</span>
              <span>{shareToast}</span>
            </div>
          </div>
        )}
      </div>

      {/* Modern High-End Scoped Footer CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .footer_live_telemetry_bar {
          background: rgba(9, 23, 31, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 50px;
          padding: 10px 20px;
          border: 1px solid rgba(206, 161, 122, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }

        .telemetry_pulse_beacon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #73C4BF;
          box-shadow: 0 0 8px #73C4BF;
          animation: pulseBeacon 2s infinite;
        }

        @keyframes pulseBeacon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .footer_telemetry_hub {
          font-size: 0.8rem;
          color: #CEA17A;
          font-weight: 600;
        }

        .footer_clock_group {
          font-size: 0.82rem;
          color: #f1f5f9;
        }

        .footer_clock_text {
          color: #73C4BF;
          font-weight: 700;
        }

        .footer_date_pill {
          background: rgba(206, 161, 122, 0.12);
          color: #CEA17A;
          font-size: 0.74rem;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .modern_footer_root {
          background: #000000;
          color: #94a3b8;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .footer_gradient_bar {
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, #4458dc 0%, #854fee 50%, #10b981 100%);
        }

        .footer_main_container {
          padding-top: 60px;
          padding-bottom: 30px;
        }

        .footer_brand_block {
          padding-right: 15px;
        }

        .footer_brand_link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none !important;
          margin-bottom: 18px;
        }

        .footer_logo_circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #1e293b;
          border: 1px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
        }

        .footer_logo_img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .footer_brand_text {
          display: flex;
          flex-direction: column;
        }

        .footer_brand_name {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
        }

        .footer_brand_accent {
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer_brand_sub {
          font-size: 0.75rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .footer_bio_text {
          font-size: 0.92rem;
          line-height: 1.65;
          color: #cbd5e1;
          margin-bottom: 16px;
        }

        .footer_status_pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #34d399;
          margin-bottom: 20px;
        }

        .footer_status_dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .footer_social_grid {
          display: flex;
          gap: 10px;
        }

        .footer_social_btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #1e293b;
          border: 1px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          font-size: 1rem;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .footer_social_btn:hover {
          background: linear-gradient(135deg, #4458dc, #854fee);
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(68, 88, 220, 0.35);
        }

        .footer_section_heading {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 18px;
          position: relative;
        }

        .footer_link_list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer_nav_anchor {
          font-size: 0.9rem;
          color: #94a3b8;
          text-decoration: none !important;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .footer_nav_anchor:hover {
          color: #818cf8;
          transform: translateX(4px);
        }

        .footer_direct_contact_card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .footer_direct_hint {
          font-size: 0.84rem;
          color: #94a3b8;
          margin-bottom: 14px;
        }

        .footer_input_field {
          width: 100%;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.88rem;
          color: #ffffff;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .footer_input_field:focus {
          border-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
        }

        .footer_textarea {
          resize: vertical;
          min-height: 60px;
        }

        .footer_submit_btn {
          width: 100%;
          background: linear-gradient(135deg, #4458dc 0%, #854fee 100%);
          color: #ffffff;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .footer_submit_btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(68, 88, 220, 0.4);
        }

        .footer_submit_btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .footer_feedback_alert {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.82rem;
          margin-bottom: 10px;
          line-height: 1.4;
        }

        .alert_success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34d399;
        }

        .badge_hq_verified {
          font-size: 0.7rem;
          font-weight: 800;
          color: #CEA17A;
          background: rgba(206, 161, 122, 0.15);
          padding: 3px 8px;
          border-radius: 50px;
          letter-spacing: 0.05em;
        }

        .btn_footer_portal {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(206, 161, 122, 0.2) 0%, rgba(9, 23, 31, 0.8) 100%);
          color: #CEA17A;
          font-size: 0.84rem;
          font-weight: 750;
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .btn_footer_portal:hover {
          background: #CEA17A;
          color: #09171F;
          transform: translateY(-2px);
        }

        .footer_contact_subrows {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid #334155;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer_subrow_item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #cbd5e1;
        }

        .footer_subrow_item a {
          color: #cbd5e1;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }

        .footer_subrow_item a:hover {
          color: #818cf8;
        }

        .text-indigo {
          color: #818cf8 !important;
          width: 14px;
        }

        .footer_bottom_row {
          margin-top: 50px;
          padding-top: 24px;
          border-top: 1px solid #1e293b;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer_copy_text {
          font-size: 0.86rem;
          color: #64748b;
          margin: 0;
        }

        .footer_admin_lock_link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          font-size: 0.76rem;
          margin-left: 6px;
          opacity: 0.4;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .footer_admin_lock_link:hover {
          color: #a855f7;
          opacity: 1;
          transform: scale(1.15);
        }

        .footer_scroll_top_btn {
          background: #1e293b;
          border: 1px solid #334155;
          color: #cbd5e1;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          transition: all 0.25s ease;
        }

        .footer_scroll_top_btn:hover {
          background: #818cf8;
          color: #ffffff;
          border-color: #818cf8;
        }

        .footer_share_btn {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.25) 100%);
          border: 1px solid rgba(56, 189, 248, 0.45);
          color: #e0f2fe;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: shareBtnPulseGlow 3s ease-in-out infinite alternate;
        }

        @keyframes shareBtnPulseGlow {
          0% {
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
            border-color: rgba(56, 189, 248, 0.4);
          }
          100% {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.45), 0 0 10px rgba(56, 189, 248, 0.4);
            border-color: rgba(168, 85, 247, 0.6);
          }
        }

        .footer_share_btn:hover {
          background: linear-gradient(135deg, #0284c7 0%, #6366f1 100%);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.7), 0 4px 18px rgba(99, 102, 241, 0.5);
          border-color: #38bdf8;
        }



        /* Floating Toast Notification for Direct Share */
        .share_floating_toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          background: #090e18;
          color: #ffffff;
          padding: 12px 22px;
          border-radius: 50px;
          border: 1px solid #10b981;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.35);
          font-size: 0.88rem;
          font-weight: 600;
          animation: toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toast_check_circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #10b981;
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 900;
        }

        @keyframes toastSlideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }


        .share_founder_avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .share_avatar_pulse {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #090e18;
          box-shadow: 0 0 8px #10b981;
        }

        .share_title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .share_sub {
          font-size: 0.8rem;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }

        .share_avatar_toggle_dock {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50px;
          padding: 2px;
        }

        .share_mode_pill {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .share_mode_pill.active {
          background: #0284c7;
          color: #ffffff;
        }

        .share_modal_close {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 1.8rem;
          line-height: 1;
          cursor: pointer;
          transition: color 0.2s;
        }

        .share_modal_close:hover {
          color: #ffffff;
        }

        /* Scanner QR Code Box */
        .scanner_qr_frame {
          background: #ffffff;
          border: 2px solid rgba(6, 182, 212, 0.5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(6, 182, 212, 0.25);
          position: relative;
          overflow: hidden;
        }

        .qr_scanner_laser_line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #06b6d4, #10b981, transparent);
          box-shadow: 0 0 10px #06b6d4, 0 0 20px #10b981;
          animation: laserScanSweep 2.5s infinite linear;
          pointer-events: none;
          z-index: 2;
        }

        @keyframes laserScanSweep {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 96%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }

        .scanner_qr_img {
          width: 100%;
          max-width: 190px;
          height: auto;
          margin: 0 auto;
          display: block;
        }

        .scanner_qr_tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.05em;
        }

        /* Executive Briefing Terminal */
        .telemetry_chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #38bdf8;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
          padding: 3px 10px;
          border-radius: 50px;
        }

        .pulse_dot_green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .executive_brief_terminal_box {
          background: #04070e;
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-height: 195px;
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .executive_brief_text {
          color: #a5f3fc;
          font-size: 0.76rem;
          line-height: 1.45;
          white-space: pre-wrap;
        }

        .share_action_btn {
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 700;
          border: 1px solid #06b6d4;
          background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .share_action_btn.tr-bg {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          color: #cbd5e1;
        }

        .share_action_btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
        }

        .share_action_btn.copied {
          background: #10b981 !important;
          border-color: #10b981 !important;
          color: #ffffff !important;
        }

        .share_channels_grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }

        @media (max-width: 575px) {
          .share_channels_grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .share_channel_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none !important;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.2s;
        }

        .channel_whatsapp { background: rgba(37, 211, 102, 0.18); color: #4ade80; border-color: rgba(37, 211, 102, 0.35); }
        .channel_whatsapp:hover { background: #25d366; color: #ffffff; }

        .channel_linkedin { background: rgba(0, 119, 181, 0.18); color: #60a5fa; border-color: rgba(0, 119, 181, 0.35); }
        .channel_linkedin:hover { background: #0077b5; color: #ffffff; }

        .channel_twitter { background: rgba(29, 155, 240, 0.18); color: #38bdf8; border-color: rgba(29, 155, 240, 0.35); }
        .channel_twitter:hover { background: #1d9bf0; color: #ffffff; }

        .channel_email { background: rgba(245, 158, 11, 0.18); color: #fbbf24; border-color: rgba(245, 158, 11, 0.35); }
        .channel_email:hover { background: #f59e0b; color: #ffffff; }

        .channel_native { background: rgba(168, 85, 247, 0.18); color: #c084fc; border-color: rgba(168, 85, 247, 0.35); }
        .channel_native:hover { background: #a855f7; color: #ffffff; }

        @media (max-width: 767px) {
          .footer_bottom_row {
            flex-direction: column;
            text-align: center;
          }
          .footer_main_container {
            padding-top: 40px;
          }
        }
      `}} />
    </footer>
  );
};
