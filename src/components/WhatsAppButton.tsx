import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  barHeight?: number;
  /** Page-specific pre-filled link; defaults to the generic enquiry. */
  link?: string;
}

// Direct WhatsApp contact (the number is served by the business bot), placed above the booking bar.
const WhatsAppButton = ({ barHeight = 0, link }: WhatsAppButtonProps) => {
  const bottomPx = Math.max(barHeight, 110) + 24;

  return (
    <a
      href={link ?? whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142_70%_40%)] text-primary-foreground shadow-lg transition-transform hover:scale-105"
      style={{ bottom: bottomPx }}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
