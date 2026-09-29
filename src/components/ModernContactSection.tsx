"use client";

import React, { useState } from "react";

export const ModernContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "AI Project Consultation Inquiry",
    number: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFeedback({
        type: "error",
        message: "Please fill in all required fields (Name, Email, Message).",
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: "Thank you! Your message has been sent directly to Karan's inbox (karannmishra136@gmail.com). You will receive a direct reply shortly.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "AI Project Consultation Inquiry",
          number: "",
          message: "",
        });
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Unable to send message right now. Please try again or reach out on WhatsApp/Call.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Network error occurred. Please verify your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="modern_contact_section section_gap" id="direct-contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center">
          <div className="col-lg-9 text-center">
            <div className="main_title mb-5">
              <span className="contact_section_badge heartbeat_fluctuate">
                <span className="live_status_dot"></span> Direct Collaboration &bull; Aurxon
              </span>
              <h2 className="mt-3">Let&apos;s Build Something Intelligent Together</h2>
              <p>
                Have an AI initiative, enterprise software challenge, or consulting inquiry? Send a direct message straight to Karan Mishra&apos;s personal inbox without needing any external mail app.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Left Column: Direct Info Cards & Live Status */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="contact_info_card_wrapper h-100">
              <div className="contact_card_header">
                <div className="karan_avatar_row">
                  <div className="karan_mini_avatar">
                    <img src="/img/png/logo-no-background.png" alt="Karan Mishra" />
                  </div>
                  <div>
                    <h4 className="contact_name">Karan Mishra</h4>
                    <p className="contact_role">Founder, Aurxon &bull; AI Engineer</p>
                  </div>
                </div>

                <div className="live_availability_pill heartbeat_soft">
                  <span className="pulse_green_dot heartbeat_fluctuate"></span>
                  <span>Currently Available for AI &amp; Software Projects</span>
                </div>
              </div>

              <div className="direct_channels_list">
                <a
                  href="mailto:karannmishra136@gmail.com"
                  className="direct_channel_item"
                >
                  <div className="channel_icon icon_email">
                    <i className="fa fa-envelope-o"></i>
                  </div>
                  <div className="channel_content">
                    <span className="channel_title">Direct Email</span>
                    <span className="channel_val">karannmishra136@gmail.com</span>
                  </div>
                </a>

                <a
                  href="tel:+917804895074"
                  className="direct_channel_item"
                >
                  <div className="channel_icon icon_phone">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="channel_content">
                    <span className="channel_title">Phone &bull; WhatsApp</span>
                    <span className="channel_val">+91 7804895074</span>
                  </div>
                </a>

                <div className="direct_channel_item">
                  <div className="channel_icon icon_map">
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <div className="channel_content">
                    <span className="channel_title">Headquarters</span>
                    <span className="channel_val">Smart City Indore, Madhya Pradesh, India</span>
                  </div>
                </div>
              </div>

              <div className="social_quick_strip">
                <span className="quick_strip_label">Connect on:</span>
                <div className="quick_strip_icons">
                  <a href="https://github.com/CodeSage4D" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fa fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/itsgkaranmishra4" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="https://www.instagram.com/itsgkaranmishra" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct In-Portfolio Message Form */}
          <div className="col-lg-7">
            <div className="contact_form_interactive_card h-100">
              <h3 className="form_heading">Direct Message Portal</h3>
              <p className="form_sub">Fill in the fields below to dispatch your message immediately.</p>

              {feedback && (
                <div
                  className={`alert ${
                    feedback.type === "success" ? "alert-success alert_live_success" : "alert-danger alert_live_error"
                  } mb-4`}
                  role="alert"
                >
                  <i
                    className={`fa ${
                      feedback.type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
                    } mr-2`}
                  ></i>
                  {feedback.message}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label className="field_label">Your Full Name *</label>
                    <input
                      type="text"
                      className="form_field_input"
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="field_label">Your Email Address *</label>
                    <input
                      type="email"
                      className="form_field_input"
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label className="field_label">Phone / WhatsApp (Optional)</label>
                    <input
                      type="tel"
                      className="form_field_input"
                      placeholder="+91..."
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="field_label">Project / Inquiry Type</label>
                    <select
                      className="form_field_input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="AI Project Consultation Inquiry">AI / ML System Consultation</option>
                      <option value="Enterprise ERP Platform Solution">Enterprise ERP / SaaS Platform</option>
                      <option value="Full-Stack Web Engineering">Full-Stack Web Engineering</option>
                      <option value="Contract / Career Opportunity">Freelance / Full-time Role</option>
                      <option value="General Technical Inquiry">Other Technical Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="field_label">Project Overview / Message *</label>
                  <textarea
                    rows={4}
                    className="form_field_input field_textarea"
                    placeholder="Describe your project vision, timeline, requirements, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <span className="secure_dispatch_badge">
                    <i className="fa fa-lock text-success mr-1"></i> Dispatches directly to Gmail inbox
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="direct_submit_btn heartbeat_soft"
                  >
                    {loading ? (
                      <span>
                        <i className="fa fa-circle-o-notch fa-spin mr-2"></i> Sending Directly...
                      </span>
                    ) : (
                      <span>
                        <i className="fa fa-paper-plane mr-2"></i> Send Direct Message
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Modern Contact Section */}
      <style dangerouslySetInnerHTML={{ __html: `
        .modern_contact_section {
          background: #ffffff;
          padding: 85px 0;
          position: relative;
          transition: background-color 0.3s ease;
        }

        .dark .modern_contact_section {
          background: transparent !important;
        }

        .contact_section_badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 50px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .dark .contact_section_badge {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.35);
        }

        .live_status_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        /* Left Info Card */
        .contact_info_card_wrapper {
          background: linear-gradient(145deg, #f8fafc 0%, #edf2f7 100%);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 34px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
        }

        .dark .contact_info_card_wrapper {
          background: rgba(15, 23, 42, 0.78) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-color: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
        }

        .karan_avatar_row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .karan_mini_avatar {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid rgba(99, 102, 241, 0.25);
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark .karan_mini_avatar {
          background: #1e293b;
        }

        .contact_name {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .dark .contact_name {
          color: #ffffff;
        }

        .contact_role {
          font-size: 0.86rem;
          font-weight: 600;
          color: #64748b;
          margin: 0;
        }

        .live_availability_pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #059669;
          margin-bottom: 26px;
        }

        .dark .live_availability_pill {
          color: #34d399;
        }

        .pulse_green_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .direct_channels_list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .direct_channel_item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .dark .direct_channel_item {
          background: #0f172a;
          border-color: #1e293b;
        }

        .direct_channel_item:hover {
          transform: translateY(-2px);
          border-color: #4458dc;
          box-shadow: 0 6px 18px rgba(68, 88, 220, 0.12);
        }

        .channel_icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .icon_email {
          background: rgba(68, 88, 220, 0.1);
          color: #4458dc;
        }

        .icon_phone {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .icon_map {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .channel_content {
          display: flex;
          flex-direction: column;
        }

        .channel_title {
          font-size: 0.76rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
        }

        .channel_val {
          font-size: 0.88rem;
          font-weight: 600;
          color: #0f172a;
        }

        .dark .channel_val {
          color: #f1f5f9;
        }

        .social_quick_strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid #e2e8f0;
        }

        .dark .social_quick_strip {
          border-top-color: #1e293b;
        }

        .quick_strip_label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #64748b;
        }

        .quick_strip_icons {
          display: flex;
          gap: 10px;
        }

        .quick_strip_icons a {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          text-decoration: none !important;
          transition: all 0.2s ease;
        }

        .dark .quick_strip_icons a {
          background: #0f172a;
          border-color: #1e293b;
          color: #cbd5e1;
        }

        .quick_strip_icons a:hover {
          background: #4458dc;
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Right Form Interactive Card */
        .contact_form_interactive_card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 38px 32px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .dark .contact_form_interactive_card {
          background: rgba(15, 23, 42, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
        }

        .form_heading {
          font-size: 1.45rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .dark .form_heading {
          color: #ffffff;
        }

        .form_sub {
          font-size: 0.88rem;
          color: #64748b;
          margin-bottom: 24px;
        }

        .field_label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #475569;
          margin-bottom: 6px;
        }

        .dark .field_label {
          color: #94a3b8;
        }

        .form_field_input {
          width: 100%;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.92rem;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
        }

        .dark .form_field_input {
          background: #0f172a;
          border-color: #334155;
          color: #ffffff;
        }

        .form_field_input:focus {
          border-color: #4458dc;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(68, 88, 220, 0.15);
        }

        .dark .form_field_input:focus {
          border-color: #818cf8;
          background: #0f172a;
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
        }

        .field_textarea {
          resize: vertical;
          min-height: 100px;
        }

        .secure_dispatch_badge {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
        }

        .direct_submit_btn {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #4458dc 0%, #854fee 100%);
          color: #ffffff;
          border: none;
          padding: 13px 30px;
          border-radius: 50px;
          font-size: 0.94rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(68, 88, 220, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .direct_submit_btn {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          color: #06080e !important;
          box-shadow: 0 8px 25px rgba(56, 189, 248, 0.45);
        }

        .direct_submit_btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 14px 32px rgba(68, 88, 220, 0.55);
        }

        .dark .direct_submit_btn:hover:not(:disabled) {
          box-shadow: 0 14px 34px rgba(56, 189, 248, 0.65);
        }

        .direct_submit_btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .alert_live_success {
          background: rgba(16, 185, 129, 0.15) !important;
          border: 1px solid rgba(16, 185, 129, 0.4) !important;
          color: #065f46 !important;
        }

        .dark .alert_live_success {
          color: #34d399 !important;
        }

        .alert_live_error {
          background: rgba(239, 68, 68, 0.15) !important;
          border: 1px solid rgba(239, 68, 68, 0.4) !important;
          color: #991b1b !important;
        }

        .dark .alert_live_error {
          color: #f87171 !important;
        }
      `}} />
    </section>
  );
};
