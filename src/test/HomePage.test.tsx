import { render, screen } from '@testing-library/react'
import HomePage from '@/features/home/HomePage'
import type { Page } from '@/types'

const mockPage = {
  sys: { id: 'p1' },
  fields: {
    title: 'Home',
    slug: '/',
    sections: [
      {
        sys: { contentType: { sys: { id: 'ctaBlock' } } },
        fields: { heading: 'Welcome', buttonText: 'Shop', buttonUrl: '/plants', backgroundColor: 'white' },
      },
    ],
  },
} as unknown as Page

describe('HomePage', () => {
  it('renders sections', () => {
    render(<HomePage page={mockPage} />)
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })

  it('renders nothing when no sections', () => {
    const empty = { ...mockPage, fields: { ...mockPage.fields, sections: [] } }
    const { container } = render(<HomePage page={empty} />)
    expect(container.innerHTML).toBe('')
  })
})
