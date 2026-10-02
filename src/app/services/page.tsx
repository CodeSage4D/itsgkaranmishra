"use client";

import React from "react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: "fa-brain",
      iconColor: "#CEA17A",
      title: "Production Machine Learning & Transformers",
      description:
        "Architecting custom fine-tuned NLP pipelines, sentence transformer embeddings (Cognivex), and sub-15ms vector search inference on GPU hardware.",
      techStack: ["PyTorch", "SentenceTransformers", "FastAPI", "TensorRT", "CUDA"],
      sla: "99.98% Latency SLA",
    },
    {
      icon: "fa-laptop-code",
      iconColor: "#73C4BF",
      title: "Enterprise Web Applications & Edge Systems",
      description:
        "Building distributed, high-concurrency web platforms using Next.js 15, TypeScript, and edge runtimes. Zero layout-shift designs engineered for multi-tenant throughput.",
      techStack: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
      sla: "Sub-100ms FCP",
    },
    {
      icon: "fa-building",
      iconColor: "#6366f1",
      title: "Enterprise SaaS & Educational ERP Engines",
      description:
        "Designing modular institutional platforms (Aurxon ERP Lite) for schools, institutes, and enterprises. Features role-based telemetry, automated fee billing, and real-time records.",
      techStack: ["Multi-Tenant DB", "NextAuth", "Cloud Run", "REST/GraphQL"],
      sla: "Institutional Scale",
    },
    {
      icon: "fa-chart-line",
      iconColor: "#10b981",
      title: "Data Analytics, Telemetry & Forecasting",
      description:
        "Transforming massive high-frequency data streams into predictive mathematical dashboards with Pandas, Plotly dynamic charting, and Apache Arrow batch aggregations.",
      techStack: ["Python Pandas", "Plotly", "Apache Arrow", "Redis", "NumPy"],
      sla: "50k records/s",
    },
    {
      icon: "fa-robot",
      iconColor: "#f59e0b",
      title: "Autonomous AI Agents & Background Workers",
      description:
        "Orchestrating autonomous LLM pipelines and asynchronous task workers with LangChain, Celery, and Redis event queues. Eliminates manual operational friction with self-healing tasks.",
      techStack: ["LangChain", "Celery", "Redis Queue", "Autonomous Agents"],
      sla: "Zero-Downtime Worker",
    },
    {
      icon: "fa-shield-alt",
      iconColor: "#ec4899",
      title: "Real-Time Anomaly Detection & Edge Security",
      description:
        "Developing real-time anomaly classification models to flag fraud, abnormal telemetry, and platform security events with negligible false positives.",
      techStack: ["Scikit-Learn", "Fast Inference", "Kafka Streams", "Security Rules"],
      sla: "Sub-10ms Detection",
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
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div
                        className="service_icon_wrapper"
                        style={{
                          background: `${svc.iconColor}18`,
                          color: svc.iconColor,
                        }}
                      >
                        <i className={`fas ${svc.icon}`}></i>
                      </div>
                      <span className="service_sla_tag font-mono">{svc.sla}</span>
                    </div>

                    <h4 className="text-white font-weight-bold mb-2">{svc.title}</h4>
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

      <style dangerouslySetInnerHTML={{ __html: `
        .text-gold {
          color: #CEA17A !important;
        }

        .service_elite_card {
          background: rgba(9, 23, 31, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          border: none !important;
          outline: none !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service_elite_card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(206, 161, 122, 0.12);
        }

        .service_icon_wrapper {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .service_sla_tag {
          font-size: 0.72rem;
          color: #73C4BF;
          background: rgba(115, 196, 191, 0.12);
          padding: 4px 10px;
          border-radius: 50px;
        }

        .tech_mini_pill {
          background: rgba(255, 255, 255, 0.04);
          color: #cbd5e1;
          font-size: 0.7rem;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .executive_consultation_box {
          background: radial-gradient(circle at 50% 0%, rgba(6, 36, 86, 0.5) 0%, rgba(9, 23, 31, 0.85) 100%);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 24px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.45);
          border: none !important;
          outline: none !important;
        }

        @media (max-width: 768px) {
          .service_elite_card {
            padding: 20px 16px !important;
          }
          .executive_consultation_box {
            padding: 30px 18px !important;
          }
        }
      `}} />
    </>
  );
}
