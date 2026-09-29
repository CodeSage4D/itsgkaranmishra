import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileDown, CheckCircle2, Sparkles, Building2, Code2 } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { siteConfig } from "@/data/siteConfig";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats & Brands Stack */}
      <StatsSection />

      {/* About Me & i AIM LABS Spotlight */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-surface/70 border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-3xl pointer-events-none" />

                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/5">
                  <Image
                    src="/img/about-us.png"
                    alt="About Karan Mishra"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>

                {/* Company Mini Card */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center p-1.5 shrink-0">
                      <Image
                        src="/img/iaimlabs_logo/logo-no-background.png"
                        alt="i AIM LABS"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">i AIM LABS</h4>
                      <p className="text-xs text-slate-400">Founder & CEO</p>
                    </div>
                  </div>
                  <Link
                    href="/about"
                    className="text-xs font-semibold text-primary hover:text-accent-cyan transition-colors flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let’s Introduce Myself</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                Turning Complex Machine Learning Concepts into Real-World Solutions
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Hey there! I am <strong className="text-white">Karan Mishra</strong>, a tech enthusiast and computer science engineer with a relentless drive for turning complex ideas into practical, innovative software solutions.
              </p>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                I am the founder of <strong className="text-slate-200">i AIM LABS</strong>, an IT services and consultancy company where we empower businesses with state-of-the-art machine learning, AI automation, and bespoke software. Whether it is engineering high-accuracy fraud detection systems (99.97% accuracy on 6.36M records) or developing cross-platform plugins, I am all about pushing boundaries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                  <span>Founder & CEO @ i AIM LABS</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>B.Sc in CS @ SAIT (CGPA 8.26)</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-violet shrink-0" />
                  <span>R&D Experience @ Geek Theory</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-coral shrink-0" />
                  <span>Python, ML, Next.js & Cordova</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={siteConfig.resumeUrl}
                  download="Karan_Mishra_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-cyan text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow-md transition-all duration-200"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Detailed CV</span>
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-white/10 text-white text-sm font-semibold hover:border-primary/50 transition-all duration-200"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Full About & Company Story</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesPreview />

      {/* Portfolio Showcase Section */}
      <PortfolioSection initialLimit={6} showFilterTabs={true} />

      {/* Professional Experience Timeline */}
      <ExperienceTimeline />

      {/* Bottom Call to Action Banner */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-primary/20 via-surface to-[#080c14] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
            Ready to Build the Future?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Let’s Build Something Extraordinary Together
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Whether you need custom machine learning models, automated data workflows, high-velocity scraping bots, or modern web applications, I am ready to collaborate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent-cyan text-white font-semibold text-sm shadow-glow-md hover:shadow-glow-lg transition-all"
            >
              <span>Get in Touch with Karan</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface border border-white/15 text-white font-semibold text-sm hover:border-primary/50 transition-all"
            >
              <span>Email: {siteConfig.email}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
