import React from "react";
import { ArrowDownRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { SafeImage } from "@/components/atoms/image";
import { OrcidIcon } from "@/components/atoms/orcid-icon";
import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";
import { useTranslation } from "react-i18next";
import { siteAssets } from "@/config/site";

export default function Hero() {
  const { t } = useTranslation();
  const profile = t("profile", { returnObjects: true });

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
        className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, hsl(var(--accent) / 0.45) 0%, hsl(var(--secondary) / 0.72) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-[320px] h-[320px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.24) 0%, transparent 70%)",
        }}
      />

      <div className="container-narrow grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <div className="reveal flex items-center gap-3 mb-6">
            <span className="divider-dot" />
            <span className="eyebrow">{t("hero.eyebrow")}</span>
          </div>

          <h1 className="reveal font-display text-[44px] sm:text-6xl lg:text-7xl leading-[1.05] text-foreground">
            {t("hero.greeting")} {" "}
            <span className="italic text-primary">{profile.shortName}</span>.
            <br />
            {t("hero.lead")} {" "}
            <span className="underline decoration-[hsl(var(--accent))] decoration-4 underline-offset-4">
              {t("hero.emphasis")}
            </span>{" "}
            {t("hero.closing")}
          </h1>

          <p className="reveal mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {profile.summary}
          </p>

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

        <div className="lg:col-span-5 reveal">
          <div className="relative mx-auto w-[280px] sm:w-[340px] lg:w-full max-w-[420px]">
            <div
              className="absolute -inset-4 rounded-[28px] -z-10"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--accent) / 0.85) 60%, hsl(var(--primary) / 0.7) 100%)",
              }}
            />
            <div className="relative rounded-[24px] overflow-hidden border border-border shadow-[0_30px_80px_-30px_hsl(var(--foreground)/0.45)] bg-card">
              <SafeImage
                src={siteAssets.photo}
                alt={profile.name}
                width={420}
                height={525}
                className="w-full h-auto object-cover aspect-[4/5]"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-background/85 backdrop-blur px-4 py-3 rounded-xl border border-border">
                <div className="text-xs uppercase tracking-[0.18em] text-accent">
                  {profile.title}
                </div>
                <div className="text-sm text-foreground mt-0.5">
                  {profile.availability}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
