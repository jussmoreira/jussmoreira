import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useTheme } from "@/contexts/ThemeContext";
import { siteAssets } from "@/config/site";
import { contactHref, contactValue } from "@/lib/contact";
import { prefersReducedMotion } from "@/lib/motion";
import { asList, useContent, useList } from "@/hooks/useContent";

/* Resaltado mínimo de Python: 1 comentario, 2 texto, 3 palabra clave, 4 número, 5 llamada */
const GRAMMAR =
  /(#.*$)|("(?:[^"\\]|\\.)*")|\b(from|import|while|for|in|if|else|def|return|True|False|None)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_]\w*)(?=\()/g;
const TOKEN_CLASS = [
  "",
  "text-[hsl(var(--code-comment))]",
  "text-[hsl(var(--code-string))]",
  "text-[hsl(var(--inverse-accent))]",
  "text-[hsl(var(--inverse-accent))]",
  "font-bold",
];

function tokenize(line) {
  const tokens = [];
  const re = new RegExp(GRAMMAR.source, "g");
  let last = 0;
  let match;
  while ((match = re.exec(line)) !== null) {
    if (match[0] === "") {
      re.lastIndex += 1;
      continue;
    }
    if (match.index > last) tokens.push({ cls: "", text: line.slice(last, match.index) });
    const group = match.slice(1).findIndex((value) => value !== undefined) + 1;
    tokens.push({ cls: TOKEN_CLASS[group] || "", text: match[0] });
    last = match.index + match[0].length;
  }
  if (last < line.length) tokens.push({ cls: "", text: line.slice(last) });
  return tokens;
}

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/^(cd|open|abrir|\.\/)\s*/, "")
    .trim();

/* Comandos en español e inglés: llevan a la sección correspondiente */
const SECTIONS = {
  sobre: "about", "sobre mi": "about", about: "about",
  proyectos: "projects", projects: "projects", trabajo: "projects", work: "projects",
  experiencia: "experience", experience: "experience",
  habilidades: "skills", skills: "skills", stack: "skills",
  educacion: "education", education: "education",
  contacto: "contact", contact: "contact",
  inicio: "home", home: "home",
};

/* Redes: se abren en otra pestaña (la URL se resuelve al momento, no antes) */
const SOCIALS = { github: "GitHub", linkedin: "LinkedIn", orcid: "ORCID", credly: "Credly" };

const commonPrefix = (words) =>
  words.reduce((prefix, word) => {
    let i = 0;
    while (i < prefix.length && prefix[i] === word[i]) i += 1;
    return prefix.slice(0, i);
  });

/* Panel de código del hero: justin.py se escribe solo la primera vez, deja una
   línea de salida y abajo hay una terminal que acepta comandos para moverse
   por el sitio. El código completo está siempre en el DOM para lectores de
   pantalla; lo tecleado solo cambia qué parte se ve. */
