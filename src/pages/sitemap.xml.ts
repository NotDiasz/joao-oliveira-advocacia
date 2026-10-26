import type { APIRoute } from "astro";
import { site } from "../data/site";
import { areas } from "../data/areas";
export const GET: APIRoute = ({ url }) => {
  const origin = site.url || url.origin;
  const paths = ["/", ...areas.map((area) => `/atuacao/${area.slug}/`)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${new URL(path, origin).href}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
