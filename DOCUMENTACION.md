# Documentación Técnica - ClimAI

## 1. Introducción

ClimAI es una aplicación web desarrollada en JavaScript Vanilla que permite consultar información meteorológica actual y pronósticos de los próximos siete días para cualquier ciudad del mundo.

La aplicación consume los servicios públicos de Open-Meteo para obtener datos geográficos y meteorológicos en tiempo real.

---

# 2. Objetivos del Proyecto

## Objetivo General

Desarrollar una aplicación web capaz de consultar y visualizar información meteorológica en tiempo real mediante APIs externas.

## Objetivos Específicos

- Consultar ciudades mediante geocodificación.
- Obtener condiciones climáticas actuales.
- Mostrar pronósticos extendidos.
- Implementar una arquitectura modular.
- Optimizar llamadas a APIs mediante caché local.
- Proporcionar una experiencia de usuario responsive.

---

# 3. Arquitectura de la Aplicación

La aplicación sigue una arquitectura modular basada en responsabilidades separadas.

```text
Usuario
   │
   ▼
app.js
   │
   ├── weatherService.js
   │       │
   │       └── Open-Meteo APIs
   │
   ├── cache.js
   │
   └── uiManager.js
           │
           ▼
       DOM (HTML)
```

---

# 4. Estructura del Proyecto

```text
climai/

├── index.html

├── css/
│   └── styles.css

├── js/
│
│   ├── app.js
│
│   ├── constants/
│   │   └── weatherCodes.js
│
│   ├── services/
│   │   └── weatherService.js
│
│   ├── ui/
│   │   └── uiManager.js
│
│   └── utils/
│       └── cache.js
│
└── README.md
```

---

# 5. Descripción de Módulos

## 5.1 app.js

Responsable de:

- Capturar eventos del usuario.
- Coordinar la lógica principal.
- Gestionar llamadas a servicios.
- Gestionar caché.
- Actualizar la interfaz.

### Funciones principales

#### buscarClima()

Proceso principal de consulta.

Flujo:

1. Validar entrada.
2. Mostrar loading.
3. Consultar caché.
4. Obtener coordenadas.
5. Obtener clima actual.
6. Obtener pronóstico.
7. Guardar en caché.
8. Mostrar resultados.

---

## 5.2 weatherService.js

Encapsula toda comunicación con APIs externas.

### obtenerCoordenadas(ciudad)

Obtiene coordenadas geográficas.

Parámetro:

```javascript
ciudad: string
```

Retorna:

```javascript
{
  latitude: number,
  longitude: number,
  name: string,
  country: string
}
```

---

### obtenerClima(lat, lon)

Obtiene clima actual.

Parámetros:

```javascript
lat: number
lon: number
```

Retorna:

```javascript
{
  temperature_2m,
  relative_humidity_2m,
  weather_code,
  wind_speed_10m
}
```

---

### obtenerPronostico(lat, lon)

Obtiene pronóstico de 7 días.

Retorna:

```javascript
{
  time: [],
  temperature_2m_max: [],
  temperature_2m_min: [],
  weather_code: []
}
```

---

## 5.3 uiManager.js

Gestiona toda la manipulación visual.

### mostrarClima()

Actualiza:

- Ciudad.
- Temperatura.
- Humedad.
- Viento.
- Condición climática.

### mostrarPronostico()

Genera dinámicamente:

- Lista de días.
- Temperaturas máximas.
- Temperaturas mínimas.

### mostrarError()

Muestra mensajes amigables.

### mostrarCargando()

Muestra indicador de carga.

---

## 5.4 cache.js

Gestiona almacenamiento temporal.

Funciones:

### guardarCache()

Almacena consultas.

### obtenerCache()

Recupera consultas previas.

Objetivo:

- Reducir tráfico de red.
- Mejorar tiempos de respuesta.

---

## 5.5 weatherCodes.js

Mapea códigos WMO a descripciones legibles.

Ejemplo:

```javascript
0: "☀️ Despejado"
1: "🌤️ Principalmente despejado"
61: "🌧️ Lluvia ligera"
95: "⛈️ Tormenta"
```

---

# 6. Flujo de Ejecución

```text
Usuario ingresa ciudad
          │
          ▼
Validación
          │
          ▼
¿Existe en caché?
      │      │
     Sí      No
      │      │
      ▼      ▼
Mostrar   Obtener
Cache     Coordenadas
             │
             ▼
       Obtener Clima
             │
             ▼
      Obtener Pronóstico
             │
             ▼
      Guardar Caché
             │
             ▼
      Mostrar Datos
```

---

# 7. APIs Utilizadas

## Open-Meteo Geocoding API

Permite buscar ciudades.

Endpoint:

```http
https://geocoding-api.open-meteo.com/v1/search
```

Ejemplo:

```http
https://geocoding-api.open-meteo.com/v1/search?name=Bogota
```

---

## Open-Meteo Forecast API

Permite obtener información meteorológica.

Endpoint:

```http
https://api.open-meteo.com/v1/forecast
```

Ejemplo:

```http
https://api.open-meteo.com/v1/forecast?latitude=4.6&longitude=-74.08
```

---

# 8. Manejo de Errores

## Ciudad inexistente

```text
No se encontró la ciudad.
```

## Problemas de conexión

```text
Error meteorológico (500)
```

## Respuesta inválida

```text
Error obteniendo pronóstico.
```

## Campo vacío

```text
Ingresa una ciudad.
```

---

# 9. Diseño Responsive

La aplicación utiliza:

- Flexbox.
- CSS Grid.
- Media Queries.

Breakpoints:

```css
768px
992px
1200px
```

Adaptaciones:

- Desktop → Vista en dos columnas.
- Tablet → Diseño adaptado.
- Mobile → Diseño vertical.

---

# 10. Rendimiento

## Estrategias Implementadas

### Caché Local

Evita peticiones repetidas.

### Módulos ES6

Carga únicamente código necesario.

### Renderizado Dinámico

Actualización selectiva del DOM.

### Fetch API

Consumo ligero de servicios REST.

---

# 11. Seguridad

Medidas aplicadas:

- Sanitización mediante encodeURIComponent().
- Validación de entradas.
- Manejo controlado de excepciones.
- No almacenamiento de información sensible.

---

# 12. Pruebas Realizadas

## Casos Positivos

- Bogotá
- Medellín
- Madrid
- Londres
- Tokio

## Casos Negativos

- Campo vacío
- Ciudad inexistente
- Conexión sin internet
- Respuesta inválida de API

---

# 13. Limitaciones Actuales

- No posee autenticación.
- No almacena favoritos.
- No posee geolocalización automática.
- No incluye pronóstico por horas.
- No es una Progressive Web App.

---

# 14. Mejoras Futuras

## Funcionales

- Favoritos.
- Historial.
- Pronóstico por horas.
- Alertas meteorológicas.
- Comparador de ciudades.

## Técnicas

- TypeScript.
- PWA.
- Service Workers.
- IndexedDB.
- Testing con Jest.
- CI/CD con GitHub Actions.
- Docker.

---

# 15. Conclusiones

ClimAI demuestra cómo construir una aplicación web moderna basada en APIs externas utilizando JavaScript Vanilla, arquitectura modular y principios de diseño responsive.

El proyecto sirve como base para futuras evoluciones hacia una Progressive Web App completa orientada a consulta meteorológica en tiempo real.