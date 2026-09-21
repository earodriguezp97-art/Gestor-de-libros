<template>
  <div class="panel">
    <div class="dato">
      <p class="etiqueta">Títulos</p>
      <p class="cifra">{{ libros.length }}</p>
    </div>

    <div class="dato">
      <p class="etiqueta">Ejemplares</p>
      <p class="cifra">{{ totalEjemplares }}</p>
    </div>

    <div class="dato">
      <p class="etiqueta">Agotados</p>
      <p class="cifra">{{ totalAgotados }}</p>
    </div>

    <div class="dato">
      <p class="etiqueta">Categorías</p>
      <p class="cifra">{{ totalCategorias }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  libros: {
    type: Array,
    required: true
  }
})

const totalEjemplares = computed(() => {
  let suma = 0
  for (const libro of props.libros) {
    suma = suma + libro.ejemplares
  }
  return suma
})

const totalAgotados = computed(() => {
  return props.libros.filter(libro => libro.ejemplares === 0).length
})

const totalCategorias = computed(() => {
  const categorias = []
  for (const libro of props.libros) {
    if (!categorias.includes(libro.categoria)) {
      categorias.push(libro.categoria)
    }
  }
  return categorias.length
})
</script>

<style scoped>
.panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--espacio-2);
  margin-top: var(--espacio-3);
}

.dato {
  background-color: var(--color-ficha);
  border: 1px solid var(--color-linea);
  border-radius: var(--radio);
  padding: var(--espacio-2);
}

.cifra {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
}
</style>