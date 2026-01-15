# 🔍 BuscaNegocios - Encuentra y Crea Webs Profesionales

Una aplicación web moderna que te permite buscar **negocios reales** cercanos por código postal y generar automáticamente sitios web profesionales para ellos.

## ✨ Características Principales

### 🎯 Búsqueda de Negocios REALES
- **API de OpenStreetMap (Overpass)**: Busca negocios reales en cualquier ubicación
- **Geocodificación Real**: Usa Nominatim API para convertir códigos postales en coordenadas
- **100% Gratuito**: No requiere claves de API ni configuración
- **Datos Actualizados**: Información real de negocios de OpenStreetMap
- **Múltiples Categorías**: Restaurantes, tiendas, farmacias, bancos, oficinas y más

### 🗺️ Visualización Dual
- **Vista de Lista**: Tarjetas elegantes con toda la información del negocio
- **Vista de Mapa**: Visualización interactiva con marcadores personalizados
- **Transiciones Suaves**: Cambio fluido entre vistas
- **Información Detallada**: Dirección, teléfono, horario, valoraciones

### 🌐 Generación Automática de Webs
- **Diseño Premium**: Sitios web modernos con gradientes y animaciones
- **Responsive**: Adaptados a todos los dispositivos
- **SEO Optimizado**: Meta tags, títulos descriptivos y estructura semántica
- **Contenido Dinámico**: Generado automáticamente basado en el tipo de negocio
- **Secciones Completas**: Hero, Sobre Nosotros, Servicios, Galería, Contacto, Mapa

### 🎨 Diseño Moderno
- **Glassmorphism**: Efectos de vidrio esmerilado
- **Gradientes Vibrantes**: Combinaciones de colores llamativas (púrpura + rosa)
- **Animaciones Fluidas**: Micro-interacciones que mejoran la UX
- **Tipografía Premium**: Google Fonts (Inter + Outfit)
- **Dark Mode**: Tema oscuro elegante

## 🚀 Instalación y Uso

### Inicio Rápido (Recomendado)

1. **Descarga o clona el proyecto**
```bash
cd buscarnegocios
```

2. **Inicia un servidor local**

**Opción 1 - Python** (más común):
```bash
python3 -m http.server 8000
```

**Opción 2 - Node.js**:
```bash
npx http-server -p 8000
```

**Opción 3 - PHP**:
```bash
php -S localhost:8000
```

3. **Abre en tu navegador**
```
http://localhost:8000
```

### Uso de la Aplicación

1. **Introduce un código postal español** (ejemplos: 28001, 08001, 41001, 46001)
2. **Haz clic en "Buscar Negocios"** o presiona Enter
3. **Espera unos segundos** mientras se buscan negocios reales en OpenStreetMap
4. **Explora los resultados**:
   - Vista de lista: Desplázate por las tarjetas de negocios
   - Vista de mapa: Haz clic en los marcadores para ver información
5. **Genera una web profesional**:
   - Haz clic en "Crear Web" en cualquier negocio
   - Previsualiza la web en el modal
   - Haz clic en "Abrir en nueva pestaña" para ver la web completa
   - Guarda la web con Ctrl+S o compártela

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Flexbox, Grid, animaciones
- **JavaScript ES6+**: Async/await, Fetch API, módulos

### APIs Externas (100% Gratuitas)
- **Nominatim API**: Geocodificación de códigos postales
  - URL: https://nominatim.openstreetmap.org
  - Sin API key requerida
  
- **Overpass API**: Búsqueda de negocios en OpenStreetMap
  - URL: https://overpass-api.de/api/interpreter
  - Sin API key requerida
  
- **OpenStreetMap**: Mapas embebidos
  - Licencia: Open Database License
  
- **Unsplash Source**: Imágenes de alta calidad
  - Fotos profesionales para las webs generadas

## 📋 Códigos Postales de Ejemplo

Prueba con estos códigos postales españoles para ver negocios reales:

### Ciudades Principales
- **Madrid**: 28001, 28002, 28013, 28004, 28010
- **Barcelona**: 08001, 08002, 08003, 08010, 08015
- **Sevilla**: 41001, 41002, 41003, 41010
- **Valencia**: 46001, 46002, 46003, 46010
- **Málaga**: 29001, 29002, 29015

