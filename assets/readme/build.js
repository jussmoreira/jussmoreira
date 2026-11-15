/* Genera el README del perfil y sus imágenes a partir del portafolio.
 *
 *   cd frontend && yarn readme
 *
 * Una sola fuente, sin copiar datos a mano:
 *   frontend/src/locales/en.json   nombre, título, ubicación, enfoque, áreas
 *   frontend/src/config/site.json  URL del sitio, CVs y contacto (codificado)
 *   frontend/src/index.css         colores (tokens HSL)
 *
 * Salida:
 *   README.md                             el README del perfil
 *   assets/readme/hero-{light,dark}.svg   banner animado: justin.py + robot
 *   assets/readme/pill-*-{light,dark}.svg botones
 *
 * El correo nunca se escribe en el README: su botón lleva a la sección de
 * contacto del sitio, donde se arma en el cliente y no lo leen los bots.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const FRONT = path.join(ROOT, "frontend");
const OUT = __dirname;
const REPO_RAW = "https://raw.githubusercontent.com/jussmoreira/jussmoreira/main/assets/readme";
const GITHUB_USER = "jussmoreira";

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(FRONT, rel), "utf8"));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const decode = (b64) => Buffer.from(b64, "base64").toString("utf8");

/* ---------- Datos del portafolio ---------- */
const en = readJson("src/locales/en.json");
const site = readJson("src/config/site.json");
const profile = en.profile;
const facts = Object.fromEntries((en.hero.titleBlock || []).map(({ label, value }) => [label, value]));
const focus = String(facts.Focus || "").split("·").map((s) => s.trim()).filter(Boolean);
const location = facts["Based in"] || profile.location;

/* Áreas en las que he trabajado: todo lo que el portafolio lista en
   Habilidades y en el stack de cada proyecto, traducido a íconos de
   skillicons.dev. Lo que no tiene ícono (Odoo, UiPath, Jekyll...) se omite. */
const ICONS = {
  Java: "java", PHP: "php", "C#": "cs", Python: "python", "C++": "cpp", C: "c",
  JavaScript: "js", TypeScript: "ts", Kotlin: "kotlin",
  "Spring Boot": "spring", Laravel: "laravel", "ASP.NET Core": "dotnet", ".NET": "dotnet", ".NET 8": "dotnet",
  React: "react", "React Native": "react", FastAPI: "fastapi", HTML5: "html", HTML: "html", CSS: "css",
  "Jetpack Compose": "androidstudio",
  MySQL: "mysql", PostgreSQL: "postgres", Redis: "redis", "Kafka (Redpanda)": "kafka",
  Git: "git", GitHub: "github", "GitHub Actions": "githubactions", Docker: "docker",
  Arduino: "arduino",
};
const named = [
  ...(en.skills.groups || []).flatMap((group) => group.items),
  ...(en.projects.items || []).flatMap((project) => project.tech || []),
];
const icons = [...new Set(named.map((name) => ICONS[name]).filter(Boolean))];

