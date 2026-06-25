import { useEffect, useRef } from "react";

/**
 * Fires `onView` once when the element scrolls into the viewport.
 * Lightweight wrapper around IntersectionObserver to avoid re-firing.
 */
export function useTrackOnView<T extends Element = HTMLDivElement>(
  onView: () => void,
  options: IntersectionObserverInit = { threshold: 0.4 },
) {
  const ref = useRef<T | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || firedRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      // SSR / very old browsers: fire immediately as fallback.
      firedRef.current = true;
      onView();
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          onView();
          obs.disconnect();
          break;
        }
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
