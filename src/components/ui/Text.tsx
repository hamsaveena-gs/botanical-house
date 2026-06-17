interface TextProps {
  as?: 'p' | 'span' | 'div' | 'label'
  variant?: 'body' | 'small' | 'caption' | 'muted' | 'label'
  className?: string
  children: React.ReactNode
  htmlFor?: string
}

export default function Text({
  as: Tag = 'p',
  variant = 'body',
  className = '',
  children,
  htmlFor,
}: TextProps) {
  return (
    <Tag className={`text-${variant} ${className}`} htmlFor={htmlFor}>
      {children}
    </Tag>
  )
}
