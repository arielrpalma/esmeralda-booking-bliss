import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { trackViewListing } from "@/lib/analytics";

// Bento gallery items: hero + satellites + secondary row.
// Each entry maps to one of the existing /images/galleryN.jpg assets.
type GalleryItem = {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
};

const heroItem: GalleryItem = {
  src: "/images/gallery1.jpg",
  alt: "Living principal del departamento",
  eyebrow: "Interior",
  caption: "Living Principal",
};

const tallItem: GalleryItem = {
  src: "/images/gallery5.jpg",
  alt: "Dormitorio principal",
  eyebrow: "Suite",
  caption: "Dormitorio Master",
};

const squareItems: GalleryItem[] = [
  {
    src: "/images/gallery4.jpg",
    alt: "Living moderno",
    eyebrow: "Espacio",
    caption: "Ambiente Social",
  },
  {
    src: "/images/gallery3.jpg",
    alt: "Cocina equipada",
    eyebrow: "Gourmet",
    caption: "Cocina Equipada",
  },
];

const secondaryItems: { small: GalleryItem; wide: GalleryItem } = {
  small: {
    src: "/images/gallery6.jpg",
    alt: "Baño completo",
    eyebrow: "Wellness",
    caption: "Baño en Suite",
  },
  wide: {
    src: "/images/gallery2.jpg",
    alt: "Detalles de diseño",
    eyebrow: "Arquitectura",
    caption: "Detalles & Diseño",
  },
};

const GalleryTile = ({
  item,
  className,
  index,
  inView,
  onOpen,
  captionSize = "lg",
}: {
  item: GalleryItem;
  className: string;
  index: number;
  inView: boolean;
  onOpen: (src: string) => void;
  captionSize?: "sm" | "lg";
}) => (
  <motion.button
    type="button"
    onClick={() => onOpen(item.src)}
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.08 * index, ease: "easeOut" }}
    className={`relative group overflow-hidden rounded-sm bg-primary/5 cursor-pointer text-left ${className}`}
    aria-label={`Ver ${item.caption}`}
  >
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
    />
    {/* Constant subtle gradient for legibility + deeper on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-section-dark/55 via-section-dark/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
    {/* Caption */}
    <div
      className={`absolute ${
        captionSize === "lg" ? "bottom-6 left-6 md:bottom-8 md:left-8" : "bottom-4 left-4 md:bottom-6 md:left-6"
      } text-white transition-all duration-500 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0`}
    >
      <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent/90 mb-1">
        {item.eyebrow}
      </p>
      <p
        className={`font-display italic ${
          captionSize === "lg" ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
        }`}
      >
        {item.caption}
      </p>
    </div>
  </motion.button>
);

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (inView) trackViewListing("Esmeralda Apart - Marcos Juárez");
  }, [inView]);

  return (
    <>
      <section id="galeria" className="py-24 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-12 max-w-7xl" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs md:text-sm font-body tracking-[0.4em] uppercase text-accent mb-4">
              Nuestras Instalaciones
            </p>
            <h2 className="text-5xl md:text-6xl font-display italic text-foreground mb-6">
              Galería
            </h2>
            <div className="w-24 h-[1px] bg-accent mx-auto" />
          </motion.div>

          {/* Main bento grid: hero 2x2 + tall 1x2 + 2 squares */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[280px] lg:auto-rows-[340px]">
            <GalleryTile
              item={heroItem}
              index={0}
              inView={inView}
              onOpen={setLightbox}
              className="md:col-span-2 md:row-span-2 h-72 md:h-auto"
              captionSize="lg"
            />
            <GalleryTile
              item={tallItem}
              index={1}
              inView={inView}
              onOpen={setLightbox}
              className="md:col-span-1 md:row-span-2 h-72 md:h-auto"
              captionSize="lg"
            />
            <GalleryTile
              item={squareItems[0]}
              index={2}
              inView={inView}
              onOpen={setLightbox}
              className="md:col-span-1 md:row-span-1 h-56 md:h-auto"
              captionSize="sm"
            />
            <GalleryTile
              item={squareItems[1]}
              index={3}
              inView={inView}
              onOpen={setLightbox}
              className="md:col-span-1 md:row-span-1 h-56 md:h-auto"
              captionSize="sm"
            />
          </div>

          {/* Secondary row: small + wide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4 md:auto-rows-[260px] lg:auto-rows-[300px]">
            <GalleryTile
              item={secondaryItems.small}
              index={4}
              inView={inView}
              onOpen={setLightbox}
              className="md:col-span-1 h-56 md:h-auto"
              captionSize="sm"
            />
            <GalleryTile
              item={secondaryItems.wide}
              index={5}
              inView={inView}
              onOpen={setLightbox}
              className="md:col-span-2 h-56 md:h-auto"
              captionSize="sm"
            />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-section-dark/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-section-dark-foreground/80 hover:text-section-dark-foreground transition-colors"
            aria-label="Cerrar galería"
          >
            <X size={32} />
          </button>
          <img
            src={lightbox}
            alt="Galería"
            className="max-w-full max-h-[85vh] rounded-sm shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

export default GallerySection;
