<template>
  <section class="contenedor">
    <p class="etiqueta">Error 404</p>
    <h1>Esta página no existe</h1>
    <p class="texto-secundario">
      La dirección que buscas no corresponde a ninguna sección del archivo.
    </p>
    <router-link to="/" class="boton-principal">Volver al inicio</router-link>
  </section>
</template>

<style scoped>
.boton-principal {
  display: inline-block;
  margin-top: var(--espacio-3);
}
</style>