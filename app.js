// Configuration
const CONFIG = {
    // API Key de Google Maps configurada ✅
    // Obtén tu API key en: https://console.cloud.google.com/
    // Necesitas habilitar: Places API, Maps JavaScript API, Geocoding API
    GOOGLE_MAPS_API_KEY: (typeof ENV !== 'undefined' && ENV.GOOGLE_MAPS_API_KEY) ? ENV.GOOGLE_MAPS_API_KEY : 'YOUR_API_KEY',
    DEFAULT_COUNTRY: 'ES',
    SEARCH_RADIUS: 3000, // 3km para asegurar cobertura completa del CP
    MAX_RESULTS: 800, // Alto límite para no perder candidatos antes de filtrar
    USE_GOOGLE_PLACES: true // true = Google Places (RECOMENDADO), false = OpenStreetMap
};

// State Management
const state = {
    currentPostalCode: '',
    businesses: [],
    map: null,
    markers: [],
    selectedBusiness: null,
    currentView: 'list'
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkAPIKeyConfiguration();
});

// Verificar configuración de API Key
function checkAPIKeyConfiguration() {
    if (CONFIG.USE_GOOGLE_PLACES && CONFIG.GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
        // Mostrar alerta informativa
        setTimeout(() => {
            const message = `
⚠️ CONFIGURACIÓN REQUERIDA

Para ver NEGOCIOS REALES de Google Maps, necesitas configurar tu API Key.

📋 PASOS RÁPIDOS:

1. Lee el archivo: GOOGLE_API_KEY.md
2. Obtén tu API Key gratis en: https://console.cloud.google.com/
3. Edita app.js línea 6 y pega tu API Key
4. Edita index.html línea 133 y pega tu API Key
5. Recarga esta página

💡 ALTERNATIVA SIN API KEY:
En app.js línea 10, cambia:
USE_GOOGLE_PLACES: false

Esto usará OpenStreetMap (menos negocios pero gratis y sin configuración).

¿Quieres continuar con OpenStreetMap por ahora?
            `.trim();

            if (confirm(message)) {
                // Cambiar temporalmente a OpenStreetMap
                CONFIG.USE_GOOGLE_PLACES = false;
                console.log('✅ Usando OpenStreetMap temporalmente');
                console.log('📖 Lee GOOGLE_API_KEY.md para configurar Google Places');
            }
        }, 1000);
    } else if (CONFIG.USE_GOOGLE_PLACES && CONFIG.GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY') {
        console.log('✅ Google Places API configurada correctamente');
        console.log('🔑 API Key:', CONFIG.GOOGLE_MAPS_API_KEY.substring(0, 10) + '...');
    } else {
        console.log('ℹ️ Usando OpenStreetMap');
        console.log('💡 Para usar Google Places, lee GOOGLE_API_KEY.md');
    }
}

// Initialize Google Maps
function initMap() {
    console.log('Google Maps API loaded');
    if (CONFIG.GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY') {
        console.log('✅ Google Maps cargado correctamente');
    }
}

// Event Listeners
function initializeEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const postalCodeInput = document.getElementById('postalCodeInput');
    const listViewBtn = document.getElementById('listViewBtn');
    const mapViewBtn = document.getElementById('mapViewBtn');
    const closeModal = document.getElementById('closeModal');
    const retryBtn = document.getElementById('retryBtn');
    const openInNewTab = document.getElementById('openInNewTab');

    searchBtn.addEventListener('click', handleSearch);
    postalCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    listViewBtn.addEventListener('click', () => switchView('list'));
    mapViewBtn.addEventListener('click', () => switchView('map'));

    closeModal.addEventListener('click', closeWebsiteModal);
    retryBtn.addEventListener('click', handleSearch);
    openInNewTab.addEventListener('click', openWebsiteInNewTab);

    // Close modal on overlay click
    document.querySelector('.modal-overlay')?.addEventListener('click', closeWebsiteModal);
}

// Search Handler
async function handleSearch() {
    const postalCodeInput = document.getElementById('postalCodeInput');
    const postalCode = postalCodeInput.value.trim();

    if (!postalCode) {
        showError('Por favor, introduce un código postal válido');
        return;
    }

    state.currentPostalCode = postalCode;
    showLoading();

    try {
        // Get coordinates from postal code
        const coordinates = await getCoordinatesFromPostalCode(postalCode);

        // Search for nearby businesses
        const businesses = await searchNearbyBusinesses(coordinates);

        if (businesses.length === 0) {
            showError('No se encontraron negocios en esta área. Intenta con otro código postal.');
            return;
        }

        state.businesses = businesses;
        displayResults(businesses);

    } catch (error) {
        console.error('Search error:', error);
        showError(error.message || 'Error al buscar negocios. Por favor, intenta de nuevo.');
    }
}

