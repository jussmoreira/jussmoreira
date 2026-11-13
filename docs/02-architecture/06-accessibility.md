# 06 · Accesibilidad (WCAG 2.1 AA)

La accesibilidad es un **requisito de aceptación**, no un extra. Todo PR debe cumplir estos mínimos.

## Checklist obligatorio

### Semántica y estructura
- [ ] Usar elementos nativos: `<button>` para acciones, `<a href>` para navegación, `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<ol>/<ul>`.
- [ ] Una sola `<h1>` por vista; jerarquía de encabezados sin saltos.
- [ ] **Skip link** "saltar al contenido" como primer elemento enfocable, apuntando a `#main-content`.

### Teclado y foco
- [ ] Todo lo interactivo es alcanzable y operable con teclado (Tab/Enter/Espacio/Escape).
- [ ] Orden de foco lógico. **Contenido oculto no debe ser enfocable**: un menú colapsado (`max-h-0`, off-canvas) debe marcarse `inert` y/o `aria-hidden` mientras está cerrado.
- [ ] Foco visible (`focus-visible:ring-*`). No remover outlines sin reemplazo.

### ARIA e imágenes
- [ ] Botones-icono sin texto llevan `aria-label` (patrón ya usado en `Navbar`, `Contact`, `Footer`).
- [ ] Elementos puramente decorativos: `aria-hidden` (gradientes, líneas de timeline).
- [ ] `<img>` con `alt` descriptivo; `alt=""` solo si es decorativa.
- [ ] Toggles expandibles (`menú`, acordeones) exponen `aria-expanded` y `aria-controls`.

### Atajos de teclado
- [ ] Los atajos de una sola tecla (`0`–`6`, `T`, `/`, `?`, ver `useKeyboardShortcuts`) **no actúan** al escribir en un campo, con Ctrl/Alt/Meta ni con un diálogo abierto (WCAG 2.1.4). Hay un botón visible que abre la ayuda.
- [ ] La terminal del hero no atrapa el foco: `Tab` sin coincidencia sigue el orden normal.

### Contenido plegable
- [ ] Las viñetas plegables de `Experience` (solo en móvil) usan un `<button>` con `aria-expanded`, `aria-controls` y altura táctil ≥ 44 px. En escritorio e impresión se muestran todas.
- [ ] El carrusel de proyectos en móvil es una región con `tabIndex=0` y `aria-label`; las tarjetas siguen siendo alcanzables con Tab.

### Formularios
- [ ] Cada control tiene `<label htmlFor>` asociado por `id`.
- [ ] Errores de validación se asocian al campo con `aria-invalid` + `aria-describedby`, además de cualquier notificación visual (`toast`).
- [ ] Mensajes de estado/error en una región `role="alert"` o `aria-live` para que los lea el lector de pantalla.

### Color y movimiento
- [ ] Contraste de texto ≥ 4.5:1 (≥ 3:1 para texto grande) en ambos temas.
- [ ] No transmitir información solo por color.
- [ ] Animaciones respetan `prefers-reduced-motion`.

## Cómo verificar
- Navegación completa solo con teclado.
- Auditoría Lighthouse / axe DevTools (objetivo a11y ≥ 95).
- Probar con `prefers-color-scheme` claro y oscuro.
