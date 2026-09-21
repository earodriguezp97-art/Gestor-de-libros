<template>
  <section class="contenedor">
    <p class="etiqueta">Archivo</p>
    <h1>Libros de arte y catálogos</h1>

    <SeccionArchivo titulo="Inventario">
      <PanelInventario :libros="libros" />
    </SeccionArchivo>

    <SeccionArchivo titulo="Últimas incorporaciones">
      <template #accion>
        <router-link to="/libros" class="texto-secundario">Ver todo</router-link>
      </template>

      <p class="texto-secundario">
        {{ libros.length }} piezas registradas en el archivo.
      </p>
    </SeccionArchivo>
  </section>
</template>

<script setup>
import SeccionArchivo from '../components/SeccionArchivo.vue'
import PanelInventario from '../components/PanelInventario.vue'

defineProps({
  libros: {
    type: Array,
    required: true
  }
})
</script>