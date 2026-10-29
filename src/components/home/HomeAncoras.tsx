'use client'

import { useEffect, useRef, useState } from 'react'
import { getLenis } from '@/lib/lenis'
import { ALTURA_ANCORAS as ALTURA, ALTURA_BARRA, useMenu } from '@/components/home/MenuContext'
import { escalaAncoras, escalaUi, u } from '@/lib/escala'

export type Ancora = { id: string; label: string }

/** Solta um Lenis preso (bloqueado a meio de um scroll): parar e arrancar repõe o estado, só com a API pública */
const soltar = (l: NonNullable<ReturnType<typeof getLenis>>) => {
  l.stop()
  l.start()
}

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
 * Mobile: em vez de uma faixa de nomes que não cabe, uma "drop": a faixa mostra a
 * secção atual com uma seta e, ao tocar, abre por baixo a lista das secções.
 * Fecha ao escolher, ao tocar fora, com Esc e ao fazer scroll.
 *
 * Cada secção da página tem de ter o `id` correspondente.
 */
export default function HomeAncoras({ itens }: { itens: Ancora[] }) {
  const { aberto, barra } = useMenu()
  const [ativa, setAtiva] = useState<string | null>(null)
  const [drop, setDrop] = useState(false)
  const navRef = useRef<HTMLElement>(null)
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
    const lenis = getLenis()
    const livre = () => {
      window.clearTimeout(destravar.current)
      travada.current = false
    }
    destravar.current = window.setTimeout(() => {
      livre()
      // Rede de segurança: se o Lenis ficou preso a meio de um scroll, solta-o
      if (lenis?.isLocked) soltar(lenis)
    }, 1600)
    // O Lenis ignora em silêncio um scrollTo enquanto está bloqueado (`lock`) ou parado:
    // um bloqueio que ficou por soltar (scroll interrompido, separador em segundo plano,
    // navegação a meio) deixava as âncoras mortas até recarregar a página.
    if (lenis?.isLocked) soltar(lenis)
    const desvio = -(ALTURA_BARRA * escalaUi() + ALTURA * escalaAncoras())
    const distancia = Math.abs(el.getBoundingClientRect().top + desvio)
    if (lenis) {
      lenis.scrollTo(el, {
        offset: desvio,
        duration: Math.min(1.1, 0.6 + distancia / 6000),
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        lock: true,
        force: true,
        onComplete: livre,
      })
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + desvio, behavior: 'smooth' })
    }
  }

  // Drop (mobile): fecha ao tocar fora, com Esc, com scroll e quando a faixa sai
  useEffect(() => {
    if (!drop) return
    const fora = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setDrop(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setDrop(false)
    const rolar = () => setDrop(false)
    document.addEventListener('pointerdown', fora)
    document.addEventListener('keydown', esc)
    window.addEventListener('scroll', rolar, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', fora)
      document.removeEventListener('keydown', esc)
      window.removeEventListener('scroll', rolar)
    }
  }, [drop])
  const aberta = drop && visivel
  const atual = itens.find((it) => it.id === ativa)?.label ?? itens[0]?.label

  const cor = barra.escuro ? 'var(--bege-claro-2)' : 'var(--azul-escuro)'

  return (
    <nav
      ref={navRef}
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
      {/* Mobile: a drop */}
      <button
        type="button"
        aria-expanded={aberta}
        aria-controls="ancoras-drop"
        onClick={() => setDrop((d) => !d)}
        className="lg:hidden flex h-full w-full items-center justify-between px-[calc(20*var(--u))] text-[length:var(--t-corpo)] leading-[1.5]"
      >
        <span>{atual}</span>
        <svg aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" fill="none" className="transition-transform duration-[300ms] ease-[var(--ease-out)]" style={{ transform: aberta ? 'rotate(180deg)' : 'none' }}>
          <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <ul
        id="ancoras-drop"
        inert={!aberta}
        className="lg:hidden absolute left-0 top-full w-full border-b border-solid border-[rgba(27,43,57,0.07)] px-[calc(20*var(--u))] pb-[calc(8*var(--ui))] transition-[opacity,transform,visibility] duration-[250ms] ease-[var(--ease-out)]"
        style={{
          backgroundColor: barra.cor,
          opacity: aberta ? 1 : 0,
          visibility: aberta ? 'visible' : 'hidden',
          transform: aberta ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {itens.map((it) => {
          const ativo = it.id === ativa
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => {
                  ir(it.id)(e)
                  setDrop(false)
                }}
                aria-current={ativo ? 'location' : undefined}
                className="flex items-center justify-between border-t border-solid border-[rgba(128,128,128,0.18)] py-[calc(14*var(--ui))] text-[length:var(--t-corpo)] leading-[1.5]"
                style={{ opacity: ativo ? 1 : 0.5 }}
              >
                {it.label}
                {ativo && <span aria-hidden="true" className="h-[calc(6*var(--ui))] w-[calc(6*var(--ui))] rounded-full bg-current" />}
              </a>
            </li>
          )
        })}
      </ul>

      <ul className="max-lg:hidden flex h-full items-center justify-center gap-[calc(24*var(--ui))] px-[calc(32*var(--u))]">
        {itens.map((it) => {
          const ativo = it.id === ativa
          return (
            <li key={it.id} className="h-full">
              <a
                href={`#${it.id}`}
                onClick={ir(it.id)}
                aria-current={ativo ? 'location' : undefined}
                className="flex h-full items-center whitespace-nowrap border-b border-solid text-[length:var(--t-corpo)] leading-[1.5] transition-[opacity,border-color] duration-[250ms] ease-[var(--ease-out)] hover:opacity-60"
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
