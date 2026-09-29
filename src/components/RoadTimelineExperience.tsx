"use client";

import React from "react";

interface Milestone {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  badge: string;
  icon: string;
  story: string;
  technologies: string[];
  isCurrent?: boolean;
}

const milestones: Milestone[] = [
  {
    id: "aurxon",
    period: "August 2024 - Present",
    role: "Founder & Chief AI Architect",
    organization: "Aurxon (formerly i AIM LABS)",
    location: "Smart City Indore, MP, India",
    badge: "Current Venture",
    icon: "fa-rocket",
    story:
      "Founded Aurxon with a mission to deliver production-grade AI platforms, intelligent automation, and enterprise infrastructure for growing Tier-II, III & IV markets. Architected Aurxon ERP Lite for institutions, Cognivex for semantic AI career intelligence using deep sentence transformers, and HemoAI for predictive medical blood prioritization.",
    technologies: ["Python", "AI/ML Systems", "Next.js", "PyTorch", "Enterprise ERP", "NLP Embeddings", "FastAPI"],
    isCurrent: true,
  },
  {
    id: "geek-theory",
    period: "March 2024 - July 2024",
    role: "Research & Development Intern",
    organization: "Geek Theory Pvt. Ltd.",
    location: "Indore, MP, India",
    badge: "R&D Engineering",
    icon: "fa-cogs",
    story:
      "Spearheaded research and engineering of cross-platform Cordova hardware plugins. Enhanced and fine-tuned machine learning classification pipelines, increasing prediction accuracy while optimizing throughput for real-time mobile inference environments.",
    technologies: ["Machine Learning", "Cordova Plugins", "Python", "Mobile Architecture", "Pipeline Optimization"],
  },
  {
    id: "freelance",
    period: "January 2022 - December 2023",
    role: "ML & Full-Stack Freelance Consultant",
    organization: "Independent & Global Clients",
    location: "Remote / Hybrid",
    badge: "Consulting & Open Source",
    icon: "fa-code",
    story:
      "Delivered customized machine learning models and full-stack software. Built SentiVoice (voice-assisted NLP sentiment engine with negation handling), automated web data extractors with BeautifulSoup, anomaly detection pipelines, and high-performance web applications.",
    technologies: ["Python", "Streamlit", "Sentiment NLP", "Web Scraping", "Core Java", "RESTful APIs", "SQL"],
  },
  {
    id: "sait",
    period: "2020 - 2024",
    role: "B.Tech in Computer Science & Engineering",
    organization: "Sri Aurobindo Institute of Technology (SAIT)",
    location: "Indore, MP, India",
    badge: "B.Tech Degree",
    icon: "fa-graduation-cap",
    story:
      "Graduated with a specialized foundation in Machine Learning, Data Analytics, Object-Oriented System Design, and Algorithms. Developed 40+ GitHub codebases and academic research prototypes, establishing the groundwork for future AI venture architecture.",
    technologies: ["Data Structures", "Algorithms", "Machine Learning", "Software Engineering", "DBMS"],
  },
];

