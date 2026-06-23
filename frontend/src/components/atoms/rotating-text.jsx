import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Muestra una palabra de una lista y va rotando entre ellas.
 * Las palabras SIEMPRE cambian (para que el efecto se vea); la animación de
 * entrada (fade + slide) solo se aplica si el usuario no pidió menos movimiento.
 */
export function RotatingText({ words = [], interval = 2000, className }) {
  const list = Array.isArray(words) && words.length > 0 ? words : [""];
  const [index, setIndex] = useState(0);
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
      setIndex((current) => (current + 1) % list.length);
    }, interval);
    return () => clearInterval(id);
  }, [list.length, interval]);

  return (
    <span className="relative inline-block">
      <span key={index} className={cn("inline-block", motion && "rotating-word", className)}>
        {list[index]}
      </span>
    </span>
  );
}
