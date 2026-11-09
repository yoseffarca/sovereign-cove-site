// After `vite build`: give every route its own HTML file (about.html, served at
// /about by server/entry.mjs) with that page's <head> tags
// baked in for search engines and link previews. Also writes 404.html.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const pages = JSON.parse(readFileSync(join(root, "src/content/pages.json"), "utf8"));
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function headTags(path, p) {
  const tags = [
    `<title data-rh>${esc(p.title)}</title>`,
    `<meta data-rh name="description" content="${esc(p.description)}" />`,
    `<meta data-rh property="og:title" content="${esc(p.ogTitle)}" />`,
    `<meta data-rh property="og:description" content="${esc(p.ogDescription)}" />`,
    `<meta data-rh property="og:type" content="website" />`,
  ];
  if (p.ogImage) tags.push(`<meta data-rh property="og:image" content="${esc(p.ogImage)}" />`);
  tags.push(`<meta data-rh name="twitter:card" content="${p.largeCard ? "summary_large_image" : "summary"}" />`);
  if (p.largeCard && p.ogImage) tags.push(`<meta data-rh name="twitter:image" content="${esc(p.ogImage)}" />`);
  tags.push(`<link data-rh rel="canonical" href="${path}" />`);
  return tags.join("\n    ");
}

const block = /<!--route-head-->[\s\S]*?<!--\/route-head-->/;
if (!block.test(template)) throw new Error("index.html is missing the <!--route-head--> block");

for (const [path, p] of Object.entries(pages)) {
  const html = template.replace(block, headTags(path, p));
  // Wix hosting serves /about from about.html (it strips trailing slashes).
  const out = path === "/" ? join(dist, "index.html") : join(dist, `${path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log("prerendered", path);
}

const notFound = template.replace(block, "<title data-rh>Page not found — The Sovereign Cove</title>");
writeFileSync(join(dist, "404.html"), notFound);
console.log("wrote 404.html");
