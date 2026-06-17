import { render, screen } from '@testing-library/react'
import { useCartStore } from '@/features/cart/store/cartStore'
import Header from '@/components/layout/Header'

describe('Header', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('renders logo and nav links', () => {
    render(<Header />)
    expect(screen.getByText('Botanical House')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Plants')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('shows cart badge when items exist', () => {
    useCartStore.setState({ items: [{ id: '1', title: 'Test', price: 100, image: '', slug: 'test', quantity: 2 }] })
    render(<Header />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
