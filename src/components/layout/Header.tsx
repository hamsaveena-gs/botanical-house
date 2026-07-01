'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useTotalItems } from '@/features/cart/hooks/useCart'
import { useScrollLock } from '@/hooks/useScrollLock'
import type { SiteSettings } from '@/types'

interface Props {
  siteName?: string
  navLinks?: { label: string; href: string }[]
  settings?: SiteSettings
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const segment = useSelectedLayoutSegment()
  const active = href === '/' ? segment === null : segment === href.replace(/^\//, '')
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        active ? 'text-emerald-600' : 'text-neutral-500 hover:text-neutral-900'
      }`}
    >
      {label}
    </Link>
  )
}

export default function Header({ settings }: Props) {
  const [open, setOpen] = useState(false)
  const totalItems = useTotalItems()
  useScrollLock(open)
  const siteName = settings?.fields?.siteName ?? 'Botanical House'
  const navLinks = settings?.fields?.navLinks ?? [
    { id: 'nav-home', href: '/', label: 'Home' },
    { id: 'nav-plants', href: '/plants', label: 'Plants' },
    { id: 'nav-about', href: '/about', label: 'About' },
    { id: 'nav-contact', href: '/contact', label: 'Contact' },
  ]

  return (
    <header className='sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
        <Link href='/' className='flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900'>
          <span className='text-2xl'>🌿</span>
          {siteName}
        </Link>
        <div className='flex items-center gap-6'>
          <nav className='hidden items-center gap-6 md:flex'>
            {navLinks.map(link => (
              <NavLink key={link.id} {...link} />
            ))}
          </nav>
          <Link href='/cart' className='relative text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900' aria-label={`Shopping cart${totalItems > 0 ? ` (${totalItems} items)` : ''}`}>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <circle cx='9' cy='21' r='1'/>
              <circle cx='20' cy='21' r='1'/>
              <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'/>
            </svg>
            {totalItems > 0 && (
              <span className='absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white'>
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className='md:hidden' aria-label='Toggle menu' aria-expanded={open} aria-controls='mobile-menu'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              {open ? <><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></> : <><line x1='3' y1='6' x2='21' y2='6'/><line x1='3' y1='12' x2='21' y2='12'/><line x1='3' y1='18' x2='21' y2='18'/></>}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div id='mobile-menu' className='border-t border-neutral-200 bg-white px-4 py-4 md:hidden'>
          <nav className='flex flex-col gap-4'>
            {navLinks.map(link => (
              <NavLink key={link.id} {...link} onClick={() => setOpen(false)} />
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
