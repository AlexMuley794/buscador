// Color schemes for different templates
function getColorScheme(templateId) {
    const schemes = {
        1: { primary: '#7c3aed', secondary: '#ec4899', accent: '#f59e0b' }, // Purple-Pink
        2: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#10b981' }, // Blue-Cyan
        3: { primary: '#dc2626', secondary: '#ea580c', accent: '#f59e0b' }, // Red-Orange
        4: { primary: '#059669', secondary: '#10b981', accent: '#34d399' }, // Green
        5: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#c4b5fd' }  // Violet
    };

    return schemes[templateId] || schemes[1];
}

// Template 2: Minimalist Clean Design
function generateTemplate2_Minimalist(business) {
    const stars = '⭐'.repeat(Math.floor(business.rating));
    const colorScheme = getColorScheme(2);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name} - ${business.category}</title>
    <meta name="description" content="${business.description}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            color: #1f2937;
            background: #ffffff;
        }
        
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1.5rem 2rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            z-index: 100;
        }
        
        .nav-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: ${colorScheme.primary};
        }
        
        .hero {
            margin-top: 80px;
            padding: 8rem 2rem 6rem;
            background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: center;
        }
        
        .hero-text h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 4.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: #0f172a;
        }
        
        .category-tag {
            display: inline-block;
            background: ${colorScheme.primary}15;
            color: ${colorScheme.primary};
            padding: 0.5rem 1.25rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        
        .hero-text p {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 2rem;
            line-height: 1.8;
        }
        
        .rating-box {
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            background: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            margin-bottom: 2.5rem;
        }
        
        .rating-box .stars {
            font-size: 1.3rem;
        }
        
        .rating-box .score {
            font-size: 1.5rem;
            font-weight: 700;
            color: ${colorScheme.primary};
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.1rem 2.5rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.05rem;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: ${colorScheme.primary};
            color: white;
            box-shadow: 0 4px 14px ${colorScheme.primary}40;
        }
        
        .btn-primary:hover {
            background: ${colorScheme.secondary};
            transform: translateY(-2px);
            box-shadow: 0 8px 24px ${colorScheme.primary}50;
        }
        
        .btn-outline {
            background: transparent;
            color: ${colorScheme.primary};
            border: 2px solid ${colorScheme.primary};
        }
        
        .btn-outline:hover {
            background: ${colorScheme.primary};
            color: white;
        }
        
        .hero-image {
            position: relative;
        }
        
        .hero-image img {
            width: 100%;
            height: 600px;
            object-fit: cover;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        
        .section {
            padding: 6rem 2rem;
        }
        
        .section-header {
            text-align: center;
            max-width: 700px;
            margin: 0 auto 5rem;
        }
        
        .section-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #0f172a;
        }
        
        .section-subtitle {
            font-size: 1.2rem;
            color: #64748b;
            line-height: 1.8;
        }
        
        .about {
            background: white;
        }
        
        .services {
            background: #f9fafb;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        
        .service-card {
            background: white;
            padding: 3rem 2.5rem;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }
        
        .service-card:hover {
            border-color: ${colorScheme.primary};
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            transform: translateY(-5px);
        }
        
        .service-card h3 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #0f172a;
        }
        
        .service-card p {
            color: #64748b;
            line-height: 1.7;
        }
        
        .gallery {
            background: white;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }
        
        .gallery-item {
            height: 320px;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .gallery-item:hover img {
            transform: scale(1.08);
        }
        
        .contact {
            background: #0f172a;
            color: white;
        }
        
        .contact .section-title,
        .contact .section-subtitle {
            color: white;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            margin-top: 4rem;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
        }
        
        .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
        }
        
        .contact-icon {
            width: 50px;
            height: 50px;
            background: ${colorScheme.primary};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .contact-item h4 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        .contact-item p {
            color: #cbd5e1;
            line-height: 1.6;
        }
        
        .map-container {
            height: 500px;
            border-radius: 20px;
            overflow: hidden;
        }
        
        .footer {
            background: #020617;
            color: #94a3b8;
            text-align: center;
            padding: 3rem 2rem;
        }
        
        @media (max-width: 1024px) {
            .hero-grid { grid-template-columns: 1fr; gap: 3rem; }
            .services-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: repeat(2, 1fr); }
            .contact-grid { grid-template-columns: 1fr; }
        }
        
        @media (max-width: 768px) {
            .hero-text h1 { font-size: 3rem; }
            .gallery-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <nav class="nav">
        <div class="nav-content">
            <div class="logo">${business.icon} ${business.name}</div>
            <a href="tel:${business.phone.replace(/\s/g, '')}" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.95rem;">Llamar</a>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-text">
                    <div class="category-tag">${business.category}</div>
                    <h1>${business.name}</h1>
                    <p>${business.description}</p>
                    <div class="rating-box">
                        <span class="stars">${stars}</span>
                        <span class="score">${business.rating}</span>
                        <span style="color: #64748b;">(${business.reviewCount} reseñas)</span>
                    </div>
                    <div class="cta-buttons">
                        <a href="tel:${business.phone.replace(/\s/g, '')}" class="btn btn-primary">📞 Llamar Ahora</a>
                        <a href="#contact" class="btn btn-outline">📍 Ubicación</a>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="${business.photos[0]}" alt="${business.name}" onerror="this.src='https://via.placeholder.com/800x600/${colorScheme.primary.replace('#', '')}/ffffff?text=${business.icon}'">
                </div>
            </div>
        </div>
    </section>

    <section class="section services">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Nuestros Servicios</h2>
                <p class="section-subtitle">Ofrecemos una experiencia excepcional con servicios de calidad</p>
            </div>
            <div class="services-grid">
                ${generateServices(business.category)}
            </div>
        </div>
    </section>

    <section class="section gallery">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Galería</h2>
            </div>
            <div class="gallery-grid">
                ${business.photos.map(photo => `
                    <div class="gallery-item">
                        <img src="${photo}" alt="${business.name}" onerror="this.src='https://via.placeholder.com/600x400/${colorScheme.primary.replace('#', '')}/ffffff?text=${business.icon}'">
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section id="contact" class="section contact">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Contáctanos</h2>
                <p class="section-subtitle">Estamos aquí para ayudarte</p>
            </div>
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-item">
                        <div class="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <div>
                            <h4>Dirección</h4>
                            <p>${business.address}</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4>Teléfono</h4>
                            <p>${business.phone}</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h4>Horario</h4>
                            <p>${business.hours}</p>
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
        <p style="font-weight: 600; color: white; margin-bottom: 0.5rem;">&copy; 2026 ${business.name}</p>
        <p>Web generada por BuscaNegocios</p>
    </footer>
</body>
</html>
    `;
}

// Template 3: Bold & Dynamic Design
function generateTemplate3_Bold(business) {
    const stars = '⭐'.repeat(Math.floor(business.rating));
    const colorScheme = getColorScheme(3);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name} - ${business.category}</title>
    <meta name="description" content="${business.description}">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Montserrat', sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #000;
        }
        
        .hero {
            position: relative;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            overflow: hidden;
        }
        
        .hero-bg {
            position: absolute;
            inset: 0;
            background: url('${business.photos[0]}') center/cover;
            filter: brightness(0.4);
        }
        
        .hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, ${colorScheme.primary}CC, ${colorScheme.secondary}CC);
            mix-blend-mode: multiply;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 1000px;
            padding: 2rem;
        }
        
        .hero h1 {
            font-size: 7rem;
            font-weight: 900;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: -3px;
            text-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 1s ease;
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero .category {
            display: inline-block;
            background: ${colorScheme.accent};
            color: #000;
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 2rem;
        }
        
        .hero .rating {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 700;
        }
        
        .cta-mega {
            display: inline-block;
            background: ${colorScheme.accent};
            color: #000;
            padding: 1.5rem 4rem;
            font-size: 1.3rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        
        .cta-mega:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 60px rgba(0, 0, 0, 0.6);
        }
        
        .section {
            padding: 6rem 2rem;
            background: #fff;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .section-title {
            font-size: 4rem;
            font-weight: 900;
            text-transform: uppercase;
            margin-bottom: 4rem;
            text-align: center;
            letter-spacing: -2px;
        }
        
        .about {
            background: ${colorScheme.primary};
            color: white;
        }
        
        .about-content {
            max-width: 900px;
            margin: 0 auto;
            font-size: 1.5rem;
            line-height: 2;
            text-align: center;
        }
        
        .services {
            background: #000;
            color: white;
        }
        
        .services .section-title {
            color: white;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
        }
        
        .service-card {
            background: #1a1a1a;
            padding: 4rem 3rem;
            text-align: center;
            border: 2px solid #333;
            transition: all 0.3s ease;
        }
        
        .service-card:hover {
            background: ${colorScheme.primary};
            border-color: ${colorScheme.accent};
            transform: scale(1.05);
            z-index: 10;
        }
        
        .service-card h3 {
            font-size: 2rem;
            font-weight: 900;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        
        .service-card p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .gallery {
            background: #fff;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }
        
        .gallery-item {
            height: 450px;
            overflow: hidden;
            position: relative;
        }
        
        .gallery-item::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, ${colorScheme.primary}DD, ${colorScheme.secondary}DD);
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
            transform: scale(1.2);
        }
        
        .contact {
            background: ${colorScheme.secondary};
            color: white;
        }
        
        .contact .section-title {
            color: white;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 4rem;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }
        
        .contact-item h3 {
            font-size: 1.5rem;
            font-weight: 900;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        
        .contact-item p {
            font-size: 1.2rem;
            opacity: 0.95;
        }
        
        .map-container {
            height: 500px;
        }
        
        .footer {
            background: #000;
            color: white;
            text-align: center;
            padding: 3rem;
        }
        
        @media (max-width: 1024px) {
            .hero h1 { font-size: 4rem; }
            .services-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: 1fr; }
            .contact-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <div class="category">${business.icon} ${business.category}</div>
            <h1>${business.name}</h1>
            <div class="rating">${stars} ${business.rating}</div>
            <a href="tel:${business.phone.replace(/\s/g, '')}" class="cta-mega">LLAMAR AHORA</a>
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
            <h2 class="section-title">Servicios</h2>
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
                        <img src="${photo}" alt="${business.name}" onerror="this.src='https://via.placeholder.com/900x600/${colorScheme.primary.replace('#', '')}/ffffff?text=${business.icon}'">
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
                        <h3>📍 Dirección</h3>
                        <p>${business.address}</p>
                    </div>
                    <div class="contact-item">
                        <h3>📞 Teléfono</h3>
                        <p>${business.phone}</p>
                    </div>
                    <div class="contact-item">
                        <h3>🕐 Horario</h3>
                        <p>${business.hours}</p>
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
        <p style="font-size: 1.2rem; font-weight: 900;">&copy; 2026 ${business.name}</p>
        <p style="margin-top: 0.5rem; opacity: 0.7;">Web generada por BuscaNegocios</p>
    </footer>
</body>
</html>
    `;
}

// Template 4: Elegant & Sophisticated Design
function generateTemplate4_Elegant(business) {
    const stars = '⭐'.repeat(Math.floor(business.rating));
    const colorScheme = getColorScheme(4);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name} - ${business.category}</title>
    <meta name="description" content="${business.description}">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Lato', sans-serif;
            line-height: 1.8;
            color: #2d3748;
            background: #fafafa;
        }
        
        .hero {
            position: relative;
            height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom, #ffffff, #f7fafc);
        }
        
        .hero-content {
            text-align: center;
            max-width: 800px;
            padding: 3rem;
        }
        
        .ornament {
            width: 60px;
            height: 2px;
            background: ${colorScheme.primary};
            margin: 0 auto 2rem;
        }
        
        .hero .category {
            font-size: 0.95rem;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: ${colorScheme.primary};
            font-weight: 700;
            margin-bottom: 2rem;
        }
        
        .hero h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 5.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: #1a202c;
            line-height: 1.2;
        }
        
        .hero p {
            font-size: 1.3rem;
            color: #718096;
            margin-bottom: 2rem;
            line-height: 1.8;
        }
        
        .rating-elegant {
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem 3rem;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 3rem;
        }
        
        .rating-elegant .stars {
            font-size: 1.2rem;
        }
        
        .rating-elegant .score {
            font-size: 1.8rem;
            font-weight: 700;
            color: ${colorScheme.primary};
        }
        
        .cta-elegant {
            display: inline-block;
            background: ${colorScheme.primary};
            color: white;
            padding: 1.2rem 3.5rem;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.4s ease;
        }
        
        .cta-elegant:hover {
            background: ${colorScheme.secondary};
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .section {
            padding: 7rem 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 5rem;
        }
        
        .section-header .ornament {
            margin-bottom: 2rem;
        }
        
        .section-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 3.5rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 1.5rem;
        }
        
        .section-subtitle {
            font-size: 1.2rem;
            color: #718096;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .about {
            background: white;
        }
        
        .about-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.25rem;
            line-height: 2;
            color: #4a5568;
            text-align: center;
        }
        
        .services {
            background: #f7fafc;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
        }
        
        .service-card {
            background: white;
            padding: 3.5rem 2.5rem;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: all 0.4s ease;
        }
        
        .service-card:hover {
            border-color: ${colorScheme.primary};
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
            transform: translateY(-8px);
        }
        
        .service-card .ornament {
            margin-bottom: 2rem;
        }
        
        .service-card h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #1a202c;
        }
        
        .service-card p {
            color: #718096;
            line-height: 1.8;
        }
        
        .gallery {
            background: white;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        
        .gallery-item {
            height: 350px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
            filter: grayscale(20%);
        }
        
        .gallery-item:hover img {
            transform: scale(1.1);
            filter: grayscale(0%);
        }
        
        .contact {
            background: #1a202c;
            color: white;
        }
        
        .contact .section-title,
        .contact .section-subtitle {
            color: white;
        }
        
        .contact .ornament {
            background: white;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 5rem;
            margin-top: 4rem;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }
        
        .contact-item {
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .contact-item:last-child {
            border-bottom: none;
        }
        
        .contact-item h4 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
            font-weight: 700;
        }
        
        .contact-item p {
            color: #cbd5e1;
            font-size: 1.1rem;
        }
        
        .map-container {
            height: 500px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer {
            background: #0f1419;
            color: #94a3b8;
            text-align: center;
            padding: 3rem;
        }
        
        @media (max-width: 1024px) {
            .hero h1 { font-size: 3.5rem; }
            .services-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: repeat(2, 1fr); }
            .contact-grid { grid-template-columns: 1fr; }
        }
        
        @media (max-width: 768px) {
            .gallery-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <div class="ornament"></div>
            <div class="category">${business.icon} ${business.category}</div>
            <h1>${business.name}</h1>
            <p>${business.description}</p>
            <div class="rating-elegant">
                <span class="stars">${stars}</span>
                <span class="score">${business.rating}</span>
                <span style="color: #718096;">(${business.reviewCount} reseñas)</span>
            </div>
            <a href="tel:${business.phone.replace(/\s/g, '')}" class="cta-elegant">Contactar</a>
        </div>
    </section>

    <section class="section about">
        <div class="container">
            <div class="section-header">
                <div class="ornament"></div>
                <h2 class="section-title">Nuestra Historia</h2>
            </div>
            <div class="about-content">
                <p>${business.description}</p>
            </div>
        </div>
    </section>

    <section class="section services">
        <div class="container">
            <div class="section-header">
                <div class="ornament"></div>
                <h2 class="section-title">Servicios</h2>
                <p class="section-subtitle">Excelencia en cada detalle</p>
            </div>
            <div class="services-grid">
                ${generateServices(business.category)}
            </div>
        </div>
    </section>

    <section class="section gallery">
        <div class="container">
            <div class="section-header">
                <div class="ornament"></div>
                <h2 class="section-title">Galería</h2>
            </div>
            <div class="gallery-grid">
                ${business.photos.map(photo => `
                    <div class="gallery-item">
                        <img src="${photo}" alt="${business.name}" onerror="this.src='https://via.placeholder.com/600x400/${colorScheme.primary.replace('#', '')}/ffffff?text=${business.icon}'">
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section id="contact" class="section contact">
        <div class="container">
            <div class="section-header">
                <div class="ornament"></div>
                <h2 class="section-title">Contacto</h2>
                <p class="section-subtitle">Estamos a su disposición</p>
            </div>
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-item">
                        <h4>Dirección</h4>
                        <p>${business.address}</p>
                    </div>
                    <div class="contact-item">
                        <h4>Teléfono</h4>
                        <p>${business.phone}</p>
                    </div>
                    <div class="contact-item">
                        <h4>Horario</h4>
                        <p>${business.hours}</p>
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
        <p style="font-weight: 700; color: white; margin-bottom: 0.5rem;">&copy; 2026 ${business.name}</p>
        <p>Web generada por BuscaNegocios</p>
    </footer>
</body>
</html>
    `;
}

// Template 5: Creative & Playful Design
function generateTemplate5_Creative(business) {
    const stars = '⭐'.repeat(Math.floor(business.rating));
    const colorScheme = getColorScheme(5);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name} - ${business.category}</title>
    <meta name="description" content="${business.description}">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Quicksand', sans-serif;
            line-height: 1.7;
            color: #2d3748;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            top: -250px;
            right: -250px;
            animation: float 6s ease-in-out infinite;
        }
        
        .hero::after {
            content: '';
            position: absolute;
            width: 400px;
            height: 400px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 50%;
            bottom: -200px;
            left: -200px;
            animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            max-width: 900px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 5rem 4rem;
            border-radius: 40px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        }
        
        .emoji-badge {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        
        .hero h1 {
            font-family: 'Fredoka', sans-serif;
            font-size: 4.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #1a202c;
            line-height: 1.2;
        }
        
        .category-pill {
            display: inline-block;
            background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-weight: 700;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        
        .hero p {
            font-size: 1.3rem;
            color: #4a5568;
            margin-bottom: 2rem;
            line-height: 1.8;
        }
        
        .rating-fun {
            font-size: 1.8rem;
            margin-bottom: 2.5rem;
            font-weight: 700;
            color: ${colorScheme.primary};
        }
        
        .cta-fun {
            display: inline-block;
            background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});
            color: white;
            padding: 1.3rem 3.5rem;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .cta-fun:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .section {
            padding: 6rem 2rem;
            background: white;
        }
        
        .container {
            max-width: 1300px;
            margin: 0 auto;
        }
        
        .section-title {
            font-family: 'Fredoka', sans-serif;
            font-size: 3.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .about {
            background: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
        }
        
        .about-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.3rem;
            line-height: 2;
            text-align: center;
            color: #4a5568;
        }
        
        .services {
            background: white;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
        }
        
        .service-card {
            background: linear-gradient(135deg, #f7fafc, #ffffff);
            padding: 3rem 2.5rem;
            border-radius: 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            transition: all 0.4s ease;
            border: 3px solid transparent;
        }
        
        .service-card:hover {
            transform: translateY(-10px) rotate(-2deg);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
            border-color: ${colorScheme.primary};
            background: linear-gradient(135deg, ${colorScheme.primary}20, ${colorScheme.secondary}20);
        }
        
        .service-card h3 {
            font-family: 'Fredoka', sans-serif;
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #1a202c;
        }
        
        .service-card p {
            color: #718096;
            line-height: 1.7;
        }
        
        .gallery {
            background: #f7fafc;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        
        .gallery-item {
            height: 320px;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
            transition: all 0.4s ease;
        }
        
        .gallery-item:hover {
            transform: scale(1.05) rotate(2deg);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
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
            margin-top: 4rem;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
        }
        
        .contact-item {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            padding: 2.5rem;
            border-radius: 25px;
            border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .contact-item h4 {
            font-family: 'Fredoka', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
        }
        
        .contact-item p {
            font-size: 1.15rem;
            opacity: 0.95;
        }
        
        .map-container {
            height: 500px;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .footer {
            background: #1a202c;
            color: white;
            text-align: center;
            padding: 3rem;
        }
        
        @media (max-width: 1024px) {
            .hero h1 { font-size: 3rem; }
            .services-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: repeat(2, 1fr); }
            .contact-grid { grid-template-columns: 1fr; }
        }
        
        @media (max-width: 768px) {
            .gallery-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <div class="emoji-badge">${business.icon}</div>
            <div class="category-pill">${business.category}</div>
            <h1>${business.name}</h1>
            <p>${business.description}</p>
            <div class="rating-fun">${stars} ${business.rating} ⭐ (${business.reviewCount} reseñas)</div>
            <a href="tel:${business.phone.replace(/\s/g, '')}" class="cta-fun">📞 ¡Llámanos!</a>
        </div>
    </section>

    <section class="section about">
        <div class="container">
            <h2 class="section-title">¿Quiénes Somos?</h2>
            <div class="about-content">
                <p>${business.description}</p>
            </div>
        </div>
    </section>

    <section class="section services">
        <div class="container">
            <h2 class="section-title">Lo Que Ofrecemos</h2>
            <div class="services-grid">
                ${generateServices(business.category)}
            </div>
        </div>
    </section>

    <section class="section gallery">
        <div class="container">
            <h2 class="section-title">Nuestra Galería</h2>
            <div class="gallery-grid">
                ${business.photos.map(photo => `
                    <div class="gallery-item">
                        <img src="${photo}" alt="${business.name}" onerror="this.src='https://via.placeholder.com/600x400/${colorScheme.primary.replace('#', '')}/ffffff?text=${business.icon}'">
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section id="contact" class="section contact">
        <div class="container">
            <h2 class="section-title">¡Contáctanos!</h2>
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-item">
                        <h4>📍 Encuéntranos</h4>
                        <p>${business.address}</p>
                    </div>
                    <div class="contact-item">
                        <h4>📞 Llámanos</h4>
                        <p>${business.phone}</p>
                    </div>
                    <div class="contact-item">
                        <h4>🕐 Horario</h4>
                        <p>${business.hours}</p>
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
        <p style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">&copy; 2026 ${business.name}</p>
        <p style="opacity: 0.7;">Web generada con ❤️ por BuscaNegocios</p>
    </footer>
</body>
</html>
    `;
}
