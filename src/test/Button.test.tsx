import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders as <a> when href is provided', () => {
    render(<Button href='/test'>Link</Button>)
    const link = screen.getByText('Link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('renders as <button> by default', () => {
    render(<Button>Btn</Button>)
    expect(screen.getByText('Btn').tagName).toBe('BUTTON')
  })

  it('applies variant classes', () => {
    render(<Button variant='danger'>Danger</Button>)
    expect(screen.getByText('Danger').className).toContain('btn-danger')
  })

  it('applies size classes', () => {
    render(<Button size='lg'>Large</Button>)
    expect(screen.getByText('Large').className).toContain('btn-lg')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })
})
