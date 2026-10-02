# Gestor de libros

Proyecto desarrollado bajo las bases entregadas por el curso de desarrollo Front-End del módulo 7: Desarrollo de aplicaciones front-end con framework Vue. Es una ampliación del proyecto del módulo 6 al que le agregué manejo de estado con Vuex, consumo de una API, página 404 y una función de suscripción.

Es un gestor de archivos de libros de arte y catálogos pensado para administrar una biblioteca y no para el uso del público. Permite registrar piezas, filtrar el catálogo, revisar la ficha de cada una, marcar favoritos y llevar el control de los ejemplares que entran y salen del archivo.

## Instalación

```
npm install
```

El proyecto necesita dos servidores corriendo al mismo tiempo y cada uno en su propia terminal:

```
npm run mock
```

```
npm run serve
```

El primero levanta json-server, que funciona como un backend falso y sirve los datos de `db.json` en `http://localhost:3001`. El segundo levanta la aplicación en `http://localhost:8080`. Si el mock no está corriendo el catálogo aparece vacío porque no hay nadie que responda las peticiones.

## Estructura

```
db.json                 datos del backend falso (json-server)
public/portadas/
src/
├─ api/
│   └─ index.js
├─ styles/
│   └─ main.css
├─ components/
│   ├─ TheHeader.vue
│   ├─ SitioFooter.vue
│   ├─ Libro.vue
│   ├─ FormularioLibro.vue
│   ├─ PanelInventario.vue
│   ├─ SeccionArchivo.vue
│   └─ IngresoArchivo.vue
├─ views/
│   ├─ InicioView.vue
│   ├─ ListaLibros.vue
│   ├─ DetalleLibro.vue
│   └─ NoEncontrado.vue
├─ directives/
│   └─ agotado.js
├─ store/
│   ├─ index.js
│   └─ modules/
│       ├─ libros.js
│       ├─ favoritos.js
│       ├─ sesion.js
│       └─ suscriptores.js
├─ router/
│   └─ index.js
├─ App.vue
└─ main.js
```

## Decisiones técnicas

El estado ya no vive en `App.vue` como en el módulo anterior. Ahora vive en Vuex y esta dividido en cuatro módulos con `namespaced: true` que son: libros, favoritos, sesion y suscriptores. `App.vue` quedó como un puente que envía acciones al store y lee desde los getters pero ya no modifica nada por su cuenta.

La fuente de verdad pasó a ser la API. Los libros viven en `db.json` y json-server los sirve como si fuera un servidor real. Axios se comunica con él a través de una instancia configurada en `api/index.js` con un `baseURL` así no hay que repetir la dirección en cada petición.

Las acciones que tocan la API son asincrónicas y usan `async/await` con `try/catch/finally`. Cargar, agregar, eliminar y mover ejemplares pasan por ahí y el store guarda además los estados de carga y de error. Las mutations quedaron solo para cambiar el state de forma sincrónica ya que es como corresponde.

El nombre de usuario y los favoritos sí se guardan en `localStorage` y no en la API porque son datos de cada persona y no del archivo compartido.

Se aplica Composition API con `<script setup>` en todos los componentes.

El CSS queda repartido en dos niveles: `main.css` global con la paleta, el reset y las utilidades y `<style scoped>` en cada componente para lo que le pertenece solo a él. La paleta está declarada como variables en `:root` para no repetir los códigos de color y poder manejarla desde una misma base.

Las portadas se movieron a `public/` porque ahora la ruta de la imagen viaja como texto dentro de `db.json`, y desde ahí `require` ya no sirve.

## Qué se usa de Vue

- Componentes con props y eventos
- Vuex: state, getters, mutations, actions y módulos con namespace
- Axios para consumir la API
- `ref`, `computed` y `onMounted`
- `v-for` con `:key`, `v-if` / `v-else`, `v-show`
- `v-model` con los modificadores `.number` y `.trim`
- `@click`, `@submit.prevent`, `@click.once`, `@keyup.enter`
- Binding de clases
- Slots con nombre
- Una directiva personalizada
- Vue Router con ruta dinámica, `props: true` y ruta comodín para el 404
- Navegación programática con `router.push`

## Funcionalidades

- Ingreso al archivo con un nombre de usuario y opción de cerrar sesión
- Registro de piezas con vista previa en vivo
- Validación de campos obligatorios al agregar
- Buscador por título y autor
- Filtro por categoría, generado a partir de las piezas existentes
- Panel de inventario con cuatro cifras calculadas
- Entrada y salida de ejemplares
- Marca de "agotado" cuando una pieza llega a cero
- Favoritos: marcar y desmarcar piezas
- Ficha de detalle por ruta dinámica
- Eliminación de piezas
- Mensaje de archivo vacío
- Página 404 con enlace de vuelta al inicio
- Suscripción al boletín desde el footer

## Límites conocidos

El backend es falso. json-server corre de forma local así que para publicar el proyecto y que funcione desde cualquier dispositivo haría falta un backend real con base de datos.

No hay autenticación. El ingreso es solo un nombre sin tener cuenta ni contraseña. Por eso los favoritos quedan guardados por navegador y no por persona, para asociarlos a cada usuario requiere un sistema de autenticación de verdad que está fuera del alcance de este módulo.