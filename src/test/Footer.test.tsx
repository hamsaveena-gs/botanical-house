import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
    expect(screen.getByText(/Botanical House/)).toBeInTheDocument()
  })
})
