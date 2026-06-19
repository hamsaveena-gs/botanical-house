import { cache } from 'react'
import { createClient } from 'contentful'
import type { Page, Plant, Category, SiteSettings } from '@/types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Contentful's Slug field type strips leading slashes, but the page URL
// supplies them (e.g. `/about`). Normalize to match the stored value.
function normalizeSlug(slug: string): string {
  return slug === '/' ? '/' : slug.replace(/^\//, '')
}

function parsePage(raw: unknown): Page {
  return raw as Page
}

function parsePlant(raw: unknown): Plant {
  return raw as Plant
}

function parseNavigationLink(raw: unknown): { id: string; label: string; href: string } {
  const entry = raw as { sys: { id: string }; fields: { pageTitle?: string; slug?: string } }
  const slug = entry.fields.slug?.replace(/^\//, '') ?? ''
  return {
    id: entry.sys.id,
    label: entry.fields.pageTitle ?? '',
    href: slug ? `/${slug}` : '/',
  }
}

function parseSiteSettings(raw: unknown): SiteSettings {
  const entry = raw as {
    sys: { id: string }
    fields: {
      siteName?: string
      navlist?: unknown[]
      footerText?: string
    }
  }
  return {
    sys: entry.sys,
    fields: {
      siteName: entry.fields.siteName ?? 'Botanical House',
      navLinks: (entry.fields.navlist ?? []).map(parseNavigationLink),
      footerText: entry.fields.footerText ?? '',
    },
  } as SiteSettings
}

function parseCategory(raw: unknown): Category {
  return raw as Category
}

// --- Pages ---

export const getPageBySlug = cache(async (slug: string): Promise<Page | null> => {
  const entries = await client.getEntries({
    content_type: 'page',
    'fields.slug': normalizeSlug(slug),
    include: 3,
  })
  return entries.items.length > 0 ? parsePage(entries.items[0]) : null
})

export const getAllPageSlugs = cache(async (): Promise<string[]> => {
  const entries = await client.getEntries({
    content_type: 'page',
    select: ['fields.slug'],
  })
  return entries.items.map((item) => (item.fields as { slug: string }).slug)
})

// --- Site Settings ---

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    const entries = await client.getEntries({
      content_type: 'SiteSettings',
      limit: 1,
      include: 2,
    })
    return entries.items.length > 0 ? parseSiteSettings(entries.items[0]) : null
  } catch {
    return null
  }
})

// --- Plants ---

export const getAllPlants = cache(async (): Promise<Plant[]> => {
  const entries = await client.getEntries({
    content_type: 'artwork',
    order: ['-fields.featured'],
    include: 2,
  })
  return entries.items.map(parsePlant)
})

export const getPlantBySlug = cache(async (slug: string): Promise<Plant | null> => {
  const entries = await client.getEntries({
    content_type: 'artwork',
    include: 2,
  })
  const matches = entries.items.filter((item) => {
    const s = (item.fields as { slug?: string }).slug
    return s?.trim().toLowerCase() === slug.trim().toLowerCase()
  })
  if (matches.length > 1) {
    console.warn(`Duplicate slugs found for "${slug}" — ${matches.length} entries match. Only the first will be shown.`)
  }
  return matches.length > 0 ? parsePlant(matches[0]) : null
})

export const getPlantsByCategory = cache(async (categoryId: string): Promise<Plant[]> => {
  const entries = await client.getEntries({
    content_type: 'artwork',
    'fields.category.sys.id': categoryId,
    include: 2,
  })
  return entries.items.map(parsePlant)
})

export const getAllPlantSlugs = cache(async (): Promise<string[]> => {
  const entries = await client.getEntries({
    content_type: 'artwork',
    select: ['fields.slug'],
  })
  const slugs = entries.items.map((item) => (item.fields as { slug: string }).slug.trim())
  const unique = [...new Set(slugs)]
  if (unique.length < slugs.length) {
    const seen = new Map<string, number>()
    slugs.forEach(s => seen.set(s, (seen.get(s) || 0) + 1))
    const dups = [...seen.entries()].filter(([, c]) => c > 1).map(([s]) => s)
    console.warn(`Duplicate plant slugs detected in Contentful: ${dups.join(', ')}. Duplicates skipped in generateStaticParams.`)
  }
  return unique
})

// --- Categories ---

export const getAllCategories = cache(async (): Promise<Category[]> => {
  const entries = await client.getEntries({
    content_type: 'category',
    include: 1,
  })
  return entries.items.map(parseCategory)
})
