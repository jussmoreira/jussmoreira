import React from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { OrcidIcon } from "@/components/atoms/orcid-icon";
import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";
import { siteAssets } from "@/config/site";

export default function Contact() {
  const { t } = useTranslation();
  const profile = t("profile", { returnObjects: true });
  const contact = t("contact", { returnObjects: true });

  if (!contact || typeof contact !== "object") return null;

  const socialLabels =
    contact.socialLabels || t("footer.socialLabels", { returnObjects: true }) || {};

  return (
    <section id="contact" className="section-pad bg-secondary/40 border-t border-border">
      <div className="container-narrow max-w-3xl mx-auto text-center">
        <div className="reveal flex items-center justify-center gap-3 mb-3">
          <span className="divider-dot" />
          <span className="eyebrow">{contact.eyebrow}</span>
        </div>
        <h2 className="reveal section-title font-display text-4xl md:text-5xl text-foreground leading-tight">
          {contact.titleStart} <em className="text-primary">{contact.titleEmphasis}</em>
          {contact.titleEnd}
        </h2>
        <p className="reveal mt-5 text-muted-foreground leading-relaxed">
          {contact.description}
        </p>

        <div className="reveal mt-10 grid sm:grid-cols-2 gap-3 text-left">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 group rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors"
          >
            <span className="w-10 h-10 flex-none rounded-lg bg-secondary border border-border flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </span>
            <span className="text-foreground link-underline break-all">{profile.email}</span>
          </a>

          <a
            href={`tel:${profile.phoneRaw}`}
            className="flex items-center gap-3 group rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors"
          >
            <span className="w-10 h-10 flex-none rounded-lg bg-secondary border border-border flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </span>
            <span className="text-foreground link-underline">{profile.phone}</span>
          </a>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <span className="w-10 h-10 flex-none rounded-lg bg-secondary border border-border flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </span>
            <span className="text-foreground">{profile.location}</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <a
              href={siteAssets.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={socialLabels.linkedin}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={siteAssets.socials.github}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={socialLabels.github}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={siteAssets.socials.orcid}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={socialLabels.orcid}
            >
              <OrcidIcon className="w-4 h-4" />
            </a>
            <a
              href={siteAssets.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={socialLabels.whatsapp}
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
