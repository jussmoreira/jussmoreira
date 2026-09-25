import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true });

  if (!about || typeof about !== "object") return null;

  const paragraphs = Array.isArray(about.paragraphs) ? about.paragraphs : [];
  const languages = Array.isArray(about.languages) ? about.languages : [];

  return (
    <section id="about" aria-labelledby="about-title" className="container-narrow section-grid">
      <h2 id="about-title">{about.title}</h2>
      <div className="section-body">
        <div className="max-w-[65ch] space-y-5 text-lg leading-relaxed">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className="mt-10 text-sm font-medium text-muted-foreground">{about.languagesLabel}</h3>
        <dl className="mt-3 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {languages.map((language) => (
            <div key={language.name}>
              <dt className="font-medium">{language.name}</dt>
              <dd className="text-muted-foreground">{language.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
