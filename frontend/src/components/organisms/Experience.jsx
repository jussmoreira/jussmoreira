import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TestBench } from "@/components/molecules/TestBench";
import { SectionBar } from "@/components/molecules/SectionBar";

/* "Feb 2025 - May 2026" → "2025–26"; un solo año si empieza y termina igual */
function yearSpan(period = "") {
  const years = String(period).match(/\d{4}/g) || [];
  if (years.length === 0) return "";
  const [start, end] = [years[0], years[years.length - 1]];
  if (start === end) return start;
  return `${start}–${start.slice(0, 2) === end.slice(0, 2) ? end.slice(2) : end}`;
}

/* En móvil solo se ve el primer aporte; el resto se despliega. Desde md
   se muestran todos y el botón desaparece. */
function Bullets({ bullets, labels }) {
  const [open, setOpen] = useState(false);
  const id = React.useId();

  return (
    <>
      <ul id={id} className="mt-4 space-y-2 text-[16px] leading-relaxed text-muted-foreground">
        {bullets.map((bullet, bulletIndex) => (
          <li
            key={bulletIndex}
            className={`gap-3 ${bulletIndex === 0 || open ? "flex" : "hidden md:flex print:flex"}`}
          >
            <span aria-hidden className="mt-[0.7em] h-px w-3 flex-none bg-foreground" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {bullets.length > 1 && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={id}
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-mono text-xs font-bold text-foreground md:hidden"
        >
          {open ? labels.less : labels.more}
          <ChevronDown
            aria-hidden
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </>
  );
}

/* Experiencia como registro: fechas y lugar en la columna izquierda,
   rol y aportes a la derecha. Sin zigzag ni tarjetas. */
export default function Experience() {
  const { t } = useTranslation();
  const experience = t("experience", { returnObjects: true });

  if (!experience || typeof experience !== "object") return null;

  const items = Array.isArray(experience.items) ? experience.items : [];

  return (
    <section id="experience" className="section-pad">
      <div className="container-narrow">
        <SectionBar label={experience.eyebrow} />

        <h2 className="reveal mb-12 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">
          {experience.title}
        </h2>

        <ol>
          {items.map((item, index) => (
            <li
              key={`${item.role}-${index}`}
              className="reveal ledger-row grid gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10"
            >
              {/* Los años quedan fijos mientras se lee el puesto, como el índice de un plano */}
              <div className="md:sticky md:top-28 md:col-span-4 md:self-start">
                <div aria-hidden className="font-display font-condensed text-[clamp(2.6rem,5vw,4.25rem)] leading-[0.9] text-foreground [font-variant-numeric:tabular-nums]">
                  {yearSpan(item.period)}
                </div>
                <div className="mt-2 font-mono text-sm text-signal tabular">{item.period}</div>
                <div className="mt-2 text-sm text-foreground">{item.org}</div>
                <div className="text-sm text-muted-foreground">{item.location}</div>
              </div>

              <div className="md:col-span-8">
                <h3 className="text-2xl text-foreground md:text-[1.75rem]">{item.role}</h3>
                <Bullets
                  bullets={item.bullets || []}
                  labels={{ more: experience.more, less: experience.less }}
                />
                {item.bench && experience.bench && <TestBench {...experience.bench} />}
                <p className="mt-5 font-mono text-xs text-muted-foreground">
                  {(item.tags || []).join("  ·  ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
