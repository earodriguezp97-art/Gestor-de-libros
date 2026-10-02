import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.css'
import { agotado } from './directives/agotado.js'

createApp(App).use(store).use(router).directive('agotado', agotado).mount('#app')