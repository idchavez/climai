const CACHE_DURATION = 10 * 60 * 1000;

export function guardarCache(ciudad, datos) {

    const cache = {
        timestamp: Date.now(),
        data: datos
    };

    localStorage.setItem(
        ciudad.toLowerCase(),
        JSON.stringify(cache)
    );
}

export function obtenerCache(ciudad) {

    const item =
        localStorage.getItem(
            ciudad.toLowerCase()
        );

    if (!item) return null;

    const cache = JSON.parse(item);

    const expirado =
        Date.now() - cache.timestamp >
        CACHE_DURATION;

    if (expirado) {

        localStorage.removeItem(
            ciudad.toLowerCase()
        );

        return null;
        }

    return cache.data;
}