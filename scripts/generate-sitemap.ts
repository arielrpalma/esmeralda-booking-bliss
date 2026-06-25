// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { posts } from "../src/content/posts";

const BASE_URL = "https://esmeraldaapart.com.ar";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/alojamiento/trabajo", changefreq: "monthly", priority: "0.9" },
  { path: "/alojamiento/torneo", changefreq: "monthly", priority: "0.9" },
  { path: "/alojamiento/ruta-9", changefreq: "monthly", priority: "0.9" },
  { path: "/alojamiento/familia", changefreq: "monthly", priority: "0.9" },
];

const postEntries: SitemapEntry[] = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  lastmod: p.publishedAt,
  changefreq: "monthly",
  priority: "0.7",
}));

const entries: SitemapEntry[] = [...staticEntries, ...postEntries];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
