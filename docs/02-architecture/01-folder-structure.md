# 01 · Estructura de carpetas

## Árbol de referencia

```
frontend/
├── public/
│   └── index.html              # Shell HTML, meta, fuentes
├── src/
│   ├── index.js                # Punto de entrada: providers + boot de tema
│   ├── App.js                  # Página o 404 + ErrorBoundary + barra de progreso
│   ├── i18n.js                 # Configuración de i18next (idioma: ?lang → guardado → navegador)
│   ├── index.css / App.css     # Estilos globales + design tokens
│   ├── components/
│   │   ├── atoms/              # Elementos UI mínimos (button, input, label…)
│   │   ├── molecules/          # Composiciones simples (card, dialog, tabs…)
│   │   ├── organisms/          # Secciones de página (Navbar, Hero, Contact…)
│   │   └── pages/              # Ensamblaje de organisms (Portfolio)
│   ├── contexts/               # Estado global por React Context (ThemeContext)
│   ├── hooks/                  # Hooks reutilizables (un hook = un archivo): useCountUp, useReveal, useKeyboardShortcuts…
│   ├── lib/                    # Utilidades puras (cn…)
│   ├── config/                 # Constantes/assets de sitio (no contenido visible)
│   └── locales/                # Contenido i18n (en.json, es.json)
```

## Atomic Design — definición de cada capa

| Capa | Responsabilidad | Ejemplos | Puede importar |
|------|-----------------|----------|----------------|
| **atoms** | Elemento UI indivisible, sin lógica de negocio | `button`, `input`, `label`, `social-icon`, `scroll-progress` | `lib/`, librerías |
| **molecules** | Composición pequeña y reutilizable de atoms | `dialog`, `ErrorBoundary`, `SectionBar`, `CodePanel`, `ShortcutsHelp`, `ImageCarousel` | atoms, `lib/` |
| **organisms** | Sección autónoma de la página, con datos i18n y hooks | `Navbar`, `Hero`, `Contact`, `Footer` | molecules, atoms, `hooks/`, `contexts/`, `config/`, `locales` (vía i18n) |
| **pages** | Ensamblaje de organisms en una vista | `Portfolio` | organisms |

### Criterios para clasificar un componente
- ¿Es indivisible y sin estado de dominio? → **atom**.
- ¿Agrupa pocos atoms con una intención visual concreta? → **molecule**.
- ¿Representa una "franja" completa de la página y consume contenido/estado? → **organism**.
- ¿Solo orquesta organisms? → **page**.

## Alias de importación

El proyecto define el alias **`@/` → `src/`** en tres lugares que deben mantenerse sincronizados:
- `frontend/craco.config.js` (webpack `resolve.alias`)
- `frontend/jsconfig.json` (`paths`)
- configuración de Jest (`moduleNameMapper`) — ver [10-tooling-conventions](10-tooling-conventions.md)

### Regla de uso del alias
- Usar **`@/`** para imports que **cruzan un límite de carpeta de primer nivel** (`components ↔ hooks ↔ contexts ↔ lib ↔ config`).
  ```js
  import { useTheme } from "@/contexts/ThemeContext";
  import { siteAssets } from "@/config/site";
  ```
- Usar rutas **relativas** solo entre **hermanos de la misma capa**.
  ```js
  import { Button } from "../atoms/button"; // dentro de components/
  ```
- Nunca usar relativos profundos (`../../../`) que crucen capas: dificultan mover archivos.

## Reglas
- **Un componente = un archivo.** Un hook = un archivo (ver naming).
- No crear "barrels" (`index.js` re-exportadores) salvo que reduzcan ruido real; preferir imports explícitos.
- `config/` contiene constantes y assets (URLs, claves de storage), **nunca** texto visible para el usuario (eso va a `locales/`).
- `config/site.json` es la **fuente única** de la URL del sitio, los CV y el contacto (codificado en base64). La leen `config/site.js` y el generador del README del perfil (`assets/readme/build.js`); no se copian esos datos a ningún otro lado.
- El README del perfil se **genera**, no se edita a mano: `cd frontend && yarn readme` (ver `comandos.md`).
