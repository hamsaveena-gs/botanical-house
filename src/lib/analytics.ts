const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost'

type EventParams = Record<string, string | number | boolean | undefined>

function ga(...args: unknown[]) {
  if (isDev) return
  const w = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : null
  if (w && typeof w.gtag === 'function') {
    ;(w.gtag as (...a: unknown[]) => void)(...args)
  }
}

export function pageview(path: string, title?: string) {
  ga('event', 'page_view', { page_path: path, page_title: title })
}

export function event(name: string, params?: EventParams) {
  ga('event', name, params)
}

export const AnalyticsEvents = {
  addToCart(product: { id: string; name: string; price: number }) {
    event('add_to_cart', {
      currency: 'INR',
      value: product.price,
      items: JSON.stringify([{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }]),
    })
  },
  removeFromCart(product: { id: string; name: string; price: number }) {
    event('remove_from_cart', {
      currency: 'INR',
      value: product.price,
      items: JSON.stringify([{ item_id: product.id, item_name: product.name, price: product.price }]),
    })
  },
  beginCheckout(value: number) {
    event('begin_checkout', { currency: 'INR', value })
  },
  purchase(order: { id: string; value: number; items: number }) {
    event('purchase', {
      transaction_id: order.id,
      currency: 'INR',
      value: order.value,
      items: order.items,
    })
  },
  contactFormSubmit() {
    event('contact_form_submit')
  },
  notifyMe(plant: { name: string }) {
    event('notify_me', { plant_name: plant.name })
  },
}
