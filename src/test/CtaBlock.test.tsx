import { render, screen } from '@testing-library/react'
import CtaBlock from '@/components/ui/CtaBlock'

describe('CtaBlock', () => {
  const fields = {
    heading: 'Get in Touch',
    description: 'We love plants',
    buttonText: 'Contact Us',
    buttonUrl: '/contact',
    backgroundColor: 'white',
  }

  it('renders heading, description and button', () => {
    render(<CtaBlock fields={fields} />)
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('We love plants')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders button as link', () => {
    render(<CtaBlock fields={fields} />)
    expect(screen.getByText('Contact Us')).toHaveAttribute('href', '/contact')
  })

  it('does not render description when not provided', () => {
    render(<CtaBlock fields={{ ...fields, description: undefined }} />)
    expect(screen.queryByText('We love plants')).not.toBeInTheDocument()
  })

  it('applies dark bg class for emerald', () => {
    const { container } = render(<CtaBlock fields={{ ...fields, backgroundColor: 'emerald' }} />)
    expect(container.querySelector('section')?.className).toContain('bg-emerald-700')
  })

  it('applies light bg class for white', () => {
    const { container } = render(<CtaBlock fields={{ ...fields, backgroundColor: 'white' }} />)
    expect(container.querySelector('section')?.className).toContain('bg-white')
  })

  it('renders white button on dark bg', () => {
    render(<CtaBlock fields={{ ...fields, backgroundColor: 'emerald' }} />)
    expect(screen.getByText('Contact Us').className).toContain('btn-white')
  })

  it('renders primary button on light bg', () => {
    render(<CtaBlock fields={{ ...fields, backgroundColor: 'white' }} />)
    expect(screen.getByText('Contact Us').className).toContain('btn-primary')
  })

  it('handles display-name alias (Deep Indigo)', () => {
    const { container } = render(<CtaBlock fields={{ ...fields, backgroundColor: 'Deep Indigo' }} />)
    expect(container.querySelector('section')?.className).toContain('bg-indigo-600')
  })

  it('falls back to dark bg when color is missing', () => {
    const { container } = render(<CtaBlock fields={{ ...fields, backgroundColor: '' }} />)
    expect(container.querySelector('section')?.className).toContain('bg-neutral-800')
  })
})
