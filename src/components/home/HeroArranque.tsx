'use client'

import { useEffect, useRef } from 'react'

/**
 * Arranca a entrada do hero (CSS em globals.css, "entrada do hero"): espera que
 * a fotografia esteja descodificada e a fonte do título carregada — no máximo
 * 1,2s — e passa a secção de `data-hero="espera"` a `"go"`. Assim a animação
 * não começa com a fonte de recurso nem com a fotografia a meio de chegar.
 */
export default function HeroArranque() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const secao = ref.current?.closest<HTMLElement>('[data-hero]')
    if (!secao) return
    let feito = false
    const go = () => {
      if (feito) return
      feito = true
      // Sem rAF: com o separador em segundo plano o rAF não corre, e a entrada
      // ficaria presa no estado escondido.
      secao.dataset.hero = 'go'
    }
    const img = secao.querySelector<HTMLImageElement>('img.hero-foto')
    const prontos: Promise<unknown>[] = []
    if (img?.decode) prontos.push(img.decode().catch(() => {}))
    if (document.fonts?.load) prontos.push(document.fonts.load("italic 300 120px forevs-light, italic 400 120px forevs").catch(() => {}))
    Promise.all(prontos).then(go)
    const t = window.setTimeout(go, 1200)
    return () => window.clearTimeout(t)
  }, [])

  return <span ref={ref} hidden />
}
