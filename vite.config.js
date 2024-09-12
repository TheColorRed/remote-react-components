import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../dist',
    // emptyOutDir: true,
    lib: {
      formats: ['es'],
    },
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  server: {
    port: 4200,
  },
});
