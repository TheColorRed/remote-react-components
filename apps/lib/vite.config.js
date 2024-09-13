import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import baseConfig from '../../vite.config';

const opts = defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    minify: 'terser',
    ...baseConfig.build,
    target: 'esnext',
    outDir: path.resolve(__dirname, '../../dist/common'),
    emptyOutDir: true,
    lib: {
      ...baseConfig.build.lib,
      formats: ['es'],
      entry: {
        common: path.resolve(__dirname, 'src/index.tsx'),
        shapes: path.resolve(__dirname, 'src/shapes/index.tsx'),
      },
    },
  },
});

// console.log(opts);

export default opts;
