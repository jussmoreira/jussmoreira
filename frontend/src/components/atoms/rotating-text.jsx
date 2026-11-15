import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

const FADE_MS = 300;

/* Palabra que rota cada `interval` ms: se desvanece, cambia y vuelve a
   aparecer, así el cambio de ancho ocurre mientras es invisible. Con
   movimiento reducido cambia sin transición. */
export function RotatingText({ words = [], interval = 2400, className }) {
  const list = Array.isArray(words) && words.length > 0 ? words : [""];
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [motion] = useState(() => !prefersReducedMotion());
  const swapTimer = useRef(null);

  useEffect(() => {
    if (list.length < 2) return undefined;
    const next = () => setCurrent((index) => (index + 1) % list.length);

    const id = setInterval(() => {
      if (!motion) {
        next();
        return;
      }
      setFading(true);
      swapTimer.current = setTimeout(() => {
        next();
        setFading(false);
      }, FADE_MS);
    }, interval);

    return () => {
      clearInterval(id);
      clearTimeout(swapTimer.current);
    };
  }, [list.length, interval, motion]);

  return (
    <span
      className={cn(className)}
      style={{
        display: "inline",
        transition: motion ? `opacity ${FADE_MS}ms ease` : undefined,
        opacity: fading ? 0 : 1,
      }}
    >
      {list[current]}
    </span>
  );
}
