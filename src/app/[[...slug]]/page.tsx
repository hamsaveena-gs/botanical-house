import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPageSlugs, getFormContent } from '@/lib/contentful'
import HomePage from '@/features/home/HomePage'
import ContactPage from '@/features/contact/ContactPage'

interface Props {
  params: Promise<{ slug?: string[] }>
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map((slug) => ({
    slug: slug === '/' ? undefined : slug.split('/').filter(Boolean),
  }))
}

export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const slugArr = (await params).slug ?? []
  const slug = slugArr.length === 0 ? '/' : `/${slugArr.join('/')}`
  const page = await getPageBySlug(slug)

  if (!page) return {}

  return {
    title: page.fields.seoTitle || page.fields.title,
    description: page.fields.seoDescription,
    openGraph: page.fields.ogImage?.fields?.file?.url
      ? { images: [`https:${page.fields.ogImage.fields.file.url}`] }
      : undefined,
  }
}

export default async function CatchAllPage({ params }: Props) {
  const slugArr = (await params).slug ?? []
  const slug = slugArr.length === 0 ? '/' : `/${slugArr.join('/')}`
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  if (slug === '/contact') {
    const formContent = await getFormContent()
    return <ContactPage title={page.fields.title} subHeading={page.fields.subHeading} formContent={formContent} />
  }

  return <HomePage page={page} />
}
