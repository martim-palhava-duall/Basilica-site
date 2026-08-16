import Link from 'next/link'

type ButtonProps = {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  external?: boolean
  /** editorial arrow affordance that slides on hover (see paisana / tengile) */
  arrow?: boolean
  children: React.ReactNode
  className?: string
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  external = false,
  arrow = false,
  children,
  className = '',
}: ButtonProps) {
  // Sentence case, no wide tracking — every reference site (paisana, tengile,
  // vivre, insider, bela vista) sets its CTAs this way; a tracked uppercase
  // label reads as generic template chrome against the editorial serif type.
  const base = 'group/btn inline-flex items-center gap-3 text-[0.85rem] font-medium transition-all duration-[400ms] ease-[var(--ease-out)]'

  const variants = {
    primary: 'bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] px-9 py-4 hover:opacity-80',
    secondary: 'border border-current px-9 py-4 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-text-inverse)]',
    ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover/btn:translate-x-1"
        >
          <path d="M0 5h12M8.5 1.5 12 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  )

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>{content}</Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>{content}</button>
  )
}
