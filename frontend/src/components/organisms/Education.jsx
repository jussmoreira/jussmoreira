import React from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const { t } = useTranslation();
  const education = t("education", { returnObjects: true });

  if (!education || typeof education !== "object") return null;

  const items = Array.isArray(education.items) ? education.items : [];

  return (
    <section id="education" className="section-pad">
      <div className="container-narrow grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-3">
            <span className="divider-dot" />
            <span className="eyebrow">{education.eyebrow}</span>
          </div>
          <h2 className="section-title font-display text-4xl md:text-5xl text-foreground leading-tight">
            {education.title}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            {education.description}
          </p>
        </div>

        <div className="lg:col-span-7 space-y-5">
          {items.map((item, index) => (
            <div
              key={`${item.degree}-${index}`}
              className="reveal card-warm rounded-2xl p-6 flex gap-5"
            >
              <div className="flex-none">
                <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.18em] text-accent">
                  {item.period}
                </div>
                <h3 className="font-display text-xl text-foreground mt-1">
                  {item.degree}
                </h3>
                <div className="text-sm text-muted-foreground mt-1">{item.school}</div>
                <p className="text-muted-foreground text-[15px] mt-3 leading-relaxed">
                  {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
