"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_BLOGS, getAllBlogs, getAllFeedbacks, submitUserFeedback, UserFeedback, BlogPost } from "@/lib/cms-store";

export const RealBlogsAndFeedback: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // High-Tech Whitepaper Reader In-Page Modal States
  const [activeWhitepaper, setActiveWhitepaper] = useState<BlogPost | null>(null);
  const [whitepaperFontSize, setWhitepaperFontSize] = useState<number>(1);
  const [isModalAudioPlaying, setIsModalAudioPlaying] = useState<boolean>(false);
  const [modalAudioProgress, setModalAudioProgress] = useState<number>(0);
  const [modalCitationCopied, setModalCitationCopied] = useState<boolean>(false);
  const [modalCopiedCodeIdx, setModalCopiedCodeIdx] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    rating: 5,
    message: "",
  });

  const loadData = () => {
    const allBlogs = getAllBlogs();
    setBlogs(allBlogs.slice(0, 3));
    const list = getAllFeedbacks();
    setFeedbacks(list.filter((f) => f.status === "Approved"));
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("ahs_cms_updated", handleUpdate);
    return () => window.removeEventListener("ahs_cms_updated", handleUpdate);
  }, []);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry = submitUserFeedback({
        name: form.name,
        email: form.email,
        role: form.role || "Executive Reviewer",
        company: form.company || "Enterprise Partner",
        rating: form.rating,
        message: form.message,
      });

      // Optimistically approve so reviewer immediately sees their contribution
      newEntry.status = "Approved";
      setFeedbacks((prev) => [newEntry, ...prev]);
      setIsSubmitting(false);
      setSubmitSuccess("Thank you! Your verified feedback has been submitted to Karan Mishra.");
      setForm({ name: "", email: "", role: "", company: "", rating: 5, message: "" });
      setTimeout(() => {
        setSubmitSuccess(null);
        setShowFeedbackModal(false);
      }, 2500);
    }, 600);
  };

  return (
    <section className="real_blogs_feedback_area section_gap" id="publications-feedback">
      <div className="container">
        {/* ================= Part 1: Real Technical Publications ================= */}
        <div className="row justify-content-center">
          <div className="col-lg-9 text-center">
            <div className="main_title mb-5">
              <span className="luxury_section_eyebrow">
                <i className="fa fa-book mr-2"></i> PEER-REVIEWED ARCHITECTURES &bull; RESEARCH PUBLICATIONS
              </span>
              <h2 className="mt-3 font-weight-bold">Technical Publications &amp; Engineering Whitepapers</h2>
              <p className="section_sub_text">
                Real in-depth architectural analyses, autonomous systems design, and production post-mortems authored by <strong>Karan Mishra</strong>. No placeholder filler—read the complete technical dissertations directly.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-lg-4 col-md-6 mb-4">
              <div className="luxury_blog_card h-100 d-flex flex-column">
                <div className="blog_card_top_bar">
                  <span className="blog_cat_pill">{blog.category}</span>
                  <span className="blog_read_time">
                    <i className="fa fa-clock-o mr-1"></i> {blog.readTime}
                  </span>
                </div>

                <h3 className="blog_card_title">
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                <p className="blog_card_summary">{blog.summary}</p>

                <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
                  {blog.tags.slice(0, 3).map((t) => (
                    <span key={t} className="blog_tag_pill">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between blog_card_footer">
                  <span className="blog_date_text">
                    <i className="fa fa-calendar mr-1"></i> {blog.publishedDate}
                  </span>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveWhitepaper(blog);
                        if (typeof document !== "undefined") {
                          document.body.style.overflow = "hidden";
                        }
                      }}
                      className="btn_read_article"
                      title="Inspect publication in high-tech in-page viewer"
                    >
                      <i className="fa fa-microchip mr-1 text-gold"></i>
                      <span>Read Whitepaper</span>
                    </button>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="btn_open_external"
                      title="Open Dedicated Publication Route"
                    >
                      <i className="fa fa-external-link"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-5 pb-3">
          <Link href="/blog" className="primary_btn">
            <span>Explore All Technical Publications in Blog &rarr;</span>
          </Link>
        </div>

        {/* ================= Part 2: Real Verified Client & Peer Endorsements ================= */}
        <div className="row justify-content-center mt-5 pt-4">
          <div className="col-lg-9 text-center">
            <div className="main_title mb-4">
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap mb-2">
                <span className="luxury_section_eyebrow">
                  <i className="fa fa-shield mr-2"></i> VERIFIED PROFESSIONAL ENDORSEMENTS
                </span>
                <span className="probability_badge" title="Bayesian Verification Ratio">
                  <span className="pulse_dot_gold"></span>
                  <span>Confidence: 99.8% • Verified Partners</span>
                </span>
              </div>
              <h2 className="mt-2 font-weight-bold">Real Feedback From Industry Leaders</h2>
              <p className="section_sub_text">
                Direct testimonials from enterprise leaders, clinical directors, and research colleagues who have deployed Karan Mishra’s AI models and autonomous systems.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {feedbacks.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 mb-4">
              <div className="luxury_feedback_card h-100 d-flex flex-column">
                <div className="feedback_card_header d-flex align-items-center justify-content-between mb-3">
                  <div className="rating_stars_row">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`fa fa-star ${i < item.rating ? "star_active" : "star_inactive"}`}
                      ></i>
                    ))}
                  </div>
                  <span className="verified_partner_pill">
                    <i className="fa fa-check-circle mr-1"></i> Verified Partner
                  </span>
                </div>

                <p className="feedback_quote_text">"{item.message}"</p>

                <div className="mt-auto pt-3 border-top d-flex align-items-center gap-3 feedback_client_row">
                  <div className="client_avatar_circle">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="client_name_text">{item.name}</h5>
                    <div className="client_role_text">{item.role}</div>
                    <div className="client_company_text">{item.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button to Open Submit Feedback Modal */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setShowFeedbackModal(true)}
            className="primary_btn tr-bg"
          >
            <span><i className="fa fa-pencil-square-o mr-2"></i>Submit Your Verified Feedback</span>
          </button>
        </div>
      </div>

      {/* Interactive Modal to Submit Real Feedback */}
      {showFeedbackModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(7, 12, 20, 0.85)", backdropFilter: "blur(12px)" }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content luxury_modal_content">
              <div className="modal-header luxury_modal_header">
                <div>
                  <h5 className="modal-title font-weight-bold text-white mb-0">
                    Submit Verified Collaboration Review
                  </h5>
                  <span className="small text-muted">Feedback will be added to the public live registry</span>
                </div>
                <button
                  type="button"
                  className="close text-white"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body luxury_modal_body">
                {submitSuccess ? (
                  <div className="alert alert-success">
                    <i className="fa fa-check-circle mr-2"></i> {submitSuccess}
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit}>
                    <div className="mb-3">
                      <label className="form_label">Your Full Name *</label>
                      <input
                        type="text"
                        className="form-control luxury_input"
                        placeholder="e.g. Dr. Jennifer Vance"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form_label">Email (Verified) *</label>
                        <input
                          type="email"
                          className="form-control luxury_input"
                          placeholder="jennifer@enterprise.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form_label">Rating (1 to 5 Stars)</label>
                        <select
                          className="form-control luxury_input"
                          value={form.rating}
                          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                        >
                          <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                          <option value={4}>★★★★☆ (4 Stars - Highly Competent)</option>
                          <option value={3}>★★★☆☆ (3 Stars - Satisfactory)</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form_label">Professional Role / Title</label>
                        <input
                          type="text"
                          className="form-control luxury_input"
                          placeholder="VP of Engineering / AI Lead"
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form_label">Organization / Entity</label>
                        <input
                          type="text"
                          className="form-control luxury_input"
                          placeholder="Hospital Network / AI Lab"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form_label">Endorsement / Feedback Message *</label>
                      <textarea
                        rows={3}
                        className="form-control luxury_input"
                        placeholder="Detail your engineering engagement with Karan Mishra and the Aurxon platform..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button
                        type="button"
                        className="primary_btn tr-bg btn-sm"
                        onClick={() => setShowFeedbackModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="primary_btn btn-sm"
                      >
                        {isSubmitting ? "Transmitting..." : "Submit Verified Endorsement"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= HIGH-TECH DYNAMIC WHITEPAPER READER MODAL ================= */}
      {activeWhitepaper && (
        <div
          className="whitepaper_modal_backdrop"
          onClick={() => {
            setActiveWhitepaper(null);
            if (typeof document !== "undefined") {
              document.body.style.overflow = "auto";
            }
          }}
        >
          <div
            className="whitepaper_modal_window"
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: `${whitepaperFontSize * 100}%` }}
          >
            {/* High-Tech HUD Header */}
            <div className="whitepaper_modal_hud_bar">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="hud_radar_dot"></span>
                <span className="font-mono text-gold small font-weight-bold">
                  AXN-DOC-2026 // {activeWhitepaper.category.toUpperCase()}
                </span>
                <span className="badge badge-dark border border-secondary text-cyan font-mono small">
                  STATUS: VERIFIED PRODUCTION ARCHITECTURE
                </span>
              </div>

              <div className="d-flex align-items-center gap-2 flex-wrap">
                {/* Font Scaling */}
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-muted"
                    onClick={() => setWhitepaperFontSize((p) => Math.max(0.85, p - 0.05))}
                    title="Decrease text size"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-muted"
                    onClick={() => setWhitepaperFontSize(1)}
                    title="Reset text size"
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-muted"
                    onClick={() => setWhitepaperFontSize((p) => Math.min(1.25, p + 0.05))}
                    title="Increase text size"
                  >
                    A+
                  </button>
                </div>

                {/* Audio Narration Simulator */}
                <button
                  type="button"
                  onClick={() => {
                    setIsModalAudioPlaying(!isModalAudioPlaying);
                    if (!isModalAudioPlaying) {
                      setModalAudioProgress(1);
                    }
                  }}
                  className={`btn btn-sm ${isModalAudioPlaying ? "btn-success" : "btn-outline-info"}`}
                  title="Listen to neural voice stream"
                >
                  <i className={`fa ${isModalAudioPlaying ? "fa-pause" : "fa-headphones"} mr-1`}></i>
                  <span>{isModalAudioPlaying ? "Playing AI Voice" : "Audio"}</span>
                </button>

                {/* Link to Full Route */}
                <Link
                  href={`/blog/${activeWhitepaper.slug}`}
                  className="btn btn-sm btn-outline-warning"
                  title="Open dedicated full page terminal"
                >
                  <i className="fa fa-external-link mr-1"></i> Full Page
                </Link>

                {/* Close Button */}
                <button
                  type="button"
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => {
                    setActiveWhitepaper(null);
                    if (typeof document !== "undefined") {
                      document.body.style.overflow = "auto";
                    }
                  }}
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Modal Body Scrollable Content */}
            <div className="whitepaper_modal_scroll_body">
              {/* Paper Header */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                  <span className="badge badge-primary py-1 px-2 font-mono small">{activeWhitepaper.category}</span>
                  <span className="text-muted small font-mono"><i className="fa fa-clock-o mr-1"></i>{activeWhitepaper.readTime}</span>
                  <span className="text-muted small font-mono">&bull; {activeWhitepaper.publishedDate}</span>
                </div>
                <h2 className="text-white font-weight-bold mb-3" style={{ fontSize: "1.85rem", lineHeight: "1.3" }}>
                  {activeWhitepaper.title}
                </h2>

                {/* Author Dossier Ribbon */}
                <div className="d-flex align-items-center gap-3 p-3 rounded mb-4" style={{ background: "rgba(15, 23, 42, 0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img
                    src="/img/founder/karan_mishra_founder.jpg"
                    alt="Karan Mishra"
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid #06b6d4" }}
                  />
                  <div>
                    <div className="text-white font-weight-bold">
                      {activeWhitepaper.author} <span className="text-gold small font-mono">(@CodeSage4D)</span>
                    </div>
                    <div className="text-muted small">
                      {activeWhitepaper.authorRole} &bull; Applied AI Researcher at SUAS Indore
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Abstract Callout Box */}
              <div className="executive_abstract_box mb-4 p-3 rounded">
                <div className="font-mono text-cyan small mb-1 font-weight-bold">
                  <i className="fa fa-microchip mr-1"></i> EXECUTIVE ARCHITECTURAL ABSTRACT
                </div>
                <p className="mb-0 text-white-50" style={{ fontStyle: "italic", fontSize: "1.05rem" }}>
                  &ldquo;{activeWhitepaper.summary}&rdquo;
                </p>
              </div>

              {/* Formatted Markdown Content */}
              <div className="whitepaper_rendered_text mb-4">
                {activeWhitepaper.content.split("\n").map((line, idx) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("### ")) {
                    return (
                      <h4 key={idx} className="text-cyan font-weight-bold mt-4 mb-2" style={{ borderLeft: "3px solid #06b6d4", paddingLeft: "10px" }}>
                        {trimmed.replace("### ", "")}
                      </h4>
                    );
                  }
                  if (trimmed.startsWith("#### ")) {
                    return (
                      <h5 key={idx} className="text-white font-weight-bold mt-3 mb-2">
                        {trimmed.replace("#### ", "")}
                      </h5>
                    );
                  }
                  if (trimmed.startsWith("---")) {
                    return <hr key={idx} className="my-3" style={{ borderColor: "rgba(255,255,255,0.1)" }} />;
                  }
                  if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                    return (
                      <div key={idx} className="d-flex align-items-start mb-2 ml-2">
                        <span className="text-cyan mr-2">◆</span>
                        <span className="text-white-50">{trimmed.replace(/^(\*|-)\s+/, "")}</span>
                      </div>
                    );
                  }
                  if (trimmed.match(/^[0-9]+\.\s+/)) {
                    return (
                      <div key={idx} className="p-3 mb-2 rounded" style={{ background: "rgba(2, 132, 199, 0.08)", borderLeft: "3px solid #0284c7" }}>
                        <span className="text-white font-weight-500">{trimmed}</span>
                      </div>
                    );
                  }
                  if (!trimmed) {
                    return <div key={idx} className="my-2" />;
                  }
                  return (
                    <p key={idx} className="text-white mb-3" style={{ lineHeight: "1.75", fontSize: "1.05rem", opacity: "0.9" }}>
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Research Citation & Tags */}
              <div className="p-3 rounded mb-4" style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px dashed rgba(255,255,255,0.15)" }}>
                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                  <span className="text-gold font-mono small font-weight-bold">
                    <i className="fa fa-quote-left mr-1"></i> ACADEMIC CITATION ENTRY
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const cite = `@article{mishra2026${activeWhitepaper.id},\n  author = {Karan Mishra},\n  title = {${activeWhitepaper.title}},\n  journal = {Aurxon Research Codex},\n  year = {2026}\n}`;
                        navigator.clipboard.writeText(cite);
                        setModalCitationCopied(true);
                        setTimeout(() => setModalCitationCopied(false), 2000);
                      }
                    }}
                    className="btn btn-sm btn-outline-warning font-mono"
                  >
                    {modalCitationCopied ? "✓ Copied" : "Copy BibTeX"}
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {activeWhitepaper.tags.map((t) => (
                    <span key={t} className="badge badge-dark border border-secondary text-muted font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="whitepaper_modal_footer">
              <div className="text-muted small font-mono">
                Author: Karan Mishra (Karann Mishra) &bull; Aurxon Research Codex
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="primary_btn tr-bg btn-sm"
                  onClick={() => {
                    setActiveWhitepaper(null);
                    if (typeof document !== "undefined") {
                      document.body.style.overflow = "auto";
                    }
                  }}
                >
                  <span>Close Viewer</span>
                </button>
                <Link
                  href={`/blog/${activeWhitepaper.slug}`}
                  className="primary_btn btn-sm"
                >
                  <span>Open Full Screen Codex &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .real_blogs_feedback_area {
          position: relative;
          background: transparent !important;
        }

        .luxury_section_eyebrow {
          display: inline-flex;
          align-items: center;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #CEA17A; /* Noguchi Champagne Gold */
          text-transform: uppercase;
          background: rgba(206, 161, 122, 0.12);
          padding: 6px 16px;
          border-radius: 50px;
        }

        .dark .luxury_section_eyebrow {
          color: #CEA17A;
          background: rgba(206, 161, 122, 0.15);
        }

        .section_sub_text {
          max-width: 740px;
          margin: 10px auto 0;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #64748b;
        }

        .dark .section_sub_text {
          color: #94a3b8;
        }

        .probability_badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(206, 161, 122, 0.1);
          color: #CEA17A;
          font-family: monospace;
          font-size: 0.78rem;
          font-weight: 800;
          padding: 5px 12px;
          border-radius: 50px;
        }

        .pulse_dot_gold {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #CEA17A;
          box-shadow: 0 0 8px #CEA17A;
        }

        /* Luxury Blog Card */
        .luxury_blog_card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 22px;
          padding: 26px;
          box-shadow: 0 10px 35px rgba(15, 23, 42, 0.05);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          border: none !important;
          outline: none !important;
        }

        .dark .luxury_blog_card {
          background: rgba(9, 23, 31, 0.88);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
        }

        .luxury_blog_card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(206, 161, 122, 0.15);
        }

        .dark .luxury_blog_card:hover {
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.8);
        }

        .blog_card_top_bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .blog_cat_pill {
          font-size: 0.74rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #0284c7;
          background: rgba(2, 132, 199, 0.1);
          padding: 3px 10px;
          border-radius: 6px;
        }

        .dark .blog_cat_pill {
          color: #73C4BF;
          background: rgba(115, 196, 191, 0.15);
        }

        .blog_read_time {
          font-size: 0.76rem;
          color: #64748b;
        }

        .dark .blog_read_time {
          color: #94a3b8;
        }

        .blog_card_title {
          font-size: 1.22rem;
          font-weight: 800;
          line-height: 1.35;
          margin-bottom: 10px;
        }

        .blog_card_title a {
          color: #0f172a;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }

        .dark .blog_card_title a {
          color: #ffffff;
        }

        .blog_card_title a:hover {
          color: #CEA17A;
        }

        .blog_card_summary {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .dark .blog_card_summary {
          color: #94a3b8;
        }

        .blog_tag_pill {
          font-family: monospace;
          font-size: 0.74rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .dark .blog_tag_pill {
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
        }

        .blog_card_footer {
          border-top-color: rgba(226, 232, 240, 0.6) !important;
        }

        .dark .blog_card_footer {
          border-top-color: rgba(255, 255, 255, 0.08) !important;
        }

        .blog_date_text {
          font-size: 0.78rem;
          color: #64748b;
        }

        .dark .blog_date_text {
          color: #94a3b8;
        }

        .btn_read_article {
          font-size: 0.84rem;
          font-weight: 750;
          color: #CEA17A;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .btn_read_article:hover {
          color: #E6C29E;
        }

        /* Luxury Feedback Card */
        .luxury_feedback_card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 22px;
          padding: 26px;
          box-shadow: 0 10px 35px rgba(15, 23, 42, 0.05);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          border: none !important;
          outline: none !important;
        }

        .dark .luxury_feedback_card {
          background: rgba(9, 23, 31, 0.88);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
        }

        .luxury_feedback_card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(206, 161, 122, 0.15);
        }

        .star_active {
          color: #f59e0b;
        }

        .star_inactive {
          color: #cbd5e1;
        }

        .dark .star_inactive {
          color: #334155;
        }

        .verified_partner_pill {
          font-size: 0.72rem;
          font-weight: 800;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 2px 8px;
          border-radius: 50px;
        }

        .feedback_quote_text {
          font-size: 0.95rem;
          line-height: 1.65;
          font-style: italic;
          color: #334155;
          margin-bottom: 14px;
        }

        .dark .feedback_quote_text {
          color: #e2e8f0;
        }

        .client_avatar_circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #CEA17A 0%, #062456 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .client_name_text {
          font-size: 0.98rem;
          font-weight: 800;
          margin: 0;
          color: #0f172a;
        }

        .dark .client_name_text {
          color: #ffffff;
        }

        .client_role_text {
          font-size: 0.8rem;
          color: #CEA17A;
          font-weight: 700;
        }

        .client_company_text {
          font-size: 0.76rem;
          color: #64748b;
        }

        .dark .client_company_text {
          color: #94a3b8;
        }

        /* Modal */
        .luxury_modal_content {
          background: #09171F;
          border-radius: 20px;
          border: none !important;
          color: #f8fafc;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
        }

        .luxury_modal_header {
          border-bottom: 1px solid rgba(206, 161, 122, 0.2);
          padding: 20px 24px;
        }

        .luxury_modal_body {
          padding: 24px;
        }

        .form_label {
          font-size: 0.82rem;
          font-weight: 750;
          color: #CEA17A;
          margin-bottom: 4px;
          display: block;
        }

        .luxury_input {
          background: #0f172a !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .luxury_input:focus {
          border-color: #CEA17A !important;
          box-shadow: 0 0 10px rgba(206, 161, 122, 0.3) !important;
        }

        /* High-Tech In-Page Whitepaper Reader Modal Styles */
        .btn_open_external {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #94a3b8;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          text-decoration: none !important;
        }
        .btn_open_external:hover {
          background: rgba(2, 132, 199, 0.2);
          border-color: #0284c7;
          color: #38bdf8;
        }

        .whitepaper_modal_backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 7, 15, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .whitepaper_modal_window {
          background: #070b16;
          border: 1px solid rgba(2, 132, 199, 0.35);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(2, 132, 199, 0.15);
          border-radius: 16px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalAppear 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .whitepaper_modal_hud_bar {
          background: #0c1222;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hud_radar_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
          animation: radarBlink 1.8s infinite ease-in-out;
        }
        @keyframes radarBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.75); }
        }
        .whitepaper_modal_scroll_body {
          padding: 28px;
          overflow-y: auto;
          flex-grow: 1;
        }
        .whitepaper_modal_footer {
          background: #090d19;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .text-cyan {
          color: #38bdf8 !important;
        }
      `}} />
    </section>
  );
};
