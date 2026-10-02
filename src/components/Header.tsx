"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Scroll listener for sticky backdrop and neon glow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close on route change
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [navOpen]);

  // Streamlined, focused navigation links (No overloaded clutter)
  const navLinks = [
    { href: "/", label: "Home", sectionId: "home" },
    { href: "/#about-section", label: "About & Vision", sectionId: "about-section" },
    { href: "/#timeline-section", label: "Career Road", sectionId: "timeline-section" },
    { href: "/#portfolio", label: "Innovations", sectionId: "portfolio" },
    { href: "/#feedback-section", label: "Endorsements", sectionId: "feedback-section" },
    { href: "/#direct-contact-section", label: "Collaborate", sectionId: "direct-contact-section" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { href: string; label: string; sectionId: string }
  ) => {
    setNavOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(item.sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${item.sectionId}`);
      }
    }
  };

  return (
    <>
      <header className={`modern_floating_header ${scrolled ? "header_scrolled" : ""}`}>
        <div className="container header_nav_container">
          <nav className="header_nav_dock">
            {/* Dual Brand Identity: Aurxon & SUAS Indore */}
            <Link
              className="dock_brand_link"
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <div className="brand_dual_capsule">
                {/* Aurxon Official Logo */}
                <div className="brand_logo_avatar" title="Aurxon - Next Gen AI Solutions">
                  <img
                    src="/img/png/logo-color.png"
                    alt="Aurxon Logo"
                    className="brand_logo_img"
                  />
                </div>

                {/* Founder Identity */}
                <div className="brand_name_stack">
                  <div className="brand_title_row">
                    <span className="founder_name">Karan Mishra</span>
                    <span className="founder_badge">FOUNDER</span>
                  </div>
                  <span className="brand_tagline">
                    <span className="live_neon_pulse"></span>
                    Aurxon &bull; Next Gen AI Solutions
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links with Neon Pastel Petal Hover Effects */}
            <ul className="desktop_nav_links d-none d-lg-flex">
              {navLinks.map((item) => (
                <li key={item.label} className="nav_pill_item">
                  <Link
                    href={item.href}
                    className={`nav_pill_link ${
                      pathname === "/" && item.sectionId === "home" ? "is_active" : ""
                    }`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    <span>{item.label}</span>
                    <span className="neon_petal_glow"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Action Controls: Smart Card, Theme Switcher, Mobile Toggler */}
            <div className="header_dock_actions">
              {/* Digital Smart Card Button */}
              <Link
                href="/card"
                className="smart_card_dock_btn"
                title="Open Crystal HD Smart Business Card"
              >
                <span className="card_icon_spark">🪪</span>
                <span className="d-none d-sm-inline">Smart Card</span>
                <span className="dock_btn_neon_edge"></span>
              </Link>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="theme_toggle_dock_btn"
                aria-label="Toggle Dark/Light Mode"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Neon Dark Mode"}
              >
                <i className={`fa ${theme === "dark" ? "fa-sun-o" : "fa-moon-o"}`}></i>
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                className={`mobile_hamburger_btn d-lg-none ${navOpen ? "is_active" : ""}`}
                type="button"
                onClick={() => setNavOpen(!navOpen)}
                aria-label="Toggle navigation menu"
              >
                <span className="bar bar_top"></span>
                <span className="bar bar_mid"></span>
                <span className="bar bar_bot"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile_drawer_backdrop ${navOpen ? "is_open" : ""}`}
        onClick={() => setNavOpen(false)}
      />

      {/* Mobile Slide-down Glass Drawer */}
      <div className={`mobile_glass_drawer ${navOpen ? "is_open" : ""}`}>
        <div className="mobile_drawer_top">
          <div className="d-flex align-items-center gap-2">
            <img
              src="/img/png/logo-color.png"
              alt="Aurxon Logo"
              style={{ width: "36px", height: "36px", borderRadius: "10px", objectFit: "contain" }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-main)" }}>Karan Mishra</div>
              <div style={{ fontSize: "0.74rem", color: "var(--primary-accent)", fontWeight: 700 }}>
                Founder &bull; Aurxon
              </div>
            </div>
          </div>
          <button
            className="mobile_drawer_close_btn"
            onClick={() => setNavOpen(false)}
            aria-label="Close Navigation"
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        {/* Aurxon Venture Pill in Mobile Drawer */}
        <div className="mobile_affiliations_strip">
          <div className="mobile_org_chip">
            <span className="chip_dot"></span>
            <strong>AURXON</strong> &bull; Next Gen AI Solutions
          </div>
        </div>

        <ul className="mobile_links_list">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="mobile_nav_item_link"
                onClick={(e) => handleNavClick(e, item)}
              >
                <span>{item.label}</span>
                <i className="fa fa-arrow-right"></i>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/card"
              className="mobile_nav_item_link highlight_link"
              onClick={() => setNavOpen(false)}
            >
              <span>🪪 Digital Smart Card (Download)</span>
              <i className="fa fa-arrow-right"></i>
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="mobile_nav_item_link"
              onClick={() => setNavOpen(false)}
            >
              <span>Articles &amp; Tech Insights</span>
              <i className="fa fa-arrow-right"></i>
            </Link>
          </li>
        </ul>

        <div className="mobile_drawer_footer">
          <div className="drawer_address_text">
            📍 ASIA, India, MP, Indore, Killa Maidan VIP Road, 452006
          </div>
          <div className="drawer_social_icons">
            <a href="https://github.com/CodeSage4D" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/itsgkaranmishra4" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="mailto:karannmishra136@gmail.com">
              <i className="fa fa-envelope"></i>
            </a>
            <a href="tel:+917804895074">
              <i className="fa fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Modern Header Dock */}
      <style dangerouslySetInnerHTML={{ __html: `
        .modern_floating_header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1050;
          padding: 16px 0;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modern_floating_header.header_scrolled {
          padding: 8px 0;
        }

        .header_nav_container {
          max-width: 1240px;
        }

        /* Glassmorphism Capsule Dock */
        .header_nav_dock {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px 8px 14px;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 9999px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 0 1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .header_scrolled .header_nav_dock {
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 14px 35px -8px rgba(15, 23, 42, 0.14), 0 0 20px rgba(56, 189, 248, 0.18);
          border-color: rgba(56, 189, 248, 0.3);
        }

        /* Dark Mode Dock */
        .dark .header_nav_dock {
          background: rgba(10, 15, 28, 0.78);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 35px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.12);
        }

        .dark .header_scrolled .header_nav_dock {
          background: rgba(6, 10, 20, 0.92);
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.95), 0 0 30px rgba(56, 189, 248, 0.25);
        }

        /* Dual Brand Capsule */
        .dock_brand_link {
          text-decoration: none;
          color: inherit;
        }

        .brand_dual_capsule {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand_logo_avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #ffffff;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .brand_dual_capsule:hover .brand_logo_avatar {
          transform: rotate(6deg) scale(1.05);
        }

        .brand_logo_img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .suas_collab_badge {
          height: 28px;
          padding: 2px 8px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .dark .suas_collab_badge {
          background: rgba(255, 255, 255, 0.95);
        }

        .suas_badge_img {
          height: 18px;
          width: auto;
          object-fit: contain;
        }

        .brand_name_stack {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .brand_title_row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .founder_name {
          font-weight: 850;
          font-size: 0.98rem;
          color: #0f172a;
          letter-spacing: -0.2px;
        }

        .dark .founder_name {
          color: #ffffff;
        }

        .founder_badge {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(68, 88, 220, 0.15), rgba(133, 79, 238, 0.2));
          color: #4458dc;
          border: 1px solid rgba(68, 88, 220, 0.3);
        }

        .dark .founder_badge {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.4);
        }

        .brand_tagline {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dark .brand_tagline {
          color: #94a3b8;
        }

        .live_neon_pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
          animation: pulseDot 1.8s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        /* Desktop Nav Links & Neon Petal Hover */
        .desktop_nav_links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav_pill_item {
          position: relative;
        }

        .nav_pill_link {
          position: relative;
          padding: 8px 14px;
          font-size: 0.88rem;
          font-weight: 650;
          color: #475569;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .dark .nav_pill_link {
          color: #cbd5e1;
        }

        /* Neon Pastel Petal Glow Effect on Hover */
        .nav_pill_link .neon_petal_glow {
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: radial-gradient(circle at 50% 120%, rgba(56, 189, 248, 0.25) 0%, rgba(192, 132, 252, 0.2) 60%, transparent 100%);
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
          border: 1px solid transparent;
        }

        .nav_pill_link:hover {
          color: #0284c7;
        }

        .dark .nav_pill_link:hover {
          color: #38bdf8;
          text-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
        }

        .nav_pill_link:hover .neon_petal_glow {
          opacity: 1;
          transform: scale(1);
          border-color: rgba(56, 189, 248, 0.35);
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.25), inset 0 0 8px rgba(192, 132, 252, 0.15);
        }

        .nav_pill_link.is_active {
          color: #0284c7;
          font-weight: 750;
        }

        .dark .nav_pill_link.is_active {
          color: #38bdf8;
        }

        /* Right Actions */
        .header_dock_actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .smart_card_dock_btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 50px;
          background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
          color: #ffffff !important;
          font-size: 0.84rem;
          font-weight: 750;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35);
          transition: all 0.25s ease;
          overflow: hidden;
        }

        .smart_card_dock_btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.55), 0 0 15px rgba(56, 189, 248, 0.5);
        }

        .dock_btn_neon_edge {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%);
          transform: rotate(30deg) translateY(-100%);
          transition: transform 0.75s ease;
        }

        .smart_card_dock_btn:hover .dock_btn_neon_edge {
          transform: rotate(30deg) translateY(100%);
        }

        /* Theme Toggle Dock Button */
        .theme_toggle_dock_btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(226, 232, 240, 0.9);
          background: #f8fafc;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dark .theme_toggle_dock_btn {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(255, 255, 255, 0.15);
          color: #f1f5f9;
        }

        .theme_toggle_dock_btn:hover {
          transform: rotate(20deg) scale(1.08);
          border-color: #38bdf8;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
          color: #0284c7;
        }

        .dark .theme_toggle_dock_btn:hover {
          color: #38bdf8;
        }

        /* Mobile Hamburger */
        .mobile_hamburger_btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          padding: 6px;
        }

        .dark .mobile_hamburger_btn {
          border-color: rgba(255, 255, 255, 0.15);
        }

        .mobile_hamburger_btn .bar {
          width: 18px;
          height: 2px;
          background: #0f172a;
          border-radius: 2px;
          transition: all 0.25s ease;
        }

        .dark .mobile_hamburger_btn .bar {
          background: #ffffff;
        }

        .mobile_hamburger_btn.is_active .bar_top {
          transform: translateY(6px) rotate(45deg);
        }

        .mobile_hamburger_btn.is_active .bar_mid {
          opacity: 0;
        }

        .mobile_hamburger_btn.is_active .bar_bot {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile Glass Drawer */
        .mobile_drawer_backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1060;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .mobile_drawer_backdrop.is_open {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile_glass_drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 85%;
          max-width: 360px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-left: 1px solid rgba(226, 232, 240, 0.8);
          z-index: 1070;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -15px 0 35px rgba(0, 0, 0, 0.2);
        }

        .dark .mobile_glass_drawer {
          background: rgba(10, 15, 28, 0.95);
          border-left-color: rgba(255, 255, 255, 0.1);
        }

        .mobile_glass_drawer.is_open {
          transform: translateX(0);
        }

        .mobile_drawer_top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        }

        .dark .mobile_drawer_top {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .mobile_drawer_close_btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(226, 232, 240, 0.5);
          color: #0f172a;
          cursor: pointer;
        }

        .dark .mobile_drawer_close_btn {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .mobile_affiliations_strip {
          display: flex;
          gap: 8px;
          padding: 12px 0;
        }

        .mobile_org_chip {
          padding: 6px 12px;
          border-radius: 50px;
          background: #f1f5f9;
          font-size: 0.78rem;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dark .mobile_org_chip {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .chip_dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0284c7;
        }

        .mobile_links_list {
          list-style: none;
          margin: 16px 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          overflow-y: auto;
        }

        .mobile_nav_item_link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text-body);
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .mobile_nav_item_link:hover {
          background: rgba(56, 189, 248, 0.1);
          color: #0284c7;
        }

        .mobile_nav_item_link.highlight_link {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(56, 189, 248, 0.18));
          color: #0284c7;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .mobile_drawer_footer {
          padding-top: 14px;
          border-top: 1px solid rgba(226, 232, 240, 0.8);
        }

        .dark .mobile_drawer_footer {
          border-top-color: rgba(255, 255, 255, 0.1);
        }

        .drawer_address_text {
          font-size: 0.76rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .dark .drawer_address_text {
          color: #94a3b8;
        }

        .drawer_social_icons {
          display: flex;
          gap: 12px;
        }

        .drawer_social_icons a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .dark .drawer_social_icons a {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
      `}} />
    </>
  );
};
