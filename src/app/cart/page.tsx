import { getPageBySlug } from '@/lib/contentful'
import type { Metadata } from 'next'
import CartPage from '@/features/cart/CartPage'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('/cart')
  if (!page) return { title: 'Cart' }
  return {
    title: page.fields.seoTitle || page.fields.title,
    description: page.fields.seoDescription,
    openGraph: page.fields.ogImage?.fields?.file?.url
      ? { images: [`https:${page.fields.ogImage.fields.file.url}`] }
      : undefined,
  }
}

export default async function Cart() {
  const cmsPage = await getPageBySlug('/cart')
  return <CartPage cmsPage={cmsPage ?? undefined} />
}
