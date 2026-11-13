import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

/* Ayuda de atajos: panel plano en tinta, abajo a la derecha. No es modal
   (no bloquea la página); se cierra con Esc, con "?" o con el botón. */
export function ShortcutsHelp({ open, onClose }) {
  const { t } = useTranslation();
  const copy = t("shortcuts", { returnObjects: true });

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !copy || typeof copy !== "object") return null;

  return (
    <aside
      role="region"
      aria-label={copy.title}
      className="fixed bottom-4 right-4 z-[70] w-[min(20rem,calc(100vw-2rem))] rounded border border-[hsl(var(--inverse-border))] bg-[hsl(var(--inverse))] p-4 font-mono text-xs text-[hsl(var(--inverse-foreground))]"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[hsl(var(--inverse-muted))]">{copy.title}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="-m-1 p-1 text-[hsl(var(--inverse-muted))] hover:text-[hsl(var(--inverse-foreground))]"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <dl className="space-y-2">
        {(copy.items || []).map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <dt className="order-2 text-[hsl(var(--inverse-muted))]">{label}</dt>
            <dd className="order-1 min-w-[3.25rem]">
              <kbd className="rounded-sm border border-[hsl(var(--inverse-border))] px-1.5 py-0.5 text-[hsl(var(--inverse-accent))]">
                {key}
              </kbd>
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
