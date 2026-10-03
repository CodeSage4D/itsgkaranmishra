"use client";

import React, { useEffect, useState } from "react";
import {
  generateAndDownloadBusinessCard,
  downloadVCardContact,
} from "@/lib/card-canvas";
import { recordAuditEvent } from "@/lib/analytics-client";

const STORAGE_KEY = "ahs_card_device_downloaded_v1";

export function AutoDownloadFirstVisit() {
  const [toast, setToast] = useState<{
    show: boolean;
    status: "initiating" | "downloading" | "completed" | "error";
    message: string;
  }>({
    show: false,
    status: "initiating",
    message: "",
  });

  useEffect(() => {
    // Only execute on browser client
    if (typeof window === "undefined") return;

    try {
      const alreadyDownloaded = localStorage.getItem(STORAGE_KEY);
      if (alreadyDownloaded === "true") {
        // Device has already auto-downloaded on a previous visit.
        // As requested: do not auto-download again; downloads on repeat visits are strictly manual by clicking.
        return;
      }

      // Mark this device immediately so repeat visits or multiple tabs don't re-trigger
      localStorage.setItem(STORAGE_KEY, "true");

      let hasTriggered = false;

      const triggerDownload = async () => {
        if (hasTriggered) return;
        hasTriggered = true;

        try {
          setToast({
            show: true,
            status: "downloading",
            message:
              "Welcome! Auto-saving Executive Smart Card (PNG) & Phone Contact (vCard) to your device...",
          });

          // 1. Generate & auto-download crystal-HD business card PNG
          await generateAndDownloadBusinessCard("png", "glacier");

          // Stagger slightly so mobile browsers don't block simultaneous downloads
          await new Promise((r) => setTimeout(r, 800));

          // 2. Auto-download vCard (.vcf) smartphone contact
          downloadVCardContact();

          // Log in administrator audit trail
          recordAuditEvent({
            eventType: "CARD_DOWNLOAD",
            title: "Smart Card & Phone vCard Auto-Saved",
            details: "Digital Business Card PNG & vCard contact downloaded on device first visit",
            page: typeof window !== "undefined" ? window.location.pathname : "/",
            device: typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
          });

          setToast({
            show: true,
            status: "completed",
            message:
              "✓ Executive Card (PNG) & Phone Contact (.vcf) saved! Future visits will download on manual click.",
          });

          // Auto dismiss after 6.5s
          setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
          }, 6500);
        } catch (err) {
          console.warn("Auto-download initial visit warning:", err);
          setToast({
            show: true,
            status: "completed",
            message:
              "Executive Card ready! You can manually download anytime with one click.",
          });
          setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
          }, 4500);
        }
      };

      // Auto-trigger on mobile scroll, touch, or timer (whichever comes first)
      const handleMobileScrollOrTouch = () => {
        triggerDownload();
        window.removeEventListener("scroll", handleMobileScrollOrTouch);
        window.removeEventListener("touchmove", handleMobileScrollOrTouch);
      };

      window.addEventListener("scroll", handleMobileScrollOrTouch, { passive: true, once: true });
      window.addEventListener("touchmove", handleMobileScrollOrTouch, { passive: true, once: true });

      // Fallback timer if user doesn't scroll immediately
      const timer = setTimeout(triggerDownload, 1800);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleMobileScrollOrTouch);
        window.removeEventListener("touchmove", handleMobileScrollOrTouch);
      };
    } catch (e) {
      console.warn("LocalStorage check error:", e);
    }
  }, []);

  if (!toast.show) return null;

  return (
    <aside
      aria-label="First-time download notice"
      className="first_visit_auto_toast animate_toast_slide_in"
    >
      <div className="toast_inner_content">
        <div className="toast_icon_badge">
          {toast.status === "downloading" ? (
            <span className="toast_pulse_spinner"></span>
          ) : (
            <span className="toast_check_icon">✓</span>
          )}
        </div>
        <div className="toast_text_block">
          <div className="toast_title_row">
            <strong>Karan Mishra • Executive Smart Card</strong>
            <span className="toast_tag_pill">First Visit Device Auto-Save</span>
          </div>
          <p className="toast_msg_text">{toast.message}</p>
        </div>
        <button
          onClick={() => setToast((prev) => ({ ...prev, show: false }))}
          className="toast_dismiss_btn"
          aria-label="Dismiss notification"
          title="Dismiss notification"
        >
          ✕
        </button>
      </div>

      <style jsx>{`
        .first_visit_auto_toast {
          position: fixed;
          bottom: 24px;
          left: 24px;
          max-width: 480px;
          width: calc(100vw - 48px);
          z-index: 99999;
          background: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 16px;
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.7),
            0 0 30px rgba(2, 132, 199, 0.25);
          color: #f8fafc;
          padding: 14px 18px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .first_visit_auto_toast:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.8),
            0 0 35px rgba(56, 189, 248, 0.35);
          border-color: rgba(56, 189, 248, 0.6);
        }

        .toast_inner_content {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .toast_icon_badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(2, 132, 199, 0.5);
        }

        .toast_pulse_spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .toast_check_icon {
          font-weight: 800;
          font-size: 1.1rem;
          color: #ffffff;
        }

        .toast_text_block {
          flex: 1;
          min-width: 0;
        }

        .toast_title_row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 0.86rem;
          margin-bottom: 3px;
        }

        .toast_title_row strong {
          color: #ffffff;
        }

        .toast_tag_pill {
          background: rgba(56, 189, 248, 0.18);
          color: #38bdf8;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .toast_msg_text {
          font-size: 0.82rem;
          color: #cbd5e1;
          margin: 0;
          line-height: 1.4;
        }

        .toast_dismiss_btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #94a3b8;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .toast_dismiss_btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ffffff;
          transform: scale(1.1);
        }

        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate_toast_slide_in {
          animation: toastSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 640px) {
          .first_visit_auto_toast {
            bottom: 80px; /* Above bottom navigation if any */
            left: 12px;
            width: calc(100vw - 24px);
            padding: 12px 14px;
          }
        }
      `}</style>
    </aside>
  );
}
