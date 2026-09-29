import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { blogPostsData } from "@/data/blogs";

export const metadata = {
  title: "Blog & Technical Insights",
  description:
    "Engineering articles and research reflections by Karan Mishra on machine learning, NLP, fraud detection, and software architecture.",
};

export default function BlogPage() {
  return (
    <div className="relative">
      <PageHeader
        badge="Engineering Notes"
        title="Technical Insights & Case Reflections"
        subtitle="In-depth explorations into machine learning pipelines, deep learning vision models, NLP negation parsing, and building tech solutions at i AIM LABS."
        breadcrumb={[{ label: "Blog" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl bg-surface/50 border border-white/5 hover:border-primary/40 hover:bg-surface/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl shadow-black/20 hover:-translate-y-1.5"
            >
              <div>
                {/* Article Image */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-accent-cyan border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Meta items */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="p-6 pt-0 border-t border-transparent">
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{post.author}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-accent-cyan transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
