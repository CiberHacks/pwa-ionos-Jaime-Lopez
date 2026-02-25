# Investigación: Pilares de una PWA (UTT)
**Materia:** Aplicaciones Web Progresivas
**Docente:** Mike Cardona  
**Alumno:** Jaime Isaac López Guerrero

## 1. Web App Manifest (manifest.json)
El manifiesto es un archivo JSON que le indica al navegador cómo debe comportarse la aplicación al ser instalada en un dispositivo móvil o escritorio.

* **theme_color:** Define el color de la barra de herramientas y la interfaz del sistema operativo.
* **background_color:** Color que se muestra en la pantalla de carga (splash screen) antes de que carguen los estilos CSS.
* **display (standalone vs browser):** `standalone` permite que la app se ejecute en su propia ventana, ocultando la barra de direcciones del navegador, proporcionando una experiencia nativa. `browser` mantiene la interfaz estándar del navegador.
* **icons:** Array de imágenes críticas para el branding en diferentes densidades de pantalla. Son necesarios para generar el icono en el "home screen" y la pantalla de inicio.

## 2. Service Workers
Son scripts que el navegador ejecuta en segundo plano, separados de la página web.

* **Ciclo de Vida:**
    1.  **Installation:** El SW se descarga y se instala. Aquí se suelen cachear los activos estáticos.
    2.  **Activation:** El SW toma el control de la app. Es el momento de limpiar versiones antiguas de caché.
    3.  **Fetching:** Intercepta cada petición de red que hace la app.
* **Proxy de Red:** Actúan como un intermediario. El SW puede decidir si una petición va a internet, se sirve desde la caché, o ambas.

## 3. Estrategias de Almacenamiento (Caching)
* **Stale-While-Revalidate:** Sirve el contenido desde la caché inmediatamente (velocidad), mientras busca una actualización en red en segundo plano para la próxima vez.
* **Cache First:** Ideal para activos estáticos (imágenes/fuentes). Solo va a la red si el recurso no existe en caché.
* **Network First:** Prioriza datos actualizados (API). Si la red falla (offline), entrega el respaldo de la caché.

## 4. Seguridad y TLS
* **HTTPS como requisito:** Los Service Workers son extremadamente potentes (pueden modificar el tráfico). HTTPS garantiza que el SW no ha sido inyectado por un tercero (ataque Man-in-the-middle).
* **Impacto en Install Prompt:** Los navegadores modernos (Chrome/Edge) bloquean la opción de "Instalar App" si el sitio no cuenta con un certificado SSL válido y protocolo HTTPS.