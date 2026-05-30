import {obtenerCoordenadas, obtenerClima} from './services/weatherService.js';
import {guardarCache, obtenerCache} from './utils/cache.js';
import {mostrarClima, mostrarError, mostrarCargando} from './ui/uiManager.js';
import {obtenerPronostico} from './services/weatherService.js';
import {mostrarPronostico} from './ui/uiManager.js';

const elementos = {
    cityInput:document.getElementById('city-input'),
    searchBtn:document.getElementById('search-btn'),
    weatherContainer:document.getElementById('weather-container'),
    loadingDiv:document.getElementById('loading'),
    errorDiv:document.getElementById('error'),
    cityNameDiv:document.getElementById('city-name'),
    temperatureDiv:document.getElementById('temperature'),
    detailsDiv:document.getElementById('details'),
    forecastContainer: document.getElementById('forecast-container')
};

elementos.searchBtn.addEventListener(
    'click',
    buscarClima
);

elementos.cityInput.addEventListener(
    'keypress',
    e => {

        if (e.key === 'Enter') {
            buscarClima();
        }
    }
);


/**
 * Obtiene y muestra la información climática y el pronóstico de una ciudad.
 *
 * El flujo de ejecución es el siguiente:
 * 1. Valida que el usuario haya ingresado una ciudad.
 * 2. Muestra el indicador de carga y deshabilita el botón de búsqueda.
 * 3. Verifica si existe información almacenada en caché.
 * 4. Si existe caché, utiliza los datos almacenados para evitar solicitudes innecesarias.
 * 5. Si no existe caché, consulta las APIs de geocodificación, clima actual y pronóstico.
 * 6. Guarda los datos obtenidos en caché para futuras consultas.
 * 7. Actualiza la interfaz con la información climática y el pronóstico.
 * 8. Maneja errores mostrando un mensaje amigable al usuario.
 * 9. Reactiva el botón de búsqueda al finalizar la operación.
 *
 * @async
 * @function buscarClima
 * @returns {Promise<void>} Promesa que se resuelve cuando la búsqueda y actualización de la interfaz han finalizado.
 *
 * @throws {Error} Si ocurre un problema al obtener las coordenadas,
 * los datos meteorológicos o el pronóstico desde las APIs externas.
 */
async function buscarClima() {

    const ciudad = elementos.cityInput.value.trim();

    if (!ciudad) {
        mostrarError(
            elementos,
            'Ingresa una ciudad'
        );
        return;
    }

    mostrarCargando(elementos);
    elementos.searchBtn.disabled = true;

    try {
        const cache = obtenerCache(ciudad);

        if (cache) {
            mostrarClima(
                elementos,
                cache.coordenadas,
                cache.datosTiempo
            );

            mostrarPronostico(
                elementos,
                cache.pronostico
            );

            return;
        }

        const coordenadas =
            await obtenerCoordenadas(
                ciudad
            );

        const datosTiempo =
            await obtenerClima(
                coordenadas.latitude,
                coordenadas.longitude
            );

        const pronostico =
            await obtenerPronostico(
                coordenadas.latitude,
                coordenadas.longitude
            );

        console.log(pronostico);

        guardarCache(
            ciudad,
            {
                coordenadas,
                datosTiempo,
                pronostico
            }
        );
        mostrarClima(elementos,coordenadas, datosTiempo);
        mostrarPronostico(
            elementos,
            pronostico
        );
    } catch (error) {
        mostrarError(elementos, error.message);
    } finally {
        elementos.searchBtn.disabled = false;
    }
}