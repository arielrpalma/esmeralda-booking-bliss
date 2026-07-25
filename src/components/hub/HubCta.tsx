import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WA } from "@/content/hub";

/** Conversion block reused across every hub page. */
const HubCta = ({ text }: { text?: string }) => (
  <div className="mt-12 p-6 md:p-8 rounded-2xl bg-section-dark text-section-dark-foreground flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
    <div>
      <p className="font-display text-xl mb-1">Reservá directo y pagá menos</p>
      <p className="font-body text-sm text-section-dark-foreground/80">
        {text ?? "Mejor precio garantizado sin comisiones de Booking ni Airbnb. Check-in digital 24 h y cochera."}
      </p>
    </div>
    <div className="flex gap-3">
      <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-body text-sm hover:opacity-90 transition">
        Ver disponibilidad <ArrowRight size={16} />
      </Link>
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-section-dark-foreground/10 px-5 py-3 rounded-lg font-body text-sm hover:bg-section-dark-foreground/20 transition"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  </div>
);

export default HubCta;
