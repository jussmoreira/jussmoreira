# 08 · Rendimiento

Objetivo: **Core Web Vitals** en verde (LCP < 2.5s, CLS < 0.1, INP < 200ms) y bundle ajustado.

## Imágenes
- Declarar `width`/`height` o `aspect-ratio` para **evitar CLS** (reserva de espacio).
- `loading="lazy"` para imágenes fuera del viewport inicial; `loading="eager"` + (idealmente) `fetchpriority="high"` solo para la imagen LCP (hero).
- Proveer **fallback `onError`** para no mostrar imágenes rotas (componente `atoms/SafeImage`).
- Servir tamaños/formatos adecuados (`w=…&q=…` en CDNs; preferir AVIF/WebP). Alojar la imagen LCP de forma confiable.

## JavaScript / bundle
- **Sin dependencias muertas.** Auditar `package.json` contra el uso real; eliminar lo no importado (reduce peso y superficie).
- Eliminar componentes/archivos no consumidos.
- Para vistas/markup pesado no críticos, considerar `React.lazy` + `Suspense` (con `react.useSuspense` desactivado en i18n, encapsular adecuadamente).
- No re-calcular en cada render lo que puede memoizarse: p. ej., no llamar `t("...", { returnObjects: true })` dos veces en el mismo componente; calcular una vez y memoizar listas derivadas.

## Render y efectos
- Desconectar observers/listeners/timers en el cleanup de efectos.
- `IntersectionObserver` para animaciones de entrada (ya en uso) es preferible a listeners de `scroll` costosos; si se usa `scroll`, marcarlo `{ passive: true }` (ya aplicado en `Navbar`).
- Evitar trabajo en el hilo principal durante animaciones; usar `requestAnimationFrame` (patrón de `useCountUp`).

## CSS y fuentes
- Cargar fuentes vía `<link>` en `index.html` con `preconnect`; evitar `@import` en CSS (bloquea render).
- Usar `display=swap` en las fuentes (ya presente) para evitar texto invisible.
- Purga de Tailwind activa (`content` en `tailwind.config.js`) para no enviar CSS sin usar.

## Medición
- `yarn build` y revisar el tamaño de los chunks.
- Lighthouse (Performance ≥ 90) en móvil y escritorio antes de desplegar cambios grandes.
