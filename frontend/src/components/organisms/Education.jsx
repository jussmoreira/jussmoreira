import React from "react";
import { useTranslation } from "react-i18next";
import { Award, GraduationCap } from "lucide-react";
import { ContactLink } from "@/components/atoms/contact-link";

export default function Education() {
  const { t } = useTranslation();
  const education = t("education", { returnObjects: true });

  if (!education || typeof education !== "object") return null;

  const items = Array.isArray(education.items) ? education.items : [];
  const certs = education.certifications;

  return (
    <section id="education" className="section-pad">
      <div className="container-narrow grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-3">
            <span className="eyebrow eyebrow-index">{education.eyebrow}</span>
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
              className="reveal card-warm rounded p-6 flex gap-5"
            >
              <div className="flex-none">
                <div className="w-12 h-12 rounded bg-secondary border border-border flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-primary font-bold">{item.period}</div>
                <h3 className="font-display text-xl text-foreground mt-1">{item.degree}</h3>
                <div className="text-sm text-muted-foreground mt-1">{item.school}</div>
                <p className="text-muted-foreground text-[15px] mt-3 leading-relaxed">
                  {item.notes}
                </p>
              </div>
            </div>
          ))}

          {certs && Array.isArray(certs.items) && (
            <div className="reveal rounded border border-border bg-card p-5">
              <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" aria-hidden />
                {certs.title}
              </h3>
              <ul className="mt-3 divide-y divide-border text-sm">
                {certs.items.map((cert) => (
                  <li key={cert.name} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2">
                    <span className="text-foreground">{cert.name}</span>
                    <span className="text-muted-foreground">
                      {cert.issuer} · <span className="tabular">{cert.year}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>{certs.more}</span>
                {[
                  ["credly", "Credly"],
                  ["linkedin", "LinkedIn"],
                ].map(([key, label]) => (
                  <ContactLink
                    key={key}
                    channel={key}
                    className="link-underline text-foreground hover:text-primary"
                  >
                    {label}
                  </ContactLink>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
