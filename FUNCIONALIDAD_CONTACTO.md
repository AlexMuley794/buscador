# 📧💬 FUNCIONALIDAD DE CONTACTO - BUSCARNEGOCIOS

**Fecha:** 15 de Enero de 2026  
**Versión:** 1.1.0  
**Estado:** ✅ IMPLEMENTADO Y FUNCIONAL

---

## 🎯 DESCRIPCIÓN

Nueva funcionalidad que permite **contactar directamente** con los negocios encontrados mediante **Email** o **WhatsApp**, utilizando plantillas de mensaje personalizables.

---

## ✨ CARACTERÍSTICAS PRINCIPALES

### 1. **Botones de Contacto en Tarjetas**
- ✅ Cada tarjeta de negocio incluye dos botones de contacto:
  - 📧 **Email**: Abre el cliente de email con mensaje pre-configurado
  - 💬 **WhatsApp**: Abre WhatsApp Web/App con mensaje pre-configurado
- ✅ El botón de WhatsApp se **deshabilita automáticamente** si el negocio no tiene teléfono
- ✅ Diseño moderno con gradientes y efectos hover

### 2. **Configuración de Plantillas**
- ✅ Botón "Configurar Mensajes" en la página principal
- ✅ Modal completo para editar plantillas
- ✅ Dos plantillas independientes:
  - **Email**: Asunto + Cuerpo del mensaje
  - **WhatsApp**: Mensaje de texto
- ✅ Guía visual de variables disponibles

### 3. **Variables Dinámicas**
Las plantillas soportan variables que se reemplazan automáticamente:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `{nombre}` | Nombre del negocio | "Restaurante El Sol" |
| `{direccion}` | Dirección completa | "Calle Mayor, 10, Madrid" |
| `{telefono}` | Teléfono de contacto | "+34 912 345 678" |
| `{categoria}` | Categoría del negocio | "Restaurante" |

### 4. **Persistencia de Datos**
- ✅ Las plantillas se guardan en **localStorage**
- ✅ Se mantienen entre sesiones del navegador
- ✅ Opción de "Restablecer" a valores por defecto

---

## 🚀 CÓMO USAR

### Paso 1: Configurar Plantillas (Opcional)

1. Haz clic en **"Configurar Mensajes"** en la página principal
2. Edita las plantillas de Email y WhatsApp
3. Usa las variables disponibles: `{nombre}`, `{direccion}`, `{telefono}`, `{categoria}`
4. Haz clic en **"Guardar Plantillas"**

**Ejemplo de plantilla de WhatsApp:**
```
Hola! 👋

Vi su negocio *{nombre}* en {direccion} y me gustaría obtener más información.

¿Tienen disponibilidad esta semana?

Gracias! 😊
```

### Paso 2: Buscar Negocios

1. Introduce un código postal
2. Haz clic en "Buscar"
3. Espera a que se carguen los resultados

### Paso 3: Contactar Negocio

#### Para enviar Email:
1. Haz clic en el botón **"📧 Email"** en la tarjeta del negocio
2. Se abrirá tu cliente de email predeterminado
3. El asunto y cuerpo estarán pre-rellenados
4. Revisa el mensaje y envía

#### Para enviar WhatsApp:
1. Haz clic en el botón **"💬 WhatsApp"** en la tarjeta del negocio
2. Se abrirá WhatsApp Web o la aplicación
3. El mensaje estará pre-escrito
4. Revisa y envía

---

## 📋 PLANTILLAS POR DEFECTO

### Email

**Asunto:**
```
Consulta sobre sus servicios - {nombre}
```

**Cuerpo:**
```
Estimado/a equipo de {nombre},

Me pongo en contacto con ustedes porque estoy interesado/a en conocer más sobre sus servicios.

He encontrado su negocio ubicado en {direccion} y me gustaría obtener más información.

¿Podrían proporcionarme detalles sobre:
- Servicios disponibles
- Horarios de atención
- Tarifas y precios

Quedo a la espera de su respuesta.

Saludos cordiales
```

