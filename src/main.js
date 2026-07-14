import './assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import { removeAppLoading } from './plugins/inject-app-loading/remove-app-loading'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')

removeAppLoading()
