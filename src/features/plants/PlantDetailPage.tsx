import { notFound } from 'next/navigation'
import { getPlantBySlug } from '@/lib/contentful'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import AddToCart from '@/components/ui/AddToCart'
import ProductImages from './components/ProductImages'
import ProductInfo from './components/ProductInfo'
import CareInfo from './components/CareInfo'

const ProductDescription = dynamic(() => import('./components/ProductDescription'))

export default async function PlantDetailPage({ slug }: { slug: string }) {
  const plant = await getPlantBySlug(slug)
  if (!plant) notFound()

  const { title, image, images, price, compareAtPrice, description, category, tags, careLevel, light, water, petFriendly, inStock } = plant.fields
  const imgUrl = image?.fields?.file?.url ? `https:${image.fields.file.url}` : ''
  const allImages = [image, ...(images || [])].filter(Boolean)
  const originalPrice = compareAtPrice && compareAtPrice !== price ? Math.max(price, compareAtPrice) : null
  const salePrice = compareAtPrice && compareAtPrice !== price ? Math.min(price, compareAtPrice) : price
  const isOnSale = originalPrice !== null

  return (
    <div className='px-4 py-12 sm:py-20'>
      <div className='mx-auto max-w-7xl'>
        <Link href='/plants' className='mb-8 inline-block text-sm text-emerald-600 underline'>
          &larr; Back to Plants
        </Link>
        <div className='grid gap-12 lg:grid-cols-2'>
          <ProductImages images={allImages} title={title} />
          <div className='flex flex-col justify-start'>
            <ProductInfo
              title={title}
              category={category}
              tags={tags}
              price={price}
              originalPrice={originalPrice}
              salePrice={salePrice}
              isOnSale={isOnSale}
              inStock={inStock}
            />
            <CareInfo careLevel={careLevel} light={light} water={water} petFriendly={petFriendly} />
            <ProductDescription description={description} />
            <AddToCart
              id={plant.sys.id}
              title={title}
              price={salePrice}
              image={imgUrl}
              slug={slug?.trim() ?? ''}
              inStock={inStock}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
