# Paises Svelte - Countries Explorer

Una aplicación web interactiva desarrollada en **Svelte 3** que permite explorar información sobre todos los países del mundo. Búsqueda en tiempo real, filtro por región y diseño Material con acento naranja.

[![Svelte](https://img.shields.io/badge/Svelte-3.55-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![SMUI](https://img.shields.io/badge/SMUI-6.1-FF3E00?style=for-the-badge)](https://sveltematerialui.com/)
[![Rollup](https://img.shields.io/badge/Rollup-3.x-BD2C00?style=for-the-badge&logo=rollup.js&logoColor=white)](https://rollupjs.org/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://svelte-paises.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**🌐 Producción:** [https://svelte-paises.vercel.app](https://svelte-paises.vercel.app)

## Características

- **Búsqueda en tiempo real** — por nombre común, nombre oficial o capital
- **Filtro por región** — África, América, Asia, Europa, Oceanía
- **Grid de tarjetas** — bandera, nombre, badges de datos clave
- **SMUI (Svelte Material UI)** — TextField, Select, Button y Card con tema naranja
- **Carga animada** — CircularProgress mientras llega la API
- **Diseño responsive** — compatible con móviles y escritorio

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| UI Framework | Svelte 3.55 |
| Componentes UI | Svelte Material UI 6.1 |
| Bundler | Rollup 3 + svelte-preprocess + sass |
| Servidor estático | sirv-cli |
| API | REST Countries (custom service) |

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev      # desarrollo con live reload
npm run build    # build de producción → public/build/
npm start        # sirve public/ en http://localhost:8080
```

## Estructura del proyecto

```
paises-svelte/
├── public/
│   ├── build/           # bundle.js + bundle.css (generados)
│   ├── assets/img/      # logo.png
│   ├── global.css       # variables MDC / tema naranja
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.svelte
│   │   └── Footer.svelte
│   ├── App.svelte        # lógica principal + grid de países
│   └── main.js
├── rollup.config.js
├── eslint.config.js
├── vercel.json
└── package.json
```

## API

```
https://countries-api-service.vercel.app/api/countries
```

## Autor

**Carlos Mur** — [@cmurestudillos](https://github.com/cmurestudillos)
