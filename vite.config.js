import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        courses: resolve(__dirname, 'courses.html'),
        rentals: resolve(__dirname, 'rentals.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
