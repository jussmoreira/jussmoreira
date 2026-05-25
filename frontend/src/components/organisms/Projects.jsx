import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Github, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../molecules/dialog";
import { Button } from "../atoms/button";

export default function Projects() {
  const { t } = useTranslation();
  const projects = t("projects", { returnObjects: true });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  if (!projects || typeof projects !== "object") return null;

  const projectItems = Array.isArray(projects.items) ? projects.items : [];

  const openProject = (project) => {
    setActive(project);
    setOpen(true);
  };

  return (
    <section
      id="projects"
      className="section-pad bg-secondary/40 border-y border-border"
    >
      <div className="container-narrow">
        <div className="reveal mb-12 flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="divider-dot" />
              <span className="eyebrow">{projects.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              {projects.title}
            </h2>
          </div>
          <a
            href="https://github.com/jussmoreira"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 link-underline"
          >
            <Github className="w-4 h-4" />
            {projects.githubCta}
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projectItems.map((project) => (
            <button
              key={project.id}
              onClick={() => openProject(project)}
              className="reveal text-left card-warm rounded-2xl overflow-hidden group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs text-primary border border-border">
                  {project.year}
                </div>
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.16em] text-accent">
                  {project.subtitle}
                </div>
                <h3 className="font-display text-2xl text-foreground mt-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {(project.tech || []).slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs bg-secondary text-primary border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
          {active && (
            <div>
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={active.cover} alt={active.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl text-foreground">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription className="text-accent uppercase tracking-[0.16em] text-xs">
                    {active.subtitle} - {active.year}
                  </DialogDescription>
                </DialogHeader>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {active.description}
                </p>
                <div className="mt-5">
                  <div className="text-xs uppercase tracking-[0.16em] text-accent mb-2">
                    {projects.highlightsLabel}
                  </div>
                  <ul className="space-y-1.5 text-muted-foreground text-[15px]">
                    {(active.highlights || []).map((highlight, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-none" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {(active.tech || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs bg-secondary text-primary border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {active.repo && (
                    <a href={active.repo} target="_blank" rel="noreferrer">
                      <Button className="btn-warm rounded-full">
                        <Github className="w-4 h-4 mr-2" />
                        {projects.viewRepo}
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="outline"
                    className="btn-ghost-warm rounded-full"
                    onClick={() => setOpen(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    {projects.close}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
