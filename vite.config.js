import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/market/',
  plugins: [react()],
  define: {
    'process.env.VITE_API_KEY_IMAGES': JSON.stringify(process.env.VITE_API_KEY_IMAGES)
  }
})
