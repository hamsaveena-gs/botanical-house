type EventParams = Record<string, string | number | boolean | undefined>

function push(data: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(data)
}

export function pageview(path: string, title?: string) {
  push({ event: 'page_view', page_path: path, page_title: title })
}

export function event(name: string, params?: EventParams) {
  push({ event: name, ...params })
}

export const AnalyticsEvents = {
  addToCart(product: { id: string; name: string; price: number }) {
    push({
      event: 'add_to_cart',
      currency: 'INR',
      value: product.price,
      items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }],
    })
  },
  removeFromCart(product: { id: string; name: string; price: number }) {
    push({
      event: 'remove_from_cart',
      currency: 'INR',
      value: product.price,
      items: [{ item_id: product.id, item_name: product.name, price: product.price }],
    })
  },
  beginCheckout(value: number) {
    push({ event: 'begin_checkout', currency: 'INR', value })
  },
  purchase(order: { id: string; value: number; items: number }) {
    push({
      event: 'purchase',
      transaction_id: order.id,
      currency: 'INR',
      value: order.value,
      items: order.items,
    })
  },
  contactFormSubmit() {
    push({ event: 'contact_form_submit' })
  },
  notifyMe(plant: { name: string }) {
    push({ event: 'notify_me', plant_name: plant.name })
  },
}
