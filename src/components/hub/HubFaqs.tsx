import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { HubFaq } from "@/content/hub";

/** FAQ accordion. The FAQPage JSON-LD is emitted by the page via Helmet. */
const HubFaqs = ({ faqs, title = "Preguntas frecuentes" }: { faqs: HubFaq[]; title?: string }) => {
  if (!faqs.length) return null;
  return (
    <section className="mt-14">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-6">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="font-body text-left text-foreground">{f.q}</AccordionTrigger>
            <AccordionContent className="font-body text-foreground/80 leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default HubFaqs;
