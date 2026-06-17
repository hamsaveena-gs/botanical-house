import { render, screen } from '@testing-library/react'
import OrderSummary from '@/features/cart/components/OrderSummary'

describe('OrderSummary', () => {
  it('shows free shipping above 500', () => {
    render(<OrderSummary totalPrice={500} />)
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('shows shipping cost below 500', () => {
    render(<OrderSummary totalPrice={300} />)
    expect(screen.getByText('₹49')).toBeInTheDocument()
    expect(screen.getByText('Free shipping on orders above ₹500')).toBeInTheDocument()
  })

  it('shows grand total with shipping', () => {
    render(<OrderSummary totalPrice={300} />)
    expect(screen.getByText('₹349')).toBeInTheDocument()
  })
})
