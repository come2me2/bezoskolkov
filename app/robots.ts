import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

/** Allow search + generative AI crawlers; keep API private. */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "Google-Extended",
    "GoogleOther",
    "ClaudeBot",
    "Anthropic-AI",
    "PerplexityBot",
    "Applebot-Extended",
    "Amazonbot",
    "Bytespider",
    "CCBot",
    "meta-externalagent",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
