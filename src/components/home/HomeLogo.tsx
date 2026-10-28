'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { DISTANCIA_LOGO, useMenu } from '@/components/home/MenuContext'
import { getLenis } from '@/lib/lenis'
import { ehMobile, escalaUi, u } from '@/lib/escala'

/* Medidas do logótipo no Figma (nó 173:3886) */
const LARGURA = 329
const ALTURA = 168.718

/* Os três estados, cada um com a sua escala e posição de topo. O logótipo é o
   mesmo desenho nos três, por isso muda por escala.
   - topo: 25% maior que no hero do Figma (411 × 211), a pedido do Martim
   - barra: 52px de altura, centrado na barra de scroll de 64px (o Figma
     179:73 tem 88 e 60, que ao Martim pareceu alto)
   - menu: 117 × 60 no cabeçalho do painel (Figma 111:197), centrado nos 88px */
const ESTADOS = {
  topo:      { escala: 1.25,               top: 10.5 },
  barra:     { escala: 52 / ALTURA,        top: 6 },
  menu:      { escala: 117 / LARGURA,      top: 14.5 },
}

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
// smootherstep: arranca e pousa ainda mais devagar do que o smoothstep
const suave = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)

/* Mobile (abaixo de 1024, ver globals.css): os mesmos três estados, com valores
   próprios, entram pelas variáveis CSS que a classe do logótipo define em `max-lg:`.
   No desktop as variáveis não existem e valem os de ESTADOS.
   - topo: 224 × 115, a 14 do topo
   - barra e menu: 49 de altura (0,29), centrado na barra de 64 */
const MOBILE = 'max-lg:left-[calc(20*var(--u))] max-lg:[--logo-topo-e:0.68] max-lg:[--logo-topo-y:14] max-lg:[--logo-barra-e:0.29] max-lg:[--logo-barra-y:8] max-lg:[--logo-menu-e:0.36] max-lg:[--logo-menu-y:6]'

const v = (nome: string, desktop: number) => `var(--logo-${nome}, ${desktop})`

/** Transform do logótipo: `p` (0 a 1) é o progresso do encolher da home, ligado ao scroll */
function transformPara(p: number, aberto: boolean, sai: boolean) {
  let escala: string
  let top: string
  if (aberto) {
    escala = v('menu-e', ESTADOS.menu.escala)
    top = v('menu-y', ESTADOS.menu.top)
  } else {
    const e = suave(p)
    const e0 = v('topo-e', ESTADOS.topo.escala)
    const e1 = v('barra-e', ESTADOS.barra.escala)
    const y0 = v('topo-y', ESTADOS.topo.top)
    const y1 = v('barra-y', ESTADOS.barra.top)
    escala = `calc(${e0} + (${e1} - ${e0}) * ${e})`
    top = `calc(${y0} + (${y1} - ${y0}) * ${e})`
  }
  // Só `transform`: corre todo na placa gráfica
  return `translate3d(0, calc(${top} * var(--u)), 0) scale(${escala}) translateY(${sai ? '-160%' : '0'})`
}

/**
 * Logótipo da Basílica, fixo no canto superior esquerdo.
 *
 * No topo está grande; ao fazer scroll (mais de 40px, o mesmo limiar do site
 * anterior) encolhe e acompanha a página; com o menu aberto desce para o
 * cabeçalho do painel e fica escuro, por cima do fundo branco.
 *
 * Na homepage o encolher acompanha o scroll ao longo de DISTANCIA_LOGO px (360),
 * com smootherstep e uma inércia curta, para ser contínuo mesmo com saltos da
 * roda. Ao abrir e fechar o menu anima
 * junto com o painel, na mesma curva in-out (850ms a abrir, 700ms a fechar);
 * a cor (clara/escura) troca em cross-fade no mesmo ritmo. O texto do menu espera
 * 450ms (HomeMenu) e só entra quando o logótipo já pousou no cabeçalho.
 *
 * Encolhe por `transform: scale()` com origem no canto superior esquerdo, não
 * por mudar de altura — a caixa não se redimensiona a meio da animação.
 */
