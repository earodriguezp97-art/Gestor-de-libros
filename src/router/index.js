import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'
import NoEncontrado from '../views/NoEncontrado.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/libros',
    name: 'libros',
    component: ListaLibros
  },
  {
    path: '/libros/:id',
    name: 'detalle',
    component: DetalleLibro,
    props: true
  },
  {
  path: '/:pathMatch(.*)*',
  name: 'no-encontrado',
  component: NoEncontrado
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router