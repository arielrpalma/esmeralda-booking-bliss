// Lightweight list of cluster slugs used for routing, so the home bundle
// does not include the full guide texts. Must match `clusters` in ./index.ts
// (enforced by src/test/hub-slugs.test.ts).
export const clusterSlugs = [
  "alojamiento",
  "turismo",
  "gastronomia",
  "deportes",
  "educacion",
  "servicios-en-marcos-juarez",
  "empresas",
  "eventos",
  "rutas",
  "servicios",
] as const;
