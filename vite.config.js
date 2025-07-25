import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173
  },
  base: '/',
  // for single page apps
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});