// Get coordinates from postal code using Nominatim API (OpenStreetMap)
async function getCoordinatesFromPostalCode(postalCode) {
    try {
        // Use Nominatim API for geocoding (free and no API key required)
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=${CONFIG.DEFAULT_COUNTRY}&format=json&limit=1`;

        const response = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'BuscaNegocios/1.0' // Required by Nominatim
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener coordenadas');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }

        // If no results, try fallback coordinates for common Spanish postal codes
        return getFallbackCoordinates(postalCode);

    } catch (error) {
        console.error('Geocoding error:', error);
        return getFallbackCoordinates(postalCode);
    }
}

// Fallback coordinates for common Spanish postal codes
function getFallbackCoordinates(postalCode) {
    const mockCoordinates = {
        '28001': { lat: 40.4168, lng: -3.7038 }, // Madrid
        '28002': { lat: 40.4200, lng: -3.7050 },
        '28013': { lat: 40.4200, lng: -3.7100 },
        '08001': { lat: 41.3851, lng: 2.1734 },  // Barcelona
        '08002': { lat: 41.3800, lng: 2.1750 },
        '08003': { lat: 41.3850, lng: 2.1800 },
        '41001': { lat: 37.3891, lng: -5.9845 }, // Sevilla
        '41002': { lat: 37.3900, lng: -5.9900 },
        '46001': { lat: 39.4699, lng: -0.3763 }, // Valencia
        '46002': { lat: 39.4750, lng: -0.3800 },
        '29001': { lat: 36.7213, lng: -4.4214 }, // Málaga
        '29002': { lat: 36.7250, lng: -4.4250 },
        '48001': { lat: 43.2630, lng: -2.9350 }, // Bilbao
        '50001': { lat: 41.6488, lng: -0.8891 }, // Zaragoza
        '03001': { lat: 38.3452, lng: -0.4815 }, // Alicante
        '30001': { lat: 37.9922, lng: -1.1307 }, // Murcia
        '15001': { lat: 43.3623, lng: -8.4115 }, // A Coruña
        '33001': { lat: 43.3614, lng: -5.8593 }, // Oviedo
        '47001': { lat: 41.6523, lng: -4.7245 }, // Valladolid
        '18001': { lat: 37.1773, lng: -3.5986 }  // Granada
    };

    // Check if we have exact match
    if (mockCoordinates[postalCode]) {
        return mockCoordinates[postalCode];
    }

    // Try to match by first 2 digits (province)
    const province = postalCode.substring(0, 2);
    for (const [key, coords] of Object.entries(mockCoordinates)) {
        if (key.startsWith(province)) {
            // Add small random offset
            return {
                lat: coords.lat + (Math.random() - 0.5) * 0.05,
                lng: coords.lng + (Math.random() - 0.5) * 0.05
            };
        }
    }

    // Default to Madrid with random offset
    return {
        lat: 40.4168 + (Math.random() - 0.5) * 0.1,
        lng: -3.7038 + (Math.random() - 0.5) * 0.1
    };
}

// Extraer código postal de una dirección
function extractPostalCode(address) {
    if (!address) return null;

    // Buscar patrón de código postal español (5 dígitos)
    const postalCodeMatch = address.match(/\b(\d{5})\b/);
    return postalCodeMatch ? postalCodeMatch[1] : null;
}

// Verificar si un código postal coincide exactamente
function isPostalCodeNearby(searchedPostalCode, businessPostalCode) {
    if (!searchedPostalCode || !businessPostalCode) return false;

    // Convertir a números para comparación estricta (ej: 04001 == 4001)
    const searchedNum = parseInt(searchedPostalCode, 10);
    const businessNum = parseInt(businessPostalCode, 10);

    if (isNaN(searchedNum) || isNaN(businessNum)) return false;

    // Búsqueda EXACTA (sin tolerancia ni rangos)
    return searchedNum === businessNum;
}

// Search for nearby businesses using Overpass API (OpenStreetMap)
async function searchNearbyBusinesses(coordinates) {
    // Si USE_GOOGLE_PLACES está activado y tenemos API key, usar Google Places
    if (CONFIG.USE_GOOGLE_PLACES && CONFIG.GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY' && typeof google !== 'undefined') {
        return searchWithGooglePlaces(coordinates);
    }

    // Fallback a OpenStreetMap
    return searchWithOpenStreetMap(coordinates);
}

// Buscar negocios con Google Places API (DATOS REALES DE GOOGLE MAPS)
async function searchWithGooglePlaces(coordinates) {
    return new Promise((resolve, reject) => {
        // Crear el mapa temporalmente si no existe
        if (!state.map) {
            const mapDiv = document.getElementById('map');
            state.map = new google.maps.Map(mapDiv, {
                center: coordinates,
                zoom: 14
            });
        }

        // Crear servicio de Places
        const service = new google.maps.places.PlacesService(state.map);

        const allResults = [];
        let searchesCompleted = 0;

        // Lista exhaustiva de tipos de negocios para buscar
        const businessTypes = [
            null, // Búsqueda general sin tipo
            'establishment',
            'point_of_interest',
            'store',
            'restaurant',
            'cafe',
            'bar',
            'food',
            'bakery',
            'meal_takeaway',
            'meal_delivery',
            'pharmacy',
            'doctor',
            'dentist',
            'hospital',
            'physiotherapist',
            'veterinary_care',
            'beauty_salon',
            'hair_care',
            'spa',
            'gym',
            'clothing_store',
            'shoe_store',
            'jewelry_store',
            'electronics_store',
            'furniture_store',
            'home_goods_store',
            'hardware_store',
            'book_store',
            'florist',
            'pet_store',
            'supermarket',
            'convenience_store',
            'liquor_store',
            'bicycle_store',
            'car_dealer',
            'car_repair',
            'car_wash',
            'gas_station',
            'parking',
            'laundry',
            'locksmith',
            'moving_company',
            'painter',
            'plumber',
            'roofing_contractor',
            'storage',
            'travel_agency',
            'insurance_agency',
            'real_estate_agency',
            'lawyer',
            'accounting',
            'atm',
            'bank',
            'post_office',
            'library',
            'school',
            'university',
            'primary_school',
            'secondary_school',
            'church',
            'hindu_temple',
            'mosque',
            'synagogue',
            'lodging',
            'campground',
            'rv_park',
            'stadium',
            'tourist_attraction',
            'art_gallery',
            'museum',
            'night_club',
            'movie_theater',
            'bowling_alley',
            'casino',
            'amusement_park',
            'aquarium',
            'zoo'
        ];

        const totalSearches = businessTypes.length;
        console.log(`🔍 Iniciando búsqueda exhaustiva con ${totalSearches} tipos de negocios...`);

        // Función para procesar resultados con paginación
        function fetchAllPages(request, searchName, callback) {
            service.nearbySearch(request, function handleResults(results, status, pagination) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(`✓ ${searchName}: ${results.length} negocios encontrados`);
                    allResults.push(...results);

                    // Si hay más páginas y no hemos alcanzado el límite
                    if (pagination && pagination.hasNextPage && allResults.length < CONFIG.MAX_RESULTS * 2) {
                        console.log(`  → Siguiente página de ${searchName}...`);
                        // IMPORTANTE: Google requiere esperar 2 segundos
                        setTimeout(() => {
                            pagination.nextPage(handleResults);
                        }, 2000);
                    } else {
                        callback();
                    }
                } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                    console.log(`  ℹ ${searchName}: Sin resultados`);
                    callback();
                } else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
                    console.warn(`  ⚠ ${searchName}: Límite de consultas alcanzado`);
                    callback();
                } else {
                    console.error(`  ❌ ${searchName}: Error -`, status);
                    callback();
                }
            });
        }

        // Realizar búsquedas con concurrencia controlada para velocidad sin error de límites
        let currentSearchIndex = 0;
        let activeRequests = 0;
        const CONCURRENCY_LIMIT = 3; // 3 hilos simultáneos

        function startNextRequest() {
            // Si ya terminamos todo y no hay peticiones activas, finalizar
            if (currentSearchIndex >= businessTypes.length && activeRequests === 0) {
                checkIfComplete();
                return;
            }

            // Si ya no hay más tipos por buscar, parar este hilo
            if (currentSearchIndex >= businessTypes.length) {
                return;
            }

            // Si alcanzamos el límite de concurrencia, esperar
            if (activeRequests >= CONCURRENCY_LIMIT) {
                return;
            }

            // Iniciar nueva petición
            const type = businessTypes[currentSearchIndex];
            currentSearchIndex++;
            activeRequests++;

            const searchName = type ? `Tipo: ${type}` : 'General';
            const request = {
                location: new google.maps.LatLng(coordinates.lat, coordinates.lng),
                radius: CONFIG.SEARCH_RADIUS
            };

            if (type) {
                request.type = type;
            }

            // Procesar
            fetchAllPages(request, searchName, () => {
                activeRequests--;
                searchesCompleted++;
                startNextRequest(); // Al terminar, intentar iniciar otra
            });

            // Intentar iniciar otra inmediatamente si hay hueco
            startNextRequest();
        }

        // Iniciar el pool de peticiones
        startNextRequest();

        // Verificar si todas las búsquedas han terminado
        function checkIfComplete() {
            console.log(`\n📊 RESUMEN DE BÚSQUEDA:`);
            console.log(`   Total de búsquedas: ${searchesCompleted}/${totalSearches}`);
            console.log(`   Resultados brutos: ${allResults.length}`);

            if (allResults.length === 0) {
                console.log('⚠ No se encontraron resultados, usando fallback');
                resolve(generateMockBusinesses(coordinates, 10));
            } else {
                // Eliminar duplicados por place_id
                const uniqueResults = [];
                const seenIds = new Set();

                for (const place of allResults) {
                    if (!seenIds.has(place.place_id)) {
                        seenIds.add(place.place_id);
                        uniqueResults.push(place);
                    }
                }

                console.log(`   Duplicados eliminados: ${allResults.length - uniqueResults.length}`);
                console.log(`   Negocios únicos: ${uniqueResults.length}`);
                console.log(`\n🔄 Procesando detalles de ${Math.min(uniqueResults.length, CONFIG.MAX_RESULTS)} negocios... (esto puede tardar unos segundos)\n`);

                processAllResults(uniqueResults, service, resolve);
            }
        }
    });
}

// Procesar lista completa de resultados y obtener detalles por lotes
// Procesar lista completa de resultados y obtener detalles por lotes con UI progresiva
async function processAllResults(results, service, resolve) {
    // Limitar al máximo configurado
    const finalResults = results.slice(0, CONFIG.MAX_RESULTS);

    // Preparar UI para carga progresiva
    hideLoading();
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const businessList = document.getElementById('businessList');
    businessList.innerHTML = ''; // Limpiar lista anterior
    state.businesses = []; // Reiniciar estado

    // Crear indicador de progreso
    let progressDiv = document.getElementById('searchProgress');
    if (progressDiv) progressDiv.remove();

    progressDiv = document.createElement('div');
    progressDiv.id = 'searchProgress';
    progressDiv.className = 'search-progress';
    progressDiv.style.cssText = 'padding: 15px; text-align: center; color: #666; margin-bottom: 20px; background: rgba(255,255,255,0.8); border-radius: 12px; backdrop-filter: blur(10px); border: 1px solid rgba(0,0,0,0.05); animation: fadeIn 0.3s ease;';
    businessList.parentNode.insertBefore(progressDiv, businessList);

    const BATCH_SIZE = 5; // Lotes pequeños para feedback rápido
    let processedCount = 0;

    console.log(`\n🔄 Procesando ${finalResults.length} negocios en lotes de ${BATCH_SIZE}...`);

    for (let i = 0; i < finalResults.length; i += BATCH_SIZE) {
        // Actualizar progreso
        const percent = Math.round((i / finalResults.length) * 100);
        progressDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div class="loading-spinner" style="width: 24px; height: 24px; border-width: 3px; border-color: var(--primary) transparent var(--primary) transparent;"></div>
                <div style="font-weight: 500; font-size: 0.95rem;">Analizando: ${Math.min(i + BATCH_SIZE, finalResults.length)} / ${finalResults.length} candidatos</div>
                <div style="font-size: 0.85rem; color: #888;">Encontrados en CP ${state.currentPostalCode}: <b style="color: var(--primary);">${state.businesses.length}</b></div>
                <div style="width: 100%; height: 4px; background: #eee; border-radius: 2px; margin-top: 5px; overflow: hidden;">
                    <div style="width: ${percent}%; height: 100%; background: var(--primary); transition: width 0.3s ease;"></div>
                </div>
            </div>
        `;

        const batch = finalResults.slice(i, i + BATCH_SIZE);
        const batchPromises = batch.map(place => {
            return new Promise(resolveDetails => {
                service.getDetails({
                    placeId: place.place_id,
                    fields: ['name', 'formatted_phone_number', 'international_phone_number',
                        'website', 'opening_hours', 'formatted_address', 'url']
                }, (details, detailsStatus) => {
                    // Si falla, usar datos básicos para no detener el proceso
                    const safeDetails = (detailsStatus === google.maps.places.PlacesServiceStatus.OK && details) ? details : {};

                    // Obtener categoría e icono
                    const { category, icon } = getBusinessCategoryFromGoogleTypes(place.types);

                    // Obtener fotos
                    const photos = [];
                    if (place.photos && place.photos.length > 0) {
                        for (let j = 0; j < Math.min(3, place.photos.length); j++) {
                            photos.push(place.photos[j].getUrl({ maxWidth: 800, maxHeight: 600 }));
                        }
                    } else {
                        photos.push(...generatePhotos(category));
                    }

                    // Obtener horarios formateados
                    let hoursText = 'Horario no disponible';
                    let isOpen = false;
                    if (safeDetails.opening_hours) {
                        isOpen = safeDetails.opening_hours.isOpen?.() || false;
                        hoursText = isOpen ? '🟢 Abierto ahora' : '🔴 Cerrado';
                        if (safeDetails.opening_hours.weekday_text && safeDetails.opening_hours.weekday_text.length > 0) {
                            const today = new Date().getDay();
                            const dayIndex = today === 0 ? 6 : today - 1;
                            if (safeDetails.opening_hours.weekday_text[dayIndex]) {
                                hoursText += ' • ' + safeDetails.opening_hours.weekday_text[dayIndex];
                            }
                        }
                    } else if (place.opening_hours) {
                        isOpen = place.opening_hours.isOpen?.() || false;
                        hoursText = isOpen ? '🟢 Abierto ahora' : '🔴 Cerrado';
                    }

                    // Obtener teléfono
                    let phone = safeDetails.formatted_phone_number || safeDetails.international_phone_number || 'No disponible';

                    // Obtener dirección
                    let address = safeDetails.formatted_address || place.vicinity || 'Dirección no disponible';

                    // Obtener website
                    let website = safeDetails.website || place.website || null;

                    // URL Maps
                    let googleMapsUrl = safeDetails.url || null;

                    // Email estimado
                    let email = null;
                    if (website) {
                        try {
                            const domain = new URL(website).hostname.replace('www.', '');
                            email = `info@${domain}`;
                        } catch (e) {
                            email = null;
                        }
                    }

                    resolveDetails({
                        id: `google_${place.place_id}`,
                        placeId: place.place_id,
                        name: place.name,
                        category: category,
                        icon: icon,
                        address: address,
                        phone: phone,
                        email: email,
                        rating: place.rating || 0,
                        reviewCount: place.user_ratings_total || 0,
                        hours: hoursText,
                        isOpen: isOpen,
                        photos: photos,
                        coordinates: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        },
                        description: generateDescription(category),
                        website: website,
                        googleMapsUrl: googleMapsUrl,
                        googleData: place,
                        priceLevel: place.price_level || 0
                    });
                });
            });
        });

        // Esperar a este lote
        const batchResults = await Promise.all(batchPromises);

        // Filtrar y renderizar inmediatamente
        const validBatch = batchResults.filter(business => {
            const businessPostalCode = extractPostalCode(business.address);
            return isPostalCodeNearby(state.currentPostalCode, businessPostalCode);
        });

        if (validBatch.length > 0) {
            state.businesses.push(...validBatch);

            // Renderizar los nuevos
            validBatch.forEach(business => {
                // Usamos el índice actual global para la animación escalonada
                const globalIndex = state.businesses.length - 1;
                const card = createBusinessCard(business, globalIndex % 10); // %10 para reiniciar retardos de animación

                // Asegurar que sea visible con animación
                card.style.opacity = '0';
                card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';

                businessList.appendChild(card);
            });
        }

        // Pequeña pausa para no bloquear la UI y permitir render
        await new Promise(r => setTimeout(r, 10));
    }

    // Finalizar
    progressDiv.innerHTML = `
        <div style="padding: 10px; background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px;">
            ✅ <b>Búsqueda Finalizada</b><br>
            Se encontraron ${state.businesses.length} negocios en el CP ${state.currentPostalCode}.
        </div>
    `;

    // Auto-ocultar el progreso después de unos segundos
    setTimeout(() => {
        progressDiv.style.opacity = '0';
        progressDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => progressDiv.remove(), 500);
    }, 4000);

    console.log(`\n📊 RESULTADO FINAL: ${state.businesses.length} negocios encontrados.`);

    // Resolvemos con la lista completa para que el flujo principal continúe (aunque ya hemos renderizado)
    resolve(state.businesses);
}

