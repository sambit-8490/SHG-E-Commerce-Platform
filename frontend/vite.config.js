import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),    
    tailwindcss(),
  ],
  // --- ADD THIS 'server' BLOCK ---
  // This forces Vite to run on 127.0.0.1
  server: {
    host: '127.0.0.1',
    port: 5173
  }
  // ---------------------------------
})