### Otras Ciudades
- **Bilbao**: 48001, 48005
- **Zaragoza**: 50001, 50003
- **Alicante**: 03001, 03003
- **Murcia**: 30001, 30002
- **A Coruña**: 15001
- **Oviedo**: 33001
- **Valladolid**: 47001
- **Granada**: 18001

## 🎯 Funcionalidades Implementadas

### ✅ Búsqueda de Negocios
- [x] Geocodificación real con Nominatim API
- [x] Búsqueda de negocios reales con Overpass API
- [x] Fallback inteligente si las APIs fallan
- [x] Categorización automática de 25+ tipos de negocios
- [x] Información detallada (nombre, dirección, teléfono, horario)
- [x] Coordenadas GPS precisas
- [x] Soporte para múltiples provincias españolas

### ✅ Visualización
- [x] Vista de lista con tarjetas animadas
- [x] Vista de mapa interactivo (OpenStreetMap)
- [x] Marcadores personalizados
- [x] Info windows con información del negocio
- [x] Transiciones suaves entre vistas
- [x] Scroll automático a resultados

### ✅ Generación de Webs
- [x] Plantilla HTML completa y responsive
- [x] Secciones profesionales:
  - Hero con imagen de fondo
  - Sobre Nosotros con descripción
  - Servicios personalizados por tipo
  - Galería de imágenes
  - Contacto con mapa embebido
  - Footer con información
- [x] Servicios personalizados por categoría (10+ categorías)
- [x] Mapa embebido con ubicación real
- [x] Diseño premium con gradientes
- [x] Previsualización en modal
- [x] Apertura en nueva pestaña
- [x] Exportable como HTML

### ✅ UX/UI
- [x] Estados de carga con spinner animado
- [x] Manejo de errores con mensajes claros
- [x] Animaciones y transiciones fluidas
- [x] Diseño responsive (móvil, tablet, desktop)
- [x] Accesibilidad mejorada
- [x] Glassmorphism y efectos modernos
- [x] Micro-animaciones en hover

## 🌐 Cómo Funciona

### 1. Geocodificación
Cuando introduces un código postal:
1. Se envía una petición a Nominatim API
2. La API devuelve las coordenadas GPS del código postal
3. Si falla, se usa un sistema de fallback con coordenadas predefinidas

### 2. Búsqueda de Negocios
Con las coordenadas obtenidas:
1. Se construye una query de Overpass QL
2. Se buscan negocios en un radio de 5km
3. Se procesan los resultados de OpenStreetMap
4. Se categorizan y enriquecen los datos
5. Si hay pocos resultados, se complementan con datos de respaldo