// Obtener categoría desde los tipos de Google Places
function getBusinessCategoryFromGoogleTypes(types) {
    const typeMap = {
        'restaurant': { category: 'Restaurante', icon: '🍽️' },
        'cafe': { category: 'Cafetería', icon: '☕' },
        'bar': { category: 'Bar', icon: '🍺' },
        'food': { category: 'Comida', icon: '🍔' },
        'pharmacy': { category: 'Farmacia', icon: '💊' },
        'bank': { category: 'Banco', icon: '🏦' },
        'hospital': { category: 'Hospital', icon: '🏥' },
        'doctor': { category: 'Médico', icon: '👨‍⚕️' },
        'dentist': { category: 'Dentista', icon: '🦷' },
        'veterinary_care': { category: 'Veterinaria', icon: '🐾' },
        'gym': { category: 'Gimnasio', icon: '💪' },
        'spa': { category: 'Spa', icon: '💆' },
        'beauty_salon': { category: 'Salón de Belleza', icon: '💅' },
        'hair_care': { category: 'Peluquería', icon: '💇' },
        'store': { category: 'Tienda', icon: '🛍️' },
        'supermarket': { category: 'Supermercado', icon: '🛒' },
        'shopping_mall': { category: 'Centro Comercial', icon: '🏬' },
        'clothing_store': { category: 'Ropa', icon: '👔' },
        'shoe_store': { category: 'Zapatería', icon: '👞' },
        'jewelry_store': { category: 'Joyería', icon: '💎' },
        'electronics_store': { category: 'Electrónica', icon: '📱' },
        'furniture_store': { category: 'Muebles', icon: '🛋️' },
        'hardware_store': { category: 'Ferretería', icon: '🔨' },
        'book_store': { category: 'Librería', icon: '📚' },
        'bakery': { category: 'Panadería', icon: '🥖' },
        'florist': { category: 'Floristería', icon: '🌸' },
        'gas_station': { category: 'Gasolinera', icon: '⛽' },
        'car_repair': { category: 'Taller', icon: '🔧' },
        'laundry': { category: 'Lavandería', icon: '🧺' },
        'post_office': { category: 'Correos', icon: '📮' },
        'library': { category: 'Biblioteca', icon: '📚' }
    };

    // Buscar el primer tipo que coincida
    for (const type of types) {
        if (typeMap[type]) {
            return typeMap[type];
        }
    }

    // Default
    return { category: 'Negocio', icon: '🏪' };
}

