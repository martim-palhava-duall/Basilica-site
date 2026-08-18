'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type ParallaxProps = {
  children: ReactNode
  className?: string
  /** how far the inner layer drifts, as a % of its own height. Keep it small —
   *  the inner layer is only oversized by 20%, so beyond ~12 you see the seam. */
  amount?: number
  /**
   * Stretch to fill the nearest positioned ancestor instead of sizing itself.
   * This has to be a prop rather than an `absolute inset-0` className: the
   * wrapper sets `position` inline (the inner layer depends on it), and an
   * inline style always beats a utility class — so a caller-supplied
   * `absolute` would be silently overridden and the frame would collapse to
   * zero height.
   */
  inset?: boolean
}

/**
 * Scroll-linked parallax for a photograph. The inner layer is 120% tall and
 * offset by -10%, so it can drift within the frame without ever exposing an
 * edge. Pair with a `fill` next/image inside.
 *
 * Deliberately gentle: this is a basilica, not a product launch — the drift
 * should register as depth, not as an effect.
 */
export default function Parallax({ children, className = '', amount = 9, inset = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const inner = el.firstElementChild
      if (!inner) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tween = gsap.fromTo(
        inner,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: ref }
  )

  return (
    <div
      ref={ref}
      className={className}
      style={
        inset
          ? { overflow: 'hidden', position: 'absolute', inset: 0 }
          : { overflow: 'hidden', position: 'relative' }
      }
    >
      <div
        style={{
          position: 'absolute',
          inset: '-10% 0',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
