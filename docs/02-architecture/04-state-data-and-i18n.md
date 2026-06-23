# 04 · Estado, datos e i18n

## Fuentes de estado

| Preocupación | Mecanismo | Ubicación |
|--------------|-----------|-----------|
| Tema (claro/oscuro) | React Context | `contexts/ThemeContext.jsx` |
| Idioma | i18next | `i18n.js` + `locales/` |
| Estado de UI efímero | `useState` local | dentro del componente |
| Contenido | i18n (`returnObjects`) | `locales/{en,es}.json` |
| Assets / constantes | módulo de config | `config/site.js` |

> No introducir librerías de estado global (Redux, Zustand…) salvo necesidad demostrada. Para esta app, Context + estado local + i18n son suficientes.

## Tema

- `ThemeProvider` mantiene `theme` y lo persiste en `localStorage` (`jm_theme_v1`), aplicando la clase `dark` y `color-scheme` en `<html>`.
- El valor inicial respeta: valor guardado → `prefers-color-scheme` → `light`.
- **Anti-FOUC:** un script de arranque en `index.html`/`index.js` aplica el tema **antes** del primer render, replicando la misma lógica (guardado → `prefers-color-scheme`). Mantener ambos consistentes.
- Consumir el tema solo vía `useTheme()`, que lanza error fuera del provider.

## Internacionalización (i18n)

- `i18next` con recursos `en` y `es`; idioma inicial: guardado (`jm_language_v1`) → idioma del navegador → `en` (fallback).
- **Todo texto visible vive en los locales.** Esto incluye contenido generado dinámicamente: el asunto y cuerpo de un `mailto:` también se traducen (claves `contact.mailto.*`).
- Acceso a objetos/listas con `t("clave", { returnObjects: true })` + guard de tipo.
- Interpolación con `{{var}}` (`footer.copyright`). `escapeValue: false` es correcto porque React ya escapa; **nunca** inyectar contenido de locale con `dangerouslySetInnerHTML`.
- **Paridad de claves:** `en.json` y `es.json` deben tener exactamente la misma estructura de claves. Validado por test (ver [09-testing](09-testing.md)).

## Datos y "backend"

- No hay backend. La sección de **Contacto** es informativa: muestra los datos directos (correo como enlace `mailto:`, teléfono como `tel:`, ubicación y redes). No hay formulario ni envío.
- Las URLs/links de contacto y redes viven en `config/site.js`; los textos, en `locales/`.
- Si en el futuro se añade backend o un formulario, encapsular las llamadas en una capa `services/` y no acoplar `fetch` directamente a los organisms.

## Hooks reutilizables (`src/hooks/`)
- `useInViewOnce` — detecta entrada en viewport una sola vez (ref-based).
- `useReveal` — anima los elementos `.reveal` al entrar en viewport (DOM-based, a nivel de página).
- `useCountUp` — animación numérica con `requestAnimationFrame` y easing.
- Regla: cualquier patrón con `IntersectionObserver`/`requestAnimationFrame` se centraliza aquí, **no se duplica** en componentes.
