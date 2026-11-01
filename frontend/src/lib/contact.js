import { encodedContact } from "@/config/site";

/* Resuelve un dato de contacto codificado. Se llama bajo demanda (efecto o
   interacción), nunca en el módulo, para que no aparezca en el HTML inicial. */
export function contactValue(key) {
  const encoded = encodedContact[key];
  if (!encoded) return "";
  try {
    return window.atob(encoded);
  } catch {
    return "";
  }
}

/* URL final de cada canal. */
export function contactHref(key) {
  const value = contactValue(key);
  if (!value) return "";
  if (key === "email") return `mailto:${value}`;
  return value;
}

