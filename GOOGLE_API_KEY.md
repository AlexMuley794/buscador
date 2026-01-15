# 🔑 Cómo Obtener tu API Key de Google Maps

Para que la aplicación muestre **negocios reales de Google Maps**, necesitas una API Key de Google Cloud Platform.

## 📋 Pasos para Obtener la API Key

### 1. Crear una Cuenta de Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Acepta los términos de servicio

### 2. Crear un Nuevo Proyecto

1. Haz clic en el selector de proyectos (arriba a la izquierda)
2. Haz clic en **"Nuevo Proyecto"**
3. Dale un nombre: **"BuscaNegocios"**
4. Haz clic en **"Crear"**
5. Espera unos segundos y selecciona el proyecto creado

### 3. Habilitar las APIs Necesarias

Necesitas habilitar 3 APIs:

#### A) Places API
1. Ve a: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
2. Haz clic en **"Habilitar"**
3. Espera a que se active

#### B) Maps JavaScript API
1. Ve a: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
2. Haz clic en **"Habilitar"**
3. Espera a que se active

#### C) Geocoding API
1. Ve a: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com
2. Haz clic en **"Habilitar"**
3. Espera a que se active

### 4. Crear la API Key

1. Ve a: https://console.cloud.google.com/apis/credentials
2. Haz clic en **"Crear credenciales"**
3. Selecciona **"Clave de API"**
4. Se creará tu API Key
5. **COPIA LA CLAVE** (algo como: `AIzaSyD...`)

### 5. (Opcional pero Recomendado) Restringir la API Key

Para mayor seguridad:

1. Haz clic en **"Editar clave de API"**
2. En **"Restricciones de aplicación"**:
   - Selecciona **"Referentes HTTP (sitios web)"**
   - Añade: `http://localhost:8000/*`
   - Añade: `http://127.0.0.1:8000/*`
3. En **"Restricciones de API"**:
   - Selecciona **"Restringir clave"**
   - Marca:
     - ✅ Places API
     - ✅ Maps JavaScript API
     - ✅ Geocoding API
4. Haz clic en **"Guardar"**

### 6. Configurar Facturación (Requerido)

Google requiere una tarjeta de crédito, pero ofrece:
- **$200 USD de crédito gratis cada mes**
- No se cobra hasta que lo uses todo
- Para uso normal, NO pagarás nada

1. Ve a: https://console.cloud.google.com/billing
2. Haz clic en **"Vincular cuenta de facturación"**
3. Sigue los pasos para añadir tu tarjeta
4. Activa la cuenta de facturación

**IMPORTANTE:** Con el uso normal de esta aplicación, NO gastarás los $200 gratuitos mensuales.

---

## 🔧 Configurar la Aplicación

### Opción 1: Editar app.js

1. Abre el archivo `app.js`
2. Busca la línea 6:
```javascript
GOOGLE_MAPS_API_KEY: 'YOUR_API_KEY',
```
3. Reemplaza `YOUR_API_KEY` con tu clave real:
```javascript
GOOGLE_MAPS_API_KEY: 'AIzaSyD...',  // Tu clave aquí
```
4. Guarda el archivo

### Opción 2: Editar index.html

1. Abre el archivo `index.html`
2. Busca la línea 133:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap" async defer></script>
```
3. Reemplaza `YOUR_API_KEY` con tu clave real:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD...&libraries=places&callback=initMap" async defer></script>
```
4. Guarda el archivo

---

## ✅ Verificar que Funciona

1. Recarga la página en el navegador (F5)
2. Introduce un código postal (ej: **04001** para Almería)
3. Haz clic en "Buscar"
4. Deberías ver negocios reales de Google Maps

---

## 💰 Costos y Límites

### Cuota Gratuita Mensual
Google ofrece **$200 USD gratis cada mes**, que equivale a:

- **28,500 búsquedas de negocios** (Places Nearby Search)
- **40,000 geocodificaciones** (Geocoding API)
- **28,000 cargas de mapa** (Maps JavaScript API)

### Uso Estimado de esta Aplicación
Por cada búsqueda que hagas:
- 1 geocodificación = $0.005
- 1 búsqueda de negocios = $0.032
- 1 carga de mapa = $0.007

**Total por búsqueda: ~$0.044**

Con $200 gratis puedes hacer **~4,500 búsquedas al mes** sin pagar nada.

### Para Uso Personal
Si usas la aplicación para ti o un pequeño grupo, **NUNCA pagarás**.

---

## 🔒 Seguridad

### Proteger tu API Key

1. **NO compartas tu API Key públicamente**
2. **NO la subas a GitHub sin restricciones**
3. **Usa restricciones de referente HTTP**
4. **Monitorea el uso** en: https://console.cloud.google.com/apis/dashboard

### Restricciones Recomendadas

```
Referentes HTTP permitidos:
- http://localhost:8000/*
- http://127.0.0.1:8000/*
- https://tudominio.com/*  (si lo despliegas)
```

---

## 🐛 Solución de Problemas

### Error: "This API project is not authorized to use this API"
- **Solución:** Asegúrate de habilitar Places API, Maps JavaScript API y Geocoding API

### Error: "The provided API key is invalid"
- **Solución:** Verifica que copiaste la clave completa sin espacios

### Error: "This page can't load Google Maps correctly"
- **Solución:** Necesitas configurar la facturación en Google Cloud

### No aparecen negocios
- **Solución:** 
  1. Verifica que la API key esté correctamente configurada
  2. Abre la consola del navegador (F12) y busca errores
  3. Verifica que las 3 APIs estén habilitadas

### Error de CORS o referente
- **Solución:** Añade `http://localhost:8000/*` a los referentes permitidos

---

## 📞 Soporte de Google

- **Documentación:** https://developers.google.com/maps/documentation
- **Consola de APIs:** https://console.cloud.google.com/apis
- **Facturación:** https://console.cloud.google.com/billing
- **Soporte:** https://cloud.google.com/support

---

## 🎯 Resumen Rápido

1. ✅ Crear proyecto en Google Cloud
2. ✅ Habilitar Places API, Maps JavaScript API, Geocoding API
3. ✅ Crear API Key
4. ✅ Configurar facturación (gratis hasta $200/mes)
5. ✅ Copiar la API Key
6. ✅ Pegarla en `app.js` línea 6
7. ✅ Pegarla en `index.html` línea 133
8. ✅ Recargar la aplicación
9. ✅ ¡Disfrutar de negocios reales de Google Maps!

---

**¿Necesitas ayuda?** Abre la consola del navegador (F12) y revisa los errores.

**Última actualización:** Enero 2026
