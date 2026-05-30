//Componente responsable del DOM

import { WEATHER_CODES } from '../constants/weatherCodes.js';

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