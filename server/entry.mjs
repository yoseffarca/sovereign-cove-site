// Tiny edge worker deployed with the site. Static files are served directly by
// Wix hosting; any other request (e.g. /about) lands here and is answered with
// the matching prerendered page (about.html), so clean URLs and deep links work.
const INTERNAL = "x-sc-page";

export default {
  async fetch(request, env) {
    // A lookup we made ourselves found no static file: stop here (no loops).
    if (request.headers.get(INTERNAL)) return new Response("Not found", { status: 404 });

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const target = path === "/" ? "/index.html" : /\.[a-z0-9]+$/i.test(path) ? path : `${path}.html`;

    const load = (p) => {
      const u = new URL(p, url);
      if (env && env.ASSETS) return env.ASSETS.fetch(new Request(u));
      return fetch(u, { headers: { [INTERNAL]: "1" } });
    };

    let res = await load(target);
    let status = res.status;
    if (status === 404) {
      res = await load("/404.html");
      status = 404;
    }

    const isHtml = target.endsWith(".html") || status === 404;
    const body = isHtml ? await res.text() : await res.arrayBuffer();
    return new Response(body, {
      status,
      headers: {
        "content-type": isHtml ? "text/html; charset=utf-8" : res.headers.get("content-type") || "application/octet-stream",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  },
};
