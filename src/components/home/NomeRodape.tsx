'use client'

import { useEffect, useRef, useState } from 'react'
import { u } from '@/lib/escala'

/**
 * Opções de entrada do nome do rodapé (página provisória /rodape-opcoes).
 * A 0 é a atual. O CSS de cada uma está em globals.css ("nome do rodapé").
 */
export const OPCOES_NOME = [
  { n: 0, nome: 'Erguer com máscara (atual)', texto: 'Cada peça sobe de baixo enquanto uma máscara a descobre de baixo para cima, em cascata.' },
  { n: 1, nome: 'Fade lento', texto: 'As peças acendem só com opacidade, devagar, uma a uma — sem movimento.' },
  { n: 2, nome: 'Desfocado a nítido', texto: 'As peças começam desfocadas e transparentes e ganham nitidez, como uma fotografia a entrar em foco.' },
  { n: 3, nome: 'Cortina da esquerda', texto: 'Cada peça é descoberta da esquerda para a direita, como uma linha a ser escrita.' },
  { n: 4, nome: 'Do centro para os lados', texto: 'Cada peça abre-se do centro para as pontas, em simetria.' },
  { n: 5, nome: 'Subida suave', texto: 'As peças sobem um pouco e acendem, sem máscara, numa curva longa.' },
  { n: 6, nome: 'Ligado ao scroll', texto: 'O nome acompanha o scroll: sobe e acende à medida que o rodapé entra, peça a peça, e recua se se voltar atrás.' },
] as const

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
 * Entrada: quando "Basílica" chega a 90% do ecrã, `data-revelar` passa de
 * "espera" a "entrou" e o CSS da opção (`data-nome-op`) faz o resto; corre uma
 * vez. A opção 6 é ligada ao scroll (`--p`, de 0 a 1). Visível por omissão
 * (servidor, antes de hidratar, movimento reduzido ou se já estiver à vista).
 */
export default function NomeRodape({
  label,
  opcao = 0,
  className = '',
  forcar = false,
}: {
  label: string
  opcao?: number
  className?: string
  /** corre a entrada mesmo que o nome já esteja à vista (botão "Repetir" da página de opções) */
  forcar?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<'parado' | 'espera' | 'entrou'>('parado')

  useEffect(() => {
    const el = ref.current
    const alvo = el?.querySelector('img')
    if (!el || !alvo) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (opcao === 6) {
      setEstado('entrou')
      let pend = false
      const aplicar = () => {
        pend = false
        const r = alvo.getBoundingClientRect()
        const p = Math.min(Math.max((window.innerHeight - r.top) / (window.innerHeight * 0.55), 0), 1)
        el.style.setProperty('--p', p.toFixed(3))
      }
      const rolar = () => {
        if (!pend) {
          pend = true
          requestAnimationFrame(aplicar)
        }
      }
      aplicar()
      window.addEventListener('scroll', rolar, { passive: true })
      window.addEventListener('resize', rolar)
      return () => {
        window.removeEventListener('scroll', rolar)
        window.removeEventListener('resize', rolar)
      }
    }

    if (alvo.getBoundingClientRect().top < window.innerHeight * 0.9) {
      if (!forcar) return
      setEstado('espera')
      const t = window.setTimeout(() => setEstado('entrou'), 80)
      return () => window.clearTimeout(t)
    }
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
  }, [opcao, forcar])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-revelar={estado}
      data-nome-op={opcao}
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
