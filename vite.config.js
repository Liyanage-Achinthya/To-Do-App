import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),        // React fast-refresh + JSX transform
    tailwindcss(),  // Tailwind’s official Vite plugin
  ],
})
