<template>
  <section class="contenedor">
    <h2>Catálogo</h2>

    <FormularioLibro @agregar="$emit('agregar', $event)" />

    <input v-model="busqueda" type="text" placeholder="Buscar por título o autor" class="buscador" />
    <div class="filtros">
      <button class="filtro" :class="{ activo: categoriaActiva === 'todas' }" @click="categoriaActiva = 'todas'">
        Todas
      </button>

      <button v-for="categoria in categorias" :key="categoria" class="filtro"
        :class="{ activo: categoriaActiva === categoria }" @click="categoriaActiva = categoria">
        {{ categoria }}
      </button>
    </div>

    <p v-if="librosFiltrados.length === 0" class="vacio">
      No hay piezas en esta categoría.
    </p>

    <div v-else class="grilla">
      <Libro v-for="libro in librosFiltrados" :key="libro.id" :libro="libro" @eliminar="$emit('eliminar', $event)"
        @entrada="$emit('entrada', $event)" @salida="$emit('salida', $event)" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'

const props = defineProps({
  libros: {
    type: Array,
    required: true
  }
})

defineEmits(['eliminar', 'agregar', 'entrada', 'salida'])

const categoriaActiva = ref('todas')
const busqueda = ref('')

const categorias = computed(() => {
  const lista = []
  for (const libro of props.libros) {
    if (!lista.includes(libro.categoria)) {
      lista.push(libro.categoria)
    }
  }
  return lista
})

const librosFiltrados = computed(() => {
  let resultado = props.libros

  if (categoriaActiva.value !== 'todas') {
    resultado = resultado.filter(libro => libro.categoria === categoriaActiva.value)
  }

  if (busqueda.value !== '') {
    const texto = busqueda.value.toLowerCase()
    resultado = resultado.filter(libro =>
      libro.titulo.toLowerCase().includes(texto) ||
      libro.autor.toLowerCase().includes(texto)
    )
  }

  return resultado
})
</script>

<style scoped>
.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--espacio-3);
  margin-top: var(--espacio-3);
}

.vacio {
  color: var(--color-secundario);
  margin-top: var(--espacio-3);
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espacio-1);
  margin-top: var(--espacio-3);
}

.filtro {
  border: 1px solid var(--color-linea);
  border-radius: var(--radio);
  padding: 6px 14px;
  font-size: 0.9rem;
  background-color: transparent;
}

.filtro.activo {
  background-color: var(--color-acento);
  border-color: var(--color-acento);
}

.buscador {
  margin-top: var(--espacio-3);
}
</style>