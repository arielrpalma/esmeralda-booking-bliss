import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

const images = [
  { src: "/images/gallery1.jpg", alt: "Vista del departamento" },
  { src: "/images/gallery2.jpg", alt: "Detalles de diseño" },
  { src: "/images/gallery3.jpg", alt: "Cocina equipada" },
  { src: "/images/gallery4.jpg", alt: "Living moderno" },
  { src: "/images/gallery5.jpg", alt: "Dormitorio principal" },
  { src: "/images/gallery6.jpg", alt: "Baño completo" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section id="galeria" className="py-24 md:py-32 bg-muted/50">
        <div className="container mx-auto px-6" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">
              Descubrí cada rincón
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
              Galería
            </h2>
            <div className="w-16 h-[2px] bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="group cursor-pointer overflow-hidden rounded-sm"
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
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
