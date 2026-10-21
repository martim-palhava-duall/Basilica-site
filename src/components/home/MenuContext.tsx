'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { getLenis } from '@/lib/lenis'
import { escalaAncoras, escalaUi } from '@/lib/escala'

export const ALTURA_BARRA = 64
/** Scroll (px) em que o logótipo da home acaba de encolher; a barra de topo aparece a partir daí */
export const DISTANCIA_LOGO = 360
export const ALTURA_ANCORAS = 48

type MenuCtx = { aberto: boolean; recolhido: boolean; barra: { cor: string; escuro: boolean; oculta: boolean }; abrir: () => void; fechar: () => void }
const Ctx = createContext<MenuCtx | null>(null)

export function useMenu() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useMenu fora do MenuProvider')
  return c
}

/**
 * Estado do menu de ecrã — partilhado entre o botão "Menu" do hero, o logótipo
 * (que desce para o cabeçalho do painel e muda de cor) e o próprio painel.
 * `barraFixa`: nas páginas interiores a barra está sempre visível (não há hero).
 * `ancoras`: a página tem a faixa de âncoras (HomeAncoras) por baixo da barra.
 */
export function MenuProvider({ children, barraFixa = false, ancoras = false }: { children: ReactNode; barraFixa?: boolean; ancoras?: boolean }) {
  const [aberto, setAberto] = useState(false)
  const [recolhido, setRecolhido] = useState(barraFixa)
  const [barra, setBarra] = useState({ cor: 'var(--bege-claro-2)', escuro: false, oculta: false })
  const abrir = useCallback(() => setAberto(true), [])
  const fechar = useCallback(() => setAberto(false), [])

  // Passou do topo: o hero larga o logótipo grande e aparece a barra (HomeBarra).
  // O logótipo encolhe ao ritmo do scroll durante DISTANCIA_LOGO px (HomeLogo); a
  // barra entra mesmo no fim.
  useEffect(() => {
    // A barra veste a cor da secção que tem por baixo: cada secção declara a
    // sua em `data-barra` (e `data-barra-tom="escuro"` se o fundo for escuro, para
    // a barra usar logótipo e botões claros). Lê-se a que ocupa o centro da barra.
    // As secções são lidas uma vez e o scroll só trabalha uma vez por imagem (rAF)
    let seccoes: HTMLElement[] | null = null
    let pendente = false
    const atualizar = () => {
      pendente = false
      setRecolhido(barraFixa || window.scrollY > (DISTANCIA_LOGO - 10) * escalaUi())
      // Com as âncoras visíveis a barra e a faixa partilham a cor: lê-se a meio das duas
      const y = (ALTURA_BARRA * escalaUi() + (ancoras ? ALTURA_ANCORAS * escalaAncoras() : 0)) / 2
      seccoes ??= [...document.querySelectorAll<HTMLElement>('[data-barra]')]
      const sec = seccoes.find((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= y && r.bottom > y
      })
      if (!sec?.dataset.barra) return
      const cor = sec.dataset.barra
      const escuro = sec.dataset.barraTom === 'escuro'
      // `data-barra-oculta`: secção que já traz a navegação (o rodapé) — a barra sai
      const oculta = sec.hasAttribute('data-barra-oculta')
      setBarra((b) => (b.cor === cor && b.escuro === escuro && b.oculta === oculta ? b : { cor, escuro, oculta }))
    }
    const onScroll = () => {
      if (!pendente) {
        pendente = true
        requestAnimationFrame(atualizar)
      }
    }
    atualizar() // a página pode abrir já com scroll (voltar atrás, âncora)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [barraFixa, ancoras])

  // Com o painel aberto a página por trás não pode correr. O Lenis conduz o
  // scroll pelo seu próprio rAF e ignora `overflow: hidden`, por isso tem de
  // ser parado explicitamente.
  useEffect(() => {
    if (!aberto) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'

    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', tecla)
    return () => {
      window.removeEventListener('keydown', tecla)
      lenis?.start()
      document.body.style.overflow = ''
      // devolve o foco ao botão que abriu o menu
      const botoes = document.querySelectorAll<HTMLElement>('[data-menu-trigger]')
      ;[...botoes].find((b) => b.checkVisibility({ visibilityProperty: true }))?.focus()
    }
  }, [aberto])

  return (
    <Ctx.Provider value={{ aberto, recolhido, barra, abrir, fechar }}>
      {children}
    </Ctx.Provider>
  )
}
