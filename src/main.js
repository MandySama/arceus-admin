import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import persist from 'pinia-plugin-persistedstate'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as AntDesignIconsVue from '@ant-design/icons-vue'

import { removeAppLoading } from './utils/remove-app-loading'

const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`Ep${key}`, component)
}

for (const [key, component] of Object.entries(AntDesignIconsVue)) {
  app.component(`Ad${key}`, component)
}

app.mount('#app')

removeAppLoading()
