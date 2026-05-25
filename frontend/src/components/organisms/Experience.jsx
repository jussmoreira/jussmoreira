import React from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, MapPin } from "lucide-react";

export default function Experience() {
  const { t } = useTranslation();
  const experience = t("experience", { returnObjects: true });

  if (!experience || typeof experience !== "object") return null;

  const items = Array.isArray(experience.items) ? experience.items : [];

  return (
    <section id="experience" className="section-pad">
      <div className="container-narrow">
        <div className="reveal mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="divider-dot" />
            <span className="eyebrow">{experience.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            {experience.title}
          </h2>
        </div>

        <ol className="relative">
          <div
            aria-hidden
            className="absolute left-[18px] md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-1/2"
          />
          {items.map((item, index) => (
            <li
              key={`${item.role}-${index}`}
              className={`reveal relative md:grid md:grid-cols-2 md:gap-12 mb-10 ${
                index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <span
                aria-hidden
                className="absolute left-[12px] md:left-1/2 top-3 w-3 h-3 rounded-full bg-primary ring-4 ring-background md:-translate-x-1/2"
              />
              <div className="pl-10 md:pl-0 md:pr-10 md:text-right">
                <div className="text-sm uppercase tracking-[0.18em] text-accent">
                  {item.period}
                </div>
                <h3 className="font-display text-2xl text-foreground mt-1">
                  {item.role}
                </h3>
                <div className="flex items-center gap-3 mt-2 md:justify-end text-muted-foreground text-sm">
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-accent" />
                    {item.org}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-accent" />
                    {item.location}
                  </span>
                </div>
              </div>
              <div className="pl-10 md:pl-10 mt-4 md:mt-0">
                <div className="card-warm rounded-2xl p-6">
                  <ul className="space-y-2 text-muted-foreground text-[15px] leading-relaxed">
                    {(item.bullets || []).map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-none" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {(item.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs bg-secondary text-primary border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
