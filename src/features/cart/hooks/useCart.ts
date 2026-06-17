import { useCartStore } from '../store/cartStore'

export function useCart() {
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }
}

export function useTotalItems() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
}

export function useTotalPrice() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0))
}

export function useCartItems() {
  return useCartStore((s) => s.items)
}

export function useCartItem(id: string) {
  return useCartStore((s) => s.items.find((i) => i.id === id))
}

export function useCartActions() {
  return {
    addItem: useCartStore((s) => s.addItem),
    removeItem: useCartStore((s) => s.removeItem),
    updateQuantity: useCartStore((s) => s.updateQuantity),
    clearCart: useCartStore((s) => s.clearCart),
  }
}
