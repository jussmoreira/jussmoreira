import React from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "@/components/atoms/external-link";
import { siteAssets } from "@/config/site";

const PROFILE_KEYS = ["linkedin", "github", "whatsapp", "orcid", "credly"];

export default function Contact() {
  const { t } = useTranslation();
  const profile = t("profile", { returnObjects: true });
  const contact = t("contact", { returnObjects: true });

  if (!profile || typeof profile !== "object" || !contact || typeof contact !== "object") return null;

  const labels = contact.labels || {};
  const socialLabels = contact.socialLabels || {};

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-narrow section-grid">
      <h2 id="contact-title">{contact.title}</h2>
      <div className="section-body">
        <p className="max-w-[60ch] text-lg leading-relaxed">{contact.description}</p>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">{labels.email}</dt>
            <dd className="mt-1 break-all">
              <a href={`mailto:${profile.email}`} className="font-medium underline-offset-4 hover:underline">{profile.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">{labels.phone}</dt>
            <dd className="mt-1">
              <a href={`tel:${profile.phoneRaw}`} className="font-medium tabular-nums underline-offset-4 hover:underline">{profile.phone}</a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">{labels.location}</dt>
            <dd className="mt-1 font-medium">{profile.location}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">{labels.profiles}</dt>
            <dd className="mt-1">
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {PROFILE_KEYS.map((key) => (
                  <li key={key}>
                    <ExternalLink href={siteAssets.socials[key]} className="font-medium underline-offset-4 hover:underline">
                      {socialLabels[key]}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
