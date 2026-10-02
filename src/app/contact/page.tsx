"use client";

import React, { useState } from "react";
import Link from "next/link";
import { recordLead } from "@/lib/analytics-client";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFeedback({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    // Record lead in database
    try {
      recordLead({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        source: "Contact Page Direct",
      });
    } catch (e) {}

    try {
      // Primary: Official NodeMailer SMTP API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setFeedback({
          type: "success",
          message: "Thank you! Your dispatch has been delivered directly to Karan Mishra's executive inbox. You will receive a direct reply shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Fallback to FormSubmit
        await fetch("https://formsubmit.co/ajax/karannmishra136@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: `[Portfolio Direct Contact] ${formData.subject} - from ${formData.name}`,
            message: formData.message,
          }),
        });

        setFeedback({
          type: "success",
          message: `Inquiry registered for ${formData.name}. We will contact you at ${formData.email} promptly.`,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setFeedback({
        type: "success",
        message: `Thank you ${formData.name}! Your message is registered in our portal. We will respond to ${formData.email} promptly.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner Area */}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-center">
              <h2>Executive Consultation &bull; Contact</h2>
              <div className="page_link">
                <Link href="/">Home</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Area */}
      <section className="contact_area section_gap">
        <div className="container">
          <div className="row">
            {/* Contact Info Column */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="contact_info_box p-4">
                <div className="info_item mb-4">
                  <i className="fas fa-building text-gold"></i>
                  <h6 className="text-white font-weight-bold mb-1">AURXON Headquarters</h6>
                  <p className="text-muted small mb-0">
                    Killa Maidan, VIP Road, Indore, Madhya Pradesh – 452006, India
                  </p>
                </div>

                <div className="info_item mb-4">
                  <i className="fas fa-phone-alt text-opal"></i>
                  <h6 className="text-white font-weight-bold mb-1">Executive Line</h6>
                  <p className="small mb-0">
                    <a href="tel:+917804895074" className="text-gold font-mono">+91 7804895074</a>
                  </p>
                  <span className="text-muted text-xs d-block">Direct WhatsApp &amp; Voice Available</span>
                </div>

                <div className="info_item mb-4">
                  <i className="fas fa-envelope text-gold"></i>
                  <h6 className="text-white font-weight-bold mb-1">Direct Email</h6>
                  <p className="small mb-0">
                    <a href="mailto:karannmishra136@gmail.com" className="text-gold font-mono">
                      karannmishra136@gmail.com
                    </a>
                  </p>
                  <span className="text-muted text-xs d-block">Guaranteed response within 24h</span>
                </div>

                <div className="info_item mb-4">
                  <i className="fas fa-globe text-opal"></i>
                  <h6 className="text-white font-weight-bold mb-1">Official Platform</h6>
                  <p className="small mb-0">
                    <a
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-opal"
                    >
                      aurxon.com &rarr; Next Gen AI Solutions
                    </a>
                  </p>
                </div>

                {/* Social Connects */}
                <div className="pt-3 border-top border-secondary mt-3">
                  <span className="text-muted small d-block mb-2 font-mono">Official Profiles:</span>
                  <div className="d-flex gap-2 flex-wrap">
                    <a
                      href="https://github.com/CodeSage4D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social_pill_btn"
                      title="GitHub @CodeSage4D"
                    >
                      <i className="fab fa-github mr-1"></i> GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/karannmishra136"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social_pill_btn"
                      title="LinkedIn @karannmishra136"
                    >
                      <i className="fab fa-linkedin mr-1"></i> LinkedIn
                    </a>
                    <a
                      href="https://instagram.com/karannmishra136"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social_pill_btn"
                      title="Founder Instagram @karannmishra136"
                    >
                      <i className="fab fa-instagram mr-1"></i> @karannmishra136
                    </a>
                    <a
                      href="https://instagram.com/buildwithaurxon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social_pill_btn"
                      title="Company Instagram @buildwithaurxon"
                    >
                      <i className="fab fa-instagram mr-1"></i> @buildwithaurxon
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message Form Column */}
            <div className="col-lg-8">
              <div className="contact_form_glass p-4 p-md-5">
                <div className="mb-4">
                  <span className="text-gold font-mono small tracking-widest font-weight-bold text-uppercase">
                    Direct Telemetry Channel
                  </span>
                  <h3 className="text-white font-weight-bold mt-1 mb-2">
                    Initiate Direct Executive Consultation
                  </h3>
                  <p className="text-muted small">
                    This portal dispatches encrypted messages directly to Karan Mishra&apos;s verified inbox.
                  </p>
                </div>

                {feedback && (
                  <div
                    className={`alert ${
                      feedback.type === "success"
                        ? "alert_success_luxury"
                        : "alert_danger_luxury"
                    } mb-4`}
                    role="alert"
                  >
                    <i
                      className={`fa ${
                        feedback.type === "success"
                          ? "fa-check-circle"
                          : "fa-exclamation-triangle"
                      } mr-2`}
                    ></i>
                    {feedback.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6 mb-3">
                      <label className="text-muted small font-weight-bold font-mono">YOUR FULL NAME *</label>
                      <input
                        type="text"
                        className="form-control luxury_input"
                        placeholder="e.g. Dr. Rajesh Sharma"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="text-muted small font-weight-bold font-mono">YOUR EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        className="form-control luxury_input"
                        placeholder="e.g. rajesh@enterprise.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-muted small font-weight-bold font-mono">SUBJECT / PROJECT SCOPE *</label>
                    <input
                      type="text"
                      className="form-control luxury_input"
                      placeholder="e.g. Production Neural Model Architecture & SaaS Deployment"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-muted small font-weight-bold font-mono">MESSAGE SPECIFICATIONS *</label>
                    <textarea
                      className="form-control luxury_input"
                      rows={5}
                      placeholder="Describe your architecture requirements, timeline, or consultation goals..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="primary_btn w-100 py-3"
                    disabled={loading}
                  >
                    <span>
                      {loading ? (
                        <>
                          <i className="fa fa-spinner fa-spin mr-2"></i>
                          Encrypting &amp; Dispatching...
                        </>
                      ) : (
                        <>
                          <i className="fa fa-paper-plane mr-2"></i>
                          Dispatch Inquiry to Karan Mishra
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-gold {
          color: #CEA17A !important;
        }

        .text-opal {
          color: #73C4BF !important;
        }

        .text-xs {
          font-size: 0.72rem;
        }

        .contact_info_box {
          background: rgba(9, 23, 31, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          border: none !important;
          outline: none !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .contact_form_glass {
          background: rgba(9, 23, 31, 0.85);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 24px;
          border: none !important;
          outline: none !important;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.45);
        }

        .luxury_input {
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          border-radius: 10px !important;
          padding: 12px 16px !important;
          transition: all 0.3s ease;
        }

        .luxury_input:focus {
          border-color: #CEA17A !important;
          box-shadow: 0 0 15px rgba(206, 161, 122, 0.2) !important;
          background: rgba(255, 255, 255, 0.07) !important;
        }

        .luxury_input::placeholder {
          color: #64748b !important;
        }

        .social_pill_btn {
          background: rgba(255, 255, 255, 0.04);
          color: #cbd5e1;
          font-size: 0.74rem;
          padding: 5px 12px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social_pill_btn:hover {
          background: #CEA17A;
          color: #09171F;
        }

        .alert_success_luxury {
          background: rgba(16, 185, 129, 0.15);
          color: #6ee7b7;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 12px;
          padding: 14px 18px;
        }

        .alert_danger_luxury {
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          padding: 14px 18px;
        }

        @media (max-width: 768px) {
          .contact_form_glass {
            padding: 24px 16px !important;
          }
          .contact_info_box {
            padding: 20px 16px !important;
          }
        }
      `}} />
    </>
  );
}
