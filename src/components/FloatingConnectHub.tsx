"use client";

import React, { useState, useEffect } from "react";

export const FloatingConnectHub: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls down slightly
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
        setExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("direct-contact-section") || document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <div
      className={`floating_connect_hub ${visible ? "is_visible" : ""}`}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 999,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="floating_hub_inner d-flex align-items-center">
        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onClick={scrollToContact}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          className="floating_connect_btn heartbeat_soft"
          aria-label="Let's Connect"
        >
          <span className="live_ping_dot heartbeat_fluctuate mr-2"></span>
          <span className="hub_btn_text">Let&apos;s Connect</span>
          <i className="fa fa-paper-plane-o ml-2 hub_arrow_icon"></i>
        </button>

        {/* Quick Direct Actions Tray (Revealed on hover/focus) */}
        {expanded && (
          <div
            className="floating_quick_tray"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <a
              href="/card"
              className="quick_tray_item"
              title="Digital Smart Business Card (QR & vCard)"
            >
              <i className="fa fa-id-card-o"></i>
            </a>
            <a
              href="https://wa.me/917804895074"
              target="_blank"
              rel="noopener noreferrer"
              className="quick_tray_item"
              title="WhatsApp Chat"
            >
              <i className="fa fa-whatsapp"></i>
            </a>
            <a
              href="mailto:karannmishra136@gmail.com"
              className="quick_tray_item"
              title="Send Direct Email"
            >
              <i className="fa fa-envelope"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/karannmishra136"
              target="_blank"
              rel="noopener noreferrer"
              className="quick_tray_item"
              title="Connect on LinkedIn (@karannmishra136)"
            >
              <i className="fa fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/karannmishra136"
              target="_blank"
              rel="noopener noreferrer"
              className="quick_tray_item"
              title="Founder Instagram (@karannmishra136)"
            >
              <i className="fa fa-instagram"></i>
            </a>
            <a
              href="https://www.instagram.com/buildwithaurxon"
              target="_blank"
              rel="noopener noreferrer"
              className="quick_tray_item"
              title="Aurxon Instagram (@buildwithaurxon)"
            >
              <i className="fa fa-instagram" style={{ color: "#ec4899" }}></i>
            </a>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-portfolio-share"));
                }
              }}
              className="quick_tray_item quick_tray_share_item"
              title="Share Portfolio URL & Auto-Generated Message"
            >
              <i className="fa fa-share-alt" style={{ color: "#38bdf8" }}></i>
            </button>
            <a
              href="https://github.com/CodeSage4D"
              target="_blank"
              rel="noopener noreferrer"
              className="quick_tray_item"
              title="GitHub Profile"
            >
              <i className="fa fa-github"></i>
            </a>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .floating_connect_btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 22px;
          border-radius: 50px;
          background: linear-gradient(135deg, #4458dc 0%, #854fee 100%);
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 10px 25px -5px rgba(68, 88, 220, 0.5), 0 0 15px rgba(133, 79, 238, 0.3);
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 0.02em;
          cursor: pointer;
          text-decoration: none !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .floating_connect_btn {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          box-shadow: 0 10px 30px -5px rgba(99, 102, 241, 0.6), 0 0 20px rgba(168, 85, 247, 0.4);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .floating_connect_btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 15px 35px -5px rgba(68, 88, 220, 0.65), 0 0 25px rgba(133, 79, 238, 0.45);
        }

        .hub_arrow_icon {
          transition: transform 0.3s ease;
        }

        .floating_connect_btn:hover .hub_arrow_icon {
          transform: translateX(4px) translateY(-2px);
        }

        .floating_quick_tray {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 10px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          padding: 6px 10px;
          border-radius: 40px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          animation: fadeInSlide 0.25s ease forwards;
        }

        .dark .floating_quick_tray {
          background: rgba(15, 23, 42, 0.92);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .quick_tray_item {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          background: #f1f5f9;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          text-decoration: none !important;
        }

        .dark .quick_tray_item {
          background: #1e293b;
          color: #cbd5e1;
        }

        .quick_tray_item:hover {
          background: #4458dc;
          color: #ffffff !important;
          transform: translateY(-2px);
        }

        .dark .quick_tray_item:hover {
          background: #38bdf8;
          color: #090d16 !important;
        }

        @media (max-width: 575px) {
          .floating_connect_hub {
            bottom: 20px;
            right: 20px;
          }
          .floating_connect_btn {
            padding: 10px 18px;
            font-size: 0.85rem;
          }
          .floating_quick_tray {
            display: none;
          }
        }
      `}} />
    </div>
  );
};
