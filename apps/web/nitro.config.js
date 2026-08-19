import { defineConfig } from 'nitro'

export default defineConfig({
  serverDir: './src/mock',
  routesDir: '.',
  routeRules: {
    '/**': {
      cors: true,
    },
  },
})
