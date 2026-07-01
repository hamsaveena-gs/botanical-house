import { render, screen } from '@testing-library/react'
import CartPage from '@/features/cart/CartPage'
import { useCartStore } from '@/features/cart/store/cartStore'

describe('CartPage', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('renders empty cart when no items', () => {
    render(<CartPage />)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Browse Plants')).toBeInTheDocument()
  })

  it('renders cart items and total', () => {
    useCartStore.getState().addItem({ id: '1', title: 'Peace Lily', price: 209, image: '/plant.jpg', slug: 'peace-lily' })
    useCartStore.getState().addItem({ id: '2', title: 'Snake Plant', price: 150, image: '/plant2.jpg', slug: 'snake-plant' })
    render(<CartPage />)

    expect(screen.getByText('Peace Lily')).toBeInTheDocument()
    expect(screen.getByText('Snake Plant')).toBeInTheDocument()
    expect(screen.getByText('2 items')).toBeInTheDocument()
  })

  it('renders page title from cmsPage', () => {
    useCartStore.getState().addItem({ id: '1', title: 'Plant', price: 100, image: '/p.jpg', slug: 'p' })
    const cmsPage = { sys: { id: 'p1', contentType: { sys: { id: 'page' } } }, fields: { title: 'My Cart' } } as never
    render(<CartPage cmsPage={cmsPage} />)
    expect(screen.getByText('My Cart')).toBeInTheDocument()
  })
})
