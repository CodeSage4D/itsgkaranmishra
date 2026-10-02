"use client";

import React, { useState, useEffect, useRef } from "react";

interface Milestone {
  id: string;
  period: string;
  role: string;
  organization: string;
  tagline?: string;
  location: string;
  badge: string;
  badgeColor: string;
  logoUrl?: string;
  websiteUrl?: string;
  icon: string;
  summary: string;
  story: string;
  founderImpact: string[];
  technologies: string[];
  isCurrent?: boolean;
}

const milestones: Milestone[] = [
  {
    id: "aurxon",
    period: "August 2024 - Present",
    role: "Founder & Chief AI Architect",
    organization: "Aurxon",
    tagline: "Aurxon - Next Gen AI Solutions • Where Intelligence Meets Innovation",
    location: "AURXON Headquarters, Killa Maidan, VIP Road, Indore, MP – 452006, India",
    badge: "Active Flagship Venture",
    badgeColor: "#0284c7",
    logoUrl: "/img/logo/aurxon-logo-official.png",
    websiteUrl: "https://aurxon.com",
    icon: "fa-rocket",
    summary:
      "Founded Aurxon to engineer production-grade enterprise AI platforms, autonomous neural systems, and institutional solutions. Next Gen AI Solutions — Where Intelligence Meets Innovation.",
    story:
      "Directing overarching venture vision, neural model benchmarking, and full-stack system architecture at Aurxon (aurxon.com). Architected Aurxon ERP Lite for institutional automation and records, Cognivex for semantic AI career intelligence utilizing deep sentence transformers, FCOS for factory machine edge telemetry, and HemoAI for predictive medical blood prioritization.",
    founderImpact: [
      "Founded Aurxon (aurxon.com) and engineered autonomous enterprise AI solutions & multi-tenant platforms",
      "Designed full multi-tenant architecture for Aurxon ERP deployed in regional institutions",
      "Engineered Cognivex semantic matching engine with 98.4% accuracy on sentence transformer embeddings",
      "Leading open-source & enterprise AI innovation with 47+ public codebases on GitHub",
    ],
    technologies: ["Python", "FastAPI", "PyTorch", "Next.js", "Enterprise ERP", "Transformer Embeddings", "System Architecture", "Edge AI"],
    isCurrent: true,
  },
  {
    id: "suas-indore",
    period: "Sep 2025 - Present · 1 yr 2 mos",
    role: "Trainer – Applied AI & Systems (SCSIT, Symbiosis)",
    organization: "Symbiosis University of Applied Sciences (SUAS)",
    location: "Indore, Madhya Pradesh, India · On-site",
    badge: "Full-time · SCSIT Symbiosis",
    badgeColor: "#e11d48",
    logoUrl: "/img/logos/suas-logo.png",
    websiteUrl: "https://www.suas.ac.in",
    icon: "fa-university",
    summary:
      "Supporting academic and applied research activities at the School of Computer Science and IT (SCSIT).",
    story:
      "Supporting academic and applied research activities at the School of Computer Science and IT (SCSIT). Working closely with faculty on academic and technical projects related to software development and applied AI. Assisting students with Python, machine learning, and NLP concepts through hands-on guidance and debugging support.",
    founderImpact: [
      "Worked closely with faculty on academic and technical projects related to software development and applied AI",
      "Assisted students with Python, machine learning, and NLP concepts through hands-on guidance and debugging support",
      "Helped review, test, and refine student-built applications and early research prototypes",
      "Contributed to the development and testing of AI-based modules and data-driven solutions used in academic settings",
    ],
    technologies: ["Python Programming", "Machine Learning", "Applied AI & Systems", "Natural Language Processing (NLP)", "System Architecture"],
    isCurrent: true,
  },
  {
    id: "geek-theory",
    period: "March 2024 - July 2024",
    role: "R&D Engineering Intern",
    organization: "Geek Theory Pvt. Ltd.",
    location: "Indore, MP, India",
    badge: "R&D Systems",
    badgeColor: "#8b5cf6",
    icon: "fa-cogs",
    summary:
      "Researched and built high-performance Cordova hardware plugins and fine-tuned real-time machine learning classification inference pipelines.",
    story:
      "Delivered cross-platform hardware bridge integrations enabling high-frequency mobile sensor communication. Optimized inference pipelines for resource-constrained mobile hardware, reducing prediction latency by 35%.",
    founderImpact: [
      "Authored optimized Cordova native bridges for custom hardware modules",
      "Benchmark testing of low-latency classification models on edge devices",
      "Collaborated with senior software architects on scalable client delivery",
    ],
    technologies: ["Machine Learning", "Cordova Plugins", "Python", "Mobile Edge Inference", "System Optimization"],
  },
  {
    id: "independent-consultant",
    period: "2022 - 2024",
    role: "AI Consultant & Open-Source Architect",
    organization: "Independent Enterprise Consulting & GitHub",
    location: "Global / Remote",
    badge: "47+ GitHub Repos",
    badgeColor: "#10b981",
    icon: "fa-code",
    websiteUrl: "https://github.com/CodeSage4D",
    summary:
      "Created 47+ open-source GitHub repositories and built specialized ML prototypes including SentiVoice NLP and automated anomaly detection engines.",
    story:
      "Operated as an independent technical consultant for international and domestic clients. Designed SentiVoice—a voice-assisted sentiment analysis system with contextual negation resolution. Built web automation spiders, financial analytics tools, and resilient Python APIs.",
    founderImpact: [
      "Published 47+ public open-source software and ML codebases on GitHub (@CodeSage4D)",
      "Engineered automated NLP and voice analysis workflows with sentiment scoring",
      "Delivered end-to-end full-stack systems with streamlined database architectures",
    ],
    technologies: ["Python", "Streamlit", "Sentiment NLP", "Web Extractors", "RESTful APIs", "SQL", "Open Source"],
  },
  {
    id: "sait",
    period: "2020 - 2024",
    role: "B.Tech in Computer Science & Engineering",
    organization: "Sri Aurobindo Institute of Technology (SAIT)",
    location: "Indore, MP, India",
    badge: "B.Tech Degree",
    badgeColor: "#f59e0b",
    icon: "fa-graduation-cap",
    summary:
      "Graduated with a solid foundation in Data Structures, Advanced Machine Learning, Database Architecture, and Distributed Systems.",
    story:
      "Completed rigorous four-year engineering curriculum with focus on computational algorithms and AI systems. Built over 40 academic prototypes that catalyzed the founding of Aurxon.",
    founderImpact: [
      "Graduated with distinction in Machine Learning and System Design",
      "Led university technical project initiatives and hackathon teams",
      "Established foundational mastery of Python, Java, and Software Engineering",
    ],
    technologies: ["Data Structures", "Algorithms", "Object-Oriented Design", "DBMS", "Core Python & Java"],
  },
];

