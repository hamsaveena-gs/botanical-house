import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutPage from '@/features/checkout/CheckoutPage'
import { useCartStore } from '@/features/cart/store/cartStore'

function deferred() {
  let resolve!: (v: unknown) => void
  const promise = new Promise(r => { resolve = r })
  return { promise, resolve }
}

describe('CheckoutPage', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [{ id: '1', title: 'Peace Lily', price: 209, image: '', slug: 'peace-lily', quantity: 1 }] })
  })

  it('renders checkout title from cmsPage', () => {
    const cmsPage = { sys: { id: 'p1' }, fields: { title: 'Checkout', slug: '/checkout', sections: [] } } as Parameters<typeof CheckoutPage>[0]['cmsPage']
    render(<CheckoutPage cmsPage={cmsPage} />)
    expect(screen.getByText('Checkout')).toBeInTheDocument()
  })

  it('renders shipping form and order summary', () => {
    render(<CheckoutPage />)
    expect(screen.getByText('Shipping Details')).toBeInTheDocument()
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('Peace Lily')).toBeInTheDocument()
  })

  it('shows validation errors on submit with empty fields', async () => {
    render(<CheckoutPage />)
    await userEvent.click(screen.getByText('Place Order'))
    expect(await screen.findByText('Name is required')).toBeInTheDocument()
  })

  it('submits order and redirects on valid form', async () => {
    const d = deferred()
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockReturnValue(d.promise as Promise<Response>)

    render(<CheckoutPage />)
    await userEvent.type(screen.getByLabelText('Full Name'), 'Test User')
    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com')
    await userEvent.type(screen.getByLabelText('Phone'), '9876543210')
    await userEvent.type(screen.getByLabelText('Address'), '123 Main St')
    await userEvent.type(screen.getByLabelText('City'), 'Chennai')
    await userEvent.type(screen.getByLabelText('Pincode'), '600001')
    await userEvent.click(screen.getByText('Place Order'))

    d.resolve(new Response(null, { status: 200 }))
    await new Promise(r => setTimeout(r, 50))

    expect(fetchSpy).toHaveBeenCalled()
  })
})
