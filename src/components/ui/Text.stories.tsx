import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Text from './Text'

const meta = {
  component: Text,
  tags: ['ai-generated'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {
  args: { children: 'Premium plants delivered to your doorstep.', variant: 'body' },
}

export const Small: Story = {
  args: { children: 'Default delivery estimate: 3–5 business days.', variant: 'small' },
}

export const Caption: Story = {
  args: { children: 'New Arrival', variant: 'caption' },
}

export const Muted: Story = {
  args: { children: 'Usually ships within 2 weeks.', variant: 'muted' },
}

export const Label: Story = {
  args: { children: 'Full Name', variant: 'label', as: 'label', htmlFor: 'name' },
}
