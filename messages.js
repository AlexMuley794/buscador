// ============================================
// SISTEMA DE MENSAJES - BUSCARNEGOCIOS
// ============================================
// Gestión de plantillas de email y WhatsApp
// para contactar negocios automáticamente
// ============================================

// Plantillas por defecto
const DEFAULT_TEMPLATES = {
    email: {
        subject: 'Consulta sobre sus servicios - {nombre}',
        body: `Estimado/a equipo de {nombre},

Me pongo en contacto con ustedes porque estoy interesado/a en conocer más sobre sus servicios.

He encontrado su negocio ubicado en {direccion} y me gustaría obtener más información.

¿Podrían proporcionarme detalles sobre:
- Servicios disponibles
- Horarios de atención
- Tarifas y precios

Quedo a la espera de su respuesta.

Saludos cordiales`
    },
    whatsapp: {
        message: `Hola! 👋

Vi su negocio *{nombre}* en {direccion} y me gustaría obtener más información sobre sus servicios.

¿Podrían ayudarme?

Gracias! 😊`
    }
};

// Estado de las plantillas
let messageTemplates = { ...DEFAULT_TEMPLATES };

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeMessageSystem();
});

function initializeMessageSystem() {
    // Cargar plantillas guardadas
    loadTemplates();

    // Configurar event listeners
    setupMessageEventListeners();

    console.log('✅ Sistema de mensajes inicializado');
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupMessageEventListeners() {
    // Botón de configuración
    const configBtn = document.getElementById('configMessagesBtn');
    if (configBtn) {
        configBtn.addEventListener('click', openMessageConfigModal);
    }

    // Botón de cerrar modal
    const closeBtn = document.getElementById('closeMessageConfig');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMessageConfigModal);
    }

    // Botón de guardar plantillas
    const saveBtn = document.getElementById('saveTemplates');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveTemplates);
    }

    // Botón de restablecer plantillas
    const resetBtn = document.getElementById('resetTemplates');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTemplates);
    }

    // Cerrar modal al hacer clic en el overlay
    const modalOverlays = document.querySelectorAll('#messageConfigModal .modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', closeMessageConfigModal);
    });
}

// ============================================
// GESTIÓN DEL MODAL
// ============================================

function openMessageConfigModal() {
    const modal = document.getElementById('messageConfigModal');
    if (!modal) return;

    // Cargar valores actuales en los campos
    document.getElementById('emailSubject').value = messageTemplates.email.subject;
    document.getElementById('emailBody').value = messageTemplates.email.body;
    document.getElementById('whatsappMessage').value = messageTemplates.whatsapp.message;

    // Mostrar modal
    modal.classList.remove('hidden');

    // Animación de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeMessageConfigModal() {
    const modal = document.getElementById('messageConfigModal');
    if (!modal) return;

    modal.classList.add('hidden');
}

// ============================================
// GESTIÓN DE PLANTILLAS
// ============================================

function loadTemplates() {
    try {
        const saved = localStorage.getItem('messageTemplates');
        if (saved) {
            messageTemplates = JSON.parse(saved);
            console.log('✅ Plantillas cargadas desde localStorage');
        } else {
            messageTemplates = { ...DEFAULT_TEMPLATES };
            console.log('ℹ️ Usando plantillas por defecto');
        }
    } catch (error) {
        console.error('Error al cargar plantillas:', error);
        messageTemplates = { ...DEFAULT_TEMPLATES };
    }
}

function saveTemplates() {
    try {
        // Obtener valores de los campos
        const emailSubject = document.getElementById('emailSubject').value.trim();
        const emailBody = document.getElementById('emailBody').value.trim();
        const whatsappMessage = document.getElementById('whatsappMessage').value.trim();

        // Validar que no estén vacíos
        if (!emailSubject || !emailBody || !whatsappMessage) {
            showToast('⚠️ Por favor, completa todos los campos', 'error');
            return;
        }

        // Actualizar plantillas
        messageTemplates = {
            email: {
                subject: emailSubject,
                body: emailBody
            },
            whatsapp: {
                message: whatsappMessage
            }
        };

        // Guardar en localStorage
        localStorage.setItem('messageTemplates', JSON.stringify(messageTemplates));

        // Mostrar confirmación
        showToast('✅ Plantillas guardadas correctamente', 'success');

        // Cerrar modal después de un breve delay
        setTimeout(() => {
            closeMessageConfigModal();
        }, 1000);

        console.log('✅ Plantillas guardadas');
    } catch (error) {
        console.error('Error al guardar plantillas:', error);
        showToast('❌ Error al guardar plantillas', 'error');
    }
}

function resetTemplates() {
    if (confirm('¿Estás seguro de que quieres restablecer las plantillas a los valores por defecto?')) {
        // Restablecer a valores por defecto
        messageTemplates = { ...DEFAULT_TEMPLATES };

        // Actualizar campos del formulario
        document.getElementById('emailSubject').value = messageTemplates.email.subject;
        document.getElementById('emailBody').value = messageTemplates.email.body;
        document.getElementById('whatsappMessage').value = messageTemplates.whatsapp.message;

        // Guardar en localStorage
        localStorage.setItem('messageTemplates', JSON.stringify(messageTemplates));

        showToast('✅ Plantillas restablecidas', 'success');
        console.log('✅ Plantillas restablecidas a valores por defecto');
    }
}

