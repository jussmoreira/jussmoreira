# 03 · Guía de componentes

## Forma de un componente

```jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function Section() {
  const { t } = useTranslation();
  const data = t("section", { returnObjects: true });

  // 1. Guard de datos (defensivo ante locale incompleto)
  if (!data || typeof data !== "object") return null;

  // 2. Normalización de colecciones
  const items = Array.isArray(data.items) ? data.items : [];

  // 3. Render presentacional
  return <section id="section">{/* ... */}</section>;
}
```

### Reglas
- **Default export** para organisms y pages; **named export** para atoms/molecules/hooks reutilizables.
- **Componentes presentacionales:** reciben datos y callbacks; evitan lógica de negocio compleja en el cuerpo del render.
- **Guard de datos:** todo organism que dependa de `returnObjects` valida el tipo antes de renderizar (`if (!data || typeof data !== "object") return null`). Patrón ya usado en `Contact`, `Projects`, `Skills`, etc. — mantenerlo.
- **Listas:** normalizar siempre con `Array.isArray(...) ? ... : []` antes de `.map()`.
- **`key` estables:** preferir un id de dominio (`item.id`) sobre el índice. Si no hay id natural, usar una clave compuesta determinística (`` `${item.role}-${index}` ``), nunca solo el índice cuando la lista puede reordenarse.

## Props
- Desestructurar props en la firma.
- Nombrar callbacks con `on*` (`onRetry`, `onSubmit`).
- Componentes de UE genéricos (atoms) usan `forwardRef` y propagan `...props` + `className` combinada con `cn()`.
- Evitar prop drilling profundo: si un valor cruza más de 2 niveles, considerar Context.

## Estado y efectos
- Estado local con `useState`; derivar en vez de duplicar.
- `useMemo`/`useCallback` solo cuando hay un costo real o para estabilizar dependencias de efectos/listas.
- Cada `useEffect` debe limpiar lo que crea (listeners, observers, timers, frames). Ejemplo correcto: `IntersectionObserver` + `disconnect()` en el cleanup.
- Lógica reutilizable (observers, animaciones, count-up) → **hooks** en `src/hooks/`, no copiada entre componentes.

## Manejo de errores
- La app está envuelta en un `ErrorBoundary` (clase) que muestra un fallback accesible y traducible.
- Componentes individuales no deberían "tragar" errores silenciosamente; los `try/catch` (p.ej. acceso a `localStorage`) deben degradar con gracia y, si aplica, notificar al usuario vía `toast`.

## Composición sobre configuración
- Preferir componer atoms/molecules antes que crear props booleanas que multipliquen variantes.
- Variantes visuales de atoms: usar `class-variance-authority` (ya presente) en vez de condicionales ad-hoc.
