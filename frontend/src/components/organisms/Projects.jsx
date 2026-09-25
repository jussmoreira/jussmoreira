import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "@/components/atoms/external-link";
import { SafeImage } from "@/components/atoms/image";
import { siteAssets } from "@/config/site";

const linkClass = "inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline";

export default function Projects() {
  const { t } = useTranslation();
  const projects = t("projects", { returnObjects: true });

  if (!projects || typeof projects !== "object") return null;

  const projectItems = Array.isArray(projects.items) ? projects.items : [];

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-narrow section-grid">
      <div className="lg:col-span-4">
        <h2 id="projects-title" className="text-3xl md:text-4xl">{projects.title}</h2>
        <ExternalLink href={siteAssets.socials.github} className={`${linkClass} mt-4 text-muted-foreground`}>
          {projects.githubCta}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </ExternalLink>
      </div>

      <div className="section-body space-y-16">
        {projectItems.map((project) => (
          <article key={project.id} aria-labelledby={`${project.id}-title`}>
            {project.cover && (
              <SafeImage
                src={project.cover}
                alt=""
                width={1600}
                height={703}
                loading="lazy"
                className="mb-6 h-auto w-full rounded-lg border"
              />
            )}
            <p className="text-sm text-muted-foreground">
              {project.subtitle} · {project.year}
            </p>
            <h3 id={`${project.id}-title`} className="mt-1 text-xl font-semibold">{project.title}</h3>
            <p className="mt-3 max-w-[65ch] leading-relaxed">{project.description}</p>
            <ul className="mt-4 max-w-[65ch] list-disc space-y-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground">
              {(Array.isArray(project.highlights) ? project.highlights : []).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{(Array.isArray(project.tech) ? project.tech : []).join(" · ")}</p>
            {project.repo && (
              <ExternalLink href={project.repo} className={`${linkClass} mt-4`}>
                {projects.viewRepo}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ExternalLink>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
