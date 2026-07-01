import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Heading from './Heading'

const meta = {
  component: Heading,
  tags: ['ai-generated'],
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Hero: Story = {
  args: { children: 'Bring Nature Home', variant: 'hero', as: 'h1' },
}

export const Page: Story = {
  args: { children: 'Our Plants', variant: 'page', as: 'h1' },
}

export const Section: Story = {
  args: { children: 'Featured Plants', variant: 'section', as: 'h2' },
}

export const Subsection: Story = {
  args: { children: 'Plant Details', variant: 'subsection', as: 'h3' },
}

export const Giant: Story = {
  args: { children: '96', variant: 'giant', as: 'h1' },
}
