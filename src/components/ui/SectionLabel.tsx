type SectionLabelProps = {
  children: React.ReactNode
  className?: string
  /** trailing hairline rule, editorial style (see vivre) */
  rule?: boolean
}

export default function SectionLabel({ children, className = '', rule = false }: SectionLabelProps) {
  if (!rule) {
    return <span className={`label block mb-6 ${className}`}>{children}</span>
  }

  return (
    <span className={`label flex items-center gap-5 mb-6 ${className}`}>
      <span className="whitespace-nowrap">{children}</span>
      <span aria-hidden="true" className="h-px w-16 bg-current opacity-40" />
    </span>
  )
}