/* ---------- Colores del portafolio (tokens HSL de index.css) ---------- */
const css = fs.readFileSync(path.join(FRONT, "src/index.css"), "utf8");
const block = (selector) => {
  const start = css.indexOf(`${selector} {`);
  return css.slice(start, css.indexOf("}", start));
};
function hsl(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return "#" + [f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
}
const tokens = (text) =>
  Object.fromEntries(
    [...text.matchAll(/--([\w-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g)].map((m) => [m[1], hsl(+m[2], +m[3], +m[4])]),
  );
const lightTokens = tokens(block(":root"));
const THEMES = {
  light: lightTokens,
  dark: { ...lightTokens, ...tokens(block(".dark")) },
};
const palette = (t) => ({
  bg: t.background,
  fg: t.foreground,
  muted: t["muted-foreground"],
  accent: t.accent,
  onAccent: t.background,
  panel: t.inverse,
  panelFg: t["inverse-foreground"],
  panelMuted: t["inverse-muted"],
  panelBorder: t["inverse-border"],
  panelAccent: t["inverse-accent"],
  string: t["code-string"],
});

/* ---------- Fuentes del sitio, incrustadas (un SVG en <img> no carga fuentes externas) ---------- */
const font = (rel) => fs.readFileSync(path.join(FRONT, "node_modules", rel)).toString("base64");
const FONTS = `
@font-face{font-family:JBM;font-weight:400;src:url(data:font/woff2;base64,${font("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2")}) format("woff2")}
@font-face{font-family:JBM;font-weight:700;src:url(data:font/woff2;base64,${font("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2")}) format("woff2")}
@font-face{font-family:Bric;font-weight:200 800;font-stretch:75% 100%;src:url(data:font/woff2;base64,${font("@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2")}) format("woff2")}`;

/* ---------- justin.py: el código que teclea el robot ---------- */
const NAME = profile.shortName.toUpperCase();
const CODE = [
  [["kw", "from"], ["", " workshop "], ["kw", "import"], ["", " Robot"]],
  [],
  [["", "justin = "], ["fn", "Robot"], ["", "(based_in="], ["str", `"${location}"`], ["", ")"]],
  [["", "justin.focus = ["], ...focus.flatMap((f, i) => [["str", `"${f}"`], ["", i < focus.length - 1 ? ", " : ""]]), ["", "]"]],
  [],
  [["", "justin."], ["fn", "build"], ["", "("], ["str", `"${NAME}"`], ["", ")"]],
];

/* ---------- Banner animado ---------- */
const W = 1280;
const H = 580;
const PAD = 64;
const CYCLE = 16; // s: la animación completa se repite
const CPS = 26; // caracteres por segundo al teclear
const FS = 15; // tamaño del código
const CW = FS * 0.6; // ancho de carácter de JetBrains Mono
const LH = 26;
const HOLD_END = 94; // % del ciclo en que todo se reinicia

function hero(c) {
  const panel = { x: PAD, y: 104, w: 760, h: 270 };
  const textX = panel.x + 56;
  const firstY = panel.y + 66;
  const deskY = panel.y + panel.h;
  const outY = panel.y + panel.h - 18;
  const nameY = deskY + 136;
  const pct = (s) => ((s / CYCLE) * 100).toFixed(2);

  // Cuándo empieza y termina de teclearse cada línea
  let clock = 0.8;
  const lines = CODE.map((parts) => {
    const text = parts.map(([, s]) => s).join("");
    const start = clock;
    const end = start + text.length / CPS;
    clock = end + (text.length ? 0.25 : 0.1);
    return { parts, text, start, end };
  });
  const builtAt = clock + 0.3;

  const color = { kw: c.panelAccent, fn: c.panelFg, str: c.string, "": c.panelFg };
  let keyframes =
    `@keyframes show{0%,${pct(builtAt)}%{opacity:0}${pct(builtAt + 0.3)}%,${HOLD_END}%{opacity:1}100%{opacity:0}}` +
    `@keyframes rise{0%,${pct(builtAt)}%{opacity:0;transform:translateY(18px)}${pct(builtAt + 0.6)}%,${HOLD_END}%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(0)}}`;

  // Cada línea queda tapada por un rectángulo del color del panel que se corre
  // a saltos de un carácter: así parece que se escribe.
  const codeLines = lines
    .map((line, i) => {
      const y = firstY + i * LH;
      const number = `<text x="${panel.x + 22}" y="${y}" class="mono" fill="${c.panelMuted}" fill-opacity="0.6" text-anchor="end" font-size="13">${i + 1}</text>`;
      if (!line.text) return number;
      const spans = line.parts
        .map(([kind, s]) => `<tspan fill="${color[kind]}"${kind === "fn" ? ' font-weight="700"' : ""}>${esc(s)}</tspan>`)
        .join("");
      const width = Math.ceil(line.text.length * CW) + 2;
      keyframes += `@keyframes l${i}{0%,${pct(line.start)}%{transform:translateX(0);animation-timing-function:steps(${line.text.length},end)}${pct(line.end)}%,${HOLD_END}%{transform:translateX(${width}px)}100%{transform:translateX(0)}}`;
      return `${number}<text x="${textX}" y="${y}" class="mono" font-size="${FS}" xml:space="preserve">${spans}</text>
<rect class="cover" x="${textX - 1}" y="${y - 18}" width="${width}" height="24" fill="${c.panel}" style="animation-name:l${i}"/>`;
    })
    .join("\n");

  // Robot tecleando en su mesa, a la derecha del panel
  const rx = panel.x + panel.w + 70;
  const robot = `
<g transform="translate(${rx} ${deskY - 244})" stroke="${c.fg}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
  <line x1="150" y1="22" x2="150" y2="46"/>
  <circle class="led" cx="150" cy="16" r="7" fill="${c.accent}" stroke="none"/>
  <rect x="94" y="46" width="112" height="78" rx="10" fill="${c.bg}"/>
  <rect x="106" y="58" width="88" height="54" rx="4" fill="${c.panel}" stroke="none"/>
  <g class="eyes" fill="${c.panelAccent}" stroke="none">
    <rect x="124" y="74" width="12" height="16" rx="2"/>
    <rect x="164" y="74" width="12" height="16" rx="2"/>
  </g>
  <rect x="138" y="98" width="24" height="4" rx="2" fill="${c.panelAccent}" stroke="none"/>
  <line x1="94" y1="85" x2="84" y2="85"/><line x1="206" y1="85" x2="216" y2="85"/>
  <rect x="138" y="124" width="24" height="12" fill="${c.bg}"/>
  <rect x="78" y="136" width="144" height="110" rx="10" fill="${c.bg}"/>
  <g stroke="none">
    <rect x="98" y="156" width="14" height="14" fill="${c.accent}"/>
    <rect class="blink2" x="118" y="156" width="14" height="14" fill="${c.accent}"/>
    <rect x="138" y="156" width="14" height="14" fill="${c.muted}" fill-opacity="0.35"/>
  </g>
  <line x1="98" y1="186" x2="202" y2="186" stroke-width="1.5" stroke-opacity="0.5"/>
  <line x1="98" y1="198" x2="170" y2="198" stroke-width="1.5" stroke-opacity="0.5"/>
  <g class="arm armL"><path d="M82 160 Q48 190 66 226" fill="none"/><rect x="54" y="222" width="24" height="12" rx="4" fill="${c.bg}"/></g>
  <g class="arm armR"><path d="M218 160 Q252 190 234 226" fill="none"/><rect x="222" y="222" width="24" height="12" rx="4" fill="${c.bg}"/></g>
</g>
<g stroke="${c.fg}" stroke-width="2.5" stroke-linecap="round">
  <rect x="${rx + 36}" y="${deskY - 22}" width="228" height="16" rx="3" fill="${c.bg}"/>
  <g stroke="none" fill="${c.fg}" fill-opacity="0.55">
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${rx + 50 + i * 23}" y="${deskY - 18}" width="16" height="4" rx="1"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<rect x="${rx + 62 + i * 27}" y="${deskY - 12}" width="20" height="4" rx="1"/>`).join("")}
  </g>
  <line x1="${rx - 20}" y1="${deskY - 6}" x2="${W - PAD}" y2="${deskY - 6}"/>
</g>
<text x="${rx + 150}" y="${deskY + 22}" class="mono" font-size="12" fill="${c.muted}" text-anchor="middle">robot.ino</text>`;

  const ticks = Array.from(
    { length: Math.floor(W / 16) + 1 },
    (_, i) => `<line x1="${i * 16 + 0.5}" y1="0" x2="${i * 16 + 0.5}" y2="${i % 5 === 0 ? 10 : 5}"/>`,
  ).join("");
  const output = en.hero.code.output;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(`${profile.shortName}, ${profile.title} in ${location}. Focus: ${focus.join(", ")}.`)}">
<title>${esc(profile.shortName)}</title>
<style>${FONTS}
.mono{font-family:JBM,ui-monospace,Menlo,Consolas,monospace}
.cover{animation:${CYCLE}s linear infinite both}
.output,.sub{animation:show ${CYCLE}s linear infinite both}
.name{font-family:Bric,system-ui,sans-serif;font-weight:750;font-stretch:78%;letter-spacing:-0.018em;animation:rise ${CYCLE}s cubic-bezier(.2,.7,.2,1) infinite both}
.caret{animation:blink 1s steps(1) infinite}
.led{animation:blink 1.4s steps(1) infinite}
.blink2{animation:blink 0.9s steps(1) infinite}
.eyes{transform-box:fill-box;transform-origin:center;animation:look 4s ease-in-out infinite}
.arm{transform-box:fill-box;transform-origin:50% 0}
.armL{animation:tap 0.28s ease-in-out infinite alternate}
.armR{animation:tap 0.28s ease-in-out 0.14s infinite alternate}
@keyframes blink{50%{opacity:0}}
@keyframes tap{from{transform:translateY(0)}to{transform:translateY(5px)}}
@keyframes look{0%,46%,54%,100%{transform:scaleY(1)}50%{transform:scaleY(0.1)}}
${keyframes}
@media (prefers-reduced-motion: reduce){*{animation:none!important}.cover{display:none}}
</style>
<rect width="${W}" height="${H}" fill="${c.bg}"/>
<g stroke="${c.muted}" stroke-opacity="0.6">${ticks}</g>
<rect width="${Math.round(W * 0.34)}" height="2" fill="${c.accent}"/>

<text x="${PAD}" y="62" class="mono" font-size="15"><tspan fill="${c.accent}">REF-00</tspan><tspan fill="${c.fg}" dx="14">${GITHUB_USER}</tspan></text>
<text x="${W - PAD}" y="62" class="mono" font-size="15" fill="${c.fg}" text-anchor="end">${esc(profile.availability)}</text>
<rect x="${W - PAD - profile.availability.length * 9 - 22}" y="51" width="11" height="11" fill="${c.accent}"/>
<line x1="${PAD}" y1="80" x2="${W - PAD}" y2="80" stroke="${c.fg}"/>

<rect x="${panel.x}" y="${panel.y}" width="${panel.w}" height="${panel.h}" rx="4" fill="${c.panel}" stroke="${c.panelBorder}"/>
<line x1="${panel.x}" y1="${panel.y + 36}" x2="${panel.x + panel.w}" y2="${panel.y + 36}" stroke="${c.panelBorder}"/>
<rect x="${panel.x}" y="${panel.y + 33}" width="92" height="3" fill="${c.panelAccent}"/>
<text x="${panel.x + 16}" y="${panel.y + 23}" class="mono" font-size="12" fill="${c.panelFg}">justin.py</text>
<text x="${panel.x + panel.w - 16}" y="${panel.y + 23}" class="mono" font-size="12" fill="${c.panelMuted}" text-anchor="end">Python 3</text>
<clipPath id="code"><rect x="${panel.x + 1}" y="${panel.y + 37}" width="${panel.w - 2}" height="${panel.h - 38}"/></clipPath>
<g clip-path="url(#code)">
${codeLines}
</g>
<line x1="${panel.x}" y1="${panel.y + panel.h - 42}" x2="${panel.x + panel.w}" y2="${panel.y + panel.h - 42}" stroke="${c.panelBorder}"/>
<text x="${textX}" y="${outY}" class="mono output" font-size="13" fill="${c.panelMuted}"><tspan fill="${c.panelAccent}">&lt;</tspan> ${esc(output)}</text>
<rect class="caret" x="${textX + (output.length + 3) * 7.8}" y="${outY - 12}" width="8" height="15" fill="${c.panelAccent}"/>
${robot}

<text x="${PAD - 4}" y="${nameY}" class="name" font-size="132" fill="${c.fg}">${esc(NAME)}<tspan fill="${c.accent}">.</tspan></text>
<text x="${PAD}" y="${nameY + 34}" class="mono sub" font-size="15" fill="${c.muted}">${esc(profile.title)}  ·  ${esc(location)}</text>
</svg>`;
}

/* ---------- Botones ---------- */
const BUTTONS = [
  { key: "portfolio", label: "Portfolio ↗", alt: "Portfolio", href: `${site.url}/`, primary: true },
  { key: "cv-en", label: "CV · EN", alt: "CV in English", href: site.url + site.cv.en },
  { key: "cv-es", label: "CV · ES", alt: "CV en español", href: site.url + site.cv.es },
  { key: "email", label: "Email", alt: "Email (contact section)", href: `${site.url}/#contact` },
  { key: "linkedin", label: "LinkedIn", alt: "LinkedIn", href: decode(site.contact.linkedin) },
];
function pill({ label, primary }, c) {
  const w = Math.round(label.length * 7.8 + 36);
  const h = 36;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}"><rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="2" fill="${primary ? c.accent : c.bg}" stroke="${primary ? c.accent : c.fg}"/><text x="${w / 2}" y="23" text-anchor="middle" font-family="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="13" font-weight="700" fill="${primary ? c.onAccent : c.fg}">${esc(label)}</text></svg>`;
}

/* ---------- README ---------- */
function readme(asset) {
  const picture = (name, alt, attrs = "") =>
    `<picture><source media="(prefers-color-scheme: dark)" srcset="${asset(name, "dark")}"><img src="${asset(name, "light")}" alt="${esc(alt)}"${attrs}></picture>`;
  const hex = (value) => value.slice(1);
  const streak = (t) => {
    const c = palette(t);
    const q = new URLSearchParams({
      user: GITHUB_USER, hide_border: "true", border_radius: "2",
      background: hex(c.bg), stroke: hex(c.muted), ring: hex(c.accent), fire: hex(c.accent),
      currStreakNum: hex(c.fg), sideNums: hex(c.fg), currStreakLabel: hex(c.accent), sideLabels: hex(c.muted), dates: hex(c.muted),
    });
    return `https://streak-stats.demolab.com/?${q}`;
  };
  // Filas parejas (máximo 13 íconos por fila) para que ninguna quede casi vacía
  const rows = Math.ceil(icons.length / 13);
  const perLine = Math.ceil(icons.length / rows);
  const skills = (theme) => `https://skillicons.dev/icons?i=${icons.join(",")}&theme=${theme}&perline=${perLine}`;
  const accent = hex(palette(THEMES.light).accent);

  return `<!-- Generado por assets/readme/build.js a partir del portafolio. No editar a mano: cd frontend && yarn readme -->
<p align="center">
  <a href="${site.url}/">${picture("hero", `${profile.shortName}, ${profile.title} in ${location}. Focus: ${focus.join(", ")}.`, ' width="100%"')}</a>
</p>

<p align="center">
${BUTTONS.map((b) => `  <a href="${b.href}">${picture(`pill-${b.key}`, b.alt)}</a>`).join("\n")}
</p>

<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset="${skills("dark")}"><img src="${skills("light")}" alt="Technologies across my projects"></picture>
</p>

<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset="${streak(THEMES.dark)}"><img src="${streak(THEMES.light)}" alt="GitHub contribution streak" width="560"></picture>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=${GITHUB_USER}&label=profile%20views&color=${accent}&style=flat-square" alt="Profile views">
</p>
`;
}

/* ---------- Escritura ---------- */
for (const [mode, t] of Object.entries(THEMES)) {
  const c = palette(t);
  fs.writeFileSync(path.join(OUT, `hero-${mode}.svg`), hero(c));
  for (const button of BUTTONS) fs.writeFileSync(path.join(OUT, `pill-${button.key}-${mode}.svg`), pill(button, c));
}
fs.writeFileSync(path.join(ROOT, "README.md"), readme((name, mode) => `${REPO_RAW}/${name}-${mode}.svg`));

// Vista previa local opcional: node build.js --preview <archivo.html> <url-base>
const previewAt = process.argv.indexOf("--preview");
if (previewAt !== -1) {
  const [file, base] = process.argv.slice(previewAt + 1);
  fs.writeFileSync(file, readme((name, mode) => `${base}/${name}-${mode}.svg`));
}
console.log(`README.md + hero + ${BUTTONS.length} botones × 2 temas · ${icons.length} íconos`);
