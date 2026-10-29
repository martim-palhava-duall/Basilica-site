'use client'

import { useState } from 'react'
import HomeDestaques from '@/components/home/HomeDestaques'
import { ENTRADAS_NOTICIAS } from '@/components/home/NoticiasBloco'

/** As novas (7 a 12) primeiro */
const ORDEM = [...ENTRADAS_NOTICIAS.filter((o) => o.n >= 7), ...ENTRADAS_NOTICIAS.filter((o) => o.n < 7)]

/** Lista provisória das opções de entrada dos Destaques, cada uma com "Repetir". */
export default function DestaquesOpcoesLista() {
  const [chaves, setChaves] = useState<number[]>(ENTRADAS_NOTICIAS.map(() => 0))
  return (
    <main className="overflow-x-clip bg-[var(--bege-claro)] text-[var(--azul-escuro)]">
      <div className="px-[calc(48*var(--u))] pb-[calc(40*var(--u))] pt-[calc(56*var(--u))]">
        <p className="text-[length:var(--t-etiqueta)] opacity-60">Provisório</p>
        <h1 className="mt-[calc(8*var(--u))] font-display text-[length:calc(56*var(--u))] leading-[1.1]">Destaques: opções de animação</h1>
        <p className="mt-[calc(12*var(--u))] max-w-[calc(680*var(--u))] text-[length:var(--t-etiqueta)] leading-[1.5] opacity-80">
          Faz scroll devagar por cada secção. As 7 a 12 são a nova ronda (as 1 a 6 continuam em baixo). As opções 3 e 11 estão ligadas ao scroll; as outras correm quando a secção entra no ecrã. A escolhida vale
          também para os blocos iguais do Sobre nós (&ldquo;O que vai acontecer&rdquo;) e do detalhe de notícia.
        </p>
      </div>
      {ORDEM.map((o, k) => (
        <div key={o.n} className="border-t border-[rgba(28,43,57,0.2)]">
          <div className="flex items-end justify-between gap-[calc(40*var(--u))] px-[calc(48*var(--u))] py-[calc(28*var(--u))]">
            <div>
              <p className="text-[length:var(--t-etiqueta)] opacity-60">Opção {o.n}</p>
              <p className="font-display text-[length:calc(32*var(--u))] leading-[1.1]">{o.nome}</p>
              <p className="mt-[calc(6*var(--u))] max-w-[calc(720*var(--u))] text-[length:var(--t-etiqueta)] leading-[1.5] opacity-75">{o.texto}</p>
            </div>
            <button
              type="button"
              onClick={() => setChaves((c) => c.map((v, i) => (i === k ? v + 1 : v)))}
              className="btn-luz h-[calc(40*var(--u))] shrink-0 rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] px-[calc(22*var(--u))] text-[length:var(--t-etiqueta)] text-[var(--bege-claro-2)]"
            >
              Repetir
            </button>
          </div>
          <HomeDestaques key={`${o.n}-${chaves[k]}`} entrada={o.n} />
          <div className="h-[calc(200*var(--u))]" />
        </div>
      ))}
    </main>
  )
}
