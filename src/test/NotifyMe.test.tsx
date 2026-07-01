import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NotifyMe from '@/components/ui/NotifyMe'

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('NotifyMe', () => {
  it('renders notify me button initially', () => {
    render(<NotifyMe plantTitle='Peace Lily' plantSlug='peace-lily' />)
    expect(screen.getByText('Notify Me')).toBeInTheDocument()
  })

  it('shows email form after clicking notify me', async () => {
    render(<NotifyMe plantTitle='Peace Lily' plantSlug='peace-lily' />)
    await userEvent.click(screen.getByText('Notify Me'))
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByText('Notify')).toBeInTheDocument()
  })

  it('shows success message after submit', async () => {
    fetchMock.mockResolvedValue({ ok: true })
    render(<NotifyMe plantTitle='Peace Lily' plantSlug='peace-lily' />)
    await userEvent.click(screen.getByText('Notify Me'))
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com')
    await userEvent.click(screen.getByText('Notify'))
    expect(await screen.findByText("We'll let you know when it's back!")).toBeInTheDocument()
  })

  it('shows error message on failure', async () => {
    fetchMock.mockRejectedValue(new Error('fail'))
    render(<NotifyMe plantTitle='Peace Lily' plantSlug='peace-lily' />)
    await userEvent.click(screen.getByText('Notify Me'))
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com')
    await userEvent.click(screen.getByText('Notify'))
    expect(await screen.findByText('Something went wrong. Try again.')).toBeInTheDocument()
  })
})
