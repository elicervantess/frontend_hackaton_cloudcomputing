import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Asegúrate de que los archivos de salida sean generados en la carpeta 'dist'
    assetsDir: 'assets', // Asegura que los recursos estáticos se coloquen en la carpeta 'assets'
    rollupOptions: {
      input: 'index.html', // Asegúrate de que 'index.html' sea el archivo principal
    },},
  plugins: [react()],
})
