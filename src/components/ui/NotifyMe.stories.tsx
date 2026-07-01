import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import NotifyMe from './NotifyMe'

const meta = {
  component: NotifyMe,
  tags: ['ai-generated'],
  args: {
    plantTitle: 'Monstera Deliciosa',
    plantSlug: 'monstera-deliciosa',
  },
} satisfies Meta<typeof NotifyMe>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /notify me/i })).toBeVisible()
  },
}

export const OpenForm: Story = {
  play: async ({ canvas, userEvent: ue }) => {
    await ue.click(canvas.getByRole('button', { name: /notify me/i }))
    await expect(canvas.getByPlaceholderText(/enter your email/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /notify/i })).toBeVisible()
  },
}

export const InvalidEmail: Story = {
  play: async ({ canvas, userEvent: ue }) => {
    await ue.click(canvas.getByRole('button', { name: /notify me/i }))
    const input = canvas.getByPlaceholderText(/enter your email/i)
    await ue.type(input, 'invalid-email')
    await ue.click(canvas.getByRole('button', { name: /notify/i }))
    await expect(canvas.getByText(/invalid email/i)).toBeVisible()
  },
}
