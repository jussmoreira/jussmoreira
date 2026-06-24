import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function RotatingText({ words = [], interval = 2400, className }) {
  const list = Array.isArray(words) && words.length > 0 ? words : [""];
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);
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
      if (!motion) {
        setCur((c) => (c + 1) % list.length);
        return;
      }
      // Fade out → swap → fade in: el reflow ocurre mientras la palabra es invisible
      setFading(true);
      const t = setTimeout(() => {
        setCur((c) => (c + 1) % list.length);
        setFading(false);
      }, 300);
      return () => clearTimeout(t);
    }, interval);
    return () => clearInterval(id);
  }, [list.length, interval, motion]);

  return (
    <span
      className={cn(className)}
      style={{
        display: "inline",
        transition: motion ? "opacity 300ms ease" : undefined,
        opacity: fading ? 0 : 1,
      }}
    >
      {list[cur]}
    </span>
  );
}
