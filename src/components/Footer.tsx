import { MapPin, Instagram, Facebook } from "lucide-react";

import { Link } from "react-router-dom";
import { clusters } from "@/content/hub";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

const guideLinks = [
  { label: "Todas las guías", href: "/guias" },
  ...clusters.map((c) => ({ label: c.name, href: `/${c.slug}` })),
  { label: "Motoviajeros", href: "/motoviajeros" },
  { label: "Blog", href: "/blog" },
];

const Footer = () => {
  return (
    <footer className="bg-section-dark py-16">
      <div className="container mx-auto px-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <img src="/images/esmeralda-logo-new.png" alt="Esmeralda Apart" className="h-10 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="font-body text-sm text-section-dark-foreground/60">
              Construimos valor como inversión de vida
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4 text-sm text-section-dark-foreground/70 font-body">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>9 de Julio 262, Marcos Juárez, Córdoba</span>
            </div>

            {/* WhatsApp is the fastest channel: show it as a labeled, clickable contact */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("footer")}
              className="inline-flex items-center gap-3 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 transition-colors duration-300 hover:bg-[#25D366]/20"
            >
              <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
              <span className="flex flex-col leading-tight text-left">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#25D366]">
                  Escribinos por WhatsApp
                </span>
                <span className="font-display text-base text-section-dark-foreground">
                  {WHATSAPP_DISPLAY}
                </span>
              </span>
            </a>

            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/esmeraldaapart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-section-dark-foreground/50 hover:text-primary transition-colors duration-300"
              >
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a
                href="http://www.facebook.com/esmeraldaapart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-section-dark-foreground/50 hover:text-primary transition-colors duration-300"
              >
                <Facebook size={22} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.tiktok.com/@esmeraldaapart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-section-dark-foreground/50 hover:text-primary transition-colors duration-300"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Guide categories: internal linking from every page of the site */}
        <nav aria-label="Guía de Marcos Juárez" className="mt-12 pt-8 border-t border-section-dark-foreground/10">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-primary mb-4 text-center md:text-left">
            Guía de Marcos Juárez
          </p>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
            {guideLinks.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="font-body text-sm text-section-dark-foreground/60 hover:text-primary transition-colors duration-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 pt-8 border-t border-section-dark-foreground/10 flex flex-col items-center gap-3">

          <p className="font-body text-xs text-section-dark-foreground/70">
            © {new Date().getFullYear()} Esmeralda Desarrollos. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
