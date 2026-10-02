<template>
  <article class="tarjeta" v-agotado="libro.ejemplares">
    <div class="portada">
      <img v-if="libro.portada" :src="libro.portada" :alt="libro.titulo" />
    </div>

    <div class="cuerpo">
      <p class="etiqueta">{{ libro.categoria }}</p>

      <div class="fila-titulo">
        <router-link :to="'/libros/' + libro.id">
          <h3>{{ libro.titulo }}</h3>
        </router-link>
        <button class="boton-favorito" @click="alternarFavorito">
          {{ esFavorito ? '★' : '☆' }}
        </button>
      </div>

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

        <div class="controles">
          <button @click="$emit('salida', libro.id)">−</button>
          <button @click="$emit('entrada', libro.id)">+</button>
          <button @click="$emit('eliminar', libro.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  libro: {
    type: Object,
    required: true
  }
})

defineEmits(['eliminar', 'entrada', 'salida'])

const store = useStore()

const verDescripcion = ref(false)

const esFavorito = computed(() => store.getters['favoritos/ids'].includes(props.libro.id))

function alternarFavorito() {
  store.commit('favoritos/TOGGLE_FAVORITO', props.libro.id)
}
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

.fila-titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espacio-1);
}

.boton-favorito {
  background: none;
  border: none;
  padding: 0;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--color-texto);
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

.controles {
  display: flex;
  align-items: center;
  gap: var(--espacio-1);
}

.portada img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>