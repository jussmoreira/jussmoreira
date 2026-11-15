import React, { useEffect, useState } from "react";
import { pad2 } from "@/lib/format";

/**
 * Regla de lectura en el borde superior: marcas finas cada 8 px y una más
 * alta cada 80 px, como una regla milimetrada. El tramo leído se pinta en
 * el acento y, junto al extremo, un rótulo mono con el número de la sección
 * actual (01, 02…), el mismo que usa la navegación. Usa requestAnimationFrame
 * para no saturar el hilo principal en el scroll.
 */
export function ScrollProgress() {
  const [state, setState] = useState({ progress: 0, section: "" });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? (el.scrollTop / max) * 100 : 0;

      /* Secciones numeradas: todas las de <main> menos el inicio */
      const sections = Array.from(document.querySelectorAll("main section[id]")).filter(
        (section) => section.id !== "home",
      );
      const line = window.innerHeight * 0.45;
      let current = -1;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= line) current = index;
      });

      setState({ progress, section: current >= 0 ? pad2(current + 1) : "" });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const { progress, section } = state;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[7px]">
      <div className="scroll-ruler absolute inset-0 text-foreground/25" />
      <div
        className="scroll-ruler absolute inset-y-0 left-0 overflow-hidden text-accent"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
      </div>
      {section && progress > 0.5 && (
        <span
          className="absolute top-[9px] hidden -translate-x-full bg-accent px-1 font-mono text-[10px] leading-[14px] text-accent-foreground tabular md:block"
          style={{ left: `max(${progress}%, 1.5rem)` }}
        >
          {section}
        </span>
      )}
    </div>
  );
}
