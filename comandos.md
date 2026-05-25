# Comandos Principales del Proyecto

Este archivo contiene los comandos esenciales para trabajar con el frontend del portfolio. Todos estos comandos deben ejecutarse dentro de la carpeta `frontend/`.

## Preparación

Antes de iniciar, asegúrate de estar en la carpeta correcta:
```bash
cd frontend
```

### Instalar dependencias
Si es la primera vez que clonas el proyecto o si alguien añadió nuevas dependencias, debes instalarlas:
```bash
yarn install
```

## Desarrollo

### Iniciar el servidor de desarrollo
Para correr el proyecto localmente y ver los cambios en tiempo real:
```bash
yarn start
```
*El proyecto se abrirá automáticamente en `http://localhost:3000` en tu navegador.*

## Producción

### Construir para producción (Build)
Cuando estés listo para subir tu portfolio a internet (por ejemplo, a Vercel, Netlify o GitHub Pages), necesitas compilar el proyecto:
```bash
yarn build
```
*Esto generará una carpeta `build/` con los archivos optimizados listos para desplegar.*

## Pruebas (Tests)

### Ejecutar pruebas
Si en el futuro agregas pruebas unitarias a tus componentes, puedes ejecutarlas con:
```bash
yarn test
```

---

**Nota:** El proyecto utiliza `craco` (Create React App Configuration Override) por debajo, pero los comandos de `yarn` ya están configurados en el `package.json` para usarlo automáticamente.
