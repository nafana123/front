import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app']
  },
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()]
    })
  ],
})