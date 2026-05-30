/**
 * Busca una ciudad y retorna sus coordenadas geográficas.
 *
 * Utiliza el servicio de geocodificación de Open-Meteo para
 * transformar el nombre de una ciudad en latitud y longitud.
 *
 * @async
 * @function obtenerCoordenadas
 * @param {string} ciudad - Nombre de la ciudad a consultar.
 * @returns {Promise<Object>} Información geográfica de la ciudad.
 *
 * @property {string} name - Nombre de la ciudad.
 * @property {string} country - País.
 * @property {number} latitude - Latitud.
 * @property {number} longitude - Longitud.
 *
 * @throws {Error}
 * - Si la ciudad no existe.
 * - Si ocurre un error de red.
 * - Si la API responde con un estado inválido.
 *
 * @example
 * const ciudad = await obtenerCoordenadas('Bogotá');
 * console.log(ciudad.latitude);
 */
export async function obtenerCoordenadas(ciudad) {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Error de geolocalización (${response.status})`
        );
    }

    const data = await response.json();

    if (!data.results?.length) {
        throw new Error(
            `No se encontró la ciudad "${ciudad}"`
        );
    }

    return data.results[0];
}


/**
 * Obtiene las condiciones meteorológicas actuales para una ubicación.
 *
 * Consulta la API Forecast de Open-Meteo utilizando coordenadas
 * geográficas previamente obtenidas.
 *
 * @async
 * @function obtenerClima
 * @param {number} lat - Latitud.
 * @param {number} lon - Longitud.
 * @returns {Promise<Object>} Datos meteorológicos actuales.
 *
 * @property {number} temperature_2m - Temperatura actual en °C.
 * @property {number} relative_humidity_2m - Humedad relativa (%).
 * @property {number} weather_code - Código meteorológico WMO.
 * @property {number} wind_speed_10m - Velocidad del viento (km/h).
 *
 * @throws {Error} Si la API retorna una respuesta inválida.
 *
 * @example
 * const clima = await obtenerClima(4.711, -74.072);
 * console.log(clima.temperature_2m);
 */
export async function obtenerClima(lat, lon) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Error meteorológico (${response.status})`
        );
    }

    const data = await response.json();

    return data.current;
}

/**
 * Obtiene el pronóstico meteorológico de los próximos 7 días
 * para una ubicación específica utilizando la API de Open-Meteo.
 *
 * @async
 * @function obtenerPronostico
 * @param {number} lat - Latitud de la ubicación.
 * @param {number} lon - Longitud de la ubicación.
 * @returns {Promise<Object>} Objeto con la información diaria del pronóstico.
 *
 * @property {string[]} time - Fechas del pronóstico.
 * @property {number[]} temperature_2m_max - Temperaturas máximas por día.
 * @property {number[]} temperature_2m_min - Temperaturas mínimas por día.
 * @property {number[]} weather_code - Códigos meteorológicos WMO.
 *
 * @throws {Error} Cuando la API no responde correctamente o retorna un error.
 *
 * @example
 * const pronostico = await obtenerPronostico(4.711, -74.072);
 * console.log(pronostico.temperature_2m_max);
 */
export async function obtenerPronostico(lat, lon) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Error obteniendo pronóstico (${response.status})`
        );
    }

    const data = await response.json();

    return data.daily;
}