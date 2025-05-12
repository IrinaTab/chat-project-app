import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/chat-project-app/' // Если проект лежит не в корне (например, `https://user.github.io/repo/`).
})