import { render, screen } from '@testing-library/react'
import HeroBanner from '@/components/ui/HeroBanner'

describe('HeroBanner', () => {
  const fields = {
    heading: 'Bring Nature Home',
    subHeading: 'Explore our collection',
    ctaText: 'Shop Plants',
    ctaLink: '/plants',
    ctaBackgroundColor: 'white',
    backgroundImage: { sys: { id: 'img1' }, fields: { title: 'hero', file: { url: '//images.ctfcdn.net/hero.jpg', details: { image: { width: 1200, height: 800 } }, fileName: 'hero.jpg', contentType: 'image/jpeg' } } },
  }

  it('renders heading', () => {
    render(<HeroBanner fields={fields} />)
    expect(screen.getByText('Bring Nature Home')).toBeInTheDocument()
  })

  it('renders subheading', () => {
    render(<HeroBanner fields={fields} />)
    expect(screen.getByText('Explore our collection')).toBeInTheDocument()
  })

  it('renders CTA button as link', () => {
    render(<HeroBanner fields={fields} />)
    const btn = screen.getByText('Shop Plants')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('href', '/plants')
  })

  it('does not render CTA when text missing', () => {
    render(<HeroBanner fields={{ ...fields, ctaText: undefined }} />)
    expect(screen.queryByText('Shop Plants')).not.toBeInTheDocument()
  })

  it('does not render subheading when missing', () => {
    render(<HeroBanner fields={{ ...fields, subHeading: undefined }} />)
    expect(screen.queryByText('Explore our collection')).not.toBeInTheDocument()
  })

  it('uses white button variant for white ctaBackgroundColor', () => {
    render(<HeroBanner fields={fields} />)
    expect(screen.getByText('Shop Plants').className).toContain('btn-white')
  })

  it('uses primary button variant for emerald ctaBackgroundColor', () => {
    render(<HeroBanner fields={{ ...fields, ctaBackgroundColor: 'emerald' }} />)
    expect(screen.getByText('Shop Plants').className).toContain('btn-primary')
  })

  it('renders section with dark bg by default', () => {
    const { container } = render(<HeroBanner fields={fields} />)
    expect(container.querySelector('section')?.className).toContain('bg-neutral-900')
  })

  it('handles missing backgroundImage', () => {
    render(<HeroBanner fields={{ ...fields, backgroundImage: undefined as unknown as typeof fields.backgroundImage }} />)
    expect(screen.getByText('Bring Nature Home')).toBeInTheDocument()
  })
})
