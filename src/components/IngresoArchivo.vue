<template>
  <div class="ingreso">
    <div class="caja">
      <p class="etiqueta">Archivo</p>
      <h1>Libros de arte y catálogos</h1>

      <p class="texto-secundario">
        Escribe tu nombre para entrar al archivo.
      </p>

      <input
        v-model.trim="nombre"
        type="text"
        placeholder="Tu nombre"
        @keyup.enter="entrar"
      />

      <button class="boton-principal" @click.once="entrar">
        Entrar
      </button>

      <p v-if="error" class="texto-secundario">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ingresar'])

const nombre = ref('')
const error = ref('')

function entrar() {
  if (nombre.value === '') {
    error.value = 'Necesitas escribir un nombre.'
    return
  }
  emit('ingresar', nombre.value)
}
</script>

<style scoped>
.ingreso {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.caja {
  background-color: var(--color-ficha);
  border: 1px solid var(--color-linea);
  border-radius: var(--radio);
  padding: var(--espacio-4);
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: var(--espacio-2);
}
</style>