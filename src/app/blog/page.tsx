"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getAllBlogs, BlogPost } from "@/lib/cms-store";

const VECTOR_THUMBNAILS = [
  { src: "/img/vectors/vector-ui-analytics-3d.jpeg", alt: "Real-time Telemetry & 3D Analytics Engine" },
  { src: "/img/vectors/vector-scalable-solutions.jpeg", alt: "Distributed Autonomous Node Scalability" },
  { src: "/img/vectors/vector-office-pc.jpeg", alt: "Edge Compute & Industrial Automation Topography" },
  { src: "/img/vectors/vector-hybrid-apps.jpeg", alt: "Cross-Platform Agentic Mesh Control" },
  { src: "/img/vectors/vector-enterprising-man.jpeg", alt: "Engineering Sprint & High-Availability Operations" },
  { src: "/img/vectors/vector-developer.jpeg", alt: "Deep Tech Research & Core Architecture" },
  { src: "/img/vectors/vector-ui-animation-screens.jpeg", alt: "Reactive Telemetry Screens & Real-Time Dashboards" },
  { src: "/img/vectors/vector-b2b-growth.jpeg", alt: "Enterprise Scale & Deterministic Data Ingestion" },
  { src: "/img/vectors/vector-brand-trust.jpeg", alt: "Mission-Critical Production Verification & Reliability" },
  { src: "/img/vectors/vector-worker-creative.jpeg", alt: "Engineering Craftsmanship & Zero-Failure Protocols" },
  { src: "/img/vectors/vector-freelance-concept.jpeg", alt: "Applied AI Research & Academic Dissemination" },
  { src: "/img/vectors/vector-anime-avatar.jpeg", alt: "Cybernetic Creator Persona & Systems Architect" },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarAvatarMode, setSidebarAvatarMode] = useState<"photo" | "anime">("photo");
  const [activeVectorIndex, setActiveVectorIndex] = useState<number>(0);

  const loadBlogs = () => {
    setBlogs(getAllBlogs());
  };

  useEffect(() => {
    loadBlogs();
    const handleUpdate = () => loadBlogs();
    window.addEventListener("ahs_cms_updated", handleUpdate);
    return () => window.removeEventListener("ahs_cms_updated", handleUpdate);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat =
        selectedCategory === "All" || b.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery.trim() ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <>
      {/* ================= HIGH-TECH CYBERNETIC CODEX HERO BANNER ================= */}
      {/* Replaces the bland legacy purple banner with an ultra-futuristic research archive header */}
      <section className="research_codex_hero_banner">
        <div className="codex_matrix_grid"></div>
        <div className="codex_aurora_glow_cyan"></div>
        <div className="codex_aurora_glow_purple"></div>

        <div className="container position-relative py-5">
          <div className="row justify-content-center">
            <div className="col-xl-10 text-center">
              {/* Telemetry Micro-Pill Dock */}
              <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap mb-3">
                <span className="codex_telemetry_chip">
                  <span className="telemetry_pulse_dot"></span>
                  <span className="font-mono">AURXON ENGINEERING NOTES &bull; OPEN ACCESS</span>
                </span>
                <span className="codex_telemetry_chip gold">
                  <i className="fa fa-certificate mr-1 text-gold"></i>
                  <span className="font-mono">IEEE FORMAT &bull; PRODUCTION VERIFIED</span>
                </span>
                <span className="codex_telemetry_chip cyan">
                  <i className="fa fa-print mr-1 text-cyan"></i>
                  <span className="font-mono">IEEE PDF ENGINE ACTIVE</span>
                </span>
              </div>

              {/* Main Glowing Gradient Title */}
              <h1 className="codex_hero_title mb-3">
                Engineering Notes &amp; Architecture Breakdowns
              </h1>

              {/* Subtitle */}
              <p className="codex_hero_subtitle mb-4">
                Practical breakdowns, architecture notes, and lessons I&apos;ve learned while building real-world software and autonomous systems at Aurxon. No AI-generated fluff—browse complete technical write-ups, listen to voice audio digests, or download clean IEEE formatted notes.
              </p>

              {/* Quick Navigation Breadcrumb & Stats Matrix */}
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap codex_meta_nav">
                <div className="codex_breadcrumb">
                  <Link href="/" className="crumb_link">
                    <i className="fa fa-home mr-1"></i> Home
                  </Link>
                  <span className="crumb_sep">&bull;</span>
                  <span className="crumb_current">Engineering Notes</span>
                  <span className="crumb_sep">&bull;</span>
                  <span className="crumb_category text-cyan">{selectedCategory}</span>
                </div>

                <div className="codex_stat_pill">
                  <span className="text-gold font-weight-bold">{blogs.length}</span>
                  <span className="text-muted ml-1 font-mono">Total Notes &amp; Breakdowns</span>
                </div>

                <div className="codex_stat_pill">
                  <span className="text-cyan font-weight-bold">100%</span>
                  <span className="text-muted ml-1 font-mono">Open Access (CC-BY 4.0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESEARCH CODEX LISTING & REPOSITORY ================= */}
      <section className="blog_area section_gap codex_content_section">
        <div className="container">
          {/* Futuristic Filter & Live Search Command Dock */}
          <div className="codex_command_bar mb-5">
            <div className="category_pill_list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`codex_cat_btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  {cat === "All" ? (
                    <span className="cat_counter">{blogs.length}</span>
                  ) : (
                    <span className="cat_counter">
                      {blogs.filter((b) => b.category.toLowerCase() === cat.toLowerCase()).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="codex_search_wrapper">
              <i className="fa fa-search codex_search_icon"></i>
              <input
                type="text"
                placeholder="Search FCOS, ALAMS, Neural ERP, Machine Vision, PLC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="codex_search_input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="codex_search_clear"
                  onClick={() => setSearchQuery("")}
                  title="Clear search query"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          <div className="row">
            {/* Main Publications Column */}
            <div className="col-lg-8">
              <div className="codex_posts_stream">
                {filteredBlogs.length === 0 ? (
                  <div className="empty_codex_box text-center p-5">
                    <div className="empty_radar_icon mb-3">📡</div>
                    <h3 className="text-white font-weight-bold">No Research Publications Found</h3>
                    <p className="text-muted small">
                      No matching engineering notes found for &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
                    </p>
                    <button
                      className="primary_btn mt-3"
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                    >
                      <span>Reset Filters &bull; Show All Notes</span>
                    </button>
                  </div>
                ) : (
                  filteredBlogs.map((blog, idx) => {
                    const thumb = VECTOR_THUMBNAILS[idx % VECTOR_THUMBNAILS.length];
                    return (
                      <article key={blog.id} className="codex_article_card mb-5">
                        <div className="row g-0 align-items-stretch">
                          {/* Vector Illustration & Visual Thumbnail Header */}
                          <div className="col-md-5 codex_thumb_wrapper">
                            <div className="thumb_image_container h-100">
                              <img
                                src={thumb.src}
                                alt={thumb.alt}
                                className="codex_vector_img"
                                loading="lazy"
                              />
                              <div className="thumb_overlay_gradient"></div>
                              <div className="thumb_top_badge">
                                <span className="vector_label font-mono">
                                  <i className="fa fa-cube mr-1 text-gold"></i> FIGURE {idx + 1}.0
                                </span>
                              </div>
                              <div className="thumb_bottom_pill font-mono">
                                <i className="fa fa-shield text-success mr-1"></i> VERIFIED
                              </div>
                            </div>
                          </div>

                          {/* Technical Information & Actions */}
                          <div className="col-md-7 codex_article_details d-flex flex-column justify-content-between p-4">
                            <div>
                              <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-2">
                                <span className="codex_cat_badge font-mono">
                                  {blog.category}
                                </span>
                                <span className="codex_read_time font-mono small text-muted">
                                  <i className="fa fa-clock-o mr-1 text-cyan"></i> {blog.readTime}
                                </span>
                              </div>

                              <h3 className="codex_paper_title">
                                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                              </h3>

                              <p className="codex_paper_summary">{blog.summary}</p>

                              <div className="codex_tags_row mb-3">
                                {blog.tags.slice(0, 4).map((tag, tIdx) => (
                                  <span key={tIdx} className="codex_tag_pill">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="codex_card_action_dock pt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src="/img/founder/karan_mishra_founder.jpg"
                                  alt="Karan Mishra"
                                  className="codex_mini_author_avatar"
                                />
                                <div className="codex_author_meta">
                                  <span className="font-weight-bold text-white small d-block">
                                    Karan Mishra
                                  </span>
                                  <span className="text-muted font-mono" style={{ fontSize: "0.72rem" }}>
                                    {blog.publishedDate}
                                  </span>
                                </div>
                              </div>

                              <div className="d-flex align-items-center gap-2">
                                <Link
                                  href={`/blog/${blog.slug}`}
                                  className="btn_codex_read"
                                  title="Read complete engineering breakdown"
                                >
                                  <span>⚡ Read Note</span>
                                </Link>
                                <Link
                                  href={`/blog/${blog.slug}#print`}
                                  className="btn_codex_pdf"
                                  title="Export formatted IEEE Standard PDF note"
                                >
                                  <i className="fa fa-print mr-1"></i> IEEE PDF
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>

            {/* Sidebar Column: Author Dossier, Vector Codex Spotlight & Topics */}
            <div className="col-lg-4">
              <aside className="codex_sidebar">
                {/* Author Dossier Widget with Photo & Anime Avatar Switcher */}
                <div className="sidebar_glass_card p-4 mb-4">
                  <div className="text-center">
                    <div className="position-relative d-inline-block mb-3">
                      <div className="sidebar_avatar_ring">
                        <img
                          src={
                            sidebarAvatarMode === "photo"
                              ? "/img/founder/karan_mishra_founder.jpg"
                              : "/img/vectors/vector-anime-avatar.jpeg"
                          }
                          alt="Karan Mishra - Founder & Architect"
                          className="sidebar_author_img"
                        />
                      </div>
                      <span className="sidebar_status_beacon" title="Systems Active"></span>
                    </div>

                    {/* Mode Toggle Button */}
                    <div className="d-flex justify-content-center mb-3">
                      <div className="avatar_switcher_dock">
                        <button
                          type="button"
                          className={`switch_pill ${sidebarAvatarMode === "photo" ? "active" : ""}`}
                          onClick={() => setSidebarAvatarMode("photo")}
                        >
                          📷 Photo
                        </button>
                        <button
                          type="button"
                          className={`switch_pill ${sidebarAvatarMode === "anime" ? "active" : ""}`}
                          onClick={() => setSidebarAvatarMode("anime")}
                        >
                          ⚡ Anime
                        </button>
                      </div>
                    </div>

                    <h4 className="sidebar_author_name text-white font-weight-bold mb-1">
                      Karan Mishra
                    </h4>
                    <div className="text-gold font-mono small mb-2">
                      @CodeSage4D &bull; Lead Systems Architect
                    </div>
                    <p className="sidebar_bio_text small text-muted mb-3">
                      Architecting intelligent factory operating systems (FCOS), autonomous agentic management networks (ALAMS), and high-performance machine vision platforms at Aurxon &amp; SUAS Indore.
                    </p>

                    <div className="sidebar_social_row d-flex justify-content-center gap-2 mb-3">
                      <a
                        href="https://github.com/CodeSage4D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sidebar_social_btn"
                        title="GitHub @CodeSage4D"
                      >
                        <i className="fa fa-github"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/karannmishra136"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sidebar_social_btn"
                        title="LinkedIn: @karannmishra136"
                      >
                        <i className="fa fa-linkedin"></i>
                      </a>
                      <a
                        href="mailto:karannmishra136@gmail.com"
                        className="sidebar_social_btn"
                        title="Email Karan Mishra"
                      >
                        <i className="fa fa-envelope-o"></i>
                      </a>
                    </div>

                    <Link href="/contact" className="primary_btn btn-block btn-sm">
                      <span>🚀 Direct Engineering Inquiry &rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Vector Architecture Blueprint Spotlight (Featuring All Vector Images) */}
                <div className="sidebar_glass_card p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="font-mono text-cyan small font-weight-bold">
                      <i className="fa fa-cubes mr-1"></i> VECTOR SCHEMATIC CODEX
                    </span>
                    <span className="badge badge-dark border border-secondary text-gold font-mono small">
                      {activeVectorIndex + 1} / {VECTOR_THUMBNAILS.length}
                    </span>
                  </div>

                  <div className="vector_spotlight_frame mb-3 position-relative rounded overflow-hidden">
                    <img
                      src={VECTOR_THUMBNAILS[activeVectorIndex].src}
                      alt={VECTOR_THUMBNAILS[activeVectorIndex].alt}
                      className="vector_spotlight_img w-100"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="vector_spotlight_caption p-2">
                      <span className="small text-white font-weight-bold d-block">
                        {VECTOR_THUMBNAILS[activeVectorIndex].alt}
                      </span>
                    </div>
                  </div>

                  {/* Micro Thumbnail Selector Strip */}
                  <div className="d-flex gap-2 overflow-auto py-1 mb-3 micro_strip">
                    {VECTOR_THUMBNAILS.map((v, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveVectorIndex(i)}
                        className={`micro_thumb_btn ${activeVectorIndex === i ? "active" : ""}`}
                        title={v.alt}
                      >
                        <img src={v.src} alt={v.alt} />
                      </button>
                    ))}
                  </div>

                  <p className="text-muted small mb-0 font-mono" style={{ fontSize: "0.75rem" }}>
                    &bull; Standardized vector assets utilized across all peer-reviewed Aurxon publications and A4 printable monographs.
                  </p>
                </div>

                {/* Core Research Topics Widget */}
                <div className="sidebar_glass_card p-4 mb-4">
                  <h5 className="text-white font-weight-bold mb-3 font-mono" style={{ fontSize: "0.95rem" }}>
                    <i className="fa fa-microchip mr-2 text-gold"></i> CORE RESEARCH VECTORS
                  </h5>
                  <ul className="list-unstyled mb-0 codex_topics_list font-mono small">
                    <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
                      <span>Factory Central OS (FCOS)</span>
                      <span className="badge badge-primary py-1">AIMS v4</span>
                    </li>
                    <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
                      <span>ALAMS Swarm Intelligence</span>
                      <span className="badge badge-info py-1">Multi-Agent</span>
                    </li>
                    <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
                      <span>Neural ERP &amp; Determinism</span>
                      <span className="badge badge-warning py-1 text-dark">ACID + ML</span>
                    </li>
                    <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
                      <span>Cognivex Vision &amp; Robotics</span>
                      <span className="badge badge-success py-1">Sub-10ms</span>
                    </li>
                    <li className="d-flex justify-content-between py-2">
                      <span>IEEE Standard PDF Engine</span>
                      <span className="badge badge-light py-1 text-dark">IEEE Format</span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCOPED COMPONENT CSS ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hero Banner */
        .research_codex_hero_banner {
          position: relative;
          background: linear-gradient(135deg, #060913 0%, #0d1527 50%, #070e1c 100%);
          padding: 130px 0 70px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .codex_matrix_grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 85%);
          pointer-events: none;
        }
        .codex_aurora_glow_cyan {
          position: absolute;
          top: -20%;
          left: 20%;
          width: 500px;
          height: 350px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, transparent 70%);
          filter: blur(70px);
          pointer-events: none;
        }
        .codex_aurora_glow_purple {
          position: absolute;
          top: -10%;
          right: 20%;
          width: 500px;
          height: 350px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, transparent 70%);
          filter: blur(70px);
          pointer-events: none;
        }
        .codex_telemetry_chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #94a3b8;
          backdrop-filter: blur(10px);
        }
        .codex_telemetry_chip.gold {
          background: rgba(206, 161, 122, 0.1);
          border-color: rgba(206, 161, 122, 0.3);
          color: #CEA17A;
        }
        .codex_telemetry_chip.cyan {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.3);
          color: #38bdf8;
        }
        .telemetry_pulse_dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .codex_hero_title {
          font-size: 2.75rem;
          font-weight: 900;
          line-height: 1.25;
          color: #ffffff;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 25px rgba(0, 0, 0, 0.8);
          background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 80%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .codex_hero_subtitle {
          max-width: 820px;
          margin: 0 auto;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #94a3b8;
        }
        .codex_hero_subtitle strong {
          color: #ffffff;
        }
        .codex_meta_nav {
          margin-top: 15px;
        }
        .codex_breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.82rem;
        }
        .crumb_link {
          color: #94a3b8;
          text-decoration: none !important;
          transition: color 0.15s ease;
        }
        .crumb_link:hover {
          color: #38bdf8;
        }
        .crumb_sep {
          color: rgba(255, 255, 255, 0.2);
        }
        .crumb_current {
          color: #ffffff;
          font-weight: 600;
        }
        .codex_stat_pill {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.8rem;
        }

        /* Command Bar */
        .codex_command_bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 14px 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .category_pill_list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .codex_cat_btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .codex_cat_btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
        .codex_cat_btn.active {
          background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%) !important;
          color: #ffffff !important;
          border-color: #38bdf8 !important;
          box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);
        }
        .cat_counter {
          font-size: 0.7rem;
          font-family: monospace;
          background: rgba(0, 0, 0, 0.3);
          padding: 1px 6px;
          border-radius: 10px;
        }
        .codex_search_wrapper {
          position: relative;
          min-width: 290px;
          flex: 1;
          max-width: 400px;
        }
        .codex_search_icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 0.85rem;
        }
        .codex_search_input {
          width: 100%;
          padding: 9px 36px 9px 38px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(8, 14, 28, 0.8);
          color: #ffffff;
          font-size: 0.86rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .codex_search_input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
        }
        .codex_search_clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 1.2rem;
          cursor: pointer;
        }

        /* Article Cards Stream */
        .codex_article_card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        }
        .dark .codex_article_card {
          background: rgba(15, 23, 42, 0.65);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .codex_article_card:hover {
          transform: translateY(-5px);
          border-color: rgba(6, 182, 212, 0.5);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15), 0 0 30px rgba(6, 182, 212, 0.2);
        }
        .dark .codex_article_card:hover {
          border-color: rgba(6, 182, 212, 0.6);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.25);
        }
        .codex_thumb_wrapper {
          position: relative;
          min-height: 240px;
          overflow: hidden;
        }
        .codex_vector_img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .codex_article_card:hover .codex_vector_img {
          transform: scale(1.06);
        }
        .thumb_overlay_gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6, 9, 19, 0.1) 0%, rgba(6, 9, 19, 0.7) 100%);
        }
        .thumb_top_badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
        }
        .vector_label {
          font-size: 0.72rem;
          font-weight: 800;
          background: rgba(7, 12, 22, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
          backdrop-filter: blur(8px);
        }
        .thumb_bottom_pill {
          position: absolute;
          bottom: 14px;
          left: 14px;
          font-size: 0.7rem;
          background: rgba(7, 12, 22, 0.85);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34d399;
          padding: 3px 8px;
          border-radius: 4px;
          z-index: 2;
        }
        .codex_cat_badge {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #38bdf8;
          background: rgba(2, 132, 199, 0.15);
          border: 1px solid rgba(2, 132, 199, 0.3);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .codex_paper_title {
          font-size: 1.35rem;
          font-weight: 800;
          line-height: 1.35;
          margin-bottom: 10px;
        }
        .codex_paper_title a {
          color: #0f172a;
          text-decoration: none !important;
          transition: color 0.15s ease;
        }
        .dark .codex_paper_title a {
          color: #ffffff;
        }
        .codex_paper_title a:hover {
          color: #0284c7;
        }
        .dark .codex_paper_title a:hover {
          color: #38bdf8;
        }
        .codex_paper_summary {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #334155;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dark .codex_paper_summary {
          color: #94a3b8;
        }
        .codex_tags_row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .codex_tag_pill {
          font-size: 0.72rem;
          font-family: monospace;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .codex_mini_author_avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #06b6d4;
        }
        .btn_codex_read {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
          color: #ffffff !important;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 6px;
          text-decoration: none !important;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
          transition: all 0.2s;
        }
        .btn_codex_read:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(2, 132, 199, 0.5);
        }
        .btn_codex_pdf {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(206, 161, 122, 0.1);
          border: 1px solid rgba(206, 161, 122, 0.3);
          color: #CEA17A !important;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 6px;
          text-decoration: none !important;
          transition: all 0.2s;
        }
        .btn_codex_pdf:hover {
          background: rgba(206, 161, 122, 0.2);
          border-color: #CEA17A;
          transform: translateY(-2px);
        }

        /* Sidebar Glass Cards */
        .sidebar_glass_card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .sidebar_avatar_ring {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #06b6d4 0%, #CEA17A 100%);
          display: inline-block;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
        }
        .sidebar_author_img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: #0b1120;
        }
        .sidebar_status_beacon {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #060913;
          box-shadow: 0 0 8px #10b981;
        }
        .avatar_switcher_dock {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50px;
          padding: 2px;
        }
        .switch_pill {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .switch_pill.active {
          background: #0284c7;
          color: #ffffff;
        }
        .sidebar_social_btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          text-decoration: none !important;
          transition: all 0.2s;
        }
        .sidebar_social_btn:hover {
          background: #0284c7;
          color: #ffffff;
          border-color: #0284c7;
          transform: translateY(-2px);
        }
        .vector_spotlight_frame {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #050811;
        }
        .vector_spotlight_caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(5, 8, 17, 0.95) 100%);
        }
        .micro_strip {
          scrollbar-width: thin;
        }
        .micro_thumb_btn {
          flex: 0 0 42px;
          height: 42px;
          border-radius: 6px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #000;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .micro_thumb_btn.active, .micro_thumb_btn:hover {
          opacity: 1;
          border-color: #06b6d4;
        }
        .micro_thumb_btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .empty_codex_box {
          background: rgba(15, 23, 42, 0.5);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          border-radius: 18px;
        }
        .empty_radar_icon {
          font-size: 2.5rem;
        }

        @media (max-width: 767px) {
          .codex_hero_title {
            font-size: 2rem;
          }
          .codex_thumb_wrapper {
            min-height: 180px;
          }
        }
      `}} />
    </>
  );
}
