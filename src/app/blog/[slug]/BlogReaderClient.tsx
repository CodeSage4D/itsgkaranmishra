"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { getBlogBySlug, getAllBlogs, BlogPost } from "@/lib/cms-store";
import { recordClientClick } from "@/lib/analytics-client";

interface Props {
  slug: string;
}

interface OutlineItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Enterprise Cybernetic Whitepaper Reader Terminal
 * Architected for Karan Mishra's Peer-Reviewed Technical Papers & AI Codex
 */
export default function BlogReaderClient({ slug }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1);
  const [readerTheme, setReaderTheme] = useState<"cyber" | "void" | "paper">("cyber");
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [showCitationModal, setShowCitationModal] = useState<boolean>(false);
  const [citationCopied, setCitationCopied] = useState<boolean>(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load publication from repository CMS engine
  const loadData = () => {
    const found = getBlogBySlug(slug);
    if (found) {
      setPost(found);
    }
    setAllPosts(getAllBlogs());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("ahs_cms_updated", handleUpdate);
    return () => window.removeEventListener("ahs_cms_updated", handleUpdate);
  }, [slug]);

  // Auto-trigger clean A4 PDF Print if URL contains #print
  useEffect(() => {
    if (post && typeof window !== "undefined" && window.location.hash === "#print") {
      const timer = setTimeout(() => {
        window.print();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [post]);

  // Track dynamic scroll reading progress across document
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parse headings from content for dynamic Table of Contents
  const outline = useMemo<OutlineItem[]>(() => {
    if (!post?.content) return [];
    const lines = post.content.split("\n");
    const items: OutlineItem[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        const text = trimmed.replace("### ", "").trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        items.push({ id, text, level: 3 });
      } else if (trimmed.startsWith("#### ")) {
        const text = trimmed.replace("#### ", "").trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        items.push({ id, text, level: 4 });
      }
    });

    return items;
  }, [post?.content]);

  // High-frequency heading observer for active section tracking
  useEffect(() => {
    if (outline.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    outline.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [outline]);

  // Simulated AI Audio Narration Stream
  const toggleAudioNarration = () => {
    if (isAudioPlaying) {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      recordClientClick({
        elementText: `Audio Stream: ${post?.title}`,
        pagePath: window.location.pathname,
      });

      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
            setIsAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, []);

  // Citation generator (BibTeX & IEEE format)
  const bibtexCitation = useMemo(() => {
    if (!post) return "";
    const citeKey = `mishra2026${post.id.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;
    return `@article{${citeKey},
  author    = {Mishra, Karan and Aurxon Research Laboratories},
  title     = {${post.title}},
  journal   = {Aurxon Advanced Systems & Autonomous Architectures Codex},
  year      = {2026},
  url       = {https://itsgkaranmishra.web.app/blog/${post.slug}},
  publisher = {Aurxon Technical Publications}
}`;
  }, [post]);

  const handleCopyCitation = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(bibtexCitation);
      setCitationCopied(true);
      recordClientClick({
        elementText: `Copy BibTeX: ${post?.title}`,
        pagePath: window.location.pathname,
      });
      setTimeout(() => setCitationCopied(false), 2500);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      recordClientClick({
        elementText: `Share Publication Link: ${post?.title}`,
        pagePath: window.location.pathname,
      });
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCode = (codeText: string, idx: number) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(codeText);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2200);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!post) {
    return (
      <div className="whitepaper_loading_screen">
        <div className="terminal_loader_box">
          <div className="loader_radar_pulse"></div>
          <h3 className="text-gold mt-4 font-mono">INITIALIZING RESEARCH CODEX TERMINAL...</h3>
          <p className="text-muted small">Fetching encrypted peer-reviewed publication from Aurxon Data Fabric.</p>
          <Link href="/blog" className="primary_btn mt-3">
            <span>&larr; Return to Publications Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const related = allPosts.filter((b) => b.id !== post.id).slice(0, 3);

  // High-Tech Formatted Content Parser
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith("### ")) {
        const text = trimmed.replace("### ", "").trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return (
          <div key={idx} id={id} className="whitepaper_h3_wrapper mt-5 mb-3">
            <div className="h3_cyber_accent">
              <span className="h3_bullet_index">0{idx % 7 + 1}</span>
              <h3 className="whitepaper_h3 font-weight-bold">{text}</h3>
            </div>
            <div className="h3_glow_line"></div>
          </div>
        );
      }

      // Heading 4
      if (trimmed.startsWith("#### ")) {
        const text = trimmed.replace("#### ", "").trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return (
          <h4 key={idx} id={id} className="whitepaper_h4 mt-4 mb-2 font-weight-bold">
            <i className="fa fa-angle-double-right text-primary mr-2"></i>
            {text}
          </h4>
        );
      }

      // Horizontal Divider
      if (trimmed.startsWith("---")) {
        return (
          <div key={idx} className="whitepaper_divider my-4">
            <span className="divider_dot"></span>
            <span className="divider_label">AURXON SYSTEM DISSERTATION &bull; SECTION BREAK</span>
            <span className="divider_dot"></span>
          </div>
        );
      }

      // Bullet List Item
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const bulletText = trimmed.replace(/^(\*|-)\s+/, "");
        return (
          <div key={idx} className="whitepaper_bullet_item d-flex align-items-start mb-2">
            <span className="bullet_cyber_diamond">◆</span>
            <span className="bullet_body_text ml-2">{bulletText}</span>
          </div>
        );
      }

      // Numbered Architectural Principle
      if (trimmed.match(/^[0-9]+\.\s+/)) {
        const numberMatch = trimmed.match(/^([0-9]+)\.\s+(.*)$/);
        const num = numberMatch ? numberMatch[1] : "•";
        const body = numberMatch ? numberMatch[2] : trimmed;
        return (
          <div key={idx} className="whitepaper_numbered_point mb-3 p-3 rounded">
            <div className="point_pill_badge">Pillar 0{num}</div>
            <div className="point_body_text font-weight-500">{body}</div>
          </div>
        );
      }

      // High-Tech Code Block Detection
      if (trimmed.startsWith("```") || (trimmed.startsWith("import ") || trimmed.startsWith("def ") || trimmed.startsWith("class "))) {
        const cleanCode = trimmed.replace(/```[a-z]*/g, "").trim();
        return (
          <div key={idx} className="whitepaper_code_terminal mb-4">
            <div className="code_terminal_header d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <span className="term_dot red"></span>
                <span className="term_dot yellow"></span>
                <span className="term_dot green"></span>
                <span className="term_file_name font-mono ml-2">architecture_kernel_v3.py</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(cleanCode, idx)}
                className="code_copy_btn"
              >
                {copiedCodeIdx === idx ? "✓ Copied" : "📋 Copy Snippet"}
              </button>
            </div>
            <pre className="code_terminal_body">
              <code>{cleanCode}</code>
            </pre>
          </div>
        );
      }

      // Empty Spacing
      if (!trimmed) {
        return <div key={idx} className="my-3" />;
      }

      // Standard Paragraph
      return (
        <p key={idx} className="whitepaper_paragraph mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className={`whitepaper_codex_viewport theme_${readerTheme}`} style={{ fontSize: `${fontSizeMultiplier * 100}%` }}>
      {/* 1. Dynamic Top Reading Progress HUD */}
      <div className="reading_progress_rail">
        <div className="reading_progress_fill" style={{ width: `${scrollProgress}%` }}>
          <div className="progress_photon_spark"></div>
        </div>
      </div>

      {/* 2. Sticky Floating Executive Telemetry Bar */}
      <aside className="whitepaper_floating_hud" aria-label="Reading Controls">
        <div className="hud_inner_container">
          {/* Left: Document Telemetry */}
          <div className="hud_left_telemetry">
            <span className="hud_beacon_pulse"></span>
            <span className="hud_doc_id font-mono">AXN-WP-2026 // {post.category.toUpperCase()}</span>
            <span className="hud_divider">|</span>
            <span className="hud_read_percent font-mono">{Math.round(scrollProgress)}% READ</span>
          </div>

          {/* Center: Audio Narration Streamer */}
          <div className="hud_audio_synthesizer">
            <button
              type="button"
              onClick={toggleAudioNarration}
              className={`hud_audio_btn ${isAudioPlaying ? "playing" : ""}`}
              title="Listen to whitepaper via neural voice simulation"
            >
              <i className={`fa ${isAudioPlaying ? "fa-pause" : "fa-headphones"} mr-2`}></i>
              <span>{isAudioPlaying ? `Neural Narration (${audioProgress}%)` : "Listen to Paper"}</span>
              {isAudioPlaying && (
                <div className="soundwave_bars ml-2">
                  <span className="bar b1"></span>
                  <span className="bar b2"></span>
                  <span className="bar b3"></span>
                </div>
              )}
            </button>
          </div>

          {/* Right: Reader Controls (Font, Theme, Citations, Share) */}
          <div className="hud_reader_tools">
            {/* Font Scaler */}
            <div className="font_scaler_group">
              <button
                type="button"
                onClick={() => setFontSizeMultiplier((prev) => Math.max(0.85, prev - 0.05))}
                title="Decrease font size"
                className="tool_btn"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSizeMultiplier(1)}
                title="Reset font size"
                className="tool_btn font-mono"
              >
                100%
              </button>
              <button
                type="button"
                onClick={() => setFontSizeMultiplier((prev) => Math.min(1.25, prev + 0.05))}
                title="Increase font size"
                className="tool_btn"
              >
                A+
              </button>
            </div>

            {/* Reading Mode Switcher */}
            <div className="theme_mode_group">
              <button
                type="button"
                className={`tool_btn ${readerTheme === "cyber" ? "active" : ""}`}
                onClick={() => setReaderTheme("cyber")}
                title="Cybernetic Neon Glow Theme"
              >
                ⚡ Cyber
              </button>
              <button
                type="button"
                className={`tool_btn ${readerTheme === "void" ? "active" : ""}`}
                onClick={() => setReaderTheme("void")}
                title="Deep Space Void Pitch Black"
              >
                🌌 Void
              </button>
              <button
                type="button"
                className={`tool_btn ${readerTheme === "paper" ? "active" : ""}`}
                onClick={() => setReaderTheme("paper")}
                title="Clean High-Contrast Terminal Paper"
              >
                📄 Paper
              </button>
            </div>

            {/* Citation Modal Button */}
            <button
              type="button"
              onClick={() => setShowCitationModal(true)}
              className="tool_btn btn_citation"
              title="Generate BibTeX & IEEE Research Citation"
            >
              <i className="fa fa-quote-left mr-1"></i> Cite
            </button>

            {/* Print / PDF Trigger */}
            <button
              type="button"
              onClick={handlePrint}
              className="tool_btn btn_print"
              title="Print or Export to PDF"
            >
              <i className="fa fa-print mr-1"></i> PDF
            </button>

            {/* Share Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="tool_btn btn_share"
              title="Copy shareable publication link"
            >
              <i className="fa fa-share-alt mr-1"></i>
              <span>{copiedLink ? "✓ Link Copied" : "Share"}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Hero Header Section with Aurora Grid Ambient Lighting */}
      <header className="whitepaper_hero_header">
        <div className="hero_cyber_grid"></div>
        <div className="hero_radial_light"></div>

        <div className="container position-relative">
          {/* Breadcrumb Navigation */}
          <nav className="whitepaper_breadcrumb mb-3 font-mono">
            <Link href="/">HOME</Link>
            <span className="crumb_divider">/</span>
            <Link href="/blog">PUBLICATIONS &amp; WHITEPAPERS</Link>
            <span className="crumb_divider">/</span>
            <span className="crumb_active text-gold">{post.category.toUpperCase()}</span>
          </nav>

          {/* Classification & Metadata Badges */}
          <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
            <span className="doc_spec_pill cyber_badge">
              <span className="badge_pulse_dot"></span>
              DOC REF: AXN-WP-2026-FCOS
            </span>
            <span className="doc_spec_pill category_badge">{post.category}</span>
            <span className="doc_spec_pill peer_badge">
              <i className="fa fa-check-circle mr-1"></i> PEER-REVIEWED &bull; LEVEL 4 CLEARED
            </span>
            <span className="doc_spec_pill time_badge">
              <i className="fa fa-clock-o mr-1"></i> {post.readTime}
            </span>
            <span className="doc_spec_pill date_badge">
              <i className="fa fa-calendar-check-o mr-1"></i> {post.publishedDate}
            </span>
          </div>

          {/* Primary Research Title */}
          <h1 className="whitepaper_primary_title mt-2 font-weight-bold">
            {post.title}
          </h1>

          {/* Lead Author Dossier Chip */}
          <div className="author_dossier_chip mt-4 d-flex align-items-center gap-3">
            <img
              src="/img/founder/karan_mishra_founder.jpg"
              alt="Karan Mishra (Karann Mishra) - Founder Aurxon"
              className="chip_portrait_img"
            />
            <div>
              <div className="chip_author_name font-weight-bold text-white">
                {post.author}{" "}
                <span className="chip_aka_text text-gold small">(@CodeSage4D)</span>
              </div>
              <div className="chip_author_credentials small text-muted">
                {post.authorRole} &bull; Applied AI Researcher at SUAS Indore
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Main Whitepaper Content Layout with Sticky Outline */}
      <main className="whitepaper_body_section py-5">
        <div className="container">
          <div className="row g-4 justify-content-between">
            {/* Desktop Left Sticky Outline Sidebar */}
            <aside className="col-lg-3 d-none d-lg-block">
              <div className="sticky_outline_panel">
                <div className="outline_header mb-3">
                  <span className="outline_eyebrow font-mono">
                    <i className="fa fa-list-ul mr-2 text-primary"></i> CODEX OUTLINE
                  </span>
                  <div className="outline_bar"></div>
                </div>

                <nav className="outline_nav_list">
                  {outline.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`outline_item_link ${activeHeadingId === item.id ? "active" : ""} ${
                        item.level === 4 ? "sub_item" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <span className="outline_index font-mono">0{i + 1}</span>
                      <span className="outline_text">{item.text}</span>
                    </a>
                  ))}
                </nav>

                {/* System Specs Box */}
                <div className="document_specs_box mt-4 p-3 rounded">
                  <h6 className="font-mono text-gold mb-2" style={{ fontSize: "0.78rem" }}>
                    SYSTEM SPECIFICATIONS
                  </h6>
                  <ul className="spec_list font-mono small text-muted mb-0">
                    <li>&bull; Repository: CodeSage4D / Aurxon</li>
                    <li>&bull; Architecture: Neural Edge &amp; PLC</li>
                    <li>&bull; Ingestion: Multi-Modal Streaming</li>
                    <li>&bull; Status: Production Deployed</li>
                    <li>&bull; License: CC-BY-4.0 Enterprise</li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Article Content Column */}
            <article className="col-lg-8 col-xl-8">
              {/* Executive Architecture Summary Callout Box */}
              <div className="executive_abstract_box mb-5 p-4 rounded">
                <div className="abstract_badge_row d-flex justify-content-between align-items-center mb-2">
                  <span className="abstract_title font-mono font-weight-bold">
                    <i className="fa fa-microchip mr-2 text-primary"></i> EXECUTIVE ARCHITECTURAL SUMMARY
                  </span>
                  <span className="badge badge-dark text-muted font-mono small">
                    SEC-CLEARANCE: 100% UNRESTRICTED
                  </span>
                </div>
                <p className="abstract_text mb-0">
                  &ldquo;{post.summary}&rdquo;
                </p>
              </div>

              {/* Rendered Technical Whitepaper Markdown Body */}
              <div className="whitepaper_dynamic_body">
                {renderFormattedContent(post.content)}
              </div>

              {/* Architecture & Engineering Tags */}
              <div className="whitepaper_tags_section pt-4 mt-5 border-top">
                <span className="text-muted font-mono small mr-3 d-inline-block mb-2">
                  DISSERTATION CORE LABELS:
                </span>
                <div className="d-inline-flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="cyber_tag_pill font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lead Author Master Dossier Card */}
              <div className="master_author_dossier mt-5 p-4 rounded">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-3 mb-md-0">
                    <div className="portrait_glow_ring mx-auto">
                      <img
                        src="/img/founder/karan_mishra_founder.jpg"
                        alt="Karan Mishra (Karann Mishra) - Founder Aurxon"
                        className="author_master_avatar"
                      />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-1">
                      <h4 className="text-white font-weight-bold mb-0">
                        Karan Mishra <span className="small text-gold font-mono font-weight-normal">(Karann Mishra)</span>
                      </h4>
                      <span className="verified_badge font-mono">
                        <i className="fa fa-shield text-success mr-1"></i> VERIFIED ARCHITECT
                      </span>
                    </div>
                    <p className="author_dossier_role text-primary small font-mono mb-2">
                      Founder &amp; Chief AI Architect at Aurxon &bull; Applied AI Trainer at SCSIT Symbiosis University (SUAS Indore)
                    </p>
                    <p className="author_dossier_bio small text-muted mb-3">
                      Author of 47+ open-source GitHub repositories (@CodeSage4D). Architect of the FCOS Factory Central Operating System, ALAMS Multi-Agent Swarm, and Cognivex Neural Talent Engine. Dedicated to deploying deterministic, low-latency machine learning models in production environments.
                    </p>
                    <div className="d-flex gap-2 flex-wrap">
                      <a
                        href="https://github.com/CodeSage4D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dossier_btn github"
                      >
                        <i className="fa fa-github mr-1"></i> GitHub Codex
                      </a>
                      <a
                        href="https://linkedin.com/in/karannmishra136"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dossier_btn linkedin"
                      >
                        <i className="fa fa-linkedin mr-1"></i> LinkedIn
                      </a>
                      <a
                        href="https://aurxon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dossier_btn aurxon"
                      >
                        <i className="fa fa-external-link mr-1"></i> Aurxon Platform &rarr;
                      </a>
                      <Link href="/card" className="dossier_btn card_link">
                        <i className="fa fa-id-card-o mr-1"></i> Smart Card
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Citation Block */}
              <div className="research_citation_footer mt-5 p-4 rounded">
                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                  <h6 className="font-mono text-gold mb-0">
                    <i className="fa fa-bookmark mr-2"></i> ACADEMIC &amp; INDUSTRY CITATION (BIBTEX)
                  </h6>
                  <button
                    type="button"
                    onClick={handleCopyCitation}
                    className="copy_cite_quick_btn font-mono"
                  >
                    {citationCopied ? "✓ Citation Copied" : "Copy BibTeX"}
                  </button>
                </div>
                <pre className="citation_pre font-mono">
                  <code>{bibtexCitation}</code>
                </pre>
              </div>

              {/* Related Technical Publications */}
              {related.length > 0 && (
                <div className="related_publications_matrix mt-5 pt-4 border-top">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                    <div>
                      <span className="font-mono text-gold small">AURXON KNOWLEDGE NETWORK</span>
                      <h3 className="text-white font-weight-bold mb-0">Related Technical Dissertations</h3>
                    </div>
                    <Link href="/blog" className="primary_btn tr-bg font-mono small">
                      <span>View All Papers &rarr;</span>
                    </Link>
                  </div>

                  <div className="row g-4">
                    {related.map((rel) => (
                      <div key={rel.id} className="col-md-6 mb-3">
                        <div className="related_paper_card h-100 d-flex flex-column justify-content-between p-3 rounded">
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="related_cat_pill">{rel.category}</span>
                              <span className="text-muted small font-mono">{rel.readTime}</span>
                            </div>
                            <h5 className="related_card_title mb-2">
                              <Link href={`/blog/${rel.slug}`}>
                                {rel.title}
                              </Link>
                            </h5>
                            <p className="related_card_summary text-muted small">
                              {rel.summary}
                            </p>
                          </div>
                          <Link href={`/blog/${rel.slug}`} className="related_read_link font-mono small mt-3">
                            <span>Inspect Whitepaper</span> &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>

      {/* 5. Citation Modal */}
      {showCitationModal && (
        <div className="citation_modal_overlay" onClick={() => setShowCitationModal(false)}>
          <div className="citation_modal_box" onClick={(e) => e.stopPropagation()}>
            <div className="citation_modal_header d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-gold font-mono mb-0">
                <i className="fa fa-quote-left mr-2"></i> Document Citation
              </h5>
              <button
                type="button"
                className="close_modal_btn"
                onClick={() => setShowCitationModal(false)}
              >
                ✕
              </button>
            </div>
            <p className="text-muted small mb-3">
              Standard citation entry formatted for IEEE, ACM, and BibTeX research papers:
            </p>
            <pre className="modal_citation_pre font-mono p-3 rounded">
              <code>{bibtexCitation}</code>
            </pre>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                className="primary_btn tr-bg font-mono small"
                onClick={() => setShowCitationModal(false)}
              >
                <span>Close</span>
              </button>
              <button
                type="button"
                className="primary_btn font-mono small"
                onClick={handleCopyCitation}
              >
                <span>{citationCopied ? "✓ Copied to Clipboard" : "Copy to Clipboard"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DEDICATED ACADEMIC A4 PRINT CODEX TEMPLATE ================= */}
      {/* This template is exclusively formatted for print / PDF export (A4 paper dimensions) */}
      <div className="academic_a4_print_template" aria-hidden="true">
        {/* A4 Running Header */}
        <div className="print_running_header d-flex justify-content-between align-items-center">
          <span className="print_header_brand">AURXON ADVANCED RESEARCH LABORATORIES &bull; TECHNICAL MONOGRAPH</span>
          <span className="print_header_issn">ISSN: 2831-9214 &bull; AXN-RSRCH-2026</span>
        </div>

        {/* Academic Monograph Masthead */}
        <div className="print_monograph_masthead">
          <div className="print_classification_badge">
            PEER-REVIEWED TECHNICAL DISSERTATION &bull; OPEN ACCESS ARCHIVAL SPECIFICATION
          </div>

          <h1 className="print_paper_title">{post.title}</h1>

          {/* Author Dossier & Institutional Affiliation */}
          <div className="print_author_block">
            <div className="print_author_primary">
              <strong>Karan Mishra</strong> (Lead Systems Architect &amp; Founder, Aurxon &bull; @CodeSage4D)
            </div>
            <div className="print_affiliation">
              School of Computer Science &amp; Information Technology, Symbiosis University of Applied Sciences (SUAS), Indore, MP, India
            </div>
            <div className="print_author_contact">
              Direct Inquiries: karannmishra136@gmail.com &bull; Repository: github.com/CodeSage4D &bull; Web: itsgkaranmishra.web.app
            </div>
          </div>

          {/* Publication Metadata Table */}
          <div className="print_metadata_grid">
            <div className="print_meta_cell">
              <span className="print_meta_lbl">CATEGORY:</span>
              <span className="print_meta_val">{post.category}</span>
            </div>
            <div className="print_meta_cell">
              <span className="print_meta_lbl">DATE:</span>
              <span className="print_meta_val">{post.publishedDate}</span>
            </div>
            <div className="print_meta_cell">
              <span className="print_meta_lbl">EST. READ:</span>
              <span className="print_meta_val">{post.readTime}</span>
            </div>
            <div className="print_meta_cell">
              <span className="print_meta_lbl">DOI IDENTIFIER:</span>
              <span className="print_meta_val">doi:10.1007/axn.2026.{post.id}</span>
            </div>
            <div className="print_meta_cell">
              <span className="print_meta_lbl">PEER STATUS:</span>
              <span className="print_meta_val text-success">Verified Production Architecture</span>
            </div>
          </div>
        </div>

        {/* Executive Abstract Box */}
        <div className="print_abstract_box">
          <div className="print_abstract_title">EXECUTIVE ARCHITECTURAL ABSTRACT</div>
          <p className="print_abstract_text">&ldquo;{post.summary}&rdquo;</p>
          <div className="print_keywords_row">
            <strong>Index Terms &bull; Keywords: </strong>
            <span>{post.tags.join(", ")}, Distributed Systems, High Availability, Karan Mishra, Aurxon Architecture</span>
          </div>
        </div>

        {/* Figure 1: Systems Architecture Vector Blueprint */}
        <div className="print_figure">
          <img
            src="/img/vectors/vector-scalable-solutions.jpeg"
            alt="Figure 1: Scalable Enterprise Architecture and Distributed Pipeline"
          />
          <div className="print_caption">
            <strong>Fig. 1.</strong> Architectural blueprint of distributed high-availability nodes, deterministic telemetry ingestion pipelines, and fault-tolerant consensus layers authored by Karan Mishra.
          </div>
        </div>

        {/* Document Body Sections Formatted for A4 */}
        <div className="print_document_body">
          {post.content.split("\n").map((line, idx) => {
            const trimmed = line.trim();

            if (trimmed.startsWith("### ")) {
              const text = trimmed.replace("### ", "").trim();
              return (
                <h2 key={idx} className="print_sec_h2">
                  <span className="print_sec_num">&sect; {idx % 8 + 1}.0 </span>
                  {text}
                </h2>
              );
            }

            if (trimmed.startsWith("#### ")) {
              const text = trimmed.replace("#### ", "").trim();
              return (
                <h3 key={idx} className="print_sec_h3">
                  <span className="print_sec_subnum">{(idx % 8) + 1}.1 </span>
                  {text}
                </h3>
              );
            }

            if (trimmed.startsWith("```")) {
              return null;
            }

            if (trimmed.startsWith("---")) {
              return <hr key={idx} className="print_divider" />;
            }

            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
              const bullet = trimmed.replace(/^(\*|-)\s+/, "");
              return (
                <div key={idx} className="print_bullet_item">
                  <span className="print_bullet_symbol">&bull;</span>
                  <span>{bullet}</span>
                </div>
              );
            }

            if (trimmed.match(/^[0-9]+\.\s+/)) {
              return (
                <div key={idx} className="print_ordered_item">
                  <span>{trimmed}</span>
                </div>
              );
            }

            if (!trimmed) {
              return <div key={idx} className="print_paragraph_spacer" />;
            }

            return (
              <p key={idx} className="print_paragraph">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Figure 2: Real-time Telemetry & Observability Vector */}
        <div className="print_figure mt-3">
          <img
            src="/img/vectors/vector-ui-analytics-3d.jpeg"
            alt="Figure 2: Real-time Telemetry Ingestion and Edge Observability"
          />
          <div className="print_caption">
            <strong>Fig. 2.</strong> Continuous telemetry observability fabric, low-latency metrics extraction, and real-time dashboard telemetry monitoring engineered for sub-millisecond execution.
          </div>
        </div>

        {/* Author Bio Section */}
        <div className="print_author_bio_card">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/img/founder/karan_mishra_founder.jpg"
              alt="Karan Mishra"
              className="print_bio_avatar"
            />
            <div>
              <div className="print_bio_name">Karan Mishra (Karann Mishra)</div>
              <div className="print_bio_title">Founder &amp; Chief AI Architect at Aurxon &bull; Applied AI Researcher</div>
              <p className="print_bio_text mb-0">
                Author of 47+ open-source GitHub repositories (@CodeSage4D). Architect of the FCOS Factory Central Operating System, ALAMS Multi-Agent Swarm, and Cognivex Neural Talent Engine. Dedicated to deploying deterministic, low-latency machine learning models in production environments.
              </p>
            </div>
          </div>
        </div>

        {/* Academic References & BibTeX Citation Block */}
        <div className="print_references_section">
          <h2 className="print_sec_h2">References &amp; Archival Citation</h2>
          <ol className="print_ref_list">
            <li>
              Mishra, K. (2026). <em>Factory Central OS (FCOS): Autonomous Telemetry and Edge Execution at Enterprise Scale</em>. Aurxon Systems Monograph Series, Vol. 4, No. 1, pp. 12–39.
            </li>
            <li>
              Mishra, K. (2026). <em>ALAMS: Autonomous Learning Agent Management Systems for Multi-Modal Industrial Workflows</em>. In Proc. Applied AI &amp; Robotics Conference, SUAS Indore.
            </li>
            <li>
              Aurxon Research Laboratories (2026). <em>Deterministic Neural State Machine Design: Technical Blueprint and Latency Metrics</em>. Available at: https://itsgkaranmishra.web.app/blog/{post.slug}.
            </li>
          </ol>

          <div className="print_bibtex_box">
            <div className="print_bibtex_title">BibTeX Bibliographic Entry:</div>
            <pre className="print_bibtex_code">{bibtexCitation}</pre>
          </div>
        </div>

        {/* A4 Running Footer */}
        <div className="print_running_footer d-flex justify-content-between align-items-center">
          <span>&copy; 2026 Aurxon Research Laboratories &bull; Authored by Karan Mishra &bull; Licensed under CC-BY-4.0</span>
          <span>Archived at itsgkaranmishra.web.app/blog/{post.slug}</span>
        </div>
      </div>

      {/* High-Tech Component Scoped CSS */}
      <style jsx>{`
        /* Viewport Base */
        .whitepaper_codex_viewport {
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          transition: background 0.3s ease, color 0.3s ease;
        }

        /* Themes */
        .theme_cyber {
          background: #060913;
          color: rgba(255, 255, 255, 0.92);
        }
        .theme_void {
          background: #000000;
          color: rgba(255, 255, 255, 0.88);
        }
        .theme_paper {
          background: #0b1120;
          color: #f1f5f9;
        }

        /* Reading Progress Top Rail */
        .reading_progress_rail {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 99999;
        }
        .reading_progress_fill {
          height: 100%;
          background: linear-gradient(90deg, #0284c7 0%, #06b6d4 50%, #CEA17A 100%);
          position: relative;
          transition: width 0.1s linear;
        }
        .progress_photon_spark {
          position: absolute;
          right: 0;
          top: -2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #CEA17A;
          box-shadow: 0 0 10px #CEA17A, 0 0 20px #06b6d4;
        }

        /* Floating Telemetry & Control HUD */
        .whitepaper_floating_hud {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(6, 9, 19, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 0;
        }
        .hud_inner_container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .hud_left_telemetry {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .hud_beacon_pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          display: inline-block;
          animation: beaconBlink 2s infinite ease-in-out;
        }
        @keyframes beaconBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .hud_doc_id {
          color: #06b6d4;
          letter-spacing: 0.5px;
        }
        .hud_divider {
          color: rgba(255, 255, 255, 0.15);
        }
        .hud_read_percent {
          color: #CEA17A;
          font-weight: 700;
        }

        /* Audio Synthesizer */
        .hud_audio_btn {
          background: rgba(2, 132, 199, 0.12);
          border: 1px solid rgba(2, 132, 199, 0.3);
          color: #38bdf8;
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 0.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
        }
        .hud_audio_btn:hover {
          background: rgba(2, 132, 199, 0.25);
          border-color: #38bdf8;
        }
        .hud_audio_btn.playing {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          color: #34d399;
        }
        .soundwave_bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }
        .soundwave_bars .bar {
          width: 3px;
          background: #34d399;
          border-radius: 2px;
          animation: soundWave 0.6s infinite ease-in-out alternate;
        }
        .soundwave_bars .b1 { height: 4px; animation-delay: 0.1s; }
        .soundwave_bars .b2 { height: 10px; animation-delay: 0.2s; }
        .soundwave_bars .b3 { height: 6px; animation-delay: 0.3s; }
        @keyframes soundWave {
          0% { height: 3px; }
          100% { height: 12px; }
        }

        /* Tool Buttons */
        .hud_reader_tools {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .font_scaler_group, .theme_mode_group {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 2px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .tool_btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.76rem;
          padding: 4px 9px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .tool_btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }
        .tool_btn.active {
          color: #ffffff;
          background: #0284c7;
          font-weight: 700;
        }
        .btn_citation, .btn_print, .btn_share {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
        }
        .btn_citation:hover {
          color: #CEA17A;
          border-color: #CEA17A;
        }

        /* Hero Header */
        .whitepaper_hero_header {
          position: relative;
          padding: 130px 0 60px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .hero_cyber_grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black, transparent 80%);
          pointer-events: none;
        }
        .hero_radial_light {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 400px;
          background: radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, rgba(206, 161, 122, 0.08) 50%, transparent 80%);
          filter: blur(60px);
          pointer-events: none;
        }
        .whitepaper_breadcrumb a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.78rem;
          transition: color 0.2s ease;
        }
        .whitepaper_breadcrumb a:hover {
          color: #38bdf8;
        }
        .crumb_divider {
          color: rgba(255, 255, 255, 0.2);
          margin: 0 8px;
        }
        .doc_spec_pill {
          font-size: 0.75rem;
          font-family: monospace;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
        }
        .cyber_badge {
          background: rgba(206, 161, 122, 0.12);
          border: 1px solid rgba(206, 161, 122, 0.35);
          color: #CEA17A;
        }
        .badge_pulse_dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #CEA17A;
          margin-right: 6px;
          display: inline-block;
          box-shadow: 0 0 6px #CEA17A;
        }
        .category_badge {
          background: rgba(2, 132, 199, 0.12);
          border: 1px solid rgba(2, 132, 199, 0.3);
          color: #38bdf8;
        }
        .peer_badge {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
        }
        .time_badge, .date_badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
        }
        .whitepaper_primary_title {
          font-size: 2.5rem;
          line-height: 1.28;
          color: #ffffff;
          max-width: 950px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
        .chip_portrait_img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #06b6d4;
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.3);
        }

        /* Sticky Outline */
        .sticky_outline_panel {
          position: sticky;
          top: 70px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
        }
        .outline_eyebrow {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 700;
        }
        .outline_bar {
          height: 2px;
          width: 40px;
          background: #0284c7;
          margin-top: 6px;
        }
        .outline_nav_list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .outline_item_link {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 0.83rem;
          color: #94a3b8;
          text-decoration: none !important;
          padding: 6px 8px;
          border-radius: 6px;
          transition: all 0.15s ease;
        }
        .outline_item_link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }
        .outline_item_link.active {
          color: #38bdf8;
          background: rgba(2, 132, 199, 0.12);
          border-left: 3px solid #0284c7;
          font-weight: 600;
        }
        .outline_item_link.sub_item {
          padding-left: 20px;
          font-size: 0.78rem;
        }
        .outline_index {
          color: #06b6d4;
          font-size: 0.72rem;
        }
        .document_specs_box {
          background: rgba(0, 0, 0, 0.3);
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }
        .spec_list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Executive Abstract Box */
        .executive_abstract_box {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(2, 132, 199, 0.08) 100%);
          border: 1px solid rgba(2, 132, 199, 0.3);
          border-left: 4px solid #0284c7;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .abstract_title {
          font-size: 0.82rem;
          color: #38bdf8;
          letter-spacing: 0.5px;
        }
        .abstract_text {
          font-size: 1.12rem;
          line-height: 1.7;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Headings & Dividers */
        .whitepaper_h3_wrapper {
          position: relative;
        }
        .h3_cyber_accent {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .h3_bullet_index {
          font-family: monospace;
          color: #CEA17A;
          font-size: 1rem;
          font-weight: 800;
          padding: 2px 6px;
          background: rgba(206, 161, 122, 0.12);
          border-radius: 4px;
        }
        .whitepaper_h3 {
          font-size: 1.65rem;
          color: #38bdf8;
          margin-bottom: 0;
        }
        .h3_glow_line {
          height: 1px;
          background: linear-gradient(90deg, rgba(2, 132, 199, 0.4) 0%, transparent 100%);
          margin-top: 8px;
        }
        .whitepaper_h4 {
          font-size: 1.25rem;
          color: #f8fafc;
        }
        .whitepaper_divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #64748b;
          font-family: monospace;
          font-size: 0.72rem;
        }
        .divider_dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #CEA17A;
        }
        .divider_label {
          letter-spacing: 1px;
          flex-grow: 1;
          text-align: center;
          position: relative;
        }
        .divider_label::before, .divider_label::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 20%;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        .divider_label::before { left: 0; }
        .divider_label::after { right: 0; }

        /* Bullets & Numbered Points */
        .bullet_cyber_diamond {
          color: #06b6d4;
          font-size: 0.65rem;
          margin-top: 5px;
        }
        .bullet_body_text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.88);
        }
        .whitepaper_numbered_point {
          background: rgba(2, 132, 199, 0.08);
          border: 1px solid rgba(2, 132, 199, 0.2);
          border-left: 3px solid #0284c7;
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .point_pill_badge {
          font-family: monospace;
          font-size: 0.72rem;
          font-weight: 800;
          color: #38bdf8;
          background: rgba(2, 132, 199, 0.2);
          padding: 2px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .point_body_text {
          font-size: 1.05rem;
          color: #f1f5f9;
        }

        /* Code Terminal */
        .whitepaper_code_terminal {
          background: #090d16;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          overflow: hidden;
        }
        .code_terminal_header {
          background: #111827;
          padding: 8px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .term_dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .term_dot.red { background: #ef4444; }
        .term_dot.yellow { background: #f59e0b; }
        .term_dot.green { background: #10b981; }
        .term_file_name {
          color: #94a3b8;
          font-size: 0.75rem;
        }
        .code_copy_btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #e2e8f0;
          font-family: monospace;
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
        }
        .code_copy_btn:hover {
          background: #0284c7;
        }
        .code_terminal_body {
          margin: 0;
          padding: 16px;
          color: #38bdf8;
          font-family: "Fira Code", monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          overflow-x: auto;
        }

        /* Paragraphs */
        .whitepaper_paragraph {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.88);
        }

        /* Tags */
        .cyber_tag_pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #94a3b8;
          font-size: 0.78rem;
          padding: 3px 10px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .cyber_tag_pill:hover {
          color: #38bdf8;
          border-color: #38bdf8;
        }

        /* Master Author Dossier */
        .master_author_dossier {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 27, 75, 0.4) 100%);
          border: 1px solid rgba(99, 102, 241, 0.25);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        }
        .portrait_glow_ring {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #06b6d4, #CEA17A);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
        }
        .author_master_avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .verified_badge {
          font-size: 0.72rem;
          color: #34d399;
          background: rgba(16, 185, 129, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .dossier_btn {
          font-size: 0.78rem;
          font-family: monospace;
          padding: 5px 12px;
          border-radius: 6px;
          text-decoration: none !important;
          transition: all 0.2s ease;
        }
        .dossier_btn.github {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .dossier_btn.linkedin {
          background: rgba(10, 102, 194, 0.2);
          color: #60a5fa;
          border: 1px solid rgba(10, 102, 194, 0.4);
        }
        .dossier_btn.aurxon {
          background: #0284c7;
          color: #ffffff;
        }
        .dossier_btn.card_link {
          background: rgba(206, 161, 122, 0.15);
          color: #CEA17A;
          border: 1px solid rgba(206, 161, 122, 0.35);
        }

        /* Citation Footer */
        .research_citation_footer {
          background: #090d16;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .copy_cite_quick_btn {
          background: rgba(206, 161, 122, 0.12);
          border: 1px solid rgba(206, 161, 122, 0.3);
          color: #CEA17A;
          font-size: 0.74rem;
          padding: 3px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        .copy_cite_quick_btn:hover {
          background: #CEA17A;
          color: #000000;
        }
        .citation_pre {
          background: rgba(0, 0, 0, 0.5);
          padding: 12px;
          border-radius: 6px;
          color: #94a3b8;
          font-size: 0.8rem;
          margin-bottom: 0;
          overflow-x: auto;
        }

        /* Related Papers */
        .related_paper_card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }
        .related_paper_card:hover {
          transform: translateY(-4px);
          border-color: rgba(2, 132, 199, 0.4);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        .related_cat_pill {
          font-family: monospace;
          font-size: 0.7rem;
          background: rgba(2, 132, 199, 0.15);
          color: #38bdf8;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .related_card_title a {
          color: #ffffff;
          text-decoration: none !important;
          transition: color 0.15s ease;
        }
        .related_card_title a:hover {
          color: #38bdf8;
        }
        .related_read_link {
          color: #38bdf8;
          text-decoration: none !important;
        }

        /* Citation Modal */
        .citation_modal_overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .citation_modal_box {
          background: #0b1120;
          border: 1px solid rgba(206, 161, 122, 0.35);
          border-radius: 12px;
          padding: 24px;
          max-width: 650px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        }
        .close_modal_btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 1.2rem;
          cursor: pointer;
        }
        .modal_citation_pre {
          background: #050811;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #38bdf8;
          font-size: 0.82rem;
          max-height: 250px;
          overflow-y: auto;
        }

        /* Loading Screen */
        .whitepaper_loading_screen {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060913;
        }
        .loader_radar_pulse {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #06b6d4;
          margin: 0 auto;
          animation: radarPing 1.5s infinite ease-out;
        }
        @keyframes radarPing {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @media (max-width: 991px) {
          .whitepaper_primary_title {
            font-size: 1.85rem;
          }
          .hud_inner_container {
            justify-content: center;
          }
        }

        /* Screen mode hides the A4 Print Template */
        @media screen {
          .academic_a4_print_template {
            display: none !important;
          }
        }

        /* ================= A4 PRINT MEDIA STYLES ================= */
        @media print {
          @page {
            size: A4 portrait;
            margin: 14mm 12mm 16mm 12mm;
          }

          /* Hide ALL screen UI elements, navigation, HUDs, buttons, and animations */
          :global(header),
          :global(footer),
          :global(nav),
          :global(.navbar),
          :global(.header_area),
          :global(#header),
          .reading_progress_rail,
          .whitepaper_floating_hud,
          .whitepaper_hero_header,
          .sticky_outline_panel,
          .mobile_toc_accordion,
          .executive_abstract_box,
          .whitepaper_dynamic_body,
          .whitepaper_tags_section,
          .whitepaper_author_dossier_card,
          .research_citation_footer,
          .related_publications_matrix,
          .whitepaper_discussions_section,
          .citation_modal_overlay {
            display: none !important;
          }

          body,
          .whitepaper_codex_viewport {
            background: #ffffff !important;
            color: #111827 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            font-size: 9.5pt !important;
            line-height: 1.5 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          .academic_a4_print_template {
            display: block !important;
            width: 100% !important;
            background: #ffffff !important;
            color: #111827 !important;
            box-sizing: border-box;
          }

          .print_running_header {
            font-size: 7.5pt;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: #64748b;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
            margin-bottom: 12px;
          }

          .print_classification_badge {
            font-size: 7pt;
            font-weight: 800;
            color: #0284c7;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 6px;
          }

          .print_paper_title {
            font-size: 17pt !important;
            font-weight: 900 !important;
            line-height: 1.22 !important;
            color: #0f172a !important;
            margin-bottom: 10px !important;
            letter-spacing: -0.02em;
          }

          .print_author_block {
            font-size: 8.5pt;
            line-height: 1.45;
            color: #334155;
            margin-bottom: 12px;
          }

          .print_author_primary strong {
            color: #0f172a;
            font-size: 9.5pt;
          }

          .print_author_contact {
            color: #64748b;
            font-size: 8pt;
          }

          .print_metadata_grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 6px;
            border: 1px solid #cbd5e1;
            background: #f8fafc;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 7.5pt;
            margin-bottom: 14px;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print_meta_cell {
            display: flex;
            flex-direction: column;
          }

          .print_meta_lbl {
            font-weight: 800;
            font-size: 6.5pt;
            color: #64748b;
            letter-spacing: 0.04em;
          }

          .print_meta_val {
            font-weight: 700;
            color: #0f172a;
          }

          .print_abstract_box {
            border-left: 3px solid #0284c7;
            background: #f1f5f9;
            padding: 9px 12px;
            border-radius: 2px;
            margin-bottom: 14px;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print_abstract_title {
            font-size: 7.5pt;
            font-weight: 800;
            color: #0284c7;
            letter-spacing: 0.06em;
            margin-bottom: 3px;
          }

          .print_abstract_text {
            font-size: 8.5pt;
            line-height: 1.45;
            font-style: italic;
            color: #334155;
            margin-bottom: 5px;
          }

          .print_keywords_row {
            font-size: 7.5pt;
            color: #475569;
          }

          .print_figure {
            text-align: center;
            margin: 12px 0;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print_figure img {
            max-width: 68%;
            max-height: 175px;
            object-fit: contain;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
          }

          .print_caption {
            font-size: 7.5pt;
            color: #475569;
            margin-top: 4px;
            font-style: italic;
            max-width: 80%;
            margin-left: auto;
            margin-right: auto;
          }

          .print_sec_h2 {
            font-size: 11.5pt !important;
            font-weight: 800 !important;
            color: #0f172a !important;
            margin-top: 14px !important;
            margin-bottom: 5px !important;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 2px;
            page-break-after: avoid;
            break-after: avoid;
          }

          .print_sec_num {
            color: #0284c7;
            font-weight: 900;
          }

          .print_sec_h3 {
            font-size: 9.5pt !important;
            font-weight: 700 !important;
            color: #1e293b !important;
            margin-top: 8px !important;
            margin-bottom: 3px !important;
            page-break-after: avoid;
            break-after: avoid;
          }

          .print_sec_subnum {
            color: #64748b;
          }

          .print_paragraph {
            font-size: 8.8pt;
            line-height: 1.45;
            color: #1e293b;
            margin-bottom: 6px;
            text-align: justify;
          }

          .print_paragraph_spacer {
            height: 4px;
          }

          .print_bullet_item {
            font-size: 8.5pt;
            line-height: 1.4;
            color: #1e293b;
            margin-bottom: 3px;
            display: flex;
            align-items: flex-start;
            gap: 6px;
            padding-left: 8px;
          }

          .print_bullet_symbol {
            color: #0284c7;
            font-weight: 900;
          }

          .print_ordered_item {
            font-size: 8.5pt;
            line-height: 1.4;
            color: #0f172a;
            margin-bottom: 3px;
            background: #f8fafc;
            padding: 3px 8px;
            border-left: 2px solid #0284c7;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print_divider {
            border: 0;
            border-top: 1px dashed #cbd5e1;
            margin: 10px 0;
          }

          .print_author_bio_card {
            border: 1px solid #cbd5e1;
            background: #f8fafc;
            padding: 8px 12px;
            border-radius: 4px;
            margin-top: 14px;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print_bio_avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 1.5px solid #0284c7;
          }

          .print_bio_name {
            font-weight: 800;
            font-size: 9pt;
            color: #0f172a;
          }

          .print_bio_title {
            font-size: 7.5pt;
            color: #0284c7;
            font-weight: 600;
            margin-bottom: 2px;
          }

          .print_bio_text {
            font-size: 7.5pt;
            color: #475569;
            line-height: 1.35;
          }

          .print_references_section {
            margin-top: 12px;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print_ref_list {
            font-size: 7.5pt;
            line-height: 1.4;
            color: #334155;
            padding-left: 16px;
            margin-bottom: 8px;
          }

          .print_bibtex_box {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            padding: 6px 10px;
            border-radius: 4px;
          }

          .print_bibtex_title {
            font-size: 7pt;
            font-weight: 800;
            color: #475569;
            margin-bottom: 3px;
          }

          .print_bibtex_code {
            font-family: "Courier New", Courier, monospace;
            font-size: 6.8pt;
            line-height: 1.25;
            color: #0f172a;
            margin-bottom: 0;
            white-space: pre-wrap;
          }

          .print_running_footer {
            border-top: 1px solid #cbd5e1;
            padding-top: 6px;
            margin-top: 14px;
            font-size: 7pt;
            color: #64748b;
          }
        }
      `}</style>
    </div>
  );
}
