import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/molecules/dialog";
import { Button } from "@/components/atoms/button";
import { SafeImage } from "@/components/atoms/image";
import { ImageCarousel } from "@/components/molecules/ImageCarousel";
import { SectionBar } from "@/components/molecules/SectionBar";

/* Flecha vertical entre capas, con el protocolo al lado si lo hay */
function Link({ label }) {
  return (
    <span
      aria-hidden
      className="relative flex h-3 w-px justify-center bg-[hsl(var(--inverse-accent))] sm:h-5 after:absolute after:-bottom-px after:left-1/2 after:-translate-x-1/2 after:border-x-[3px] after:border-t-[5px] after:border-x-transparent after:border-t-[hsl(var(--inverse-accent))] after:content-['']"
    >
      {label && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-[hsl(var(--inverse-muted))]">
          {label}
        </span>
      )}
    </span>
  );
}

/* Portada dibujada para proyectos sin captura real: las capas de la
   arquitectura como un esquema, con lo que corre en cada una y el
   cajetín de plano con el nombre del proyecto. */
function DiagramCover({ layers, title, className = "" }) {
  return (
    <div
      aria-hidden
      className={`relative flex flex-col items-center justify-center bg-[hsl(var(--inverse))] pb-6 text-[hsl(var(--inverse-foreground))] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(hsl(var(--inverse-foreground) / 0.08) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {layers.map((layer, index) => (
        <React.Fragment key={layer.name}>
          {index > 0 && <Link label={layer.link} />}
          <span className="w-44 border border-[hsl(var(--inverse-foreground)/0.22)] bg-[hsl(var(--inverse))] px-2 py-1 text-center sm:w-56 sm:py-1.5">
            <span className="block font-mono text-xs sm:text-sm">{layer.name}</span>
            <span className="block font-mono text-[10px] text-[hsl(var(--inverse-muted))]">{layer.detail}</span>
          </span>
        </React.Fragment>
      ))}
      <span className="absolute bottom-0 right-0 border-l border-t border-[hsl(var(--inverse-foreground)/0.22)] px-2 py-1 font-mono text-[10px] uppercase text-[hsl(var(--inverse-muted))]">
        {title}
      </span>
    </div>
  );
}

function ProjectCover({ project, className }) {
  const firstImage = Array.isArray(project.images) ? project.images[0] : null;
  if (firstImage && !project.portraitImages) {
    return (
      <SafeImage
        src={firstImage.src}
        alt=""
        width={1200}
        height={750}
        className={`object-cover object-top ${className}`}
        loading="lazy"
      />
    );
  }
  if (project.cover) {
    return (
      <SafeImage
        src={project.cover}
        alt=""
        width={1200}
        height={750}
        className={`object-cover object-top ${className}`}
        loading="lazy"
      />
    );
  }
  if (Array.isArray(project.diagram)) {
    return <DiagramCover layers={project.diagram} title={project.title} className={className} />;
  }
  return <div aria-hidden className={`bg-secondary ${className}`} />;
}

/* Proyectos móviles: las pantallas van en vertical, una al lado de otra, a toda la altura */
function PhoneStrip({ images, tab, className = "" }) {
  return (
    <div
      aria-hidden
      className={`relative flex items-center justify-center gap-3 bg-[hsl(var(--inverse))] p-5 sm:p-8 ${className}`}
    >
      {tab}
      {images.slice(0, 3).map((image, i) => (
        <SafeImage
          key={image.src}
          src={image.src}
          alt=""
          width={600}
          height={1300}
          loading="lazy"
          className={`h-full max-h-[460px] min-w-0 flex-1 rounded object-cover object-top ${i === 2 ? "hidden sm:block" : ""}`}
        />
      ))}
    </div>
  );
}

function LiveDot() {
  return (
    <span aria-hidden className="inline-block h-2 w-2 bg-signal" />
  );
}

const refCode = (index) => `REF-${String(index + 1).padStart(2, "0")}`;

/* Pestaña de ficha técnica: abajo a la izquierda de la imagen, donde no tapa
   las barras de navegación de las capturas. */
function RefTab({ code, year }) {
  return (
    <span className="pointer-events-none absolute bottom-0 left-0 z-10 bg-[hsl(var(--inverse))] px-3 py-1.5 font-mono text-[11px] text-[hsl(var(--inverse-foreground))]">
      {code}
      <span className="ml-2 text-[hsl(var(--inverse-muted))]">{year}</span>
    </span>
  );
}

/* Pines del componente: el stack leído como la tabla de pines de una ficha técnica */
function PinTable({ items }) {
  return (
    <ol className="mt-5 grid grid-cols-2 gap-x-6 border-t border-border font-mono text-xs">
      {items.map((item, index) => (
        <li key={item} className="flex items-baseline gap-2 border-b border-border py-1.5">
          <span className="w-6 flex-none text-signal tabular">P{index + 1}</span>
          <span className="text-foreground">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function ProjectCard({ project, index, featured, labels, onOpen }) {
  const allTech = project.tech || [];
  const techLimit = featured ? 8 : 4;
  const techList = allTech.slice(0, techLimit);
  const extraTech = allTech.length - techList.length;
  const mobile = Boolean(project.portraitImages) && Array.isArray(project.images);

  return (
    <article
      className={`reveal card-warm group relative overflow-hidden rounded has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring ${
        featured || mobile ? "md:col-span-2 lg:grid lg:grid-cols-12" : "flex flex-col"
      } w-[86%] flex-none snap-center md:w-auto`}
    >
      {mobile ? (
        <PhoneStrip
          tab={<RefTab code={refCode(index)} year={project.year} />}
          images={project.images}
          className="h-[360px] lg:order-2 lg:col-span-6 lg:h-auto lg:min-h-[480px]"
        />
      ) : (
        <div
          className={`relative overflow-hidden aspect-[16/10] ${
            featured ? "lg:col-span-7 lg:aspect-auto lg:min-h-[420px]" : ""
          }`}
        >
          <ProjectCover
            project={project}
            className="absolute inset-0 h-full w-full "
          />
          <RefTab code={refCode(index)} year={project.year} />
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
        {Array.isArray(project.parts) && project.parts.length > 0 && (
          <p className="mt-3 font-mono text-xs text-foreground">
            {project.parts.map((part) => part.name).join(" · ")}
          </p>
        )}
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-sm text-muted-foreground">
          {techList.map((tech) => (
            <li key={tech} className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
              {tech}
            </li>
          ))}
          {extraTech > 0 && (
            <li className="font-mono text-xs text-muted-foreground">+{extraTech}</li>
          )}
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
          <span
            aria-hidden
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground"
          >
            {labels.details}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const projects = t("projects", { returnObjects: true });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  if (!projects || typeof projects !== "object") return null;

  const projectItems = Array.isArray(projects.items) ? projects.items : [];
  const labels = {
    live: projects.liveLabel,
    visit: projects.viewSite,
    details: projects.details,
  };

  const openProject = (project) => {
    setActive(project);
    setOpen(true);
  };

  return (
    <section id="projects" className="section-pad">
      <div className="container-narrow">
        <SectionBar
          label={projects.eyebrow}
          aside={projectItems.length > 0 ? `${refCode(0)} — ${refCode(projectItems.length - 1)}` : undefined}
        />
        <h2 className="reveal mb-12 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">
          {projects.title}
        </h2>

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
              onOpen={() => openProject(project)}
            />
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          closeLabel={projects.close}
          className={`${
            active?.portraitImages ? "max-w-4xl" : "max-w-2xl"
          } max-h-[90dvh] flex flex-col gap-0 bg-card border-border p-0 overflow-hidden`}
        >
          {active && (
            <div
              className={`flex flex-col min-h-0 ${
                active.portraitImages ? "md:grid md:grid-cols-2 md:max-h-[90dvh]" : ""
              }`}
            >
              {Array.isArray(active.images) && active.images.length > 1 ? (
                <ImageCarousel
                  key={active.id}
                  images={active.images}
                  prevLabel={projects.prevImage}
                  nextLabel={projects.nextImage}
                  className={
                    active.portraitImages
                      ? "h-[46vh] flex-none md:order-2 md:h-auto"
                      : "h-[44vh] max-h-[460px] flex-none"
                  }
                />
              ) : (
                <div className="relative aspect-[16/9] max-h-[40vh] flex-none overflow-hidden">
                  <ProjectCover project={active} className="h-full w-full" />
                </div>
              )}
              <div className="p-6 overflow-y-auto min-h-0 md:order-1">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl text-foreground">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription className="text-signal font-bold text-xs">
                    {refCode(projectItems.findIndex((item) => item.id === active.id))} · {active.subtitle} · {active.year}
                  </DialogDescription>
                </DialogHeader>
                <p className="text-muted-foreground mt-4 leading-relaxed">{active.description}</p>
                {Array.isArray(active.parts) && active.parts.length > 0 && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] text-muted-foreground mb-2">
                      {projects.partsLabel}
                    </div>
                    <ul className="divide-y divide-border border-y border-border">
                      {active.parts.map((part) => (
                        <li key={part.name} className="py-3">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="font-display text-foreground">{part.name}</span>
                            <span className="font-mono text-xs text-muted-foreground">{part.stack}</span>
                          </div>
                          <p className="mt-1 text-[15px] text-muted-foreground">{part.summary}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(active.highlights) && active.highlights.length > 0 && (
                <div className="mt-5">
                  <div className="font-mono text-[11px] text-muted-foreground mb-2">
                    {projects.highlightsLabel}
                  </div>
                  <ul className="space-y-1.5 text-muted-foreground text-[15px]">
                    {(active.highlights || []).map((highlight, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 bg-accent flex-none" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                )}
                {!(Array.isArray(active.parts) && active.parts.length > 0) && (
                  <PinTable items={active.tech || []} />
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {active.demo && (
                    <Button asChild className="btn-warm rounded">
                      <a href={active.demo} target="_blank" rel="noreferrer">
                        {projects.viewSite}
                        <ArrowUpRight className="w-4 h-4" aria-hidden />
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="btn-ghost-warm rounded"
                    onClick={() => setOpen(false)}
                  >
                    <X className="w-4 h-4" aria-hidden />
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
