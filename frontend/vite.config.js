import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:5000'  //for handling cors errors - if visit this then dont give us any errors
      }
    }
  }
})
