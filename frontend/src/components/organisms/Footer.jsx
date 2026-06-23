import React from "react";
import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { OrcidIcon } from "@/components/atoms/orcid-icon";
import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";
import { siteAssets } from "@/config/site";

export default function Footer() {
  const { t } = useTranslation();
  const profile = t("profile", { returnObjects: true });
  const footer = t("footer", { returnObjects: true });
  const year = new Date().getFullYear();

  if (!profile || typeof profile !== "object" || !footer || typeof footer !== "object") {
    return null;
  }

  const socialLabels = footer.socialLabels || {};
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[hsl(var(--inverse))] text-[hsl(var(--inverse-foreground))]">
      <div className="container-narrow py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--inverse))] flex items-center justify-center font-display">
                {profile.initials}
              </span>
              <div>
                <div className="font-display text-xl">{profile.shortName}</div>
                <div className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--inverse-muted))]">
                  {profile.title}
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-[hsl(var(--inverse-muted))] leading-relaxed max-w-sm">
              {profile.tagline}
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--inverse-muted))] mb-3">
              {footer.reachOut}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="link-underline hover:text-white">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phoneRaw}`} className="link-underline hover:text-white">
                  {profile.phone}
                </a>
              </li>
              <li className="text-[hsl(var(--inverse-muted))]">{profile.location}</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--inverse-muted))] mb-3">
              {footer.elsewhere}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={siteAssets.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--inverse))] transition-colors"
                aria-label={socialLabels.linkedin}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteAssets.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--inverse))] transition-colors"
                aria-label={socialLabels.github}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteAssets.socials.orcid}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--inverse))] transition-colors"
                aria-label={socialLabels.orcid}
              >
                <OrcidIcon className="w-4 h-4" />
              </a>
              <a
                href={siteAssets.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--inverse))] transition-colors"
                aria-label={socialLabels.whatsapp}
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--inverse))] transition-colors"
                aria-label={socialLabels.email}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[hsl(var(--inverse-muted))]">
            {t("footer.copyright", { year, name: profile.name })}
          </p>
          <button
            onClick={top}
            className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--inverse-muted))] hover:text-white inline-flex items-center gap-2"
          >
            {footer.backToTop} <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
