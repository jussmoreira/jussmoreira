import { useEffect, useRef, useState } from "react";

/**
 * Detecta, una sola vez, cuando un elemento entra en el viewport.
 * Devuelve un `ref` para adjuntar al elemento y el booleano `inView`.
 */
export function useInViewOnce({ threshold = 0.35, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      // Entornos sin IntersectionObserver (p. ej. jsdom): revelar de inmediato.
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return { ref, inView };
}