export const RoadTimelineExperience: React.FC = () => {
  return (
    <section className="road_timeline_area section_gap">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="main_title mb-5">
              <span className="road_section_badge heartbeat_soft">
                <i className="fa fa-road mr-2"></i> Career Road &bull; Journey of Innovation
              </span>
              <h2 className="mt-3">The Road Traveled</h2>
              <p>
                A storytelling timeline tracking my evolution from computer science foundations to hands-on R&amp;D and founding Aurxon.
              </p>
            </div>
          </div>
        </div>

        {/* Storytelling Road Timeline Container */}
        <div className="road_timeline_wrapper">
          {/* Animated Central Road Track */}
          <div className="road_track_line">
            <div className="road_track_glow"></div>
            <div className="road_center_dash"></div>
          </div>

          <div className="milestones_list">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`milestone_row ${isEven ? "row_left" : "row_right"}`}
                >
                  {/* Central Road Marker Pin with Heartbeat Pulse */}
                  <div className="road_marker_pin_container">
                    <div
                      className={`road_marker_pin ${
                        item.isCurrent ? "pin_current heartbeat_fluctuate" : ""
                      }`}
                    >
                      <i className={`fa ${item.icon}`}></i>
                    </div>
                    <div className="road_marker_pulse_ring"></div>
                  </div>

                  {/* Milestone Content Story Card */}
                  <div className="milestone_card_container">
                    <div
                      className={`milestone_story_card ${
                        item.isCurrent ? "card_current_highlight" : ""
                      }`}
                    >
                      <div className="card_header_flex">
                        <div>
                          <span className="milestone_period_badge">
                            <i className="fa fa-calendar-check-o mr-1"></i> {item.period}
                          </span>
                          <span className="milestone_type_pill">{item.badge}</span>
                        </div>
                        {item.isCurrent && (
                          <div className="live_active_indicator">
                            <span className="live_active_dot heartbeat_fluctuate"></span>
                            Active Now
                          </div>
                        )}
                      </div>

                      <h3 className="milestone_role_title">{item.role}</h3>
                      <div className="milestone_org_row">
                        <span className="org_name">{item.organization}</span>
                        <span className="location_text">
                          <i className="fa fa-map-marker text-muted mr-1"></i> {item.location}
                        </span>
                      </div>

                      <p className="milestone_story_narrative">{item.story}</p>

                      <div className="milestone_tech_stack">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="tech_pill_item">
                            #{tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End of Road Destination Flag */}
          <div className="road_destination_finish text-center mt-5">
            <div className="destination_flag_badge heartbeat_soft">
              <i className="fa fa-flag-checkered mr-2"></i>
              <span>Next Milestone Ahead: Building Scalable AI at Aurxon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Road Timeline Scoped Styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .road_timeline_area {
          position: relative;
          background: #f8fafc;
          padding: 80px 0;
          overflow: hidden;
          transition: background-color 0.3s ease;
        }

        .dark .road_timeline_area {
          background: #090d16 !important;
        }

        .road_section_badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          background: rgba(68, 88, 220, 0.1);
          color: #4458dc;
          border: 1px solid rgba(68, 88, 220, 0.25);
          border-radius: 50px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .dark .road_section_badge {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
          border-color: rgba(99, 102, 241, 0.3);
        }

        .road_timeline_wrapper {
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
          padding: 30px 0;
        }

        /* Central Road Track Line */
        .road_track_line {
          position: absolute;
          top: 0;
          bottom: 40px;
          left: 50%;
          width: 8px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, #4458dc 0%, #854fee 50%, #10b981 100%);
          border-radius: 6px;
          box-shadow: 0 0 16px rgba(68, 88, 220, 0.3);
        }

        .dark .road_track_line {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }

        .milestones_list {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .milestone_row {
          display: flex;
          align-items: center;
          position: relative;
          width: 100%;
        }

        .milestone_row.row_left {
          justify-content: flex-start;
        }

        .milestone_row.row_right {
          justify-content: flex-end;
        }

        .milestone_card_container {
          width: 45%;
        }

        /* Central Marker Pin */
        .road_marker_pin_container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .road_marker_pin {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #4458dc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4458dc;
          font-size: 1.25rem;
          box-shadow: 0 8px 20px rgba(68, 88, 220, 0.25);
          transition: all 0.3s ease;
        }

        .dark .road_marker_pin {
          background: #0f172a;
          border-color: #818cf8;
          color: #818cf8;
          box-shadow: 0 8px 25px rgba(129, 140, 248, 0.3);
        }

        .road_marker_pin.pin_current {
          background: linear-gradient(135deg, #4458dc, #854fee);
          color: #ffffff;
          border-color: #ffffff;
        }

        /* Story Cards */
        .milestone_story_card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 18px;
          padding: 26px 28px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
          transition: all 0.3s ease;
          position: relative;
        }

        .dark .milestone_story_card {
          background: #131c31;
          border-color: #1e293b;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
        }

        .milestone_story_card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 40px rgba(68, 88, 220, 0.15);
          border-color: rgba(99, 102, 241, 0.4);
        }

        .milestone_story_card.card_current_highlight {
          border-left: 4px solid #4458dc;
        }

        .card_header_flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .milestone_period_badge {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #4458dc;
          background: #eef2ff;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .dark .milestone_period_badge {
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
        }

        .milestone_type_pill {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 600;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 20px;
          margin-left: 8px;
        }

        .dark .milestone_type_pill {
          background: #1e293b;
          color: #94a3b8;
        }

        .live_active_indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #10b981;
          text-transform: uppercase;
        }

        .live_active_dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .milestone_role_title {
          font-size: 1.26rem;
          font-weight: 800;
          color: #0f172a;
          margin: 6px 0;
          line-height: 1.3;
        }

        .dark .milestone_role_title {
          color: #ffffff;
        }

        .milestone_org_row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          font-size: 0.92rem;
          margin-bottom: 14px;
        }

        .org_name {
          font-weight: 700;
          color: #4458dc;
        }

        .dark .org_name {
          color: #818cf8;
        }

        .location_text {
          font-size: 0.84rem;
          color: #64748b;
        }

        .dark .location_text {
          color: #94a3b8;
        }

        .milestone_story_narrative {
          font-size: 0.92rem;
          line-height: 1.68;
          color: #334155;
          margin-bottom: 16px;
        }

        .dark .milestone_story_narrative {
          color: #cbd5e1;
        }

        .milestone_tech_stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech_pill_item {
          font-size: 0.76rem;
          font-weight: 600;
          color: #475569;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 3px 10px;
          border-radius: 6px;
        }

        .dark .tech_pill_item {
          background: #0f172a;
          border-color: #1e293b;
          color: #94a3b8;
        }

        .destination_flag_badge {
          display: inline-flex;
          align-items: center;
          padding: 12px 26px;
          background: linear-gradient(135deg, #4458dc 0%, #854fee 100%);
          color: #ffffff;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.94rem;
          box-shadow: 0 10px 24px rgba(68, 88, 220, 0.35);
        }

        /* Mobile Road Responsiveness */
        @media (max-width: 991px) {
          .road_track_line {
            left: 28px;
            transform: none;
          }

          .road_marker_pin_container {
            left: 28px;
            transform: translateX(-50%);
          }

          .milestone_row.row_left,
          .milestone_row.row_right {
            justify-content: flex-end;
          }

          .milestone_card_container {
            width: calc(100% - 65px);
          }

          .road_marker_pin {
            width: 42px;
            height: 42px;
            font-size: 1.1rem;
          }
        }
      `}} />
    </section>
  );
};
