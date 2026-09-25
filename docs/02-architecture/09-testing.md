# 09 · Testing

## Stack
- **Jest** (vía `react-scripts`/CRACO) + **React Testing Library** + `@testing-library/jest-dom` + `@testing-library/user-event`.
- Setup global en `src/setupTests.js` (matchers de jest-dom y mocks de `matchMedia`/`IntersectionObserver` para jsdom).

## Resolución del alias en tests
Jest debe resolver `@/` igual que webpack. Configurado en `craco.config.js`:
```js
jest: {
  configure: { moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" } },
}
```

## Estrategia (pirámide pragmática)
Para una SPA de contenido estático, priorizar **valor sobre cantidad**:

| Nivel | Qué probar | Ejemplos |
|-------|------------|----------|
| Unit | Lógica pura y utilidades | `cn()`, `buildMailtoLink()`, `useCountUp` |
| Contrato de datos | Integridad del contenido | **paridad de claves** `en.json` ↔ `es.json` |
| Comportamiento | Estado e interacción | `ThemeContext` (toggle/persistencia), validación de `Contact` |
| Smoke | La vista monta sin romper | render de `Portfolio`/organisms (con mocks de observers) |

### Reglas
- Las pruebas que dependan de `IntersectionObserver`/`requestAnimationFrame`/`matchMedia` usan los mocks de `setupTests.js`; no deben quedar flaky.
- Probar **comportamiento observable** (lo que ve el usuario), no detalles de implementación.
- Para `mailto:`/validación, extraer y probar funciones puras (`buildMailtoLink`) en vez de depender de portales de `toast`.
- Un test de **paridad de locales** es obligatorio: evita textos faltantes al agregar claves.

## Convención
- Archivos `*.test.js` junto al módulo o en `__tests__/`.
- Nombrar los casos describiendo el comportamiento: `it("rechaza un email inválido")`.

## Comando
```bash
cd frontend
yarn test            # watch
CI=true yarn test    # una pasada (CI)
```

## Meta de cobertura
- No perseguir 100%. Cubrir lógica crítica (validación, utilidades, contexto, contrato de datos) y mantener verde el smoke. Subir cobertura junto con cada feature nuevo.
