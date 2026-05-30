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