import '@testing-library/jest-dom/vitest'
import React from 'react'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useSelectedLayoutSegment: () => null,
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, fill: _fill, priority: _priority, fetchPriority: _fp, ...props }: Record<string, unknown>) => {
    const imgSrc = typeof src === 'string' ? src : ''
    return React.createElement('img', { src: imgSrc, alt: (alt as string) ?? '', ...props })
  },
}))
