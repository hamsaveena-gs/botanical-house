import { render, screen } from '@testing-library/react'
import Heading from '@/components/ui/Heading'

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading>Hello</Heading>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders default tag as h2', () => {
    render(<Heading>Test</Heading>)
    expect(screen.getByText('Test').tagName).toBe('H2')
  })

  it('renders specified tag', () => {
    render(<Heading as='h1'>Title</Heading>)
    expect(screen.getByText('Title').tagName).toBe('H1')
  })

  it('applies heading variant class', () => {
    render(<Heading variant='page'>Page</Heading>)
    expect(screen.getByText('Page').className).toContain('heading-page')
  })
})
