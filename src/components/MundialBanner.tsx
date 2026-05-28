import { motion } from "framer-motion";

const MundialBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="relative backdrop-blur-md bg-section-dark/60 border border-accent/40 rounded-sm px-5 py-4 md:px-8 md:py-5 shadow-2xl">
        {/* Subtle gold glow */}
        <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Logos */}
          <div className="flex items-center gap-4 md:gap-5 shrink-0">
            <img
              src="/images/directv-go.png"
              alt="DirecTV Go"
              className="h-8 md:h-10 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="h-8 md:h-10 w-px bg-accent/50" />
            <img
              src="/images/mundial-logo.png"
              alt="Mundial de Fútbol"
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Text */}
          <p className="font-body text-sm md:text-base text-section-dark-foreground text-center md:text-left leading-snug">
            Mirá todos los partidos del{" "}
            <span className="font-display italic text-accent">Mundial</span> a
            través de streaming en nuestros departamentos
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MundialBanner;
