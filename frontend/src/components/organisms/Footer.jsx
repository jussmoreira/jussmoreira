import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";

/* Pie mínimo: solo accesos rápidos. Los datos de contacto viven en la
   sección Contacto para no repetirlos. */
export default function Footer() {
  const { t } = useTranslation();
  const footer = t("footer", { returnObjects: true });

  if (!footer || typeof footer !== "object") return null;

  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[hsl(var(--inverse))] text-[hsl(var(--inverse-foreground))]">
      <div className="container-narrow py-6 flex flex-wrap items-center justify-between gap-4">
        <button onClick={toContact} className="link-underline text-sm hover:text-white">
          {footer.reachOut}
        </button>
        <button
          onClick={top}
          className="text-sm text-[hsl(var(--inverse-muted))] hover:text-white inline-flex items-center gap-2"
        >
          {footer.backToTop} <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
