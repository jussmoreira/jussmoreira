# 05 · Estilos y theming

## Estrategia

- **Tailwind CSS** para utilidades en el JSX.
- **Design tokens** como CSS variables HSL en `index.css`, expuestas a Tailwind vía `tailwind.config.js` (`hsl(var(--token))`).
- Clases globales semánticas reutilizables en `index.css` (`.container-narrow`, `.section-grid` con `.section-body`, `.skip-link`). Los botones usan las variantes del atom `Button` (`default`, `outline`, `ghost`).

## Design tokens

Definidos en `:root` (claro) y `.dark` (oscuro) como tripletas HSL **sin** la función `hsl()` (para poder modular opacidad con `/`):

```css
:root  { --primary: 22 33% 24%; --accent: 32 35% 60%; /* … */ }
.dark  { --primary: 36 38% 92%; --accent: 32 35% 60%; /* … */ }
```

Uso en JSX:
```jsx
className="bg-primary text-primary-foreground"
style={{ background: "hsl(var(--accent) / 0.45)" }}
```

### Reglas de tokens
- **Nunca** colores "mágicos" (`#785c44`, `rgb(...)`) en componentes: usar tokens.
- Todo token definido en `:root` debe tener su equivalente en `.dark`.
- Para opacidades, usar la sintaxis `hsl(var(--token) / 0.5)` o utilidades `/NN` de Tailwind (`bg-primary/90`).

## Dark mode

- Estrategia `class` (`darkMode: ["class"]`): la clase `dark` en `<html>` la gestiona `ThemeContext`.
- Cualquier componente nuevo debe verse correcto en **ambos** temas. Verificar contraste (ver [06-accessibility](06-accessibility.md)).

## Utilidad `cn()`

`lib/utils.js` exporta `cn(...inputs)` = `twMerge(clsx(inputs))`.
- Usar siempre `cn()` para combinar clases condicionales y la `className` recibida por props; evita conflictos de Tailwind (la última gana).

```jsx
className={cn("rounded-md border", isActive && "border-primary", className)}
```

## Tipografía
- Títulos (`h1`, `h2`): `Newsreader` (utilidad `font-display`).
- Cuerpo, `h3` y controles: `Inter` (utilidad `font-sans`, por defecto en `body`).
- Las fuentes se cargan en `index.html` con `preconnect`. **No** usar `@import` de Google Fonts dentro de CSS (bloquea el render); declararlas en `<link>`.

## Buenas prácticas
- Evitar estilos inline salvo valores dinámicos (gradientes con tokens, anchos calculados).
- Movimiento mínimo: solo transiciones de color y el efecto de presión de los botones. `index.css` las anula con `prefers-reduced-motion`, y `hoverOnlyWhenSupported` evita estados hover pegados en pantallas táctiles.
- Nada de decoración que imite "diseño de IA": sin degradados, brillos, blobs, texto rotativo, contadores animados ni contenido que aparece al hacer scroll. El contenido debe estar visible desde el primer render.
- Reutilizar las clases globales existentes antes de crear nuevas variantes.
