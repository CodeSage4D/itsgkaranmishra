"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getAllBlogs, BlogPost } from "@/lib/cms-store";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      const matchCat = selectedCategory === "All" || b.category.toLowerCase() === selectedCategory.toLowerCase();
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
      {/* Banner Area */}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-center">
              <span className="blog_top_badge mb-2">Aurxon Technical Insights &bull; Engineering Blog</span>
              <h2 className="mt-2">AI Systems, FCOS &amp; Agentic Architectures</h2>
              <div className="page_link">
                <Link href="/">Home</Link>
                <Link href="/blog">Our Insights</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Listing Area */}
      <section className="blog_area section_gap">
        <div className="container">
          {/* Filter and Search Bar */}
          <div className="blog_filter_bar mb-5">
            <div className="category_pill_list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat_pill_btn ${selectedCategory === cat ? "active_cat_pill" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blog_search_wrapper">
              <input
                type="text"
                placeholder="Search AIMS, FCOS, ALAMS, Neural ERP, Machine Vision..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog_search_input"
              />
              <span className="search_icon">🔍</span>
            </div>
          </div>

          <div className="row">
            {/* Main Blog Posts Column */}
            <div className="col-lg-8">
              <div className="blog_left_sidebar">
                {filteredBlogs.length === 0 ? (
                  <div className="empty_blogs_card text-center p-5">
                    <h3>No articles found</h3>
                    <p className="text-muted">Try adjusting your search query or selected category.</p>
                    <button
                      className="primary_btn mt-3"
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                    >
                      <span>Reset Filters</span>
                    </button>
                  </div>
                ) : (
                  filteredBlogs.map((blog) => (
                    <article key={blog.id} className="row blog_item mb-5 pb-4 border-bottom">
                      <div className="col-md-3">
                        <div className="blog_info text-md-right text-left mb-3 mb-md-0">
                          <div className="post_tag mb-2">
                            <span className="badge badge-primary py-1 px-2">{blog.category}</span>
                          </div>
                          <ul className="blog_meta list-unstyled">
                            <li>
                              <span className="text-muted small">
                                <i className="fa fa-user mr-1 text-primary"></i> {blog.author}
                              </span>
                            </li>
                            <li>
                              <span className="text-muted small">
                                <i className="fa fa-calendar mr-1 text-primary"></i> {blog.publishedDate}
                              </span>
                            </li>
                            <li>
                              <span className="text-muted small">
                                <i className="fa fa-clock-o mr-1 text-primary"></i> {blog.readTime}
                              </span>
                            </li>
                            <li>
                              <span className="text-muted small">
                                <i className="fa fa-eye mr-1 text-primary"></i> {blog.views} views
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="blog_post_card">
                          <Link href={`/single-blog?slug=${blog.slug}`} className="blog_title_link">
                            <h3 className="blog_entry_title">{blog.title}</h3>
                          </Link>
                          <p className="blog_summary_text">{blog.summary}</p>

                          <div className="tags_row mb-3">
                            {blog.tags.map((t, idx) => (
                              <span key={idx} className="single_tag_badge">
                                #{t}
                              </span>
                            ))}
                          </div>

                          <Link href={`/single-blog?slug=${blog.slug}`} className="primary_btn heartbeat_soft">
                            <span>Read Full Technical Article &rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                {/* Author Widget */}
                <aside className="single_sidebar_widget author_widget p-4 mb-4">
                  <div className="text-center">
                    <div className="author_avatar_circle mx-auto mb-3">
                      <img src="/img/png/logo-no-background.png" alt="Karan Mishra" className="img-fluid" />
                    </div>
                    <h4 className="sidebar_heading">Karan Mishra</h4>
                    <p className="sidebar_role text-primary font-weight-bold mb-2">Founder &bull; Aurxon &bull; AI Engineer</p>
                    <p className="sidebar_bio small text-muted">
                      Architecting intelligent factory operating systems (FCOS), autonomous agentic management networks (ALAMS), and high-performance machine vision platforms.
                    </p>
                    <div className="social_sidebar_icons d-flex justify-content-center gap-2 mt-3">
                      <a href="https://github.com/CodeSage4D" target="_blank" rel="noopener noreferrer" className="social_circle">
                        <i className="fa fa-github"></i>
                      </a>
                      <a href="https://www.linkedin.com/in/itsgkaranmishra4" target="_blank" rel="noopener noreferrer" className="social_circle">
                        <i className="fa fa-linkedin"></i>
                      </a>
                      <a href="mailto:karannmishra136@gmail.com" className="social_circle">
                        <i className="fa fa-envelope-o"></i>
                      </a>
                    </div>
                  </div>
                </aside>

                {/* Post a Blog in Admin Quick Link */}
                <aside className="single_sidebar_widget admin_cta_widget p-4 mb-4">
                  <h4 className="widget_title mb-2">Have New Technical Insights?</h4>
                  <p className="small text-muted mb-3">
                    Authorized Aurxon contributors can publish new articles, case studies, and engineering updates directly from the Admin Portal.
                  </p>
                  <Link href="/admin" className="btn btn-outline-primary btn-block font-weight-bold">
                    🛡️ Open Admin CMS Portal
                  </Link>
                </aside>

                {/* Popular Topics */}
                <aside className="single_sidebar_widget popular_topics_widget p-4 mb-4">
                  <h4 className="widget_title mb-3">Core Research Topics</h4>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex justify-content-between py-2 border-bottom">
                      <span>Factory Central OS (FCOS)</span>
                      <span className="badge badge-light">AIMS Evolution</span>
                    </li>
                    <li className="d-flex justify-content-between py-2 border-bottom">
                      <span>ALAMS Agentic Systems</span>
                      <span className="badge badge-light">Multi-Agent</span>
                    </li>
                    <li className="d-flex justify-content-between py-2 border-bottom">
                      <span>Neural ERP &amp; Supply Chain</span>
                      <span className="badge badge-light">ACID + ML</span>
                    </li>
                    <li className="d-flex justify-content-between py-2">
                      <span>Medical Computer Vision</span>
                      <span className="badge badge-light">Cognivex</span>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog_top_badge {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: rgba(99, 102, 241, 0.15);
          color: #6366f1;
          padding: 6px 16px;
          border-radius: 50px;
        }
        .dark .blog_top_badge {
          color: #a5b4fc;
          background: rgba(99, 102, 241, 0.25);
        }
        .blog_filter_bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 20px;
        }
        .dark .blog_filter_bar {
          background: #0f172a;
          border-color: #1e293b;
        }
        .category_pill_list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cat_pill_btn {
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dark .cat_pill_btn {
          background: #1e293b;
          border-color: #334155;
          color: #cbd5e1;
        }
        .active_cat_pill {
          background: #4458dc !important;
          color: #ffffff !important;
          border-color: #4458dc !important;
        }
        .blog_search_wrapper {
          position: relative;
          min-width: 280px;
          flex: 1;
          max-width: 380px;
        }
        .blog_search_input {
          width: 100%;
          padding: 8px 36px 8px 14px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.88rem;
          outline: none;
        }
        .dark .blog_search_input {
          background: #1e293b;
          border-color: #334155;
          color: #ffffff;
        }
        .search_icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.9rem;
          opacity: 0.6;
        }
        .blog_entry_title {
          font-size: 1.55rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          line-height: 1.35;
          transition: color 0.2s;
        }
        .dark .blog_entry_title {
          color: #f8fafc;
        }
        .blog_entry_title:hover {
          color: #4458dc;
        }
        .blog_summary_text {
          font-size: 0.96rem;
          line-height: 1.65;
          color: #475569;
          margin-bottom: 16px;
        }
        .dark .blog_summary_text {
          color: #94a3b8;
        }
        .single_tag_badge {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 600;
          color: #6366f1;
          background: rgba(99, 102, 241, 0.08);
          padding: 2px 8px;
          border-radius: 6px;
          margin-right: 6px;
          margin-bottom: 6px;
        }
        .dark .single_tag_badge {
          color: #a5b4fc;
          background: rgba(99, 102, 241, 0.18);
        }
        .single_sidebar_widget {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
        }
        .dark .single_sidebar_widget {
          background: #0f172a;
          border-color: #1e293b;
        }
        .author_avatar_circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #ffffff;
          padding: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        .social_circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          text-decoration: none !important;
          transition: all 0.2s;
        }
        .dark .social_circle {
          background: #1e293b;
          border-color: #334155;
          color: #f1f5f9;
        }
        .social_circle:hover {
          background: #4458dc;
          color: #ffffff;
        }
      `}} />
    </>
  );
}
