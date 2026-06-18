import { render, screen } from '@testing-library/react'
import PlantGridSection from '@/features/home/components/PlantGridSection'
import type { PlantGridSectionFields } from '@/types'

const mockPlant = {
  sys: { id: '1' },
  fields: {
    title: 'Peace Lily',
    slug: 'peace-lily',
    price: 209,
    category: [{ sys: { id: 'cat1' }, fields: { title: 'Indoor Plants', slug: 'indoor' } }],
    image: { sys: { id: 'img1' }, fields: { title: '', description: '', file: { url: '//test.com/img.jpg', details: { image: { width: 100, height: 100 } }, fileName: 'img.jpg', contentType: 'image/jpeg' } } },
    featured: false,
    inStock: true,
  },
}

const baseFields: PlantGridSectionFields = {
  heading: 'Featured Plants',
  plants: [mockPlant],
}

describe('PlantGridSection', () => {
  it('renders grid by default', () => {
    render(<PlantGridSection fields={baseFields} />)
    expect(screen.getByText('Featured Plants')).toBeInTheDocument()
    expect(screen.getByText('View All Plants')).toBeInTheDocument()
    expect(screen.getByText('Peace Lily')).toBeInTheDocument()
  })

  it('renders carousel when layout is carousel', () => {
    render(<PlantGridSection fields={{ ...baseFields, layout: 'carousel' }} />)
    expect(screen.getByText('Featured Plants')).toBeInTheDocument()
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument()
  })

  it('renders nothing when plants array is empty in carousel', () => {
    const { container } = render(<PlantGridSection fields={{ heading: 'Empty', plants: [], layout: 'carousel' }} />)
    expect(container.innerHTML).toBe('')
  })
})
