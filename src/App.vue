<template>
  <IngresoArchivo v-if="usuario === ''" @ingresar="entrarAlArchivo" />

  <template v-else>
    <TheHeader :usuario="usuario" />
    <main>
      <router-view
        :libros="libros"
        @agregar="agregarLibro"
        @eliminar="eliminarLibro"
      />
    </main>
  </template>
</template>

<script setup>
import { ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import IngresoArchivo from './components/IngresoArchivo.vue'
import { librosIniciales } from './data/libros.js'

const libros = ref(librosIniciales)
const usuario = ref('')

function entrarAlArchivo(nombre) {
  usuario.value = nombre
}

function agregarLibro(nuevoLibro) {
  libros.value.push(nuevoLibro)
}

function eliminarLibro(id) {
  libros.value = libros.value.filter(libro => libro.id !== id)
}
</script>