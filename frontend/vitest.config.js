import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Test-only config. The app itself uses vite.config.js.
// Run with:  npx vitest run
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
