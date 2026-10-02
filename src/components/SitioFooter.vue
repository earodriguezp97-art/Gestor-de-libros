<template>
  <footer class="pie">
    <div class="contenedor pie-contenido">
      <div>
        <p class="etiqueta">Boletín</p>
        <p class="texto-secundario">
          Recibe las novedades del archivo en tu correo.
        </p>
      </div>

      <form class="formulario-pie" @submit.prevent="suscribir">
        <input
          v-model.trim="email"
          type="email"
          placeholder="tu@correo.cl"
        />
        <button type="submit" class="boton-principal">Suscribirse</button>
      </form>

      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const email = ref('')
const mensaje = ref('')

async function suscribir() {
  if (!email.value.includes('@') || !email.value.includes('.')) {
    mensaje.value = 'Escribe un correo válido.'
    return
  }

  await store.dispatch('suscriptores/suscribir', email.value)
  mensaje.value = 'Listo, quedaste suscrita al boletín.'
  email.value = ''
}
</script>

<style scoped>
.pie {
  border-top: 1px solid var(--color-linea);
  margin-top: var(--espacio-4);
}

.pie-contenido {
  display: flex;
  flex-direction: column;
  gap: var(--espacio-2);
}

.formulario-pie {
  display: flex;
  gap: var(--espacio-1);
  max-width: 420px;
}

.mensaje {
  font-size: 0.9rem;
  color: var(--color-secundario);
}
</style>