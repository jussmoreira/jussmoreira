import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/atoms/image";

/* Carrusel plano de capturas: botones, contador, miniaturas, teclado y swipe.
   Sin rebotes ni escalas; el cambio de imagen es un fundido corto. */
export function ImageCarousel({ images, prevLabel, nextLabel, className = "" }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const total = images.length;
  const go = (step) => setIndex((current) => (current + step + total) % total);
  const current = images[index];

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  const onTouchEnd = (event) => {
    if (touchX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`relative flex flex-col bg-[hsl(var(--inverse))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${className}`}
    >
      <div
        className="relative min-h-0 flex-1"
        onTouchStart={(event) => {
          touchX.current = event.touches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
      >
        <SafeImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={1200}
          height={750}
          className="carousel-fade absolute inset-0 h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-2 text-[hsl(var(--inverse-foreground))]">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={prevLabel}
          className="flex h-8 w-8 items-center justify-center rounded border border-[hsl(var(--inverse-foreground)/0.25)] hover:bg-[hsl(var(--inverse-foreground)/0.12)]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <div className="flex items-center gap-2" aria-hidden>
          {images.map((image, i) => (
            <span
              key={image.src}
              className={`h-1.5 w-6 ${
                i === index ? "bg-[hsl(var(--accent))]" : "bg-[hsl(var(--inverse-foreground)/0.25)]"
              }`}
            />
          ))}
        </div>
        <span aria-live="polite" className="font-mono text-xs text-[hsl(var(--inverse-muted))] tabular">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={nextLabel}
          className="flex h-8 w-8 items-center justify-center rounded border border-[hsl(var(--inverse-foreground)/0.25)] hover:bg-[hsl(var(--inverse-foreground)/0.12)]"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
