// Static prerender: runs after `vite build` and writes one HTML file per public
// route into dist/. Each file carries the route's real <head> (title, description,
// canonical, og:*) plus a static content block inside #root, so crawlers get the
// page content in the first response instead of having to execute JavaScript.
// The SPA hydrates over it normally.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";
import { clusters, hubEntries } from "../src/content/hub";
import { personas } from "../src/content/personas";
import { posts } from "../src/content/posts";

const SITE = "https://esmeraldaapart.com.ar";
const DIST = resolve("dist");
const BRAND = "Esmeralda Apart";

// Hard cap so content growth can never blow past the publish output limits.
const MAX_PRERENDER_PAGES = Number(process.env.MAX_PRERENDER_PAGES ?? 500);

// Routes that must never be prerendered (noindex / private flows).
const EXCLUDED = ["/gracias", "/posnet", "/pago/success", "/pago/pending", "/pago/failure"];

interface Page {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  /** Static HTML injected inside #root. */
  content: string;
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const link = (href: string, text: string) =>
  `<li><a href="${esc(href)}">${esc(text)}</a></li>`;

const shell = (h1: string, intro: string, extra = "") =>
  `<div class="mx-auto max-w-3xl px-6 py-16"><h1 class="text-3xl font-semibold mb-4">${esc(h1)}</h1><p class="mb-6">${esc(intro)}</p>${extra}</div>`;

const pages: Page[] = [];

// --- Home -------------------------------------------------------------------
pages.push({
  path: "/",
  title: `Apart inteligente en Marcos Juárez · Check-in 24 h | ${BRAND}`,
  description:
    "Departamentos por día en Marcos Juárez con check-in electrónico 24 h, cocheras y factura. A minutos de Au Ruta9. Reservá directo y pagá menos.",
  keywords: "alojamiento en Marcos Juárez, apart hotel Marcos Juárez, departamentos por día Marcos Juárez",
  content: shell(
    "Esmeralda Apart · Departamentos por día en Marcos Juárez",
    "Apart con check-in digital 24 horas, cochera, WiFi de fibra, cocina equipada y factura A o B, a minutos del acceso a la Au Ruta 9.",
    `<ul>${clusters.map((c) => link(`/${c.slug}`, c.name)).join("")}${link("/guias", "Guía de Marcos Juárez")}${link("/blog", "Blog")}</ul>`,
  ),
});

// --- Hub index --------------------------------------------------------------
pages.push({
  path: "/guias",
  title: `Guía de Marcos Juárez: alojamiento, turismo, servicios y eventos | ${BRAND}`,
  description:
    "Guía completa de Marcos Juárez: dónde alojarse, qué hacer, gastronomía, empresas, eventos, deportes, educación, servicios y rutas.",
  content: shell(
    "Guía de Marcos Juárez",
    "Todas las categorías de la guía: alojamiento, turismo, gastronomía, empresas, eventos, deportes, educación, servicios de la ciudad, rutas y servicios del apart.",
    `<ul>${clusters.map((c) => link(`/${c.slug}`, c.title)).join("")}</ul>`,
  ),
});

// --- Blog index -------------------------------------------------------------
pages.push({
  path: "/blog",
  title: `Blog sobre alojamiento y turismo en Marcos Juárez | ${BRAND}`,
  description:
    "Artículos sobre alojamiento, alquiler temporario, turismo y servicios en Marcos Juárez, escritos por el equipo de Esmeralda Apart.",
  content: shell(
    "Blog de Esmeralda Apart",
    "Guías y notas sobre hospedaje, alquiler temporario y turismo en Marcos Juárez.",
    `<ul>${posts.map((p) => link(`/blog/${p.slug}`, p.title)).join("")}</ul>`,
  ),
});

// --- Persona landings -------------------------------------------------------
for (const p of Object.values(personas)) {
  pages.push({
    path: `/alojamiento/${p.slug}`,
    title: p.seoTitle,
    description: p.seoDescription,
    keywords: p.keywords,
    content: shell(p.title, p.subtitle, `<ul>${link("/", BRAND)}${link("/guias", "Guía de Marcos Juárez")}</ul>`),
  });
}

// --- Cluster pillar pages ---------------------------------------------------
for (const c of clusters) {
  const entries = hubEntries.filter((e) => e.cluster === c.key);
  pages.push({
    path: `/${c.slug}`,
    title: `${c.title} | ${BRAND}`,
    description: c.description,
    keywords: c.keywords,
    content: shell(
      c.title,
      `${c.intro} ${c.snippet}`,
      `<ul>${entries.map((e) => link(`/${e.cluster}/${e.slug}`, e.h1)).join("")}</ul>`,
    ),
  });
}

// --- Hub detail pages -------------------------------------------------------
for (const e of hubEntries) {
  const body = e.body
    .map((b) => {
      if (b.type === "p") return `<p>${esc(b.text)}</p>`;
      if (b.type === "h2") return `<h2>${esc(b.text)}</h2>`;
      if (b.type === "h3") return `<h3>${esc(b.text)}</h3>`;
      if (b.type === "quote") return `<blockquote>${esc(b.text)}</blockquote>`;
      if (b.type === "ul" || b.type === "ol")
        return `<${b.type}>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</${b.type}>`;
      if (b.type === "table")
        return `<table><thead><tr>${b.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows
          .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table>`;
      return "";
    })
    .join("");
  const faqs = e.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("");
  pages.push({
    path: `/${e.cluster}/${e.slug}`,
    title: `${e.title} | ${BRAND}`,
    description: e.description,
    keywords: e.keywords,
    content: shell(e.h1, e.snippet, `${body}${faqs}`),
  });
}

// --- Blog posts -------------------------------------------------------------
for (const p of posts) {
  pages.push({
    path: `/blog/${p.slug}`,
    title: `${p.title} | ${BRAND}`,
    description: p.description,
    keywords: p.keywords,
    content: shell(p.title, p.description, `<ul>${link("/blog", "Volver al blog")}</ul>`),
  });
}

// --- Write ------------------------------------------------------------------
const template = readFileSync(join(DIST, "index.html"), "utf-8");

function withHead(html: string, page: Page) {
  const url = `${SITE}${page.path === "/" ? "/" : page.path}`;
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="description" content="${esc(page.description)}" />`,
    )
    .replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, "")

    .replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:title" content="${esc(page.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:description" content="${esc(page.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:url" content="${url}" />`,
    );

