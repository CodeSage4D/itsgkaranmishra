"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  generateAndDownloadBusinessCard,
  downloadVCardContact,
  CardTheme,
} from "@/lib/card-canvas";

function CardContent() {
  const searchParams = useSearchParams();
  const autoDownloadParam = searchParams.get("autodownload");

  const [selectedTheme, setSelectedTheme] = useState<CardTheme>("glacier");
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const portfolioUrl = "https://itsgkaranmishra.web.app";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    portfolioUrl
  )}&color=082f49&bgcolor=ffffff&qzone=1`;

  // Strictly user-initiated downloads on manual button click

  const handleDownloadImage = async (format: "png" | "jpeg") => {
    try {
      setDownloadingFormat(format);
      setDownloadStatus(`Rendering crystal-HD business card in ${format.toUpperCase()} (${selectedTheme.toUpperCase()})...`);
      await generateAndDownloadBusinessCard(format, selectedTheme);
      setDownloadStatus(`✓ Card downloaded in high-res ${format.toUpperCase()}!`);
      setTimeout(() => setDownloadStatus(null), 3500);
    } catch (err) {
      alert("Error generating card image. Please try again.");
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleDownloadBundle = async () => {
    try {
      setDownloadingFormat("bundle");
      setDownloadStatus("Packaging High-Res Card Image + Smartphone Contact (.VCF)...");
      await generateAndDownloadBusinessCard("png", selectedTheme);
      downloadVCardContact();
      setDownloadStatus("✓ Both Card & Phone Contact (.vcf) saved! Open the .vcf file to add to contacts.");
      setTimeout(() => setDownloadStatus(null), 4500);
    } catch {
      alert("Error generating bundle download.");
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Karan Mishra | Founder, Aurxon - Executive Smart Card",
          text: "Connect with Karan Mishra - Founder at Aurxon, AI & Machine Learning Engineer.",
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={`card_page_container theme_${selectedTheme}`}>
      {/* Status Notification Banner */}
      {downloadStatus && (
        <div className="download_status_banner animate_slide_down">
          <span className="pulse_dot"></span>
          <span>{downloadStatus}</span>
        </div>
      )}

      {/* Top Header & Mood / Design Selector */}
      <div className="card_header_control_panel">
        <div className="control_panel_top">
          <span className="badge_mood_title">Choose Executive Card Mood &amp; Design:</span>
          <div className="theme_selector_pills">
            <button
              onClick={() => setSelectedTheme("glacier")}
              className={`mood_pill ${selectedTheme === "glacier" ? "is_active" : ""}`}
            >
              🌊 Atlantic Glacier Blue (Pure Light)
            </button>
            <button
              onClick={() => setSelectedTheme("titanium")}
              className={`mood_pill ${selectedTheme === "titanium" ? "is_active" : ""}`}
            >
              💎 Titanium Luxe (Clean Platinum)
            </button>
            <button
              onClick={() => setSelectedTheme("cyber")}
              className={`mood_pill ${selectedTheme === "cyber" ? "is_active" : ""}`}
            >
              🌌 Cyber Neon (Tech Obsidian)
            </button>
          </div>
        </div>
      </div>

      {/* 9:16 Portrait Digital Smart Business Card */}
      <div className={`portrait_business_card card_theme_${selectedTheme}`}>
        <div className="card_inner">
          {/* Top Brand Banner: Aurxon + SUAS Indore Affiliation */}
          <div className="card_top_brand">
            <div className="brand_logo_circle">
              <img
                src="/img/png/logo-color.png"
                alt="Aurxon Logo"
                className="brand_logo_img"
              />
            </div>
            <div className="brand_text_block">
              <div className="d-flex align-items-center justify-content-between">
                <span className="brand_super_label">AURXON</span>
                <span className="verified_micro_pill">✓ VERIFIED</span>
              </div>
              <span className="brand_sub_tag">Aurxon - Next Gen AI Solutions</span>
              <span className="brand_affiliation_sub">Where Intelligence Meets Innovation</span>
            </div>
          </div>

          {/* Profile Identity */}
          <div className="profile_identity_section">
            <h1 className="profile_full_name">Karan Mishra</h1>
            <p className="profile_designation">Founder &bull; Aurxon</p>
            <div className="specialty_pill">MACHINE LEARNING &amp; PYTHON ARCHITECT</div>
          </div>

          {/* Auto-Generated Live QR Code Box */}
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
              <span>Scan to open live portfolio &amp; AI architectures</span>
            </div>
            <div className="qr_url_label">https://itsgkaranmishra.web.app</div>
          </div>

          {/* Contact Details & All Profile URLs */}
          <div className="contact_strip_list">
            <a
              href="https://aurxon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">⚡</div>
              <div className="strip_info">
                <span className="strip_title">Official Company Website</span>
                <span className="strip_val">aurxon.com &bull; Next Gen AI Solutions</span>
              </div>
            </a>

            <a
              href="https://itsgkaranmishra.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">🌐</div>
              <div className="strip_info">
                <span className="strip_title">Founder Live Portfolio</span>
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
                <span className="strip_title">GitHub Repositories</span>
                <span className="strip_val">github.com/CodeSage4D (47+ Repos)</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/karannmishra136"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">💼</div>
              <div className="strip_info">
                <span className="strip_title">LinkedIn Executive Profile</span>
                <span className="strip_val">linkedin.com/in/karannmishra136</span>
              </div>
            </a>

            <a
              href="https://instagram.com/karannmishra136"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">📸</div>
              <div className="strip_info">
                <span className="strip_title">Founder Instagram</span>
                <span className="strip_val">@karannmishra136</span>
              </div>
            </a>

            <a
              href="https://instagram.com/buildwithaurxon"
              target="_blank"
              rel="noopener noreferrer"
              className="contact_strip_item"
            >
              <div className="strip_icon">🏢</div>
              <div className="strip_info">
                <span className="strip_title">Aurxon Official Instagram</span>
                <span className="strip_val">@buildwithaurxon</span>
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

            <div className="contact_strip_item">
              <div className="strip_icon">📍</div>
              <div className="strip_info">
                <span className="strip_title">Headquarters Address</span>
                <span className="strip_val">
                  AURXON Headquarters, Killa Maidan, VIP Road, Indore, Madhya Pradesh – 452006, India
                </span>
              </div>
            </div>
          </div>

          {/* All-in-One Download & Auto-Save Actions */}
          <div className="card_download_format_group">
            <button
              onClick={handleDownloadBundle}
              disabled={downloadingFormat !== null}
              className="btn_bundle_download"
              title="Download high-res card and phone contact .vcf simultaneously"
            >
              <span>⚡ Auto-Save Bundle (Card PNG + Phone Contact)</span>
            </button>

            <div className="format_btn_grid">
              <button
                onClick={() => handleDownloadImage("png")}
                disabled={downloadingFormat !== null}
                className="btn_format btn_png"
              >
                {downloadingFormat === "png" ? "⏳ Rendering..." : "📥 Download Card (PNG)"}
              </button>
              <button
                onClick={downloadVCardContact}
                className="btn_format btn_vcard_direct"
                title="Directly save Karan Mishra into smartphone contacts"
              >
                👤 Save Contact (.VCF)
              </button>
            </div>
          </div>

          <div className="card_actions_row">
            <button
              onClick={() => handleDownloadImage("jpeg")}
              disabled={downloadingFormat !== null}
              className="btn_card_action"
            >
              <span>🖼️ Download JPG</span>
            </button>
            <button onClick={handleShare} className="btn_card_action btn_share">
              <span>{copied ? "✓ Copied Link!" : "🔗 Share Smart Card"}</span>
            </button>
          </div>

          {/* Footer Back Link */}
          <div className="card_bottom_footer">
            <Link href="/" className="back_portfolio_link">
              &larr; Return to Live Founder Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Modern 9:16 Portrait Business Card */}
      <style dangerouslySetInnerHTML={{ __html: `
        .card_page_container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          transition: background 0.4s ease;
        }

        .card_page_container.theme_glacier {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%);
        }

        .card_page_container.theme_titanium {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
        }

        .card_page_container.theme_cyber {
          background: radial-gradient(circle at 50% 20%, #1e1b4b 0%, #06080e 100%);
        }

        .download_status_banner {
          position: fixed;
          top: 20px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #0284c7;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 700;
          box-shadow: 0 12px 35px rgba(2, 132, 199, 0.4);
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

        /* Control Panel */
        .card_header_control_panel {
          width: 100%;
          max-width: 520px;
          margin-bottom: 24px;
          text-align: center;
        }

        .badge_mood_title {
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #0369a1;
          display: block;
          margin-bottom: 10px;
        }

        .theme_cyber .badge_mood_title {
          color: #38bdf8;
        }

        .theme_selector_pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .mood_pill {
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 700;
          border: 1px solid rgba(2, 132, 199, 0.25);
          background: #ffffff;
          color: #0f172a;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .theme_cyber .mood_pill {
          background: rgba(15, 23, 42, 0.85);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .mood_pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(2, 132, 199, 0.2);
        }

        .mood_pill.is_active {
          background: #0284c7;
          color: #ffffff;
          border-color: #0284c7;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
        }

        /* Business Card Base */
        .portrait_business_card {
          width: 100%;
          max-width: 460px;
          border-radius: 32px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.2), 0 0 30px rgba(56, 189, 248, 0.2);
          transition: all 0.3s ease;
        }

        /* THEME 1: GLACIER BLUE (LIGHT) */
        .card_theme_glacier {
          background: linear-gradient(165deg, #ffffff 0%, #f0f9ff 35%, #e0f2fe 75%, #bae6fd 100%);
          border: 2px solid rgba(2, 132, 199, 0.4);
          color: #082f49;
        }

        .card_theme_glacier .card_top_brand {
          border-bottom: 1px solid rgba(2, 132, 199, 0.2);
          padding-bottom: 12px;
        }

        .card_theme_glacier .brand_super_label {
          color: #0c4a6e;
          font-weight: 900;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
        }

        .card_theme_glacier .brand_sub_tag {
          color: #0284c7;
          font-weight: 700;
          font-size: 0.76rem;
        }

        .card_theme_glacier .brand_affiliation_sub {
          color: #0369a1;
          font-weight: 600;
          font-size: 0.72rem;
        }

        .card_theme_glacier .profile_full_name {
          color: #082f49;
          font-size: 2.2rem;
          font-weight: 900;
          margin-bottom: 2px;
        }

        .card_theme_glacier .profile_designation {
          color: #0284c7;
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .card_theme_glacier .specialty_pill {
          background: #ffffff;
          border: 1.5px solid #38bdf8;
          color: #0369a1;
          font-weight: 800;
          font-size: 0.76rem;
          padding: 6px 14px;
          border-radius: 50px;
          display: inline-block;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.12);
        }

        .card_theme_glacier .qr_code_frame {
          background: #ffffff;
          border: 2px solid rgba(2, 132, 199, 0.25);
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.18);
        }

        .card_theme_glacier .qr_scan_instruction {
          color: #0c4a6e;
          font-weight: 800;
        }

        .card_theme_glacier .qr_url_label {
          color: #0284c7;
          font-weight: 700;
        }

        .card_theme_glacier .contact_strip_item {
          background: #ffffff;
          border: 1px solid rgba(186, 230, 253, 0.9);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.06);
        }

        .card_theme_glacier .strip_icon {
          background: #e0f2fe;
          color: #0284c7;
        }

        .card_theme_glacier .strip_title {
          color: #0284c7;
          font-weight: 800;
        }

        .card_theme_glacier .strip_val {
          color: #0f172a; /* Deep Slate Navy for 100% crisp readability */
          font-weight: 700;
        }

        /* THEME 2: TITANIUM LUXE */
        .card_theme_titanium {
          background: linear-gradient(165deg, #ffffff 0%, #f8fafc 40%, #f1f5f9 100%);
          border: 2px solid #cbd5e1;
          color: #0f172a;
        }

        .card_theme_titanium .brand_super_label { color: #0f172a; font-weight: 900; }
        .card_theme_titanium .brand_sub_tag { color: #64748b; font-weight: 700; font-size: 0.76rem; }
        .card_theme_titanium .profile_full_name { color: #0f172a; font-size: 2.2rem; font-weight: 900; }
        .card_theme_titanium .profile_designation { color: #2563eb; font-weight: 800; }
        .card_theme_titanium .specialty_pill {
          background: #f1f5f9;
          border: 1px solid #94a3b8;
          color: #1e293b;
          font-weight: 800;
          font-size: 0.76rem;
          padding: 6px 14px;
          border-radius: 50px;
        }
        .card_theme_titanium .contact_strip_item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
        }
        .card_theme_titanium .strip_icon { background: #f1f5f9; color: #0f172a; }
        .card_theme_titanium .strip_title { color: #64748b; font-weight: 800; }
        .card_theme_titanium .strip_val { color: #0f172a; font-weight: 700; }

        /* THEME 3: CYBER NEON */
        .card_theme_cyber {
          background: linear-gradient(165deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
          border: 2px solid rgba(56, 189, 248, 0.5);
          box-shadow: 0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px rgba(56, 189, 248, 0.3);
          color: #ffffff;
        }

        .card_theme_cyber .brand_super_label { color: #ffffff; font-weight: 900; }
        .card_theme_cyber .brand_sub_tag { color: #38bdf8; font-weight: 700; font-size: 0.76rem; }
        .card_theme_cyber .brand_affiliation_sub { color: #c084fc; font-weight: 600; font-size: 0.72rem; }
        .card_theme_cyber .profile_full_name { color: #ffffff; font-size: 2.2rem; font-weight: 900; }
        .card_theme_cyber .profile_designation { color: #a855f7; font-weight: 800; }
        .card_theme_cyber .specialty_pill {
          background: rgba(56, 189, 248, 0.15);
          border: 1.5px solid #38bdf8;
          color: #7dd3fc;
          font-weight: 800;
          font-size: 0.76rem;
          padding: 6px 14px;
          border-radius: 50px;
        }
        .card_theme_cyber .contact_strip_item {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.25);
        }
        .card_theme_cyber .strip_icon { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
        .card_theme_cyber .strip_title { color: #94a3b8; font-weight: 800; }
        .card_theme_cyber .strip_val { color: #f8fafc; font-weight: 700; }

        /* Shared Card Details */
        .card_inner {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card_top_brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand_logo_circle {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #ffffff;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(2, 132, 199, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          flex-shrink: 0;
        }

        .brand_logo_img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .brand_text_block {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .verified_micro_pill {
          font-size: 0.68rem;
          font-weight: 800;
          color: #059669;
          background: #d1fae5;
          padding: 2px 8px;
          border-radius: 20px;
        }

        .profile_identity_section {
          text-align: center;
        }

        /* QR Frame */
        .card_qr_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 14px 0;
        }

        .qr_code_frame {
          width: 170px;
          height: 170px;
          border-radius: 20px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr_image {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }

        .qr_scan_instruction {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
        }

        .qr_url_label {
          font-size: 0.78rem;
          font-family: monospace;
        }

        /* Contact Strips */
        .contact_strip_list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact_strip_item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .contact_strip_item:hover {
          transform: translateX(4px);
        }

        .strip_icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          flex-shrink: 0;
        }

        .strip_info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .strip_title {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .strip_val {
          font-size: 0.88rem;
          white-space: normal;
          word-break: break-word;
          line-height: 1.35;
        }

        /* Buttons & Actions */
        .card_download_format_group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .btn_bundle_download {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.4);
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(2, 132, 199, 0.45);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn_bundle_download:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 35px rgba(2, 132, 199, 0.65), 0 0 25px rgba(99, 102, 241, 0.4);
          border-color: #ffffff;
        }

        .btn_bundle_download:active {
          transform: translateY(0) scale(0.97);
        }

        .format_btn_grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn_format {
          padding: 12px 14px;
          border-radius: 12px;
          font-weight: 750;
          font-size: 0.85rem;
          border: 1.5px solid rgba(2, 132, 199, 0.35);
          background: #ffffff;
          color: #0369a1;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
        }

        .theme_cyber .btn_format {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }

        .btn_format:hover {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          border-color: #0284c7;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 24px rgba(2, 132, 199, 0.45);
        }

        .btn_format:active {
          transform: translateY(0) scale(0.97);
        }

        .card_actions_row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn_card_action {
          padding: 10px;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .theme_cyber .btn_card_action {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(255, 255, 255, 0.15);
          color: #e2e8f0;
        }

        .btn_card_action:hover {
          border-color: #0284c7;
          color: #0284c7;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(2, 132, 199, 0.25);
        }

        .btn_card_action:active {
          transform: translateY(0) scale(0.97);
        }

        .card_bottom_footer {
          text-align: center;
          padding-top: 8px;
        }

        .back_portfolio_link {
          font-size: 0.85rem;
          font-weight: 750;
          color: #0284c7;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .theme_cyber .back_portfolio_link {
          color: #38bdf8;
        }

        .back_portfolio_link:hover {
          text-decoration: underline;
        }
      `}} />
    </div>
  );
}

export default function SmartCardPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>Loading Executive Smart Card...</span>
        </div>
      }
    >
      <CardContent />
    </Suspense>
  );
}