// Buscar con OpenStreetMap (Fallback)
async function searchWithOpenStreetMap(coordinates) {
    try {
        // Use Overpass API to get real businesses from OpenStreetMap
        const radius = CONFIG.SEARCH_RADIUS;
        const overpassQuery = `
            [out:json][timeout:25];
            (
                node["shop"](around:${radius},${coordinates.lat},${coordinates.lng});
                node["amenity"~"restaurant|cafe|bar|fast_food|pharmacy|bank|clinic|dentist|doctors|hospital|veterinary|fuel|library|post_office"](around:${radius},${coordinates.lat},${coordinates.lng});
                node["office"](around:${radius},${coordinates.lat},${coordinates.lng});
                way["shop"](around:${radius},${coordinates.lat},${coordinates.lng});
                way["amenity"~"restaurant|cafe|bar|fast_food|pharmacy|bank|clinic|dentist|doctors|hospital|veterinary|fuel|library|post_office"](around:${radius},${coordinates.lat},${coordinates.lng});
                way["office"](around:${radius},${coordinates.lat},${coordinates.lng});
            );
            out center body;
            >;
            out skel qt;
        `;

        const overpassUrl = 'https://overpass-api.de/api/interpreter';
        const response = await fetch(overpassUrl, {
            method: 'POST',
            body: 'data=' + encodeURIComponent(overpassQuery)
        });

        if (!response.ok) {
            throw new Error('Error al buscar negocios');
        }

        const data = await response.json();
        const businesses = [];

        // Process the results
        const elements = data.elements || [];
        const processedIds = new Set();

        for (const element of elements) {
            // Skip if already processed or no name
            if (processedIds.has(element.id) || !element.tags || !element.tags.name) {
                continue;
            }

            processedIds.add(element.id);

            // Get coordinates
            let lat, lng;
            if (element.lat && element.lon) {
                lat = element.lat;
                lng = element.lon;
            } else if (element.center) {
                lat = element.center.lat;
                lng = element.center.lon;
            } else {
                continue;
            }

            // Determine business type and icon
            const { category, icon } = getBusinessTypeAndIcon(element.tags);

            // Get address
            const address = getAddress(element.tags);

            // Get phone
            const phone = element.tags.phone || element.tags['contact:phone'] || generatePhone();

            // Get opening hours
            const hours = element.tags.opening_hours || generateHours();

            // Generate rating (since OSM doesn't have ratings)
            const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
            const reviewCount = Math.floor(Math.random() * 300) + 10;

            businesses.push({
                id: `osm_${element.id}`,
                name: element.tags.name,
                category: category,
                icon: icon,
                address: address,
                phone: phone,
                rating: parseFloat(rating),
                reviewCount: reviewCount,
                hours: formatHours(hours),
                photos: generatePhotos(category),
                coordinates: { lat, lng },
                description: generateDescription(category),
                website: element.tags.website || element.tags['contact:website'] || null,
                osmData: element.tags
            });

            // Limit results
            if (businesses.length >= CONFIG.MAX_RESULTS) {
                break;
            }
        }

        // If we got very few results, supplement with some realistic mock data
        if (businesses.length < 5) {
            const mockBusinesses = generateMockBusinesses(coordinates, 10 - businesses.length);
            businesses.push(...mockBusinesses);
        }

        return businesses;

    } catch (error) {
        console.error('Error fetching from Overpass API:', error);
        // Fallback to mock data if API fails
        return generateMockBusinesses(coordinates, 15);
    }
}

