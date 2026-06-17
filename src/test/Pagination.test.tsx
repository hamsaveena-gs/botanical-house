import { render, screen } from '@testing-library/react'
import Pagination from '@/features/plants/components/Pagination'

describe('Pagination', () => {
  it('renders nothing when only 1 page', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} category='' />)
    expect(container.innerHTML).toBe('')
  })

  it('renders page numbers', () => {
    render(<Pagination currentPage={1} totalPages={3} category='' />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('shows Next but not Prev on page 1', () => {
    render(<Pagination currentPage={1} totalPages={3} category='' />)
    expect(screen.getByText('Next →')).toBeInTheDocument()
    expect(screen.queryByText('← Prev')).not.toBeInTheDocument()
  })

  it('shows both Prev and Next on middle page', () => {
    render(<Pagination currentPage={2} totalPages={3} category='' />)
    expect(screen.getByText('← Prev')).toBeInTheDocument()
    expect(screen.getByText('Next →')).toBeInTheDocument()
  })

  it('shows Prev but not Next on last page', () => {
    render(<Pagination currentPage={3} totalPages={3} category='' />)
    expect(screen.getByText('← Prev')).toBeInTheDocument()
    expect(screen.queryByText('Next →')).not.toBeInTheDocument()
  })

  it('highlights active page', () => {
    render(<Pagination currentPage={2} totalPages={3} category='' />)
    expect(screen.getByText('2').className).toContain('bg-emerald-600')
  })

  it('preserves category in links', () => {
    render(<Pagination currentPage={1} totalPages={2} category='indoor' />)
    expect(screen.getByText('2').closest('a')).toHaveAttribute('href', '/plants?category=indoor&page=2')
  })
})
