// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy para API Java
      '/api': {
        target: 'https://skillbridge-api-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
