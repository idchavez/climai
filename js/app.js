// Elementos del DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.getElementById('weather-container');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const cityNameDiv = document.getElementById('city-name');
const temperatureDiv = document.getElementById('temperature');
const detailsDiv = document.getElementById('details');

// Event listeners
searchBtn.addEventListener('click', buscarClima);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarClima();
});

async function buscarClima() {
    const ciudad = cityInput.value.trim();
    
    // Validar que hay entrada
    if (!ciudad) {
        mostrarError('Por favor, ingresa el nombre de una ciudad');
        return;
    }

    // Mostrar loading, ocultar otros elementos
    mostrarCargando();

    try {
        // Paso 1: Obtener coordenadas de la ciudad
        const coordenadas = await obtenerCoordenadas(ciudad);
        
        // Paso 2: Obtener datos del clima
        const datosTiempo = await obtenerDatosClima(
            coordenadas.latitude,
            coordenadas.longitude
        );
        
        // Paso 3: Mostrar los datos
        mostrarClima(coordenadas, datosTiempo);
        
    } catch (error) {
        mostrarError(error.message);
    }
}

async function obtenerCoordenadas(ciudad) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
        throw new Error(`❌ No se encontró la ciudad "${ciudad}"`);
    }
    
    return data.results[0];
}

async function obtenerDatosClima(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error('Error al obtener los datos meteorológicos');
    }
    
    return data.current;
}

function mostrarClima(coordenadas, datosTiempo) {
    // Obtener descripción del código meteorológico
    const descripcion = obtenerDescripcionTiempo(datosTiempo.weather_code);
    
    // Actualizar contenido
    cityNameDiv.textContent = `📍 ${coordenadas.name}, ${coordenadas.country}`;
    temperatureDiv.textContent = `${Math.round(datosTiempo.temperature_2m)}°C`;
    
    detailsDiv.innerHTML = `
        <p><strong>Condición:</strong> ${descripcion}</p>
        <p><strong>Humedad:</strong> ${datosTiempo.relative_humidity_2m}%</p>
        <p><strong>Velocidad del viento:</strong> ${Math.round(datosTiempo.wind_speed_10m)} km/h</p>
    `;
    
    // Mostrar contenedor de clima, ocultar otros
    weatherContainer.style.display = 'block';
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
}

function obtenerDescripcionTiempo(codigo) {
    // Códigos WMO de Open-Meteo
    const descripciones = {
        0: '☀️ Despejado',
        1: '🌤️ Principalmente despejado',
        2: '⛅ Parcialmente nublado',
        3: '☁️ Nublado',
        45: '🌫️ Neblina',
        48: '🌫️ Neblina con escarcha',
        51: '🌧️ Llovizna ligera',
        53: '🌧️ Llovizna moderada',
        55: '🌧️ Llovizna densa',
        61: '🌧️ Lluvia ligera',
        63: '🌧️ Lluvia moderada',
        65: '🌧️ Lluvia fuerte',
        71: '❄️ Nieve ligera',
        73: '❄️ Nieve moderada',
        75: '❄️ Nieve fuerte',
        77: '❄️ Granizo',
        80: '🌧️ Lluvia ligera con ráfagas',
        81: '🌧️ Lluvia moderada con ráfagas',
        82: '🌧️ Lluvia fuerte con ráfagas',
        85: '❄️ Nieve ligera con ráfagas',
        86: '❄️ Nieve fuerte con ráfagas',
        95: '⛈️ Tormenta',
        96: '⛈️ Tormenta con granizo ligero',
        99: '⛈️ Tormenta con granizo fuerte',
    };
    
    return descripciones[codigo] || '🌡️ Clima desconocido';
}

function mostrarCargando() {
    weatherContainer.style.display = 'none';
    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
}

function mostrarError(mensaje) {
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    weatherContainer.style.display = 'none';
    loadingDiv.style.display = 'none';
}