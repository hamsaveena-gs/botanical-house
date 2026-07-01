import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import Input from './Input'

const meta = {
  component: Input,
  tags: ['ai-generated'],
  args: {
    id: 'email',
    name: 'email',
    label: 'Email',
    value: '',
    onChange: () => {},
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Filled: Story = {
  args: { value: 'hello@example.com' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email') as HTMLInputElement
    await expect(input.value).toBe('hello@example.com')
  },
}

export const WithError: Story = {
  args: { value: 'invalid', error: 'Please enter a valid email' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email')
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(input).toHaveAttribute('aria-describedby', 'email-error')
    await expect(canvas.getByText('Please enter a valid email')).toBeVisible()
  },
}
