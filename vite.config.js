import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import legacy from '@vitejs/plugin-legacy'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import { injectAppLoading } from './src/plugins'
import tailwindcss from '@tailwindcss/vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: mode === 'production' ? './' : '/',
    plugins: [
      vue(),
      vueJsx(),
      // vueDevTools({
      //   launchEditor: 'webstorm',
      // }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.js',
        },
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // https://icon-sets.iconify.design
          IconsResolver({
            prefix: 'i',
            enabledCollections: ['ant-design'],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      injectAppLoading(),
      tailwindcss(),
      viteMockServe({
        mockPath: 'src/mock',
        enable: mode === 'development',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      // open: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
