import './assets/main.css'
import './assets/element-plus.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import persist from 'pinia-plugin-persistedstate'

import { Icon } from '@iconify/vue'

import { removeAppLoading } from './plugins/inject-app-loading/remove-app-loading'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

app.component('icon', Icon)

app.mount('#app')

removeAppLoading()
