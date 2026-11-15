import { Fragment } from "react";
import { SafeImage } from "@/components/atoms/image";
import { asList } from "@/lib/content";

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
        <Fragment key={layer.name}>
          {index > 0 && <Link label={layer.link} />}
          <span className="w-44 border border-[hsl(var(--inverse-foreground)/0.22)] bg-[hsl(var(--inverse))] px-2 py-1 text-center sm:w-56 sm:py-1.5">
            <span className="block font-mono text-xs sm:text-sm">{layer.name}</span>
            <span className="block font-mono text-[10px] text-[hsl(var(--inverse-muted))]">{layer.detail}</span>
          </span>
        </Fragment>
      ))}
      <span className="absolute bottom-0 right-0 border-l border-t border-[hsl(var(--inverse-foreground)/0.22)] px-2 py-1 font-mono text-[10px] uppercase text-[hsl(var(--inverse-muted))]">
        {title}
      </span>
    </div>
  );
}

/* Portada de un proyecto: primera captura, imagen de portada o el diagrama
   de su arquitectura, en ese orden. */
export function ProjectCover({ project, className }) {
  const firstImage = asList(project.images)[0];
  const src = (!project.portraitImages && firstImage?.src) || project.cover;

  if (src) {
    return (
      <SafeImage
        src={src}
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
export function PhoneStrip({ images, tab, className = "" }) {
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

/* Pestaña de ficha técnica: abajo a la izquierda de la imagen, donde no tapa
   las barras de navegación de las capturas. */
export function RefTab({ code, year }) {
  return (
    <span className="pointer-events-none absolute bottom-0 left-0 z-10 bg-[hsl(var(--inverse))] px-3 py-1.5 font-mono text-[11px] text-[hsl(var(--inverse-foreground))]">
      {code}
      <span className="ml-2 text-[hsl(var(--inverse-muted))]">{year}</span>
    </span>
  );
}
