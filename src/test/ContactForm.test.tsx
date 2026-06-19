import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/features/contact/components/ContactForm'

function deferred() {
  let resolve!: (v: unknown) => void
  const promise = new Promise(r => { resolve = r })
  return { promise, resolve }
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders form fields and submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Phone/)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Message/)).toBeInTheDocument()
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('shows sending state on submit', async () => {
    const d = deferred()
    vi.spyOn(globalThis, 'fetch').mockReturnValue(d.promise as Promise<Response>)
    render(<ContactForm />)
    await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'Test')
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@test.com')
    await userEvent.type(screen.getByRole('textbox', { name: /phone/i }), '9876543210')
    await userEvent.type(screen.getByRole('textbox', { name: /message/i }), 'Hello')
    await userEvent.click(screen.getByText('Send Message'))
    expect(screen.getByText('Sending...')).toBeInTheDocument()
    d.resolve(new Response(null, { status: 200 }))
  })

  it('shows success state after submit', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }))
    render(<ContactForm />)
    await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'Test')
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@test.com')
    await userEvent.type(screen.getByRole('textbox', { name: /phone/i }), '9876543210')
    await userEvent.type(screen.getByRole('textbox', { name: /message/i }), 'Hello')
    await userEvent.click(screen.getByText('Send Message'))
    expect(await screen.findByText('Message Sent!')).toBeInTheDocument()
  })

  it('shows error state when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))
    render(<ContactForm />)
    await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'Test')
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@test.com')
    await userEvent.type(screen.getByRole('textbox', { name: /phone/i }), '9876543210')
    await userEvent.type(screen.getByRole('textbox', { name: /message/i }), 'Hello')
    await userEvent.click(screen.getByText('Send Message'))
    expect(await screen.findByText('Something went wrong. Please try again.')).toBeInTheDocument()
  })
})