### 3. Generación de Webs
Al hacer clic en "Crear Web":
1. Se toma la información del negocio
2. Se genera HTML completo con CSS inline
3. Se personalizan los servicios según la categoría
4. Se crea un Blob URL para previsualizar
5. Se puede abrir en nueva pestaña o guardar

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-hue: 260;        /* Púrpura */
    --accent-hue: 320;         /* Rosa */
    --primary-sat: 85%;
    --primary-light: 55%;
}
```

### Ajustar Radio de Búsqueda
En `app.js`, línea 6:
```javascript
SEARCH_RADIUS: 5000, // 5km (en metros)
```

### Cambiar Número de Resultados
En `app.js`, línea 7:
```javascript
MAX_RESULTS: 20
```

### Añadir Nuevos Tipos de Negocio
En `app.js`, función `getBusinessTypeAndIcon()`, añade:
```javascript
'tu_tipo': { category: 'Tu Categoría', icon: '🎯' }
```

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge 90+ (Recomendado)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Dispositivos
- ✅ Desktop (1920x1080 y superiores)
- ✅ Laptop (1366x768 y superiores)
- ✅ Tablet (768x1024)
- ✅ Móvil (375x667 y superiores)

## 🔮 Mejoras Futuras

### Funcionalidades
- [ ] Filtros por categoría de negocio
- [ ] Guardar negocios favoritos (LocalStorage)
- [ ] Exportar web como archivo .html descargable
- [ ] Personalización de colores de la web generada
- [ ] Múltiples plantillas de diseño
- [ ] Editor de contenido para las webs
- [ ] Compartir webs en redes sociales

### Integraciones
- [ ] Integración con Google My Business
- [ ] Sistema de valoraciones y comentarios
- [ ] Integración con redes sociales
- [ ] API propia para guardar webs generadas
- [ ] Sistema de usuarios y autenticación

### UX/UI
- [ ] Modo claro/oscuro toggle
- [ ] Búsqueda por ciudad o dirección
- [ ] Historial de búsquedas
- [ ] Comparador de negocios
- [ ] Rutas entre negocios
- [ ] Filtros avanzados (precio, horario, etc.)

## 🐛 Solución de Problemas

### No aparecen resultados
- Verifica que el código postal sea español (5 dígitos)
- Prueba con códigos postales de ciudades grandes (28001, 08001)
- Revisa la consola del navegador para errores
- Comprueba tu conexión a internet

### El mapa no se carga
- Asegúrate de tener conexión a internet
- Verifica que no haya bloqueadores de contenido
- Prueba en modo incógnito

### Las imágenes no cargan
- Las imágenes vienen de Unsplash y pueden tardar
- Si una imagen falla, se muestra un placeholder

## 📄 Estructura del Proyecto

```
buscarnegocios/
├── index.html          # Página principal de la aplicación
├── styles.css          # Estilos y diseño visual
├── app.js             # Lógica de la aplicación
└── README.md          # Esta documentación
```

## 📚 APIs Utilizadas

### Nominatim (OpenStreetMap)
- **Propósito**: Geocodificación de códigos postales
- **Documentación**: https://nominatim.org/release-docs/latest/
- **Límites**: 1 petición por segundo (respetado automáticamente)
- **Licencia**: Open Database License

### Overpass API (OpenStreetMap)
- **Propósito**: Búsqueda de puntos de interés
- **Documentación**: https://wiki.openstreetmap.org/wiki/Overpass_API
- **Límites**: Timeout de 25 segundos por query
- **Licencia**: Open Database License

### OpenStreetMap
- **Propósito**: Mapas embebidos
- **Documentación**: https://www.openstreetmap.org/
- **Licencia**: Open Database License
- **Atribución**: © OpenStreetMap contributors

## 👨‍💻 Desarrollo

### Requisitos
- Navegador moderno con soporte ES6+
- Servidor local (Python, Node.js o PHP)
- Conexión a internet para las APIs

### Contribuir
Las contribuciones son bienvenidas:
1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -am 'Añade nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Código de Conducta
- Código limpio y bien documentado
- Commits descriptivos
- Pruebas antes de hacer PR
- Respeto a la comunidad

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la **Licencia MIT**.

## 🙏 Créditos

- **OpenStreetMap**: Datos de negocios y mapas
- **Nominatim**: Geocodificación
- **Overpass API**: Búsqueda de POIs
- **Google Fonts**: Tipografías Inter y Outfit
- **Unsplash**: Imágenes de alta calidad
- **Iconos**: SVG personalizados

## 💡 Soporte

Para preguntas, bugs o sugerencias:
- Abre un issue en el repositorio
- Consulta la documentación de las APIs
- Revisa la consola del navegador para errores

## 🌟 Características Destacadas

- ✅ **100% Gratuito**: No requiere API keys ni costos
- ✅ **Datos Reales**: Negocios reales de OpenStreetMap
- ✅ **Sin Dependencias**: JavaScript vanilla puro
- ✅ **SEO Optimizado**: Webs generadas listas para posicionar
- ✅ **Responsive**: Funciona en todos los dispositivos
- ✅ **Rápido**: Carga y genera webs en segundos
- ✅ **Profesional**: Diseño premium que impresiona
- ✅ **Escalable**: Código modular y mantenible

---

**Desarrollado con ❤️ usando tecnologías web modernas y APIs gratuitas**

*Última actualización: Enero 2026*
