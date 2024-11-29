import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['tests/**/*.spec.ts'],
    environmentMatchGlobs: [['test/integration/**.spec.ts', 'prisma']],
    environment: 'node',
    globals: true,
  },
})