// ============================================
// REEMPLAZO DE VARIABLES
// ============================================

function replaceVariables(template, business) {
    let result = template;

    // Reemplazar variables
    result = result.replace(/{nombre}/g, business.name || 'el negocio');
    result = result.replace(/{direccion}/g, business.address || 'su ubicación');
    result = result.replace(/{telefono}/g, business.phone || 'su teléfono');
    result = result.replace(/{categoria}/g, business.category || 'su categoría');

    return result;
}

// ============================================
// EXTRACCIÓN DE EMAIL REAL DEL WEBSITE
// ============================================

async function extractEmailFromWebsite(websiteUrl) {
    try {
        console.log('🔍 Intentando extraer email de:', websiteUrl);

        // Usar un servicio proxy CORS para obtener el contenido del website
        // Nota: Esto puede no funcionar con todos los sitios debido a CORS
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(websiteUrl), {
            method: 'GET',
            headers: {
                'Accept': 'text/html'
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo acceder al website');
        }

        const html = await response.text();

        // Buscar emails en el HTML usando expresiones regulares
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emails = html.match(emailRegex);

        if (!emails || emails.length === 0) {
            console.log('⚠️ No se encontraron emails en el website');
            return null;
        }

        // Filtrar emails comunes no deseados (spam, ejemplos, etc.)
        const filteredEmails = emails.filter(email => {
            const lowerEmail = email.toLowerCase();
            return !lowerEmail.includes('example.com') &&
                !lowerEmail.includes('sentry.io') &&
                !lowerEmail.includes('google.com') &&
                !lowerEmail.includes('facebook.com') &&
                !lowerEmail.includes('twitter.com') &&
                !lowerEmail.includes('instagram.com') &&
                !lowerEmail.includes('linkedin.com') &&
                !lowerEmail.includes('youtube.com') &&
                !lowerEmail.includes('wix.com') &&
                !lowerEmail.includes('wordpress.com') &&
                !lowerEmail.includes('.png') &&
                !lowerEmail.includes('.jpg') &&
                !lowerEmail.includes('.gif');
        });

        if (filteredEmails.length === 0) {
            console.log('⚠️ No se encontraron emails válidos');
            return null;
        }

        // Priorizar emails comunes de contacto
        const priorityEmails = filteredEmails.filter(email => {
            const lowerEmail = email.toLowerCase();
            return lowerEmail.startsWith('info@') ||
                lowerEmail.startsWith('contacto@') ||
                lowerEmail.startsWith('contact@') ||
                lowerEmail.startsWith('hola@') ||
                lowerEmail.startsWith('hello@') ||
                lowerEmail.startsWith('ventas@') ||
                lowerEmail.startsWith('reservas@');
        });

        // Usar email prioritario si existe, sino el primero encontrado
        const selectedEmail = priorityEmails.length > 0 ? priorityEmails[0] : filteredEmails[0];

        console.log('✅ Email encontrado:', selectedEmail);
        console.log('📧 Total de emails encontrados:', filteredEmails.length);

        return selectedEmail;

    } catch (error) {
        console.error('❌ Error al extraer email del website:', error);
        return null;
    }
}

// Función para obtener el email del negocio (con caché)
const emailCache = new Map();

async function getBusinessEmail(business) {
    // Si ya tenemos el email en el objeto business, usarlo
    if (business.email && business.email !== 'No disponible') {
        return business.email;
    }

    // Si no hay website, no podemos extraer email
    if (!business.website) {
        return null;
    }

    // Verificar caché
    if (emailCache.has(business.website)) {
        const cached = emailCache.get(business.website);
        console.log('📦 Email obtenido de caché:', cached);
        return cached;
    }

    // Intentar extraer email del website
    showToast('🔍 Buscando email en el website...', 'info');
    const extractedEmail = await extractEmailFromWebsite(business.website);

    if (extractedEmail) {
        // Guardar en caché
        emailCache.set(business.website, extractedEmail);
        business.email = extractedEmail; // Actualizar el objeto business
        showToast(`✅ Email encontrado: ${extractedEmail}`, 'success');
        return extractedEmail;
    }

    // Si no se pudo extraer, intentar inferir del dominio
    try {
        const domain = new URL(business.website).hostname.replace('www.', '');
        const inferredEmail = `info@${domain}`;
        console.log('🔍 Email inferido del dominio:', inferredEmail);
        return inferredEmail;
    } catch (e) {
        return null;
    }
}


// ============================================
// ENVÍO DE MENSAJES
// ============================================

async function sendEmail(business) {
    try {
        // Intentar obtener el email real del negocio
        let recipientEmail = await getBusinessEmail(business);

        if (recipientEmail) {
            // Tenemos un email (extraído o inferido)
            console.log('📧 Email del negocio:', recipientEmail);

            const subject = encodeURIComponent(replaceVariables(messageTemplates.email.subject, business));
            const body = encodeURIComponent(replaceVariables(messageTemplates.email.body, business));

            // Crear enlace mailto con el email
            const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

            // Abrir cliente de email
            window.location.href = mailtoLink;

            showToast(`📧 Abriendo email para ${recipientEmail}...`, 'success');
            console.log('📧 Email preparado para:', business.name);

            return true;
        } else {
            // No se pudo obtener email
            const confirmSend = confirm(
                `⚠️ NO SE PUDO OBTENER EL EMAIL\n\n` +
                `No se encontró un email para "${business.name}".\n\n` +
                `Razones posibles:\n` +
                `• El website no tiene email público\n` +
                `• El negocio no tiene website\n` +
                `• Problemas de acceso al website\n\n` +
                `Alternativas:\n` +
                `1. Visita el website: ${business.website || 'No disponible'}\n` +
                `2. Llama al teléfono: ${business.phone}\n` +
                `3. Usa WhatsApp si está disponible\n\n` +
                `¿Quieres abrir tu cliente de email para escribir manualmente?`
            );

            if (!confirmSend) {
                return false;
            }

            // Abrir email sin destinatario
            const subject = encodeURIComponent(replaceVariables(messageTemplates.email.subject, business));
            const body = encodeURIComponent(replaceVariables(messageTemplates.email.body, business));
            const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
            showToast('📧 Abriendo cliente de email... Completa el destinatario', 'success');

            return true;
        }

    } catch (error) {
        console.error('Error al enviar email:', error);
        showToast('❌ Error al preparar el email', 'error');
        return false;
    }
}


function sendWhatsApp(business) {
    try {
        // Verificar que el negocio tenga teléfono REAL de Google Maps
        if (!business.phone || business.phone === 'No disponible') {
            showToast('⚠️ Este negocio no tiene teléfono disponible en Google Maps', 'error');

            // Ofrecer alternativa
            if (business.website) {
                const openWebsite = confirm(
                    `Este negocio no tiene teléfono público.\n\n` +
                    `¿Quieres visitar su sitio web para buscar información de contacto?\n\n` +
                    `${business.website}`
                );

                if (openWebsite) {
                    window.open(business.website, '_blank');
                }
            }

            return false;
        }

        // Limpiar el número de teléfono (quitar espacios, guiones, paréntesis, puntos, etc.)
        let phoneNumber = business.phone
            .replace(/\s/g, '')
            .replace(/-/g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .replace(/\./g, '');

        // Normalizar el número de teléfono español
        // Si el número empieza con +34, dejarlo así
        // Si no, asumimos que es español y añadimos +34
        if (!phoneNumber.startsWith('+')) {
            if (phoneNumber.startsWith('34')) {
                phoneNumber = '+' + phoneNumber;
            } else if (phoneNumber.startsWith('6') || phoneNumber.startsWith('7') || phoneNumber.startsWith('9')) {
                phoneNumber = '+34' + phoneNumber;
            } else {
                // Si no reconocemos el formato, intentar de todas formas
                phoneNumber = '+34' + phoneNumber;
            }
        }

        console.log('📱 Teléfono original:', business.phone);
        console.log('📱 Teléfono formateado:', phoneNumber);

        // Preparar mensaje
        const message = encodeURIComponent(replaceVariables(messageTemplates.whatsapp.message, business));

        // Crear enlace de WhatsApp
        // Usar wa.me para compatibilidad universal (funciona en móvil y escritorio)
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

        // Abrir WhatsApp en nueva ventana
        window.open(whatsappLink, '_blank');

        showToast(`💬 Abriendo WhatsApp para ${business.phone}...`, 'success');
        console.log('💬 WhatsApp preparado para:', business.name, '-', phoneNumber);

        return true;
    } catch (error) {
        console.error('Error al enviar WhatsApp:', error);
        showToast('❌ Error al abrir WhatsApp', 'error');
        return false;
    }
}


// ============================================
// CREAR BOTONES DE CONTACTO
// ============================================

function createContactButtons(business) {
    const hasPhone = business.phone && business.phone !== 'No disponible';

    return `
        <div class="contact-buttons">
            <button class="btn-contact btn-email" onclick="sendEmail(${JSON.stringify(business).replace(/"/g, '&quot;')})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
            </button>
            <button class="btn-contact btn-whatsapp" 
                    onclick="sendWhatsApp(${JSON.stringify(business).replace(/"/g, '&quot;')})"
                    ${!hasPhone ? 'disabled title="Teléfono no disponible"' : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                WhatsApp
            </button>
        </div>
    `;
}

// ============================================
// NOTIFICACIONES (TOAST)
// ============================================

function showToast(message, type = 'success') {
    // Eliminar toast anterior si existe
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Crear nuevo toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
    `;

    document.body.appendChild(toast);

    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================

// Hacer funciones disponibles globalmente
window.sendEmail = sendEmail;
window.sendWhatsApp = sendWhatsApp;
window.createContactButtons = createContactButtons;
window.openMessageConfigModal = openMessageConfigModal;
window.closeMessageConfigModal = closeMessageConfigModal;
