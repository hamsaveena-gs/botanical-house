import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShippingForm from '@/features/checkout/components/ShippingForm'

describe('ShippingForm', () => {
  const form = { name: '', email: '', phone: '', address: '', city: '', pincode: '' }

  it('renders all fields with default labels', () => {
    render(<ShippingForm form={form} onChange={vi.fn()} />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('Pincode')).toBeInTheDocument()
    expect(screen.getByLabelText('Address')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
  })

  it('renders heading', () => {
    render(<ShippingForm form={form} onChange={vi.fn()} />)
    expect(screen.getByText('Shipping Details')).toBeInTheDocument()
  })

  it('shows field values', () => {
    const filled = { name: 'Test', email: 'a@b.com', phone: '123', address: 'Addr', city: 'City', pincode: '600001' }
    render(<ShippingForm form={filled} onChange={vi.fn()} />)
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument()
    expect(screen.getByDisplayValue('a@b.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Addr')).toBeInTheDocument()
    expect(screen.getByDisplayValue('City')).toBeInTheDocument()
    expect(screen.getByDisplayValue('600001')).toBeInTheDocument()
  })

  it('shows error messages', () => {
    const errors = { email: 'Invalid email' }
    render(<ShippingForm form={form} errors={errors} onChange={vi.fn()} />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('does not show errors when empty', () => {
    render(<ShippingForm form={form} onChange={vi.fn()} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('uses labels from formContent', () => {
    const formContent = {
      sys: { id: 'fc1' },
      fields: { firstNameLabel: 'Your Name', emailLabel: 'Email Address', phoneLabel: 'Phone No', messageLabel: '', submitBtnText: '', addressLabel: 'Street', cityLabel: 'Town', pincodeLabel: 'Postal Code' },
    }
    render(<ShippingForm form={form} onChange={vi.fn()} formContent={formContent} />)
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone No')).toBeInTheDocument()
    expect(screen.getByLabelText('Postal Code')).toBeInTheDocument()
    expect(screen.getByLabelText('Street')).toBeInTheDocument()
    expect(screen.getByLabelText('Town')).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    render(<ShippingForm form={form} onChange={onChange} />)
    const input = screen.getByLabelText('Full Name')
    await userEvent.type(input, 'A')
    expect(onChange).toHaveBeenCalled()
  })
})
