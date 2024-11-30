import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'tests/unit/',
    environmentMatchGlobs: [
      ['test/integration/integration/**/*.spec.ts', 'prisma'],
    ],
    environment: 'node',
    globals: true,
  },
})
