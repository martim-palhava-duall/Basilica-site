import Lenis from 'lenis'

let lenis: Lenis | null = null
const ouvintes = new Set<() => void>()

/**
 * Smooth scroll do site todo (Lenis), montado uma vez no layout. O Lenis corre o
 * seu próprio ciclo (`autoRaf`) e não depende de nenhuma biblioteca de animação:
 * quem precisar de acompanhar o scroll (as animações antigas em GSAP) subscreve
 * com `aoRolar`, e só carrega o que usa.
 */
export function initLenis(): Lenis {
  // Valores do guia smooth: lerp 0.1 e roda a 0.9. Sem `syncTouch`: em ecrãs de
  // toque fica o scroll nativo (ver SmoothScroll).
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
    orientation: 'vertical',
    smoothWheel: true,
  })
  lenis.on('scroll', () => ouvintes.forEach((f) => f()))
  return lenis
}

export function destruirLenis() {
  lenis?.destroy()
  lenis = null
}

export function getLenis(): Lenis | null {
  return lenis
}

/** Chama `fn` a cada passo do scroll suave. Devolve a função que cancela. */
export function aoRolar(fn: () => void): () => void {
  ouvintes.add(fn)
  return () => {
    ouvintes.delete(fn)
  }
}
