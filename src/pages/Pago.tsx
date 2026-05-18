import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CreditCard, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FormState {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  departamento: string;
  codigo_reserva: string;
  importe: string;
}

const initialState: FormState = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  departamento: "",
  codigo_reserva: "",
  importe: "",
};

const formatARS = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("es-AR").format(Number(digits));
};

const Pago = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.apellido.trim()) e.apellido = "Requerido";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Email inválido";
    if (form.telefono.trim().length < 6) e.telefono = "Teléfono inválido";
    if (!form.departamento) e.departamento = "Seleccioná un departamento";
    if (!form.codigo_reserva.trim()) e.codigo_reserva = "Requerido";
    const importeNum = Number(form.importe.replace(/\D/g, ""));
    if (!importeNum || importeNum < 100) e.importe = "Importe inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const importeNum = Number(form.importe.replace(/\D/g, ""));
      const { data, error } = await supabase.functions.invoke("create-mp-preference", {
        body: {
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          departamento: form.departamento,
          codigo_reserva: form.codigo_reserva.trim(),
          importe: importeNum,
        },
      });
      if (error) throw error;
      const url = (data as { init_point?: string; sandbox_init_point?: string })?.init_point
        ?? (data as { sandbox_init_point?: string })?.sandbox_init_point;
      if (!url) throw new Error("No se recibió el link de pago");
      window.location.href = url;
    } catch (err) {
      console.error(err);
      toast({
        title: "No pudimos iniciar el pago",
        description: (err as Error).message ?? "Intentá nuevamente en unos minutos.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">
              Pago seguro
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
              Pagar reserva
            </h1>
            <div className="w-16 h-[2px] bg-primary mx-auto mb-6" />
            <p className="font-body text-muted-foreground">
              Completá tus datos para abonar tu estadía a través de Mercado Pago.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-2xl mx-auto bg-card rounded-sm shadow-xl border border-border p-6 md:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="font-body">Nombre</Label>
                <Input id="nombre" value={form.nombre} onChange={(e) => handleChange("nombre", e.target.value)} placeholder="Juan" autoComplete="given-name" />
                {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido" className="font-body">Apellido</Label>
                <Input id="apellido" value={form.apellido} onChange={(e) => handleChange("apellido", e.target.value)} placeholder="Pérez" autoComplete="family-name" />
                {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="tu@email.com" autoComplete="email" />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono" className="font-body">Teléfono</Label>
                <Input id="telefono" type="tel" value={form.telefono} onChange={(e) => handleChange("telefono", e.target.value)} placeholder="+54 9 ..." autoComplete="tel" />
                {errors.telefono && <p className="text-xs text-destructive">{errors.telefono}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="departamento" className="font-body">Departamento</Label>
                <Select value={form.departamento} onValueChange={(v) => handleChange("departamento", v)}>
                  <SelectTrigger id="departamento">
                    <SelectValue placeholder="Elegí tu departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Esmeralda Apart 1">Esmeralda Apart 1</SelectItem>
                    <SelectItem value="Esmeralda Apart 2">Esmeralda Apart 2</SelectItem>
                    <SelectItem value="Esmeralda Apart 3">Esmeralda Apart 3</SelectItem>
                    <SelectItem value="Esmeralda Apart 4">Esmeralda Apart 4</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.departamento && <p className="text-xs text-destructive">{errors.departamento}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo_reserva" className="font-body">Código de reserva</Label>
                <Input id="codigo_reserva" value={form.codigo_reserva} onChange={(e) => handleChange("codigo_reserva", e.target.value.toUpperCase())} placeholder="EJ: ESM-1234" />
                {errors.codigo_reserva && <p className="text-xs text-destructive">{errors.codigo_reserva}</p>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="importe" className="font-body">Importe a pagar (ARS)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-body">$</span>
                  <Input
                    id="importe"
                    inputMode="numeric"
                    className="pl-7"
                    value={form.importe}
                    onChange={(e) => handleChange("importe", formatARS(e.target.value))}
                    placeholder="0"
                  />
                </div>
                {errors.importe && <p className="text-xs text-destructive">{errors.importe}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
              <ShieldCheck size={14} className="text-primary" />
              Pago procesado de forma segura por Mercado Pago.
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-body"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Generando pago...
                </>
              ) : (
                <>
                  <CreditCard /> Pagar ahora
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pago;
