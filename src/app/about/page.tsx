import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileDown,
  Building2,
  GraduationCap,
  Award,
  CheckCircle2,
  Brain,
  Code2,
  Layers,
  ArrowUpRight,
  Target,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { educationData, certificationsData, technicalSkills } from "@/data/education";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "About Karan Mishra & i AIM LABS",
  description:
    "Learn about Karan Mishra, Founder & CEO of i AIM LABS, his academic achievements at SAIT Indore, R&D background at Geek Theory, and company mission.",
};

export default function AboutPage() {
  return (
    <div className="relative">
      <PageHeader
        badge="About Me & Company"
        title="Engineering Intelligent Solutions"
        subtitle="The journey, academic background, research work, and vision driving Karan Mishra and i AIM LABS."
        breadcrumb={[{ label: "About" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Personal Narrative Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-surface/70 border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/5">
                <Image
                  src="/img/about-us.png"
                  alt="Karan Mishra Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white">Karan Mishra</h3>
                <p className="text-xs text-primary font-mono font-medium mt-1">
                  Founder & CEO, i AIM LABS
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Computer Science Engineer • Indore, MP, India
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Background & Drive
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Curiosity-Driven Problem Solver with Passion for AI Innovation
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hello! I am <strong className="text-white">Karan Mishra</strong>, a passionate technology enthusiast with a deep-seated love for machine learning, artificial intelligence, and software development. My journey has been fueled by an insatiable curiosity and a relentless drive to solve complex problems and create impactful solutions.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              During my tenure as a Research and Development Intern at <strong>Geek Theory Pvt. Ltd.</strong>, I focused on enhancing machine learning models, developing Cordova Bluetooth Low Energy & Location plugins, and collaborating with cross-functional teams to bring innovative solutions to life.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              My educational foundation in Computer Science from <strong>Sri Aurobindo Institute of Technology (SAIT)</strong>, Indore (graduating with an 8.26 CGPA), coupled with hands-on development in Python, modern web frameworks, and predictive modeling, has equipped me with a diverse and resilient engineering mindset.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.resumeUrl}
                download="Karan_Mishra_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-cyan text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow-md transition-all duration-200"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV (Detailed PDF)</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-white/10 text-white text-sm font-semibold hover:border-primary/50 transition-all duration-200"
              >
                <span>Connect with Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Company Overview: i AIM LABS */}
        <section className="p-8 sm:p-12 rounded-3xl bg-surface/50 border border-primary/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono uppercase tracking-wider text-accent-cyan">
                <Building2 className="w-3.5 h-3.5" />
                <span>The Company</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                i AIM LABS
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                Turning ideas into reality through cutting-edge technology, artificial intelligence, and purposeful innovation.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="w-44 h-44 rounded-2xl bg-black/40 border border-white/10 p-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/img/iaimlabs_logo/logo-no-background.png"
                    alt="i AIM LABS Official Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed mb-10">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span>Our Mission</span>
              </h3>
              <p>
                Our mission at i AIM LABS is to harness the power of modern technology to create innovative, bespoke solutions that empower businesses to thrive in an ever-evolving digital landscape. We believe in never repeating mistakes, ensuring each deployment is a disciplined step forward in quality and reliability.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent-cyan" />
                <span>Our Vision</span>
              </h3>
              <p>
                To be a global leader in technology innovation, recognized for our uncompromising commitment to quality, client satisfaction, and scientific integrity. We envision a future where every small business can thrive alongside industry leaders by connecting them digitally and executing their projects with perfection.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Core Company Specialties & Industry Domain:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                "Machine Learning & AI",
                "Software Development",
                "Data Analytics & Insights",
                "Innovative Product Dev",
                "Applied R&D Engineering",
              ].map((specialty, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-black/40 border border-white/5 text-center text-xs font-semibold text-slate-200"
                >
                  {specialty}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Honors */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Academic Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Education & Academic Honors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-mono text-accent-cyan mb-1">{edu.period}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                  <div className="text-sm font-medium text-slate-300 mb-3">{edu.institution}</div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-accent-emerald border border-emerald-500/20 mb-4">
                    {edu.score}
                  </div>
                  {edu.details && (
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications & Awards */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
              Accreditation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Certifications & Accolades
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationsData.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface/50 border border-white/5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{cert.title}</h3>
                  <div className="text-xs font-semibold text-primary mb-2">{cert.issuer}</div>
                  {cert.description && (
                    <p className="text-xs text-slate-400 leading-relaxed">{cert.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Matrix */}
        <section className="p-8 sm:p-10 rounded-3xl bg-surface/40 border border-white/10 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Technical Skills & Tooling Matrix</h3>
            <p className="text-sm text-slate-400">
              A comprehensive breakdown of programming languages, machine learning frameworks, data analytics libraries, and developer tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold">
                Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.languages.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-slate-200 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                Web & Frameworks
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.frameworks.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-slate-200 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-accent-emerald font-bold">
                Machine Learning & AI
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.machineLearning.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-slate-200 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-accent-amber font-bold">
                Data Analytics & Viz
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.dataAnalytics.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-slate-200 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-accent-violet font-bold">
                DevOps & Automation
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.toolsAndDevOps.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-slate-200 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-accent-coral font-bold">
                Databases & Storage
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.databases.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-slate-200 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
