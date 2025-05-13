import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/chat-project-app/' : '/',
  assetsDir: 'assets', // Указание директории для активов
  outDir: 'dist' // Указание выходного каталога для сборки
})
