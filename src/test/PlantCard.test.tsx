import { render, screen } from '@testing-library/react'
import { useCartStore } from '@/features/cart/store/cartStore'
import PlantCard from '@/components/ui/PlantCard'

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

describe('PlantCard', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('renders plant title and price', () => {
    render(<PlantCard plant={mockPlant} />)
    expect(screen.getByText('Peace Lily')).toBeInTheDocument()
    expect(screen.getByText('₹209')).toBeInTheDocument()
  })

  it('renders category badges', () => {
    render(<PlantCard plant={mockPlant} />)
    expect(screen.getByText('Indoor Plants')).toBeInTheDocument()
  })

  it('renders Best Seller badge when featured', () => {
    const featured = { ...mockPlant, fields: { ...mockPlant.fields, featured: true } }
    render(<PlantCard plant={featured} />)
    expect(screen.getByText('Best Seller')).toBeInTheDocument()
  })

  it('renders Sale badge and strikethrough price when on sale', () => {
    const salePlant = {
      ...mockPlant,
      fields: { ...mockPlant.fields, price: 150, compareAtPrice: 299 },
    }
    render(<PlantCard plant={salePlant} />)
    expect(screen.getByText('Sale')).toBeInTheDocument()
    expect(screen.getByText('₹150')).toBeInTheDocument()
    expect(screen.getByText('₹299')).toBeInTheDocument()
  })

  it('renders Out of Stock overlay when not in stock', () => {
    const oos = { ...mockPlant, fields: { ...mockPlant.fields, inStock: false } }
    render(<PlantCard plant={oos} />)
    expect(screen.getAllByText('Out of Stock').length).toBeGreaterThan(0)
  })

  it('links to plant detail page', () => {
    render(<PlantCard plant={mockPlant} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/plants/peace-lily')
  })
})
