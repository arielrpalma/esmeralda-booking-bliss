import { describe, it, expect } from "vitest";
import { clusters } from "@/content/hub";
import { clusterSlugs } from "@/content/hub/slugs";

describe("cluster routes", () => {
  it("every guide cluster has a route slug", () => {
    expect([...clusterSlugs].sort()).toEqual(clusters.map((c) => c.slug).sort());
  });
});
