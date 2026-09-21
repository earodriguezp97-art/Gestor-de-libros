<template>
  <article class="tarjeta" v-agotado="libro.ejemplares">
  <div class="portada"></div>

  <div class="cuerpo">
    <p class="etiqueta">{{ libro.categoria }}</p>
    <router-link :to="'/libros/' + libro.id">
      <h3>{{ libro.titulo }}</h3>
    </router-link>
    <p class="texto-secundario">{{ libro.autor }}</p>

    <button class="ver-mas" @click="verDescripcion = !verDescripcion">
      {{ verDescripcion ? 'Ocultar' : 'Ver descripción' }}
    </button>

    <p v-show="verDescripcion" class="descripcion">
      {{ libro.descripcion }}
    </p>

    <div class="pie">
      <span v-if="libro.ejemplares > 0" class="ejemplares">
        {{ libro.ejemplares }} ejemplares
      </span>
      <span v-else class="agotado">Agotado</span>

      <button @click="$emit('eliminar', libro.id)">Eliminar</button>
    </div>
  </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  libro: {
    type: Object,
    required: true
  }
})

defineEmits(['eliminar'])

const verDescripcion = ref(false)
</script>

<style scoped>
.tarjeta {
  background-color: var(--color-ficha);
  border: 1px solid var(--color-linea);
  border-radius: var(--radio);
  overflow: hidden;
}

.portada {
  aspect-ratio: 3 / 4;
  background-color: var(--color-linea);
}

.cuerpo {
  padding: var(--espacio-2);
}

.pie {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--espacio-2);
}

.ejemplares {
  background-color: var(--color-acento);
  font-size: 0.8rem;
  padding: 2px 10px;
  border-radius: var(--radio);
}

.agotado {
  background-color: var(--color-texto);
  color: var(--color-fondo);
  font-size: 0.8rem;
  padding: 2px 10px;
  border-radius: var(--radio);
}

.ver-mas {
  font-size: 0.85rem;
  color: var(--color-secundario);
  text-decoration: underline;
  padding: 0;
  margin-top: var(--espacio-1);
}

.descripcion {
  font-size: 0.9rem;
  margin-top: var(--espacio-1);
}
</style>