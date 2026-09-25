import React from "react";
import { ArrowDown, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/button";
import { ExternalLink } from "@/components/atoms/external-link";
import { SafeImage } from "@/components/atoms/image";
import { siteAssets } from "@/config/site";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const profile = t("profile", { returnObjects: true });
  const hero = t("hero", { returnObjects: true });

  if (!profile || typeof profile !== "object" || !hero || typeof hero !== "object") return null;

  const isSpanish = i18n.resolvedLanguage?.startsWith("es");
  const cv = isSpanish ? siteAssets.cv.es : siteAssets.cv.en;
  const otherCv = isSpanish ? siteAssets.cv.en : siteAssets.cv.es;

  return (
    <section id="home" className="container-narrow grid gap-10 pb-20 pt-12 md:pt-20 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-8">
        <p className="text-muted-foreground">
          {profile.title} · {profile.location}
        </p>
        <h1 className="mt-3 text-5xl leading-none sm:text-6xl lg:text-7xl">{profile.shortName}</h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{hero.lead}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href="#projects">
              {hero.ctaWork}
              <ArrowDown aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={cv} download>
              <Download aria-hidden="true" />
              {hero.ctaCV}
            </a>
          </Button>
          <a href={otherCv} download className="px-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            {hero.cvOther}
          </a>
        </div>

        <ul aria-label={hero.linksLabel} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <ExternalLink href={siteAssets.socials.github} className="underline-offset-4 hover:underline">GitHub</ExternalLink>
          </li>
          <li>
            <ExternalLink href={siteAssets.socials.linkedin} className="underline-offset-4 hover:underline">LinkedIn</ExternalLink>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="underline-offset-4 hover:underline">{profile.email}</a>
          </li>
        </ul>
      </div>

      <div className="order-first max-w-[14rem] lg:order-none lg:col-span-4 lg:max-w-none">
        <SafeImage
          src={siteAssets.photo}
          alt={profile.name}
          width={660}
          height={880}
          loading="eager"
          fetchPriority="high"
          className="aspect-[3/4] w-full rounded-lg bg-secondary object-cover"
        />
      </div>
    </section>
  );
}
