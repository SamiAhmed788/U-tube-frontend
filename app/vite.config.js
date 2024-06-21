import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { url } from './src/utils/domain'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: url, // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
