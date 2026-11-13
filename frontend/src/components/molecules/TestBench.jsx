import React from "react";

/* Extra STEAM, solo en la experiencia de robótica educativa: las piezas con
   las que se trabaja, como ladrillos. */
export function TestBench({ title, parts = [] }) {
  return (
    <div className="mt-5 border-t border-border pt-4">
      <div className="font-mono text-[11px] text-muted-foreground">{title}</div>
      <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-3 pt-1">
        {parts.map((part, index) => (
          <li key={part} className={`brick brick-${index % 3}`}>
            {part}
          </li>
        ))}
      </ul>
    </div>
  );
}
