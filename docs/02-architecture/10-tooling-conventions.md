# 10 · Tooling y convenciones

## Build / Dev
- **CRACO** sobre Create React App (`react-scripts` 5). Configuración en `craco.config.js`.
- Scripts (`frontend/package.json`):
  - `yarn start` — dev server en `:3000`.
  - `yarn build` — build de producción en `build/`.
  - `yarn test` — pruebas.
  - `yarn lint` — ESLint sobre `src` (recomendado añadir si falta).
- Ver todos los comandos en `comandos.md` (raíz).

## Alias
- `@/` → `src/` debe estar sincronizado en **tres** lugares: `craco.config.js` (webpack), `jsconfig.json` (editor) y `jest.moduleNameMapper` (tests). Si cambia uno, cambian los tres.

## ESLint
- Config base: `react-hooks/recommended` con:
  - `react-hooks/rules-of-hooks: error`
  - `react-hooks/exhaustive-deps: warn`
- Recomendado: añadir `eslint-plugin-jsx-a11y` (ya en devDeps) a la config para reforzar accesibilidad, y un script `lint` explícito.
- El build de CRA falla ante errores de ESLint: mantener `src` sin warnings nuevos.

## Prettier (recomendado)
- Añadir `.prettierrc` y `prettier` para formato consistente (2 espacios, comillas dobles, `trailingComma: "all"`), alineado con el estilo actual del repo.

## Variables de entorno
- Solo variables `REACT_APP_*` llegan al cliente (CRA). **Nunca** poner secretos: todo lo del bundle es público.
- Si `craco.config.js` usa `require("dotenv")`, declarar `dotenv` en devDependencies (no depender de resolución transitiva).

## Limpieza de artefactos de scaffolding
- Este proyecto fue generado con la plataforma Emergent. Eliminar de producción lo que no se use: workarounds en `index.html`, plugins de health-check inexistentes, integraciones de "visual edits".

## Git / commits
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`, `style:`.
- Un PR = un propósito. Separar refactors mecánicos (p. ej. estandarizar imports) de cambios de comportamiento.
- No commitear `node_modules/`, `build/`, ni `.env` (verificar `.gitignore`).
- Recomendado: hook de pre-commit (lint-staged) para correr ESLint/Prettier sobre lo staged.

## Dependencias
- Mantener `package.json` libre de paquetes sin uso. Antes de agregar una dependencia, evaluar peso y alternativas nativas.
