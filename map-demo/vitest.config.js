import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    target: 'es2022',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setup-vitest.ts'],
  },
    define: {
    'import.meta.vitest': undefined,
  },
});
