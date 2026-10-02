"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RoadTimelineExperience } from "@/components/RoadTimelineExperience";
import { ModernContactSection } from "@/components/ModernContactSection";
import { generateAndDownloadBusinessCard, downloadVCardContact } from "@/lib/card-canvas";

interface ProjectItem {
  id: string;
  title: string;
  category: "popular" | "latest" | "following" | "upcoming";
  categories: string[];
  icon: string;
  iconColor: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string;
}

const portfolioProjects: ProjectItem[] = [
  {
    id: "kmDataScienceDetails",
    title: "KM Data Science Portfolio",
    category: "latest",
    categories: ["all", "latest"],
    icon: "fas fa-database",
    iconColor: "#007FFF",
    shortDesc: "Showcase of data science projects and skills.",
    fullDesc: "Detailed showcase of data science projects including data analysis, model building, and visualization techniques. Demonstrates complex data manipulations, feature engineering, and predictive modeling.",
    techStack: "Python, Pandas, Scikit-Learn, Streamlit, Matplotlib",
  },
  {
    id: "sentiModelDetails",
    title: "SentiModel Analysis",
    category: "popular",
    categories: ["all", "popular"],
    icon: "fas fa-chart-line",
    iconColor: "#FF5733",
    shortDesc: "Sentiment analysis model development and tuning.",
    fullDesc: "Developing and fine-tuning a sentiment analysis model using advanced deep learning and NLP techniques with automated feature extraction and evaluation metrics.",
    techStack: "PyTorch, Transformers, Python, FastAPI",
  },
  {
    id: "ticTacToeDetails",
    title: "Tic Tac Toe Game",
    category: "latest",
    categories: ["all", "latest"],
    icon: "fas fa-gamepad",
    iconColor: "#28A745",
    shortDesc: "A classic game implemented with modern technologies.",
    fullDesc: "A modern implementation of the classic Tic Tac Toe game with responsive UI, real-time game updates, and an intelligent AI opponent built with minimax game theory.",
    techStack: "HTML5, CSS3, JavaScript, Game Theory AI",
  },
  {
    id: "feedbackAnalyzerDetails",
    title: "Feedback Analyzer",
    category: "popular",
    categories: ["all", "popular"],
    icon: "fas fa-comment-dots",
    iconColor: "#FFC107",
    shortDesc: "Analyze and visualize feedback data effectively.",
    fullDesc: "A comprehensive tool for analyzing multi-source feedback data to extract insights and trends. Includes sentiment scoring, keyword extraction, and automated categorizations.",
    techStack: "Python, NLTK, Pandas, Plotly, Streamlit",
  },
  {
    id: "sentiVoiceDetails",
    title: "SentiVoice Access",
    category: "following",
    categories: ["all", "following"],
    icon: "fas fa-microphone",
    iconColor: "#17A2B8",
    shortDesc: "Voice-enabled sentiment analysis application.",
    fullDesc: "Voice-enabled sentiment analysis application with speech-to-text integration, allowing users to analyze vocal emotional nuances and retrieve feedback entries hands-free.",
    techStack: "Python, SpeechRecognition, NLTK, Streamlit",
  },
  {
    id: "sentimentNegationDetails",
    title: "Sentiment Negation Analytics",
    category: "upcoming",
    categories: ["all", "upcoming"],
    icon: "fas fa-exclamation-triangle",
    iconColor: "#DC3545",
    shortDesc: "Analyzing sentiment with focus on negation aspects.",
    fullDesc: "Advanced linguistic analysis engine resolving subtle negation modifiers and contextual contradictions in customer discourse to achieve pinpoint sentiment polarity.",
    techStack: "Python, NLP, Regex, Grammatical Parsing",
  },
  {
    id: "blackCoffeeDetails",
    title: "Black Coffee Data Analytic",
    category: "following",
    categories: ["all", "upcoming", "following"],
    icon: "fas fa-coffee",
    iconColor: "#6F42C1",
    shortDesc: "Advanced analytics for coffee industry data.",
    fullDesc: "Specialized predictive supply chain and market telemetry dashboard tracking consumer demand patterns and inventory flows for beverage enterprises.",
    techStack: "Python, Data Analytics, Tableau, MySQL",
  },
  {
    id: "cordovaBluetoothDetails",
    title: "Cordova Bluetooth Plugin",
    category: "following",
    categories: ["all", "following"],
    icon: "fas fa-bluetooth",
    iconColor: "#007BFF",
    shortDesc: "Plugin for integrating Bluetooth functionality in Cordova apps.",
    fullDesc: "High-performance native hardware bridge plugin for Cordova mobile environments enabling low-latency communication with custom edge sensors and microcontrollers.",
    techStack: "Cordova, Java, Android Native, JavaScript",
  },
  {
    id: "cordovaLocationDetails",
    title: "Cordova Location Services",
    category: "upcoming",
    categories: ["all", "upcoming"],
    icon: "fas fa-map-marker-alt",
    iconColor: "#28A745",
    shortDesc: "Plugin for accessing location services in Cordova apps.",
    fullDesc: "Cross-platform GPS and geolocation module optimized for background tracking, geofencing, and battery-efficient location monitoring in hybrid mobile applications.",
    techStack: "Cordova, JavaScript, Android Native Geofencing",
  },
  {
    id: "advancedSentimentDetails",
    title: "Advanced Sentiment Analysis",
    category: "following",
    categories: ["all", "following"],
    icon: "fas fa-chart-pie",
    iconColor: "#FF5733",
    shortDesc: "In-depth sentiment analysis with advanced techniques.",
    fullDesc: "Multi-class emotion classification framework mapping user sentiments across granular psychological dimensions using deep neural representations.",
    techStack: "Deep Learning, PyTorch, BERT, Python",
  },
  {
    id: "dataScienceDetails",
    title: "Data Science Model Development",
    category: "popular",
    categories: ["all", "popular", "upcoming"],
    icon: "fas fa-cogs",
    iconColor: "#007BFF",
    shortDesc: "Model development for data science applications.",
    fullDesc: "Production-ready machine learning model training and serialization pipeline with automated cross-validation, hyperparameter tuning, and containerized deployment.",
    techStack: "Scikit-Learn, XGBoost, Docker, FastAPI",
  },
  {
    id: "machineLearningDetails",
    title: "Machine Learning Enhancements",
    category: "upcoming",
    categories: ["all", "upcoming", "following"],
    icon: "fas fa-brain",
    iconColor: "#17A2B8",
    shortDesc: "Improvements and optimizations in machine learning models.",
    fullDesc: "Quantization, pruning, and low-precision inference tuning to execute deep neural models on resource-constrained hardware with near-zero accuracy penalty.",
    techStack: "TensorFlow Lite, ONNX, PyTorch Edge, Python",
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("*");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [cardToast, setCardToast] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  // Auto-download Atlantic Glacier Blue business card & phone contact on opening portfolio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyDownloaded = sessionStorage.getItem("portfolio_card_auto_downloaded_v5");
      if (!alreadyDownloaded) {
        sessionStorage.setItem("portfolio_card_auto_downloaded_v5", "true");
        const timer = setTimeout(async () => {
          try {
            await generateAndDownloadBusinessCard("png", "glacier");
            downloadVCardContact();
            setCardToast("🪪 Karan Mishra's Official Aurxon Business Card (PNG) & Phone Contact (.vcf) saved to your device!");
            setTimeout(() => setCardToast(null), 6500);
          } catch (e) {
            console.error("Auto card download error:", e);
          }
        }, 1600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const filteredProjects = portfolioProjects.filter((item) => {
    if (activeFilter === "*") return true;
    return item.categories.includes(activeFilter.replace(".", ""));
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSent(false);
    }, 4000);
  };

  return (
    <>
      {/* Toast Alert for Auto-Downloaded Card */}
      {cardToast && (
        <div className="card_auto_download_toast">
          <div className="toast_inner">
            <span className="toast_pulse_dot"></span>
            <span className="toast_text">{cardToast}</span>
            <Link href="/card" className="toast_action_link">
              View HD Card &rarr;
            </Link>
            <button
              onClick={() => setCardToast(null)}
              className="toast_close_btn"
              aria-label="Close Toast"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* ================ Start Home Banner Area (Original Classic Design) ================= */}
      <section className="home_banner_area" id="home">
        <div className="banner_inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="banner_content">
                  <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                    <a
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aurxon_header_badge"
                      title="Visit Aurxon Official Website (aurxon.com)"
                    >
                      <img src="/img/png/logo-color.png" alt="Aurxon Logo" className="aurxon_mini_logo" />
                      <span>FOUNDER &bull; AURXON</span>
                    </a>
                    <span className="tagline_mini_pill">Next Gen AI Solutions</span>
                  </div>

                  <h3 className="text-uppercase">Hello, I Am</h3>
                  <h1 className="text-uppercase">Karan Mishra</h1>
                  <h5 className="text-uppercase">
                    Founder &bull; Aurxon &bull; Machine Learning &amp; Python Engineer
                  </h5>

                  <p className="banner_bio_text">
                    Architecting production-grade enterprise AI platforms, autonomous neural systems, and institutional software. Leading <strong>Aurxon</strong> with 47+ open-source GitHub repositories and cutting-edge applied AI research.
                  </p>

                  <div className="d-flex align-items-center flex-wrap gap-2 banner_btn_row">
                    <a
                      className="primary_btn"
                      href="#direct-contact-section"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("direct-contact-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>Hire Me</span>
                    </a>
                    <a
                      className="primary_btn tr-bg"
                      href="/pdf/Karan_Mishra_ResumeDetailed.pdf"
                      download="Karan_Mishra_CV.pdf"
                    >
                      <span>Get CV</span>
                    </a>
                    <a
                      className="primary_btn tr-bg"
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Official Aurxon Platform"
                    >
                      <span>Aurxon.com &rarr;</span>
                    </a>
                    <Link
                      className="primary_btn tr-bg"
                      href="/card"
                      title="9:16 Portrait Smart Business Card"
                    >
                      <span>Smart Card</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="home_right_img text-center">
                  <img
                    className="img-fluid"
                    src="/img/banner/home-right.png"
                    alt="Karan Mishra - Founder Aurxon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Home Banner Area ================= */}

      {/* ================ Start About Us Area (Original Classic Design) ================= */}
      <section className="about_area section_gap" id="about-section">
        <div className="container">
          <div className="row justify-content-start align-items-center">
            <div className="col-lg-5">
              <div className="about_img text-center">
                <img
                  className="img-fluid"
                  src="/img/about-us.png"
                  alt="Karan Mishra - About Us"
                />
              </div>
            </div>

            <div className="offset-lg-1 col-lg-6">
              <div className="main_title text-left">
                <h2>
                  let’s <br />
                  Introduce about <br />
                  myself
                </h2>
                <p>
                  Hey there! I'm Karan Mishra, a tech enthusiast with a passion for turning complex ideas into practical, innovative solutions. My journey in the world of technology began with a fascination for coding, and it’s led me to dive deep into machine learning, AI, and web technologies.
                </p>
                <p>
                  I’m now the proud founder of <strong>Aurxon</strong> (Where Intelligence Meets Innovation), where I get to bring my vision to life, creating cutting-edge enterprise AI solutions, autonomous neural systems, and distributed platforms that make a difference. Whether it's developing advanced machine learning models or crafting sleek web applications, I'm all about pushing boundaries and exploring new possibilities.
                </p>
                <p>
                  When I'm not immersed in the world of tech, you’ll likely find me planning my next travel adventure or unwinding with some cartoons and movies—because hey, even founders need a bit of fun, right?
                </p>
                <p>
                  I’m always excited about the future and ready to tackle new challenges. If you’re looking to collaborate or just chat about the latest in tech, feel free to reach out!
                </p>
                <div className="d-flex align-items-center gap-3 flex-wrap mt-4">
                  <a
                    className="primary_btn"
                    href="/pdf/Karan_Mishra_ResumeDetailed.pdf"
                    download="Karan_Mishra_CV.pdf"
                  >
                    <span>Download CV</span>
                  </a>
                  <a
                    className="primary_btn tr-bg"
                    href="https://aurxon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Explore Aurxon (aurxon.com)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End About Us Area ================= */}

      {/* ================ Start Brand Area & Experience Widget (Original Classic Design) ================= */}
      <section className="brand_area section_gap_bottom">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="col-lg-4 col-md-4 col-sm-6 col-4">
                    <div className="single-brand-item d-table">
                      <div className="d-table-cell text-center">
                        <img
                          src={`/img/brands/logo${num}.png`}
                          alt={`Brand Logo ${num}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="offset-lg-1 col-lg-5 col-md-6 mt-4 mt-lg-0">
              <div className="client-info">
                <div className="d-flex mb-50 align-items-center">
                  <span className="lage">3+</span>
                  <span className="smll">Years Experience work</span>
                </div>
                <div className="call-now d-flex align-items-center">
                  <div>
                    <span className="fa fa-phone call_icon_pulse"></span>
                  </div>
                  <div className="ml-15 text-left">
                    <p>call us now</p>
                    <h3>(+91) 780 489 5074</h3>
                  </div>
                </div>
                <div className="address_mini_note text-left mt-3">
                  <i className="fa fa-map-marker mr-1 text-primary"></i>
                  <span>AURXON Headquarters, Killa Maidan, VIP Road, Indore, MP – 452006, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Brand Area ================= */}

      {/* ================ Start Features Area (Original Classic Design with Large Colorful Icons) ================= */}
      <section className="features_area" id="services-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="main_title">
                <h2>My Services</h2>
                <p>
                  I specialize in a range of cutting-edge technologies and services to help businesses
                  innovate and grow. Here’s what I offer:
                </p>
              </div>
            </div>
          </div>
          <div className="row feature_inner">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#007FFF" }}>
                  <i className="fas fa-brain"></i>
                </div>
                <h4>Machine Learning Development</h4>
                <p>
                  Building intelligent systems with advanced machine learning algorithms, sentence transformers, and real-time production inference pipelines.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#FF5733" }}>
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h4>Web Application Development</h4>
                <p>
                  Crafting responsive, user-friendly web applications that are both aesthetically pleasing and functionally robust, using the latest web technologies.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#28A745" }}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4>Data Analytics &amp; Visualization</h4>
                <p>
                  Transforming data into actionable insights with advanced analytics and visually compelling dashboards to drive business growth and efficiency.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="feature_item">
                <div className="icon" style={{ fontSize: "3.2rem", color: "#FFC107" }}>
                  <i className="fas fa-robot"></i>
                </div>
                <h4>AI &amp; Automation Solutions</h4>
                <p>
                  Implementing AI-driven automation to streamline processes, reduce manual effort, and boost productivity across various industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Features Area ================= */}

      {/* ================ Start Portfolio Area (Original Classic Design with Category Filters) ================= */}
      <section className="portfolio_area" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main_title text-left">
                <h2>
                  Quality Work <br /> Recently Done Projects
                </h2>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="filters portfolio-filter">
            <ul>
              <li
                className={activeFilter === "*" ? "active" : ""}
                onClick={() => setActiveFilter("*")}
              >
                All
              </li>
              <li
                className={activeFilter === ".popular" ? "active" : ""}
                onClick={() => setActiveFilter(".popular")}
              >
                Popular
              </li>
              <li
                className={activeFilter === ".latest" ? "active" : ""}
                onClick={() => setActiveFilter(".latest")}
              >
                Latest
              </li>
              <li
                className={activeFilter === ".following" ? "active" : ""}
                onClick={() => setActiveFilter(".following")}
              >
                Following
              </li>
              <li
                className={activeFilter === ".upcoming" ? "active" : ""}
                onClick={() => setActiveFilter(".upcoming")}
              >
                Upcoming
              </li>
            </ul>
          </div>

          {/* Project Grid */}
          <div className="filters-content">
            <div className="row portfolio-grid justify-content-center">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="col-lg-4 col-md-6 mb-4"
                  onClick={() => setActiveModalProject(project)}
                >
                  <div className="portfolio_box">
                    <div className="single_portfolio">
                      <div className="icon_box text-center py-4">
                        <span
                          className={project.icon}
                          style={{ fontSize: "3.8rem", color: project.iconColor }}
                        ></span>
                      </div>
                      <div className="overlay"></div>
                      <div className="icon">
                        <span className="fas fa-link" style={{ fontSize: "1.8rem", color: "#fff" }}></span>
                      </div>
                    </div>
                    <div className="short_info">
                      <h4>
                        <button
                          type="button"
                          className="portfolio_title_btn"
                          onClick={() => setActiveModalProject(project)}
                        >
                          {project.title}
                        </button>
                      </h4>
                      <p>{project.shortDesc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Portfolio Area ================= */}

      {/* ================ Interactive Project Modal ================= */}
      {activeModalProject && (
        <div
          className="modal_backdrop animate_fade_in"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="modal_window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal_header">
              <div className="d-flex align-items-center gap-3">
                <span
                  className={activeModalProject.icon}
                  style={{ fontSize: "2rem", color: activeModalProject.iconColor }}
                ></span>
                <h4 className="modal_title mb-0">{activeModalProject.title}</h4>
              </div>
              <button
                type="button"
                className="modal_close_btn"
                onClick={() => setActiveModalProject(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal_body py-3">
              <p className="modal_desc_lead">{activeModalProject.fullDesc}</p>
              <div className="modal_tech_badge mt-3">
                <strong>Technologies: </strong>
                <span>{activeModalProject.techStack}</span>
              </div>
            </div>
            <div className="modal_footer d-flex justify-content-between align-items-center">
              <a
                href="https://github.com/CodeSage4D"
                target="_blank"
                rel="noopener noreferrer"
                className="primary_btn"
              >
                <span>View on GitHub (@CodeSage4D)</span>
              </a>
              <button
                type="button"
                className="btn btn-secondary px-4 py-2"
                onClick={() => setActiveModalProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================ Start Storytelling Road Timeline Experience Area ================= */}
      <RoadTimelineExperience />
      {/* ================ End Storytelling Road Timeline Experience Area ================= */}

      {/* ================ Start Newsletter Area (Original Classic Design) ================= */}
      <section className="newsletter_area">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-12 text-center">
              <div className="subscription_box text-center">
                <h2 className="text-uppercase text-white">Get Updates from Anywhere</h2>
                <p className="text-white mt-2">
                  Stay informed with the latest updates and exclusive intelligence on Aurxon AI and engineering platforms.
                </p>
                <div className="subcribe-form mt-4">
                  {newsletterSent ? (
                    <div className="newsletter_success_badge">
                      <i className="fa fa-check-circle mr-2"></i> Thank you! You have been subscribed to updates.
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="subscription d-flex justify-content-center align-items-center flex-wrap gap-2">
                      <input
                        name="EMAIL"
                        placeholder="Email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        type="email"
                        className="newsletter_input"
                      />
                      <button type="submit" className="primary-btn-newsletter">
                        <i className="fa fa-paper-plane mr-1"></i> Get Started
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================ End Newsletter Area ================= */}

      {/* ================ Start Modern Direct Contact Area ================= */}
      <ModernContactSection />
      {/* ================ End Modern Direct Contact Area ================= */}

      {/* Scoped CSS to enforce authentic older design & NO container outline borders */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Enforce Clean Borderless Cards (NO container outline border!) */
        .feature_item,
        .single_portfolio,
        .portfolio_box,
        .client-info,
        .single-brand-item,
        .about_img,
        .home_right_img {
          border: none !important;
          outline: none !important;
        }

        .dark .feature_item,
        .dark .single_portfolio,
        .dark .portfolio_box,
        .dark .client-info,
        .dark .single-brand-item,
        .dark .about_img,
        .dark .home_right_img {
          border: none !important;
          outline: none !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4) !important;
        }

        .aurxon_header_badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 50px;
          background: rgba(2, 132, 199, 0.08);
          color: #0284c7;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: 0.04em;
        }

        .dark .aurxon_header_badge {
          background: rgba(255, 255, 255, 0.06);
          color: #38bdf8;
        }

        .aurxon_mini_logo {
          height: 16px;
          width: auto;
          object-fit: contain;
        }

        .tagline_mini_pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #8b5cf6;
          padding: 4px 10px;
          border-radius: 50px;
          background: rgba(139, 92, 246, 0.1);
        }

        .banner_bio_text {
          max-width: 580px;
          font-size: 1.05rem;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 25px;
        }

        .dark .banner_bio_text {
          color: #cbd5e1;
        }

        .banner_btn_row a,
        .banner_btn_row button {
          margin-right: 12px;
          margin-bottom: 10px;
        }

        .home_right_img img {
          max-height: 480px;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .home_right_img img:hover {
          transform: scale(1.02);
        }

        .call_icon_pulse {
          font-size: 2.2rem;
          color: #854fee;
        }

        .address_mini_note {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.4;
        }

        .dark .address_mini_note {
          color: #94a3b8;
        }

        /* Portfolio Title Button */
        .portfolio_title_btn {
          background: none;
          border: none;
          padding: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          cursor: pointer;
          text-align: left;
        }

        .dark .portfolio_title_btn {
          color: #f1f5f9;
        }

        .portfolio_title_btn:hover {
          color: #0284c7;
        }

        /* Modal Styles */
        .modal_backdrop {
          position: fixed;
          inset: 0;
          z-index: 1050;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal_window {
          background: #ffffff;
          border-radius: 20px;
          max-width: 620px;
          width: 100%;
          padding: 30px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          position: relative;
        }

        .dark .modal_window {
          background: #0f172a;
          color: #f8fafc;
        }

        .modal_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          padding-bottom: 16px;
        }

        .dark .modal_header {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .modal_close_btn {
          background: none;
          border: none;
          font-size: 2rem;
          line-height: 1;
          color: #94a3b8;
          cursor: pointer;
        }

        .modal_close_btn:hover {
          color: #0f172a;
        }

        .dark .modal_close_btn:hover {
          color: #ffffff;
        }

        .modal_desc_lead {
          font-size: 1rem;
          line-height: 1.7;
          color: #334155;
        }

        .dark .modal_desc_lead {
          color: #cbd5e1;
        }

        .modal_tech_badge {
          background: #f1f5f9;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.88rem;
          color: #475569;
        }

        .dark .modal_tech_badge {
          background: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
        }

        .modal_footer {
          border-top: 1px solid rgba(226, 232, 240, 0.8);
          padding-top: 18px;
          margin-top: 10px;
        }

        .dark .modal_footer {
          border-top-color: rgba(255, 255, 255, 0.1);
        }

        /* Newsletter Area */
        .newsletter_area {
          background-color: #007FFF;
          padding: 70px 0;
          color: #ffffff;
        }

        .subscription_box h2 {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .newsletter_input {
          padding: 12px 18px;
          border-radius: 8px;
          border: none;
          width: 320px;
          max-width: 100%;
          outline: none;
          font-size: 0.95rem;
        }

        .primary-btn-newsletter {
          background-color: #FF5733;
          color: #ffffff;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.25s ease;
        }

        .primary-btn-newsletter:hover {
          background-color: #e04825;
        }

        .newsletter_success_badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
        }
      `}} />
    </>
  );
}
