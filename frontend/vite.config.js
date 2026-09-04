import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    server: {
      host: '0.0.0.0',
      port: env.FRONTEND_URL,
      allowedHosts: true,

      proxy: {
        '/api': {
          target: env.BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
  }
})