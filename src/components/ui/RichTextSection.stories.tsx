import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import RichTextSection from './RichTextSection'

const richTextDocument = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        { nodeType: 'text', value: 'At Botanical House, we believe everyone deserves a little green in their life. Our plants are carefully curated to bring joy, clean air, and natural beauty to your home.', marks: [], data: {} },
      ],
    },
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        { nodeType: 'text', value: 'Each plant comes with a detailed care guide to help you nurture your new green companion.', marks: [], data: {} },
      ],
    },
  ],
}

const meta = {
  component: RichTextSection,
  tags: ['ai-generated'],
} satisfies Meta<typeof RichTextSection>

export default meta
type Story = StoryObj<typeof meta>

export const LightBg: Story = {
  args: {
    fields: {
      heading: 'Our Story',
      body: richTextDocument,
      backgroundColor: 'light',
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /our story/i })).toBeVisible()
    await expect(canvas.getByText(/botanical house/i)).toBeVisible()
  },
}

export const DarkBg: Story = {
  args: {
    fields: {
      heading: 'Our Mission',
      body: richTextDocument,
      backgroundColor: 'emerald-green',
    },
  },
}

export const NoHeading: Story = {
  args: {
    fields: {
      body: richTextDocument,
      backgroundColor: 'white',
    },
  },
}