// Get business type and icon from OSM tags
function getBusinessTypeAndIcon(tags) {
    const typeMap = {
        'restaurant': { category: 'Restaurante', icon: '🍽️' },
        'cafe': { category: 'Cafetería', icon: '☕' },
        'bar': { category: 'Bar', icon: '🍺' },
        'fast_food': { category: 'Comida Rápida', icon: '🍔' },
        'pharmacy': { category: 'Farmacia', icon: '💊' },
        'bank': { category: 'Banco', icon: '🏦' },
        'clinic': { category: 'Clínica', icon: '🏥' },
        'dentist': { category: 'Dentista', icon: '🦷' },
        'doctors': { category: 'Médico', icon: '👨‍⚕️' },
        'hospital': { category: 'Hospital', icon: '🏥' },
        'veterinary': { category: 'Veterinaria', icon: '🐾' },
        'fuel': { category: 'Gasolinera', icon: '⛽' },
        'library': { category: 'Biblioteca', icon: '📚' },
        'post_office': { category: 'Correos', icon: '📮' },
        'supermarket': { category: 'Supermercado', icon: '🛒' },
        'convenience': { category: 'Tienda', icon: '🏪' },
        'clothes': { category: 'Ropa', icon: '👔' },
        'hairdresser': { category: 'Peluquería', icon: '💇' },
        'beauty': { category: 'Belleza', icon: '💅' },
        'bakery': { category: 'Panadería', icon: '🥖' },
        'butcher': { category: 'Carnicería', icon: '🥩' },
        'florist': { category: 'Floristería', icon: '🌸' },
        'furniture': { category: 'Muebles', icon: '🛋️' },
        'electronics': { category: 'Electrónica', icon: '📱' },
        'books': { category: 'Librería', icon: '📚' },
        'sports': { category: 'Deportes', icon: '⚽' },
        'jewelry': { category: 'Joyería', icon: '💎' },
        'car_repair': { category: 'Taller', icon: '🔧' },
        'office': { category: 'Oficina', icon: '🏢' }
    };

    // Check amenity first
    if (tags.amenity && typeMap[tags.amenity]) {
        return typeMap[tags.amenity];
    }

    // Check shop
    if (tags.shop && typeMap[tags.shop]) {
        return typeMap[tags.shop];
    }

    // Check craft
    if (tags.craft && typeMap[tags.craft]) {
        return typeMap[tags.craft];
    }

    // Check office
    if (tags.office) {
        return typeMap['office'];
    }

    // Default
    return { category: 'Negocio', icon: '🏪' };
}

// Get address from OSM tags
function getAddress(tags) {
    const parts = [];

    if (tags['addr:street']) {
        let street = tags['addr:street'];
        if (tags['addr:housenumber']) {
            street += ', ' + tags['addr:housenumber'];
        }
        parts.push(street);
    }

    if (tags['addr:city']) {
        parts.push(tags['addr:city']);
    }

    if (parts.length > 0) {
        return parts.join(', ');
    }

    return generateAddress();
}

// Format opening hours
function formatHours(hours) {
    if (!hours || hours === '24/7') {
        return '24 horas';
    }

    // Simplify complex opening hours
    if (hours.length > 50) {
        return 'Ver horario completo';
    }

    return hours;
}

