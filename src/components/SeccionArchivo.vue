<template>
  <section class="seccion">
    <header class="encabezado">
      <p class="etiqueta">{{ titulo }}</p>
      <slot name="accion"></slot>
    </header>

    <div class="contenido">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.seccion {
  margin-top: var(--espacio-4);
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-linea);
  padding-bottom: var(--espacio-1);
  margin-bottom: var(--espacio-2);
}
</style>