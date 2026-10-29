'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import { u } from '@/lib/escala'
import { ESTILO_GESTOS, useGaleriaGestos } from '@/lib/useGaleriaGestos'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

/** Cada década, com a fotografia que a acompanha. Os textos estão nas mensagens
 *  (`hist1750`…`hist1800`; os de 1790 e 1800 escritos a partir de pesquisa, a
 *  rever com a paróquia). Só a fotografia de 1750 é da época; as outras são
 *  fotografias atuais da Basílica, já usadas no site, para se ver como a secção
 *  funciona — a trocar pelas de cada época quando as houver. */
const DECADAS = [
  { ano: 1750, foto: '/sobre/historia-1750.png' },
  { ano: 1760, foto: '/home/somos-fachada.jpg' },
  { ano: 1770, foto: '/basilica/conhecer-fachada.jpg' },
  { ano: 1780, foto: '/images/cupula-torre.jpg' },
  { ano: 1790, foto: '/basilica/conhecer-tumulo-rainha.jpg' },
  { ano: 1800, foto: '/basilica/conhecer-presepio.jpg' },
] as const

/** Opacidade de cada ano consoante a distância à década ativa (Figma: 1, .4, .3, .2, .1, .05).
 *  Os anos que já passaram saem pela esquerda e desvanecem-se por completo. */
const OPACIDADE = [1, 0.4, 0.3, 0.2, 0.1, 0.05]

const FADE = 'transition-opacity duration-[600ms] ease-[var(--ease-out)]'

/**
 * Sobre nós, História — design novo (Figma, nó 170:3161), desktop 1440, 947 de altura.
 *
 * Cabeçalho (Dois séculos + texto) com régua; por baixo, a linha de anos a
 * 48px, com o ano ativo a cheio e os outros a esbater-se; à esquerda o título
 * e o texto da década, à direita a fotografia, e as duas setas junto a ela.
 * Clicar num ano ou numa seta muda de década: a linha de anos desliza para a
 * esquerda, o ano anterior sai (cortado na margem) e o novo ocupa o seu lugar;
 * texto e fotografia trocam por fade, empilhados no mesmo sítio.
 *
 * Mobile e tablet: o índice das seis décadas (o traço ativo desliza por baixo do ano),
 * a fotografia da década (desliza-se com o dedo para mudar), o título e o texto da
 * década e, no fim, o contador e as setas, por baixo de uma régua de ponta a ponta.
 */
