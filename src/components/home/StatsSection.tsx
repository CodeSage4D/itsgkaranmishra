import React from "react";
import Image from "next/image";
import { Phone, Briefcase, Award, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const StatsSection: React.FC = () => {
  const brandLogos = [
    "/img/brands/logo1.png",
    "/img/brands/logo2.png",
    "/img/brands/logo3.png",
    "/img/brands/logo4.png",
    "/img/brands/logo5.png",
    "/img/brands/logo6.png",
    "/img/brands/logo7.png",
    "/img/brands/logo8.png",
    "/img/brands/logo9.png",
  ];

  return (
    <section className="py-14 bg-surface/30 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Brand Logos Carousel/Grid */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Technologies, Frameworks & Tooling Stack
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 gap-3">
              {brandLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="h-16 rounded-xl bg-surface border border-white/5 flex items-center justify-center p-3 grayscale hover:grayscale-0 hover:border-primary/40 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo}
                      alt={`Partner Logo ${idx + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics & Call Now Hotline */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-surface/70 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">1+ Year</div>
                <div className="text-xs text-slate-400">Professional R&D & Engineering Experience</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-surface/70 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 text-accent-emerald flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">99.97%</div>
                <div className="text-xs text-slate-400">Fraud Model Classification Accuracy</div>
              </div>
            </div>

            {/* Direct Call Hotline Card - Preserved from index.html */}
            <div className="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-surface/80 to-surface/80 border border-primary/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-glow-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                    Call Now For Inquiries
                  </div>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-accent-cyan transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-medium text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-3 py-1 rounded-full">
                  Mon - Fri (9am - 6pm IST)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
