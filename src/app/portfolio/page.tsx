"use client";

import React from "react";
import Link from "next/link";
import { ModernProjectsSection } from "@/components/ModernProjectsSection";

export default function PortfolioPage() {
  return (
    <>
      {/* Banner Area */}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content text-center">
              <h2>Portfolio &bull; Quality Work</h2>
              <div className="page_link">
                <Link href="/">Home</Link>
                <Link href="/portfolio">Portfolio</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Projects Showcase Section */}
      <ModernProjectsSection />
    </>
  );
}
