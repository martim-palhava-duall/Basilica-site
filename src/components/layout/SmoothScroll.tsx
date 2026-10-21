'use client'

import { useEffect } from 'react'
import { destruirLenis, initLenis } from '@/lib/lenis'

/**
 * Montado uma vez no layout raiz: liga o smooth scroll (Lenis) a todo o site
 * (ver src/lib/lenis.ts). Respeita `prefers-reduced-motion`.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Só com rato/trackpad: em ecrãs de toque o scroll nativo é mais fluido.
    // Máquinas fracas (≤ 4 núcleos ou ≤ 4 GB) também ficam com o scroll nativo.
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const nav = navigator as Navigator & { deviceMemory?: number }
    if ((nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (nav.deviceMemory && nav.deviceMemory <= 4)) return

    initLenis()
    return destruirLenis
  }, [])

  return null
}
