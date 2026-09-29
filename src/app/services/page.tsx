"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Laptop,
  LineChart,
  Bot,
  FlaskConical,
  Palette,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Mail,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { servicesData } from "@/data/services";

export default function ServicesPage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const getServiceIcon = (id: string) => {
    const props = { className: "w-8 h-8" };
    switch (id) {
      case "machine-learning":
        return <Brain {...props} style={{ color: "#007FFF" }} />;
      case "web-development":
        return <Laptop {...props} style={{ color: "#FF5733" }} />;
      case "data-analytics":
        return <LineChart {...props} style={{ color: "#28A745" }} />;
      case "ai-automation":
        return <Bot {...props} style={{ color: "#FFC107" }} />;
      case "research-development":
        return <FlaskConical {...props} style={{ color: "#FF6347" }} />;
      case "ui-ux-design":
        return <Palette {...props} style={{ color: "#8B5CF6" }} />;
      case "cybersecurity-consulting":
        return <ShieldCheck {...props} style={{ color: "#10B981" }} />;
      case "cloud-integration":
      default:
        return <Cloud {...props} style={{ color: "#00B4D8" }} />;
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setNewsletterStatus("Thank you for subscribing! You will receive future tech and engineering insights.");
    setNewsletterEmail("");
  };

  return (
    <div className="relative">
      <PageHeader
        badge="Tailored Offerings"
        title="Services & Engineering Capabilities"
        subtitle="End-to-end technical consulting, bespoke machine learning development, data analytics, and modern full-stack web architectures."
        breadcrumb={[{ label: "Services" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Services Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="group p-6 rounded-3xl bg-surface/50 border border-white/5 hover:border-primary/40 hover:bg-surface/80 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/20 hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.id)}
                  </div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-cyan mb-1">
                    {service.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature bullet points */}
                  {service.features && (
                    <ul className="space-y-2 mb-6 text-xs text-slate-300">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent-cyan transition-colors"
                  >
                    <span>Request Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consulting Methodology Workflow */}
        <section className="p-8 sm:p-12 rounded-3xl bg-surface/40 border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              The Engineering Process
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
              How We Work at i AIM LABS
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              A structured, transparent engineering lifecycle ensuring high-velocity delivery without technical debt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Analysis",
                desc: "Thorough requirements intake, data availability audit, and feasibility validation.",
              },
              {
                step: "02",
                title: "Architecture & Modeling",
                desc: "Designing scalable schemas, training baseline models, and prototyping interfaces.",
              },
              {
                step: "03",
                title: "Rigorous Implementation",
                desc: "Clean modular coding in Next.js & Python with automated test coverage and cross-validation.",
              },
              {
                step: "04",
                title: "Deployment & Scaling",
                desc: "Cloud launch on Firebase/Vercel with CI/CD automation, monitoring, and ongoing support.",
              },
            ].map((phase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-black/40 border border-white/5 relative"
              >
                <div className="text-3xl font-black text-primary/40 font-mono mb-3">
                  {phase.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section - Preserved & Upgraded from services.html */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-primary/30 via-surface to-[#0c1322] border border-primary/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get Updates & Technical Insights
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Stay informed with the latest updates on machine learning breakthroughs, product launches, and consultancy insights directly from Karan Mishra.
            </p>

            <form onSubmit={handleNewsletter} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full sm:w-80 px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-coral to-primary text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Get Started</span>
              </button>
            </form>

            {newsletterStatus && (
              <p className="text-xs text-accent-emerald pt-2">{newsletterStatus}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
