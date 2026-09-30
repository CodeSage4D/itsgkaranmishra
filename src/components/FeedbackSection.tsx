"use client";

import React, { useState, useEffect } from "react";
import { getAllFeedbacks, submitUserFeedback, UserFeedback } from "@/lib/cms-store";

export const FeedbackSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadFeedbacks = () => {
    const list = getAllFeedbacks().filter((f) => f.status === "Approved");
    setFeedbacks(list);
  };

  useEffect(() => {
    loadFeedbacks();
    const handleUpdate = () => loadFeedbacks();
    window.addEventListener("ahs_cms_updated", handleUpdate);
    return () => window.removeEventListener("ahs_cms_updated", handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMsg({ type: "error", text: "Please enter your name, email, and feedback message." });
      return;
    }

    setSubmitting(true);
    setStatusMsg(null);

    try {
      submitUserFeedback({
        name,
        email,
        role: role.trim() || "Collaborator / Peer",
        company: company.trim() || "Independent",
        rating,
        message,
      });

      setStatusMsg({
        type: "success",
        text: "Thank you so much! Your feedback has been recorded and submitted to Karan Mishra's portfolio review board.",
      });

      setName("");
      setEmail("");
      setRole("");
      setCompany("");
      setRating(5);
      setMessage("");
      loadFeedbacks();

      setTimeout(() => {
        setShowModal(false);
        setStatusMsg(null);
      }, 2500);
    } catch {
      setStatusMsg({ type: "error", text: "Failed to submit feedback. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="feedbacks_section section_gap" id="feedback-section">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center">
          <div className="col-lg-9 text-center">
            <div className="main_title mb-5">
              <span className="feedback_badge heartbeat_soft">
                <span className="badge_dot"></span> Client &amp; Peer Endorsements
              </span>
              <h2 className="mt-3">Valuable Feedback &amp; Recommendations</h2>
              <p>
                Authentic testimonials, collaborative reviews, and endorsements from engineering leaders, research directors, and project collaborators.
              </p>
              <div className="mt-4">
                <button onClick={() => setShowModal(true)} className="primary_btn heartbeat_soft" style={{ cursor: "pointer" }}>
                  <span><i className="fa fa-star mr-2"></i> Leave Your Feedback</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Cards Grid */}
        <div className="row g-4">
          {feedbacks.map((f) => (
            <div key={f.id} className="col-lg-4 col-md-6 mb-4">
              <div className="feedback_card h-100">
                <div className="feedback_stars mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fa fa-star ${i < f.rating ? "star_active" : "star_inactive"}`}
                    ></i>
                  ))}
                  <span className="rating_val ml-2">{f.rating}.0</span>
                </div>

                <p className="feedback_quote">
                  &ldquo;{f.message}&rdquo;
                </p>

                <div className="feedback_author_row mt-auto pt-3 border-top">
                  <div className="author_avatar">
                    {f.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="author_info">
                    <h5 className="author_name">{f.name}</h5>
                    <p className="author_role">
                      {f.role} {f.company ? `• ${f.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Feedback Modal */}
      {showModal && (
        <div className="feedback_modal_overlay" onClick={() => setShowModal(false)}>
          <div className="feedback_modal_card" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h3 className="modal_title">Share Your Experience &bull; Feedback</h3>
              <button className="modal_close_btn" onClick={() => setShowModal(false)} aria-label="Close">
                &times;
              </button>
            </div>
            <p className="modal_sub">
              Your feedback is deeply appreciated and helps showcase collaborative impact across AI and software engineering.
            </p>

            {statusMsg && (
              <div className={`alert ${statusMsg.type === "success" ? "alert-success" : "alert-danger"} mb-3`}>
                <i className={`fa ${statusMsg.type === "success" ? "fa-check-circle" : "fa-exclamation-circle"} mr-2`}></i>
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="field_label">Your Full Name *</label>
                  <input
                    type="text"
                    className="form_control_custom"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="field_label">Your Email *</label>
                  <input
                    type="email"
                    className="form_control_custom"
                    placeholder="e.g. rajesh@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="field_label">Your Role / Designation</label>
                  <input
                    type="text"
                    className="form_control_custom"
                    placeholder="e.g. VP of Engineering / Tech Lead"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="field_label">Organization / Company</label>
                  <input
                    type="text"
                    className="form_control_custom"
                    placeholder="e.g. Apex Diagnostics / TechCorp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="field_label">Your Rating (1 to 5 Stars)</label>
                <div className="rating_picker">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`star_btn ${rating >= s ? "selected_star" : ""}`}
                      onClick={() => setRating(s)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating_picker_label">{rating} out of 5 Stars</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="field_label">Feedback Message / Review *</label>
                <textarea
                  rows={4}
                  className="form_control_custom field_textarea"
                  placeholder="Share details regarding collaboration quality, AI architecture, work ethic, or project delivery..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="primary_btn"
                  style={{ cursor: submitting ? "not-allowed" : "pointer" }}
                >
                  <span>{submitting ? "Submitting..." : "Submit Review"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scoped CSS for Feedback Section */}
      <style dangerouslySetInnerHTML={{ __html: `
        .feedbacks_section {
          background: #ffffff;
          padding: 85px 0;
          transition: background-color 0.3s ease;
        }
        .dark .feedbacks_section {
          background: transparent !important;
        }
        .feedback_badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 50px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .dark .feedback_badge {
          background: rgba(99, 102, 241, 0.18);
          color: #a5b4fc;
        }
        .badge_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6366f1;
        }
        .feedback_card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.03);
          transition: all 0.25s ease;
        }
        .dark .feedback_card {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(14px);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        }
        .feedback_card:hover {
          transform: translateY(-4px);
          border-color: #6366f1;
          box-shadow: 0 14px 35px rgba(99, 102, 241, 0.12);
        }
        .feedback_stars {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .star_active {
          color: #f59e0b;
          font-size: 1rem;
        }
        .star_inactive {
          color: #cbd5e1;
          font-size: 1rem;
        }
        .rating_val {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
        }
        .dark .rating_val {
          color: #94a3b8;
        }
        .feedback_quote {
          font-size: 0.94rem;
          line-height: 1.65;
          color: #334155;
          font-style: italic;
          margin-bottom: 20px;
        }
        .dark .feedback_quote {
          color: #cbd5e1;
        }
        .feedback_author_row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .author_avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        .author_name {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 2px 0;
        }
        .dark .author_name {
          color: #ffffff;
        }
        .author_role {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
        }
        .dark .author_role {
          color: #94a3b8;
        }

        /* Modal Styles */
        .feedback_modal_overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .feedback_modal_card {
          width: 100%;
          max-width: 600px;
          background: #ffffff;
          border-radius: 20px;
          padding: 34px 30px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          position: relative;
        }
        .dark .feedback_modal_card {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .modal_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .modal_title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .dark .modal_title {
          color: #ffffff;
        }
        .modal_close_btn {
          background: transparent;
          border: none;
          font-size: 1.8rem;
          color: #64748b;
          cursor: pointer;
          line-height: 1;
        }
        .modal_sub {
          font-size: 0.86rem;
          color: #64748b;
          margin-bottom: 20px;
        }
        .dark .modal_sub {
          color: #94a3b8;
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
          color: #cbd5e1;
        }
        .form_control_custom {
          width: 100%;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.92rem;
          color: #0f172a;
          outline: none;
        }
        .dark .form_control_custom {
          background: #1e293b;
          border-color: #334155;
          color: #ffffff;
        }
        .form_control_custom:focus {
          border-color: #6366f1;
        }
        .field_textarea {
          resize: vertical;
          min-height: 90px;
        }
        .rating_picker {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .star_btn {
          background: transparent;
          border: none;
          font-size: 1.6rem;
          color: #cbd5e1;
          cursor: pointer;
          padding: 0 2px;
          transition: transform 0.15s;
        }
        .star_btn:hover {
          transform: scale(1.2);
        }
        .selected_star {
          color: #f59e0b;
        }
        .rating_picker_label {
          font-size: 0.84rem;
          color: #64748b;
          font-weight: 600;
          margin-left: 8px;
        }
        .dark .rating_picker_label {
          color: #94a3b8;
        }
      `}} />
    </section>
  );
};
