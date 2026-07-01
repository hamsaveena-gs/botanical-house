import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import HeroBanner from './HeroBanner'

const defaultFields = {
  heading: 'Bring Nature Home',
  subHeading: 'Premium plants delivered to your doorstep.\nFree shipping on orders above ₹500.',
  backgroundImage: {
    sys: { id: 'mock' },
    fields: {
      title: 'hero',
      description: '',
      file: { url: '/plant-hero.png', details: { image: { width: 1920, height: 1080 } }, fileName: 'hero.png', contentType: 'image/png' },
    },
  },
  ctaText: 'Shop Now',
  ctaLink: '/plants',
  ctaBackgroundColor: 'emerald-green',
}

const meta = {
  component: HeroBanner,
  tags: ['ai-generated'],
  args: { fields: defaultFields },
} satisfies Meta<typeof HeroBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /bring nature home/i })).toBeVisible()
    await expect(canvas.getByText(/premium plants/i)).toBeVisible()
    await expect(canvas.getByRole('link', { name: /shop now/i })).toBeVisible()
  },
}

export const WithWhiteCta: Story = {
  args: {
    fields: { ...defaultFields, ctaBackgroundColor: 'white' },
  },
}

export const NoSubheading: Story = {
  args: {
    fields: { ...defaultFields, subHeading: undefined },
  },
}
