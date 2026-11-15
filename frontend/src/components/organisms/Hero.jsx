import React, { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { RotatingText } from "@/components/atoms/rotating-text";
import { CodePanel } from "@/components/molecules/CodePanel";
import { useTranslation } from "react-i18next";
import { siteAssets } from "@/config/site";
import { useContent, useList } from "@/hooks/useContent";

/* Nombre letra por letra: cada una se asienta con un pequeño desfase y se
   ensancha al pasar el mouse (ver .name-letter en index.css) */
function Letters({ text, offset = 0 }) {
  return Array.from(text).map((char, index) =>
    char === " " ? (
      " "
    ) : (
      <span key={index} className="name-letter" style={{ "--i": offset + index }}>
        {char}
      </span>
    ),
  );
}

/* Cota horizontal bajo el panel: línea de medida con remates y rótulo */
function Dimension({ label }) {
  return (
    <div aria-hidden className="mt-2 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
      <span className="h-2.5 w-px bg-current" />
      <span className="h-px flex-1 bg-current" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-current" />
      <span className="h-2.5 w-px bg-current" />
    </div>
  );
}

/* Hero como lámina de plano: nombre a toda escala; debajo, el texto con el
   cajetín y el panel de código acotado. Cabe en una pantalla. */
export default function Hero() {
  const { t } = useTranslation();
  const profile = useContent("profile") ?? {};
  const titleBlock = useList("hero.titleBlock");
  const rotatingWords = useList("hero.rotatingWords");
  const [first, ...rest] = String(profile.shortName || "").split(" ");

  const [cvOpen, setCvOpen] = useState(false);
  const cvRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cvRef.current && !cvRef.current.contains(e.target)) setCvOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-14 md:pt-28 md:pb-20">
      <div className="container-narrow">
        {/* Rótulo superior de la lámina: solo la disponibilidad */}
        <div className="reveal flex items-center justify-end gap-4 font-mono text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2 text-foreground">
            <span aria-hidden className="status-dot h-2 w-2 bg-accent" />
            {profile.availability}
          </span>
        </div>
        <div aria-hidden className="mt-3 h-px w-full bg-[hsl(var(--rule))]" />

        <div className="relative mt-6 lg:mt-8">
          <h1 className="reveal uppercase text-foreground text-[min(25vw,8rem)] leading-[0.84] tracking-[-0.035em] lg:whitespace-nowrap lg:text-[min(16.8vw,13.4rem)]">
            <span className="sr-only">
              {t("hero.greeting")} {profile.shortName}
            </span>
            <span aria-hidden className="block lg:inline">
              <Letters text={first} />
            </span>{" "}
            <span aria-hidden className="block lg:inline">
              <Letters text={rest.join(" ")} offset={first.length} />
              <span className="text-accent">.</span>
            </span>
          </h1>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          <div className="hero-stagger flex min-w-0 flex-col lg:col-span-5">
            <p className="reveal text-xl leading-snug text-foreground md:min-h-[2.6em] md:text-2xl">
              {t("hero.lead")}{" "}
              <RotatingText
                words={rotatingWords}
                className="underline decoration-[hsl(var(--accent))] decoration-[3px] underline-offset-[6px]"
              />{" "}
              {t("hero.closing")}
            </p>

            <div className="reveal mt-6 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => scrollTo("projects")}
                className="btn-warm h-11 rounded px-5 text-sm font-bold"
              >
                {t("hero.ctaWork")}
                <ArrowDownRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                onClick={() => scrollTo("contact")}
                variant="outline"
                className="btn-ghost-warm h-11 rounded px-5 text-sm font-bold"
              >
                {t("hero.ctaContact")}
              </Button>

              <div ref={cvRef} className="relative">
                <Button
                  variant="outline"
                  onClick={() => setCvOpen((o) => !o)}
                  aria-expanded={cvOpen}
                  className="h-11 rounded border-0 bg-transparent px-2 text-sm font-bold text-foreground hover:bg-transparent hover:text-signal"
                >
                  <Download className="mr-1 h-4 w-4" />
                  {t("hero.ctaCV")}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${cvOpen ? "rotate-180" : ""}`} />
                </Button>
                {cvOpen && (
                  <div className="absolute left-0 z-50 mt-2 w-44 overflow-hidden rounded border border-foreground bg-background">
                    {[
                      ["EN", siteAssets.cv.en, t("hero.cvEN")],
                      ["ES", siteAssets.cv.es, t("hero.cvES")],
                    ].map(([code, href, label]) => (
                      <a
                        key={code}
                        href={href}
                        download
                        onClick={() => setCvOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="font-mono text-xs">{code}</span> {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cajetín de la lámina */}
            {titleBlock.length > 0 && (
              <dl className="reveal mt-8 grid grid-cols-2 border border-[hsl(var(--rule))] lg:mt-auto">
                {titleBlock.map(({ label, value }, index) => (
                  <div
                    key={label}
                    className={`px-3 py-2.5 ${index % 2 === 1 ? "border-l" : ""} ${index >= 2 ? "border-t" : ""} border-[hsl(var(--rule))]`}
                  >
                    <dt className="font-mono text-[10px] text-muted-foreground">{label}</dt>
                    <dd className="mt-1 text-[13px] font-bold leading-snug text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="reveal min-w-0 lg:col-span-7">
            <CodePanel />
            <Dimension label="FIG. 01 · justin.py" />
          </div>
        </div>
      </div>
    </section>
  );
}
