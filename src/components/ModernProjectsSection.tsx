"use client";

import React, { useState } from "react";

interface Project {
  id: string;
  title: string;
  category: "all" | "ai-ml" | "saas" | "web" | "analytics";
  categoryLabel: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  iconClass: string;
  accentColor: string;
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: "himanshidr",
    title: "HimanshiDr Healthcare Portal",
    category: "web",
    categoryLabel: "Full-Stack Web",
    description:
      "Modern healthcare & clinical consultation platform built with Next.js and TypeScript, offering intuitive appointment scheduling, doctor profiles, and real-time patient care workflows.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/CodeSage4D/HimanshiDr",
    liveUrl: "https://himanshi-dr.vercel.app",
    iconClass: "fa-user-md",
    accentColor: "#0ea5e9",
    featured: true,
  },
  {
    id: "aurxon-erp",
    title: "Aurxon ERP Lite",
    category: "saas",
    categoryLabel: "Enterprise SaaS & ERP",
    description:
      "Enterprise-grade educational and institutional management platform built for schools, coaching institutes, and growing businesses. Features automated fee collection, attendance, and role-based portals.",
    technologies: ["TypeScript", "Next.js", "PostgreSQL", "Enterprise SaaS", "Prisma"],
    githubUrl: "https://github.com/CodeSage4D/aurxon-erp-lite",
    liveUrl: "https://github.com/CodeSage4D/aurxon-erp-lite",
    iconClass: "fa-building",
    accentColor: "#6366f1",
    featured: true,
  },
  {
    id: "cognivex",
    title: "Cognivex AI Career Intelligence",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    description:
      "AI-powered talent intelligence engine that parses resumes into vector embeddings, evaluates candidate competencies, and delivers explainable semantic job matching with advanced NLP transformers.",
    technologies: ["Python", "Sentence Transformers", "FastAPI", "NLP", "Vector Search"],
    githubUrl: "https://github.com/CodeSage4D/cognivex",
    iconClass: "fa-brain",
    accentColor: "#a855f7",
    featured: true,
  },
  {
    id: "hemoai",
    title: "HemoAI Blood Intelligence",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    description:
      "Predictive blood bank inventory optimization and patient triage intelligence system, forecasting critical blood shortages and automating real-time donor-patient matching.",
    technologies: ["TypeScript", "Predictive ML", "Healthcare AI", "Node.js"],
    githubUrl: "https://github.com/CodeSage4D/HemoAI",
    iconClass: "fa-heartbeat",
    accentColor: "#ef4444",
    featured: true,
  },
  {
    id: "sentiment-negation",
    title: "SentiVoice NLP Analyzer",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    description:
      "Advanced Streamlit NLP application equipped with robust grammatical negation handling, speech-to-text voice recognition, and real-time sentiment polarity visualization.",
    technologies: ["Python", "Streamlit", "NLTK", "SpeechRecognition", "Plotly"],
    githubUrl: "https://github.com/CodeSage4D/Sentiment-Negation-Analytics",
    iconClass: "fa-microphone",
    accentColor: "#10b981",
  },
  {
    id: "anomaly-detection",
    title: "ML Anomaly Detection Pipeline",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    description:
      "Machine learning model architecture designed for real-time anomaly and fraud identification in complex, high-dimensional datasets, safeguarding transactions and platform integrity.",
    technologies: ["Python", "Scikit-Learn", "NumPy", "Data Security", "Matplotlib"],
    githubUrl: "https://github.com/CodeSage4D/Anomaly-Detection",
    iconClass: "fa-shield",
    accentColor: "#f59e0b",
  },
  {
    id: "karanverse",
    title: "KaranVerse Interactive Space",
    category: "web",
    categoryLabel: "Full-Stack Web",
    description:
      "Karan Mishra’s digital cyberverse showcasing neon creative coding experiments, 2D/3D interactive canvas simulations, and dynamic front-end micro-interactions.",
    technologies: ["HTML5 Canvas", "JavaScript", "CSS3", "WebGL"],
    githubUrl: "https://github.com/CodeSage4D/karanverse",
    liveUrl: "https://itsgkaranmishra.web.app",
    iconClass: "fa-cube",
    accentColor: "#ec4899",
  },
  {
    id: "blackcoffe",
    title: "BlackCoffe NLP Data Extractor",
    category: "analytics",
    categoryLabel: "Data Analytics",
    description:
      "Automated web crawler and NLP text metric analyzer extracting readable variables, complex syllables, and polarity scores using BeautifulSoup and Python data pipelines.",
    technologies: ["Python", "BeautifulSoup", "Pandas", "NLP Metrics"],
    githubUrl: "https://github.com/CodeSage4D/BlackCoffe-DataAnalytic",
    iconClass: "fa-line-chart",
    accentColor: "#8b5cf6",
  },
];

