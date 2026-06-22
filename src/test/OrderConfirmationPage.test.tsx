import { render, screen } from '@testing-library/react'
import OrderConfirmationPage from '@/features/checkout/OrderConfirmationPage'
import { useCartStore } from '@/features/cart/store/cartStore'

const mockOrder = {
  id: '123',
  customer: { name: 'Test User', email: 'test@test.com' },
  total: 567,
  date: '2026-06-22T10:00:00.000Z',
}

describe('OrderConfirmationPage', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
    localStorage.clear()
  })

  it('shows no order found when no order in localStorage', () => {
    render(<OrderConfirmationPage />)
    expect(screen.getByText('No order found')).toBeInTheDocument()
  })

  it('shows order details when order is in localStorage', () => {
    localStorage.setItem('bh-last-order', JSON.stringify(mockOrder))
    render(<OrderConfirmationPage />)
    expect(screen.getByText('Order Confirmed!')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
    expect(screen.getByText('₹567')).toBeInTheDocument()
  })

  it('shows Browse Plants link when no order', () => {
    render(<OrderConfirmationPage />)
    expect(screen.getByRole('link', { name: 'Browse Plants' })).toHaveAttribute('href', '/plants')
  })

  it('shows Continue Shopping link when order exists', () => {
    localStorage.setItem('bh-last-order', JSON.stringify(mockOrder))
    render(<OrderConfirmationPage />)
    expect(screen.getByRole('link', { name: 'Continue Shopping' })).toHaveAttribute('href', '/plants')
  })
})