export default function HomeLogo() {
  const { aberto, recolhido, barra, fechar } = useMenu()
  const pathname = usePathname()

  // Já na homepage o link para "/" não faria nada: leva ao topo, com scroll suave
  const aoClicar = (e: React.MouseEvent) => {
    fechar()
    if (pathname === '/') {
      e.preventDefault()
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(0, { duration: 1.2 })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Na secção que já traz a navegação (rodapé) o logótipo sobe com a barra
  const sai = recolhido && !aberto && barra.oculta
  const noTopo = !aberto && !recolhido
  // Versão clara: no hero e na barra sobre fundo escuro; escura nos restantes
  // No mobile o painel do menu é azul: logótipo claro também com o menu aberto
  const clara = noTopo || (recolhido && !aberto && barra.escuro) || (aberto && ehMobile())

  // Encolher ligado ao scroll (só na homepage; nas outras o logótipo já nasce
  // pequeno). O valor vive numa ref e escreve-se direto no elemento, sem passar
  // pelo React, para acompanhar cada passo do scroll.
  const emHome = pathname === '/'
  const ref = useRef<HTMLAnchorElement>(null)
  const progresso = useRef(emHome ? 0 : 1)
  const atual = useRef({ aberto, sai })
  atual.current = { aberto, sai }

  useEffect(() => {
    if (!emHome) {
      progresso.current = 1
      return
    }
    // O progresso alvo vem do scroll; o mostrado aproxima-se dele com uma inércia
    // curta (por fotograma, independente da taxa de atualização). Assim, mesmo um
    // salto de roda ou de trackpad vira um movimento contínuo, sem solavancos.
    let alvo = clamp01(window.scrollY / (DISTANCIA_LOGO * escalaUi()))
    let ciclo = 0
    let ultimo = 0
    const desenhar = (p: number) => {
      progresso.current = p
      const el = ref.current
      if (el) el.style.transform = transformPara(p, atual.current.aberto, atual.current.sai)
    }
    const passo = (t: number) => {
      const dt = ultimo ? Math.min(t - ultimo, 64) : 16.7
      ultimo = t
      const k = 1 - Math.pow(1 - 0.12, dt / 16.7)
      const atualP = progresso.current + (alvo - progresso.current) * k
      if (Math.abs(alvo - atualP) < 0.0008) {
        desenhar(alvo)
        ciclo = 0
        ultimo = 0
        return
      }
      desenhar(atualP)
      ciclo = requestAnimationFrame(passo)
    }
    const aoRolar = () => {
      alvo = clamp01(window.scrollY / (DISTANCIA_LOGO * escalaUi()))
      if (!ciclo) ciclo = requestAnimationFrame(passo)
    }
    desenhar(alvo) // a página pode abrir já com scroll: sem animar
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      cancelAnimationFrame(ciclo)
    }
  }, [emHome])

  // Transição só quando o estado muda sem scroll (abrir/fechar o menu, sair para
  // o rodapé); durante o encolher a transição está desligada, para seguir o scroll 1:1.
  // A mudança é detetada já no render (padrão "estado anterior"), para a transição
  // entrar no mesmo fotograma em que o transform muda — com um efeito, chegava
  // um render tarde e o logótipo saltava para o tamanho do menu sem animar.
  const [anterior, setAnterior] = useState({ aberto, sai })
  const [animar, setAnimar] = useState(false)
  if (anterior.aberto !== aberto || anterior.sai !== sai) {
    setAnterior({ aberto, sai })
    setAnimar(true)
  }
  // A transição desliga-se quando acaba (transitionend). Não por um tempo fixo:
  // se o browser atrasar o arranque (o primeiro desenho do menu pode demorar), um
  // temporizador cortava a animação a meio e o logótipo saltava. Rede de segurança: 2,5s.
  useEffect(() => {
    if (!animar) return
    const t = setTimeout(() => setAnimar(false), 2500)
    return () => clearTimeout(t)
  }, [animar, aberto, sai])
  const aoAcabar = (e: React.TransitionEvent<HTMLAnchorElement>) => {
    if (e.target === e.currentTarget && e.propertyName === 'transform') setAnimar(false)
  }

  // Abrir e fechar o menu acompanham o painel (curva in-out, como ele): o logótipo
  // arranca e pousa devagar, sem o salto inicial de uma curva ease-out.
  const transicaoAnimada = aberto
    ? 'transform 850ms var(--ease-inout), opacity 400ms var(--ease-out)'
    : 'transform 700ms var(--ease-inout), opacity 400ms var(--ease-out)'

  // Duas versões do logótipo (clara e escura) sobrepostas, em cross-fade. O
  // SVG do Figma traz a cor cozida no ficheiro, por isso a troca é de ficheiro.
  const camada = (visivel: boolean) => ({
    opacity: visivel ? 1 : 0,
    transition: 'opacity 600ms var(--ease-inout)',
    willChange: 'opacity' as const,
  })

  return (
    <Link
      href="/"
      aria-label="Basílica da Estrela"
      onClick={aoClicar}
      onTransitionEnd={aoAcabar}
      ref={ref}
      className={`fixed left-[calc(32*var(--u))] top-0 z-50 block origin-top-left will-change-transform ${MOBILE}`}
      style={{
        width: u(LARGURA),
        height: u(ALTURA),
        transform: transformPara(progresso.current, aberto, sai),
        transition: animar
          ? transicaoAnimada
          : 'opacity 400ms var(--ease-out)',
        opacity: sai ? 0 : 1,
        pointerEvents: sai ? 'none' : undefined,
      }}
    >
      {/* Camada da entrada do hero (só anima dentro da secção com data-hero) */}
      <span className="hero-logo absolute inset-0 block">
      {([
        { marca: '/home/logo-marca.svg', wordmark: '/home/logo-wordmark.svg', visivel: clara },
        { marca: '/home/menu-logo-marca.svg', wordmark: '/home/menu-logo-wordmark.svg', visivel: !clara },
      ]).map((v) => (
        <span key={v.marca} aria-hidden="true" className="absolute inset-0" style={camada(v.visivel)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={v.marca} alt="" width={151.901} height={113.741} className="absolute" style={{ width: u(151.901), height: u(113.741), left: '21.01%', top: '3.63%' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={v.wordmark} alt="" width={289.658} height={27.7794} className="absolute left-0" style={{ width: u(289.658), height: u(27.7794), top: '79.85%' }} />
        </span>
      ))}
      </span>
    </Link>
  )
}
