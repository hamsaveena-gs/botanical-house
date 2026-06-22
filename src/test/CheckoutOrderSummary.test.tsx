import { render, screen } from '@testing-library/react'
import CheckoutOrderSummary from '@/features/checkout/components/CheckoutOrderSummary'

describe('CheckoutOrderSummary', () => {
  const items = [
    { id: '1', title: 'Peace Lily', price: 209, image: '/plant.jpg', quantity: 2 },
    { id: '2', title: 'Snake Plant', price: 149, image: '/plant2.jpg', quantity: 1 },
  ]

  it('renders items with quantity and price', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={567} allFilled />)
    expect(screen.getByText('Peace Lily')).toBeInTheDocument()
    expect(screen.getByText('Snake Plant')).toBeInTheDocument()
    expect(screen.getByText('Qty: 2')).toBeInTheDocument()
    expect(screen.getByText('Qty: 1')).toBeInTheDocument()
    expect(screen.getByText('₹418')).toBeInTheDocument()
    expect(screen.getByText('₹149')).toBeInTheDocument()
  })

  it('shows subtotal', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={567} allFilled />)
    expect(screen.getAllByText('₹567')).toHaveLength(2)
  })

  it('shows free shipping when total >= 500', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={500} allFilled />)
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('shows shipping cost when total < 500', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={300} allFilled />)
    expect(screen.getByText('₹49')).toBeInTheDocument()
  })

  it('calculates grand total correctly', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={300} allFilled />)
    expect(screen.getByText('₹349')).toBeInTheDocument()
  })

  it('disables Place Order when not allFilled', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={300} allFilled={false} />)
    expect(screen.getByText('Place Order')).toBeDisabled()
  })

  it('enables Place Order when allFilled', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={300} allFilled />)
    expect(screen.getByText('Place Order')).not.toBeDisabled()
  })

  it('renders Back to Cart link', () => {
    render(<CheckoutOrderSummary items={items} totalPrice={300} allFilled />)
    expect(screen.getByText('Back to Cart')).toHaveAttribute('href', '/cart')
  })
})
