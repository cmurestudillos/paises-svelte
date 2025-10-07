# 🌍 Paises Slvelte - Countries Explorer

Una aplicación web interactiva desarrollada en **Svelte** que permite explorar información detallada sobre todos los países del mundo. Incluye funcionalidades de búsqueda en tiempo real y filtros por continentes.

[![Svelte](https://img.shields.io/badge/Svelte-4.0-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

## ✨ Características

- 🔍 **Búsqueda en tiempo real** - Encuentra países escribiendo su nombre
- 🌎 **Filtro por continentes** - Filtra países por África, América, Asia, Europa, Oceanía
- 📊 **Información detallada** - Capital, población, región, idiomas, moneda y más
- 🎨 **Interfaz moderna** - Diseño responsive con Bootstrap 5
- 🚀 **Rápida y eficiente** - Construida con Svelte para máximo rendimiento
- 🎭 **Animaciones suaves** - Transiciones y efectos visuales agradables
- 📱 **Totalmente responsive** - Funciona perfectamente en móviles y tablets

## 🛠️ Tecnologías utilizadas

- [Svelte](https://svelte.dev/) - Framework JavaScript reactivo
- [Bootstrap 5](https://getbootstrap.com/) - Framework CSS
- [Rollup](https://rollupjs.org/) - Module bundler
- [REST Countries API](https://countries-api-service.vercel.app/) - API de datos de países

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## 🚀 Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/cmurestudillos/paises-svelte.git
cd countries-explorer
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

4. **Abre tu navegador**

Navega a [http://localhost:8080](http://localhost:8080)

## 📦 Scripts disponibles

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del proyecto

```
countries-explorer/
├── public/
│   ├── build/          # Archivos compilados
│   ├── assets/         # Imágenes y recursos
│   └── index.html      # HTML principal
├── src/
│   ├── components/
│   │   ├── Header.svelte
│   │   └── Footer.svelte
│   ├── App.svelte      # Componente principal
│   └── main.js         # Punto de entrada
├── package.json
├── rollup.config.js    # Configuración de Rollup
└── README.md
```

## 🌐 API utilizada

Este proyecto consume la API de países disponible en:

```
https://countries-api-service.vercel.app/api/countries
```

La API proporciona información completa sobre todos los países del mundo, incluyendo:
- Nombres (común y oficial)
- Banderas y escudos
- Población
- Capital
- Región y subregión
- Continentes
- Idiomas
- Monedas
- Y mucho más...

## 🎯 Funcionalidades principales

### Búsqueda de países
Escribe el nombre de cualquier país en el campo de búsqueda y los resultados se filtrarán instantáneamente.

### Filtros por continente
Selecciona un continente del menú desplegable para ver solo los países de esa región:
- África
- América (North America, South America)
- Asia
- Europa
- Oceanía
- Antártida

### Información detallada
Haz clic en cualquier país para expandir y ver información detallada:
- Capital
- Población
- Región y subregión
- Continente
- Idiomas oficiales
- Moneda (nombre y símbolo)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Carlos Mur**

- GitHub: [@tu-usuario](https://github.com/cmurestudillos)

## 🙏 Agradecimientos

- [REST Countries API](https://restcountries.com/) por proporcionar los datos
- [Svelte](https://svelte.dev/) por el increíble framework
- [Bootstrap](https://getbootstrap.com/) por los componentes UI

---

⭐️ Si te gusta este proyecto, ¡dale una estrella en GitHub!