export default function SobreHistoria() {
  const t = useTranslations('sobre')
  const [ativa, setAtiva] = useState(0)
  const linha = useRef<HTMLDivElement>(null)
  const [deslocamentos, setDeslocamentos] = useState<number[]>([])

  // Posição de cada ano dentro da linha: é quanto a linha desliza para o ano
  // ficar encostado à margem. Remede quando a fonte chega e muda as larguras.
  useLayoutEffect(() => {
    const el = linha.current
    if (!el) return
    const medir = () => setDeslocamentos([...el.children].map((c) => (c as HTMLElement).offsetLeft))
    medir()
    const obs = new ResizeObserver(medir)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const ir = (i: number) => setAtiva(Math.min(Math.max(i, 0), DECADAS.length - 1))
  // Mobile e tablet: deslizar a fotografia (dedo, rato ou trackpad) muda de década
  const { ref: palco, arrasto, arrastando } = useGaleriaGestos<HTMLDivElement>({
    ir: (d) => setAtiva((a) => Math.min(Math.max(a + d, 0), DECADAS.length - 1)),
    limiar: 50,
  })
  const n2 = (n: number) => String(n).padStart(2, '0')

  return (
    <section id="historia"
      data-barra="var(--vermelho)"
      data-barra-tom="escuro"
      className="relative w-full h-[calc(947*var(--u))] max-lg:h-auto max-lg:flex max-lg:flex-col max-lg:gap-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(72*var(--u))] bg-[var(--vermelho)] text-[var(--bege-claro-2)]"
    >
      {/* ── Cabeçalho ── */}
      <div className="absolute left-[calc(32*var(--u))] top-[calc(123*var(--u))] max-lg:static flex flex-col gap-[calc(35*var(--u))] max-lg:gap-[calc(28*var(--u))] w-[calc(1376*var(--u))] max-lg:w-full">
        <div className="flex flex-col gap-[calc(24*var(--u))] w-full">
          <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('histLabel')}</p></Revelar>
          <div className="flex items-start justify-between w-full max-lg:flex-col max-lg:gap-[calc(20*var(--u))]">
            <Revelar atraso={100}>
              <h2 className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] max-lg:text-[length:calc(44*var(--u))] max-lg:leading-[calc(48*var(--u))] tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal whitespace-nowrap" style={TRIM}>
                {t('histTitulo')}
              </h2>
            </Revelar>
            <Revelar atraso={200}>
              <p className="w-[calc(445*var(--u))] max-lg:w-full text-[length:calc(16*var(--u))] leading-[1.5]">{t('histTexto')}</p>
            </Revelar>
          </div>
        </div>
        <div className="h-px w-full max-lg:-mx-[calc(20*var(--u))] max-lg:w-[calc(100%+40*var(--u))] border-t border-solid border-[var(--bege-claro-2)] opacity-25" />
      </div>

      {/* ── Anos ── */}
      <Revelar atraso={150} className="absolute left-[calc(32*var(--u))] top-[calc(342*var(--u))] w-[calc(900*var(--u))] max-lg:hidden overflow-hidden">
        <div
          ref={linha}
          role="tablist"
          className="flex w-max items-center gap-[calc(32*var(--u))] font-display text-[length:calc(48*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] whitespace-nowrap transition-transform duration-[700ms] ease-[var(--ease-out)]"
          style={{ transform: `translateX(${-(deslocamentos[ativa] ?? 0)}px)` }}
        >
          {DECADAS.map((d, i) => (
            <button
              key={d.ano}
              type="button"
              role="tab"
              aria-selected={i === ativa}
              onClick={() => ir(i)}
              className={`${FADE} hover:!opacity-100 focus-visible:!opacity-100 outline-none`}
              style={{ ...TRIM, opacity: i < ativa ? 0 : OPACIDADE[Math.min(i - ativa, OPACIDADE.length - 1)] }}
            >
              {d.ano}
            </button>
          ))}
        </div>
      </Revelar>

      {/* ── Mobile e tablet: índice das décadas (o traço ativo desliza por baixo do ano) ── */}
      <div role="tablist" aria-label={t('histLabel')} className="lg:hidden order-2 relative w-full pb-[calc(12*var(--u))]">
        <div className="flex w-full">
          {DECADAS.map((d, i) => (
            <button
              key={d.ano}
              type="button"
              role="tab"
              aria-selected={i === ativa}
              onClick={() => ir(i)}
              className={`flex-1 py-[calc(6*var(--u))] text-left font-display text-[length:calc(17*var(--u))] leading-none outline-none ${FADE}`}
              style={{ opacity: i === ativa ? 1 : 0.45 }}
            >
              {d.ano}
            </button>
          ))}
        </div>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-current opacity-25" />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[calc(2*var(--u))] w-[calc(100%/6)] -translate-y-[calc(0.5*var(--u))] bg-current transition-transform duration-[600ms] ease-[var(--ease-out)]"
          style={{ transform: `translateX(${ativa * 100}%)` }}
        />
      </div>

      {/* ── Mobile e tablet: a fotografia da década; desliza-se para mudar ── */}
      <div
        ref={palco}
        className="lg:hidden order-3 relative h-[calc(300*var(--u))] md:h-[calc(340*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]"
        style={{ ...ESTILO_GESTOS }}
      >
        <div
          className="absolute inset-0 transition-transform duration-[500ms] ease-[var(--ease-out)]"
          style={{ transform: `translateX(${arrasto * 0.25}px)`, transitionDuration: arrastando ? '0ms' : undefined }}
        >
          {DECADAS.map((d, i) => (
            <div key={d.ano} className={`absolute inset-0 ${FADE}`} style={{ opacity: i === ativa ? 1 : 0 }}>
              <Image src={d.foto} alt={i === ativa ? t('histFotoAlt') : ''} fill sizes="100vw" className="object-cover object-bottom" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Texto da década ── */}
      <div className="absolute left-[calc(32*var(--u))] top-[calc(701*var(--u))] w-[calc(445*var(--u))] max-lg:static max-lg:order-4 max-lg:w-full grid">
        {DECADAS.map((d, i) => (
          <div
            key={d.ano}
            aria-hidden={i !== ativa}
            className={`col-start-1 row-start-1 flex flex-col gap-[calc(32*var(--u))] max-lg:gap-[calc(14*var(--u))] ${FADE}`}
            style={{ opacity: i === ativa ? 1 : 0, pointerEvents: i === ativa ? undefined : 'none' }}
          >
            <p className="font-display text-[length:calc(64*var(--u))] max-lg:text-[length:calc(28*var(--u))] leading-[calc(96*var(--u))] max-lg:leading-[calc(32*var(--u))]" style={TRIM}>{t('histDecada', { ano: d.ano })}</p>
            <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{t(`hist${d.ano}`)}</p>
          </div>
        ))}
      </div>

      {/* ── Fotografia ── */}
      <div className="absolute left-[calc(963*var(--u))] top-[calc(342*var(--u))] h-[calc(541*var(--u))] w-[calc(445*var(--u))] max-lg:hidden rounded-[calc(4*var(--u))] overflow-hidden">
        {DECADAS.map((d, i) => (
          <div key={d.ano} className={`absolute inset-0 ${FADE}`} style={{ opacity: i === ativa ? 1 : 0 }}>
            <Image src={d.foto} alt={i === ativa ? t('histFotoAlt') : ''} fill sizes="445px" className="object-cover object-bottom" />
          </div>
        ))}
      </div>

      {/* ── Mobile e tablet: contador e setas, depois de ler ── */}
      <div className="lg:hidden order-5 -mx-[calc(20*var(--u))] flex w-[calc(100%+40*var(--u))] items-center justify-between border-t border-solid border-[rgba(247,242,238,0.25)] px-[calc(20*var(--u))] pt-[calc(16*var(--u))]">
        <span className="text-[length:calc(12*var(--u))] leading-none tabular-nums opacity-70">
          {n2(ativa + 1)} / {n2(DECADAS.length)}
        </span>
        <div className="flex items-center gap-[calc(8*var(--u))]">
          {([
            { rotulo: 'histAnterior', destino: ativa - 1, desativada: ativa === 0, d: 'M23 6.5H1M6.5 1 1 6.5 6.5 12' },
            { rotulo: 'histSeguinte', destino: ativa + 1, desativada: ativa === DECADAS.length - 1, d: 'M1 6.5h22M17.5 1 23 6.5 17.5 12' },
          ] as const).map((b) => (
            <button
              key={b.rotulo}
              type="button"
              aria-label={t(b.rotulo)}
              disabled={b.desativada}
              onClick={() => ir(b.destino)}
              className="flex size-[calc(40*var(--u))] items-center justify-center rounded-full border border-solid border-[rgba(247,242,238,0.45)] transition-opacity duration-[400ms] ease-[var(--ease-out)] disabled:opacity-30"
            >
              <svg aria-hidden="true" width="24" height="13" viewBox="0 0 24 13" fill="none" style={{ width: u(16), height: u(9) }}>
                <path d={b.d} stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* ── Setas: o SVG do Figma tem as duas; cada botão mostra uma metade (no mobile, juntas, em fila) ── */}
      <div className="contents max-lg:hidden">
      {([
        { rotulo: 'histAnterior', left: 839, img: 3.5, destino: ativa - 1, desativada: ativa === 0 },
        { rotulo: 'histSeguinte', left: 895, img: -52.5, destino: ativa + 1, desativada: ativa === DECADAS.length - 1 },
      ] as const).map((b) => (
        <button
          key={b.rotulo}
          type="button"
          aria-label={t(b.rotulo)}
          disabled={b.desativada}
          onClick={() => ir(b.destino)}
          className={`group/seta absolute left-[var(--seta-x)] max-lg:relative max-lg:left-auto max-lg:top-auto top-[calc(867*var(--u))] h-[calc(20*var(--u))] w-[calc(32*var(--u))] overflow-hidden transition-opacity duration-[400ms] ease-[var(--ease-out)] ${b.desativada ? 'opacity-30 cursor-default' : 'opacity-70 hover:opacity-100'}`}
          style={{ ['--seta-x' as string]: u(b.left) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sobre/historia-setas.svg" alt="" width={81} height={13} className="absolute max-w-none" style={{ width: u(81), height: u(13), left: u(b.img), top: u(3.5) }} />
        </button>
      ))}
      </div>
    </section>
  )
}
