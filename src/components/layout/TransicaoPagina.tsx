'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getLenis } from '@/lib/lenis'
import { u } from '@/lib/escala'
import { marcarTransicao } from '@/lib/transicao'
import { CONTORNO, FORMAS, LINHAS, MARCA_VIEWBOX } from '@/components/layout/marcaTraco'

/**
 * Transição entre páginas — "Marca" desenhada a traço, como se a Basílica estivesse a ser construída.
 *
 * Um clique numa ligação interna é intercetado: o ecrã passa a bege claro e a
 * marca da Basílica (a da frame do Figma, nó 201:6138) é desenhada a traço ao
 * centro — primeiro a silhueta inteira, de uma só linha, depois os restantes
 * contornos de baixo para cima (`cobrir`, 1,6s no mínimo). O que se vê é sempre a
 * linha final da frame, revelada por uma máscara que segue os contornos: não há
 * troca de opacidades. Navega-se e,
 * quando a nova página chega, a marca sobe um pouco enquanto se esvanece e o
 * véu esbate (`revelar`). Ligações externas, com tecla modificadora, para nova
 * janela ou para a mesma página (âncoras) seguem o comportamento normal. Só se
 * animam `stroke-dashoffset`, `fill-opacity`, `transform` e `opacity`; com
 * movimento reduzido não há véu. O desenho vive em globals.css (.traco-marca).
 */
type Fase = 'repouso' | 'cobrir' | 'revelar'

/**
 * Calendário do traço (ms desde o clique). O véu cobre aos 350; a silhueta
 * desenha-se de 350 a 1250; cada linha leva 450 e entram em cascata de 450 a
 * 1050 (pela ordem `t`), acabando aos 1500 com a marca completa. (Era 2,4s ao
 * todo; encurtado para a navegação não parecer lenta, com as mesmas curvas.)
 */
const TRACO = { contorno: { atraso: 350, dur: 900 }, linhas: { atraso: 450, espalhar: 600, dur: 450 } }
/** Tempo mínimo com o véu a cobrir (o desenho acaba e respira um pouco); a navegação corre por baixo, em paralelo */
const COBRIR = 1600
/** A página só é trocada quando o véu já cobre tudo (a 350ms, com margem) */
const TROCAR = 450
const REVELAR = 800
/** Curvas in-out suaves: nada arranca nem pára de repente */
const EASE_SUAVE = 'cubic-bezier(0.45, 0, 0.55, 1)'
const EASE_SAIDA = 'cubic-bezier(0.65, 0, 0.35, 1)'

/** Marca da Basílica no véu, ao tamanho da frame (194,92 × 145,95 a 1440) */
const MW = 194.92
const MH = 145.954

export default function TransicaoPagina() {
  const pathname = usePathname()
  const router = useRouter()
  const [fase, setFase] = useState<Fase>('repouso')

  const faseRef = useRef<Fase>('repouso')
  const inicio = useRef(0)
  const timers = useRef<number[]>([])

  const mudarFase = useCallback((f: Fase) => {
    faseRef.current = f
    setFase(f)
    // Para quem espera pelo véu (a entrada do hero): ver lib/transicao
    marcarTransicao(f)
  }, [])
  const limpar = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  // Interceta cliques em ligações internas
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const aoClicar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (faseRef.current !== 'repouso') return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      if (a.origin !== window.location.origin) return
      if (a.pathname === window.location.pathname && a.search === window.location.search) return
      e.preventDefault()
      const destino = a.pathname + a.search + a.hash
      mudarFase('cobrir')
      limpar()
      inicio.current = performance.now()
      router.prefetch(destino)
      timers.current.push(
        window.setTimeout(() => router.push(destino), TROCAR),
        // rede de segurança: se a navegação falhar, o véu sai na mesma
        window.setTimeout(() => mudarFase('revelar'), COBRIR + 3000)
      )
    }
    document.addEventListener('click', aoClicar, true)
    return () => document.removeEventListener('click', aoClicar, true)
  }, [router, mudarFase])

  // A nova página chegou: volta ao topo (ou à âncora do link, se a tiver) e o véu sai
  useEffect(() => {
    if (faseRef.current !== 'cobrir') return
    const alvo = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null
    const y = alvo ? alvo.getBoundingClientRect().top + window.scrollY : 0
    getLenis()?.scrollTo(y, { immediate: true })
    window.scrollTo(0, y)
    limpar()
    // O desenho acaba antes de o véu sair: espera o que falta do tempo mínimo
    const falta = Math.max(0, COBRIR - (performance.now() - inicio.current))
    timers.current.push(
      window.setTimeout(() => {
        mudarFase('revelar')
        timers.current.push(window.setTimeout(() => mudarFase('repouso'), REVELAR + 200))
      }, falta)
    )
  }, [pathname, mudarFase])

  useEffect(() => () => limpar(), [])

  const cheio = fase === 'cobrir'
  const saida = fase === 'revelar'
  const parado = fase === 'repouso'

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ pointerEvents: parado ? 'none' : 'auto', visibility: parado ? 'hidden' : 'visible' }}
    >
      <div
        className="absolute inset-0 bg-[var(--bege-claro-2)]"
        style={{
          opacity: cheio ? 1 : 0,
          transition: parado ? 'none' : `opacity ${cheio ? 350 : REVELAR}ms ${cheio ? EASE_SUAVE : EASE_SAIDA} ${saida ? 200 : 0}ms`,
        }}
      >
        <svg
          viewBox={MARCA_VIEWBOX}
          className={`traco-marca absolute left-1/2 top-1/2 ${cheio || saida ? 'desenhar' : ''}`}
          style={{
            width: u(MW),
            height: u(MH),
            marginLeft: u(-MW / 2),
            marginTop: u(-MH / 2),
            overflow: 'visible',
            opacity: saida ? 0 : 1,
            transform: saida ? 'translate3d(0, calc(-12 * var(--u)), 0)' : 'none',
            transition: parado ? 'none' : `opacity ${REVELAR - 300}ms ${EASE_SUAVE}, transform ${REVELAR}ms ${EASE_SAIDA}`,
          }}
        >
          {/* O traço é a máscara: vai revelando as formas da frame ao longo dos contornos */}
          <defs>
            <mask id="traco-marca-mascara" maskUnits="userSpaceOnUse" x="610" y="365" width="220" height="170">
              <path
                className="linha"
                d={CONTORNO}
                pathLength={1}
                style={{ ['--atraso' as string]: `${TRACO.contorno.atraso}ms`, ['--dur' as string]: `${TRACO.contorno.dur}ms` }}
              />
              {LINHAS.map((l, i) => (
                <path
                  key={i}
                  className="linha"
                  d={l.d}
                  pathLength={1}
                  style={{
                    ['--atraso' as string]: `${Math.round(TRACO.linhas.atraso + l.t * TRACO.linhas.espalhar)}ms`,
                    ['--dur' as string]: `${TRACO.linhas.dur}ms`,
                  }}
                />
              ))}
            </mask>
          </defs>
          <g mask="url(#traco-marca-mascara)">
            {FORMAS.map((d, i) => (
              <path key={i} className="forma" d={d} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
