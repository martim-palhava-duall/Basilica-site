'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Fotografia de cada ponto (Figma, nó 201:6113 "Conhecer a basilica", uma por
 * ponto, com o nome do ponto). No desenho, as molduras "pinturas" e "Tumulo da
 * rainha" têm as fotografias trocadas (o túmulo com o medalhão da Rainha está em
 * "pinturas"); aqui vão pelo que mostram. Duas vêm recortadas no desenho: o
 * retábulo das pinturas (encostado à direita, um pouco acima do meio) e a fachada (mais para baixo),
 * e o `posicao` reproduz esse enquadramento.
 */
const PONTOS: { n: string; chave: string; foto: string; posicao?: string }[] = [
  { n: '01', chave: 'pi1', foto: '/basilica/conhecer-atrio.jpg' },
  { n: '02', chave: 'pi2', foto: '/basilica/conhecer-interior.jpg' },
  { n: '03', chave: 'pi3', foto: '/basilica/conhecer-pinturas.jpg', posicao: '100% 37%' },
  { n: '04', chave: 'pi4', foto: '/basilica/conhecer-tumulo-rainha.jpg' },
  { n: '05', chave: 'pi5', foto: '/basilica/conhecer-presepio.jpg' },
  { n: '06', chave: 'pi6', foto: '/basilica/conhecer-sacristia.jpg' },
  { n: '07', chave: 'pi7', foto: '/basilica/conhecer-fachada.jpg', posicao: '50% 66%' },
]

/**
 * Basílica e Convento, Conhecer a Basílica — design novo (Figma, nó 111:1134), desktop 1440.
 *
 * Título e lema, régua, e por baixo duas colunas: a fotografia (678×629) à
 * esquerda, que fica fixa enquanto se percorre a lista, e os sete pontos à
 * direita. O ponto ativo está a cheio e os outros a 30% (ou o que está sob o rato).
 *
 * Qual é o ativo: uma linha de leitura desce sobre a fotografia fixa, do topo
 * ao fundo, à medida que a lista passa por ela; o ativo é o último ponto cujo
 * topo já passou essa linha. Assim os sete pontos têm a sua vez enquanto a
 * fotografia está fixa — com uma linha parada a meio do ecrã, os últimos só
 * chegavam lá depois de a fotografia se soltar, e as fotos deles nunca se viam.
 *
 * Troca da fotografia: a nova entra por cima da anterior (só um fade curto e
 * suave, sem zoom), e só depois de carregada; a anterior fica por baixo até lá, para
 * nunca aparecer o fundo vazio a meio. Todas carregam quando a secção se
 * aproxima do ecrã.
 */
export default function BasilicaPontos() {
  const t = useTranslations('basilica')
  const [ativo, setAtivo] = useState(0)
  // A que está à vista (a ativa, se já carregou; senão a anterior) e a de baixo
  const [vista, setVista] = useState(0)
  const [baixo, setBaixo] = useState(0)
  const [carregadas, setCarregadas] = useState<Set<number>>(() => new Set())
  const itens = useRef<(HTMLElement | null)[]>([])
  const fotoRef = useRef<HTMLDivElement>(null)
  const listaRef = useRef<HTMLDivElement>(null)

  // A fotografia ativa só aparece quando já está carregada
  useEffect(() => {
    if (ativo === vista || !carregadas.has(ativo)) return
    setBaixo(vista)
    setVista(ativo)
  }, [ativo, vista, carregadas])

  // Ativo = o último ponto cujo topo já passou a linha de leitura, que desce
  // sobre a fotografia fixa de cima a baixo enquanto a lista passa por ela
  useEffect(() => {
    let pendente = false
    const atualizar = () => {
      pendente = false
      const foto = fotoRef.current?.getBoundingClientRect()
      const lista = listaRef.current?.getBoundingClientRect()
      if (!foto || !lista) return
      const percurso = Math.max(lista.height - foto.height, 1)
      const p = Math.min(Math.max((foto.top - lista.top) / percurso, 0), 1)
      const linha = foto.top + p * foto.height
      let i = 0
      itens.current.forEach((el, k) => {
        if (el && el.getBoundingClientRect().top <= linha) i = k
      })
      setAtivo(i)
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
  }, [])

  return (
    <section id="conhecer"
      data-barra="var(--bege-claro)"
      className="flex w-full px-[calc(32*var(--u))] py-[calc(180*var(--u))] bg-[var(--bege-claro)] text-[var(--azul-escuro)]"
    >
      <div className="flex flex-col gap-[calc(64*var(--u))] w-full">
        <div className="flex flex-col gap-[calc(35*var(--u))] w-full">
          <div className="flex items-start justify-between w-full">
            <Revelar>
              <h2
                className="font-display text-[length:calc(80*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal whitespace-nowrap"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('conhecerTitulo')}
              </h2>
            </Revelar>
            <p className="flex h-[calc(74*var(--u))] w-[calc(210*var(--u))] items-center text-[length:calc(16*var(--u))] leading-[1.4] opacity-40">{t('conhecerSub')}</p>
          </div>
          <div aria-hidden="true" className="h-px w-full border-t border-solid border-[var(--azul-escuro)] opacity-25" />
        </div>

        <div className="flex items-start justify-between w-full">
          {/* Fotografia fixa */}
          <div ref={fotoRef} className="sticky top-[calc(120*var(--u))] h-[calc(629*var(--u))] w-[calc(678*var(--u))] shrink-0 rounded-[calc(4*var(--u))] overflow-hidden bg-[var(--bege-claro)]">
            {PONTOS.map((p, i) => {
              const cima = i === vista
              const visivel = cima || i === baixo
              return (
                <div
                  key={p.n}
                  aria-hidden={!cima}
                  className="absolute inset-0 transition-opacity duration-[450ms] ease-[var(--ease-out)]"
                  style={{
                    zIndex: cima ? 2 : i === baixo ? 1 : 0,
                    opacity: visivel ? 1 : 0,
                    // A de baixo e as escondidas trocam sem transição: só a de cima anima
                    transitionDuration: cima ? undefined : '0ms',
                  }}
                >
                  <Image
                    src={p.foto}
                    alt={t(`${p.chave}Titulo`)}
                    fill
                    sizes="678px"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onLoad={() => setCarregadas((c) => (c.has(i) ? c : new Set(c).add(i)))}
                    className="object-cover"
                    style={p.posicao ? { objectPosition: p.posicao } : undefined}
                  />
                </div>
              )
            })}
          </div>

          {/* Lista */}
          <div ref={listaRef} className="flex flex-col gap-[calc(48*var(--u))] w-[calc(562*var(--u))]">
            {PONTOS.map((p, i) => (
              <article
                key={p.n}
                data-i={i}
                ref={(el) => {
                  itens.current[i] = el
                }}
                onMouseEnter={() => setAtivo(i)}
                className="flex flex-col gap-[calc(24*var(--u))] pb-[calc(24*var(--u))] border-b border-solid border-[rgba(28,43,57,0.3)] transition-opacity duration-[500ms] ease-[var(--ease-out)]"
                style={{ opacity: i === ativo ? 1 : 0.3 }}
              >
                <div className="flex flex-col gap-[calc(16*var(--u))] w-full">
                  <span className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{p.n}</span>
                  <h3
                    className="font-display text-[length:calc(48*var(--u))] leading-[calc(96*var(--u))] tracking-[calc(0.96*var(--u))] font-normal"
                    style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
                  >
                    {t(`${p.chave}Titulo`)}
                  </h3>
                </div>
                <p className="text-[length:calc(16*var(--u))] leading-[1.5]">{t(`${p.chave}Texto`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
