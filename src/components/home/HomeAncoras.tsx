'use client'

import { useEffect, useRef, useState } from 'react'
import { getLenis } from '@/lib/lenis'
import { ALTURA_ANCORAS as ALTURA, ALTURA_BARRA, useMenu } from '@/components/home/MenuContext'
import { escalaAncoras, escalaUi, u } from '@/lib/escala'

export type Ancora = { id: string; label: string }

/**
 * Âncoras das páginas interiores — design novo (Figma, nó 137:2).
 *
 * Faixa de 48px colada por baixo da barra de topo, com o nome de cada secção
 * da página. Está presente desde que a página abre (sai só com o rodapé),
 * veste a cor da secção que tem por baixo como a própria barra, e destaca a
 * secção em que se está (a cheio, com um traço por baixo; as outras a 20%).
 * Clicar leva suavemente à secção (rápido a arrancar, mais curto quanto mais perto) e a âncora acende logo. Sai com a barra, no rodapé, e quando o menu
 * de ecrã está aberto.
 *
 * Cada secção da página tem de ter o `id` correspondente.
 */
export default function HomeAncoras({ itens }: { itens: Ancora[] }) {
  const { aberto, barra } = useMenu()
  const [ativa, setAtiva] = useState<string | null>(null)
  const visivel = !barra.oculta && !aberto
  // Durante o scroll provocado por um clique a ativa já é a escolhida: o scroll não a muda pelo caminho
  const travada = useRef(false)
  const destravar = useRef<number | undefined>(undefined)

  // Ativa a última secção cujo topo já passou da linha logo abaixo das faixas
  useEffect(() => {
    let pendente = false
    const atualizar = () => {
      pendente = false
      if (travada.current) return
      const linha = ALTURA_BARRA * escalaUi() + (ALTURA + 40) * escalaAncoras()
      let id: string | null = null
      for (const it of itens) {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= linha) id = it.id
      }
      setAtiva(id)
    }
    const aoRolar = () => {
      if (!pendente) {
        pendente = true
        requestAnimationFrame(atualizar)
      }
    }
    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [itens])

  /**
   * Clique: a âncora escolhida acende logo (não espera que o scroll lá chegue) e o
   * scroll arranca depressa e abranda no fim (ease-out quart); a duração cresce
   * com a distância, de 0,6s a 1,1s, em vez de ser sempre a mesma.
   */
  const ir = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    setAtiva(id)
    travada.current = true
    window.clearTimeout(destravar.current)
    const livre = () => {
      window.clearTimeout(destravar.current)
      travada.current = false
    }
    destravar.current = window.setTimeout(livre, 1600) // rede de segurança
    const lenis = getLenis()
    const desvio = -(ALTURA_BARRA * escalaUi() + ALTURA * escalaAncoras())
    const distancia = Math.abs(el.getBoundingClientRect().top + desvio)
    if (lenis) {
      lenis.scrollTo(el, {
        offset: desvio,
        duration: Math.min(1.1, 0.6 + distancia / 6000),
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        lock: true,
        onComplete: livre,
      })
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + desvio, behavior: 'smooth' })
    }
  }

  const cor = barra.escuro ? 'var(--bege-claro-2)' : 'var(--azul-escuro)'

  return (
    <nav
      aria-label="Nesta página"
      inert={!visivel}
      className="fixed left-0 z-[39] w-full border-b border-solid border-[rgba(27,43,57,0.07)]"
      style={{
        top: u(ALTURA_BARRA),
        height: 'calc(48 * var(--ui))',
        backgroundColor: barra.cor,
        color: cor,
        transform: visivel ? 'translateY(0)' : `translateY(calc(-${ALTURA_BARRA} * var(--u) - 48 * var(--ui)))`,
        transition: 'transform 280ms var(--ease-out), background-color 300ms var(--ease-out), color 300ms var(--ease-out)',
      }}
    >
      <ul className="flex h-full items-center justify-center gap-[calc(24*var(--ui))] px-[calc(32*var(--u))]">
        {itens.map((it) => {
          const ativo = it.id === ativa
          return (
            <li key={it.id} className="h-full">
              <a
                href={`#${it.id}`}
                onClick={ir(it.id)}
                aria-current={ativo ? 'location' : undefined}
                className="flex h-full items-center whitespace-nowrap border-b border-solid text-[length:calc(16*var(--ui))] leading-[1.5] transition-[opacity,border-color] duration-[250ms] ease-[var(--ease-out)] hover:opacity-60"
                style={{ opacity: ativo ? 1 : 0.2, borderColor: ativo ? 'currentColor' : 'transparent' }}
              >
                {it.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
