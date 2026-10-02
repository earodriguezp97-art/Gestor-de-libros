<template>
  <IngresoArchivo v-if="usuario === ''" @ingresar="entrarAlArchivo" />

  <template v-else>
    <TheHeader :usuario="usuario" @salir="salirDelArchivo" />
    <main>
      <router-view :libros="libros" @eliminar="eliminarLibro" @entrada="entradaEjemplar" @salida="salidaEjemplar" />
    </main>
    <SitioFooter />
  </template>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import TheHeader from './components/TheHeader.vue'
import IngresoArchivo from './components/IngresoArchivo.vue'
import SitioFooter from './components/SitioFooter.vue'

const store = useStore()

const libros = computed(() => store.getters['libros/lista'])
const usuario = computed(() => store.getters['sesion/usuario'])

onMounted(() => {
  store.dispatch('libros/cargarLibros')
})

function entrarAlArchivo(nombre) {
  store.commit('sesion/SET_USUARIO', nombre)
}

function eliminarLibro(id) {
  store.dispatch('libros/eliminarLibro', id)
}

function entradaEjemplar(id) {
  store.dispatch('libros/entradaEjemplar', id)
}

function salidaEjemplar(id) {
  store.dispatch('libros/salidaEjemplar', id)
}

function salirDelArchivo() {
  store.commit('sesion/CERRAR_SESION')
}
</script>