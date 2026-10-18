import { useEffect } from "react";

const CHAT_SCRIPT = "https://multiapart.com/embed-chat.js";

interface WhatsAppButtonProps {
  barHeight?: number;
  /** Retained for existing callers; the hosted chat manages its own messages. */
  link?: string;
}

const WhatsAppButton = ({ barHeight = 0 }: WhatsAppButtonProps) => {
  const bottomPx = Math.max(barHeight, 110) + 24;

  useEffect(() => {
    let chatHost: HTMLElement | undefined;

    // The vendor owns the chat UI; only adapt its placement to our booking bar.
    const positionChat = () => {
      for (const element of Array.from(document.body.children)) {
        const root = element.shadowRoot;
        if (!root?.querySelector('.panel[aria-label="Chat"]') || !root.querySelector('button[aria-label="Abrir chat"]')) continue;
        if (!(element instanceof HTMLElement)) continue;
        chatHost = element;
        chatHost.hidden = false;
        let style = root.querySelector<HTMLStyleElement>("style[data-esmeralda-chat]");
        if (!style) {
          style = document.createElement("style");
          style.dataset.esmeraldaChat = "";
          root.appendChild(style);
        }
        style.textContent = `
          .btn { bottom: ${bottomPx}px; }
          @media (min-width: 641px) {
            .panel { bottom: ${bottomPx + 76}px; height: min(620px, calc(100dvh - ${bottomPx + 96}px)); }
          }
        `;
      }
    };

    positionChat();
    // Only watch body until the vendor widget is found, then stop observing.
    const observer = new MutationObserver(() => {
      positionChat();
      if (chatHost) observer.disconnect();
    });
    if (!chatHost) observer.observe(document.body, { childList: true });

    // Keep one script and one vendor widget across client-side navigation.
    if (!document.querySelector(`script[src="${CHAT_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = CHAT_SCRIPT;
      script.dataset.hotel = "esmeralda-apart";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      observer.disconnect();
      if (chatHost) chatHost.hidden = true;
    };
  }, [bottomPx]);

  return null;
};

export default WhatsAppButton;
