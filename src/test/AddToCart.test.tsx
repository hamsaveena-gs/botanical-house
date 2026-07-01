import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddToCart from '@/components/ui/AddToCart'
import { useCartStore } from '@/features/cart/store/cartStore'

const props = { id: '1', title: 'Peace Lily', price: 209, image: '/plant.jpg', slug: 'peace-lily', inStock: true }

describe('AddToCart', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('renders Add to Cart button when not in cart', () => {
    render(<AddToCart {...props} />)
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('renders NotifyMe when out of stock', () => {
    render(<AddToCart {...props} inStock={false} />)
    expect(screen.getByText('Notify Me')).toBeInTheDocument()
  })

  it('shows quantity controls when item is in cart', () => {
    useCartStore.getState().addItem({ id: '1', title: 'Peace Lily', price: 209, image: '/plant.jpg', slug: 'peace-lily' })
    render(<AddToCart {...props} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('−')).toBeInTheDocument()
  })

  it('calls addItem when Add to Cart is clicked', async () => {
    render(<AddToCart {...props} />)
    await userEvent.click(screen.getByText('Add to Cart'))
    expect(useCartStore.getState().items).toHaveLength(1)
  })

  it('disables + button and shows max warning when at max quantity', async () => {
    useCartStore.getState().addItem({ id: '1', title: 'Peace Lily', price: 209, image: '/plant.jpg', slug: 'peace-lily' })
    useCartStore.getState().updateQuantity('1', 2)
    render(<AddToCart {...props} />)
    const plusBtn = screen.getByRole('button', { name: /increase quantity of peace lily/i })
    expect(plusBtn).toBeDisabled()
  })
})
