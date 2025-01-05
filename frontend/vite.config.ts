import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../backend"),
    },
  },
  server:{
    proxy:{
        "/api":{
            target:"http://127.0.0.1:3000",
            changeOrigin:true
        }
    }
  }
})
