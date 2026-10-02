<template>
    <form class="formulario" @submit.prevent="enviar">
        <h3>Registrar pieza</h3>

        <input v-model="titulo" type="text" placeholder="Título" @keyup.enter="enviar" />

        <input v-model="autor" type="text" placeholder="Autor o artista" @keyup.enter="enviar" />

        <select v-model="categoria">
            <option value="">Elige una categoría</option>
            <option value="Libro de artista">Libro de artista</option>
            <option value="Catálogo">Catálogo</option>
            <option value="Ensayo">Ensayo</option>
            <option value="Revista">Revista</option>
        </select>

        <textarea v-model="descripcion" rows="3" placeholder="Descripción"></textarea>

        <div class="campo">
            <label class="etiqueta" for="ejemplares">Ejemplares</label>
            <input id="ejemplares" v-model.number="ejemplares" type="number" min="0" />
        </div>

        <button type="submit" class="boton-principal">Agregar al archivo</button>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="vista-previa">
            <p class="etiqueta">Vista previa</p>
            <p><strong>{{ titulo || 'Sin título' }}</strong></p>
            <p class="texto-secundario">{{ autor || 'Sin autor' }}</p>
            <p class="texto-secundario">{{ categoria || 'Sin categoría' }}</p>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const titulo = ref('')
const autor = ref('')
const categoria = ref('')
const descripcion = ref('')
const ejemplares = ref(1)
const error = ref('')

async function enviar() {
    if (titulo.value === '' || autor.value === '' || categoria.value === '') {
        error.value = 'Faltan el título, el autor o la categoría.'
        return
    }

    const nuevo = await store.dispatch('libros/agregarLibro', {
        titulo: titulo.value,
        autor: autor.value,
        categoria: categoria.value,
        descripcion: descripcion.value,
        ejemplares: ejemplares.value,
        portada: ''
    })

    titulo.value = ''
    autor.value = ''
    categoria.value = ''
    descripcion.value = ''
    ejemplares.value = 1
    error.value = ''

    router.push('/libros/' + nuevo.id)
}
</script>

<style scoped>
.formulario {
    background-color: var(--color-ficha);
    border: 1px solid var(--color-linea);
    border-radius: var(--radio);
    padding: var(--espacio-3);
    display: flex;
    flex-direction: column;
    gap: var(--espacio-2);
}

.vista-previa {
    border-top: 1px solid var(--color-linea);
    padding-top: var(--espacio-2);
}

.error {
    color: var(--color-texto);
    background-color: var(--color-acento);
    padding: var(--espacio-1);
    border-radius: var(--radio);
    font-size: 0.9rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>