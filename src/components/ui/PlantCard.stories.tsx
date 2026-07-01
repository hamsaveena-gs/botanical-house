import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import PlantCard from './PlantCard'

const mockPlant = {
  sys: { id: 'plant-1' },
  fields: {
    title: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    price: 899,
    compareAtPrice: 1299,
    description: {},
    image: {
      sys: { id: 'img-1' },
      fields: {
        title: 'Monstera',
        description: '',
        file: { url: '/plant-placeholder.jpg', details: { image: { width: 800, height: 1000 } }, fileName: 'monstera.jpg', contentType: 'image/jpeg' },
      },
    },
    category: [
      {
        sys: { id: 'cat-1' },
        fields: { title: 'Indoor Plants', slug: 'indoor' },
      },
    ],
    inStock: true,
    featured: true,
  },
}

const meta = {
  component: PlantCard,
  tags: ['ai-generated'],
  args: { plant: mockPlant },
} satisfies Meta<typeof PlantCard>

export default meta
type Story = StoryObj<typeof meta>

export const InStock: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Monstera Deliciosa')).toBeVisible()
    await expect(canvas.getByText('Best Seller')).toBeVisible()
    await expect(canvas.getByText('Sale')).toBeVisible()
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/plants/monstera-deliciosa')
  },
}

export const OutOfStock: Story = {
  args: {
    plant: {
      ...mockPlant,
      fields: { ...mockPlant.fields, description: {}, inStock: false, featured: false, compareAtPrice: undefined },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Out of Stock')).toBeVisible()
  },
}

export const NoSale: Story = {
  args: {
    plant: {
      ...mockPlant,
      fields: { ...mockPlant.fields, description: {}, compareAtPrice: undefined, featured: false },
    },
  },
}
