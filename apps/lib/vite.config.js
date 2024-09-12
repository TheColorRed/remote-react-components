import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import baseConfig from '../../vite.config';

const opts = defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
  build: {
    ...baseConfig.build,
    minify: false,
    target: 'esnext',
    outDir: path.resolve(__dirname, '../../dist/console'),
    emptyOutDir: true,
    lib: {
      ...baseConfig.build.lib,
      formats: ['es'],
      entry: {
        welcome: path.resolve(__dirname, 'src/welcome-header.tsx'),
        shapes: path.resolve(__dirname, 'src/shapes/index.tsx'),
      },
    },
    rollupOptions: {
      // external: ['react', 'react-dom', 'jsx-runtime'],
    },
  },
});

// console.log(opts);

export default opts;
