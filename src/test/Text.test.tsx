import { render, screen } from '@testing-library/react'
import Text from '@/components/ui/Text'

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders default tag as p', () => {
    render(<Text>Para</Text>)
    expect(screen.getByText('Para').tagName).toBe('P')
  })

  it('renders as span when specified', () => {
    render(<Text as='span'>Inline</Text>)
    expect(screen.getByText('Inline').tagName).toBe('SPAN')
  })

  it('applies text variant class', () => {
    render(<Text variant='muted'>Muted</Text>)
    expect(screen.getByText('Muted').className).toContain('text-muted')
  })
})
