"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlogReaderClient from "@/app/blog/[slug]/BlogReaderClient";

/**
 * Universal Single Blog & Whitepaper Route
 * Bridges query-parameter navigation to the high-tech BlogReaderClient terminal
 */
function SingleBlogContainer() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "aims-to-fcos-intelligent-factory-operating-systems";

  return <BlogReaderClient slug={slug} />;
}

export default function SingleBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="py-5 text-center" style={{ minHeight: "80vh", background: "#060913", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="text-gold font-mono">INITIALIZING RESEARCH CODEX TERMINAL...</div>
        </div>
      }
    >
      <SingleBlogContainer />
    </Suspense>
  );
}
