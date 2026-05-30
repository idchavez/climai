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