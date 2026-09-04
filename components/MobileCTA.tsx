"use client";

import { analytics } from "@/lib/analytics";
import { CTA } from "@/lib/constants";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 p-3 backdrop-blur-md md:hidden">
      <a
        href="#lead"
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-cta text-sm font-semibold text-cta-ink"
        onClick={() => analytics.track("hero_cta_click", { source: "mobile_sticky" })}
      >
        📷 {CTA.mobile}
      </a>
    </div>
  );
}
