# ⚠️ IMPORTANTE: Configuración Requerida para Negocios Reales de Google Maps

## 🎯 Estado Actual

La aplicación está configurada para usar **Google Places API** que muestra **negocios reales de Google Maps**.

**PERO NECESITAS CONFIGURAR TU API KEY PRIMERO**

---

## 🚀 Inicio Rápido (3 pasos)

### 1️⃣ Obtener API Key de Google Maps

Sigue la guía completa en: **[GOOGLE_API_KEY.md](GOOGLE_API_KEY.md)**

Resumen rápido:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto
3. Habilita: Places API, Maps JavaScript API, Geocoding API
4. Crea una API Key
5. Configura facturación (gratis hasta $200/mes)

### 2️⃣ Configurar la API Key

Edita **2 archivos**:

**A) app.js** (línea 6):
```javascript
GOOGLE_MAPS_API_KEY: 'TU_API_KEY_AQUI',  // Reemplaza esto
```

**B) index.html** (línea 133):
```html
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&libraries=places&callback=initMap"></script>
```

### 3️⃣ Probar la Aplicación

```bash
# El servidor ya está corriendo en:
http://localhost:8000

# Prueba con códigos postales reales:
- 04001 (Almería)
- 28001 (Madrid)
- 08001 (Barcelona)
```

---

## 💡 ¿Por qué Google Places?

### Ventajas
✅ **Datos 100% reales** de Google Maps  
✅ **Información completa**: nombres, direcciones, teléfonos, horarios  
✅ **Fotos reales** de los negocios  
✅ **Valoraciones reales** de usuarios  
✅ **Siempre actualizado** - datos en tiempo real  
✅ **Cobertura mundial** - funciona en cualquier país  

### Costos
- **$200 USD gratis cada mes**
- Suficiente para ~4,500 búsquedas
- Para uso personal: **GRATIS**
- Solo pagas si superas $200/mes

---

## 🔄 Alternativa: OpenStreetMap (Sin API Key)

Si no quieres usar Google Places, puedes cambiar a OpenStreetMap:

**En app.js** (línea 10):
```javascript
USE_GOOGLE_PLACES: false  // Cambiar a false
```

**Nota:** OpenStreetMap tiene menos negocios y datos menos completos que Google Maps.

---

## 📋 Códigos Postales para Probar

### Almería
- **04001** - Centro de Almería
- **04002** - Almería
- **04003** - Almería

### Otras Ciudades
- **28001** - Madrid Centro
- **08001** - Barcelona Centro
- **41001** - Sevilla Centro
- **46001** - Valencia Centro
- **29001** - Málaga Centro

---

## 🐛 Solución de Problemas

### "No se encontraron negocios"

**Causas posibles:**
1. ❌ No has configurado la API Key
2. ❌ La API Key es incorrecta
3. ❌ No has habilitado las APIs necesarias
4. ❌ No has configurado la facturación

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Sigue las instrucciones de [GOOGLE_API_KEY.md](GOOGLE_API_KEY.md)

### Error: "Google is not defined"

**Causa:** El script de Google Maps no se cargó

**Solución:**
1. Verifica que `index.html` línea 133 tenga tu API Key
2. Recarga la página (F5)
3. Espera unos segundos

### Error: "This API project is not authorized"

**Causa:** No has habilitado las APIs

**Solución:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/apis/library)
2. Habilita: Places API, Maps JavaScript API, Geocoding API

---

## 📚 Documentación Completa

- **[GOOGLE_API_KEY.md](GOOGLE_API_KEY.md)** - Guía paso a paso para obtener API Key
- **[README.md](README.md)** - Documentación general de la aplicación
- **[EJEMPLOS.md](EJEMPLOS.md)** - Ejemplos de uso

---

## ✅ Checklist de Configuración

Antes de usar la aplicación, verifica:

- [ ] He creado un proyecto en Google Cloud
- [ ] He habilitado Places API
- [ ] He habilitado Maps JavaScript API
- [ ] He habilitado Geocoding API
- [ ] He creado una API Key
- [ ] He configurado la facturación
- [ ] He pegado la API Key en `app.js` línea 6
- [ ] He pegado la API Key en `index.html` línea 133
- [ ] He recargado la página en el navegador

---

## 🎯 Resultado Esperado

Cuando todo esté configurado correctamente:

1. Introduces un código postal (ej: **04001**)
2. Haces clic en "Buscar"
3. Ves negocios **REALES** de Almería:
   - Restaurantes con nombres reales
   - Direcciones reales
   - Teléfonos reales
   - Fotos reales
   - Valoraciones reales
   - Horarios reales

---

## 💰 Información de Costos

### Cuota Gratuita
- **$200 USD/mes** gratis
- **~4,500 búsquedas** gratis al mes
- **No se cobra** hasta superar $200

### Por Búsqueda
- Geocodificación: $0.005
- Búsqueda de negocios: $0.032
- Carga de mapa: $0.007
- **Total: ~$0.044 por búsqueda**

### Para Uso Personal
Si usas la aplicación para ti o un pequeño grupo, **NUNCA pagarás nada**.

---

## 🔒 Seguridad

### Protege tu API Key

1. **NO la compartas públicamente**
2. **NO la subas a GitHub sin restricciones**
3. **Usa restricciones de referente HTTP**:
   ```
   http://localhost:8000/*
   http://127.0.0.1:8000/*
   ```

### Monitorear Uso

Ve a: https://console.cloud.google.com/apis/dashboard

---

## 📞 Soporte

### Si tienes problemas:

1. **Lee** [GOOGLE_API_KEY.md](GOOGLE_API_KEY.md)
2. **Abre** la consola del navegador (F12)
3. **Busca** errores en rojo
4. **Verifica** que las 3 APIs estén habilitadas
5. **Confirma** que la facturación esté configurada

### Recursos:
- [Documentación de Google Maps](https://developers.google.com/maps/documentation)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Precios de Google Maps](https://mapsplatform.google.com/pricing/)

---

**Desarrollado con ❤️ - Última actualización: Enero 2026**
