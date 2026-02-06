import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // <- 여기 중요! 상대 경로로 바꿔야 Vercel에서 JS/CSS 404 안 뜸
})
