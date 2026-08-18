'use client'

import type { ReactNode } from 'react'

/**
 * Slow horizontal ticker. Two identical tracks scroll as one so the loop has
 * no seam. Purely decorative, so the duplicate is hidden from assistive tech
 * and the whole thing stops under prefers-reduced-motion (see globals.css).
 */
export default function Marquee({
  items,
  className = '',
  separator = '·',
}: {
  items: string[]
  className?: string
  separator?: ReactNode
}) {
  const track = (
    <div className="marquee-track">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="marquee-item">
          {item}
          <span aria-hidden="true" className="marquee-sep">{separator}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${className}`}>
      {track}
      <div aria-hidden="true">{track}</div>
    </div>
  )
}