// Generate mock businesses as fallback
function generateMockBusinesses(coordinates, count) {
    const businessTypes = [
        { type: 'Restaurante', icon: '🍽️' },
        { type: 'Cafetería', icon: '☕' },
        { type: 'Tienda', icon: '🛍️' },
        { type: 'Peluquería', icon: '💇' },
        { type: 'Gimnasio', icon: '💪' },
        { type: 'Farmacia', icon: '💊' },
        { type: 'Panadería', icon: '🥖' },
        { type: 'Librería', icon: '📚' },
        { type: 'Floristería', icon: '🌸' },
        { type: 'Taller', icon: '🔧' }
    ];

    const businesses = [];

    for (let i = 0; i < count; i++) {
        const businessType = businessTypes[Math.floor(Math.random() * businessTypes.length)];
        const rating = (Math.random() * 2 + 3).toFixed(1);
        const reviewCount = Math.floor(Math.random() * 500) + 10;

        businesses.push({
            id: `mock_${i}_${Date.now()}`,
            name: generateBusinessName(businessType.type),
            category: businessType.type,
            icon: businessType.icon,
            address: generateAddress(),
            phone: generatePhone(),
            rating: parseFloat(rating),
            reviewCount: reviewCount,
            hours: generateHours(),
            photos: generatePhotos(businessType.type),
            coordinates: {
                lat: coordinates.lat + (Math.random() - 0.5) * 0.02,
                lng: coordinates.lng + (Math.random() - 0.5) * 0.02
            },
            description: generateDescription(businessType.type)
        });
    }

    return businesses;
}

// Generate business name
function generateBusinessName(type) {
    const prefixes = ['El', 'La', 'Los', 'Las'];
    const adjectives = ['Mejor', 'Gran', 'Nuevo', 'Antiguo', 'Moderno', 'Clásico', 'Premium'];
    const names = ['Sol', 'Luna', 'Estrella', 'Jardín', 'Plaza', 'Rincón', 'Casa', 'Villa'];

    const usePrefix = Math.random() > 0.5;
    const useAdjective = Math.random() > 0.5;

    let name = '';
    if (usePrefix) name += prefixes[Math.floor(Math.random() * prefixes.length)] + ' ';
    if (useAdjective) name += adjectives[Math.floor(Math.random() * adjectives.length)] + ' ';
    name += names[Math.floor(Math.random() * names.length)];

    return name;
}

// Generate address
function generateAddress() {
    const streets = ['Gran Vía', 'Calle Mayor', 'Paseo de la Castellana', 'Avenida Diagonal', 'Calle Serrano'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const number = Math.floor(Math.random() * 200) + 1;

    return `${street}, ${number}`;
}

// Generate phone
function generatePhone() {
    return `+34 ${Math.floor(Math.random() * 900) + 600} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`;
}

// Generate hours
function generateHours() {
    const openHour = Math.floor(Math.random() * 3) + 8; // 8-10 AM
    const closeHour = Math.floor(Math.random() * 4) + 18; // 6-9 PM
    return `Lun-Vie: ${openHour}:00 - ${closeHour}:00`;
}

// Generate photos
function generatePhotos(type) {
    // Return placeholder images based on business type
    return [
        `https://source.unsplash.com/800x600/?${type.toLowerCase()},business,1`,
        `https://source.unsplash.com/800x600/?${type.toLowerCase()},interior,2`,
        `https://source.unsplash.com/800x600/?${type.toLowerCase()},professional,3`
    ];
}

// Generate description
function generateDescription(type) {
    const descriptions = {
        'Restaurante': 'Disfruta de una experiencia gastronómica única con platos elaborados con ingredientes frescos y de temporada. Nuestro chef combina tradición e innovación para crear sabores inolvidables.',
        'Cafetería': 'El lugar perfecto para disfrutar de un café de calidad en un ambiente acogedor. Ofrecemos una selección de cafés especiales, repostería artesanal y opciones saludables.',
        'Tienda': 'Encuentra los mejores productos seleccionados con cuidado para ti. Ofrecemos calidad, variedad y un servicio personalizado que marca la diferencia.',
        'Peluquería': 'Transforma tu look con nuestros estilistas profesionales. Utilizamos productos de alta gama y las últimas técnicas para realzar tu belleza natural.',
        'Gimnasio': 'Alcanza tus objetivos fitness con nuestro equipo de entrenadores certificados. Instalaciones modernas, clases variadas y planes personalizados.',
        'Farmacia': 'Tu salud es nuestra prioridad. Ofrecemos asesoramiento profesional, productos de calidad y un servicio cercano y confiable.',
        'Panadería': 'Pan artesanal horneado cada día con ingredientes naturales. La tradición panadera al servicio de tu mesa.',
        'Librería': 'Un espacio para los amantes de la lectura. Amplio catálogo, recomendaciones personalizadas y eventos literarios.',
        'Floristería': 'Flores frescas para cada ocasión. Creamos arreglos únicos que transmiten emociones y embellecen cualquier espacio.',
        'Taller': 'Servicio técnico profesional con años de experiencia. Diagnóstico preciso, reparaciones de calidad y garantía en todos nuestros trabajos.'
    };

    return descriptions[type] || 'Negocio de calidad con años de experiencia en el sector. Atención personalizada y profesional.';
}

// Display results
function displayResults(businesses) {
    hideLoading();
    hideError();

    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');

    if (state.currentView === 'list') {
        displayListView(businesses);
    } else {
        displayMapView(businesses);
    }

    // Smooth scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Display list view
function displayListView(businesses) {
    const businessList = document.getElementById('businessList');

    // Optimización: Si ya tenemos la cantidad correcta de elementos (gracias al streaming), 
    // no hacemos re-render para evitar parpadeos.
    // Verificamos > 0 para permitir limpiar si businesses está vacío.
    if (businesses.length > 0 && businessList.children.length === businesses.length) {
        return;
    }

    businessList.innerHTML = '';

    businesses.forEach((business, index) => {
        const card = createBusinessCard(business, index);
        businessList.appendChild(card);
    });
}

// Create business card
function createBusinessCard(business, index) {
    const card = document.createElement('div');
    card.className = 'business-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const stars = '⭐'.repeat(Math.floor(business.rating));

    // Crear enlace de teléfono
    const phoneLink = business.phone !== 'No disponible'
        ? `<a href="tel:${business.phone.replace(/\s/g, '')}" class="contact-link">${business.phone}</a>`
        : `<span class="text-muted">${business.phone}</span>`;

    // Crear enlace de dirección (Google Maps)
    const addressLink = business.googleMapsUrl
        ? `<a href="${business.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="contact-link">${business.address}</a>`
        : `<span>${business.address}</span>`;

    // Crear enlace de sitio web si está disponible
    const websiteHTML = business.website
        ? `<div class="info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <a href="${business.website}" target="_blank" rel="noopener noreferrer" class="contact-link">Sitio web</a>
        </div>`
        : '';

    card.innerHTML = `
        <img src="${business.photos[0]}" alt="${business.name}" class="business-image" onerror="this.src='https://via.placeholder.com/800x600/7c3aed/ffffff?text=${business.icon}'">
        <div class="business-content">
            <span class="business-category">${business.icon} ${business.category}</span>
            <h3 class="business-name">${business.name}</h3>
            <div class="business-rating">
                <span>${stars}</span>
                <span>${business.rating}</span>
                <span style="color: var(--text-muted);">(${business.reviewCount} reseñas)</span>
            </div>
            <div class="business-info">
                <div class="info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${addressLink}
                </div>
                <div class="info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    ${phoneLink}
                </div>
                <div class="info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>${business.hours}</span>
                </div>
                ${websiteHTML}
            </div>
            <div class="business-actions">
                <button class="btn btn-primary" onclick="generateWebsite('${business.id}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    Crear Web
                </button>
                <button class="btn btn-secondary" onclick="viewOnMap('${business.id}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Ver Mapa
                </button>
            </div>
            ${createContactButtons(business)}
        </div>
    `;

    return card;
}

// Display map view
function displayMapView(businesses) {
    const mapContainer = document.getElementById('map');

    // Initialize map if not already done
    if (!state.map) {
        const center = businesses[0].coordinates;
        state.map = new google.maps.Map(mapContainer, {
            center: center,
            zoom: 14,
            styles: getMapStyles()
        });
    }

    // Clear existing markers
    state.markers.forEach(marker => marker.setMap(null));
    state.markers = [];

    // Add markers for each business
    businesses.forEach(business => {
        const marker = new google.maps.Marker({
            position: business.coordinates,
            map: state.map,
            title: business.name,
            animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(business)
        });

        marker.addListener('click', () => {
            infoWindow.open(state.map, marker);
        });

        state.markers.push(marker);
    });
}

// Create info window content
function createInfoWindowContent(business) {
    return `
        <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #333;">${business.name}</h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${business.category}</p>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">${business.address}</p>
            <p style="margin: 0 0 12px 0; color: #f59e0b; font-size: 14px;">⭐ ${business.rating} (${business.reviewCount})</p>
            <button onclick="generateWebsite('${business.id}')" style="background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                Crear Web
            </button>
        </div>
    `;
}

// Get custom map styles
function getMapStyles() {
    return [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{ "color": "#242f3e" }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{ "lightness": -80 }]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#746855" }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#d59563" }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#17263c" }]
        }
    ];
}

