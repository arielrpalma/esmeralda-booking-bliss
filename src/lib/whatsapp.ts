// Single source of truth for every WhatsApp link on the site.
// Components must never hardcode a wa.me URL — always build it here so the
// pre-filled text tells us which page the enquiry came from.

export const WHATSAPP_PHONE = "5493472433334";

// Human-readable form used in visible copy (footer, FAQ, structured data).
export const WHATSAPP_DISPLAY = "+54 9 3472 43-3334";

const GENERIC_MESSAGE = "Hola, quiero consultar disponibilidad en Esmeralda Apart.";

export const whatsappLink = (message: string = GENERIC_MESSAGE) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

export const whatsappFromGuide = (title: string) =>
  whatsappLink(`Hola, entré desde la guía "${title}" de Esmeralda Apart y quiero consultar disponibilidad.`);

export const whatsappFromBlog = () =>
  whatsappLink("Hola, entré desde el blog de Esmeralda Apart y quiero consultar disponibilidad.");

export const whatsappFromArticle = (title: string) =>
  whatsappLink(`Hola, estaba leyendo "${title}" en el blog de Esmeralda Apart y quiero consultar disponibilidad.`);

