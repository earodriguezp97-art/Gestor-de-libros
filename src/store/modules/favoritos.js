const guardados = localStorage.getItem('archivo-favoritos')

export default {
  namespaced: true,
  state: () => ({
    ids: guardados ? JSON.parse(guardados) : []
  }),
  mutations: {
    TOGGLE_FAVORITO(state, id) {
      state.ids = state.ids.includes(id)
        ? state.ids.filter(i => i !== id)
        : [...state.ids, id]
      localStorage.setItem('archivo-favoritos', JSON.stringify(state.ids))
    }
  },
  getters: {
    ids: state => state.ids
  }
}