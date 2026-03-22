import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Instagram, Facebook, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Gracias = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, hsla(200,15%,10%,0.75) 0%, hsla(200,15%,10%,0.9) 100%)" }}
      />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <CheckCircle className="mx-auto text-primary" size={72} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-section-dark-foreground">
            ¡Gracias!
          </h1>
          <p className="text-lg font-body text-section-dark-foreground/75 leading-relaxed">
            Tu reserva fue recibida con éxito. Nos pondremos en contacto a la brevedad para confirmar los detalles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-20 h-[2px] bg-primary mx-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="space-y-6"
        >
          <p className="text-sm font-body text-section-dark-foreground/50">
            Seguinos en nuestras redes
          </p>

          <div className="flex items-center justify-center gap-5">
            <a href="https://www.instagram.com/esmeraldaapart" target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-primary transition-colors">
              <Instagram size={24} strokeWidth={1.5} />
            </a>
            <a href="http://www.facebook.com/esmeraldaapart" target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-primary transition-colors">
              <Facebook size={24} strokeWidth={1.5} />
            </a>
            <a href="https://www.tiktok.com/@esmeraldaapart" target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-primary transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="https://wa.me/5493472433334" target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-primary transition-colors">
              <Phone size={24} strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-xs font-body text-section-dark-foreground/40">
            Volviendo al inicio en {countdown}s…
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Volver ahora
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pt-8"
        >
          <img
            src="/images/esmeralda-logo-new.png"
            alt="Esmeralda Apart"
            className="h-8 mx-auto opacity-30"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Gracias;