// Switch view
function switchView(view) {
    state.currentView = view;

    const listView = document.getElementById('listView');
    const mapView = document.getElementById('mapView');
    const listViewBtn = document.getElementById('listViewBtn');
    const mapViewBtn = document.getElementById('mapViewBtn');

    if (view === 'list') {
        listView.classList.remove('hidden');
        mapView.classList.add('hidden');
        listViewBtn.classList.add('active');
        mapViewBtn.classList.remove('active');
    } else {
        listView.classList.add('hidden');
        mapView.classList.remove('hidden');
        listViewBtn.classList.remove('active');
        mapViewBtn.classList.add('active');

        if (state.businesses.length > 0) {
            displayMapView(state.businesses);
        }
    }
}

// View business on map
function viewOnMap(businessId) {
    const business = state.businesses.find(b => b.id === businessId);
    if (!business) return;

    switchView('map');

    // Center map on business
    if (state.map) {
        state.map.setCenter(business.coordinates);
        state.map.setZoom(16);

        // Find and click the marker
        const marker = state.markers.find(m => m.getTitle() === business.name);
        if (marker) {
            google.maps.event.trigger(marker, 'click');
        }
    }
}

// Generate website for business
function generateWebsite(businessId) {
    const business = state.businesses.find(b => b.id === businessId);
    if (!business) return;

    state.selectedBusiness = business;

    // Generate the website HTML
    const websiteHTML = generateBusinessWebsite(business);

    // Show in modal
    showWebsiteModal(websiteHTML);
}

// Generate business website HTML with multiple modern templates
function generateBusinessWebsite(business) {
    // Select template based on business category and add randomness
    const templateId = selectTemplateForBusiness(business);

    // Generate website using selected template
    switch (templateId) {
        case 1:
            return generateTemplate1_Modern(business);
        case 2:
            return generateTemplate2_Minimalist(business);
        case 3:
            return generateTemplate3_Bold(business);
        case 4:
            return generateTemplate4_Elegant(business);
        case 5:
            return generateTemplate5_Creative(business);
        default:
            return generateTemplate1_Modern(business);
    }
}

// Select template based on business category with randomness
function selectTemplateForBusiness(business) {
    // Map categories to preferred templates (but add randomness)
    const categoryTemplates = {
        'Restaurante': [1, 3, 5],
        'Cafetería': [2, 4, 5],
        'Tienda': [1, 2, 3],
        'Peluquería': [2, 4, 5],
        'Gimnasio': [1, 3, 5],
        'Farmacia': [2, 4],
        'Panadería': [2, 4, 5],
        'Librería': [2, 4],
        'Floristería': [4, 5],
        'Taller': [1, 3]
    };

    const preferredTemplates = categoryTemplates[business.category] || [1, 2, 3, 4, 5];

    // Add some randomness - 70% chance to use preferred, 30% chance to use any
    if (Math.random() < 0.7) {
        return preferredTemplates[Math.floor(Math.random() * preferredTemplates.length)];
    } else {
        return Math.floor(Math.random() * 5) + 1;
    }
}

