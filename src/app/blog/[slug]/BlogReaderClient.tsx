"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogBySlug, getAllBlogs, BlogPost } from "@/lib/cms-store";
import { recordClientClick } from "@/lib/analytics-client";

interface Props {
  slug: string;
}

export default function BlogReaderClient({ slug }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);

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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      recordClientClick({
        elementText: `Share Article: ${post?.title}`,
        pagePath: window.location.pathname,
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!post) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2 className="mb-3">Article Loading...</h2>
        <p className="text-muted mb-4">Retrieving publication from Aurxon Technical Publications Engine.</p>
        <Link href="/blog" className="primary_btn">
          <span>&larr; Back to All Articles</span>
        </Link>
      </div>
    );
  }

  const related = allPosts.filter((b) => b.id !== post.id).slice(0, 3);

  // Formatted content parser
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="content_h3 mt-5 mb-3 font-weight-bold" style={{ color: "#0284c7" }}>
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h4 key={idx} className="content_h4 mt-4 mb-2 font-weight-bold">
            {trimmed.replace("#### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("---")) {
        return <hr key={idx} className="my-4" style={{ borderColor: "rgba(255,255,255,0.1)" }} />;
      }
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="content_li ml-4 mb-2" style={{ listStyleType: "square", color: "rgba(255,255,255,0.85)" }}>
            {trimmed.replace(/^(\*|-)\s+/, "")}
          </li>
        );
      }
      if (trimmed.match(/^[0-9]+\.\s+/)) {
        return (
          <div key={idx} className="content_num_point mb-3 p-3 rounded" style={{ background: "rgba(2, 132, 199, 0.08)", borderLeft: "3px solid #0284c7" }}>
            {trimmed}
          </div>
        );
      }
      if (!trimmed) {
        return <div key={idx} className="my-3" />;
      }
      return (
        <p key={idx} className="mb-3" style={{ lineHeight: "1.8", fontSize: "1.08rem", color: "rgba(255,255,255,0.9)" }}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      {/* Header Banner */}
      <section className="banner_area" style={{ background: "linear-gradient(135deg, #070a13 0%, #0f172a 100%)", padding: "120px 0 60px" }}>
        <div className="container">
          <div className="banner_content text-center">
            <div className="mb-3">
              <span className="badge badge-primary py-2 px-3 mr-2" style={{ fontSize: "0.85rem", background: "#0284c7" }}>
                {post.category}
              </span>
              <span className="badge badge-dark py-2 px-3 text-muted" style={{ fontSize: "0.85rem" }}>
                {post.readTime}
              </span>
            </div>
            <h1 className="mt-2 text-white font-weight-bold" style={{ maxWidth: "900px", margin: "0 auto", fontSize: "2.4rem", lineHeight: "1.3" }}>
              {post.title}
            </h1>
            <div className="page_link mt-3 text-muted" style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
              <Link href="/" className="text-muted">Home</Link>
              <span>/</span>
              <Link href="/blog" className="text-muted">Blog</Link>
              <span>/</span>
              <span className="text-primary font-weight-bold">{post.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="blog_single_area py-5" style={{ background: "#070a13", minHeight: "80vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {/* Meta Top Bar */}
              <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom flex-wrap gap-2" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src="/img/founder/karan-mishra-founder.jpg"
                    alt="Karan Mishra - Author"
                    style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0284c7" }}
                  />
                  <div>
                    <div className="font-weight-bold text-white">{post.author}</div>
                    <small className="text-muted">{post.authorRole} &bull; {post.publishedDate}</small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                    style={{ borderRadius: "20px", padding: "6px 16px" }}
                  >
                    <span>{copied ? "✓ Copied Link" : "🔗 Share Article"}</span>
                  </button>
                  <Link
                    href="/blog"
                    className="btn btn-outline-secondary btn-sm"
                    style={{ borderRadius: "20px", padding: "6px 14px" }}
                  >
                    All Publications
                  </Link>
                </div>
              </div>

              {/* Article Summary Box */}
              <div className="p-4 mb-4 rounded" style={{ background: "rgba(15, 23, 42, 0.7)", border: "1px solid rgba(2, 132, 199, 0.3)", borderLeft: "4px solid #0284c7" }}>
                <h6 className="text-uppercase font-weight-bold text-primary mb-2" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
                  Executive Architecture Summary
                </h6>
                <p className="mb-0 text-white-50" style={{ fontSize: "1.05rem", fontStyle: "italic", lineHeight: "1.6" }}>
                  &ldquo;{post.summary}&rdquo;
                </p>
              </div>

              {/* Formatted Article Body */}
              <div className="article_body text-white mb-5" style={{ fontSize: "1.08rem" }}>
                {renderFormattedContent(post.content)}
              </div>

              {/* Tags Row */}
              <div className="pt-4 border-top mb-5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="text-muted mr-3">Architecture Tags:</span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="badge badge-dark py-2 px-3 mr-2 mb-2"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Dossier Card */}
              <div className="p-4 rounded mb-5" style={{ background: "linear-gradient(135deg, rgba(30, 27, 75, 0.4), rgba(15, 23, 42, 0.8))", border: "1px solid rgba(99, 102, 241, 0.25)" }}>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <img
                    src="/img/founder/karan-mishra-founder.jpg"
                    alt="Karan Mishra (Karann Mishra) - Founder Aurxon"
                    style={{ width: "65px", height: "65px", borderRadius: "50%", objectFit: "cover", border: "2px solid #06b6d4" }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="text-white mb-1">Authored by Karan Mishra</h5>
                    <p className="text-muted small mb-2">Founder &amp; Chief AI Architect, Aurxon &bull; Trainer, SCSIT Symbiosis University</p>
                    <p className="small text-white-50 mb-0">
                      Author of 47+ public open-source codebases on GitHub (@CodeSage4D). Architect of the FCOS Factory Central Operating System and ALAMS Multi-Agent Swarm.
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <a
                      href="https://github.com/CodeSage4D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-light"
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://aurxon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                      style={{ background: "#0284c7" }}
                    >
                      Aurxon HQ ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Publications */}
              {related.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-white font-weight-bold mb-4">Related Technical Publications</h4>
                  <div className="row g-3">
                    {related.map((rel) => (
                      <div key={rel.id} className="col-md-4 mb-3">
                        <div className="p-3 rounded h-100 d-flex flex-column justify-content-between" style={{ background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <div>
                            <span className="badge badge-primary small mb-2" style={{ background: "#0284c7" }}>{rel.category}</span>
                            <h6 className="text-white mt-1" style={{ fontSize: "0.95rem", lineHeight: "1.4" }}>
                              <Link href={`/blog/${rel.slug}`} className="text-white">
                                {rel.title}
                              </Link>
                            </h6>
                          </div>
                          <Link href={`/blog/${rel.slug}`} className="text-primary small mt-3">
                            Read Article &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
