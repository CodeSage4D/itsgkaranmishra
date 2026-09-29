import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="footer_top flex-column">
                <div className="footer_logo">
                  <Link className="navbar-brand logo_h" href="/">
                    <img
                      src="/img/png/logo-no-background.png"
                      alt="Logo"
                      style={{ width: "auto", height: "50px", objectFit: "contain" }}
                    />
                  </Link>
                  <h4 style={{ marginTop: "20px", fontSize: "24px" }}>Follow Me</h4>
                </div>
                <div className="footer_social" style={{ marginTop: "20px" }}>
                  <a
                    href="https://github.com/CodeSage4D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "24px", color: "#333", margin: "0 10px" }}
                  >
                    <i className="fa fa-github" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "24px", color: "#1769ff", margin: "0 10px" }}
                  >
                    <i className="fa fa-behance" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "24px", color: "#3b5998", margin: "0 10px" }}
                  >
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/itsgkaranmishra4"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "24px", color: "#0077b5", margin: "0 10px" }}
                  >
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/itsgkaranmishra"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "24px", color: "#e4405f", margin: "0 10px" }}
                  >
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer_widget">
              <h4 className="footer_title">Quick Links</h4>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row footer_bottom justify-content-center" style={{ marginTop: "30px" }}>
            <p className="col-lg-8 col-sm-12 footer-text" style={{ textAlign: "center", fontSize: "14px" }}>
              Copyright &copy; {new Date().getFullYear()} All rights reserved | Designed with{" "}
              <i className="fa fa-heart" style={{ color: "red" }}></i> by{" "}
              <a href="#" style={{ color: "#3498db" }}>
                Karan Mishra / I Aim Labs
              </a>
            </p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer_area {
          background-color: #222;
          color: #fff;
          padding: 40px 0;
        }

        .footer_logo img {
          max-width: 150px;
        }

        .footer_logo h4 {
          margin-top: 20px;
          font-size: 24px;
        }

        .footer_social a {
          font-size: 24px;
          margin: 0 10px;
          transition: color 0.3s;
        }

        .footer_social a:hover {
          color: #f39c12;
        }

        .footer-text {
          text-align: center;
          font-size: 14px;
          margin-top: 30px;
        }

        .footer-text a {
          color: #3498db;
          text-decoration: none;
        }

        .footer-text a:hover {
          text-decoration: underline;
        }
      `}} />
    </>
  );
};