export function CodePanel({ className = "" }) {
  const { t, i18n } = useTranslation();
  const { toggleTheme } = useTheme();
  const code = useContent("hero.code");
  const terminal = code?.terminal || {};
  const navItems = useList("nav.items");

  const { ref, inView } = useInViewOnce({ threshold: 0.3 });
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? Infinity : 0));
  const [log, setLog] = useState([]);
  const [command, setCommand] = useState("");
  const logRef = useRef(null);
  const historyRef = useRef([]);
  const historyPos = useRef(0);
  const nextLogId = useRef(0);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const lines = asList(code?.py);
  /* El resaltado se calcula una vez por texto, no en cada paso de la escritura:
     la dependencia es el texto completo, no el arreglo (que cambia de identidad). */
  const source = lines.join("\n");
  const tokenized = useMemo(() => (source ? source.split("\n").map(tokenize) : []), [source]);
  const total = lines.reduce((sum, line) => sum + line.length + 1, 0);
  const shownChars = Math.min(typed, total);
  const done = shownChars >= total;

  useEffect(() => {
    if (!inView || done) return undefined;
    if (prefersReducedMotion()) {
      setTyped(Infinity);
      return undefined;
    }
    const id = setInterval(() => {
      setTyped((current) => {
        const next = Math.min(current + 3, total);
        if (next >= total) clearInterval(id);
        return next;
      });
    }, 30);
    return () => clearInterval(id);
  }, [inView, total, done]);

  /* Cada entrada lleva un id propio: el log se recorta a 3 y los índices se desplazan */
  const push = (...entries) =>
    setLog((current) =>
      [...current, ...entries.map((entry) => ({ ...entry, id: nextLogId.current++ }))].slice(-3),
    );

  const names = asList(terminal.names);

  /* Tab completa el comando (o su prefijo común); si no hay coincidencia, el
     foco sigue su camino normal para no atrapar a quien navega con teclado. */
  const onKeyDown = (event) => {
    const history = historyRef.current;
    if (event.key === "Tab" && !event.shiftKey) {
      const prefix = command.trim().toLowerCase();
      const matches = prefix ? names.filter((name) => name.startsWith(prefix)) : [];
      if (matches.length === 0) return;
      event.preventDefault();
      setCommand(commonPrefix(matches));
    } else if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      historyPos.current = Math.max(0, historyPos.current - 1);
      setCommand(history[historyPos.current]);
    } else if (event.key === "ArrowDown" && history.length > 0) {
      event.preventDefault();
      historyPos.current = Math.min(history.length, historyPos.current + 1);
      setCommand(history[historyPos.current] ?? "");
    }
  };

  const run = (event) => {
    event.preventDefault();
    const raw = command.trim();
    setCommand("");
    if (!raw) return;
    historyRef.current.push(raw);
    historyPos.current = historyRef.current.length;
    const cmd = normalize(raw);

    if (["limpiar", "clear", "cls"].includes(cmd)) {
      setLog([]);
      return;
    }
    const entry = { kind: "cmd", text: raw };
    if (["ayuda", "help", "?", "comandos", "commands"].includes(cmd)) {
      push(entry, { kind: "out", text: terminal.help });
      return;
    }
    if (["tema", "theme", "modo", "mode"].includes(cmd)) {
      toggleTheme();
      push(entry, { kind: "out", text: terminal.theme });
      return;
    }
    if (cmd === "cv") {
      const link = document.createElement("a");
      link.href = i18n.resolvedLanguage?.startsWith("es") ? siteAssets.cv.es : siteAssets.cv.en;
      link.download = "";
      link.click();
      push(entry, { kind: "out", text: terminal.downloading });
      return;
    }
    if (SOCIALS[cmd]) {
      window.open(contactHref(cmd), "_blank", "noopener,noreferrer");
      push(entry, { kind: "out", text: t("hero.code.terminal.opening", { section: SOCIALS[cmd] }) });
      return;
    }
    if (["correo", "email", "mail"].includes(cmd)) {
      (navigator.clipboard?.writeText
        ? navigator.clipboard.writeText(contactValue("email"))
        : Promise.reject(new Error("clipboard unavailable"))
      )
        .then(() => push(entry, { kind: "out", text: terminal.copied }))
        .catch(() => push(entry, { kind: "err", text: terminal.copyFail }));
      return;
    }
    const id = SECTIONS[cmd];
    if (id) {
      const label = navItems.find((item) => item.id === id)?.label || id;
      push(entry, { kind: "out", text: t("hero.code.terminal.opening", { section: label.toLowerCase() }) });
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
      return;
    }
    push(entry, { kind: "err", text: t("hero.code.terminal.notFound", { cmd: raw }) });
  };

  if (!code) return null;

  let remaining = shownChars;

  return (
    <figure
      ref={ref}
      className={`print:hidden flex flex-col overflow-hidden rounded bg-[hsl(var(--inverse))] text-[hsl(var(--inverse-foreground))] dark:border dark:border-[hsl(var(--inverse-border))] ${className}`}
    >
      <figcaption className="sr-only">{code.title}</figcaption>

      {/* Cabecera del archivo */}
      <div className="flex items-stretch justify-between border-b border-[hsl(var(--inverse-border))] font-mono text-[11px]">
        <span className="border-r border-[hsl(var(--inverse-border))] bg-[hsl(var(--inverse-foreground)/0.06)] px-4 py-2.5 shadow-[inset_0_-2px_0_hsl(var(--inverse-accent))]">
          justin.py
        </span>
        <span className="hidden items-center px-4 text-[hsl(var(--inverse-muted))] sm:flex">Python 3</span>
      </div>

      {/* Código */}
      <div className="relative flex-1 px-4 py-4">
        <pre className="sr-only">{lines.join("\n")}</pre>
        <div aria-hidden className="font-mono text-[12px] leading-[22px]">
          {lines.map((line, index) => {
            const lineStart = remaining;
            remaining -= line.length + 1;
            let budget = Math.max(0, Math.min(lineStart, line.length));
            const typing = !done && lineStart >= 0 && lineStart <= line.length;
            return (
              <div key={index} className="flex whitespace-pre-wrap">
                <span className="mr-4 w-5 flex-none select-none text-right text-[hsl(var(--inverse-muted)/0.6)]">
                  {index + 1}
                </span>
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  {tokenized[index].map((token, tokenIndex) => {
                    const visible = token.text.slice(0, budget);
                    budget = Math.max(0, budget - token.text.length);
                    return (
                      <span key={tokenIndex} className={token.cls}>
                        {visible}
                        <span className="opacity-0">{token.text.slice(visible.length)}</span>
                      </span>
                    );
                  })}
                  {typing && <span className="serial-caret" />}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Salida + terminal */}
      <div className="border-t border-[hsl(var(--inverse-border))] px-4 py-3 font-mono text-[12px] leading-[20px]">
        <div ref={logRef} aria-live="polite" className="h-[60px] overflow-y-auto">
          {done && (
            <div className="text-[hsl(var(--inverse-muted))]">
              <span className="text-[hsl(var(--inverse-accent))]">{"<"}</span> {code.output}
            </div>
          )}
          {log.map((entry) => (
            <div
              key={entry.id}
              className={
                entry.kind === "cmd"
                  ? "text-[hsl(var(--inverse-foreground))]"
                  : entry.kind === "err"
                    ? "text-[hsl(var(--code-string))]"
                    : "text-[hsl(var(--inverse-muted))]"
              }
            >
              {entry.kind === "cmd" ? "> " : "  "}
              {entry.text}
            </div>
          ))}
        </div>
        <form
          onSubmit={run}
          className="-mx-1.5 mt-1 flex items-center gap-2 rounded-sm px-1.5 focus-within:ring-1 focus-within:ring-[hsl(var(--inverse-accent))]"
        >
          <span aria-hidden className="text-[hsl(var(--inverse-accent))]">&gt;</span>
          <input
            id="terminal-input"
            value={command}
            onKeyDown={onKeyDown}
            onChange={(event) => setCommand(event.target.value)}
            aria-label={terminal.label}
            placeholder={terminal.placeholder}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full bg-transparent text-[hsl(var(--inverse-foreground))] caret-[hsl(var(--inverse-accent))] placeholder:text-[hsl(var(--inverse-muted)/0.8)] focus:outline-none"
          />
        </form>
      </div>
    </figure>
  );
}
