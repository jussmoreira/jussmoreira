import React from "react";
import { useTranslation } from "react-i18next";
import { TimelineEntry } from "@/components/molecules/timeline-entry";

export default function Experience() {
  const { t } = useTranslation();
  const experience = t("experience", { returnObjects: true });

  if (!experience || typeof experience !== "object") return null;

  const items = Array.isArray(experience.items) ? experience.items : [];

  return (
    <section id="experience" aria-labelledby="experience-title" className="container-narrow section-grid">
      <h2 id="experience-title">{experience.title}</h2>
      <ol className="section-body space-y-12">
        {items.map((item) => (
          <TimelineEntry
            key={`${item.role}-${item.period}`}
            period={item.period}
            title={item.role}
            subtitle={`${item.org} · ${item.location}`}
          >
            <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 leading-relaxed marker:text-muted-foreground">
              {(Array.isArray(item.bullets) ? item.bullets : []).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{(Array.isArray(item.tags) ? item.tags : []).join(" · ")}</p>
          </TimelineEntry>
        ))}
      </ol>
    </section>
  );
}
