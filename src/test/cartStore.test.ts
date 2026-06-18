import { useCartStore } from '@/features/cart/store/cartStore'
import type { CartItem } from '@/features/cart/store/cartStore'

const mockItem: CartItem = {
  id: '1',
  title: 'Peace Lily',
  price: 499,
  image: '/test.jpg',
  slug: 'peace-lily',
  quantity: 1,
}

beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('useCartStore', () => {
  describe('addItem', () => {
    it('adds a new item', () => {
      useCartStore.getState().addItem(mockItem)
      expect(useCartStore.getState().items).toHaveLength(1)
      expect(useCartStore.getState().items[0].quantity).toBe(1)
    })

    it('increments quantity for existing item', () => {
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().addItem(mockItem)
      expect(useCartStore.getState().items).toHaveLength(1)
      expect(useCartStore.getState().items[0].quantity).toBe(2)
    })

    it('does not exceed quantity of 2', () => {
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().addItem(mockItem)
      expect(useCartStore.getState().items[0].quantity).toBe(2)
    })
  })

  describe('removeItem', () => {
    it('removes an item by id', () => {
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().removeItem('1')
      expect(useCartStore.getState().items).toHaveLength(0)
    })
  })

  describe('updateQuantity', () => {
    it('updates quantity', () => {
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().updateQuantity('1', 2)
      expect(useCartStore.getState().items[0].quantity).toBe(2)
    })

    it('removes item when quantity < 1', () => {
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().updateQuantity('1', 0)
      expect(useCartStore.getState().items).toHaveLength(0)
    })

    it('caps quantity at 2', () => {
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().updateQuantity('1', 5)
      expect(useCartStore.getState().items[0].quantity).toBe(2)
    })
  })

  describe('clearCart', () => {
    it('removes all items', () => {
      useCartStore.getState().addItem(mockItem)
      useCartStore.getState().addItem({ ...mockItem, id: '2', title: 'Snake Plant' })
      useCartStore.getState().clearCart()
      expect(useCartStore.getState().items).toHaveLength(0)
    })
  })
})
