'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'

/**
 * Fotografia de cada ponto (Figma, nó 201:6113 "Conhecer a basilica", uma por
 * ponto, com o nome do ponto). No desenho, as molduras "pinturas" e "Tumulo da
 * rainha" têm as fotografias trocadas (o túmulo com o medalhão da Rainha está em
 * "pinturas"); aqui vão pelo que mostram. Duas vêm recortadas no desenho: o teto
 * pintado (encostado à direita, a meio da altura) e a fachada (mais para baixo),
 * e o `posicao` reproduz esse enquadramento.
 */
const PONTOS: { n: string; chave: string; foto: string; posicao?: string }[] = [
  { n: '01', chave: 'pi1', foto: '/basilica/conhecer-atrio.jpg' },
  { n: '02', chave: 'pi2', foto: '/basilica/conhecer-interior.jpg' },
  { n: '03', chave: 'pi3', foto: '/basilica/conhecer-pinturas-teto.jpg', posicao: '100% 53%' },
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
 * direita. O ponto ativo está a cheio e os outros a 30%; ativa-se o que passa
 * da linha a 45% do ecrã ao fazer scroll (ou o que está sob o rato), e a
 * fotografia troca por fade.
 */
export default function BasilicaPontos() {
  const t = useTranslations('basilica')
  const [ativo, setAtivo] = useState(0)
  const itens = useRef<(HTMLElement | null)[]>([])

  // Ativo = o último ponto cujo topo já passou da linha a 45% do ecrã
  useEffect(() => {
    let pendente = false
    const atualizar = () => {
      pendente = false
      const linha = window.innerHeight * 0.45
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
          <div className="sticky top-[calc(120*var(--u))] h-[calc(629*var(--u))] w-[calc(678*var(--u))] shrink-0 rounded-[calc(4*var(--u))] overflow-hidden">
            {PONTOS.map((p, i) => (
              <div
                key={p.n}
                className="absolute inset-0 transition-opacity duration-[700ms] ease-[var(--ease-out)]"
                style={{ opacity: i === ativo ? 1 : 0 }}
              >
                <Image src={p.foto} alt={t(`${p.chave}Titulo`)} fill sizes="678px" className="object-cover" style={p.posicao ? { objectPosition: p.posicao } : undefined} />
              </div>
            ))}
          </div>

          {/* Lista */}
          <div className="flex flex-col gap-[calc(48*var(--u))] w-[calc(562*var(--u))]">
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
