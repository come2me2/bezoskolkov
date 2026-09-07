import { buildSiteJsonLdGraph } from "@/lib/seo";

export function JsonLd() {
  const data = buildSiteJsonLdGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
