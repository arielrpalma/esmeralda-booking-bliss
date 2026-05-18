import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Loader2, Lock, ShieldCheck, XCircle, MessageCircle, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Mercado Pago publishable key (safe to expose in frontend)
const MP_PUBLIC_KEY = "APP_USR-2c6aa44e-aba7-4f79-b415-14a04f58c56c";
// Brand emerald used inside the Mercado Pago Brick button
const EMERALD_HEX = "#008A7C";

type PaymentResult = {
  id: number | string;
  status: string;
  status_detail?: string;
  transaction_amount?: number;
};

const formatARS = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("es-AR").format(Number(digits));
};

// Lazy-load the MP SDK once
let sdkPromise: Promise<void> | null = null;
const loadMpSdk = () => {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    if ((window as unknown as { MercadoPago?: unknown }).MercadoPago) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar Mercado Pago"));
    document.head.appendChild(script);
  });
  return sdkPromise;
};

const Pago = () => {
  const [importe, setImporte] = useState("");
  const [debouncedAmount, setDebouncedAmount] = useState(0);
  const [mountingBrick, setMountingBrick] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentType, setPaymentType] = useState<"credit" | "debit" | null>(null);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const brickContainerRef = useRef<HTMLDivElement>(null);
  // Brick controller used to safely unmount on re-render
  const brickControllerRef = useRef<{ unmount: () => void } | null>(null);

  const importeNum = Number(importe.replace(/\D/g, ""));
  const isValid = importeNum >= 100;

  // Debounce so the Brick is not remounted on every keystroke
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedAmount(isValid ? importeNum : 0);
    }, 500);
    return () => clearTimeout(t);
  }, [importeNum, isValid]);

  // Mount Payment Brick whenever we have a valid amount, a chosen payment type and no result yet
  useEffect(() => {
    if (!debouncedAmount || result || !paymentType) return;
    let cancelled = false;
    setMountingBrick(true);

    (async () => {
      try {
        await loadMpSdk();
        if (cancelled) return;

        const MercadoPagoCtor = (
          window as unknown as { MercadoPago: new (key: string, opts: { locale: string }) => unknown }
        ).MercadoPago;
        const mp = new MercadoPagoCtor(MP_PUBLIC_KEY, { locale: "es-AR" }) as {
          bricks: () => {
            create: (
              brick: string,
              container: string,
              settings: Record<string, unknown>,
            ) => Promise<{ unmount: () => void }>;
          };
        };

        const bricksBuilder = mp.bricks();

        if (brickContainerRef.current) brickContainerRef.current.innerHTML = "";
        brickControllerRef.current?.unmount();

        const controller = await bricksBuilder.create("payment", "mp-brick-container", {
          initialization: {
            amount: debouncedAmount,
          },
          customization: {
            paymentMethods: {
              creditCard: "all",
              debitCard: "all",
              maxInstallments: 12,
            },
            visual: {
              style: {
                theme: "default",
                customVariables: {
                  // Brand emerald applied to primary action button
                  baseColor: EMERALD_HEX,
                  baseColorFirstVariant: EMERALD_HEX,
                  baseColorSecondVariant: EMERALD_HEX,
                  buttonTextColor: "#ffffff",
                  formBackgroundColor: "#ffffff",
                  borderRadiusFull: "4px",
                  borderRadiusLarge: "4px",
                  borderRadiusMedium: "4px",
                  borderRadiusSmall: "4px",
                },
              },
            },
          },
          callbacks: {
            onReady: () => {
              if (!cancelled) setMountingBrick(false);
            },
            onSubmit: async ({ formData }: { formData: Record<string, unknown> }) => {
              setProcessing(true);
              try {
                const { data, error } = await supabase.functions.invoke("process-mp-payment", {
                  body: {
                    ...formData,
                    transaction_amount: debouncedAmount,
                  },
                });
                if (error) throw error;
                const res = data as PaymentResult;
                setResult(res);
                setErrorMsg(null);
              } catch (err) {
                const message = (err as Error).message ?? "No pudimos procesar el pago";
                setErrorMsg(message);
                setResult({ id: "-", status: "rejected" });
                toast({
                  title: "Pago rechazado",
                  description: message,
                  variant: "destructive",
                });
                throw err;
              } finally {
                setProcessing(false);
              }
            },
            onError: (error: unknown) => {
              console.error("Brick error", error);
            },
          },
        });

        brickControllerRef.current = controller;
      } catch (err) {
        if (!cancelled) {
          toast({
            title: "Error",
            description: (err as Error).message,
            variant: "destructive",
          });
          setMountingBrick(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      brickControllerRef.current?.unmount();
      brickControllerRef.current = null;
    };
  }, [debouncedAmount, result]);

  const reset = () => {
    setResult(null);
    setErrorMsg(null);
    setImporte("");
  };

  const approved = result?.status === "approved";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto"
          >
            <p className="text-xs sm:text-sm font-body tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary mb-3 sm:mb-4 inline-flex items-center gap-2">
              <Lock size={12} className="sm:hidden" />
              <Lock size={14} className="hidden sm:inline" /> Pago seguro
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-foreground mb-4 sm:mb-6">
              Pagar reserva Esmeralda Apart
            </h1>
            <div className="w-12 sm:w-16 h-[2px] bg-primary mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-xl mx-auto bg-transparent sm:bg-card rounded-sm sm:shadow-xl sm:border sm:border-border p-0 sm:p-6 md:p-10 space-y-5 sm:space-y-6 relative"
          >
            {result ? (
              <div className="text-center space-y-5 py-4">
                {approved ? (
                  <>
                    <CheckCircle2 className="mx-auto text-primary" size={64} />
                    <h2 className="font-display text-2xl text-foreground">¡Pago aprobado!</h2>
                    <p className="font-body text-muted-foreground text-sm">
                      Operación #{result.id} por ${formatARS(String(result.transaction_amount ?? importeNum))}
                    </p>
                    <a
                      href={`https://wa.me/5493472433334?text=${encodeURIComponent(
                        `Hola! Adjunto comprobante de pago Esmeralda Apart.\nOperación: #${result.id}\nImporte: $${formatARS(String(result.transaction_amount ?? importeNum))}\nEstado: aprobado`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-4 sm:px-6 rounded-sm bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle size={16} /> Compartir comprobante por WhatsApp
                    </a>
                  </>
                ) : (
                  <>
                    <XCircle className="mx-auto text-destructive" size={64} />
                    <h2 className="font-display text-2xl text-foreground">
                      Pago {result.status}
                    </h2>
                    <p className="font-body text-muted-foreground text-sm">
                      {errorMsg ?? result.status_detail ?? "Intentá nuevamente con otra tarjeta."}
                    </p>
                    <Button onClick={reset} variant="outline" className="font-body">
                      Reintentar
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="importe" className="font-body">Importe de tu reserva (ARS)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-body">$</span>
                    <Input
                      id="importe"
                      inputMode="numeric"
                      className="pl-7 h-12 text-lg"
                      value={importe}
                      onChange={(e) => setImporte(formatARS(e.target.value))}
                      placeholder="0"
                      autoFocus
                    />
                  </div>
                  {!isValid && importe && (
                    <p className="text-xs text-destructive">Importe mínimo $100</p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                  <ShieldCheck size={14} className="text-primary" />
                  Los datos de tu tarjeta viajan cifrados directo a Mercado Pago.
                </div>

                {isValid && (
                  <div className="border-t border-border pt-6 relative">
                    {mountingBrick && (
                      <div className="flex items-center justify-center py-10 text-muted-foreground">
                        <Loader2 className="animate-spin mr-2" /> Cargando formulario seguro...
                      </div>
                    )}
                    <div id="mp-brick-container" ref={brickContainerRef} />
                    {processing && (
                      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10 rounded-sm">
                        <Loader2 className="animate-spin text-primary" size={36} />
                        <p className="font-body text-sm text-foreground">Procesando pago...</p>
                        <p className="font-body text-xs text-muted-foreground">No cierres ni recargues la página</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Pago;
