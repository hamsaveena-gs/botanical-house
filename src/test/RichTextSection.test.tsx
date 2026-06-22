import { render, screen } from '@testing-library/react'
import RichTextSection from '@/components/ui/RichTextSection'

const mockBody = {
  nodeType: 'document',
  data: {},
  content: [
    { nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: 'Hello from Contentful', marks: [], data: {} }] },
  ],
}

describe('RichTextSection', () => {
  it('renders heading', () => {
    render(<RichTextSection fields={{ heading: 'Welcome', body: mockBody, backgroundColor: 'white' }} />)
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })

  it('renders rich text body', () => {
    render(<RichTextSection fields={{ heading: 'Welcome', body: mockBody, backgroundColor: 'white' }} />)
    expect(screen.getByText('Hello from Contentful')).toBeInTheDocument()
  })

  it('does not render heading when not provided', () => {
    render(<RichTextSection fields={{ body: mockBody, backgroundColor: 'white' }} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders nothing when body is null', () => {
    const { container } = render(<RichTextSection fields={{ heading: 'Hi', body: null as unknown as typeof mockBody, backgroundColor: 'white' }} />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('applies dark bg class for emerald', () => {
    const { container } = render(<RichTextSection fields={{ heading: 'Test', body: mockBody, backgroundColor: 'emerald' }} />)
    expect(container.querySelector('section')?.className).toContain('bg-emerald-600')
  })

  it('applies light bg class for white', () => {
    const { container } = render(<RichTextSection fields={{ heading: 'Test', body: mockBody, backgroundColor: 'white' }} />)
    expect(container.querySelector('section')?.className).toContain('bg-white')
  })

  it('applies white text on dark bg', () => {
    render(<RichTextSection fields={{ heading: 'Test', body: mockBody, backgroundColor: 'emerald' }} />)
    expect(screen.getByText('Test').className).toContain('text-white')
  })

  it('handles display-name alias (Emerald Green)', () => {
    const { container } = render(<RichTextSection fields={{ heading: 'Test', body: mockBody, backgroundColor: 'Emerald Green' }} />)
    expect(container.querySelector('section')?.className).toContain('bg-emerald-600')
  })
})
