'use client'

import { useEffect, useRef, useState } from 'react'
import { getLenis } from '@/lib/lenis'

export type NavSection = { id: string; label: string }

/**
 * Menu interno da página: uma barra que cola por baixo do cabeçalho e
 * acompanha o scroll, com uma âncora por secção e a atual assinalada.
 *
 * Coloca-se no fluxo logo a seguir ao hero — é `sticky`, não `fixed`, por
 * isso só aparece quando o conteúdo começa e vai-se embora com o fim do
 * <main>, sem tapar o rodapé.
 *
 * Abaixo de lg recolhe numa linha só — a secção atual e uma seta — e abre a
 * lista completa ao toque. A partir de lg mostra as secções todas.
 */
export default function SectionNav({ sections, label }: { sections: NavSection[]; label: string }) {
  const [active, setActive] = useState<string | null>(null)
  // só conta abaixo de lg, onde a barra recolhe numa linha
  const [aberto, setAberto] = useState(false)
  const barRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (!els.length) return

    // A secção atual é a que atravessa uma faixa estreita a meio do ecrã.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  // Mantém a âncora atual visível quando a barra corre para o lado. Mexe só no
  // scroll horizontal da lista — scrollIntoView arrastaria a página também.
  useEffect(() => {
    const list = listRef.current
    const link = list?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!list || !link) return
    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [active])

  useEffect(() => {
    if (!aberto) return
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    const fora = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('keydown', tecla)
    document.addEventListener('pointerdown', fora)
    return () => {
      document.removeEventListener('keydown', tecla)
      document.removeEventListener('pointerdown', fora)
    }
  }, [aberto])

  function irPara(e: React.MouseEvent, id: string) {
    const alvo = document.getElementById(id)
    const bar = barRef.current
    if (!alvo || !bar) return
    e.preventDefault()

    // O destino tem de parar por baixo do cabeçalho e desta barra, não atrás.
    // Passa-se ao Lenis a posição já calculada e não o elemento: dado um
    // elemento, o Lenis soma-lhe o scroll-margin-top da secção e o destino
    // ficava descontado duas vezes.
    // A altura a descontar é a da barra já colada (o seu `top` + a sua altura),
    // não onde ela está agora: no topo da página ainda vai a seguir ao hero,
    // e medir-lhe a posição atual deixava o destino um ecrã abaixo.
    const colada = parseFloat(getComputedStyle(bar).top) + bar.offsetHeight
    const top = alvo.getBoundingClientRect().top + window.scrollY - colada + 1
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(top)
    } else {
      window.scrollTo({ top })
    }
    history.replaceState(null, '', `#${id}`)
    setAberto(false)
  }

  const indiceAtual = sections.findIndex((x) => x.id === active)
  const atual = indiceAtual === -1 ? null : sections[indiceAtual]

  return (
    <nav
      ref={barRef}
      aria-label={label}
      className="sticky top-16 md:top-20 z-40 bg-[var(--color-bg-primary)]/92 backdrop-blur-md border-b border-[var(--color-border)]"
    >
      {/* ── Abaixo de lg: recolhida ──
          Sete secções de nome comprido não cabem numa linha de telemóvel. Em
          vez de correr para o lado com nomes cortados, a barra mostra só a
          secção atual e abre a lista completa ao toque. */}
      <div className="lg:hidden container">
        <button
          type="button"
          aria-expanded={aberto}
          aria-controls="section-nav-painel"
          onClick={() => setAberto((v) => !v)}
          className="w-full flex items-center justify-between gap-4 h-12 text-[0.8rem] text-left"
        >
          <span className="flex items-center gap-2 min-w-0">
            {atual ? (
              <>
                <span className="tabular-nums opacity-60">{String(indiceAtual + 1).padStart(2, '0')}</span>
                <span className="truncate">{atual.label}</span>
              </>
            ) : (
              <span className="opacity-70">{label}</span>
            )}
          </span>
          <svg
            width="11" height="7" viewBox="0 0 11 7" fill="none" stroke="currentColor" strokeWidth="1"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 ease-[var(--ease-out)]"
            style={{ transform: aberto ? 'rotate(180deg)' : 'none' }}
          >
            <path d="M1 1l4.5 4.5L10 1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Painel: sai por baixo da barra, por cima do conteúdo — não empurra a
          página, por isso abrir e fechar não mexe no scroll. */}
      <div
        id="section-nav-painel"
        hidden={!aberto}
        className="lg:hidden absolute left-0 right-0 top-full bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] shadow-[0_18px_40px_rgb(27_43_57_/_0.10)]"
      >
        <ul className="container py-2">
          {sections.map((s, i) => {
            const isActive = active === s.id
            return (
              <li key={s.id} className="border-t border-[var(--color-border-light)] first:border-t-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => irPara(e, s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className="flex items-center gap-3 h-11 text-[0.85rem]"
                  style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
                >
                  <span className="tabular-nums opacity-60 w-5">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── A partir de lg: barra completa ── */}
      <div className="hidden lg:block container">
        <ul ref={listRef} className="section-nav-list relative flex items-stretch gap-9 overflow-x-auto">
          {sections.map((s, i) => {
            const isActive = active === s.id
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => irPara(e, s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className="relative flex items-center gap-2 h-14 text-[0.8rem] whitespace-nowrap transition-colors duration-300"
                  style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
                >
                  <span className="tabular-nums opacity-60">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                  {/* filete sob a secção atual, assente na régua da barra */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-0 h-px bg-[var(--color-text-primary)] origin-left transition-transform duration-500 ease-[var(--ease-out)]"
                    style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
