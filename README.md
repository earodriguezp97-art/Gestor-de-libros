# Gestor de libros

Proyecto desarrollado bajo las bases entregadas por el curso de desarrollo Front-End, módulo 6: Desarrollo de interfaces interactivas con framework Vue.

Es un gestor de archivo de libros de arte y catálogos pensado para administrar una biblioteca y no para el uso del público. Permite registrar piezas, filtrar el catálogo, revisar la ficha de cada una y llevar el control de los ejemplares que entran y salen del archivo.

## Instalación

```
npm install
npm run serve
```

El proyecto queda corriendo en `http://localhost:8080`.

## Estructura

```
src/
├─ assets/portadas/     imágenes de las piezas
├─ styles/main.css      estilos globales
├─ components/          TheHeader, Libro, FormularioLibro,
│                       PanelInventario, SeccionArchivo, IngresoArchivo
├─ views/               InicioView, ListaLibros, DetalleLibro
├─ directives/          agotado.js
├─ data/libros.js       datos de semilla
├─ router/index.js      las tres rutas
├─ App.vue              estado de la aplicación
└─ main.js              arranque
```

## Decisiones técnicas

El estado vive en `App.vue`. El array de los libros baja a las vistas a través de props y las vistas avisan hacia `App.vue` mediante eventos cuando algo debe cambiar, de esa forma hay un solo lugar donde vive la información y no se necesita Vuex.

Se aplica Composition API con `<script setup>` en todos los componentes.

El CSS queda repartido en dos niveles: `main.css` global con la paleta, el reset y las utilidades y `<style scoped>` en cada componente para lo que le pertenece solo a él. La paleta está declarada como variables en `:root` para no repetir los códigos de color y poder manejarla desde una misma base.

Los datos quedan almacenados en `localStorage` con dos `watch`, uno de ellos con `deep` para identificar los cambios que ocurren dentro del array. Gracias a eso la información sobrevive a la recarga y se puede entrar directamente a la ruta de una pieza sin perder el catálogo.

Las portadas están guardadas en `assets` y se invocan a través de `require` porque la ruta está dentro de un archivo de datos y no en un template.

## Qué se usa de Vue

- Componentes con props y eventos
- `ref`, `computed` y `watch`
- `v-for` con `:key`, `v-if` / `v-else`, `v-show`
- `v-model` con los modificadores `.number` y `.trim`
- `@click`, `@submit.prevent`, `@click.once`, `@keyup.enter`
- Binding de clases
- Slots con nombre
- Una directiva personalizada
- Vue Router con ruta dinámica y `props: true`
- Navegación programática con `router.push`

## Funcionalidades

- Ingreso al archivo con un nombre de usuario
- Registro de piezas con vista previa en vivo
- Validación de campos obligatorios al agregar
- Buscador por título y autor
- Filtro por categoría, generado a partir de las piezas existentes
- Panel de inventario con cuatro cifras calculadas
- Entrada y salida de ejemplares
- Marca de "agotado" cuando una pieza llega a cero
- Ficha de detalle por ruta dinámica
- Eliminación de piezas
- Mensaje de archivo vacío

## Límite conocido

Los datos del proyecto viven en el navegador. Persistirlos de verdad para que se vean desde cualquier dispositivo requiere un backend con base de datos.