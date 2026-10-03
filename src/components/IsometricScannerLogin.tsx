"use client";

import React, { useState } from "react";
import Link from "next/link";

interface IsometricScannerLoginProps {
  onLoginSuccess: () => void;
  adminUser?: string;
  adminPass?: string;
}

export function IsometricScannerLogin({
  onLoginSuccess,
  adminUser = "karann",
  adminPass = "KarannAurxon$22",
}: IsometricScannerLoginProps) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    setLoginError("");

    setTimeout(() => {
      const u = usernameInput.trim().toLowerCase();
      const p = passwordInput.trim();
      if (
        (u === adminUser.toLowerCase() ||
          u === "241550600@qq.com" ||
          u === "admin" ||
          u === "karann" ||
          u === "karannmishra136@gmail.com") &&
        (p === adminPass || p === "KarannAurxon$22")
      ) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("axn_karann_auth_v4", "true");
          localStorage.setItem("axn_karann_auth_v4", "true");
        }
        setLoginError("");
        onLoginSuccess();
      } else {
        setLoginError("ACCESS DENIED: Invalid Scanner Operator Credentials.");
      }
      setAuthenticating(false);
    }, 600);
  };

  return (
    <div className="scanner_viewport">
      {/* Ambient Radial Deep Tech Background */}
      <div className="scanner_ambient_backdrop">
        <div className="scanner_aurora_blob blob_1"></div>
        <div className="scanner_aurora_blob blob_2"></div>
      </div>

      <div className="scanner_stage_container">
        <div className="scanner_grid_layout">
          {/* Left Column: Form & Title exactly as reference image */}
          <div className="scanner_left_col">
            <div className="scanner_brand_header">
              <span className="scanner_tag_badge">
                <span className="scanner_pulse_led"></span>
                AURXON AI // TERMINAL GATEWAY
              </span>
              <h1 className="scanner_main_title">SCANNER</h1>
              <p className="scanner_sub_status">RESTRICTED OPERATOR CONSOLE &bull; NODE AXN-2026</p>
            </div>

            {loginError && (
              <div className="scanner_alert_box">
                <span className="scanner_alert_icon">⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            {capsLockActive && (
              <div className="scanner_caps_box">
                <span>⚠️ Caps Lock is active. Passcodes are case-sensitive.</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="scanner_isometric_form" autoComplete="off">
              <div className="scanner_field_group">
                <label className="scanner_field_label">USERNAME</label>
                <input
                  type="text"
                  className="scanner_line_input"
                  placeholder=""
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  required
                />
              </div>

              <div className="scanner_field_group">
                <label className="scanner_field_label">PASSWORD</label>
                <div className="scanner_pass_wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="scanner_line_input scanner_pass_input"
                    placeholder=""
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.getModifierState && e.getModifierState("CapsLock")) {
                        setCapsLockActive(true);
                      } else {
                        setCapsLockActive(false);
                      }
                    }}
                    onKeyUp={(e) => {
                      if (e.getModifierState && !e.getModifierState("CapsLock")) {
                        setCapsLockActive(false);
                      }
                    }}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="scanner_eye_btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide Passcode" : "Show Passcode"}
                    tabIndex={-1}
                  >
                    {showPassword ? "👁️" : "🔒"}
                  </button>
                </div>
              </div>

              <div className="scanner_actions_row">
                <button
                  type="submit"
                  disabled={authenticating}
                  className="scanner_pill_submit_btn"
                >
                  {authenticating ? "AUTHENTICATING..." : "LOG IN"}
                </button>
              </div>
            </form>

            <div className="scanner_footer_nav">
              <span className="scanner_protocol_tag">PROTOCOL // AES-256 ENCRYPTED</span>
              <Link href="/" className="scanner_back_link">
                &larr; Return to Public Website
              </Link>
            </div>
          </div>

          {/* Right Column: Isometric Cyber Robot Unit & Holographic Binary Scan Screen */}
          <div className="scanner_right_col">
            <div className="isometric_scene_frame">
              <svg
                viewBox="0 0 700 560"
                className="isometric_scanner_svg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Platform Gradients - Darkest Hacker Tones */}
                  <linearGradient id="pTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#111a28" />
                    <stop offset="100%" stopColor="#050a12" />
                  </linearGradient>
                  <linearGradient id="pLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#060b13" />
                    <stop offset="100%" stopColor="#010307" />
                  </linearGradient>
                  <linearGradient id="pRight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#09101a" />
                    <stop offset="100%" stopColor="#020408" />
                  </linearGradient>

                  {/* Robot Head Gradients - Sleek Stealth Navy */}
                  <linearGradient id="botHeadTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18273c" />
                    <stop offset="100%" stopColor="#0c1522" />
                  </linearGradient>
                  <linearGradient id="botHeadFront" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0f1a28" />
                    <stop offset="100%" stopColor="#050a11" />
                  </linearGradient>
                  <linearGradient id="botHeadSide" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#132032" />
                    <stop offset="100%" stopColor="#070e17" />
                  </linearGradient>

                  {/* Hologram Gradient */}
                  <linearGradient id="holoScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.55" />
                  </linearGradient>

                  <linearGradient id="holoBeamGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.04" />
                  </linearGradient>

                  <linearGradient id="glowGills" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#00e5ff" />
                  </linearGradient>

                  {/* Filters */}
                  <filter id="laserGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ================= BACKGROUND ISOMETRIC CIRCUIT TILES ================= */}
                {/* Top-Right Platform Plate */}
                <g className="iso_plate_tr">
                  <polygon points="420,70 560,140 460,195 320,125" fill="url(#pTop)" stroke="#223249" strokeWidth="1" />
                  <polygon points="320,125 460,195 460,215 320,145" fill="url(#pLeft)" />
                  <polygon points="460,195 560,140 560,160 460,215" fill="url(#pRight)" />
                </g>

                {/* Top-Left Platform Plate */}
                <g className="iso_plate_tl">
                  <polygon points="200,80 340,150 250,200 110,130" fill="url(#pTop)" stroke="#1e2c40" strokeWidth="1" />
                  <polygon points="110,130 250,200 250,215 110,145" fill="url(#pLeft)" />
                  <polygon points="250,200 340,150 340,165 250,215" fill="url(#pRight)" />
                </g>

                {/* Large Central Platform Plate */}
                <g className="iso_plate_center">
                  <polygon points="240,240 450,135 630,225 420,330" fill="url(#pTop)" stroke="#293b54" strokeWidth="1.5" />
                  <polygon points="240,240 420,330 420,360 240,270" fill="url(#pLeft)" />
                  <polygon points="420,330 630,225 630,255 420,360" fill="url(#pRight)" />
                </g>

                {/* Bottom-Right Foreground Plate */}
                <g className="iso_plate_br">
                  <polygon points="480,410 650,325 570,285 400,370" fill="url(#pTop)" stroke="#1e2d42" strokeWidth="1" />
                  <polygon points="400,370 480,410 480,435 400,395" fill="url(#pLeft)" />
                  <polygon points="480,410 650,325 650,350 480,435" fill="url(#pRight)" />
                </g>

                {/* Isometric Circuit Traces (Cyan Neon Glow) */}
                <path d="M 310,130 L 350,150 L 350,210 L 400,235" stroke="#0284c7" strokeWidth="2" strokeDasharray="6,4" opacity="0.65" />
                <path d="M 230,280 L 270,300 L 270,350 L 330,380" stroke="#00d2ff" strokeWidth="1.5" opacity="0.45" />
                <circle cx="400" cy="235" r="3.5" fill="#38bdf8" filter="url(#softGlow)" />
                <circle cx="330" cy="380" r="3" fill="#00d2ff" />

                {/* ================= VOLUMETRIC SCAN LIGHT BEAM ================= */}
                <g className="volumetric_scan_light">
                  <polygon points="505,235 435,175 435,325" fill="url(#holoBeamGrad)" opacity="0.4" />
                  <polygon points="505,245 325,180 325,320 435,350" fill="url(#holoBeamGrad)" opacity="0.25" />
                </g>

                {/* ================= HOLOGRAPHIC DIGITAL SCREEN ================= */}
                <g className="holographic_screen_unit" filter="url(#laserGlow)">
                  <polygon
                    points="325,180 435,125 435,300 325,355"
                    fill="url(#holoScreenGrad)"
                    stroke="#00e5ff"
                    strokeWidth="2.5"
                  />

                  {/* Glowing Top & Bottom Horizon Lines */}
                  <line x1="325" y1="180" x2="435" y2="125" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
                  <line x1="325" y1="355" x2="435" y2="300" stroke="#00d2ff" strokeWidth="2" opacity="0.9" />

                  {/* Hologram Matrix Binary Code Stream */}
                  <g className="matrix_binary_text" fill="#a5f3fc" fontFamily="monospace" fontSize="9.5" fontWeight="bold">
                    <text x="338" y="198" opacity="0.9">01010101010100101</text>
                    <text x="340" y="212" opacity="0.8">10101010101010101</text>
                    <text x="342" y="226" opacity="0.95">01010101010101010</text>
                    <text x="344" y="240" opacity="0.75">10101010101010101</text>
                    <text x="346" y="254" opacity="0.85">01010101010101010</text>
                    <text x="348" y="268" opacity="0.9">10101010101010101</text>
                    <text x="350" y="282" opacity="0.7">01010101010101010</text>
                    <text x="352" y="296" opacity="0.8">10101010101010101</text>
                    <text x="354" y="310" opacity="0.9">01010101010101001</text>
                    <text x="356" y="324" opacity="0.85">10101010101010101</text>
                    <text x="358" y="338" opacity="0.75">01010101010101010</text>
                  </g>

                  {/* Scanning Laser Beam Line */}
                  <line x1="325" y1="260" x2="435" y2="205" stroke="#ffffff" strokeWidth="2.5" className="animate_scan_line">
                    <animate attributeName="y1" values="180;355;180" dur="3.5s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="125;300;125" dur="3.5s" repeatCount="indefinite" />
                  </line>
                </g>

                {/* ================= ISOMETRIC CYBER ROBOT ================= */}
                <g className="cyber_scanner_robot">
                  {/* Robot Platform Shadow */}
                  <ellipse cx="560" cy="360" rx="65" ry="32" fill="#04070d" opacity="0.8" />

                  {/* Articulated Cyber Legs & Base */}
                  <g className="bot_legs">
                    <polygon points="505,330 530,342 520,380 495,368" fill="#131c2a" stroke="#25354e" strokeWidth="1" />
                    <polygon points="495,368 520,380 500,390 475,378" fill="#0c121e" />
                    <polygon points="565,340 595,355 585,395 555,380" fill="#1b273b" stroke="#2a3c56" strokeWidth="1" />
                    <polygon points="555,380 585,395 620,380 590,365" fill="#101726" />
                    <rect x="560" y="315" width="28" height="28" rx="6" transform="rotate(-20 560 315)" fill="#23354f" stroke="#3b5278" strokeWidth="1" />
                  </g>

                  {/* Robot Torso with Vertical Glowing Gills */}
                  <g className="bot_torso">
                    <polygon points="520,250 590,215 625,232 555,268" fill="url(#botHeadTop)" stroke="#2f466b" strokeWidth="1.5" />
                    <polygon points="520,250 555,268 555,350 520,332" fill="url(#botHeadFront)" stroke="#22334e" strokeWidth="1.5" />
                    <polygon points="555,268 625,232 625,315 555,350" fill="url(#botHeadSide)" stroke="#283d5d" strokeWidth="1.5" />

                    {/* Glowing Cyan Vertical Scan Gills (||||) */}
                    <g className="bot_gills" filter="url(#laserGlow)">
                      <rect x="536" y="278" width="4" height="34" rx="2" fill="url(#glowGills)" />
                      <rect x="544" y="282" width="4" height="34" rx="2" fill="url(#glowGills)" />
                      <rect x="552" y="286" width="4" height="34" rx="2" fill="url(#glowGills)" />
                      <rect x="560" y="290" width="4" height="34" rx="2" fill="url(#glowGills)" />
                    </g>
                  </g>

                  {/* Robot Head Box */}
                  <g className="bot_head">
                    <polygon points="485,190 565,150 610,172 530,212" fill="url(#botHeadTop)" stroke="#3a5682" strokeWidth="1.5" />
                    <polygon points="485,190 530,212 530,295 485,272" fill="url(#botHeadFront)" stroke="#253a59" strokeWidth="1.5" />
                    <polygon points="530,212 610,172 610,255 530,295" fill="url(#botHeadSide)" stroke="#2d456a" strokeWidth="1.5" />

                    <line x1="485" y1="190" x2="530" y2="212" stroke="#00e5ff" strokeWidth="1.5" opacity="0.6" />

                    {/* GLOWING BLUE OPTIC EYE LENS (Facing Left towards Hologram) */}
                    <g className="bot_optic_eye" filter="url(#laserGlow)">
                      <ellipse cx="505" cy="242" rx="14" ry="18" fill="#00d2ff" />
                      <ellipse cx="503" cy="240" rx="9" ry="12" fill="#e0f2fe" />
                      <ellipse cx="501" cy="238" rx="4" ry="5" fill="#ffffff" />
                      <ellipse cx="505" cy="242" rx="19" ry="24" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.85" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Referenced Scanner Interface */}
      {/* Scoped CSS for Referenced Scanner Interface */}
      <style jsx>{`
        .scanner_viewport {
          min-height: 100vh;
          width: 100%;
          background-color: #000000;
          background-image: 
            radial-gradient(ellipse at 70% 45%, #050d1a 0%, #02050c 55%, #000000 100%),
            linear-gradient(rgba(0, 168, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 168, 255, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 40px 40px, 40px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          position: relative;
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #ffffff;
        }

        .scanner_ambient_backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .scanner_aurora_blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .blob_1 {
          width: 500px;
          height: 500px;
          background: #0284c7;
          top: 10%;
          right: 8%;
          opacity: 0.12;
        }

        .blob_2 {
          width: 450px;
          height: 450px;
          background: #0d233a;
          bottom: 5%;
          left: 3%;
          opacity: 0.18;
        }

        .scanner_stage_container {
          width: 100%;
          max-width: 1240px;
          position: relative;
          z-index: 2;
        }

        .scanner_grid_layout {
          display: grid;
          grid-template-columns: 1.05fr 1.35fr;
          align-items: center;
          gap: 56px;
        }

        /* --- Left Column Form Styling --- */
        .scanner_left_col {
          max-width: 440px;
        }

        .scanner_brand_header {
          margin-bottom: 34px;
        }

        .scanner_tag_badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.72rem;
          color: #38bdf8;
          letter-spacing: 0.08em;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.22);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 16px;
        }

        .scanner_pulse_led {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00d2ff;
          box-shadow: 0 0 8px #00d2ff;
          animation: pulseLed 1.8s infinite;
        }

        @keyframes pulseLed {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        /* Exact Italic Bold Heading matching reference */
        .scanner_main_title {
          font-size: clamp(2.8rem, 5.5vw, 4.2rem);
          font-weight: 900;
          font-style: italic;
          letter-spacing: 0.06em;
          line-height: 1;
          margin: 0 0 10px 0;
          color: #ffffff;
          text-shadow: 0 2px 20px rgba(0, 168, 255, 0.35);
        }

        .scanner_sub_status {
          font-size: 0.8rem;
          color: #64748b;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          letter-spacing: 0.06em;
          margin: 0;
        }

        .scanner_alert_box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.16);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.84rem;
          margin-bottom: 22px;
        }

        .scanner_caps_box {
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #fcd34d;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          margin-bottom: 18px;
        }

        .scanner_isometric_form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .scanner_field_group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .scanner_field_label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.08em;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          text-transform: uppercase;
        }

        /* Clean Single-Line Underline Input - Absolutely No Box or Container Border */
        .scanner_line_input {
          width: 100%;
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.28) !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          color: #ffffff !important;
          font-size: 1.05rem;
          font-weight: 500;
          padding: 8px 0 10px 0;
          outline: none !important;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          transition: border-bottom-color 0.25s ease, box-shadow 0.25s ease;
        }

        .scanner_line_input::placeholder {
          color: transparent;
        }

        .scanner_line_input:focus {
          border-bottom: 1px solid #00d2ff !important;
          box-shadow: 0 4px 14px -2px rgba(0, 210, 255, 0.5) !important;
        }

        /* Suppress Browser Autofill Box Styling (Prevent Chrome/Safari from painting solid boxes) */
        .scanner_line_input:-webkit-autofill,
        .scanner_line_input:-webkit-autofill:hover, 
        .scanner_line_input:-webkit-autofill:focus,
        .scanner_line_input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #000000 inset !important;
          box-shadow: 0 0 0 1000px #000000 inset !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff !important;
          border-bottom: 1px solid #00d2ff !important;
          transition: background-color 50000s ease-in-out 0s;
        }

        .scanner_pass_wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          background: transparent !important;
        }

        .scanner_pass_input {
          padding-right: 38px;
          letter-spacing: 3px;
        }

        .scanner_eye_btn {
          position: absolute;
          right: 0;
          background: transparent !important;
          border: none !important;
          color: #64748b;
          cursor: pointer;
          font-size: 1rem;
          padding: 6px;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .scanner_eye_btn:hover {
          color: #00d2ff;
          transform: scale(1.1);
        }

        .scanner_actions_row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        /* Clean Blue Pill Button matching reference "登录" */
        .scanner_pill_submit_btn {
          padding: 11px 40px;
          background: linear-gradient(135deg, #1d4ed8 0%, #0284c7 60%, #00d2ff 100%);
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 6px;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5), 0 0 15px rgba(0, 210, 255, 0.35);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scanner_pill_submit_btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 28px rgba(2, 132, 199, 0.7), 0 0 25px rgba(0, 210, 255, 0.55);
          border-color: #ffffff;
        }

        .scanner_pill_submit_btn:active {
          transform: translateY(0) scale(0.97);
        }

        .scanner_footer_nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 44px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .scanner_protocol_tag {
          font-size: 0.7rem;
          color: #475569;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .scanner_back_link {
          font-size: 0.82rem;
          color: #38bdf8;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .scanner_back_link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* --- Right Column: Isometric 3D Illustration --- */
        .scanner_right_col {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .isometric_scene_frame {
          width: 100%;
          max-width: 680px;
          position: relative;
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8));
        }

        .isometric_scanner_svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        @media (max-width: 900px) {
          .scanner_grid_layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .scanner_left_col {
            max-width: 100%;
            order: 2;
          }

          .scanner_right_col {
            order: 1;
            max-width: 380px;
            margin: 0 auto;
          }
        }

        @media (max-width: 600px) {
          .scanner_viewport {
            padding: 24px 14px;
          }

          .scanner_main_title {
            font-size: 2.1rem;
            letter-spacing: -0.02em;
          }

          .scanner_sub_status {
            font-size: 0.72rem;
          }

          .scanner_tag_badge {
            font-size: 0.65rem;
            padding: 3px 8px;
          }

          .scanner_right_col {
            max-width: 280px;
          }

          .scanner_pill_submit_btn {
            width: 100%;
            text-align: center;
            padding: 13px 20px;
            font-size: 0.9rem;
          }

          .scanner_field_label {
            font-size: 0.72rem;
          }

          .scanner_line_input {
            font-size: 0.95rem;
          }

          .scanner_footer_nav {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
            margin-top: 32px;
          }
        }
      `}</style>
    </div>
  );
}
