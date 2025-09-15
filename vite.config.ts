import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components')
    }
  },
  plugins: [tailwindcss(), react()],
})
