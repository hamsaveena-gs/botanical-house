import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import Textarea from './Textarea'

const meta = {
  component: Textarea,
  tags: ['ai-generated'],
  args: {
    id: 'message',
    name: 'message',
    label: 'Message',
    value: '',
    onChange: () => {},
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Filled: Story = {
  args: { value: 'I would like to know more about this plant.' },
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Message') as HTMLTextAreaElement
    await expect(textarea.value).toBe('I would like to know more about this plant.')
  },
}

export const WithError: Story = {
  args: { value: 'ab', error: 'Message must be at least 10 characters' },
  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText('Message')
    await expect(textarea).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByText('Message must be at least 10 characters')).toBeVisible()
  },
}
