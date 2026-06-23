import { useEffect, useState } from "react";

/**
 * Anima un valor numérico de 0 a `target` con easing, usando requestAnimationFrame.
 * La animación arranca cuando `start` es verdadero (p. ej. al entrar en viewport).
 */
export function useCountUp(target, start, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return undefined;
    }

    if (typeof window === "undefined" || typeof window.requestAnimationFrame !== "function") {
      // Sin rAF disponible: fijar el valor final de forma determinista.
      setValue(target);
      return undefined;
    }

    let frameId;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [target, start, duration]);

  return value;
}
