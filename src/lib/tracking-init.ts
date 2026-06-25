// Injects Google Tag Manager + Meta Pixel snippets on app boot.
// IDs are read from Vite env vars; if missing, nothing loads (safe no-op).
// Set VITE_GTM_ID and VITE_META_PIXEL_ID in your project env to activate.

export function initTracking() {
  if (typeof window === "undefined") return;

  const gtmId = import.meta.env.VITE_GTM_ID as string | undefined;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

  // ---- Google Tag Manager ----
  if (gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId)) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(s);

    // noscript fallback
    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  // ---- Meta Pixel ----
  if (pixelId && /^\d+$/.test(pixelId)) {
    /* eslint-disable */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */

    window.fbq?.("init", pixelId);
    window.fbq?.("track", "PageView");
  }
}
