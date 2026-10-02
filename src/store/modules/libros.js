import api from '@/api'

export default {
    namespaced: true,
    state: () => ({
        lista: [],
        loading: false,
        error: null
    }),
    mutations: {
        SET_LIBROS(state, libros) {
            state.lista = libros
        },
        AGREGAR_LIBRO(state, libro) {
            state.lista.push(libro)
        },
        EDITAR_LIBRO(state, libroActualizado) {
            const index = state.lista.findIndex(l => l.id === libroActualizado.id)
            if (index !== -1) state.lista[index] = libroActualizado
        },
        ELIMINAR_LIBRO(state, id) {
            state.lista = state.lista.filter(l => l.id !== id)
        },
        SET_LOADING(state, val) {
            state.loading = val
        },
        SET_ERROR(state, val) {
            state.error = val
        }
    },
    actions: {
        async cargarLibros({ commit }) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            try {
                const { data } = await api.get('/libros')
                commit('SET_LIBROS', data)
            } catch (e) {
                commit('SET_ERROR', 'No se pudieron cargar los libros.')
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async agregarLibro({ commit }, datos) {
            const { data } = await api.post('/libros', datos)
            commit('AGREGAR_LIBRO', data)
            return data
        },
        async eliminarLibro({ commit }, id) {
            await api.delete(`/libros/${id}`)
            commit('ELIMINAR_LIBRO', id)
        },
        async entradaEjemplar({ commit, state }, id) {
            const libro = state.lista.find(l => l.id === id)
            if (!libro) return
            const { data } = await api.put(`/libros/${id}`, { ...libro, ejemplares: libro.ejemplares + 1 })
            commit('EDITAR_LIBRO', data)
        },
        async salidaEjemplar({ commit, state }, id) {
            const libro = state.lista.find(l => l.id === id)
            if (!libro || libro.ejemplares === 0) return
            const { data } = await api.put(`/libros/${id}`, { ...libro, ejemplares: libro.ejemplares - 1 })
            commit('EDITAR_LIBRO', data)
        }
    },
    getters: {
        lista: state => state.lista,
        loading: state => state.loading,
        error: state => state.error,
        libroPorId: state => id => state.lista.find(l => l.id === id)
    }
}