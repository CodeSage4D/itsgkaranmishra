"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileDown, Sparkles, Terminal, Code2, Brain } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-accent-cyan/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-primary/30 text-xs font-medium text-slate-300 backdrop-blur-md shadow-glow-sm">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span className="text-white font-semibold">Available for AI & Engineering Projects</span>
              <span className="text-slate-500">•</span>
              <span className="text-primary font-mono">i AIM LABS</span>
            </div>

            {/* Main Greeting and Headline */}
            <div className="space-y-2">
              <h2 className="text-sm sm:text-base font-mono tracking-widest text-accent-cyan uppercase">
                Hello & Welcome
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-cyan to-white">Karan Mishra</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300">
                Founder & CEO of <strong className="text-white">i AIM LABS</strong> | Machine Learning & Software Engineer
              </p>
            </div>

            {/* Narrative description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transforming complex engineering concepts into high-impact software, predictive machine learning models, and automated business tools. Delivering research-backed innovation from Indore, India to the world.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-cyan text-white text-sm font-semibold shadow-glow-md hover:shadow-glow-lg hover:scale-105 transition-all duration-200"
              >
                <span>Hire Me / Start Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={siteConfig.resumeUrl}
                download="Karan_Mishra_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-white/10 text-white text-sm font-semibold hover:bg-white/5 hover:border-primary/50 transition-all duration-200"
              >
                <FileDown className="w-4 h-4 text-accent-cyan" />
                <span>Get Detailed CV</span>
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-4 py-3 text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                <span>View Portfolio</span>
                <span className="text-primary">→</span>
              </Link>
            </div>

            {/* Quick Tech Highlights */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-primary" />
                <span>Machine Learning & NLP</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-accent-cyan" />
                <span>Next.js & Python</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-accent-emerald" />
                <span>R&D Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Glow Frame */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/30 to-accent-cyan/30 blur-2xl animate-pulse-glow" />

              {/* Main Container Card */}
              <div className="relative w-full h-full rounded-3xl bg-[#0c1322] border border-white/10 overflow-hidden shadow-2xl p-4 flex flex-col justify-end">
                {/* Background Tech Image */}
                <Image
                  src="/img/banner/home-right.png"
                  alt="Karan Mishra Portfolio Visual"
                  fill
                  className="object-contain object-bottom pt-4"
                  priority
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-transparent to-transparent opacity-80" />

                {/* Floating Stat Badge 1: 99.97% Accuracy */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg flex items-center gap-3 animate-float">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Fraud Detection</div>
                    <div className="text-sm font-bold text-white">99.97% Accuracy</div>
                  </div>
                </div>

                {/* Floating Stat Badge 2: i AIM LABS */}
                <div className="absolute bottom-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg flex items-center gap-3 animate-float" style={{ animationDelay: "2s" }}>
                  <div className="w-9 h-9 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Company</div>
                    <div className="text-sm font-bold text-white">i AIM LABS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
