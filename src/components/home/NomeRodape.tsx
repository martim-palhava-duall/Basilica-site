'use client'

import { useEffect, useRef, useState } from 'react'
import { u } from '@/lib/escala'

/** Peças do nome (os SVG do desenho), com o topo relativo ao bloco (que no rodapé começa a 517 do topo) */
const PECAS = [
  { src: '/home/footer-basilica.svg', left: u(36.64), top: 0, width: 1371.364, height: 137.329, mobile: 'max-lg:w-full!' },
  { src: '/home/footer-sagrado.svg', left: u(34), top: 175.28, width: 349.886, height: 57.133, mobile: 'max-lg:w-[30%]!' },
  { src: '/home/footer-coracao.svg', left: 'calc(33.33% + 61.48 * var(--u))', top: 163.19, width: 359.829, height: 82.614, mobile: 'max-lg:w-[31%]!' },
  { src: '/home/footer-jesus.svg', left: 'calc(75% + 22.79 * var(--u))', top: 175.47, width: 304.555, height: 65.349, mobile: 'max-lg:w-[26%]!' },
]

/**
 * Nome da Basílica em letras grandes, no rodapé: as quatro peças do desenho,
 * num bloco de 246 de altura a toda a largura (no mobile ficam em fluxo, à
 * largura do ecrã, com as três de baixo numa linha).
 *
 * Entrada ("subida suave", escolhida entre sete opções): quando "Basílica"
 * chega a 90% do ecrã, as peças sobem um pouco e acendem, sem máscara, numa
 * curva longa, em cascata (CSS em globals.css, "nome do rodapé"). Corre uma vez.
 * Visível por omissão (servidor, antes de hidratar, movimento reduzido ou se
 * já estiver à vista).
 */
export default function NomeRodape({ label, className = '' }: { label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<'parado' | 'espera' | 'entrou'>('parado')

  useEffect(() => {
    // O bloco é observado pela primeira peça (no desktop as peças são absolutas)
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
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-revelar={estado}
      className={`h-[calc(246*var(--u))] w-full max-lg:static max-lg:h-auto max-lg:flex max-lg:flex-wrap max-lg:items-end max-lg:justify-between max-lg:gap-y-[calc(12*var(--u))] ${className}`}
    >
      {PECAS.map((p, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.src}
          src={p.src}
          alt=""
          className={`rodape-peca absolute max-lg:static max-lg:h-auto! ${p.mobile}`}
          style={{ left: p.left, top: u(p.top), width: u(p.width), height: u(p.height), ['--k' as string]: k }}
        />
      ))}
    </div>
  )
}
