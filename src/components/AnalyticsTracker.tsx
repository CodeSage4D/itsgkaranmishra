"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackVisitor, trackClick } from "@/lib/analytics-client";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  // Track page / profile views
  useEffect(() => {
    if (!pathname) return;
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Small delay to ensure document title and window geometry are ready
    const timer = setTimeout(() => {
      trackVisitor(pathname);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Global click event listener for CTAs, links, buttons, cards
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest(
        "a, button, [role='button'], input[type='submit'], .portfolio_item, .blog_item, .feedback_card, .social_icon, .btn_action"
      ) as HTMLElement | null;

      if (clickable) {
        const text =
          clickable.innerText?.trim().slice(0, 60) ||
          clickable.getAttribute("aria-label") ||
          clickable.getAttribute("title") ||
          clickable.getAttribute("id") ||
          clickable.className?.slice(0, 40) ||
          "Interactive Action";

        const href = clickable.getAttribute("href") || undefined;
        const id = clickable.getAttribute("id") || undefined;
        const tagName = clickable.tagName || "BUTTON";

        trackClick(text, href, id, tagName);
      }
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
