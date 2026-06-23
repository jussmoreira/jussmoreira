import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Muestra una palabra de una lista y va rotando entre ellas con una pequeña
 * animación de entrada (fade + slide). Respeta prefers-reduced-motion: si el
 * usuario prefiere menos movimiento, queda fija en la primera palabra.
 */
export function RotatingText({ words = [], interval = 2200, className }) {
  const list = Array.isArray(words) && words.length > 0 ? words : [""];
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (list.length < 2) return undefined;

    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setAnimate(false);
      return undefined;
    }

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % list.length);
    }, interval);

    return () => clearInterval(id);
  }, [list.length, interval]);

  return (
    <span className="relative inline-block">
      <span key={index} className={cn("inline-block", animate && "rotating-word", className)}>
        {list[index]}
      </span>
    </span>
  );
}