export const RoadTimelineExperience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("aurxon");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set([0]));
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Dynamic Scroll Line Tracing (NO Permanent Line: draws and moves down on scroll)
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far viewport center has traveled down this section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const triggerPoint = viewportHeight * 0.65;

      const relativeProgress = (triggerPoint - sectionTop) / sectionHeight;
      const clamped = Math.min(Math.max(relativeProgress, 0), 1);
      setScrollProgress(clamped);

      // Determine which milestone containers have been reached by the scrolling line
      const reached = new Set<number>();
      rowsRef.current.forEach((row, idx) => {
        if (!row) return;
        const rowRect = row.getBoundingClientRect();
        if (rowRect.top < triggerPoint + 60) {
          reached.add(idx);
        }
      });
      setActiveNodes(reached);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="road_timeline_area section_gap" id="timeline-section">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center">
          <div className="col-lg-9 text-center">
            <div className="main_title mb-5">
              <span className="road_section_badge heartbeat_soft">
                <span className="live_neon_tracer"></span>
                Career Road &bull; Journey of Innovation
              </span>
              <h2 className="mt-3">The Road Traveled</h2>
              <p className="section_header_sub">
                A dynamic zig-zag storytelling road. Watch the journey line trace forward as you scroll through computer science foundations, research at SUAS Indore, and the creation of Aurxon.
              </p>
            </div>
          </div>
        </div>

        {/* Storytelling Road Timeline Container */}
        <div className="road_timeline_wrapper">
          {/* Dedicated Milestones Track Area: Dynamic scroll line is strictly bounded within milestones */}
          <div className="milestones_track_area" ref={wrapperRef}>
            {/* Dynamic Scroll Road Track: Line dynamically grows down as user scrolls (NO permanent line) */}
            <div className="dynamic_road_track_container">
            <div
              className="dynamic_drawn_line"
              style={{
                height: `${scrollProgress * 100}%`,
                opacity: scrollProgress > 0.01 ? 1 : 0,
              }}
            >
              {/* Glowing neon tracer head moving down with the line */}
              {scrollProgress > 0.01 && (
                <div className="traveling_neon_head">
                  <div className="tracer_head_core"></div>
                  <div className="tracer_head_pulse"></div>
                </div>
              )}
            </div>
          </div>

          <div className="milestones_list">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              const isReached = activeNodes.has(index);
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    rowsRef.current[index] = el;
                  }}
                  className={`milestone_row ${isEven ? "row_left" : "row_right"} ${
                    isReached ? "is_reached" : "is_hidden"
                  }`}
                >
                  {/* Central Node Pin: Activates and illuminates when the scrolling line arrives */}
                  <div className="road_marker_pin_container">
                    <div
                      className={`road_marker_pin ${
                        item.isCurrent ? "pin_current heartbeat_fluctuate" : ""
                      } ${isReached ? "pin_active" : ""}`}
                      style={{
                        borderColor: isReached ? item.badgeColor : "rgba(148, 163, 184, 0.4)",
                        boxShadow: isReached
                          ? `0 0 20px ${item.badgeColor}80, 0 4px 14px rgba(0,0,0,0.2)`
                          : "none",
                      }}
                    >
                      <i className={`fa ${item.icon}`}></i>
                    </div>
                    {isReached && (
                      <div
                        className="road_marker_pulse_ring"
                        style={{ borderColor: item.badgeColor }}
                      ></div>
                    )}
                  </div>

                  {/* Milestone Content Container Card (Appears as scrolling line passes node) */}
                  <div className="milestone_card_container">
                    <div
                      className={`milestone_story_card ${
                        item.isCurrent ? "card_current_highlight" : ""
                      }`}
                    >
                      {/* Top Bar: Dates, Badge, and Official Logos */}
                      <div className="card_header_flex">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span className="milestone_period_badge">
                            <i className="fa fa-calendar-check-o mr-1"></i> {item.period}
                          </span>
                          <span
                            className="milestone_type_pill"
                            style={{
                              color: item.badgeColor,
                              borderColor: `${item.badgeColor}50`,
                              backgroundColor: `${item.badgeColor}15`,
                            }}
                          >
                            {item.badge}
                          </span>
                        </div>

                        {/* Official Institutional Logos (Aurxon & SUAS Indore) */}
                        {item.logoUrl && (
                          <div className="milestone_logo_badge" title={item.organization}>
                            <img
                              src={item.logoUrl}
                              alt={`${item.organization} Logo`}
                              className="milestone_org_img"
                            />
                          </div>
                        )}
                      </div>

                      {/* Role & Organization Title */}
                      <h3 className="milestone_role_title">{item.role}</h3>
                      <div className="milestone_org_row">
                        <span className="org_name">{item.organization}</span>
                        <span className="location_text">
                          <i className="fa fa-map-marker mr-1 text-primary"></i> {item.location}
                        </span>
                      </div>

                      {/* Tagline for Aurxon / Venture */}
                      {item.tagline && (
                        <div className="aurxon_tagline_banner mb-3">
                          <span className="tagline_spark">⚡</span>
                          <span>{item.tagline}</span>
                        </div>
                      )}

                      {/* Summary Narrative */}
                      <p className="milestone_summary_text">{item.summary}</p>

                      {/* Interactive Expandable Detailed Dossier */}
                      {isExpanded && (
                        <div className="milestone_expanded_details animate_fade_in">
                          <div className="detailed_story_paragraph">
                            <p>{item.story}</p>
                          </div>

                          <div className="founder_impact_box">
                            <h5 className="impact_heading">
                              <i className="fa fa-check-circle mr-1 text-primary"></i> Key Deliverables &amp; Enterprise Impact:
                            </h5>
                            <ul className="impact_list">
                              {item.founderImpact.map((imp, i) => (
                                <li key={i}>{imp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Technologies Stack Tags */}
                      <div className="milestone_tech_stack">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="tech_pill_item">
                            #{tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Bar: Website Button + Expand Toggle */}
                      <div className="milestone_action_bar">
                        {item.websiteUrl && (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn_milestone_website"
                            title={`Open ${item.organization} Official Site`}
                          >
                            <i className="fa fa-globe mr-1"></i>
                            <span>
                              {item.id === "aurxon" ? "Visit Aurxon Website" : `Visit ${item.organization}`} &rarr;
                            </span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="btn_milestone_toggle ml-auto"
                        >
                          <span>{isExpanded ? "Collapse Details" : "⚡ Technical Breakdown"}</span>
                          <i className={`fa ${isExpanded ? "fa-angle-up" : "fa-angle-down"}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>

          {/* Founder & Enterprise Collaboration Callout Banner - Cleanly Separated Below Milestones with High Z-Index */}
          <div className="founder_collab_card text-center mt-5">
            <div className="collab_inner">
              <span className="collab_eyebrow">
                <i className="fa fa-handshake-o mr-2"></i> FOUNDER PERSPECTIVE &bull; STRATEGIC VENTURING
              </span>
              <h3 className="collab_title">Deploy Next Gen AI Solutions with Aurxon</h3>
              <p className="collab_tagline_emphasis">Where Intelligence Meets Innovation</p>
              <p className="collab_desc">
                We partner with forward-thinking enterprises, healthcare facilities, and academic institutions to implement autonomous agents, neural architectures, and scalable full-stack software.
              </p>
              <div className="collab_cta_group">
                <a
                  href="#direct-contact-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("direct-contact-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="primary_btn"
                >
                  <span>
                    <i className="fa fa-comments mr-2"></i>Initiate Founder Discussion &rarr;
                  </span>
                </a>
                <a
                  href="mailto:karannmishra136@gmail.com"
                  className="primary_btn tr-bg"
                >
                  <span>
                    <i className="fa fa-envelope mr-2"></i>Direct Founder Email
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS for Dynamic Scroll Zig-Zag Road */}
      <style dangerouslySetInnerHTML={{ __html: `
        .road_timeline_area {
          position: relative;
          background: #f8fafc;
          padding: 90px 0;
          overflow: hidden;
          transition: background-color 0.3s ease;
        }

        .dark .road_timeline_area {
          background: transparent !important;
        }

        .road_section_badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(2, 132, 199, 0.1);
          color: #0284c7;
          border: 1px solid rgba(2, 132, 199, 0.25);
          border-radius: 50px;
          font-size: 0.84rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .dark .road_section_badge {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.35);
        }

        .live_neon_tracer {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 12px #38bdf8;
          display: inline-block;
        }

        .section_header_sub {
          max-width: 720px;
          margin: 12px auto 0;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #64748b;
        }

        .dark .section_header_sub {
          color: #94a3b8;
        }

        .road_timeline_wrapper {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .milestones_track_area {
          position: relative;
          padding: 20px 0;
        }

        /* Dynamic Drawing Scroll Track bounded strictly inside milestones (Never overlaps founder banner) */
        .dynamic_road_track_container {
          position: absolute;
          top: 35px;
          bottom: 35px;
          left: 50%;
          width: 6px;
          transform: translateX(-50%);
          background: transparent !important;
          border-radius: 6px;
          z-index: 1;
          pointer-events: none;
        }

        .dark .dynamic_road_track_container {
          background: transparent !important;
        }

        .dynamic_drawn_line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, #38bdf8 0%, #818cf8 40%, #e11d48 75%, #10b981 100%);
          border-radius: 6px;
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.6);
          transition: height 0.15s ease-out;
        }

        /* Glowing traveling head at the edge of the line */
        .traveling_neon_head {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
        }

        .tracer_head_core {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 12px #38bdf8, 0 0 24px #38bdf8;
          margin: 3px auto;
        }

        .tracer_head_pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid #38bdf8;
          animation: pingPulse 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pingPulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        .milestones_list {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 65px;
        }

        /* Zig-Zag Scroll Rows */
        .milestone_row {
          display: flex;
          align-items: flex-start;
          position: relative;
          width: 100%;
          transition: all 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .milestone_row.is_hidden {
          opacity: 0;
          pointer-events: none;
        }

        .milestone_row.row_left.is_hidden {
          transform: translateX(-60px) scale(0.95);
        }

        .milestone_row.row_right.is_hidden {
          transform: translateX(60px) scale(0.95);
        }

        .milestone_row.is_reached {
          opacity: 1;
          transform: translateX(0) scale(1);
          pointer-events: auto;
        }

        .milestone_row.row_left {
          justify-content: flex-start;
        }

        .milestone_row.row_right {
          justify-content: flex-end;
        }

        /* Central Node Pin */
        .road_marker_pin_container {
          position: absolute;
          left: 50%;
          top: 24px;
          transform: translate(-50%, 0);
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .road_marker_pin {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 1.15rem;
          opacity: 0.2;
          transform: scale(0.75);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .road_marker_pin {
          background: #0f172a;
          color: #64748b;
          border-color: #334155;
        }

        .road_marker_pin.pin_active {
          opacity: 1;
          transform: scale(1.08);
          color: #0f172a;
        }

        .dark .road_marker_pin.pin_active {
          color: #ffffff;
        }

        .road_marker_pulse_ring {
          position: absolute;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1.5px dashed;
          animation: ringPulse 2.8s linear infinite;
        }

        @keyframes ringPulse {
          0% { transform: scale(0.85); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.25; }
          100% { transform: scale(0.85); opacity: 0.8; }
        }

        /* Milestone Card */
        .milestone_card_container {
          width: 45%;
        }

        .milestone_story_card {
          background: #ffffff;
          border: none !important;
          outline: none !important;
          border-radius: 24px;
          padding: 28px 30px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
          position: relative;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .milestone_story_card {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: none !important;
          outline: none !important;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
        }

        /* Hover Elevation without Blue Outline */
        .milestone_story_card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.12);
        }

        .dark .milestone_story_card:hover {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8) !important;
        }

        .card_current_highlight {
          border-color: rgba(2, 132, 199, 0.45);
        }

        .card_header_flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 10px;
        }

        .milestone_period_badge {
          font-size: 0.78rem;
          font-weight: 750;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .dark .milestone_period_badge {
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
        }

        .milestone_type_pill {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 50px;
          border: 1px solid;
          text-transform: uppercase;
        }

        .milestone_logo_badge {
          height: 34px;
          padding: 4px 10px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .dark .milestone_logo_badge {
          background: rgba(255, 255, 255, 0.95);
        }

        .milestone_org_img {
          max-height: 26px;
          max-width: 90px;
          object-fit: contain;
        }

        .milestone_role_title {
          font-size: 1.35rem;
          font-weight: 850;
          color: #0f172a;
          margin: 0 0 6px 0;
          letter-spacing: -0.2px;
        }

        .dark .milestone_role_title {
          color: #ffffff;
        }

        .milestone_org_row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .org_name {
          font-weight: 800;
          color: #0284c7;
        }

        .dark .org_name {
          color: #38bdf8;
        }

        .location_text {
          color: #64748b;
          font-weight: 600;
        }

        .dark .location_text {
          color: #94a3b8;
        }

        /* Aurxon Tagline Banner */
        .aurxon_tagline_banner {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(168, 85, 247, 0.1));
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 0.82rem;
          font-weight: 750;
          color: #0369a1;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dark .aurxon_tagline_banner {
          background: rgba(56, 189, 248, 0.12);
          color: #7dd3fc;
        }

        .tagline_spark {
          font-size: 0.9rem;
        }

        .milestone_summary_text {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #334155;
          margin-bottom: 14px;
        }

        .dark .milestone_summary_text {
          color: #cbd5e1;
        }

        /* Expanded Details */
        .milestone_expanded_details {
          border-top: 1px dashed rgba(226, 232, 240, 0.8);
          padding-top: 14px;
          margin-top: 10px;
        }

        .dark .milestone_expanded_details {
          border-top-color: rgba(255, 255, 255, 0.1);
        }

        .detailed_story_paragraph {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #475569;
          margin-bottom: 12px;
        }

        .dark .detailed_story_paragraph {
          color: #cbd5e1;
        }

        .founder_impact_box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 14px;
        }

        .dark .founder_impact_box {
          background: rgba(15, 23, 42, 0.5);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .impact_heading {
          font-size: 0.84rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .dark .impact_heading {
          color: #ffffff;
        }

        .impact_list {
          margin: 0;
          padding-left: 18px;
          font-size: 0.84rem;
          color: #475569;
          line-height: 1.55;
        }

        .dark .impact_list {
          color: #cbd5e1;
        }

        /* Tech Pills */
        .milestone_tech_stack {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin: 12px 0;
        }

        .tech_pill_item {
          font-size: 0.76rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
          background: rgba(2, 132, 199, 0.08);
          color: #0284c7;
          border: 1px solid rgba(2, 132, 199, 0.15);
          transition: all 0.2s ease;
        }

        .dark .tech_pill_item {
          background: rgba(56, 189, 248, 0.1);
          color: #7dd3fc;
          border-color: rgba(56, 189, 248, 0.2);
        }

        .tech_pill_item:hover {
          background: #0284c7;
          color: #ffffff;
        }

        /* Action Bar */
        .milestone_action_bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(226, 232, 240, 0.7);
        }

        .dark .milestone_action_bar {
          border-top-color: rgba(255, 255, 255, 0.08);
        }

        .btn_milestone_website {
          font-size: 0.84rem;
          font-weight: 750;
          color: #0284c7;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(2, 132, 199, 0.1);
          border: 1px solid rgba(2, 132, 199, 0.25);
          transition: all 0.2s ease;
        }

        .dark .btn_milestone_website {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.15);
          border-color: rgba(56, 189, 248, 0.35);
        }

        .btn_milestone_website:hover {
          background: #0284c7;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .btn_milestone_toggle {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.84rem;
          font-weight: 750;
          color: #64748b;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }

        .dark .btn_milestone_toggle {
          color: #94a3b8;
        }

        .btn_milestone_toggle:hover {
          color: #0284c7;
        }

        /* Founder Collaboration Banner - Cleanly separated below milestones with high z-index and borderless design */
        .founder_collab_card {
          position: relative;
          z-index: 10;
          clear: both;
          margin-top: 60px;
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(133, 79, 238, 0.09) 100%);
          border: none !important;
          outline: none !important;
          border-radius: 28px;
          padding: 42px 30px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 14px 40px rgba(2, 132, 199, 0.12);
        }

        .dark .founder_collab_card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.9) 100%);
          border: none !important;
          outline: none !important;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7);
        }

        .collab_eyebrow {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #0284c7;
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }

        .dark .collab_eyebrow {
          color: #38bdf8;
        }

        .collab_title {
          font-size: 2rem;
          font-weight: 850;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .dark .collab_title {
          color: #ffffff;
        }

        .collab_tagline_emphasis {
          font-size: 1.05rem;
          font-weight: 750;
          color: #0284c7;
          margin-bottom: 12px;
        }

        .dark .collab_tagline_emphasis {
          color: #38bdf8;
        }

        .collab_desc {
          max-width: 680px;
          margin: 0 auto 24px;
          font-size: 1.02rem;
          line-height: 1.7;
          color: #475569;
        }

        .dark .collab_desc {
          color: #cbd5e1;
        }

        .collab_cta_group {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Mobile & Tablet Responsive */
        @media (max-width: 991px) {
          .dynamic_road_track_container {
            left: 28px;
          }

          .road_marker_pin_container {
            left: 28px;
          }

          .milestone_row.row_left,
          .milestone_row.row_right {
            justify-content: flex-end;
          }

          .milestone_card_container {
            width: calc(100% - 65px);
          }

          .collab_title {
            font-size: 1.6rem;
          }
        }
      `}} />
    </section>
  );
};
