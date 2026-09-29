"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll listener for sticky backdrop animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close on page change
  useEffect(() => {
    setNavOpen(false);
    setPagesOpen(false);
    setBlogOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [navOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  return (
    <>
      <header
        className={`header_area modern_header ${
          scrolled ? "header_scrolled navbar_fixed" : ""
        }`}
      >
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg">
            <div className="container header_container">
              {/* Brand: Logo + Highly Readable Name & Venture */}
              <Link className="navbar-brand header_brand" href="/">
                <div className="brand_wrapper">
                  <div className="brand_logo_circle">
                    <img
                      src="/img/png/logo-no-background.png"
                      alt="Karan Mishra Logo"
                      className="brand_logo_img"
                    />
                  </div>
                  <div className="brand_text_col">
                    <span className="brand_main_name">
                      Karan <span className="brand_surname">Mishra</span>
                    </span>
                    <span className="brand_sub_tag">
                      <span className="brand_pulse_dot"></span>
                      Aurxon &bull; ML & AI Specialist
                    </span>
                  </div>
                </div>
              </Link>

              {/* Mobile Animated Hamburger Button */}
              <button
                className={`navbar-toggler modern_toggler ${navOpen ? "is_active" : ""}`}
                type="button"
                onClick={() => setNavOpen(!navOpen)}
                aria-controls="navbarSupportedContent"
                aria-expanded={navOpen}
                aria-label="Toggle navigation"
              >
                <span className="hamburger_line line_top"></span>
                <span className="hamburger_line line_mid"></span>
                <span className="hamburger_line line_bot"></span>
              </button>

              {/* Desktop Navigation Links */}
              <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end align-items-center">
                <ul className="nav navbar-nav menu_nav align-items-center">
                  {navLinks.map((item) => (
                    <li
                      key={item.href}
                      className={`nav-item ${pathname === item.href ? "active" : ""}`}
                    >
                      <Link className="nav-link nav_link_animated" href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}

                  {/* Pages Dropdown */}
                  <li
                    className={`nav-item submenu dropdown ${pagesOpen ? "show" : ""}`}
                    onMouseEnter={() => setPagesOpen(true)}
                    onMouseLeave={() => setPagesOpen(false)}
                  >
                    <a
                      href="#"
                      className="nav-link dropdown-toggle nav_link_animated"
                      onClick={(e) => {
                        e.preventDefault();
                        setPagesOpen(!pagesOpen);
                      }}
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={pagesOpen}
                    >
                      Pages <i className="fa fa-angle-down ml-1"></i>
                    </a>
                    <ul className={`dropdown-menu modern_dropdown ${pagesOpen ? "show" : ""}`}>
                      <li className="nav-item">
                        <Link className="dropdown-item" href="/elements">
                          UI Elements
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="dropdown-item" href="/portfolio-details">
                          Project Case Studies
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Blog Dropdown */}
                  <li
                    className={`nav-item submenu dropdown ${blogOpen ? "show" : ""}`}
                    onMouseEnter={() => setBlogOpen(true)}
                    onMouseLeave={() => setBlogOpen(false)}
                  >
                    <a
                      href="#"
                      className="nav-link dropdown-toggle nav_link_animated"
                      onClick={(e) => {
                        e.preventDefault();
                        setBlogOpen(!blogOpen);
                      }}
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={blogOpen}
                    >
                      Blog <i className="fa fa-angle-down ml-1"></i>
                    </a>
                    <ul className={`dropdown-menu modern_dropdown ${blogOpen ? "show" : ""}`}>
                      <li className="nav-item">
                        <Link className="dropdown-item" href="/blog">
                          Articles & Insights
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="dropdown-item" href="/single-blog">
                          Featured Article
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Contact Nav Link */}
                  <li className={`nav-item ${pathname === "/contact" ? "active" : ""}`}>
                    <Link className="nav-link nav_link_animated" href="/contact">
                      Contact
                    </Link>
                  </li>

                  {/* Direct Contact Button CTA */}
                  <li className="nav-item ml-lg-3">
                    <Link
                      href="/contact"
                      className="header_cta_btn"
                    >
                      <span>Let&apos;s Connect</span>
                      <i className="fa fa-arrow-right ml-2"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Fullscreen Drawer & Backdrop */}
        <div
          className={`mobile_nav_backdrop ${navOpen ? "is_open" : ""}`}
          onClick={() => setNavOpen(false)}
        />
        <div className={`mobile_nav_drawer ${navOpen ? "is_open" : ""}`}>
          <div className="mobile_drawer_header">
            <div className="brand_wrapper">
              <div className="brand_logo_circle">
                <img
                  src="/img/png/logo-no-background.png"
                  alt="Karan Mishra Logo"
                  className="brand_logo_img"
                />
              </div>
              <div className="brand_text_col">
                <span className="brand_main_name">
                  Karan <span className="brand_surname">Mishra</span>
                </span>
                <span className="brand_sub_tag">Aurxon &bull; ML Engineer</span>
              </div>
            </div>
            <button
              className="drawer_close_btn"
              onClick={() => setNavOpen(false)}
              aria-label="Close Navigation"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>

          <div className="mobile_drawer_body">
            <ul className="mobile_menu_list">
              {navLinks.map((item) => (
                <li key={item.href} className="mobile_menu_item">
                  <Link
                    href={item.href}
                    className={`mobile_nav_link ${pathname === item.href ? "active" : ""}`}
                    onClick={() => setNavOpen(false)}
                  >
                    <span>{item.label}</span>
                    <i className="fa fa-chevron-right mobile_link_arrow"></i>
                  </Link>
                </li>
              ))}

              {/* Mobile Pages Submenu Accordion */}
              <li className="mobile_menu_item">
                <button
                  type="button"
                  className="mobile_nav_link mobile_accordion_toggle"
                  onClick={() => setPagesOpen(!pagesOpen)}
                >
                  <span>Pages</span>
                  <i
                    className={`fa ${
                      pagesOpen ? "fa-chevron-up" : "fa-chevron-down"
                    } mobile_link_arrow`}
                  ></i>
                </button>
                {pagesOpen && (
                  <ul className="mobile_submenu_list">
                    <li>
                      <Link
                        href="/elements"
                        className="mobile_sub_link"
                        onClick={() => setNavOpen(false)}
                      >
                        UI Elements
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio-details"
                        className="mobile_sub_link"
                        onClick={() => setNavOpen(false)}
                      >
                        Portfolio Details
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Mobile Blog Submenu Accordion */}
              <li className="mobile_menu_item">
                <button
                  type="button"
                  className="mobile_nav_link mobile_accordion_toggle"
                  onClick={() => setBlogOpen(!blogOpen)}
                >
                  <span>Blog</span>
                  <i
                    className={`fa ${
                      blogOpen ? "fa-chevron-up" : "fa-chevron-down"
                    } mobile_link_arrow`}
                  ></i>
                </button>
                {blogOpen && (
                  <ul className="mobile_submenu_list">
                    <li>
                      <Link
                        href="/blog"
                        className="mobile_sub_link"
                        onClick={() => setNavOpen(false)}
                      >
                        Blog Feed
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/single-blog"
                        className="mobile_sub_link"
                        onClick={() => setNavOpen(false)}
                      >
                        Single Article
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="mobile_menu_item">
                <Link
                  href="/contact"
                  className={`mobile_nav_link ${pathname === "/contact" ? "active" : ""}`}
                  onClick={() => setNavOpen(false)}
                >
                  <span>Contact</span>
                  <i className="fa fa-chevron-right mobile_link_arrow"></i>
                </Link>
              </li>
            </ul>

            {/* Mobile Contact Quick Card */}
            <div className="mobile_contact_card">
              <div className="mobile_contact_title">Direct Contact</div>
              <a
                href="mailto:karannmishra136@gmail.com"
                className="mobile_contact_row"
              >
                <i className="fa fa-envelope"></i>
                <span>karannmishra136@gmail.com</span>
              </a>
              <a href="tel:+917804895074" className="mobile_contact_row">
                <i className="fa fa-phone"></i>
                <span>+91 7804895074</span>
              </a>
              <div className="mobile_social_row">
                <a
                  href="https://github.com/CodeSage4D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile_social_icon"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/itsgkaranmishra4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile_social_icon"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
                <a
                  href="https://www.instagram.com/itsgkaranmishra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile_social_icon"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Embedded High-Specificity Header Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Modern Header System */
        .modern_header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1050;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.7);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modern_header.header_scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(203, 213, 225, 0.9);
        }

        .header_container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        /* Brand Styling & High Readability */
        .header_brand {
          text-decoration: none !important;
          padding: 0;
          margin: 0;
          display: inline-flex;
          align-items: center;
        }

        .brand_wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand_logo_circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border: 1px solid rgba(99, 102, 241, 0.2);
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.1);
          transition: transform 0.3s ease;
        }

        .brand_wrapper:hover .brand_logo_circle {
          transform: scale(1.06) rotate(3deg);
        }

        .brand_logo_img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .brand_text_col {
          display: flex;
          flex-direction: column;
        }

        .brand_main_name {
          font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 1.28rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0f172a;
          line-height: 1.2;
          display: inline-block;
        }

        .brand_surname {
          background: linear-gradient(135deg, #4458dc 0%, #854fee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand_sub_tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        .brand_pulse_dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: brandPulse 2s infinite;
        }

        @keyframes brandPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        /* Nav Links */
        .modern_header .nav .nav-item {
          margin-right: 28px;
        }

        .modern_header .nav .nav-item .nav-link {
          font-family: 'Rubik', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          color: #334155 !important;
          line-height: 52px;
          padding: 0 6px;
          position: relative;
          text-transform: capitalize;
          letter-spacing: 0.01em;
          transition: color 0.25s ease;
        }

        .modern_header .nav .nav-item:hover .nav-link,
        .modern_header .nav .nav-item.active .nav-link {
          color: #4458dc !important;
        }

        .nav_link_animated::after {
          content: '';
          position: absolute;
          bottom: 12px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #4458dc, #854fee);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modern_header .nav .nav-item:hover .nav_link_animated::after,
        .modern_header .nav .nav-item.active .nav_link_animated::after {
          width: 100%;
        }

        /* Dropdowns */
        .modern_dropdown {
          background: #ffffff !important;
          border-radius: 12px !important;
          border: 1px solid rgba(226, 232, 240, 0.9) !important;
          box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.15) !important;
          padding: 8px !important;
          min-width: 210px !important;
          margin-top: 6px !important;
          animation: dropdownFade 0.25s ease-out;
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modern_dropdown .dropdown-item {
          font-size: 0.88rem;
          font-weight: 500;
          color: #334155;
          padding: 8px 14px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .modern_dropdown .dropdown-item:hover {
          background: #f1f5f9;
          color: #4458dc;
          transform: translateX(4px);
        }

        /* Header CTA Button */
        .header_cta_btn {
          display: inline-flex;
          align-items: center;
          padding: 9px 20px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #ffffff !important;
          background: linear-gradient(135deg, #4458dc 0%, #854fee 100%);
          border-radius: 50px;
          text-decoration: none !important;
          box-shadow: 0 4px 14px rgba(68, 88, 220, 0.35);
          transition: all 0.3s ease;
        }

        .header_cta_btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(68, 88, 220, 0.45);
          color: #ffffff !important;
        }

        /* Mobile Hamburger Icon */
        .modern_toggler {
          display: none;
          background: transparent;
          border: none;
          outline: none !important;
          box-shadow: none !important;
          padding: 8px;
          cursor: pointer;
          width: 44px;
          height: 44px;
          position: relative;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
        }

        @media (max-width: 991px) {
          .modern_toggler {
            display: flex;
          }
          .modern_header {
            background: rgba(255, 255, 255, 0.98) !important;
          }
        }

        .hamburger_line {
          width: 24px;
          height: 2.5px;
          background-color: #0f172a;
          border-radius: 3px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modern_toggler.is_active .line_top {
          transform: translateY(7.5px) rotate(45deg);
        }

        .modern_toggler.is_active .line_mid {
          opacity: 0;
          transform: scale(0.2);
        }

        .modern_toggler.is_active .line_bot {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .mobile_nav_backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1090;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile_nav_backdrop.is_open {
          opacity: 1;
          visibility: visible;
        }

        .mobile_nav_drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 82%;
          max-width: 360px;
          height: 100vh;
          background: #ffffff;
          z-index: 1100;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }

        .mobile_nav_drawer.is_open {
          transform: translateX(0);
        }

        .mobile_drawer_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .drawer_close_btn {
          background: #f1f5f9;
          border: none;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .drawer_close_btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .mobile_drawer_body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mobile_menu_list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile_nav_link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          text-decoration: none !important;
          border-radius: 10px;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
        }

        .mobile_nav_link:hover,
        .mobile_nav_link.active {
          background: #f1f5f9;
          color: #4458dc;
        }

        .mobile_link_arrow {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .mobile_submenu_list {
          list-style: none;
          padding: 4px 0 8px 18px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile_sub_link {
          display: block;
          padding: 8px 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #475569;
          text-decoration: none !important;
          border-radius: 8px;
        }

        .mobile_sub_link:hover {
          color: #4458dc;
          background: #f8fafc;
        }

        .mobile_contact_card {
          margin-top: auto;
          padding: 18px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 14px;
          border: 1px solid #e2e8f0;
        }

        .mobile_contact_title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
          margin-bottom: 12px;
        }

        .mobile_contact_row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.86rem;
          color: #334155;
          text-decoration: none !important;
          margin-bottom: 8px;
          word-break: break-all;
        }

        .mobile_contact_row i {
          color: #4458dc;
          font-size: 0.95rem;
          width: 16px;
        }

        .mobile_social_row {
          display: flex;
          gap: 12px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        }

        .mobile_social_icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          font-size: 1rem;
          text-decoration: none !important;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .mobile_social_icon:hover {
          background: #4458dc;
          color: #ffffff;
          transform: translateY(-2px);
        }
      `}} />
    </>
  );
};
