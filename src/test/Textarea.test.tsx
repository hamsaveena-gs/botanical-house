import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Textarea from '@/components/ui/Textarea'

describe('Textarea', () => {
  it('renders label and textarea', () => {
    render(<Textarea label='Message' id='msg' name='msg' value='' onChange={vi.fn()} />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows required asterisk', () => {
    render(<Textarea label='Message' id='msg' name='msg' required value='' onChange={vi.fn()} />)
    expect(screen.getByText('Message *')).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    render(<Textarea id='msg' name='msg' value='' onChange={vi.fn()} />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('displays value and calls onChange', async () => {
    const onChange = vi.fn()
    render(<Textarea label='Message' id='msg' name='msg' value='Hello' onChange={onChange} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue('Hello')
    await userEvent.type(textarea, '!')
    expect(onChange).toHaveBeenCalled()
  })

  it('uses default rows', () => {
    render(<Textarea label='Message' id='msg' name='msg' value='' onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
  })

  it('accepts custom rows', () => {
    render(<Textarea label='Message' id='msg' name='msg' rows={3} value='' onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3')
  })
})
