"use client";

import React, { useState } from "react";
import Link from "next/link";
import { recordLead } from "@/lib/analytics-client";

export const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Direct Portfolio Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFeedback({
        type: "error",
        message: "Please fill in all fields before sending.",
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    // Save lead in CRM database
    try {
      recordLead({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        source: "Footer Messenger",
      });
    } catch {}

    try {
      const res = await fetch("https://formsubmit.co/ajax/karannmishra136@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Direct Message] from ${formData.name}`,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setFeedback({
          type: "success",
          message: "Message sent directly to Karan's inbox! Thank you.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "Direct Portfolio Inquiry",
          message: "",
        });
      } else {
        setFeedback({
          type: "success",
          message: `Inquiry recorded for ${formData.name}! We will reply to ${formData.email} promptly.`,
        });
      }
    } catch {
      setFeedback({
        type: "success",
        message: `Inquiry recorded for ${formData.name}! We will reply to ${formData.email} promptly.`,
      });
    } finally {
      setLoading(false);
    }
  };

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

          {/* Column 4: Direct In-Portfolio Email Messenger */}
          <div className="col-lg-4 col-md-6">
            <div className="footer_direct_contact_card">
              <h5 className="footer_section_heading">
                <i className="fa fa-paper-plane mr-2" style={{ color: "#818cf8" }}></i>
                Direct Email to Karan
              </h5>
              <p className="footer_direct_hint">
                Send a message directly from here — no email client or third-party app needed.
              </p>

              <form onSubmit={handleSubmit} className="footer_direct_form">
                <div className="mb-2">
                  <input
                    type="text"
                    className="footer_input_field"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    className="footer_input_field"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    rows={2}
                    className="footer_input_field footer_textarea"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                {feedback && (
                  <div
                    className={`footer_feedback_alert ${
                      feedback.type === "success" ? "alert_success" : "alert_error"
                    }`}
                  >
                    <i
                      className={`fa ${
                        feedback.type === "success"
                          ? "fa-check-circle"
                          : "fa-exclamation-triangle"
                      } mr-1`}
                    ></i>{" "}
                    {feedback.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="footer_submit_btn"
                >
                  {loading ? (
                    <span>
                      <i className="fa fa-circle-o-notch fa-spin mr-2"></i> Sending...
                    </span>
                  ) : (
                    <span>
                      <i className="fa fa-send mr-2"></i> Send Directly to Inbox
                    </span>
                  )}
                </button>
              </form>

              {/* Direct Info Footnote */}
              <div className="footer_contact_subrows">
                <div className="footer_subrow_item">
                  <i className="fa fa-envelope text-indigo"></i>
                  <a href="mailto:karannmishra136@gmail.com">karannmishra136@gmail.com</a>
                </div>
                <div className="footer_subrow_item">
                  <i className="fa fa-phone text-indigo"></i>
                  <a href="tel:+917804895074">+91 7804895074</a>
                </div>
                <div className="footer_subrow_item">
                  <i className="fa fa-map-marker text-indigo"></i>
                  <span>AURXON Headquarters, Killa Maidan, VIP Road, Indore, Madhya Pradesh – 452006, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="footer_bottom_row">
          <div className="footer_copy_col">
            <p className="footer_copy_text">
              &copy; {new Date().getFullYear()} <strong>Karan Mishra</strong> &bull; Founder &amp; Chief AI Architect,{" "}
              <span className="text-white font-weight-bold">Aurxon</span> &bull; Next Gen AI Solutions &bull; Where Intelligence Meets Innovation. All rights reserved.
            </p>
          </div>
          <div className="footer_top_btn_col">
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
      </div>

      {/* Modern High-End Scoped Footer CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .modern_footer_root {
          background: #0f172a;
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

        .alert_error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #f87171;
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
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(129, 140, 248, 0.4);
        }

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
