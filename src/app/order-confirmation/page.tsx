import { getPageBySlug } from '@/lib/contentful'
import type { Metadata } from 'next'
import OrderConfirmationPage from '@/features/checkout/OrderConfirmationPage'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('/order-confirmation')
  if (!page) return { title: 'Order Confirmed' }
  return {
    title: page.fields.seoTitle || page.fields.title,
    description: page.fields.seoDescription,
    openGraph: page.fields.ogImage?.fields?.file?.url
      ? { images: [`https:${page.fields.ogImage.fields.file.url}`] }
      : undefined,
  }
}

export default function OrderConfirmation() {
  return <OrderConfirmationPage />
}
