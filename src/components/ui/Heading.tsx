interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: 'page' | 'section' | 'subsection' | 'hero' | 'giant'
  children: React.ReactNode
  className?: string
}

export default function Heading({ as: Tag = 'h2', variant = 'section', children, className = '' }: HeadingProps) {
  return (
    <Tag className={`heading-${variant} ${className}`}>
      {children}
    </Tag>
  )
}
