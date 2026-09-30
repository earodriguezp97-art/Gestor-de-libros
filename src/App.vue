<template>
  <IngresoArchivo v-if="usuario === ''" @ingresar="entrarAlArchivo" />

  <template v-else>
    <TheHeader :usuario="usuario" />
    <main>
      <router-view :libros="libros" @agregar="agregarLibro" @eliminar="eliminarLibro" @entrada="entradaEjemplar"
        @salida="salidaEjemplar" />
    </main>
  </template>
</template>

<script setup>
import { ref, watch } from 'vue'
import TheHeader from './components/TheHeader.vue'
import IngresoArchivo from './components/IngresoArchivo.vue'
import { librosIniciales } from './data/libros.js'

const librosGuardados = localStorage.getItem('archivo-libros')
const libros = ref(librosGuardados ? JSON.parse(librosGuardados) : librosIniciales)

const usuarioGuardado = localStorage.getItem('archivo-usuario')
const usuario = ref(usuarioGuardado ? usuarioGuardado : '')

watch(libros, (nuevosLibros) => {
  localStorage.setItem('archivo-libros', JSON.stringify(nuevosLibros))
}, { deep: true })

watch(usuario, (nuevoUsuario) => {
  localStorage.setItem('archivo-usuario', nuevoUsuario)
})

function entrarAlArchivo(nombre) {
  usuario.value = nombre
}

function agregarLibro(nuevoLibro) {
  libros.value.push(nuevoLibro)
}

function eliminarLibro(id) {
  libros.value = libros.value.filter(libro => libro.id !== id)
}

function entradaEjemplar(id) {
  const libro = libros.value.find(item => item.id === id)
  if (libro) {
    libro.ejemplares = libro.ejemplares + 1
  }
}

function salidaEjemplar(id) {
  const libro = libros.value.find(item => item.id === id)
  if (libro) {
    if (libro.ejemplares > 0) {
      libro.ejemplares = libro.ejemplares - 1
    }
  }
}
</script>