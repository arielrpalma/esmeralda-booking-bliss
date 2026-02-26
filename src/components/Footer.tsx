import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-section-dark py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <img src="/images/esmeralda-logo-black.png" alt="Esmeralda Apart" className="h-40 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="font-body text-sm text-section-dark-foreground/60">
              Construimos valor como inversión de vida
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-sm text-section-dark-foreground/70 font-body">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>9 de Julio 262, Marcos Juárez, Córdoba</span>
            </div>
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
              <a
                href="https://wa.me/5493472433334"
                target="_blank"
                rel="noopener noreferrer"
                className="text-section-dark-foreground/50 hover:text-primary transition-colors duration-300"
              >
                <Phone size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-section-dark-foreground/10 text-center">
          <p className="font-body text-xs text-section-dark-foreground/40">
            © {new Date().getFullYear()} Esmeralda Desarrollos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
