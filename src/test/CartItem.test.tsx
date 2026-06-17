import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartItem from '@/features/cart/components/CartItem'

describe('CartItem', () => {
  const item = { id: '1', title: 'Peace Lily', price: 209, image: '', slug: 'peace-lily', quantity: 1 }

  it('renders item title and price', () => {
    render(<CartItem item={item} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />)
    expect(screen.getByText('Peace Lily')).toBeInTheDocument()
    expect(screen.getByText('₹209 each')).toBeInTheDocument()
  })

  it('shows quantity', () => {
    render(<CartItem item={{ ...item, quantity: 2 }} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls onRemove when remove is clicked', async () => {
    const onRemove = vi.fn()
    render(<CartItem item={item} onUpdateQuantity={vi.fn()} onRemove={onRemove} />)
    await userEvent.click(screen.getByText('✕'))
    expect(onRemove).toHaveBeenCalledWith('1')
  })
})
