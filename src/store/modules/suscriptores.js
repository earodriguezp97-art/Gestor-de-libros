import api from '@/api'

export default {
  namespaced: true,
  state: () => ({
    lista: [],
    enviando: false
  }),
  mutations: {
    AGREGAR_SUSCRIPTOR(state, suscriptor) {
      state.lista.push(suscriptor)
    },
    SET_ENVIANDO(state, val) {
      state.enviando = val
    }
  },
  actions: {
    async suscribir({ commit }, email) {
      commit('SET_ENVIANDO', true)
      try {
        const { data } = await api.post('/suscriptores', { email })
        commit('AGREGAR_SUSCRIPTOR', data)
      } finally {
        commit('SET_ENVIANDO', false)
      }
    }
  },
  getters: {
    enviando: state => state.enviando
  }
}