# 07 · Seguridad (frontend / OWASP)

Aunque no haya backend, un frontend tiene su propia superficie de riesgo. Reglas mínimas:

## Enlaces externos
- Todo `<a target="_blank">` debe llevar `rel="noreferrer"` (o `noopener noreferrer`) para evitar *reverse tabnabbing* y fuga de `Referer`.
- **Todas las URLs externas usan `https://`.** Prohibido `http://` (contenido mixto / interceptable). Centralizar URLs en `config/site.js`.

## XSS e inyección
- **Nunca** `dangerouslySetInnerHTML` con contenido dinámico o de locale. React escapa por defecto: mantenerlo así.
- `i18next` con `escapeValue: false` es seguro **porque React escapa**; el contenido de los locales debe permanecer confiable (no provenir de input de usuario).
- Datos que se inyectan en URLs (`mailto:`, `tel:`, query params) se codifican con `encodeURIComponent`.

## Datos y privacidad (`localStorage`)
- `localStorage` no es almacenamiento seguro: no guardar secretos ni tokens.
- Hoy solo se persisten preferencias no sensibles: tema (`jm_theme_v1`) e idioma (`jm_language_v1`).
- Si en el futuro se almacenan datos personales (p. ej. un formulario), **acotar** la cantidad e informarlo al usuario.
- Todo acceso a `localStorage` va dentro de `try/catch` (modo privado / storage deshabilitado).

## Validación de entrada
- Validar en cliente: campos requeridos y formato (email con regex razonable).
- La validación de cliente es UX, no seguridad: si se agrega backend, **revalidar en el servidor**.

## Cabeceras y CSP (capa de hosting)
- Configurar en el host (Vercel/Netlify/Pages): `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`.
- Restringir orígenes de imágenes/fuentes en la CSP a los realmente usados (Google Fonts, host de imágenes).

## Dependencias
- Ejecutar `yarn audit` periódicamente; no incluir dependencias sin uso (reducen superficie y peso).
- Eliminar artefactos de plataformas de scaffolding que no se usen en producción.

## Assets externos
- Preferir alojar assets propios (foto de perfil) en el repo/host en lugar de depender de URLs de terceros que pueden expirar o cambiar.
