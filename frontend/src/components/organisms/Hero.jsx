import React, { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { SafeImage } from "@/components/atoms/image";
import { OrcidIcon } from "@/components/atoms/orcid-icon";
import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";
import { RotatingText } from "@/components/atoms/rotating-text";
import { useTranslation } from "react-i18next";
import { siteAssets } from "@/config/site";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const profile = t("profile", { returnObjects: true });

  const h1Ref = useRef(null);
  const [h1MinHeight, setH1MinHeight] = useState(0);

  // Fijar la altura máxima del h1 para que la imagen no se mueva cuando
  // palabras más largas causan un salto de línea adicional
  useEffect(() => {
    const el = h1Ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setH1MinHeight((prev) => Math.max(prev, entry.contentRect.height));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Resetear al cambiar idioma para que se recalcule con las nuevas palabras
  useEffect(() => {
    setH1MinHeight(0);
  }, [i18n.language]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 md:pt-40 pb-8 md:pb-12 overflow-hidden"
    >
      <div
        aria-hidden
        className="animate-float absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, hsl(var(--accent) / 0.45) 0%, hsl(var(--secondary) / 0.72) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="animate-float-slow absolute -bottom-32 -left-20 w-[320px] h-[320px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.24) 0%, transparent 70%)",
        }}
      />

      <div className="container-narrow grid lg:grid-cols-12 gap-12 items-start relative">
        <div className="lg:col-span-7 hero-stagger">
          <h1
            ref={h1Ref}
            style={h1MinHeight ? { minHeight: h1MinHeight } : undefined}
            className="reveal font-display text-[44px] sm:text-6xl lg:text-7xl leading-[1.05] text-foreground"
          >
            {t("hero.greeting")} {" "}
            <span className="italic text-primary">{profile.shortName}</span>.
            <br />
            {t("hero.lead")} {" "}
            <RotatingText
              words={t("hero.rotatingWords", { returnObjects: true })}
              className="underline decoration-[hsl(var(--accent))] decoration-4 underline-offset-4"
            />{" "}
            {t("hero.closing")}
          </h1>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => scrollTo("projects")}
              className="btn-warm h-12 px-6 rounded-full text-sm font-medium"
            >
              {t("hero.ctaWork")}
              <ArrowDownRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              onClick={() => scrollTo("contact")}
              variant="outline"
              className="btn-ghost-warm h-12 px-6 rounded-full text-sm font-medium"
            >
              {t("hero.ctaContact")}
            </Button>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              {profile.location}
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 link-underline hover:text-primary"
            >
              <Mail className="w-4 h-4 text-accent" />
              {profile.email}
            </a>
            <a
              href={siteAssets.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 link-underline hover:text-primary"
            >
              <Linkedin className="w-4 h-4 text-accent" />
              LinkedIn
            </a>
            <a
              href={siteAssets.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 link-underline hover:text-primary"
            >
              <Github className="w-4 h-4 text-accent" />
              GitHub
            </a>
            <a
              href={siteAssets.socials.orcid}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 link-underline hover:text-primary"
            >
              <OrcidIcon className="w-4 h-4" />
              ORCID
            </a>
            <a
              href={siteAssets.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 link-underline hover:text-primary"
            >
              <WhatsappIcon className="w-4 h-4 text-accent" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="order-first lg:order-none lg:col-span-5 reveal flex justify-center lg:justify-center lg:pt-4">
          <div className="relative animate-float">
            {/* Cometa: arco brillante que orbita la foto */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "-4px",
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 55%, hsl(var(--accent) / 0.4) 68%, hsl(var(--accent)) 78%, hsl(var(--primary)) 85%, hsl(var(--accent) / 0.2) 92%, transparent 100%)",
                filter: "blur(1.5px)",
                animation: "spin 3.5s linear infinite",
              }}
            />
            {/* Foto circular */}
            <div className="relative w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden ring-[4px] ring-background shadow-[0_20px_60px_-10px_hsl(var(--foreground)/0.35)]">
              <SafeImage
                src={siteAssets.photo}
                alt={profile.name}
                width={280}
                height={280}
                className="w-full h-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
