import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import { useContent } from "@/hooks/useContent";

/* Pie mínimo que continúa el bloque en tinta de Contacto. Los datos de
   contacto viven en esa sección para no repetirlos. */
export default function Footer({ onOpenShortcuts }) {
  const { t } = useTranslation();
  const footer = useContent("footer");
  const profile = useContent("profile") ?? {};

  if (!footer) return null;

  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[hsl(var(--inverse))] text-[hsl(var(--inverse-muted))]">
      <div className="container-narrow">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--inverse-border))] py-6 font-mono text-xs">
        <span>
          © {new Date().getFullYear()} {profile.shortName}. {footer.made}
        </span>
        {onOpenShortcuts && (
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="hidden items-center gap-2 hover:text-[hsl(var(--inverse-foreground))] md:inline-flex"
          >
            <kbd className="rounded-sm border border-[hsl(var(--inverse-border))] px-1.5 py-0.5">?</kbd>
            {t("shortcuts.title")}
          </button>
        )}
        <button
          onClick={top}
          className="inline-flex items-center gap-2 hover:text-[hsl(var(--inverse-foreground))]"
        >
          {footer.backToTop} <ArrowUp className="h-4 w-4" aria-hidden />
        </button>
        </div>
      </div>
    </footer>
  );
}
