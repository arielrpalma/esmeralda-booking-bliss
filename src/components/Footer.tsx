import { MapPin, Phone, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-section-dark py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <img src="/images/logo.png" alt="Esmeralda Apart" className="h-8 w-auto" />
              <span className="font-display text-xl font-semibold text-section-dark-foreground">
                Esmeralda <span className="font-light">Apart</span>
              </span>
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
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/esmeraldaapart/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-section-dark-foreground/60 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/543472123456"
                target="_blank"
                rel="noopener noreferrer"
                className="text-section-dark-foreground/60 hover:text-primary transition-colors"
              >
                <Phone size={20} />
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