  if (page.keywords) {
    out = /<meta\s+name="keywords"/i.test(out)
      ? out.replace(
          /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/?>/i,
          `<meta name="keywords" content="${esc(page.keywords)}" />`,
        )
      : out.replace(/<\/head>/i, `  <meta name="keywords" content="${esc(page.keywords)}" />\n</head>`);
  }

  // index.html ships without a canonical (Helmet owns it per route); always inject one.
  out = out.replace(/<\/head>/i, `  <link rel="canonical" href="${url}" />\n</head>`);

  return out.replace(/<div id="root"><\/div>/, `<div id="root">${page.content}</div>`);
}

const selected = pages.filter((p) => !EXCLUDED.includes(p.path)).slice(0, MAX_PRERENDER_PAGES);

if (pages.length > MAX_PRERENDER_PAGES) {
  console.warn(
    `prerender: ${pages.length} routes exceed MAX_PRERENDER_PAGES (${MAX_PRERENDER_PAGES}); only the first ${MAX_PRERENDER_PAGES} were written.`,
  );
}

for (const page of selected) {
  const html = withHead(template, page);
  if (page.path === "/") {
    writeFileSync(join(DIST, "index.html"), html);
    continue;
  }
  const dir = join(DIST, page.path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

console.log(`prerender: ${selected.length} pages written to dist/`);
