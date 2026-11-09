// Per-page <head> tags. The same data (src/content/pages.json) is baked into
// each page's static HTML at build time by scripts/prerender-routes.mjs.
import pages from "../content/pages.json";

type PageSeo = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  largeCard?: boolean;
};

export function headFor(path: keyof typeof pages) {
  const p: PageSeo = pages[path];
  const meta: Record<string, string>[] = [
    { title: p.title },
    { name: "description", content: p.description },
    { property: "og:title", content: p.ogTitle },
    { property: "og:description", content: p.ogDescription },
    { property: "og:type", content: "website" },
  ];
  if (p.ogImage) meta.push({ property: "og:image", content: p.ogImage });
  meta.push({ name: "twitter:card", content: p.largeCard ? "summary_large_image" : "summary" });
  if (p.largeCard && p.ogImage) meta.push({ name: "twitter:image", content: p.ogImage });
  return () => ({ meta, links: [{ rel: "canonical", href: path }] });
}
