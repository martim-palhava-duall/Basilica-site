'use client'

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type RevealProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** stagger delay in seconds, useful for revealing sibling Reveal blocks in sequence */
  delay?: number
  /** distance (px) the element travels while revealing */
  y?: number
  as?: ElementType
}

/**
 * Fades + slides content in once it scrolls into view. Wraps the existing
 * `.reveal` / `.is-visible` CSS (see globals.css) with a GSAP ScrollTrigger
 * so it plays nicely with Lenis smooth scroll. No-ops under
 * prefers-reduced-motion (handled globally in CSS).
 */
export default function Reveal({ children, className = '', style, delay = 0, y = 32, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = as

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.set(el, { opacity: 0, y })
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, delay, ease: 'power3.out' })
        },
      })

      return () => trigger.kill()
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
