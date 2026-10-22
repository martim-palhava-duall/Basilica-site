'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Entrada do nome da Basílica no rodapé: quando "Basílica" chega a 90% do ecrã,
 * as quatro peças erguem-se de baixo, reveladas por uma máscara que sobe, em
 * cascata (CSS em globals.css, "nome do rodapé"). Corre uma vez.
 *
 * Visível por omissão (servidor, antes de hidratar, movimento reduzido ou se o
 * rodapé já estiver à vista): só esconde as peças quando ainda estão abaixo do ecrã.
 */
export default function RevelarMarca({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<'parado' | 'espera' | 'entrou'>('parado')

  useEffect(() => {
    // O contentor não tem altura no desktop (as peças são absolutas): observa-se a primeira peça
    const alvo = ref.current?.querySelector('img')
    if (!alvo) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (alvo.getBoundingClientRect().top < window.innerHeight * 0.9) return
    setEstado('espera')
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEstado('entrou')
          obs.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(alvo)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} role="img" aria-label={label} data-revelar={estado} className={className}>
      {children}
    </div>
  )
}
