"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAllBlogs, getBlogBySlug, BlogPost } from "@/lib/cms-store";

function SingleBlogContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "aims-to-fcos-intelligent-factory-operating-systems";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const found = getBlogBySlug(slug);
    if (found) {
      setPost(found);
    } else {
      const all = getAllBlogs();
      if (all.length > 0) setPost(all[0]);
    }
    const all = getAllBlogs();
    setRecentPosts(all.slice(0, 4));
  }, [slug]);

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading article...</h2>
      </div>
    );
  }

  // Parse markdown headers and bullet points simply for clean readable layout
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="content_h3 mt-4 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h4 key={idx} className="content_h4 mt-3 mb-2">
            {trimmed.replace("#### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("---")) {
        return <hr key={idx} className="my-4 border_divider" />;
      }
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="content_li ml-4 mb-2">
            {trimmed.replace(/^(\*|-)\s+/, "")}
          </li>
        );
      }
      if (trimmed.match(/^[0-9]+\.\s+/)) {
        return (
          <div key={idx} className="content_num_point mb-2 pl-3 border-left border-primary">
            {trimmed}
          </div>
        );
      }
      if (!trimmed) {
        return <div key={idx} className="content_spacing my-2" />;
      }
      return (
        <p key={idx} className="content_p mb-3">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      {/* Banner Area */}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-center">
              <span className="badge badge-primary py-1 px-3 mb-2">{post.category}</span>
              <h2 className="mt-2 text-white">{post.title}</h2>
              <div className="page_link">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <span className="text-white">Article</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="blog_area single-post-area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 posts-list">
              <div className="single-post row">
                {/* Meta details bar */}
                <div className="col-lg-3 col-md-3">
                  <div className="blog_info text-md-right text-left mb-4 mb-md-0">
                    <div className="post_tag mb-3">
                      <span className="badge badge-info">{post.category}</span>
                    </div>
                    <ul className="blog_meta list-unstyled">
                      <li className="mb-2">
                        <strong className="text-dark d-block">Author:</strong>
                        <span className="text-muted">{post.author}</span>
                      </li>
                      <li className="mb-2">
                        <strong className="text-dark d-block">Role:</strong>
                        <span className="text-muted small">{post.authorRole}</span>
                      </li>
                      <li className="mb-2">
                        <strong className="text-dark d-block">Published:</strong>
                        <span className="text-muted small">{post.publishedDate}</span>
                      </li>
                      <li className="mb-2">
                        <strong className="text-dark d-block">Read Time:</strong>
                        <span className="text-muted small">{post.readTime}</span>
                      </li>
                      <li>
                        <strong className="text-dark d-block">Engagement:</strong>
                        <span className="text-muted small">{post.views} views</span>
                      </li>
                    </ul>

                    <div className="article_share_strip mt-4 pt-3 border-top">
                      <span className="small text-muted d-block mb-2 font-weight-bold">Share Article:</span>
                      <div className="d-flex justify-content-md-end gap-2">
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://itsgkaranmishra.web.app/single-blog?slug=" + post.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                          title="Share on LinkedIn"
                        >
                          <i className="fa fa-linkedin"></i>
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent("https://itsgkaranmishra.web.app/single-blog?slug=" + post.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-info"
                          title="Share on Twitter / X"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Body */}
                <div className="col-lg-9 col-md-9 blog_details">
                  <div className="article_header_box mb-4">
                    <h1 className="article_main_title">{post.title}</h1>
                    <p className="article_lead_summary">{post.summary}</p>
                  </div>

                  <div className="article_markdown_body">
                    {renderFormattedContent(post.content)}
                  </div>

                  {/* Article Tags */}
                  <div className="tags_wrap mt-5 pt-4 border-top">
                    <h5 className="mb-3 font-weight-bold">Categorized Tags:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {post.tags.map((t, idx) => (
                        <span key={idx} className="badge badge-light p-2 border mr-2 mb-2 font-weight-normal">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="navigation-area mt-5 pt-4 border-top d-flex justify-content-between">
                    <Link href="/blog" className="btn btn-outline-secondary">
                      &larr; Back to All Insights
                    </Link>
                    <Link href="/contact" className="primary_btn heartbeat_soft">
                      <span>Inquire About Engineering Consulting &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                <aside className="single_sidebar_widget author_widget p-4 mb-4">
                  <div className="text-center">
                    <div className="author_avatar_circle mx-auto mb-3">
                      <img src="/img/png/logo-no-background.png" alt="Karan Mishra" className="img-fluid" />
                    </div>
                    <h4>Karan Mishra</h4>
                    <p className="text-primary font-weight-bold mb-2">Founder, Aurxon &bull; AI Engineer</p>
                    <p className="small text-muted mb-3">
                      Building the autonomous enterprise with Factory Central OS (FCOS) and ALAMS agentic architectures.
                    </p>
                    <Link href="/contact" className="primary_btn btn-sm">
                      <span>Direct Consultation</span>
                    </Link>
                  </div>
                </aside>

                {/* Recent Articles */}
                <aside className="single_sidebar_widget popular_post_widget p-4 mb-4">
                  <h4 className="widget_title mb-3 font-weight-bold">Recent Insights</h4>
                  {recentPosts.map((r) => (
                    <div key={r.id} className="media post_item mb-3 pb-2 border-bottom">
                      <div className="media-body">
                        <Link href={`/single-blog?slug=${r.slug}`}>
                          <h6 className="font-weight-bold text-dark mb-1">{r.title}</h6>
                        </Link>
                        <p className="small text-muted mb-0">{r.publishedDate} &bull; {r.readTime}</p>
                      </div>
                    </div>
                  ))}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .article_main_title {
          font-size: 2.1rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.3;
          margin-bottom: 14px;
        }
        .dark .article_main_title {
          color: #ffffff;
        }
        .article_lead_summary {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #475569;
          font-weight: 500;
          border-left: 4px solid #4458dc;
          padding-left: 18px;
        }
        .dark .article_lead_summary {
          color: #94a3b8;
        }
        .article_markdown_body {
          font-size: 1.02rem;
          line-height: 1.8;
          color: #334155;
        }
        .dark .article_markdown_body {
          color: #cbd5e1;
        }
        .content_h3 {
          font-size: 1.45rem;
          font-weight: 800;
          color: #0f172a;
        }
        .dark .content_h3 {
          color: #f1f5f9;
        }
        .content_h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1e293b;
        }
        .dark .content_h4 {
          color: #e2e8f0;
        }
        .content_li {
          list-style-type: disc;
          line-height: 1.7;
        }
        .border_divider {
          border-color: #e2e8f0;
        }
        .dark .border_divider {
          border-color: #1e293b;
        }
      `}} />
    </>
  );
}

export default function SingleBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading technical article...</p>
        </div>
      }
    >
      <SingleBlogContent />
    </Suspense>
  );
}

