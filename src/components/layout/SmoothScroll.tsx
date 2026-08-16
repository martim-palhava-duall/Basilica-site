'use client'

import { useEffect } from 'react'
import { initLenis } from '@/lib/lenis'

/**
 * Mounts once at the root layout. Drives Lenis smooth scrolling and keeps it
 * synced with GSAP's ticker / ScrollTrigger (see src/lib/lenis.ts).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = initLenis()
    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
