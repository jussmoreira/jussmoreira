import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Palabra que rota dentro de una frase.
 * - Reserva el ancho de la palabra más larga (sizer invisible) y posiciona la
 *   palabra visible en absoluto, de modo que el texto/imagen alrededor NO se mueven.
 * - Transición suave por cross-fade (la saliente se desvanece hacia arriba y la
 *   entrante aparece desde abajo). Respeta prefers-reduced-motion (swap directo).
 */
export function RotatingText({ words = [], interval = 2400, className }) {
  const list = Array.isArray(words) && words.length > 0 ? words : [""];
  const longest = list.reduce((a, b) => (b.length >= a.length ? b : a), list[0]);
  const [state, setState] = useState({ prev: null, cur: 0 });
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotion(!reduce);
  }, []);

  useEffect(() => {
    if (list.length < 2) return undefined;
    const id = setInterval(() => {
      setState((s) => ({ prev: s.cur, cur: (s.cur + 1) % list.length }));
    }, interval);
    return () => clearInterval(id);
  }, [list.length, interval]);

  return (
    <span className="relative inline-block align-baseline">
      {/* Sizer invisible: reserva el ancho/alto de la palabra más larga */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {longest}
      </span>

      {motion && state.prev !== null && (
        <span
          key={`p-${state.prev}-${state.cur}`}
          aria-hidden
          className={cn(
            "absolute left-0 top-0 whitespace-nowrap rotating-word-out",
            className,
          )}
        >
          {list[state.prev]}
        </span>
      )}

      <span
        key={`c-${state.cur}`}
        className={cn(
          "absolute left-0 top-0 whitespace-nowrap",
          motion && "rotating-word-in",
          className,
        )}
      >
        {list[state.cur]}
      </span>
    </span>
  );
}
