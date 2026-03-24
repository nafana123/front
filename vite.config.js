import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  server: {
    allowedHosts: 'all'
  },
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()]
    })
  ],
})