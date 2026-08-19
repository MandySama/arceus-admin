import './assets/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import { Icon } from '@iconify/vue'

import { removeAppLoading } from './plugins/inject-app-loading/remove-app-loading'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

app.component('Icon', Icon)

app.mount('#app')

await router.isReady()
removeAppLoading()
