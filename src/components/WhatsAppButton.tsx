import { motion } from "framer-motion";
import { trackWhatsAppClick } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface WhatsAppButtonProps {
  barHeight?: number;
  /** Pre-filled enquiry text for this page; defaults to the generic message. */
  message?: string;
}

const WhatsAppButton = ({ barHeight = 0, message }: WhatsAppButtonProps) => {
  // Position above the floating bar; fallback keeps it clear before the bar is measured
  const bottomPx = Math.max(barHeight, 110) + 24;

  return (
    <motion.a
      href={whatsappLink(message)}

      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating_button")}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, bottom: bottomPx }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-6 z-[55] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </motion.a>
  );
};

export default WhatsAppButton;
