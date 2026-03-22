import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export const injectAppLoading = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url))
  const loadingPath = join(__dirname, './loading.html')
  const loadingHtml = await readFile(loadingPath, 'utf8')
  const loadingStyle = loadingHtml.match(/<style id="app-loading-style">[\s\S]*?<\/style>/)?.[0] || ''
  const loadingContainer = loadingHtml.match(/<div id="app-loading-container">[\s\S]*<\/div>/)?.[0] || ''

  return {
    name: 'inject-app-loading',
    transformIndexHtml(html) {
      return html.replace(/(<\/head>)/, `${loadingStyle}$1`).replace(/(<body>)/, `$1${loadingContainer}`)
    },
    enforce: 'pre',
  }
}
