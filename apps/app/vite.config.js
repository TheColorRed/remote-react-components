import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    formats: ['es'],
    rollupOptions: {
      external: ['react', 'react-dom', 'jsx-runtime'],
    },
  },
  server: {
    port: 4200,
  },
});