### WhatsApp

```
Hola! 👋

Vi su negocio *{nombre}* en {direccion} y me gustaría obtener más información sobre sus servicios.

¿Podrían ayudarme?

Gracias! 😊
```

---

## 🔧 DETALLES TÉCNICOS

### Archivos Modificados/Creados

1. **`messages.js`** (NUEVO)
   - Sistema completo de gestión de mensajes
   - Funciones de envío de Email y WhatsApp
   - Gestión de plantillas con localStorage
   - Sistema de notificaciones (toasts)

2. **`index.html`**
   - Modal de configuración de mensajes
   - Botón de configuración en header
   - Script de messages.js incluido

3. **`styles.css`**
   - Estilos para modal de configuración
   - Estilos para botones de contacto
   - Estilos para formularios y variables
   - Estilos para notificaciones toast
   - Diseño responsive

4. **`app.js`**
   - Integración de botones de contacto en tarjetas
   - Llamada a `createContactButtons(business)`

### Funciones Principales

```javascript
// Enviar email
sendEmail(business)

// Enviar WhatsApp
sendWhatsApp(business)

// Crear botones de contacto
createContactButtons(business)

// Abrir modal de configuración
openMessageConfigModal()

// Guardar plantillas
saveTemplates()

// Restablecer plantillas
resetTemplates()

// Mostrar notificación
showToast(message, type)
```

### Formato de Teléfono para WhatsApp

El sistema maneja automáticamente diferentes formatos de teléfono:

- `+34 912 345 678` → `+34912345678`
- `912 345 678` → `+34912345678`
- `34912345678` → `+34912345678`
- `912345678` → `+34912345678`

---

## 🎨 DISEÑO Y UX

### Botones de Contacto

- **Email**: Gradiente azul-verde (colores de Google)
- **WhatsApp**: Gradiente verde (colores de WhatsApp)
- **Hover**: Elevación con sombra
- **Disabled**: Opacidad reducida + cursor not-allowed

### Modal de Configuración

- **Diseño**: Modal centrado con overlay oscuro
- **Secciones**: Email y WhatsApp separadas visualmente
- **Variables**: Grid responsive con códigos destacados
- **Botones**: Restablecer (secundario) + Guardar (primario)

### Notificaciones Toast

- **Posición**: Esquina inferior derecha
- **Animación**: Slide-in desde la derecha
- **Auto-cierre**: 3 segundos
- **Tipos**: Success (verde), Error (rojo), Info (azul)

---

## 💡 CASOS DE USO

### 1. Consulta de Servicios
```
Plantilla: Consulta general sobre servicios
Uso: Pedir información sobre lo que ofrece el negocio
Canal: Email o WhatsApp
```

### 2. Solicitud de Presupuesto
```
Plantilla: Solicitud de presupuesto personalizado
Uso: Pedir cotización para un servicio específico
Canal: Email (más formal)
```

### 3. Reserva o Cita
```
Plantilla: Solicitud de reserva/cita
Uso: Agendar una visita o servicio
Canal: WhatsApp (más rápido)
```

### 4. Consulta Rápida
```
Plantilla: Pregunta breve
Uso: Consultar horarios, disponibilidad, etc.
Canal: WhatsApp (respuesta inmediata)
```

---

## ⚙️ CONFIGURACIÓN AVANZADA

### Personalizar Plantillas por Categoría

Puedes crear plantillas diferentes según el tipo de negocio:

**Ejemplo para Restaurantes:**
```
Hola! 👋

Vi su restaurante *{nombre}* y me gustaría hacer una reserva.

¿Tienen disponibilidad para 4 personas este sábado a las 21:00?

Gracias!
```

**Ejemplo para Gimnasios:**
```
Hola! 👋

Estoy interesado/a en conocer las tarifas y horarios de *{nombre}*.

¿Ofrecen clases de prueba gratuitas?

Gracias!
```

### Agregar Más Variables

Para añadir nuevas variables, edita `messages.js`:

