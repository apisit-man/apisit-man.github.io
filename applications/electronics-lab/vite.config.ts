import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  // @ts-expect-error vitest config
  test: {
    globals: true,
    environment: 'node'
  }
});
