import React from "react";

/* Encabezado de hoja: número de sección, etiqueta y una regla que cruza todo
   el ancho, como el rótulo de cada lámina en un juego de planos. */
export function SectionBar({ label, aside, inverse = false, className = "" }) {
  const muted = inverse ? "text-[hsl(var(--inverse-muted))]" : "text-muted-foreground";
  const line = inverse ? "bg-[hsl(var(--inverse-foreground)/0.5)]" : "bg-[hsl(var(--rule))]";

  return (
    <div className={`reveal section-bar mb-10 md:mb-12 ${className}`}>
      <div className={`flex items-baseline gap-4 font-mono text-xs ${muted}`}>
        <span className={`section-index tabular ${inverse ? "text-[hsl(var(--inverse-accent))]" : "text-signal"}`} />
        <span className={inverse ? "text-[hsl(var(--inverse-foreground))]" : "text-foreground"}>{label}</span>
        {aside && <span className="ml-auto hidden sm:inline">{aside}</span>}
      </div>
      <div aria-hidden className={`bar-line mt-3 h-px w-full ${line}`} />
    </div>
  );
}
