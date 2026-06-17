import type { Page } from '@/types'
import { renderSection } from '@/lib/componentMap'

interface HomePageProps {
  page: Page
}

export default function HomePage({ page }: HomePageProps) {
  return (
    <>
      {page.fields.sections?.map((section, i) => renderSection(section, i))}
    </>
  )
}
