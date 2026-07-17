import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works from any subfolder or file:// preview
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split heavy/independent pieces into their own cacheable chunks.
        manualChunks(id) {
          if (id.includes('react-syntax-highlighter') || id.includes('refractor') || id.includes('prismjs')) {
            return 'highlighter'
          }
          if (id.includes('/src/content.js')) return 'content'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
