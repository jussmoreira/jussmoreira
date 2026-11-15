import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionBar } from "@/components/molecules/SectionBar";
import { PhoneStrip, ProjectCover, RefTab } from "@/components/molecules/ProjectCover";
import { ProjectDialog } from "@/components/molecules/ProjectDialog";
import { refCode } from "@/lib/format";
import { asList, useContent } from "@/hooks/useContent";

function LiveDot() {
  return <span aria-hidden className="inline-block h-2 w-2 bg-signal" />;
}

function ProjectCard({ project, index, featured, labels, onOpen }) {
  const allTech = asList(project.tech);
  const techList = allTech.slice(0, featured ? 8 : 4);
  const extraTech = allTech.length - techList.length;
  const parts = asList(project.parts);
  const mobile = Boolean(project.portraitImages) && Array.isArray(project.images);
  const tab = <RefTab code={refCode(index)} year={project.year} />;

  return (
    <article
      className={`reveal card-warm group relative overflow-hidden rounded has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring ${
        featured || mobile ? "md:col-span-2 lg:grid lg:grid-cols-12" : "flex flex-col"
      } w-[86%] flex-none snap-center md:w-auto`}
    >
      {mobile ? (
        <PhoneStrip
          tab={tab}
          images={project.images}
          className="h-[360px] lg:order-2 lg:col-span-6 lg:h-auto lg:min-h-[480px]"
        />
      ) : (
        <div
          className={`relative overflow-hidden aspect-[16/10] ${
            featured ? "lg:col-span-7 lg:aspect-auto lg:min-h-[420px]" : ""
          }`}
        >
          <ProjectCover project={project} className="absolute inset-0 h-full w-full " />
          {tab}
        </div>
      )}

      <div
        className={`flex flex-1 flex-col p-6 ${
          featured ? "lg:col-span-5 lg:justify-center lg:p-10" : ""
        } ${mobile ? "lg:order-1 lg:col-span-6 lg:justify-center lg:p-10" : ""}`}
      >
        {/* Metadatos en una línea: sin pastillas, cifras tabulares */}
        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground tabular">
          <span className="font-bold text-signal">{project.subtitle}</span>
          <span className="inline-flex items-center gap-3">
            {project.demo && (
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                <LiveDot />
                {labels.live}
              </span>
            )}
          </span>
        </div>
        <h3
          className={`font-display text-foreground mt-1 ${
            featured ? "text-2xl lg:text-[2rem] lg:leading-tight" : "text-2xl"
          }`}
        >
          {/* El botón cubre toda la tarjeta (after:inset-0) para abrir el detalle */}
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </button>
        </h3>
        <p
          className={`text-muted-foreground mt-3 text-[15px] leading-relaxed ${
            featured || mobile ? "" : "line-clamp-2"
          }`}
        >
          {project.description}
        </p>
        {parts.length > 0 && (
          <p className="mt-3 font-mono text-xs text-foreground">{parts.map((part) => part.name).join(" · ")}</p>
        )}
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-sm text-muted-foreground">
          {techList.map((tech) => (
            <li key={tech} className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
              {tech}
            </li>
          ))}
          {extraTech > 0 && <li className="font-mono text-xs text-muted-foreground">+{extraTech}</li>}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 pt-1 md:mt-auto md:pt-6">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-warm relative z-10 inline-flex h-10 items-center gap-1 rounded px-5 text-sm font-medium"
            >
              {labels.visit}
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </a>
          )}
          <span aria-hidden className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
            {labels.details}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const projects = useContent("projects");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  if (!projects) return null;

  const projectItems = asList(projects.items);
  const labels = {
    live: projects.liveLabel,
    visit: projects.viewSite,
    details: projects.details,
  };

  const openProject = (index) => {
    setActiveIndex(index);
    setOpen(true);
  };

  return (
    <section id="projects" className="section-pad">
      <div className="container-narrow">
        <SectionBar
          label={projects.eyebrow}
          aside={projectItems.length > 0 ? `${refCode(0)} — ${refCode(projectItems.length - 1)}` : undefined}
        />
        <h2 className="reveal mb-12 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">{projects.title}</h2>

        {/* En móvil las tarjetas van en una fila con snap (se ve un borde de la
            siguiente); desde md vuelven a la rejilla. */}
        <div
          role="region"
          aria-label={projects.title}
          tabIndex={0}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {projectItems.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={index === 0}
              labels={labels}
              onOpen={() => openProject(index)}
            />
          ))}
        </div>
      </div>

      <ProjectDialog
        project={projectItems[activeIndex]}
        code={refCode(activeIndex)}
        copy={projects}
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  );
}
