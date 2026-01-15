/**
 * CONFIGURACIÓN DE BUSCARNEGOCIOS
 * 
 * Este archivo contiene todas las configuraciones personalizables de la aplicación.
 * Modifica estos valores según tus necesidades.
 */

// ============================================
// CONFIGURACIÓN GENERAL
// ============================================

const APP_CONFIG = {
    // Nombre de la aplicación
    APP_NAME: 'BuscaNegocios',

    // Versión
    VERSION: '1.0.0',

    // País por defecto (código ISO de 2 letras)
    DEFAULT_COUNTRY: 'ES',

    // Radio de búsqueda en metros (5000 = 5km)
    SEARCH_RADIUS: 5000,

    // Número máximo de resultados a mostrar
    MAX_RESULTS: 20,

    // Tiempo de espera para APIs en milisegundos
    API_TIMEOUT: 25000,
};

// ============================================
// CONFIGURACIÓN DE APIS
// ============================================

const API_CONFIG = {
    // Nominatim (Geocodificación)
    NOMINATIM: {
        BASE_URL: 'https://nominatim.openstreetmap.org',
        USER_AGENT: 'BuscaNegocios/1.0',
        // Respetar límite de 1 petición por segundo
        RATE_LIMIT_MS: 1000
    },

    // Overpass API (Búsqueda de negocios)
    OVERPASS: {
        BASE_URL: 'https://overpass-api.de/api/interpreter',
        TIMEOUT: 25,
        // Tipos de negocios a buscar
        AMENITIES: [
            'restaurant',
            'cafe',
            'bar',
            'fast_food',
            'pharmacy',
            'bank',
            'clinic',
            'dentist',
            'doctors',
            'hospital',
            'veterinary',
            'fuel',
            'library',
            'post_office'
        ],
        // Buscar también shops
        INCLUDE_SHOPS: true,
        // Buscar también oficinas
        INCLUDE_OFFICES: true
    },

    // Unsplash (Imágenes)
    UNSPLASH: {
        BASE_URL: 'https://source.unsplash.com',
        DEFAULT_SIZE: '800x600'
    }
};

// ============================================
// CONFIGURACIÓN DE DISEÑO
// ============================================

const DESIGN_CONFIG = {
    // Colores principales (HSL)
    COLORS: {
        PRIMARY_HUE: 260,      // Púrpura
        ACCENT_HUE: 320,       // Rosa
        SATURATION: 85,        // %
        LIGHTNESS: 55,         // %

        // Colores adicionales
        SUCCESS: '#10b981',
        WARNING: '#f59e0b',
        ERROR: '#ef4444',
        INFO: '#3b82f6'
    },

    // Tipografías
    FONTS: {
        PRIMARY: 'Inter',
        HEADING: 'Outfit',
        FALLBACK: 'system-ui, -apple-system, sans-serif'
    },

    // Animaciones
    ANIMATIONS: {
        DURATION_FAST: '0.2s',
        DURATION_NORMAL: '0.3s',
        DURATION_SLOW: '0.5s',
        EASING: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },

    // Breakpoints responsive
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1280
    }
};

// ============================================
// CONFIGURACIÓN DE CONTENIDO
// ============================================

const CONTENT_CONFIG = {
    // Mensajes de la aplicación
    MESSAGES: {
        LOADING: 'Buscando negocios cercanos...',
        NO_RESULTS: 'No se encontraron negocios en esta área.',
        ERROR_GENERIC: 'Error al buscar negocios. Por favor, intenta de nuevo.',
        ERROR_POSTAL_CODE: 'Por favor, introduce un código postal válido.',
        SUCCESS: 'Negocios encontrados con éxito!'
    },

    // Textos de botones
    BUTTONS: {
        SEARCH: 'Buscar Negocios',
        CREATE_WEB: 'Crear Web',
        VIEW_MAP: 'Ver Mapa',
        OPEN_NEW_TAB: 'Abrir en nueva pestaña',
        CLOSE: 'Cerrar',
        RETRY: 'Intentar de nuevo'
    },

    // Placeholders
    PLACEHOLDERS: {
        POSTAL_CODE: 'Ej: 28001, 08001, 41001...'
    }
};

// ============================================
// CONFIGURACIÓN DE CATEGORÍAS DE NEGOCIOS
// ============================================

