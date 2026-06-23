# Arquitectura — Visión general

## Qué es este proyecto

SPA (Single Page Application) de portafolio personal construida con **React 19**. Es **frontend-only**: no hay backend propio. La capa de "datos" es contenido estático servido vía internacionalización (i18n) y assets/constantes de configuración. El formulario de contacto opera con `mailto:` y persistencia local (`localStorage`), sin servidor.

## Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19, JSX |
| Routing | react-router-dom 7 |
| Estilos | Tailwind CSS 3 + design tokens HSL (CSS variables) |
| Primitivas UI | Radix UI / shadcn-style |
| Internacionalización | i18next + react-i18next (en/es) |
| Iconos | lucide-react |
| Build/Tooling | CRACO sobre Create React App (react-scripts 5) |
| Gestor de paquetes | Yarn 1 (classic) |

## Principios de arquitectura

1. **Atomic Design.** La UI se compone de adentro hacia afuera: `atoms → molecules → organisms → pages`. Ver [01-folder-structure](01-folder-structure.md).
2. **Separación contenido / presentación.** Ningún texto visible se escribe "hardcodeado" en JSX: vive en `locales/{en,es}.json`. Los componentes solo orquestan presentación. Ver [04-state-data-and-i18n](04-state-data-and-i18n.md).
3. **Componentes presentacionales y puros.** Sin efectos secundarios innecesarios; la lógica reutilizable se extrae a hooks (`src/hooks/`).
4. **Una sola fuente de verdad por preocupación.** Tema en `ThemeContext`; idioma en i18n; tokens de diseño en CSS variables; configuración/links en `config/`.
5. **Accesibilidad y rendimiento como requisitos, no extras.** Ver [06-accessibility](06-accessibility.md) y [08-performance](08-performance.md).
6. **La documentación precede al patrón.** Una convención nueva se documenta aquí antes de replicarse en el código.

## Diagrama de capas

```
┌─────────────────────────────────────────────────────────┐
│  index.js  → ThemeProvider → App (Router + ErrorBoundary) │
│                                   │                        │
│                                pages/Portfolio             │
│                                   │                        │
│   organisms (Navbar, Hero, About, Skills, Experience,     │
│              Projects, Education, Contact, Footer)         │
│                                   │                        │
│            molecules (card, dialog, tabs, ...)             │
│                                   │                        │
│              atoms (button, input, label, ...)             │
└─────────────────────────────────────────────────────────┘
        ▲                 ▲                    ▲
   contexts/          hooks/               locales/  config/
 (estado global)  (lógica reutilizable)  (contenido)  (assets)
```

## Reglas de dependencia entre capas

- Un **atom** no importa molecules/organisms.
- Una **molecule** puede componer atoms, nunca organisms.
- Un **organism** compone molecules/atoms y consume `hooks/`, `contexts/`, `locales/`, `config/`.
- Una **page** solo ensambla organisms.
- `hooks/`, `contexts/`, `lib/`, `config/` no importan componentes de UI.

> Regla práctica: las dependencias apuntan **hacia adentro/abajo** (de organisms a atoms), nunca al revés.
