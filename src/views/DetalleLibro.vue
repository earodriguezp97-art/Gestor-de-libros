<template>
  <section class="contenedor">
    <router-link to="/libros" class="volver">← Volver al catálogo</router-link>

    <div v-if="libro" class="ficha">
      <div class="portada"></div>

      <div class="datos">
        <p class="etiqueta">{{ libro.categoria }}</p>
        <h1>{{ libro.titulo }}</h1>
        <p class="autor">{{ libro.autor }}</p>
        <p class="descripcion">{{ libro.descripcion }}</p>
        <p class="texto-secundario">Ejemplares en archivo: {{ libro.ejemplares }}</p>
      </div>
    </div>

    <p v-else class="vacio">No se encontró esa pieza en el archivo.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  libros: {
    type: Array,
    required: true
  }
})

const libro = computed(() => {
  return props.libros.find(item => item.id === Number(props.id))
})
</script>

<style scoped>
.volver {
  color: var(--color-secundario);
  font-size: 0.9rem;
}

.ficha {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--espacio-4);
  margin-top: var(--espacio-3);
}

.portada {
  aspect-ratio: 3 / 4;
  background-color: var(--color-linea);
  border-radius: var(--radio);
}

.autor {
  color: var(--color-secundario);
  margin-bottom: var(--espacio-2);
}

.descripcion {
  margin-bottom: var(--espacio-2);
}

.vacio {
  color: var(--color-secundario);
  margin-top: var(--espacio-3);
}
</style>