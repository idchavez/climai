//Componente responsable del DOM

import { WEATHER_CODES } from '../constants/weatherCodes.js';

/**
 * Renderiza la información meteorológica de una ciudad en la interfaz de usuario.
 *
 * Actualiza los elementos visuales con el nombre de la ciudad, país,
 * temperatura actual y detalles climáticos como humedad y velocidad del viento.
 * También controla la visibilidad de los contenedores de clima, carga y errores.
 *
 * @param {Object} elementos - Referencias a los elementos del DOM utilizados por la interfaz.
 * @param {HTMLElement} elementos.cityNameDiv - Contenedor del nombre de la ciudad.
 * @param {HTMLElement} elementos.temperatureDiv - Contenedor de la temperatura.
 * @param {HTMLElement} elementos.detailsDiv - Contenedor de los detalles climáticos.
 * @param {HTMLElement} elementos.weatherContainer - Contenedor principal del clima.
 * @param {HTMLElement} elementos.loadingDiv - Contenedor de carga.
 * @param {HTMLElement} elementos.errorDiv - Contenedor de errores.
 * @param {HTMLElement} elementos.forecastContainer - Contenedor del pronóstico.
 * @param {Object} coordenadas - Información geográfica de la ciudad.
 * @param {string} coordenadas.name - Nombre de la ciudad.
 * @param {string} coordenadas.country - Código o nombre del país.
 * @param {Object} datosTiempo - Datos meteorológicos obtenidos desde la API.
 * @param {number} datosTiempo.temperature_2m - Temperatura actual en grados Celsius.
 * @param {number} datosTiempo.relative_humidity_2m - Humedad relativa en porcentaje.
 * @param {number} datosTiempo.wind_speed_10m - Velocidad del viento en km/h.
 * @param {number} datosTiempo.weather_code - Código meteorológico utilizado para determinar la descripción del clima.
 *
 * @returns {void}
 */
export function mostrarClima(
    elementos,
    coordenadas,
    datosTiempo
) {

    const {
        cityNameDiv,
        temperatureDiv,
        detailsDiv,
        weatherContainer,
        loadingDiv,
        errorDiv,
        forecastContainer
    } = elementos;

    const descripcion =
        WEATHER_CODES[datosTiempo.weather_code]
        || '🌡️ Clima desconocido';

    cityNameDiv.textContent =
        `📍 ${coordenadas.name}, ${coordenadas.country}`;

    temperatureDiv.textContent =
        `${Math.round(
            datosTiempo.temperature_2m
        )}°C`;

    detailsDiv.innerHTML = `
        <p><strong>Condición:</strong> ${descripcion}</p>
        <p><strong>Humedad:</strong> ${datosTiempo.relative_humidity_2m}%</p>
        <p><strong>Viento:</strong> ${Math.round(datosTiempo.wind_speed_10m)} km/h</p>
    `;

    weatherContainer.style.display = 'block';
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
}

/**
 * Muestra un mensaje de error en la interfaz y oculta los elementos
 * relacionados con el clima y la carga.
 *
 * @param {Object} elementos - Referencias a los elementos del DOM utilizados por la interfaz.
 * @param {HTMLElement} elementos.errorDiv - Contenedor donde se mostrará el mensaje de error.
 * @param {HTMLElement} elementos.weatherContainer - Contenedor principal del clima.
 * @param {HTMLElement} elementos.loadingDiv - Contenedor de carga.
 * @param {string} mensaje - Mensaje de error que se mostrará al usuario.
 *
 * @returns {void}
 */
export function mostrarError(
    elementos,
    mensaje
) {

    elementos.errorDiv.textContent =
        mensaje;

    elementos.errorDiv.style.display =
        'block';

    elementos.weatherContainer.style.display =
        'none';

    elementos.loadingDiv.style.display =
        'none';
}

/**
 * Muestra el indicador de carga mientras se realiza una consulta
 * y oculta los mensajes de error y la información climática.
 *
 * @param {Object} elementos - Referencias a los elementos del DOM utilizados por la interfaz.
 * @param {HTMLElement} elementos.loadingDiv - Contenedor del indicador de carga.
 * @param {HTMLElement} elementos.errorDiv - Contenedor de errores.
 * @param {HTMLElement} elementos.weatherContainer - Contenedor principal del clima.
 *
 * @returns {void}
 */
export function mostrarCargando(
    elementos
) {

    elementos.loadingDiv.style.display =
        'block';

    elementos.errorDiv.style.display =
        'none';

    elementos.weatherContainer.style.display =
        'none';
}

/**
 * Renderiza el pronóstico meteorológico de los próximos días
 * dentro del contenedor correspondiente de la interfaz.
 *
 * @param {Object} elementos - Referencias a elementos del DOM.
 * @param {HTMLElement} elementos.forecastContainer - Contenedor del pronóstico.
 * @param {Object} pronostico - Datos diarios obtenidos desde la API.
 *
 * @returns {void}
 *
 * @example
 * mostrarPronostico(elementos, pronostico);
 */
export function mostrarPronostico(
    elementos,
    pronostico
) {

    if (!pronostico || !pronostico.time) {
        return;
    }

    const diasSemana = [
        "Dom",
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb"
    ];

    let html =
        `<div class="forecast-title">
            Próximos 7 días
        </div>`;

    pronostico.time.forEach((fecha, index) => {

        const dia =
            diasSemana[
                new Date(fecha).getDay()
            ];

        html += `
            <div class="forecast-day">
                <span>${dia}</span>
                <span>
                    ${Math.round(
                        pronostico.temperature_2m_max[index]
                    )}°
                    /
                    ${Math.round(
                        pronostico.temperature_2m_min[index]
                    )}°
                </span>
            </div>
        `;
    });

    elementos.forecastContainer.innerHTML =
        html;
}