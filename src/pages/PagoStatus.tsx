import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type Status = "success" | "pending" | "failure";

interface Props {
  status: Status;
}

const config: Record<Status, { title: string; message: string; icon: typeof CheckCircle; color: string }> = {
  success: {
    title: "Pago aprobado",
    message: "Pago aprobado correctamente",
    icon: CheckCircle,
    color: "text-primary",
  },
  pending: {
    title: "Pago pendiente",
    message: "Tu pago está pendiente de confirmación",
    icon: Clock,
    color: "text-accent",
  },
  failure: {
    title: "Pago rechazado",
    message: "El pago no pudo procesarse",
    icon: XCircle,
    color: "text-destructive",
  },
};

const PagoStatus = ({ status }: Props) => {
  const { title, message, icon: Icon, color } = config[status];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
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
          <Icon className={`mx-auto ${color}`} size={72} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-section-dark-foreground">
            {title}
          </h1>
          <p className="text-lg font-body text-section-dark-foreground/75 leading-relaxed">
            {message}
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
          className="flex flex-col items-center gap-4"
        >
          {status !== "success" && (
            <Link
              to="/pago"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm font-medium transition-colors"
            >
              Reintentar pago
            </Link>
          )}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-section-dark-foreground/70 hover:text-section-dark-foreground font-body text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al inicio
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

export default PagoStatus;
