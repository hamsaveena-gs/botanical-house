import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  category: string
}

export default function Pagination({ currentPage, totalPages, category }: PaginationProps) {
  if (totalPages <= 1) return null

  const href = (page: number) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return `/plants${qs ? `?${qs}` : ''}`
  }

  const neutralCls = 'rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-all hover:border-emerald-700 hover:text-emerald-700'
  const activeCls = 'rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white'

  return (
    <div className='mt-12 flex items-center justify-center gap-2' role='navigation' aria-label='Pagination'>
      {currentPage > 1 && (
        <Link href={href(currentPage - 1)} className={neutralCls} aria-label='Go to previous page'>← Prev</Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i + 1}
          href={href(i + 1)}
          className={i + 1 === currentPage ? activeCls : neutralCls}
          aria-current={i + 1 === currentPage ? 'page' : undefined}
          aria-label={`Go to page ${i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={href(currentPage + 1)} className={neutralCls} aria-label='Go to next page'>Next →</Link>
      )}
    </div>
  )
}
