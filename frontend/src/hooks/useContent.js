import { useTranslation } from "react-i18next";
import { asList } from "@/lib/content";

export { asList };

/**
 * Contenido estructurado de los locales (objetos y listas), con la guarda
 * que antes se repetía en cada sección: si la clave falta, i18next devuelve
 * la clave como texto y aquí se convierte en `null` (o en lista vacía).
 */
export function useContent(key) {
  const { t } = useTranslation();
  const value = t(key, { returnObjects: true });
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}

/** Igual que useContent, para claves que son listas. Nunca devuelve null. */
export function useList(key) {
  const { t } = useTranslation();
  return asList(t(key, { returnObjects: true }));
}

