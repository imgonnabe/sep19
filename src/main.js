import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store/store'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$server = 'http://localhost:3000'
app.config.globalProperties.$store = store;
app.use(router)
app.use(store).mount('#app')

