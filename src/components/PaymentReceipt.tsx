import { forwardRef } from "react";

// Friendly labels for common Mercado Pago payment_method_id values
const PM_LABELS: Record<string, string> = {
  visa: "VISA",
  master: "MASTERCARD",
  amex: "AMERICAN EXPRESS",
  naranja: "NARANJA",
  cabal: "CABAL",
  maestro: "MAESTRO",
  debvisa: "VISA DEBITO",
  debmaster: "MAESTRO DEBITO",
  debcabal: "CABAL DEBITO",
};

const formatARSNumber = (n: number) =>
  new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const formatDateAR = (date: Date) =>
  new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

export interface PaymentReceiptProps {
  operationId: number | string;
  amount: number;
  paymentMethodId?: string;
  externalReference?: string;
  date: Date;
}

// Visual representation of a thermal POS receipt.
// Rendered off-screen by Pago.tsx and captured with html-to-image.
export const PaymentReceipt = forwardRef<HTMLDivElement, PaymentReceiptProps>(
  ({ operationId, amount, paymentMethodId, externalReference, date }, ref) => {
    const pmLabel = paymentMethodId
      ? PM_LABELS[paymentMethodId.toLowerCase()] ?? paymentMethodId.toUpperCase()
      : "MERCADO PAGO";

    const sep = "------------------------------";

    return (
      <div
        ref={ref}
        style={{
          width: 340,
          backgroundColor: "#ffffff",
          color: "#111111",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: 13,
          lineHeight: 1.45,
          padding: "22px 18px 24px",
          border: "1px dashed #cfcfcf",
        }}
      >
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 12, letterSpacing: 0.5 }}>
          ESMERALDA DESARROLLOS<br />INMOBILIARIOS S.R.L.
        </div>
        <div style={{ textAlign: "center", marginTop: 4, fontSize: 12 }}>
          9 de Julio 262<br />Marcos Juárez, Córdoba
        </div>
        <div style={{ textAlign: "center", marginTop: 2, fontSize: 12 }}>
          CUIT 30-71546692-5
        </div>

        <div style={{ textAlign: "center", margin: "10px 0 8px" }}>{sep}</div>

        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
          COMPROBANTE DE PAGO
        </div>

        <div style={{ textAlign: "center", margin: "8px 0" }}>{sep}</div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>FECHA:</span>
          <span>{formatDateAR(date)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>OPERACION:</span>
          <span>#{operationId}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>MEDIO:</span>
          <span>{pmLabel}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>PROCESADOR:</span>
          <span>MERCADO PAGO</span>
        </div>
        {externalReference && (
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span>REF:</span>
            <span style={{ fontSize: 10, wordBreak: "break-all", textAlign: "right" }}>
              {externalReference}
            </span>
          </div>
        )}

        <div style={{ textAlign: "center", margin: "8px 0" }}>{sep}</div>

        <div style={{ textAlign: "center", marginTop: 4 }}>
          <div style={{ fontSize: 11, letterSpacing: 1 }}>TOTAL</div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 2 }}>
            $ {formatARSNumber(amount)}
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "10px 0 6px" }}>{sep}</div>

        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 14, letterSpacing: 2 }}>
          ** APROBADO **
        </div>

        <div style={{ textAlign: "center", margin: "8px 0 6px" }}>{sep}</div>

        <div style={{ textAlign: "center", fontSize: 11 }}>
          Gracias por su pago
        </div>
        <div style={{ textAlign: "center", fontSize: 10, marginTop: 6, color: "#555" }}>
          Comprobante no válido como factura
        </div>
      </div>
    );
  },
);
PaymentReceipt.displayName = "PaymentReceipt";
