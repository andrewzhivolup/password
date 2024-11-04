import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//eslint-disable-next-line
const appVersion = JSON.stringify(process.env.npm_package_version)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    '__APP_VERSION__': appVersion,
  }
})
