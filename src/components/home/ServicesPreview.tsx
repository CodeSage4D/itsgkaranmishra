import React from "react";
import Link from "next/link";
import { Brain, Laptop, LineChart, Bot, ArrowRight } from "lucide-react";
import { servicesData } from "@/data/services";

export const ServicesPreview: React.FC = () => {
  const featuredServices = servicesData.slice(0, 4);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "machine-learning":
        return <Brain className="w-8 h-8 text-[#007FFF]" />;
      case "web-development":
        return <Laptop className="w-8 h-8 text-[#FF5733]" />;
      case "data-analytics":
        return <LineChart className="w-8 h-8 text-[#28A745]" />;
      case "ai-automation":
      default:
        return <Bot className="w-8 h-8 text-[#FFC107]" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Specialized Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Engineering Services
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Specializing in cutting-edge technologies and client-tailored implementations to help businesses innovate, automate, and grow.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-cyan transition-colors"
          >
            <span>Explore All 8 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-surface/50 border border-white/5 hover:border-primary/40 hover:bg-surface/80 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/20 hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.id)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-accent-cyan transition-colors"
                >
                  <span>Learn more</span>
                  <span className="text-primary">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