export const ModernProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeTab === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeTab);

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "ai-ml", label: "AI & Machine Learning" },
    { id: "saas", label: "Enterprise SaaS & ERP" },
    { id: "web", label: "Full-Stack Web" },
    { id: "analytics", label: "Data Analytics" },
  ];

  return (
    <section className="modern_projects_section section_gap" id="portfolio">
      <div className="container">
        {/* Header */}
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="main_title mb-4">
              <span className="projects_badge heartbeat_soft">
                <i className="fa fa-code-fork mr-2"></i> Quality Work &bull; GitHub Repositories
              </span>
              <h2 className="mt-3">Recently Done Projects</h2>
              <p>
                Explore real open-source systems, deployed healthcare applications, and enterprise AI engines from my GitHub portfolio (<strong>@CodeSage4D</strong>).
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="modern_filter_nav">
          <div className="filter_pills_container">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`filter_pill_btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Rich Background Hover Effects */}
        <div className="row g-4 mt-2 justify-content-center">
          {filteredProjects.map((project) => (
            <div key={project.id} className="col-lg-4 col-md-6 mb-4">
              <div className="modern_project_card">
                {/* Glowing Background Hover Layer */}
                <div
                  className="card_glow_layer"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${project.accentColor}33 0%, transparent 70%)`,
                  }}
                ></div>

                {/* Top Card Bar */}
                <div className="project_card_header">
                  <div
                    className="project_icon_wrapper"
                    style={{
                      background: `${project.accentColor}18`,
                      color: project.accentColor,
                      borderColor: `${project.accentColor}40`,
                    }}
                  >
                    <i className={`fa ${project.iconClass}`}></i>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="project_category_tag">{project.categoryLabel}</span>
                    {project.liveUrl && (
                      <span className="live_deployed_indicator" title="Deployed Application">
                        <span className="live_ping_dot heartbeat_fluctuate"></span> Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="project_card_body">
                  <h3 className="project_title_text">
                    <a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p className="project_desc_text">{project.description}</p>
                </div>

                {/* Tech Pills */}
                <div className="project_tech_list">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech_pill">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons (Visit Live App + GitHub) */}
                <div className="project_actions_row">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn_visit_live heartbeat_soft"
                      title="Open Live Deployed Application"
                    >
                      <i className="fa fa-external-link mr-1"></i> Visit Live App
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn_github_repo"
                    title="View Source on GitHub"
                  >
                    <i className="fa fa-github mr-1"></i> View Code
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn_quick_view"
                    title="Quick Details"
                  >
                    <i className="fa fa-info-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Direct Profile Banner */}
        <div className="github_explore_banner text-center mt-5">
          <div className="github_banner_inner">
            <div className="github_banner_icon">
              <i className="fa fa-github"></i>
            </div>
            <div className="github_banner_text">
              <h4>Want to explore all 47+ open-source repositories?</h4>
              <p>Check out machine learning algorithms, Cordova plugins, and web experiments directly on GitHub.</p>
            </div>
            <a
              href="https://github.com/CodeSage4D"
              target="_blank"
              rel="noopener noreferrer"
              className="primary_btn"
            >
              <span>Follow @CodeSage4D on GitHub</span>
              <i className="fa fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Project Quick Detail Modal */}
      {selectedProject && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content project_modal_content">
              <div className="modal-header project_modal_header">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="project_icon_wrapper"
                    style={{
                      background: `${selectedProject.accentColor}18`,
                      color: selectedProject.accentColor,
                    }}
                  >
                    <i className={`fa ${selectedProject.iconClass}`}></i>
                  </div>
                  <div>
                    <h5 className="modal-title font-weight-bold mb-0">
                      {selectedProject.title}
                    </h5>
                    <span className="small text-muted">{selectedProject.categoryLabel}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="close modal_close_btn"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body project_modal_body">
                <p className="modal_project_desc">{selectedProject.description}</p>

                <h6 className="font-weight-bold mb-2">Technologies &amp; Architecture:</h6>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((t) => (
                    <span key={t} className="tech_pill tech_pill_modal">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="modal_actions_flex">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="primary_btn"
                    >
                      <i className="fa fa-external-link mr-2"></i> Visit Live App
                    </a>
                  )}
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary_btn tr-bg"
                  >
                    <i className="fa fa-github mr-2"></i> GitHub Repository
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS for Modern Projects Section */}
      <style dangerouslySetInnerHTML={{ __html: `
        .modern_projects_section {
          background: #ffffff;
          position: relative;
          padding: 85px 0;
          transition: background-color 0.3s ease;
        }

        .dark .modern_projects_section {
          background: #090d16 !important;
        }

        .projects_badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 18px;
          background: rgba(68, 88, 220, 0.1);
          color: #4458dc;
          border: 1px solid rgba(68, 88, 220, 0.25);
          border-radius: 50px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .dark .projects_badge {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
          border-color: rgba(99, 102, 241, 0.3);
        }

        /* Filter Tabs */
        .modern_filter_nav {
          display: flex;
          justify-content: center;
          margin-bottom: 35px;
        }

        .filter_pills_container {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          background: #f1f5f9;
          padding: 6px;
          border-radius: 50px;
          border: 1px solid #e2e8f0;
        }

        .dark .filter_pills_container {
          background: #131c31;
          border-color: #1e293b;
        }

        .filter_pill_btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dark .filter_pill_btn {
          color: #94a3b8;
        }

        .filter_pill_btn:hover {
          color: #0f172a;
        }

        .dark .filter_pill_btn:hover {
          color: #ffffff;
        }

        .filter_pill_btn.active {
          background: #ffffff;
          color: #4458dc;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
        }

        .dark .filter_pill_btn.active {
          background: #1e293b;
          color: #818cf8;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }

        /* Project Cards & Background Hover Effect */
        .modern_project_card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          overflow: hidden;
        }

        .dark .modern_project_card {
          background: #131c31;
          border-color: #1e293b;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        }

        .card_glow_layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .modern_project_card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(68, 88, 220, 0.16);
          border-color: rgba(99, 102, 241, 0.45);
        }

        .modern_project_card:hover .card_glow_layer {
          opacity: 1;
        }

        /* Card Header */
        .project_card_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .project_icon_wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          transition: transform 0.3s ease;
        }

        .modern_project_card:hover .project_icon_wrapper {
          transform: scale(1.1) rotate(4deg);
        }

        .project_category_tag {
          font-size: 0.74rem;
          font-weight: 700;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .dark .project_category_tag {
          background: #0f172a;
          color: #94a3b8;
        }

        .live_deployed_indicator {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .live_ping_dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }

        /* Card Body */
        .project_card_body {
          flex: 1;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }

        .project_title_text {
          font-size: 1.22rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .project_title_text a {
          color: inherit;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }

        .project_title_text a:hover {
          color: #4458dc;
        }

        .dark .project_title_text a:hover {
          color: #818cf8;
        }

        .dark .project_title_text {
          color: #ffffff;
        }

        .project_desc_text {
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        .dark .project_desc_text {
          color: #cbd5e1;
        }

        /* Tech List */
        .project_tech_list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 22px;
          position: relative;
          z-index: 2;
        }

        .tech_pill {
          font-size: 0.74rem;
          font-weight: 600;
          color: #475569;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 3px 9px;
          border-radius: 6px;
        }

        .dark .tech_pill {
          background: #0f172a;
          border-color: #1e293b;
          color: #94a3b8;
        }

        /* Card Actions */
        .project_actions_row {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
          margin-top: auto;
        }

        .btn_visit_live {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff !important;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none !important;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn_visit_live:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.45);
        }

        .btn_github_repo {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #334155 !important;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .dark .btn_github_repo {
          background: #0f172a;
          border-color: #334155;
          color: #cbd5e1 !important;
        }

        .btn_github_repo:hover {
          background: #4458dc;
          color: #ffffff !important;
          border-color: #4458dc;
          transform: translateY(-2px);
        }

        .btn_quick_view {
          margin-left: auto;
          background: transparent;
          border: 1px solid #e2e8f0;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark .btn_quick_view {
          border-color: #334155;
          color: #94a3b8;
        }

        .btn_quick_view:hover {
          color: #4458dc;
          border-color: #4458dc;
        }

        /* GitHub Banner */
        .github_explore_banner {
          background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 35px 25px;
        }

        .dark .github_explore_banner {
          background: linear-gradient(135deg, #131c31 0%, #0f172a 100%);
          border-color: #1e293b;
        }

        .github_banner_inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .github_banner_icon {
          font-size: 2.8rem;
          color: #4458dc;
        }

        .github_banner_text {
          text-align: left;
          flex: 1;
          min-width: 260px;
        }

        .github_banner_text h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .dark .github_banner_text h4 {
          color: #ffffff;
        }

        .github_banner_text p {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
        }

        .dark .github_banner_text p {
          color: #94a3b8;
        }

        /* Modal Styles */
        .project_modal_content {
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .dark .project_modal_content {
          background: #131c31;
          border-color: #1e293b;
        }

        .project_modal_header {
          border-bottom: 1px solid #f1f5f9;
          padding: 20px 24px;
        }

        .dark .project_modal_header {
          border-bottom-color: #1e293b;
        }

        .modal_close_btn {
          font-size: 1.5rem;
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
        }

        .project_modal_body {
          padding: 24px;
        }

        .modal_project_desc {
          font-size: 0.96rem;
          line-height: 1.65;
          color: #334155;
          margin-bottom: 20px;
        }

        .dark .modal_project_desc {
          color: #cbd5e1;
        }

        .tech_pill_modal {
          font-size: 0.82rem;
          padding: 5px 12px;
        }

        .modal_actions_flex {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
        }
      `}} />
    </section>
  );
};
