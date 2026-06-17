import { render, screen } from '@testing-library/react'
import ContactPage from '@/features/contact/ContactPage'

describe('ContactPage', () => {
  it('renders title and subheading', () => {
    render(<ContactPage title='Get in Touch' subHeading='We love plants' />)
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('We love plants')).toBeInTheDocument()
  })

  it('renders contact form', () => {
    render(<ContactPage title='Contact' />)
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })
})
