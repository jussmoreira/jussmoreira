// Configuración del sitio: assets estáticos y datos de contacto.
// Nota: aquí NO va texto visible para el usuario (eso vive en src/locales/).
//
// Los datos viven en site.json, la única fuente: la leen este módulo y el
// generador del README del perfil (assets/readme/build.js), así el sitio y
// el README nunca se contradicen.
//
// Los datos de contacto y las redes se guardan codificados (base64) y se
// resuelven solo cuando la persona interactúa con el enlace. Así no quedan
// como texto plano en el bundle ni como href="mailto:"/"tel:" en el HTML,
// que es lo que recolectan los bots de spam. Se leen con `contactValue`
// (src/lib/contact.js).
import site from "./site.json";

export const siteUrl = site.url;

export const siteAssets = {
  cv: site.cv,
};

export const encodedContact = site.contact;
