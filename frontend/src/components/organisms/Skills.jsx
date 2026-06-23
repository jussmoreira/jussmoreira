import React from "react";
import { useTranslation } from "react-i18next";
import {
  Code2,
  Layers,
  Database,
  GitBranch,
  KanbanSquare,
  HeartHandshake,
} from "lucide-react";

const icons = {
  Languages: Code2,
  "Frameworks & Web": Layers,
  Frameworks: Layers,
  "Bases de datos": Database,
  Databases: Database,
  "Tools & Version Control": GitBranch,
  "Herramientas y control de versiones": GitBranch,
  Methodologies: KanbanSquare,
  "Metodologías": KanbanSquare,
  Interpersonal: HeartHandshake,
  "Interpersonales": HeartHandshake,
};

export default function Skills() {
  const { t } = useTranslation();
  const skills = t("skills", { returnObjects: true });

  if (!skills || typeof skills !== "object") return null;

  const groups = Array.isArray(skills.groups) ? skills.groups : [];

  return (
    <section
      id="skills"
      className="section-pad relative bg-secondary/40 border-y border-border"
    >
      <div className="container-narrow">
        <div className="reveal flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="divider-dot" />
              <span className="eyebrow">{skills.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              {skills.title}
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-[15px] leading-relaxed">
            {skills.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group) => {
            const Icon = icons[group.title] || Code2;

            return (
              <div key={group.title} className="reveal card-warm rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </span>
                  <h3 className="font-display text-xl text-foreground">{group.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1.5 rounded-full text-sm bg-background border border-border text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