const BUSINESS_CATEGORIES = {
    // Alimentación
    'restaurant': {
        name: 'Restaurante',
        icon: '🍽️',
        color: '#ef4444',
        services: [
            { title: 'Menú del Día', desc: 'Platos variados y equilibrados cada día' },
            { title: 'Carta Especial', desc: 'Selección de platos gourmet' },
            { title: 'Eventos Privados', desc: 'Celebraciones y reuniones' }
        ]
    },
    'cafe': {
        name: 'Cafetería',
        icon: '☕',
        color: '#92400e',
        services: [
            { title: 'Cafés Especiales', desc: 'Variedades de todo el mundo' },
            { title: 'Repostería Artesanal', desc: 'Dulces hechos en casa' },
            { title: 'Desayunos', desc: 'Opciones saludables y deliciosas' }
        ]
    },
    'bar': {
        name: 'Bar',
        icon: '🍺',
        color: '#f59e0b',
        services: [
            { title: 'Tapas', desc: 'Variedad de tapas tradicionales' },
            { title: 'Cervezas', desc: 'Selección de cervezas artesanales' },
            { title: 'Eventos', desc: 'Retransmisiones deportivas y música' }
        ]
    },

    // Salud
    'pharmacy': {
        name: 'Farmacia',
        icon: '💊',
        color: '#10b981',
        services: [
            { title: 'Medicamentos', desc: 'Amplio catálogo de productos' },
            { title: 'Asesoramiento', desc: 'Consejo farmacéutico profesional' },
            { title: 'Servicios', desc: 'Medición de presión, análisis' }
        ]
    },
    'clinic': {
        name: 'Clínica',
        icon: '🏥',
        color: '#3b82f6',
        services: [
            { title: 'Consultas', desc: 'Atención médica especializada' },
            { title: 'Diagnóstico', desc: 'Pruebas y análisis completos' },
            { title: 'Tratamientos', desc: 'Planes personalizados' }
        ]
    },

    // Comercio
    'supermarket': {
        name: 'Supermercado',
        icon: '🛒',
        color: '#059669',
        services: [
            { title: 'Alimentación', desc: 'Productos frescos diarios' },
            { title: 'Hogar', desc: 'Todo para tu casa' },
            { title: 'Ofertas', desc: 'Promociones semanales' }
        ]
    },
    'clothes': {
        name: 'Ropa',
        icon: '👔',
        color: '#8b5cf6',
        services: [
            { title: 'Moda', desc: 'Últimas tendencias' },
            { title: 'Asesoramiento', desc: 'Personal shopper' },
            { title: 'Arreglos', desc: 'Servicio de ajustes' }
        ]
    },

    // Servicios
    'hairdresser': {
        name: 'Peluquería',
        icon: '💇',
        color: '#ec4899',
        services: [
            { title: 'Corte y Peinado', desc: 'Estilos personalizados' },
            { title: 'Coloración', desc: 'Técnicas avanzadas' },
            { title: 'Tratamientos', desc: 'Cuidado capilar profesional' }
        ]
    },
    'car_repair': {
        name: 'Taller',
        icon: '🔧',
        color: '#64748b',
        services: [
            { title: 'Mecánica', desc: 'Reparaciones generales' },
            { title: 'Diagnosis', desc: 'Equipos profesionales' },
            { title: 'Mantenimiento', desc: 'Revisiones periódicas' }
        ]
    },

    // Cultura
    'library': {
        name: 'Biblioteca',
        icon: '📚',
        color: '#7c3aed',
        services: [
            { title: 'Préstamo', desc: 'Miles de libros disponibles' },
            { title: 'Sala de Estudio', desc: 'Espacios tranquilos' },
            { title: 'Actividades', desc: 'Eventos culturales' }
        ]
    },

    // Default
    'default': {
        name: 'Negocio',
        icon: '🏪',
        color: '#6b7280',
        services: [
            { title: 'Servicio Premium', desc: 'Calidad garantizada' },
            { title: 'Atención Personalizada', desc: 'Nos adaptamos a ti' },
            { title: 'Profesionales Expertos', desc: 'Años de experiencia' }
        ]
    }
};

// ============================================
// CONFIGURACIÓN DE CÓDIGOS POSTALES
// ============================================

const POSTAL_CODES = {
    // Coordenadas de respaldo para códigos postales comunes
    FALLBACK_COORDINATES: {
        // Madrid
        '28001': { lat: 40.4168, lng: -3.7038, city: 'Madrid' },
        '28002': { lat: 40.4200, lng: -3.7050, city: 'Madrid' },
        '28013': { lat: 40.4200, lng: -3.7100, city: 'Madrid' },

        // Barcelona
        '08001': { lat: 41.3851, lng: 2.1734, city: 'Barcelona' },
        '08002': { lat: 41.3800, lng: 2.1750, city: 'Barcelona' },
        '08003': { lat: 41.3850, lng: 2.1800, city: 'Barcelona' },

        // Sevilla
        '41001': { lat: 37.3891, lng: -5.9845, city: 'Sevilla' },
        '41002': { lat: 37.3900, lng: -5.9900, city: 'Sevilla' },

        // Valencia
        '46001': { lat: 39.4699, lng: -0.3763, city: 'Valencia' },
        '46002': { lat: 39.4750, lng: -0.3800, city: 'Valencia' },

        // Málaga
        '29001': { lat: 36.7213, lng: -4.4214, city: 'Málaga' },
        '29002': { lat: 36.7250, lng: -4.4250, city: 'Málaga' },

        // Bilbao
        '48001': { lat: 43.2630, lng: -2.9350, city: 'Bilbao' },

        // Zaragoza
        '50001': { lat: 41.6488, lng: -0.8891, city: 'Zaragoza' },

        // Alicante
        '03001': { lat: 38.3452, lng: -0.4815, city: 'Alicante' },

        // Murcia
        '30001': { lat: 37.9922, lng: -1.1307, city: 'Murcia' },

        // A Coruña
        '15001': { lat: 43.3623, lng: -8.4115, city: 'A Coruña' },

        // Oviedo
        '33001': { lat: 43.3614, lng: -5.8593, city: 'Oviedo' },

        // Valladolid
        '47001': { lat: 41.6523, lng: -4.7245, city: 'Valladolid' },

        // Granada
        '18001': { lat: 37.1773, lng: -3.5986, city: 'Granada' }
    }
};

// ============================================
// EXPORTAR CONFIGURACIÓN
// ============================================

// Si estás usando módulos ES6, descomenta esto:
// export { APP_CONFIG, API_CONFIG, DESIGN_CONFIG, CONTENT_CONFIG, BUSINESS_CATEGORIES, POSTAL_CODES };

// Para uso en navegador (sin módulos), las variables ya están disponibles globalmente

console.log('✅ Configuración cargada:', {
    app: APP_CONFIG.APP_NAME,
    version: APP_CONFIG.VERSION,
    country: APP_CONFIG.DEFAULT_COUNTRY,
    radius: `${APP_CONFIG.SEARCH_RADIUS}m`,
    maxResults: APP_CONFIG.MAX_RESULTS
});
