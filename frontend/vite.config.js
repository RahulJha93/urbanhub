import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import http from "https";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://urbanhub-90b4.onrender.com',
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})

