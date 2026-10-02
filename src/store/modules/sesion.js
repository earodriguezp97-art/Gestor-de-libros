export default {
    namespaced: true,
    state: () => ({
        usuario: localStorage.getItem('archivo-usuario') || ''
    }),
    mutations: {
        SET_USUARIO(state, nombre) {
            state.usuario = nombre
            localStorage.setItem('archivo-usuario', nombre)
        },
        CERRAR_SESION(state) {
            state.usuario = ''
            localStorage.removeItem('archivo-usuario')
        }
    },
    getters: {
        usuario: state => state.usuario
    }
}