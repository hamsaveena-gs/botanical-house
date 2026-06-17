'use client'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: React.ReactNode
}

const VARIANT: Record<string, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  white: 'btn-white',
}

const SIZES: Record<string, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const cls = `btn ${VARIANT[variant]} ${SIZES[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
