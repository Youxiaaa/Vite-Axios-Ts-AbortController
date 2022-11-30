import { createApp } from 'vue'
import './style.css'
import 'uno.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 將 api 封裝 provide 到 Vue3 實例
import api from './api/index'
app.provide('$api', api)

// 引入 Pinia 以及封裝後的 stores
import { createPinia } from 'pinia'
const pinia = createPinia()
import stores from './store/index.js'
app.provide('$stores', stores)

app
.use(router)
.use(pinia)
.mount('#app')
