import { render, screen } from '@testing-library/react'
import CategoryFilters from '@/features/plants/components/CategoryFilters'

const categories = [
  { sys: { id: '1' }, fields: { title: 'Indoor Plants', slug: 'indoor', description: '' } },
  { sys: { id: '2' }, fields: { title: 'Flowering', slug: 'flowering', description: '' } },
]

describe('CategoryFilters', () => {
  it('renders All link and category links', () => {
    render(<CategoryFilters categories={categories} activeSlugs={[]} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Indoor Plants')).toBeInTheDocument()
    expect(screen.getByText('Flowering')).toBeInTheDocument()
  })

  it('highlights active category', () => {
    render(<CategoryFilters categories={categories} activeSlugs={['indoor']} />)
    const active = screen.getByText('Indoor Plants')
    expect(active.className).toContain('bg-emerald-600')
  })
})
