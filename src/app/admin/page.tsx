"use client";

import React from "react";
import Link from "next/link";

export default function AdminDecoyPage() {
  return (
    <div className="decoy_container">
      <div className="decoy_card">
        <div className="decoy_badge">
          <span className="pulse_dot"></span>
          <span>SECURITY DIRECTIVE AXN-403</span>
        </div>

        <h1 className="decoy_code">404</h1>
        <h2 className="decoy_title">Endpoint Decommissioned</h2>
        
        <p className="decoy_desc">
          The requested path <code>/admin</code> is not a valid endpoint. Administrative services and management gateways have been relocated under strict obfuscation protocols.
        </p>

        <div className="decoy_actions">
          <Link href="/" className="decoy_btn">
            &larr; Return to Homepage
          </Link>
        </div>

        <div className="decoy_footer">
          AURXON SECURE SYSTEMS &bull; NODE IDENTITY RESTRICTED
        </div>
      </div>

      <style jsx>{`
        .decoy_container {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          background: #080b14;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #f1f5f9;
        }

        .decoy_card {
          max-width: 520px;
          width: 100%;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 40px 32px;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }

        .decoy_badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .pulse_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444;
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .decoy_code {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          margin: 0 0 12px 0;
          background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .decoy_title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 14px;
        }

        .decoy_desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 28px;
        }

        .decoy_desc code {
          background: rgba(255, 255, 255, 0.08);
          color: #fca5a5;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }

        .decoy_actions {
          margin-bottom: 24px;
        }

        .decoy_btn {
          display: inline-block;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #ffffff;
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
        }

        .decoy_btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(79, 70, 229, 0.5);
          color: #ffffff;
        }

        .decoy_footer {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #475569;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
