import { readdirSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import { describe, expect, it } from "vitest";
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_PHONE,
  whatsappFromArticle,
  whatsappLink,
} from "@/lib/whatsapp";

// The site's rule: every WhatsApp link is built by src/lib/whatsapp so each
// enquiry carries the context it came from. UI code must never hardcode wa.me.
const UI_DIRS = ["src/components", "src/pages"];

const tsxFiles = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...tsxFiles(full));
    else if ([".tsx", ".ts"].includes(extname(entry.name))) out.push(full);
  }
  return out;
};

describe("WhatsApp links", () => {
  it("uses the property's WhatsApp number", () => {
    expect(WHATSAPP_PHONE).toBe("5493472433334");
    expect(WHATSAPP_DISPLAY).toBe("+54 9 3472 43-3334");
  });

  it("builds the generic enquiry link", () => {
    expect(whatsappLink()).toBe(
      "https://wa.me/5493472433334?text=Hola%2C%20quiero%20consultar%20disponibilidad%20en%20Esmeralda%20Apart.",
    );
  });

  it("keeps the source context in the pre-filled message", () => {
    expect(whatsappFromArticle("Dónde comer en Marcos Juárez")).toContain(
      encodeURIComponent("Dónde comer en Marcos Juárez"),
    );
  });

  it("never hardcodes wa.me inside UI code", () => {
    const offenders = UI_DIRS.flatMap(tsxFiles).filter((f) =>
      readFileSync(f, "utf8").includes("wa.me"),
    );
    expect(offenders).toEqual([]);
  });
});
