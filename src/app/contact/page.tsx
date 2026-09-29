import React from "react";
import { MapPin, Phone, Mail, Clock, Building2, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Contact Karan Mishra",
  description:
    "Get in touch with Karan Mishra for software development, AI consulting, machine learning modeling, and IT services at i AIM LABS.",
};

export default function ContactPage() {
  return (
    <div className="relative">
      <PageHeader
        badge="Direct Communication"
        title="Get in Touch"
        subtitle="Let’s discuss your upcoming software project, AI integration, machine learning requirements, or consultancy needs."
        breadcrumb={[{ label: "Contact" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-surface/50 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Contact Information
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have a concrete project specification or want to explore potential AI automation avenues for your business, feel free to reach out directly.
              </p>

              <div className="space-y-5 pt-2">
                {/* Office Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold">
                      Location / Office
                    </h4>
                    <p className="text-sm font-medium text-white mt-0.5 leading-snug">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 text-accent-emerald flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold">
                      Phone & WhatsApp
                    </h4>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-sm font-semibold text-white hover:text-accent-cyan transition-colors mt-0.5 block"
                    >
                      {siteConfig.phone}
                    </a>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Mon to Fri • 9:00 AM to 6:00 PM IST</span>
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold">
                      Primary Email
                    </h4>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-white hover:text-primary transition-colors mt-0.5 block"
                    >
                      {siteConfig.email}
                    </a>
                    <a
                      href={`mailto:${siteConfig.secondaryEmail}`}
                      className="text-xs text-slate-400 hover:text-white transition-colors block mt-0.5"
                    >
                      {siteConfig.secondaryEmail}
                    </a>
                  </div>
                </div>

                {/* Company Link */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-accent-violet/10 text-accent-violet flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold">
                      Company Profile
                    </h4>
                    <a
                      href={siteConfig.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-accent-cyan transition-colors flex items-center gap-1.5 mt-0.5"
                    >
                      <span>i AIM LABS on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Card (Indore Coordinates) */}
            <div className="p-6 rounded-3xl bg-surface/30 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Coordinates: 22.7196° N, 75.8577° E
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-accent-cyan border border-primary/30">
                  Indore, India
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Headquartered in Indore, Madhya Pradesh, operating worldwide across remote and cloud-native technical engagements.
              </p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
