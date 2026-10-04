import React from "react";
import { Metadata } from "next";
import { INITIAL_BLOGS, getBlogBySlug } from "@/lib/cms-store";
import BlogReaderClient from "./BlogReaderClient";

interface Props {
  params: {
    slug: string;
  };
}

// Generate static params for Next.js static export
export async function generateStaticParams() {
  return INITIAL_BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = INITIAL_BLOGS.find((b) => b.slug === params.slug);
  if (!post) {
    return {
      title: "Technical Article | Karan Mishra",
      description: "Applied AI, Factory Operating Systems and Autonomous Agentic Workflows.",
    };
  }

  return {
    title: `${post.title} | Karan Mishra`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default function SingleBlogPostPage({ params }: Props) {
  return <BlogReaderClient slug={params.slug} />;
}
