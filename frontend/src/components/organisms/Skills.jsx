import React from "react";
import { useTranslation } from "react-i18next";

export default function Skills() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true });

  if (!skills || typeof skills !== "object") return null;

  const groups = Array.isArray(skills.groups) ? skills.groups : [];

  return (
    <section id="skills" aria-labelledby="skills-title" className="container-narrow section-grid">
      <h2 id="skills-title">{skills.title}</h2>
      <dl className="section-body divide-y border-y">
        {groups.map((group) => (
          <div key={group.title} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="text-muted-foreground">{group.title}</dt>
            <dd>{(Array.isArray(group.items) ? group.items : []).join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
