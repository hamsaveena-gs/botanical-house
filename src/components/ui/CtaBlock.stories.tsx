import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import CtaBlock from './CtaBlock'

const meta = {
  component: CtaBlock,
  tags: ['ai-generated'],
} satisfies Meta<typeof CtaBlock>

export default meta
type Story = StoryObj<typeof meta>

export const DarkBg: Story = {
  args: {
    fields: {
      heading: 'Ready to Go Green?',
      description: 'Join thousands of happy plant parents. Start your botanical journey today.',
      buttonText: 'Get Started',
      buttonUrl: '/plants',
      backgroundColor: 'emerald-green',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /ready to go green/i })).toBeVisible()
    await expect(canvas.getByRole('link', { name: /get started/i })).toBeVisible()
  },
}

export const LightBg: Story = {
  args: {
    fields: {
      heading: 'Our Promise',
      description: 'Every plant is hand-picked and delivered with care.',
      buttonText: 'Learn More',
      buttonUrl: '/about',
      backgroundColor: 'light-gray',
    },
  },
}

export const NoDescription: Story = {
  args: {
    fields: {
      heading: 'Limited Edition Plants',
      buttonText: 'Shop Now',
      buttonUrl: '/plants',
      backgroundColor: 'charcoal',
    },
  },
}
