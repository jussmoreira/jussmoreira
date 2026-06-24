import React from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap, Languages, Sparkles, Users } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const statIcons = [GraduationCap, Sparkles, Users, Languages];

function StatCard({ icon: Icon, label, value, suffix, inView }) {
  const animatedValue = useCountUp(value, inView, 850);

  return (
    <div className="card-warm rounded-xl p-4 flex flex-col gap-2">
      <Icon className="w-5 h-5 text-accent" />
      <div className="font-display text-3xl text-foreground">
        {animatedValue}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true });
  const { ref, inView } = useInViewOnce({ threshold: 0.25 });

  if (!about || typeof about !== "object") return null;

  const paragraphs = Array.isArray(about.paragraphs) ? about.paragraphs : [];
  const stats = Array.isArray(about.stats) ? about.stats : [];
  const languages = Array.isArray(about.languages) ? about.languages : [];

  return (
    <section id="about" className="relative pt-10 md:pt-14 pb-24">
      <div className="container-narrow grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-4">
            <span className="divider-dot" />
            <span className="eyebrow">{about.eyebrow}</span>
          </div>
          <h2 className="section-title font-display text-4xl md:text-5xl leading-tight text-foreground">
            {about.titleStart} <em className="text-primary">{about.titleEmphasis}</em>{" "}
            {about.titleEnd}
          </h2>
        </div>

        <div className="lg:col-span-7 reveal">
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[17px]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div ref={ref} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ label, value }, index) => {
              const match = String(value).match(/^(\d+)(.*)$/);

              return (
                <StatCard
                  key={label}
                  icon={statIcons[index] || GraduationCap}
                  label={label}
                  value={Number(match?.[1] || 0)}
                  suffix={match?.[2] || ""}
                  inView={inView}
                />
              );
            })}
          </div>

          <div className="mt-8">
            <div className="text-sm uppercase tracking-[0.2em] text-accent mb-3">
              {about.languagesLabel}
            </div>
            <div className="flex flex-wrap gap-3">
              {languages.map((language) => (
                <span
                  key={language.name}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm border border-border"
                >
                  <span className="font-medium text-foreground">{language.name}</span>
                  <span className="mx-2 text-accent">•</span>
                  {language.level}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
