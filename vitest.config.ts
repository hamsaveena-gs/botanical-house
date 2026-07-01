import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: { modules: { classNameStrategy: 'non-scoped' } },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/types/**',
        'src/**/*.d.ts',
        'src/app/layout.tsx',
        'src/app/[[...slug]]/page.tsx',
        'src/app/not-found.tsx',
        'src/app/plants/[slug]/page.tsx',
        'src/app/plants/page.tsx',
        'src/app/checkout/page.tsx',
        'src/app/cart/page.tsx',
        'src/app/order-confirmation/page.tsx',
        'src/app/api/**',
        'src/lib/analytics.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
