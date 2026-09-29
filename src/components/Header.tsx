"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setNavOpen(false);
    setPagesOpen(false);
    setBlogOpen(false);
  }, [pathname]);

  return (
    <header className="header_area">
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            {/* Brand and toggle get grouped for better mobile display */}
            <Link className="navbar-brand logo_h" href="/">
              <img
                src="/img/png/logo-no-background.png"
                alt="Logo"
                style={{ width: "auto", height: "50px", objectFit: "contain" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              aria-controls="navbarSupportedContent"
              aria-expanded={navOpen}
              aria-label="Toggle navigation"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {/* Collect the nav links, forms, and other content for toggling */}
            <div
              className={`collapse navbar-collapse offset ${navOpen ? "show" : ""}`}
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav justify-content-end">
                <li className={`nav-item ${pathname === "/" ? "active" : ""}`}>
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>
                <li className={`nav-item ${pathname === "/about" ? "active" : ""}`}>
                  <Link className="nav-link" href="/about">
                    About
                  </Link>
                </li>
                <li className={`nav-item ${pathname === "/services" ? "active" : ""}`}>
                  <Link className="nav-link" href="/services">
                    Services
                  </Link>
                </li>
                <li className={`nav-item ${pathname === "/portfolio" ? "active" : ""}`}>
                  <Link className="nav-link" href="/portfolio">
                    Portfolio
                  </Link>
                </li>
                <li
                  className={`nav-item submenu dropdown ${
                    pagesOpen ? "show" : ""
                  }`}
                  onMouseEnter={() => setPagesOpen(true)}
                  onMouseLeave={() => setPagesOpen(false)}
                >
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setPagesOpen(!pagesOpen);
                    }}
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={pagesOpen}
                  >
                    Pages
                  </a>
                  <ul className={`dropdown-menu ${pagesOpen ? "show" : ""}`}>
                    <li className="nav-item">
                      <Link className="nav-link" href="/elements">
                        Elements
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/portfolio-details">
                        Portfolio Details
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`nav-item submenu dropdown ${
                    blogOpen ? "show" : ""
                  }`}
                  onMouseEnter={() => setBlogOpen(true)}
                  onMouseLeave={() => setBlogOpen(false)}
                >
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setBlogOpen(!blogOpen);
                    }}
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={blogOpen}
                  >
                    Blog
                  </a>
                  <ul className={`dropdown-menu ${blogOpen ? "show" : ""}`}>
                    <li className="nav-item">
                      <Link className="nav-link" href="/blog">
                        Blog
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/single-blog">
                        Blog Details
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`nav-item ${pathname === "/contact" ? "active" : ""}`}>
                  <Link className="nav-link" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
