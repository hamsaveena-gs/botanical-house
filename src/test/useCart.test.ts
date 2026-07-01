import { renderHook } from '@testing-library/react'
import { useCartStore } from '@/features/cart/store/cartStore'
import { useCart, useTotalItems, useTotalPrice, useCartItems, useCartItem, useCartActions } from '@/features/cart/hooks/useCart'

describe('useCart hooks', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  describe('useCart', () => {
    it('returns empty state initially', () => {
      const { result } = renderHook(() => useCart())
      expect(result.current.items).toEqual([])
      expect(result.current.totalItems).toBe(0)
      expect(result.current.totalPrice).toBe(0)
    })

    it('returns state with items', () => {
      useCartStore.getState().addItem({ id: '1', title: 'Plant', price: 100, image: '/p.jpg', slug: 'p' })
      const { result } = renderHook(() => useCart())
      expect(result.current.items).toHaveLength(1)
      expect(result.current.totalItems).toBe(1)
      expect(result.current.totalPrice).toBe(100)
    })
  })

  describe('useTotalItems', () => {
    it('returns 0 when cart empty', () => {
      const { result } = renderHook(() => useTotalItems())
      expect(result.current).toBe(0)
    })

    it('returns total count', () => {
      useCartStore.getState().addItem({ id: '1', title: 'P', price: 100, image: '/p.jpg', slug: 'p' })
      useCartStore.setState({ items: [{ id: '1', title: 'P', price: 100, image: '/p.jpg', slug: 'p', quantity: 2 }] })
      const { result } = renderHook(() => useTotalItems())
      expect(result.current).toBe(2)
    })
  })

  describe('useTotalPrice', () => {
    it('returns 0 when empty', () => {
      const { result } = renderHook(() => useTotalPrice())
      expect(result.current).toBe(0)
    })

    it('returns calculated total', () => {
      useCartStore.setState({ items: [{ id: '1', title: 'P', price: 100, image: '/p.jpg', slug: 'p', quantity: 2 }] })
      const { result } = renderHook(() => useTotalPrice())
      expect(result.current).toBe(200)
    })
  })

  describe('useCartItems', () => {
    it('returns items array', () => {
      useCartStore.getState().addItem({ id: '1', title: 'P', price: 100, image: '/p.jpg', slug: 'p' })
      const { result } = renderHook(() => useCartItems())
      expect(result.current).toHaveLength(1)
    })
  })

  describe('useCartItem', () => {
    it('returns item by id', () => {
      useCartStore.getState().addItem({ id: '1', title: 'P', price: 100, image: '/p.jpg', slug: 'p' })
      const { result } = renderHook(() => useCartItem('1'))
      expect(result.current?.title).toBe('P')
    })

    it('returns undefined for missing id', () => {
      const { result } = renderHook(() => useCartItem('nonexistent'))
      expect(result.current).toBeUndefined()
    })
  })

  describe('useCartActions', () => {
    it('returns action functions', () => {
      const { result } = renderHook(() => useCartActions())
      expect(typeof result.current.addItem).toBe('function')
      expect(typeof result.current.removeItem).toBe('function')
      expect(typeof result.current.updateQuantity).toBe('function')
      expect(typeof result.current.clearCart).toBe('function')
    })

    it('addItem adds to store', () => {
      const { result } = renderHook(() => useCartActions())
      result.current.addItem({ id: '1', title: 'P', price: 100, image: '/p.jpg', slug: 'p' })
      expect(useCartStore.getState().items).toHaveLength(1)
    })
  })
})
