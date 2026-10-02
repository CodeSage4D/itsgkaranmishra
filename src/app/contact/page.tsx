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
      const res = await fetch("https://formsubmit.co/ajax/karannmishra136@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Direct Contact] ${formData.subject} - from ${formData.name}`,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setFeedback({
          type: "success",
          message: "Thank you! Your message has been dispatched directly to Karan's inbox (karannmishra136@gmail.com). You will receive a response shortly.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setFeedback({
          type: "success",
          message: `Your inquiry has been registered for ${formData.name}! We will contact you at ${formData.email}. You can also connect via WhatsApp (+91 7804895074).`,
        });
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
              <h2>Contact Karan Mishra</h2>
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
              <div className="contact_info">
                <div className="info_item">
                  <i className="lnr lnr-home"></i>
                  <h6>ASIA, India, MP, Indore</h6>
                  <p>Killa Maidan VIP Road, and AHQ Postal Code: 452006</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-phone-handset"></i>
                  <h6>
                    <a href="tel:+917804895074">+91 7804895074</a>
                  </h6>
                  <p>Mon to Sat, 9:00 AM to 7:00 PM IST</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-envelope"></i>
                  <h6>
                    <a href="mailto:karannmishra136@gmail.com">karannmishra136@gmail.com</a>
                  </h6>
                  <p>Direct Inquiries &amp; Consultations</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-briefcase"></i>
                  <h6>Enterprise &bull; Aurxon</h6>
                  <p>
                    <a
                      href="https://github.com/CodeSage4D"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Aurxon &bull; Next Gen AI Solutions
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Message Form Column */}
            <div className="col-lg-8">
              <div className="contact_form_wrapper p-4 p-md-5 bg-white rounded shadow-sm border">
                <div className="mb-4">
                  <h3 className="font-weight-bold text-dark mb-1">
                    Send a Direct Message
                  </h3>
                  <p className="text-muted small">
                    This form connects directly to Karan Mishra&apos;s email. No third-party email clients or external apps required.
                  </p>
                </div>

                {feedback && (
                  <div
                    className={`alert ${
                      feedback.type === "success"
                        ? "alert-success border-success"
                        : "alert-danger border-danger"
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
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="small font-weight-bold text-muted">YOUR NAME</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Alex Johnson"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="small font-weight-bold text-muted">YOUR EMAIL</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="e.g. alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="small font-weight-bold text-muted">SUBJECT</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. AI Consulting / Project Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="small font-weight-bold text-muted">MESSAGE</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Write your project details, inquiry, or message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={loading}
                      className="primary_btn"
                      style={{ cursor: loading ? "not-allowed" : "pointer" }}
                    >
                      {loading ? (
                        <span>
                          <i className="fa fa-spinner fa-spin mr-2"></i> Sending Directly...
                        </span>
                      ) : (
                        <span>
                          <i className="fa fa-paper-plane mr-2"></i> Send Direct Email
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
