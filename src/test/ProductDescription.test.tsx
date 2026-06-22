import { render, screen } from '@testing-library/react'
import ProductDescription from '@/features/plants/components/ProductDescription'

const mockBody = {
  nodeType: 'document',
  data: {},
  content: [
    { nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: 'This is a beautiful plant.', marks: [], data: {} }] },
  ],
}

describe('ProductDescription', () => {
  it('renders heading', () => {
    render(<ProductDescription description={mockBody} />)
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders rich text content', () => {
    render(<ProductDescription description={mockBody} />)
    expect(screen.getByText('This is a beautiful plant.')).toBeInTheDocument()
  })

  it('renders nothing when description is null', () => {
    const { container } = render(<ProductDescription description={null} />)
    expect(screen.getByText('About')).toBeInTheDocument()
  })
})
