"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { generateAndDownloadBusinessCard } from "@/lib/card-canvas";

function CardContent() {
  const searchParams = useSearchParams();
  const autoDownloadParam = searchParams.get("autodownload");

  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const portfolioUrl = "https://itsgkaranmishra.web.app";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    portfolioUrl
  )}&color=0f172a&bgcolor=ffffff&qzone=1`;

  // Auto-download on mount if requested or by default
  useEffect(() => {
    if (autoDownloadParam === "false") return;

    const timer = setTimeout(async () => {
      try {
        setDownloadingFormat("png");
        setDownloadStatus("Auto-generating and downloading high-res Business Card (PNG)...");
        await generateAndDownloadBusinessCard("png");
        setDownloadStatus("Business card (PNG) downloaded successfully!");
        setTimeout(() => setDownloadStatus(null), 4000);
      } catch (err) {
        console.error("Auto-download error:", err);
      } finally {
        setDownloadingFormat(null);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [autoDownloadParam]);

  const handleDownloadImage = async (format: "png" | "jpeg") => {
    try {
      setDownloadingFormat(format);
      setDownloadStatus(`Rendering ultra-HD business card in ${format.toUpperCase()} format...`);
      await generateAndDownloadBusinessCard(format);
      setDownloadStatus(`Card downloaded as ${format.toUpperCase()}!`);
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (err) {
      alert("Error generating card image. Please try again.");
    } finally {
      setDownloadingFormat(null);
    }
  };

  const downloadVCard = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Karan Mishra",
      "N:Mishra;Karan;;;",
      "ORG:Aurxon",
      "TITLE:Founder & AI Engineer",
      "TEL;TYPE=CELL,VOICE,WHATSAPP:+917804895074",
      "EMAIL;TYPE=WORK,INTERNET:karannmishra136@gmail.com",
      "URL:https://itsgkaranmishra.web.app",
      "URL;TYPE=GitHub:https://github.com/CodeSage4D",
      "URL;TYPE=LinkedIn:https://linkedin.com/in/itsgkaranmishra4",
      "URL;TYPE=Instagram:https://instagram.com/itsgkaranmishra",
      "ADR;TYPE=WORK:;;Sikandar Bag Colony, VIP Road;Indore;Madhya Pradesh;452006;India",
      "NOTE:Founder at Aurxon - Building FCOS factory intelligence, ALAMS agentic AI, and Neural ERP systems.",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Karan_Mishra_Aurxon.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Karan Mishra | Founder, Aurxon - Digital Smart Business Card",
          text: "Connect with Karan Mishra - Founder at Aurxon, AI & Machine Learning Engineer.",
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="card_page_container">
      {/* Status Notification Banner */}
      {downloadStatus && (
        <div className="download_status_banner animate_slide_down">
          <span className="pulse_dot"></span>
          <span>{downloadStatus}</span>
        </div>
      )}

      {/* 9:16 Portrait Digital Smart Business Card */}
      <div className="portrait_business_card">
        {/* Holographic Border Glow */}
        <div className="card_inner">
          {/* Top Brand Banner */}
          <div className="card_top_brand">
            <div className="brand_logo_circle">
              <img src="/img/png/logo-no-background.png" alt="Aurxon Logo" />
            </div>
            <div className="brand_text_block">
              <span className="brand_super_label">AURXON TECHNOLOGIES</span>
              <span className="brand_sub_tag">Next-Gen Autonomous Intelligence</span>
            </div>
          </div>

          {/* Profile Identity */}
          <div className="profile_identity_section">
            <h1 className="profile_full_name">Karan Mishra</h1>
            <p className="profile_designation">Founder &bull; Aurxon</p>
            <div className="specialty_pill">Machine Learning &amp; Python Architect</div>
          </div>

          {/* Auto-Generated Live QR Code */}
          <div className="card_qr_container">
            <div className="qr_code_frame">
              <img
                src={qrCodeUrl}
                alt="QR Code to visit https://itsgkaranmishra.web.app"
                className="qr_image"
              />
            </div>
            <div className="qr_scan_instruction">
              <span className="camera_scan_icon">📷</span>
              <span>Scan to open live portfolio &amp; AI models</span>
            </div>
          </div>

          {/* Contact Details & All Profile URLs */}
          <div className="contact_strip_list">
            <a
              href="https://itsgkaranmishra.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">🌐</div>
              <div className="strip_info">
                <span className="strip_title">Live Portfolio &bull; Company</span>
                <span className="strip_val">itsgkaranmishra.web.app</span>
              </div>
            </a>

            <a
              href="https://github.com/CodeSage4D"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">💻</div>
              <div className="strip_info">
                <span className="strip_title">GitHub Repositories (47+)</span>
                <span className="strip_val">github.com/CodeSage4D</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/itsgkaranmishra4"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">💼</div>
              <div className="strip_info">
                <span className="strip_title">LinkedIn Executive Profile</span>
                <span className="strip_val">linkedin.com/in/itsgkaranmishra4</span>
              </div>
            </a>

            <a
              href="https://instagram.com/itsgkaranmishra"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">📸</div>
              <div className="strip_info">
                <span className="strip_title">Instagram Personal Network</span>
                <span className="strip_val">@itsgkaranmishra</span>
              </div>
            </a>

            <a href="mailto:karannmishra136@gmail.com" className="contact_strip_item">
              <div className="strip_icon">✉️</div>
              <div className="strip_info">
                <span className="strip_title">Direct Email Inbox</span>
                <span className="strip_val">karannmishra136@gmail.com</span>
              </div>
            </a>

            <a href="tel:+917804895074" className="contact_strip_item">
              <div className="strip_icon">📱</div>
              <div className="strip_info">
                <span className="strip_title">Phone &bull; WhatsApp Direct</span>
                <span className="strip_val">+91 7804895074</span>
              </div>
            </a>
          </div>

          {/* Interactive Action Buttons: PNG, JPG, vCard, Share */}
          <div className="card_download_format_group">
            <span className="download_group_label">DOWNLOAD BUSINESS CARD TEMPLATE</span>
            <div className="format_btn_grid">
              <button
                onClick={() => handleDownloadImage("png")}
                disabled={downloadingFormat !== null}
                className="btn_format btn_png"
              >
                {downloadingFormat === "png" ? "⏳ Rendering..." : "📥 Download PNG"}
              </button>
              <button
                onClick={() => handleDownloadImage("jpeg")}
                disabled={downloadingFormat !== null}
                className="btn_format btn_jpg"
              >
                {downloadingFormat === "jpeg" ? "⏳ Rendering..." : "📥 Download JPG"}
              </button>
            </div>
          </div>

          <div className="card_actions_row">
            <button onClick={downloadVCard} className="btn_card_action btn_vcard">
              <span>📲 Save Contact (vCard)</span>
            </button>
            <button onClick={handleShare} className="btn_card_action btn_share">
              <span>{copied ? "✓ Copied!" : "🔗 Share Card"}</span>
            </button>
          </div>

          {/* Footer Back Link */}
          <div className="card_bottom_footer">
            <Link href="/" className="back_portfolio_link">
              &larr; Open Full Interactive Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Scoped CSS for 9:16 Portrait Business Card */}
      <style dangerouslySetInnerHTML={{ __html: `
        .card_page_container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 20%, #1e1b4b 0%, #06080e 100%);
          padding: 30px 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
        }

        .download_status_banner {
          position: fixed;
          top: 20px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(16, 185, 129, 0.95);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
          backdrop-filter: blur(10px);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .pulse_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px #ffffff;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Standard 9:16 Portrait Ratio Card */
        .portrait_business_card {
          width: 100%;
          max-width: 440px;
          background: linear-gradient(145deg, rgba(30, 27, 75, 0.92) 0%, rgba(15, 23, 42, 0.96) 100%);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(129, 140, 248, 0.4);
          border-radius: 28px;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 45px rgba(99, 102, 241, 0.25);
          overflow: hidden;
          position: relative;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }

        .card_inner {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 2;
        }

        .card_top_brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand_logo_circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #ffffff;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .brand_logo_circle img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .brand_text_block {
          display: flex;
          flex-direction: column;
        }

        .brand_super_label {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #f8fafc;
        }

        .brand_sub_tag {
          font-size: 0.68rem;
          color: #94a3b8;
        }

        .profile_identity_section {
          text-align: center;
          margin: 4px 0;
        }

        .profile_full_name {
          font-size: 1.95rem;
          font-weight: 900;
          margin: 0;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .profile_designation {
          font-size: 0.95rem;
          font-weight: 700;
          color: #818cf8;
          margin: 2px 0 6px 0;
        }

        .specialty_pill {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: rgba(99, 102, 241, 0.2);
          color: #c7d2fe;
          border: 1px solid rgba(99, 102, 241, 0.35);
          padding: 4px 12px;
          border-radius: 50px;
        }

        .card_qr_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 6px 0;
        }

        .qr_code_frame {
          width: 140px;
          height: 140px;
          background: #ffffff;
          border-radius: 16px;
          padding: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 15px rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }

        .qr_code_frame:hover {
          transform: scale(1.05);
        }

        .qr_image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        .qr_scan_instruction {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          color: #cbd5e1;
          margin-top: 8px;
          font-weight: 600;
        }

        .contact_strip_list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact_strip_item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(30, 41, 59, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 8px 12px;
          text-decoration: none !important;
          color: #ffffff;
          transition: all 0.2s ease;
        }

        .contact_strip_item:hover {
          background: rgba(99, 102, 241, 0.25);
          border-color: #818cf8;
          transform: translateX(3px);
        }

        .strip_icon {
          font-size: 1.1rem;
        }

        .strip_info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .strip_title {
          font-size: 0.66rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #94a3b8;
        }

        .strip_val {
          font-size: 0.82rem;
          font-weight: 600;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card_download_format_group {
          background: rgba(15, 23, 42, 0.6);
          border: 1px dashed rgba(129, 140, 248, 0.35);
          border-radius: 14px;
          padding: 10px 12px;
          text-align: center;
        }

        .download_group_label {
          display: block;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #a5b4fc;
          margin-bottom: 8px;
        }

        .format_btn_grid {
          display: flex;
          gap: 8px;
        }

        .btn_format {
          flex: 1;
          padding: 10px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 750;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn_png {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
        }

        .btn_png:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6);
        }

        .btn_jpg {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        }

        .btn_jpg:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
        }

        .card_actions_row {
          display: flex;
          gap: 8px;
        }

        .btn_card_action {
          flex: 1;
          padding: 10px;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .btn_vcard {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
        }

        .btn_vcard:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5);
        }

        .btn_share {
          background: rgba(99, 102, 241, 0.2);
          color: #c7d2fe;
          border: 1px solid rgba(99, 102, 241, 0.4);
        }

        .btn_share:hover {
          background: rgba(99, 102, 241, 0.35);
        }

        .card_bottom_footer {
          text-align: center;
          margin-top: 4px;
        }

        .back_portfolio_link {
          font-size: 0.78rem;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .back_portfolio_link:hover {
          color: #818cf8;
          text-decoration: underline;
        }
      `}} />
    </div>
  );
}

export default function BusinessCardPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06080e", color: "#ffffff" }}>
          Generating Executive Card...
        </div>
      }
    >
      <CardContent />
    </Suspense>
  );
}
