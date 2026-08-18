'use client'

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type MaskRevealProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  /** slower/faster than the 1.1s default */
  duration?: number
  as?: ElementType
}

/**
 * Reveals its content by sliding it up from behind a mask, rather than the
 * plain fade-and-rise of <Reveal>. Reserved for headings and other type that
 * should feel deliberately "set" — the mask edge reads as a typographic
 * baseline, so the motion belongs to the letterforms instead of the box.
 *
 * The padding/margin pair keeps descenders from being clipped by the mask.
 */
export default function MaskReveal({
  children,
  className = '',
  style,
  delay = 0,
  duration = 1.1,
  as = 'div',
}: MaskRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = as

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const inner = el.firstElementChild
      if (!inner) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.set(inner, { yPercent: 108 })
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(inner, { yPercent: 0, duration, delay, ease: 'power3.out' })
        },
      })

      return () => trigger.kill()
    },
    { scope: ref }
  )

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        overflow: 'hidden',
        paddingBottom: '0.14em',
        marginBottom: '-0.14em',
        ...style,
      }}
    >
      <span style={{ display: 'block', willChange: 'transform' }}>{children}</span>
    </Tag>
  )
}
