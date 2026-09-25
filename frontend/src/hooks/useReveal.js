import { useEffect } from "react";

/**
 * Anima la entrada de todos los elementos con la clase `.reveal` cuando entran
 * en el viewport, añadiéndoles la clase `.in-view`. Funciona a nivel de página.
 *
 * Reaplica la observación cuando cambia `dependency` (p. ej. el idioma), para
 * cubrir nodos recién montados. Respeta `prefers-reduced-motion`.
 *
 * @param {unknown} dependency Valor que, al cambiar, re-evalúa los elementos.
 */
export function useReveal(dependency) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal"));

    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Sin IntersectionObserver (jsdom) o con movimiento reducido: revelar todo.
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("in-view"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const revealIfVisible = (element) => {
      const rect = element.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

      if (visible) {
        element.classList.add("in-view");
        return true;
      }

      return false;
    };

    elements.forEach((element) => {
      if (!element.classList.contains("in-view") && !revealIfVisible(element)) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [dependency]);
}
