'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const ESCALA = 1.12 // folga de 6% em cada lado para a fotografia se deslocar sem deixar falhas

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

/**
 * Paralaxe da fotografia de fundo de uma secção (os convites finais): a imagem
 * desloca-se mais devagar do que a página, acompanhando o scroll 1:1.
 *
 * Vai dentro de uma `<section>` com `overflow-hidden` e `relative`. A camada
 * aumenta 12% (`scale`) e desloca-se em `translateY` de −6% a +6% da altura da
 * secção, do momento em que entra por baixo até sair por cima; só `transform`,
 * calculado a cada passo do scroll por rAF. Com movimento reduzido fica parada.
 */
export default function Paralax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const secao = el?.closest('section')
    if (!el || !secao) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let pendente = false
    const aplicar = () => {
      pendente = false
      const r = secao.getBoundingClientRect()
      const vh = window.innerHeight
      const p = clamp01((vh - r.top) / (vh + r.height)) // 0: entra por baixo · 1: sai por cima
      const y = (p - 0.5) * (ESCALA - 1) * r.height
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${ESCALA})`
    }
    const aoRolar = () => {
      if (!pendente) {
        pendente = true
        requestAnimationFrame(aplicar)
      }
    }
    aplicar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 will-change-transform" style={{ transform: `scale(${ESCALA})` }}>
      {children}
    </div>
  )
}
