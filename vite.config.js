import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'  // Adicionando a importação do tailwindcss

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // Agora o tailwindcss é passado como plugin corretamente
  ], 
  
  server: {
    port: 5173
  },
})
