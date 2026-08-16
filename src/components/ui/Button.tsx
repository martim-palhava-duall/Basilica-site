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
  //
  // `items-stretch` + a hairline divider before the arrow: the arrow gets its
  // own compartment rather than floating next to the label (tengile, insider).
  const isGhost = variant === 'ghost'

  const base = isGhost
    ? 'group/btn inline-flex items-center gap-2.5 text-[0.85rem] transition-colors duration-300'
    : 'group/btn inline-flex items-stretch overflow-hidden text-[0.85rem] transition-colors duration-[350ms] ease-[var(--ease-out)]'

  const variants = {
    // Solid, but lighter than a slab: the fill carries the weight, so the type
    // stays regular rather than medium.
    primary:
      'bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--brand-blue)]',
    // Hairline at reduced opacity, filling in on hover.
    secondary:
      'border border-current/45 hover:border-current hover:bg-current/8',
    ghost:
      'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline-offset-[6px] hover:underline decoration-[0.5px]',
  }

  const classes = `${base} ${variants[variant]} ${className}`
  const radius = isGhost ? undefined : { borderRadius: 'var(--radius)' }

  const arrowSvg = (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-[350ms] ease-[var(--ease-out)] group-hover/btn:translate-x-[3px]"
    >
      <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const content = isGhost ? (
    <>
      <span>{children}</span>
      {arrow && arrowSvg}
    </>
  ) : (
    <>
      <span className="flex items-center px-7 py-3.5 leading-none">{children}</span>
      {arrow && (
        <span className="flex items-center px-4 border-l border-current/25">{arrowSvg}</span>
      )}
    </>
  )

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={radius}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} style={radius}>{content}</Link>
    )
  }

  return (
    <button onClick={onClick} className={classes} style={radius}>{content}</button>
  )
}
