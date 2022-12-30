import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  plugins: [
    RubyPlugin(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx' // https://github.com/vitejs/vite/discussions/3448
      }
    }
  }
})
