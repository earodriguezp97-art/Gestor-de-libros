<template>
    <header class="cabecera">
        <div class="contenedor barra">
            <router-link to="/" class="marca">Archivo</router-link>

            <div class="grupo-derecha">
                <nav>
                    <router-link to="/">Inicio</router-link>
                    <router-link to="/libros">Catálogo</router-link>
                </nav>
                <span class="texto-secundario">{{ usuario }}</span>
                <button class="salir" @click="$emit('salir')">Salir</button>
            </div>
        </div>
    </header>
</template>

<script setup>
defineProps({
    usuario: {
        type: String,
        required: true
    }
})
defineEmits(['salir'])
</script>

<style scoped>
.cabecera {
    border-bottom: 1px solid var(--color-linea);
    padding: var(--espacio-2) 0;
    margin-bottom: var(--espacio-4);
}

.barra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
}

nav {
    display: flex;
    gap: var(--espacio-2);
}

.marca {
    font-weight: 600;
}

.router-link-active {
    color: var(--color-secundario);
}

.grupo-derecha {
    display: flex;
    align-items: center;
    gap: var(--espacio-3);
}

.salir {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  color: var(--color-secundario);
  text-decoration: underline;
  cursor: pointer;
}
</style>