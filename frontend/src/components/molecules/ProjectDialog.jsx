import { ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/molecules/dialog";
import { Button } from "@/components/atoms/button";
import { ImageCarousel } from "@/components/molecules/ImageCarousel";
import { ProjectCover } from "@/components/molecules/ProjectCover";
import { asList } from "@/lib/content";

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

/* Detalle de un proyecto: galería o portada, descripción, partes del sistema
   o pines del stack, y acciones. `copy` son los textos de la sección. */
export function ProjectDialog({ project, code, copy, open, onOpenChange }) {
  const parts = asList(project?.parts);
  const highlights = asList(project?.highlights);
  const images = asList(project?.images);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        closeLabel={copy.close}
        className={`${
          project?.portraitImages ? "max-w-4xl" : "max-w-2xl"
        } max-h-[90dvh] flex flex-col gap-0 bg-card border-border p-0 overflow-hidden`}
      >
        {project && (
          <div
            className={`flex flex-col min-h-0 ${
              project.portraitImages ? "md:grid md:grid-cols-2 md:max-h-[90dvh]" : ""
            }`}
          >
            {images.length > 1 ? (
              <ImageCarousel
                key={project.id}
                images={images}
                prevLabel={copy.prevImage}
                nextLabel={copy.nextImage}
                className={
                  project.portraitImages
                    ? "h-[46vh] flex-none md:order-2 md:h-auto"
                    : "h-[44vh] max-h-[460px] flex-none"
                }
              />
            ) : (
              <div className="relative aspect-[16/9] max-h-[40vh] flex-none overflow-hidden">
                <ProjectCover project={project} className="h-full w-full" />
              </div>
            )}
            <div className="p-6 overflow-y-auto min-h-0 md:order-1">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-foreground">{project.title}</DialogTitle>
                <DialogDescription className="text-signal font-bold text-xs">
                  {code} · {project.subtitle} · {project.year}
                </DialogDescription>
              </DialogHeader>
              <p className="text-muted-foreground mt-4 leading-relaxed">{project.description}</p>
              {parts.length > 0 && (
                <div className="mt-5">
                  <div className="font-mono text-[11px] text-muted-foreground mb-2">{copy.partsLabel}</div>
                  <ul className="divide-y divide-border border-y border-border">
                    {parts.map((part) => (
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
              {highlights.length > 0 && (
                <div className="mt-5">
                  <div className="font-mono text-[11px] text-muted-foreground mb-2">{copy.highlightsLabel}</div>
                  <ul className="space-y-1.5 text-muted-foreground text-[15px]">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 bg-accent flex-none" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {parts.length === 0 && <PinTable items={asList(project.tech)} />}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.demo && (
                  <Button asChild className="btn-warm rounded">
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      {copy.viewSite}
                      <ArrowUpRight className="w-4 h-4" aria-hidden />
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="btn-ghost-warm rounded" onClick={() => onOpenChange(false)}>
                  <X className="w-4 h-4" aria-hidden />
                  {copy.close}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
