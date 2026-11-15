import en from "@/locales/en.json";
import es from "@/locales/es.json";

// Aplana las claves del objeto (sin descender en arrays) para comparar estructura.
function keyPaths(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object" && !Array.isArray(value)
      ? keyPaths(value, path)
      : [path];
  });
}

describe("paridad de locales en/es", () => {
  it("comparten exactamente las mismas claves", () => {
    const enKeys = keyPaths(en).sort();
    const esKeys = keyPaths(es).sort();
    expect(esKeys).toEqual(enKeys);
  });
});

describe("contenido que la interfaz oculta si falta", () => {
  it.each(["en", "es"])("%s: la placa de estado de Contacto tiene sus 3 filas", (lang) => {
    const { contact } = require(`./${lang}.json`);
    expect(contact.status.title).toBeTruthy();
    expect(contact.status.items).toHaveLength(3);
    contact.status.items.forEach((row) => {
      expect(row.label).toBeTruthy();
      expect(row.value).toBeTruthy();
    });
  });
});
