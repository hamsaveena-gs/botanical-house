'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  slug: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            if (existing.quantity >= 2) return state
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, qty) =>
        set((state) => {
          if (qty < 1) return { items: state.items.filter((i) => i.id !== id) }
          if (qty > 2) qty = 2
          return { items: state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)) }
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'bh-cart' }
  )
)
