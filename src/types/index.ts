export interface ContentfulAsset {
  sys: { id: string }
  fields: {
    title: string
    description: string
    file: { url: string; details: { image: { width: number; height: number } }; fileName: string; contentType: string }
  }
}

export interface Category {
  sys: { id: string }
  fields: {
    title: string
    slug: string
    description?: string
    image?: ContentfulAsset
  }
}

export interface Plant {
  sys: { id: string }
  fields: {
    title: string
    slug: string
    image: ContentfulAsset
    images?: ContentfulAsset[]
    description: unknown
    price: number
    compareAtPrice?: number
    category?: Category[]
    tags?: string[]
    careLevel?: string
    light?: string
    water?: string
    petFriendly?: boolean
    featured?: boolean
    inStock?: boolean
  }
}

export interface HeroBannerFields {
  heading: string
  subHeading?: string
  backgroundImage: ContentfulAsset
  ctaText?: string
  ctaLink?: string
}

export interface RichTextSectionFields {
  heading?: string
  body: unknown
}

export interface CtaBlockFields {
  heading: string
  description?: string
  buttonText: string
  buttonUrl: string
  backgroundColor?: string
}

export interface PlantGridSectionFields {
  heading?: string
  plants: Plant[]
  layout?: string
}

export type Section =
  | { sys: { contentType: { sys: { id: 'heroBanner' } } }; fields: HeroBannerFields }
  | { sys: { contentType: { sys: { id: 'richTextSection' } } }; fields: RichTextSectionFields }
  | { sys: { contentType: { sys: { id: 'ctaBlock' } } }; fields: CtaBlockFields }
  | { sys: { contentType: { sys: { id: 'gallerySection' } } }; fields: PlantGridSectionFields }

export interface SiteSettings {
  sys: { id: string }
  fields: {
    siteName: string
    navLinks: { label: string; href: string }[]
    footerText: string
  }
}

export interface Page {
  sys: { id: string }
  fields: {
    title: string
    subHeading?: string
    slug: string
    seoTitle?: string
    seoDescription?: string
    ogImage?: ContentfulAsset
    sections: Section[]
  }
}
