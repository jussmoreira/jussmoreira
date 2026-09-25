# 02 · Convenciones de nombres

## Archivos

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componente (atom/molecule) | `lowercase` shadcn-style o `PascalCase` | `button.jsx`, `card.jsx` |
| Componente (organism/page) | `PascalCase` | `Navbar.jsx`, `Portfolio.jsx` |
| Hook | `camelCase`, prefijo `use`, **un hook por archivo** | `useCountUp.js`, `useInViewOnce.js` |
| Contexto | `PascalCase` + sufijo `Context` | `ThemeContext.jsx` |
| Utilidad / config | `camelCase` | `utils.js`, `site.js` |
| Locale | código ISO | `en.json`, `es.json` |
| Test | `*.test.js` junto al código o en `__tests__/` | `utils.test.js` |

> **Regla clave:** el nombre del archivo debe reflejar su export principal. Un archivo `useCountUp.js` no debe exportar también `useInViewOnce`: cada hook va en su propio archivo, descubrible por su nombre.

## Símbolos en código

- **Componentes:** `PascalCase` (`function Hero()`).
- **Hooks:** `camelCase` con `use` (`useReveal`).
- **Variables y funciones:** `camelCase`.
- **Constantes de módulo:** `UPPER_SNAKE_CASE` (`CONTACT_STORAGE_KEY`, `STORAGE_KEY`).
- **Booleanos:** prefijo `is/has/should` (`isDark`, `hasError`).
- **Handlers:** prefijo `on`/`handle` (`onSubmit`, `handleRetry`).

## Claves de i18n

- Estructura jerárquica por sección: `nav.*`, `hero.*`, `about.*`, `contact.*`, …
- Sub-grupos para textos relacionados: `contact.labels.*`, `contact.validation.*`, `contact.mailto.*`.
- Las claves son **iguales en todos los locales** (paridad estricta en/es). Un test automatizado valida la paridad — ver [09-testing](09-testing.md).
- Nada de texto visible fuera de los locales, incluido el contenido generado (asunto/cuerpo de un `mailto:`).

## Claves de `localStorage`

- Prefijo de proyecto + nombre + versión: `jm_<dominio>_v<n>`.
  - `jm_theme_v1`, `jm_language_v1`, `jm_contact_messages_v1`.
- Versionar permite migrar o invalidar datos viejos sin colisiones.

## CSS / Tailwind
- Clases utilitarias de Tailwind en el JSX.
- Clases globales reutilizables en `index.css` con nombres semánticos en `kebab-case` (`link-underline`, `reveal`, `card-warm`).
- Tokens de diseño como CSS variables HSL (`--primary`, `--accent`). Ver [05-styling-and-theming](05-styling-and-theming.md).
