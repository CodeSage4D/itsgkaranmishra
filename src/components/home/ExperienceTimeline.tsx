import React from "react";
import { Rocket, Cog, Code, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experienceData } from "@/data/experience";

export const ExperienceTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Rocket":
        return <Rocket className="w-6 h-6 text-primary" />;
      case "Cogs":
        return <Cog className="w-6 h-6 text-accent-cyan" />;
      case "Code":
      default:
        return <Code className="w-6 h-6 text-accent-emerald" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-surface/10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Career Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Professional Experience & Leadership
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A track record of technical innovation, from corporate R&D to founding and growing an AI consulting venture.
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experienceData.map((item) => (
            <div
              key={item.id}
              className="relative p-6 sm:p-8 rounded-3xl bg-surface/60 border border-white/5 hover:border-primary/40 hover:bg-surface/90 transition-all duration-300 shadow-xl shadow-black/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-primary mt-0.5">
                      {item.company}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 sm:gap-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Achievements */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Deliverables & Impact:
                </h4>
                <ul className="space-y-2">
                  {item.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
