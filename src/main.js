import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { agotado } from './directives/agotado.js'

createApp(App).use(router).directive('agotado', agotado).mount('#app')

