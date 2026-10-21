'use client'

import { useEffect, useRef } from 'react'

/**
 * Arranca a entrada do hero (CSS em globals.css, "entrada do hero"): espera que
 * a fotografia esteja descodificada e a fonte do título carregada — no máximo
 * 0,9s — e passa a secção de `data-hero="espera"` a `"go"`. Assim a animação
 * não começa com a fonte de recurso nem com a fotografia a meio de chegar.
 *
 * Na primeira visita corre num script dentro do próprio HTML, logo que o
 * browser chega a esta parte da página: não espera pelo JavaScript do site,
 * que no telemóvel demorava segundos a ficar ativo e mantinha o hero escondido.
 * Quando se chega à homepage por navegação interna (o script do HTML não volta
 * a correr), o efeito faz o mesmo.
 */
const ESPERA_MAX = 900

// O mesmo que `arrancar`, em JavaScript simples, para o script do HTML
const SCRIPT = `(function(){var s=document.currentScript&&document.currentScript.closest('[data-hero]');if(!s)return;var f=0;function go(){if(f)return;f=1;s.dataset.hero='go'}var p=[];var i=s.querySelector('img.hero-foto');if(i&&i.decode)p.push(i.decode().catch(function(){}));var k=document.getElementById('typekit');var c=k&&!k.sheet?new Promise(function(r){k.addEventListener('load',r);k.addEventListener('error',r)}):Promise.resolve();if(document.fonts&&document.fonts.load)p.push(c.then(function(){return document.fonts.load("italic 300 120px forevs-light, italic 400 120px forevs")}).catch(function(){}));Promise.all(p).then(go);setTimeout(go,${ESPERA_MAX})})()`

function arrancar(secao: HTMLElement) {
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
  // O CSS do kit da Adobe entra por script (layout): só depois de ele chegar é
  // que o browser conhece a Forevs e o pedido da fonte faz sentido
  const kit = document.getElementById('typekit') as HTMLLinkElement | null
  const cssKit = kit && !kit.sheet
    ? new Promise<void>((r) => { kit.addEventListener('load', () => r(), { once: true }); kit.addEventListener('error', () => r(), { once: true }) })
    : Promise.resolve()
  if (document.fonts?.load) prontos.push(cssKit.then(() => document.fonts.load("italic 300 120px forevs-light, italic 400 120px forevs")).catch(() => {}))
  Promise.all(prontos).then(go)
  const t = window.setTimeout(go, ESPERA_MAX)
  return () => window.clearTimeout(t)
}

export default function HeroArranque() {
  const ref = useRef<HTMLScriptElement>(null)

  useEffect(() => {
    const secao = ref.current?.closest<HTMLElement>('[data-hero]')
    if (!secao || secao.dataset.hero === 'go') return
    return arrancar(secao)
  }, [])

  return <script ref={ref} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
