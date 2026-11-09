// Tiny edge worker deployed with the site. Static files are served directly by
// Wix hosting; any other request (e.g. /about) lands here and is answered with
// the matching prerendered page (about.html), so clean URLs and deep links work.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const target = path === "/" ? "/index.html" : /\.[a-z0-9]+$/i.test(path) ? path : `${path}.html`;

    const load = (p) => {
      const u = new URL(p, url);
      return env && env.ASSETS ? env.ASSETS.fetch(new Request(u, request)) : fetch(u, { headers: { "x-sc-page": "1" } });
    };

    let res = await load(target);
    let status = res.status;
    if (status === 404) {
      res = await load("/404.html");
      status = 404;
    }
    const headers = new Headers(res.headers);
    if (target.endsWith(".html") || status === 404) headers.set("content-type", "text/html; charset=utf-8");
    return new Response(res.body, { status, headers });
  },
};
