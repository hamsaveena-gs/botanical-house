import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import ContactForm from './components/ContactForm'

interface ContactPageProps {
  title: string
  subHeading?: string
}

export default function ContactPage({ title, subHeading }: ContactPageProps) {
  return (
    <div className='mx-auto max-w-2xl px-4 py-16'>
      <Heading as='h1' variant='page' className='mb-2'>{title}</Heading>
      {subHeading && <Text variant='muted' className='mb-10'>{subHeading}</Text>}
      <ContactForm />
    </div>
  )
}
