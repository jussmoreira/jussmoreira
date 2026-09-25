import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección que ocupa la franja central de la pantalla,
 * para marcar el enlace activo de la navegación.
 *
 * @param {string[]} ids Ids de las secciones a observar, en orden.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join(",");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveId(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
