"use client";

import React from "react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: "fa-brain",
      iconColor: "#CEA17A",
      image: "/img/vectors/vector-ui-analytics-3d.jpeg",
      title: "Production Machine Learning & Transformers",
      description:
        "Architecting custom fine-tuned NLP pipelines, sentence transformer embeddings (Cognivex), and sub-15ms vector search inference on GPU hardware.",
      techStack: ["PyTorch", "SentenceTransformers", "FastAPI", "TensorRT", "CUDA"],
      sla: "99.98% Latency SLA",
    },
    {
      icon: "fa-laptop-code",
      iconColor: "#73C4BF",
      image: "/img/vectors/vector-scalable-solutions.jpeg",
      title: "Enterprise Web Applications & Edge Systems",
      description:
        "Building distributed, high-concurrency web platforms using Next.js 15, TypeScript, and edge runtimes. Zero layout-shift designs engineered for multi-tenant throughput.",
      techStack: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
      sla: "Sub-100ms FCP",
    },
    {
      icon: "fa-building",
      iconColor: "#6366f1",
      image: "/img/vectors/vector-hybrid-apps.jpeg",
      title: "Enterprise SaaS & Educational ERP Engines",
      description:
        "Designing modular institutional platforms (Aurxon ERP Lite) for schools, institutes, and enterprises. Features role-based telemetry, automated fee billing, and real-time records.",
      techStack: ["Multi-Tenant DB", "NextAuth", "Cloud Run", "REST/GraphQL"],
      sla: "Institutional Scale",
    },
    {
      icon: "fa-chart-line",
      iconColor: "#10b981",
      image: "/img/vectors/vector-b2b-growth.jpeg",
      title: "Data Analytics, Telemetry & Forecasting",
      description:
        "Transforming massive high-frequency data streams into predictive mathematical dashboards with Pandas, Plotly dynamic charting, and Apache Arrow batch aggregations.",
      techStack: ["Python Pandas", "Plotly", "Apache Arrow", "Redis", "NumPy"],
      sla: "50k records/s",
    },
    {
      icon: "fa-robot",
      iconColor: "#f59e0b",
      image: "/img/vectors/vector-developer.jpeg",
      title: "Autonomous AI Agents & Background Workers",
      description:
        "Orchestrating autonomous LLM pipelines and asynchronous task workers with LangChain, Celery, and Redis event queues. Eliminates manual operational friction with self-healing tasks.",
      techStack: ["LangChain", "Celery", "Redis Queue", "Autonomous Agents"],
      sla: "Zero-Downtime Worker",
    },
    {
      icon: "fa-shield-alt",
      iconColor: "#ec4899",
      image: "/img/vectors/vector-office-pc.jpeg",
      title: "Real-Time Anomaly Detection & Edge Security",
      description:
        "Developing real-time anomaly classification models to flag fraud, abnormal telemetry, and platform security events with negligible false positives.",
      techStack: ["Scikit-Learn", "Fast Inference", "Kafka Streams", "Security Rules"],
      sla: "Sub-10ms Detection",
    },
  ];

  const showcaseVectors = [
    {
      img: "/img/vectors/vector-brand-trust.jpeg",
      title: "Brands Built on Trust",
      subtitle: "Enterprise Reliability & Verifiable Engineering",
      tag: "BRAND REPUTATION",
    },
    {
      img: "/img/vectors/vector-worker-creative.jpeg",
      title: "Craftsmanship & Labor",
      subtitle: "Uncompromising Dedication to Code Quality",
      tag: "GLOBAL CRAFT",
    },
    {
      img: "/img/vectors/vector-ui-animation-screens.jpeg",
      title: "Fluid Micro-Interactions",
      subtitle: "State-of-the-Art Animated App Screen Interfaces",
      tag: "REACTIVE UI/UX",
    },
    {
      img: "/img/vectors/vector-freelance-concept.jpeg",
      title: "Distance Tech Advisory",
      subtitle: "Remote AI Architecture & Institutional Mentorship",
      tag: "GLOBAL CONSULTING",
    },
    {
      img: "/img/vectors/vector-anime-avatar.jpeg",
      title: "Cybernetic Creator Persona",
      subtitle: "Anime Stylized Digital Identity of Karan Mishra",
      tag: "CREATIVE CODEX",
    },
    {
      img: "/img/vectors/vector-enterprising-man.jpeg",
      title: "Autonomous Delivery",
      subtitle: "Enterprising Sprint Execution & Zero Downtime",
      tag: "SPRINT MASTERY",
    },
  ];

  return (
    <>
      {/* Banner Area */}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-center">
              <h2>Core Engineering &amp; Services</h2>
              <div className="page_link">
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Area */}
      <section className="features_area section_gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="main_title mb-5">
                <span className="text-uppercase text-gold font-mono small tracking-widest font-weight-bold">
                  High-Velocity Architectural Capabilities
                </span>
                <h2 className="mt-2 font-weight-bold">Core Engineering &amp; Services</h2>
                <p className="text-muted">
                  High-velocity software engineering, production machine learning architectures, and scalable full-stack platforms built for founders and enterprise clients.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {services.map((svc, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 mb-4">
                <div className="service_elite_card h-100 d-flex flex-column justify-content-between p-4">
                  <div>
                    {/* Vector Illustration Header */}
                    <div className="service_vector_preview_wrap mb-3 position-relative">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="service_vector_thumb"
                      />
                      <span className="service_sla_tag font-mono">{svc.sla}</span>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div
                        className="service_icon_mini"
                        style={{
                          background: `${svc.iconColor}22`,
                          color: svc.iconColor,
                        }}
                      >
                        <i className={`fas ${svc.icon}`}></i>
                      </div>
                      <h4 className="text-white font-weight-bold mb-0" style={{ fontSize: "1.1rem" }}>
                        {svc.title}
                      </h4>
                    </div>

                    <p className="text-muted small mb-3">{svc.description}</p>
                  </div>

                  <div>
                    <div className="d-flex gap-1 flex-wrap tech_pills_row mt-2">
                      {svc.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="tech_mini_pill">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= Illustrated Architecture & Creative Vectors Spotlight ================= */}
          <div className="mt-5 pt-4">
            <div className="row justify-content-center mb-4">
              <div className="col-lg-8 text-center">
                <span className="text-gold font-mono small font-weight-bold tracking-widest text-uppercase">
                  VISUAL ARTIFACTS &bull; CREATIVE CODEX
                </span>
                <h3 className="text-white font-weight-bold mt-2">Engineering Philosophy &amp; Vector Artwork</h3>
                <p className="text-muted small">
                  Artistic vector illustrations and anime personas capturing the intersection of enterprise rigor, client trust, and software craftsmanship.
                </p>
              </div>
            </div>

            <div className="row g-3">
              {showcaseVectors.map((v, i) => (
                <div key={i} className="col-lg-4 col-md-6 mb-4">
                  <div className="vector_showcase_card p-3 rounded h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="vector_showcase_img_box mb-3 rounded overflow-hidden position-relative">
                        <img
                          src={v.img}
                          alt={v.title}
                          className="img-fluid vector_showcase_img"
                        />
                        <span className="vector_badge_tag font-mono">{v.tag}</span>
                      </div>
                      <h5 className="text-white font-weight-bold mb-1" style={{ fontSize: "1rem" }}>
                        {v.title}
                      </h5>
                      <p className="text-muted small mb-0">{v.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Consultation Callout Box */}
          <div className="executive_consultation_box mt-5 p-4 p-md-5 text-center">
            <h3 className="text-white font-weight-bold mb-2">Have a Mission-Critical System to Engineer?</h3>
            <p className="text-muted mx-auto" style={{ maxWidth: "680px" }}>
              Whether you need to scale an institutional SaaS platform, train a specialized neural model, or deploy a resilient distributed architecture, partner directly with Karan Mishra and the Aurxon engineering team.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
              <Link href="/contact" className="primary_btn">
                <span>Initiate Executive Consultation</span>
              </Link>
              <a
                href="https://aurxon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="primary_btn tr-bg"
              >
                <span>Explore Aurxon Platform &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .service_elite_card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .service_elite_card:hover {
          transform: translateY(-6px);
          border-color: rgba(206, 161, 122, 0.4);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(206, 161, 122, 0.15);
        }
        .service_vector_preview_wrap {
          border-radius: 12px;
          overflow: hidden;
          height: 160px;
          background: #060913;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .service_vector_thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .service_elite_card:hover .service_vector_thumb {
          transform: scale(1.05);
        }
        .service_icon_mini {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .service_sla_tag {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.7rem;
          color: #38bdf8;
          background: rgba(4, 7, 15, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 3px 8px;
          border-radius: 6px;
        }
        .tech_mini_pill {
          font-family: monospace;
          font-size: 0.72rem;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.05);
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .vector_showcase_card {
          background: rgba(11, 17, 32, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }
        .vector_showcase_card:hover {
          transform: translateY(-4px);
          border-color: rgba(6, 182, 212, 0.4);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }
        .vector_showcase_img_box {
          height: 180px;
          background: #090d16;
        }
        .vector_showcase_img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .vector_showcase_card:hover .vector_showcase_img {
          transform: scale(1.04);
        }
        .vector_badge_tag {
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-size: 0.68rem;
          color: #CEA17A;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(206, 161, 122, 0.3);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .executive_consultation_box {
          background: linear-gradient(135deg, rgba(206, 161, 122, 0.08) 0%, rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid rgba(206, 161, 122, 0.3);
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </>
  );
}
