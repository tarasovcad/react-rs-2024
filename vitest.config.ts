/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
    coverage: {
      include: ['app/**'],
      exclude: ['**/node_modules/**', '**/entry.client.tsx', '**/entry.server.tsx', '**/root.tsx'],
    },
    exclude: ['**/entry.client.tsx', '**/node_modules/**'],
  },
});
