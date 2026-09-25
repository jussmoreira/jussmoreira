import * as React from "react";

/** Fila de una trayectoria: periodo a la izquierda; título, subtítulo y detalle a la derecha. */
export function TimelineEntry({ period, title, subtitle, children }) {
  return (
    <li className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <p className="text-sm tabular-nums text-muted-foreground sm:pt-1">{period}</p>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
        {children}
      </div>
    </li>
  );
}
