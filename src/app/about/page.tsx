import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Banner Area */}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-center">
              <h2>About Karan Mishra</h2>
              <div className="page_link">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start About Us Area */}
      <section className="about_area section_gap">
        <div className="container">
          <div className="row justify-content-start align-items-center">
            <div className="col-lg-5">
              <div className="about_img">
                <img className="img-fluid" src="/img/about-us.png" alt="Karan Mishra" />
              </div>
            </div>

            <div className="offset-lg-1 col-lg-6">
              <div className="main_title text-left">
                <h2>About Me</h2>
                <p>
                  Hello! I’m <strong>Karan Mishra</strong>, founder of <strong>Aurxon</strong> and an AI &amp; Machine Learning Engineer based in Smart City Indore, India. With <strong>3+ years of professional engineering experience</strong>, my focus is bridging the gap between theoretical machine learning research and high-scale, production-ready software systems.
                </p>
                <p>
                  As the founder of <strong>Aurxon</strong> (previously established as i AIM LABS), I spearhead the creation of transformative enterprise products—ranging from lightweight school &amp; institute ERP platforms (<strong>Aurxon ERP Lite</strong>) to AI-powered semantic career intelligence systems (<strong>Cognivex</strong>) and healthcare intelligence solutions (<strong>HemoAI</strong>).
                </p>
                <p>
                  My foundation in Computer Science from Sri Aurobindo Institute of Technology, coupled with deep hands-on expertise in Python, PyTorch/TensorFlow, Next.js, and cloud architectures, enables me to build resilient, human-centered intelligent tools.
                </p>
                <p>
                  Outside of coding algorithms, you’ll find me exploring new technologies, contributing to over 47+ open-source repositories on GitHub, and traveling.
                </p>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <a className="primary_btn mr-3 mb-2" href="/pdf/Karan_Mishra_ResumeDetailed.pdf" download="Karan_Mishra_CV.pdf">
                    <span>Download CV</span>
                  </a>
                  <Link className="primary_btn tr-bg mb-2" href="/contact">
                    <span>Direct Contact</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aurxon Company Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="main_title text-center">
            <h2>Aurxon</h2>
            <p>Our Venture &bull; Engineering Scalable AI &amp; Enterprise Platforms</p>
          </div>
          <div className="logo-container text-center mb-4">
            <img
              src="/img/iaimlabs_logo/logo-no-background.png"
              alt="Aurxon Logo"
              className="logo img-fluid"
              style={{ maxHeight: "70px", objectFit: "contain" }}
            />
          </div>
          <div className="about-content">
            <div className="founder-info text-center mb-4">
              <h3 className="font-weight-bold">Karan Mishra</h3>
              <p className="text-muted">Founder &amp; Chief AI Architect &bull; <strong>Aurxon</strong> (formerly i AIM LABS)</p>
            </div>
            <div className="company-overview bg-white p-4 p-md-5 rounded shadow-sm">
              <h4 className="font-weight-bold text-dark mb-3">Enterprise Mission</h4>
              <p>
                At <strong>Aurxon</strong>, we build high-impact software, scalable AI/ML pipelines, and enterprise automation engines. Recognizing the tremendous growth potential in Tier-II, III, and IV markets, Aurxon democratizes cutting-edge digital infrastructure so educational institutions, healthcare networks, and growing businesses operate with world-class velocity.
              </p>
              <p>
                We believe in research-driven engineering, continuous model benchmarking, and bulletproof user experiences. From automated educational ERPs managing students and fee workflows to real-time predictive blood bank systems, Aurxon turns ambitious ideas into deployed reality.
              </p>

              <h4 className="font-weight-bold text-dark mt-4 mb-3">Key Focus Areas:</h4>
              <ul className="row list-unstyled">
                <li className="col-md-6 mb-2">
                  <i className="fa fa-check-circle text-primary mr-2"></i> Machine Learning &amp; NLP Solutions
                </li>
                <li className="col-md-6 mb-2">
                  <i className="fa fa-check-circle text-primary mr-2"></i> Enterprise ERP &amp; SaaS Platforms (Aurxon ERP)
                </li>
                <li className="col-md-6 mb-2">
                  <i className="fa fa-check-circle text-primary mr-2"></i> Healthcare &amp; Blood Bank AI (HemoAI)
                </li>
                <li className="col-md-6 mb-2">
                  <i className="fa fa-check-circle text-primary mr-2"></i> Career &amp; Resume Intelligence (Cognivex)
                </li>
                <li className="col-md-6 mb-2">
                  <i className="fa fa-check-circle text-primary mr-2"></i> Real-time Analytics &amp; Anomaly Detection
                </li>
                <li className="col-md-6 mb-2">
                  <i className="fa fa-check-circle text-primary mr-2"></i> Full-Stack Next.js &amp; Python Backend Architectures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Area */}
      <section className="experience_area section_gap">
        <div className="container">
          <div className="main_title text-center">
            <h2>3+ Years of Professional Journey</h2>
            <p>Milestones, Leadership &amp; Engineering Roles</p>
          </div>
          <div className="row">
            {/* Experience 1 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="experience_item h-100 p-4 bg-white rounded shadow-sm border">
                <div className="icon mb-3">
                  <i className="fa fa-rocket" style={{ fontSize: "2.5rem", color: "#4458dc" }}></i>
                </div>
                <div className="content">
                  <h4 className="font-weight-bold">Aurxon &bull; Founder &amp; AI Architect</h4>
                  <span className="badge badge-light text-primary font-weight-bold mb-2">2024 - Present</span>
                  <p className="text-muted small">
                    Leading product vision, technical architecture, and development of enterprise SaaS platforms and AI engines including Aurxon ERP Lite and Cognivex.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="experience_item h-100 p-4 bg-white rounded shadow-sm border">
                <div className="icon mb-3">
                  <i className="fa fa-cogs" style={{ fontSize: "2.5rem", color: "#854fee" }}></i>
                </div>
                <div className="content">
                  <h4 className="font-weight-bold">Geek Theory &bull; R&amp;D Intern</h4>
                  <span className="badge badge-light text-secondary font-weight-bold mb-2">2024</span>
                  <p className="text-muted small">
                    Spearheaded Cordova mobile plugins development, machine learning pipeline optimizations, and cross-functional team deliveries.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="experience_item h-100 p-4 bg-white rounded shadow-sm border">
                <div className="icon mb-3">
                  <i className="fa fa-code" style={{ fontSize: "2.5rem", color: "#10b981" }}></i>
                </div>
                <div className="content">
                  <h4 className="font-weight-bold">Full-Stack &amp; Python Consultant</h4>
                  <span className="badge badge-light text-success font-weight-bold mb-2">2022 - 2024</span>
                  <p className="text-muted small">
                    Engineered custom web applications, Python automation workflows, REST APIs, and sentiment analysis tools for multiple clients and projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .about {
          background-color: #f8fafc;
          padding: 60px 0;
        }
      `}} />
    </>
  );
}
