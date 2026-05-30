# 🌤️ ClimAI

Aplicación web moderna para consultar el clima actual y el pronóstico de los próximos 7 días utilizando la API de Open-Meteo. El proyecto fue desarrollado con JavaScript modular (ES6 Modules), aplicando buenas prácticas de desarrollo frontend, separación de responsabilidades y diseño responsive.

---

## 📋 Resumen del Proyecto

ClimAI permite a los usuarios buscar cualquier ciudad del mundo y visualizar información meteorológica en tiempo real.

La aplicación realiza una búsqueda de coordenadas geográficas mediante la API de Geocoding de Open-Meteo y posteriormente consulta el clima actual y el pronóstico extendido de 7 días.

### Información disponible

- Temperatura actual.
- Condición climática.
- Humedad relativa.
- Velocidad del viento.
- Pronóstico de los próximos 7 días.
- Sistema de caché local para optimizar consultas repetidas.

---

## ⚙️ Instrucciones de Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/climai.git
```

### 2. Ingresar al proyecto

```bash
cd climai
```

### 3. Ejecutar la aplicación

Debido al uso de ES Modules, se recomienda utilizar un servidor local.

Por ejemplo, con la extensión Live Server de Visual Studio Code:

1. Abrir el proyecto.
2. Clic derecho sobre `index.html`.
3. Seleccionar **Open with Live Server**.

---

## 🚀 Guía de Uso

1. Ingresar el nombre de una ciudad.
2. Presionar el botón **Buscar**.
3. Esperar la respuesta del servicio meteorológico.
4. Visualizar el clima actual y el pronóstico de los próximos 7 días.

### Ejemplo de búsqueda

```text
Ciudad: Bogotá

Temperatura: 18°C
Condición: Parcialmente nublado
Humedad: 67%
Viento: 12 km/h
```

---

## ✨ Funcionalidades

### Implementadas

- Búsqueda de ciudades por nombre.
- Consulta del clima actual.
- Pronóstico de 7 días.
- Indicador visual de carga.
- Manejo de errores.
- Caché local para reducir llamadas a la API.
- Diseño responsive.
- Arquitectura modular basada en ES Modules.
- Interpretación de códigos meteorológicos WMO.

### Características técnicas

- JavaScript moderno (ES6+).
- Separación por módulos.
- Reutilización de componentes.
- Optimización de peticiones.
- Código mantenible y escalable.

---

## 🛡️ Manejo de Errores

La aplicación contempla diferentes escenarios de error:

### Ciudad no encontrada

```text
No se encontró la ciudad "CiudadXYZ"
```

### Error de conexión

```text
Error meteorológico (500)
```

### Error al obtener el pronóstico

```text
Error obteniendo pronóstico
```

### Campo vacío

```text
Ingresa una ciudad
```

Todos los errores son capturados mediante bloques `try/catch` y mostrados de forma amigable al usuario.

---

## 🌐 Información de la API

### Open-Meteo Geocoding API

Utilizada para convertir el nombre de una ciudad en coordenadas geográficas.

Documentación oficial:

https://open-meteo.com/en/docs/geocoding-api

### Open-Meteo Forecast API

Utilizada para obtener información meteorológica actual y pronósticos.

Documentación oficial:

https://open-meteo.com/en/docs

### Datos consultados

#### Clima actual

- temperature_2m
- relative_humidity_2m
- weather_code
- wind_speed_10m

#### Pronóstico

- temperature_2m_max
- temperature_2m_min
- weather_code

---

## 🔮 Mejoras Futuras

### Funcionales

- Geolocalización automática.
- Historial de búsquedas.
- Ciudades favoritas.
- Pronóstico por horas.
- Alertas meteorológicas.
- Comparación entre ciudades.

---

## 📂 Estructura del Proyecto

```text
climai/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── constants/
│   │   └── weatherCodes.js
│   ├── services/
│   │   └── weatherService.js
│   ├── ui/
│   │   └── uiManager.js
│   └── utils/
│       └── cache.js
│
└── README.md
```

---

## 👨‍💻 Autor

Desarrollado como proyecto de exploración y aprendizaje sobre el alcance de la Inteligencia Artificial en el desarrollo de software frontend moderno.

**Ivan Chavez**