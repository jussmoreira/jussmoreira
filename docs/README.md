# Documentación del proyecto — Portafolio `jussmoreira`

Esta carpeta contiene la documentación viva del proyecto: estándares de arquitectura y convenciones de ingeniería. Está pensada para ser **modular** (un tema por archivo), **granular** y **mantenible**.

## Índice

### `02-architecture/` — Estándares de arquitectura
La fuente de verdad sobre cómo se construye y se mantiene el frontend. Todo PR debe cumplir estos documentos.

| # | Documento | Tema |
|---|-----------|------|
| — | [Visión general](02-architecture/README.md) | Capas, principios y stack |
| 01 | [Estructura de carpetas](02-architecture/01-folder-structure.md) | Atomic Design, aliases |
| 02 | [Convenciones de nombres](02-architecture/02-naming-conventions.md) | Archivos, componentes, hooks, i18n |
| 03 | [Guía de componentes](02-architecture/03-component-guidelines.md) | Composición, props, límites |
| 04 | [Estado, datos e i18n](02-architecture/04-state-data-and-i18n.md) | Context, hooks, locales |
| 05 | [Estilos y theming](02-architecture/05-styling-and-theming.md) | Tailwind, tokens, dark mode |
| 06 | [Accesibilidad](02-architecture/06-accessibility.md) | WCAG 2.1 AA |
| 07 | [Seguridad](02-architecture/07-security.md) | OWASP front, enlaces, storage |
| 08 | [Rendimiento](02-architecture/08-performance.md) | Web Vitals, imágenes, deps |
| 09 | [Testing](02-architecture/09-testing.md) | Estrategia de pruebas |
| 10 | [Tooling y convenciones](02-architecture/10-tooling-conventions.md) | ESLint, Prettier, scripts |

## Cómo usar esta documentación

- **Al abrir un PR:** verificá tu cambio contra los documentos de `02-architecture/` relevantes.
- **Al revisar un PR (QA):** usá estos estándares como criterio objetivo y documentá los hallazgos contra cada regla.
- **Al introducir una convención nueva:** primero actualizá el documento correspondiente, luego el código. La doc precede al patrón.

> Estándar de referencia: buenas prácticas globales de React 19 + Atomic Design, alineadas con lo que el repositorio ya hace bien.
