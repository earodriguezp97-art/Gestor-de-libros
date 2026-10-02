import { createStore } from 'vuex'
import libros from './modules/libros'
import favoritos from './modules/favoritos'
import sesion from './modules/sesion'
import suscriptores from './modules/suscriptores'

export default createStore({
  modules: { libros, favoritos, sesion, suscriptores }
})