// Configuración del sitio: assets estáticos y datos de contacto.
// Nota: aquí NO va texto visible para el usuario (eso vive en src/locales/).
//
// Los datos de contacto y las redes se guardan codificados (base64) y se
// resuelven solo cuando la persona interactúa con el enlace. Así no quedan
// como texto plano en el bundle ni como href="mailto:"/"tel:" en el HTML,
// que es lo que recolectan los bots de spam. Se leen con `contactValue`
// (src/lib/contact.js).

export const siteAssets = {
  photo: "/justin-moreira.jpg",
  cv: {
    en: "/JustinMoreiraENG.pdf",
    es: "/JustinMoreira.pdf",
  },
};

export const encodedContact = {
  email: "anVzMTExbW9yZWlyYW1hdGFycml0YUBnbWFpbC5jb20=",
  linkedin: "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2p1c3Rpbi1tb3JlaXJhLW1hdGFycml0YQ==",
  github: "aHR0cHM6Ly9naXRodWIuY29tL2p1c3Ntb3JlaXJh",
  orcid: "aHR0cHM6Ly9vcmNpZC5vcmcvMDAwOS0wMDA0LTkyNDgtMTIyMw==",
  credly: "aHR0cHM6Ly93d3cuY3JlZGx5LmNvbS91c2Vycy9qdXN0aW4tbW9yZWlyYS1tYXRhcnJpdGEvYmFkZ2Vz",
};