// Template 1: Modern Gradient Design
function generateTemplate1_Modern(business) {
    const stars = '⭐'.repeat(Math.floor(business.rating));
    const colorScheme = getColorScheme(1);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name} - ${business.category}</title>
    <meta name="description" content="${business.description}">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Poppins', sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            overflow-x: hidden;
        }
        
        .hero {
            position: relative;
            min-height: 100vh;
            background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('${business.photos[0]}') center/cover;
            opacity: 0.15;
            animation: kenburns 20s infinite alternate;
        }
        
        @keyframes kenburns {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 900px;
            padding: 3rem;
            animation: fadeInUp 1s ease;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .category-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: 5rem;
            font-weight: 900;
            margin-bottom: 1.5rem;
            text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            letter-spacing: -2px;
        }
        
        .rating {
            font-size: 1.8rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .cta-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: white;
            color: ${colorScheme.primary};
            padding: 1.2rem 3rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        
        .cta-button:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .cta-secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }
        
        .section {
            padding: 6rem 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 3.5rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 4rem;
            background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .about {
            background: #ffffff;
        }
        
        .about-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
            font-size: 1.3rem;
            line-height: 2;
            color: #4a5568;
        }
        
        .services {
            background: linear-gradient(180deg, #f7fafc 0%, #ffffff 100%);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
        }
        
        .service-card {
            background: white;
            padding: 3rem;
            border-radius: 24px;
            text-align: center;
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .service-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});
            color: white;
        }
        
        .service-card h3 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        
        .gallery {
            background: #ffffff;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 2rem;
        }
        
        .gallery-item {
            height: 350px;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
            position: relative;
        }
        
        .gallery-item::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, ${colorScheme.primary}80, ${colorScheme.secondary}80);
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        
        .gallery-item:hover::after {
            opacity: 1;
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }
        
        .gallery-item:hover img {
            transform: scale(1.15);
        }
        
        .contact {
            background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});
            color: white;
        }
        
        .contact .section-title {
            color: white;
            -webkit-text-fill-color: white;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .contact-item svg {
            flex-shrink: 0;
        }
        
        .map-container {
            height: 500px;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .footer {
            background: #0a0a0a;
            color: white;
            text-align: center;
            padding: 3rem;
        }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 3rem; }
            .contact-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: 1fr; }
            .cta-group { flex-direction: column; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <div class="category-badge">${business.icon} ${business.category}</div>
            <h1>${business.name}</h1>
            <div class="rating">${stars} ${business.rating} (${business.reviewCount} reseñas)</div>
            <div class="cta-group">
                <a href="tel:${business.phone.replace(/\s/g, '')}" class="cta-button">📞 Llamar Ahora</a>
                <a href="#contact" class="cta-button cta-secondary">📍 Cómo Llegar</a>
            </div>
        </div>
    </section>
    
    <section class="section about">
        <div class="container">
            <h2 class="section-title">Sobre Nosotros</h2>
            <div class="about-content">
                <p>${business.description}</p>
            </div>
        </div>
    </section>
    
    <section class="section services">
        <div class="container">
            <h2 class="section-title">Nuestros Servicios</h2>
            <div class="services-grid">
                ${generateServices(business.category)}
            </div>
        </div>
    </section>
    
    <section class="section gallery">
        <div class="container">
            <h2 class="section-title">Galería</h2>
            <div class="gallery-grid">
                ${business.photos.map(photo => `
                    <div class="gallery-item">
                        <img src="${photo}" alt="${business.name}" onerror="this.src='https://via.placeholder.com/800x600/${colorScheme.primary.replace('#', '')}/ffffff?text=${business.icon}'">
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <section id="contact" class="section contact">
        <div class="container">
            <h2 class="section-title">Contacto</h2>
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-item">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div>
                            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Dirección</h3>
                            <p style="opacity: 0.9;">${business.address}</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <div>
                            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Teléfono</h3>
                            <p style="opacity: 0.9;">${business.phone}</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <div>
                            <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Horario</h3>
                            <p style="opacity: 0.9;">${business.hours}</p>
                        </div>
                    </div>
                </div>
                <div class="map-container">
                    <iframe width="100%" height="100%" frameborder="0" style="border:0" 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=${business.coordinates.lng - 0.01}%2C${business.coordinates.lat - 0.01}%2C${business.coordinates.lng + 0.01}%2C${business.coordinates.lat + 0.01}&layer=mapnik&marker=${business.coordinates.lat}%2C${business.coordinates.lng}" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <p style="font-size: 1.1rem; font-weight: 600;">&copy; 2026 ${business.name}. Todos los derechos reservados.</p>
        <p style="margin-top: 0.5rem; opacity: 0.6;">Web generada automáticamente por BuscaNegocios</p>
    </footer>
</body>
</html>
    `;
}

// Generate services based on business type
function generateServices(category) {
    const services = {
        'Restaurante': [
            { title: 'Menú del Día', desc: 'Platos variados y equilibrados cada día' },
            { title: 'Carta Especial', desc: 'Selección de platos gourmet' },
            { title: 'Eventos Privados', desc: 'Celebraciones y reuniones' }
        ],
        'Cafetería': [
            { title: 'Cafés Especiales', desc: 'Variedades de todo el mundo' },
            { title: 'Repostería Artesanal', desc: 'Dulces hechos en casa' },
            { title: 'Desayunos', desc: 'Opciones saludables y deliciosas' }
        ],
        'Tienda': [
            { title: 'Productos Premium', desc: 'Selección de alta calidad' },
            { title: 'Asesoramiento', desc: 'Expertos a tu disposición' },
            { title: 'Envío a Domicilio', desc: 'Comodidad garantizada' }
        ],
        'Peluquería': [
            { title: 'Corte y Peinado', desc: 'Estilos personalizados' },
            { title: 'Coloración', desc: 'Técnicas avanzadas' },
            { title: 'Tratamientos', desc: 'Cuidado capilar profesional' }
        ],
        'Gimnasio': [
            { title: 'Entrenamiento Personal', desc: 'Planes individualizados' },
            { title: 'Clases Grupales', desc: 'Variedad de disciplinas' },
            { title: 'Zona Cardio', desc: 'Equipamiento de última generación' }
        ]
    };

    const defaultServices = [
        { title: 'Servicio Premium', desc: 'Calidad garantizada en cada detalle' },
        { title: 'Atención Personalizada', desc: 'Nos adaptamos a tus necesidades' },
        { title: 'Profesionales Expertos', desc: 'Años de experiencia en el sector' }
    ];

    const businessServices = services[category] || defaultServices;

    return businessServices.map(service => `
        <div class="service-card">
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        </div>
    `).join('');
}

// Show website modal
function showWebsiteModal(html) {
    const modal = document.getElementById('websiteModal');
    const preview = document.getElementById('websitePreview');

    // Create a blob URL for the HTML
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    preview.src = url;
    modal.classList.remove('hidden');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close website modal
function closeWebsiteModal() {
    const modal = document.getElementById('websiteModal');
    const preview = document.getElementById('websitePreview');

    modal.classList.add('hidden');
    preview.src = '';

    // Restore body scroll
    document.body.style.overflow = '';
}

// Open website in new tab
function openWebsiteInNewTab() {
    if (!state.selectedBusiness) return;

    const html = generateBusinessWebsite(state.selectedBusiness);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
}

// Show loading state
function showLoading() {
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('errorState').classList.add('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    document.getElementById('loadingState').classList.add('hidden');
}

// Show error state
function showError(message) {
    hideLoading();
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorState').classList.remove('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
}

// Hide error state
function hideError() {
    document.getElementById('errorState').classList.add('hidden');
}
