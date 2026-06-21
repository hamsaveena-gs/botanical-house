import { getPageBySlug, getFormContent } from '@/lib/contentful'
import type { Metadata } from 'next'
import CheckoutPage from '@/features/checkout/CheckoutPage'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('/checkout')
  if (!page) return { title: 'Checkout' }
  return {
    title: page.fields.seoTitle || page.fields.title,
    description: page.fields.seoDescription,
    openGraph: page.fields.ogImage?.fields?.file?.url
      ? { images: [`https:${page.fields.ogImage.fields.file.url}`] }
      : undefined,
  }
}

export default async function Checkout() {
  const [cmsPage, formContent] = await Promise.all([
    getPageBySlug('/checkout'),
    getFormContent(),
  ])
  return <CheckoutPage cmsPage={cmsPage ?? undefined} formContent={formContent} />
}
