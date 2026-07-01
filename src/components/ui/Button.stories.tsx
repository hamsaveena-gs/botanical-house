import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import Button from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Order Now', variant: 'primary', size: 'md' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /order now/i })
    await expect(btn).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: { children: 'Submit', variant: 'primary' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /submit/i })
    await expect(getComputedStyle(btn).backgroundColor).toBe('rgb(4, 120, 87)')
  },
}

export const Outline: Story = {
  args: { children: 'Cancel', variant: 'outline' },
}

export const Ghost: Story = {
  args: { children: 'Edit', variant: 'ghost' },
}

export const Danger: Story = {
  args: { children: 'Delete', variant: 'danger' },
}

export const White: Story = {
  args: { children: 'Learn More', variant: 'white' },
}

export const Small: Story = {
  args: { children: 'Add', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Checkout', size: 'lg' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}

export const AsLink: Story = {
  args: { children: 'Visit Shop', href: '/plants' },
}
