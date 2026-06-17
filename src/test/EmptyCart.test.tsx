import { render, screen } from '@testing-library/react'
import EmptyCart from '@/features/cart/components/EmptyCart'

describe('EmptyCart', () => {
  it('renders empty message and browse link', () => {
    render(<EmptyCart />)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Browse Plants')).toBeInTheDocument()
  })
})
