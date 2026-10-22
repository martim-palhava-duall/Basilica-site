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

/**
 * Acompanha o scroll no mesmo fotograma em que a página se mexe — para paralaxes
 * e animações ligadas ao scroll. Com o Lenis ligado, corre dentro do ciclo dele:
 * o evento `scroll` do browser só chega no fotograma seguinte, e uma camada que
 * o use fica um fotograma atrás da página (um tremor subtil). Sem Lenis (toque,
 * movimento reduzido, máquinas fracas), usa o evento nativo, uma vez por fotograma.
 * Chama `fn` logo de início e em cada resize. Devolve a função que cancela.
 */
export function seguirScroll(fn: () => void): () => void {
  let pend = false
  let ciclo = 0
  const porFotograma = () => {
    if (pend) return
    pend = true
    ciclo = requestAnimationFrame(() => {
      pend = false
      fn()
    })
  }
  fn()
  window.addEventListener('resize', porFotograma)
  if (lenis) {
    const cancelar = aoRolar(fn)
    return () => {
      cancelar()
      window.removeEventListener('resize', porFotograma)
      cancelAnimationFrame(ciclo)
    }
  }
  window.addEventListener('scroll', porFotograma, { passive: true })
  return () => {
    window.removeEventListener('scroll', porFotograma)
    window.removeEventListener('resize', porFotograma)
    cancelAnimationFrame(ciclo)
  }
}

/** Chama `fn` a cada passo do scroll suave. Devolve a função que cancela. */
export function aoRolar(fn: () => void): () => void {
  ouvintes.add(fn)
  return () => {
    ouvintes.delete(fn)
  }
}
