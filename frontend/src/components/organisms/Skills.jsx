import React from "react";
import { useTranslation } from "react-i18next";
import { SectionBar } from "@/components/molecules/SectionBar";

/* Habilidades como tabla de especificaciones: grupo a la izquierda, piezas
   en línea a la derecha. Sin tarjetas ni chips. */
export default function Skills() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true });

  if (!skills || typeof skills !== "object") return null;

  const groups = Array.isArray(skills.groups) ? skills.groups : [];

  return (
    <section id="skills" className="section-pad">
      <div className="container-narrow">
        <SectionBar label={skills.eyebrow} />

        <div className="reveal mb-12 grid gap-6 lg:grid-cols-12">
          <h2 className="text-[clamp(2.4rem,5vw,4rem)] text-foreground lg:col-span-6">{skills.title}</h2>
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8 lg:self-end">
            {skills.description}
          </p>
        </div>

        <dl>
          {groups.map((group, index) => (
            <div key={group.title} className="reveal ledger-row grid gap-2 py-5 md:grid-cols-12 md:gap-6">
              <dt className="flex items-baseline gap-3 md:col-span-4">
                <span className="font-mono text-[11px] text-muted-foreground tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg text-foreground">{group.title}</span>
              </dt>
              <dd className="md:col-span-8">
                <ul className="flex flex-wrap gap-x-1 gap-y-1 text-[17px] text-foreground">
                  {group.items.map((item, itemIndex) => (
                    <li key={item} className="inline-flex items-baseline">
                      {item}
                      {itemIndex < group.items.length - 1 && (
                        <span aria-hidden className="mx-2 text-accent">/</span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
