import React from "react";
import { useTranslation } from "react-i18next";
import { TimelineEntry } from "@/components/molecules/timeline-entry";

export default function Education() {
  const { t } = useTranslation();
  const education = t("education", { returnObjects: true });

  if (!education || typeof education !== "object") return null;

  const items = Array.isArray(education.items) ? education.items : [];

  return (
    <section id="education" aria-labelledby="education-title" className="container-narrow section-grid">
      <h2 id="education-title">{education.title}</h2>
      <ol className="section-body space-y-10">
        {items.map((item) => (
          <TimelineEntry key={item.degree} period={item.period} title={item.degree} subtitle={item.school}>
            <p className="mt-3 max-w-[65ch] leading-relaxed">{item.notes}</p>
          </TimelineEntry>
        ))}
      </ol>
    </section>
  );
}