```javascript
function replaceVariables(template, business) {
    let result = template;
    
    result = result.replace(/{nombre}/g, business.name || 'el negocio');
    result = result.replace(/{direccion}/g, business.address || 'su ubicación');
    result = result.replace(/{telefono}/g, business.phone || 'su teléfono');
    result = result.replace(/{categoria}/g, business.category || 'su categoría');
    
    // Añadir nuevas variables aquí
    result = result.replace(/{horario}/g, business.hours || 'su horario');
    result = result.replace(/{rating}/g, business.rating || 'su calificación');
    
    return result;
}
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### El botón de WhatsApp está deshabilitado
- **Causa**: El negocio no tiene teléfono en su información
- **Solución**: Usa el botón de Email o busca el teléfono manualmente

### El email no se abre
- **Causa**: No tienes un cliente de email configurado
- **Solución**: Configura un cliente de email (Gmail, Outlook, etc.) o copia el mensaje manualmente

### WhatsApp no se abre
- **Causa**: El número de teléfono puede estar mal formateado
- **Solución**: Verifica que el teléfono sea válido en la tarjeta del negocio

### Las plantillas no se guardan
- **Causa**: localStorage puede estar deshabilitado
- **Solución**: Verifica la configuración de privacidad de tu navegador

---

## 📊 ESTADÍSTICAS Y MÉTRICAS

### Funcionalidades Implementadas
- ✅ Configuración de plantillas
- ✅ Envío de Email
- ✅ Envío de WhatsApp
- ✅ Variables dinámicas (4 variables)
- ✅ Persistencia con localStorage
- ✅ Notificaciones toast
- ✅ Validación de teléfonos
- ✅ Diseño responsive

### Líneas de Código
- **messages.js**: ~350 líneas
- **styles.css**: ~300 líneas (nuevas)
- **index.html**: ~100 líneas (nuevas)
- **Total**: ~750 líneas de código nuevo

---

## 🚀 PRÓXIMAS MEJORAS

### Prioridad Alta
1. **Plantillas múltiples**: Guardar varias plantillas y elegir cuál usar
2. **Historial de contactos**: Registrar qué negocios has contactado
3. **Integración con CRM**: Exportar contactos a sistemas externos

### Prioridad Media
4. **Plantillas por categoría**: Plantillas automáticas según tipo de negocio
5. **Programación de mensajes**: Enviar mensajes en horarios específicos
6. **Análisis de respuestas**: Tracking de respuestas recibidas

### Prioridad Baja
7. **Mensajes masivos**: Contactar múltiples negocios a la vez
8. **Integración con Telegram**: Añadir opción de Telegram
9. **SMS**: Envío de SMS para negocios sin WhatsApp

---

## 📝 NOTAS IMPORTANTES

### Privacidad
- ✅ No se envían datos a servidores externos
- ✅ Las plantillas se guardan solo en tu navegador
- ✅ Los mensajes se envían directamente desde tu dispositivo

### Compatibilidad
- ✅ **Email**: Funciona en todos los navegadores con cliente de email
- ✅ **WhatsApp**: Requiere WhatsApp instalado o WhatsApp Web
- ✅ **Móvil**: Totalmente funcional en dispositivos móviles

### Limitaciones
- ⚠️ No se pueden enviar emails automáticamente (requiere confirmación del usuario)
- ⚠️ WhatsApp requiere que el usuario tenga la app instalada
- ⚠️ Algunos navegadores pueden bloquear la apertura de enlaces mailto:

---

## 🎉 CONCLUSIÓN

La funcionalidad de contacto está **100% implementada y funcional**. Permite a los usuarios:

✅ Configurar plantillas personalizadas de Email y WhatsApp  
✅ Contactar negocios con un solo clic  
✅ Usar variables dinámicas para personalizar mensajes  
✅ Guardar configuración entre sesiones  
✅ Disfrutar de una interfaz moderna y responsive  

**¡Listo para usar!** 🚀

---

**Desarrollado con ❤️ por Antigravity AI**  
**Última actualización:** 15 de Enero de 2026
