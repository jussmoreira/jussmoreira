import { useEffect, useRef, useState } from "react";

/**
 * Anima un valor numérico de 0 a `target` con easing, usando requestAnimationFrame.
 * La animación arranca cuando `start` es verdadero (p. ej. al entrar en viewport).
 */
export function useCountUp(target, start, duration = 900) {
  const [value, setValue] = useState(0);
  const printing = useRef(false);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return undefined;
    }

    /* Con movimiento reducido no hay conteo: se muestra la cifra final */
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof window === "undefined" || typeof window.requestAnimationFrame !== "function") {
      // Sin rAF disponible: fijar el valor final de forma determinista.
      setValue(target);
      return undefined;
    }

    let frameId;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (printing.current) return;
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [target, start, duration]);

  /* Al imprimir (Ctrl+P) se muestra la cifra final aunque la animación no
     haya corrido: en papel un contador a medias o en 0 sería un dato falso. */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const showFinal = () => {
      printing.current = true;
      setValue(target);
    };
    const hideFinal = () => {
      printing.current = false;
    };
    const query = typeof window.matchMedia === "function" ? window.matchMedia("print") : null;
    const onQuery = (event) => (event.matches ? showFinal() : hideFinal());

    window.addEventListener("beforeprint", showFinal);
    window.addEventListener("afterprint", hideFinal);
    query?.addEventListener?.("change", onQuery);
    return () => {
      window.removeEventListener("beforeprint", showFinal);
      window.removeEventListener("afterprint", hideFinal);
      query?.removeEventListener?.("change", onQuery);
    };
  }, [target]);

  return value;
}
