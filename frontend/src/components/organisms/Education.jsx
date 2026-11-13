import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { ContactLink } from "@/components/atoms/contact-link";
import { SectionBar } from "@/components/molecules/SectionBar";

export default function Education() {
  const { t } = useTranslation();
  const education = t("education", { returnObjects: true });

  if (!education || typeof education !== "object") return null;

  const items = Array.isArray(education.items) ? education.items : [];
  const certs = education.certifications;

  return (
    <section id="education" className="section-pad">
      <div className="container-narrow">
        <SectionBar label={education.eyebrow} />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <h2 className="text-[clamp(2.4rem,5vw,4rem)] text-foreground">{education.title}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{education.description}</p>
          </div>

          <div className="lg:col-span-7">
            <ol>
              {items.map((item, index) => (
                <li key={`${item.degree}-${index}`} className="reveal ledger-row py-6">
                  <div className="font-mono text-xs text-signal">{item.period}</div>
                  <h3 className="mt-2 text-xl text-foreground md:text-2xl">{item.degree}</h3>
                  <div className="mt-1 text-sm text-foreground">{item.school}</div>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.notes}</p>
                </li>
              ))}
            </ol>

            {certs && Array.isArray(certs.items) && (
              <div className="reveal mt-12">
                <h3 className="font-mono text-xs font-normal tracking-normal text-muted-foreground">
                  {certs.title}
                </h3>
                <ul className="mt-3 border-t border-[hsl(var(--rule))]">
                  {certs.items.map((cert) => (
                    <li
                      key={cert.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-3"
                    >
                      <span className="font-bold text-foreground">{cert.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {cert.issuer} · <span className="tabular">{cert.year}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span>{certs.more}</span>
                  {[
                    ["credly", "Credly"],
                    ["linkedin", "LinkedIn"],
                  ].map(([key, label]) => (
                    <ContactLink
                      key={key}
                      channel={key}
                      className="arrow-link inline-flex items-center gap-1 font-bold text-foreground hover:text-signal"
                    >
                      {label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </ContactLink>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
