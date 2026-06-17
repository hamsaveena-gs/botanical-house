import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '@/components/ui/Input'

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label='Name' id='name' name='name' value='' onChange={vi.fn()} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'name')
  })

  it('calls onChange when typed in', async () => {
    const onChange = vi.fn()
    render(<Input id='name' name='name' value='' onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalled()
  })
})
