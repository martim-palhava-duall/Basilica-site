'use client'

import { useState } from 'react'
import NomeRodape, { OPCOES_NOME } from '@/components/home/NomeRodape'

/**
 * Lista provisória das opções de entrada do nome do rodapé: cada uma numa faixa
 * azul escura como o rodapé, com "Repetir". Entre faixas há espaço para cada
 * uma entrar no ecrã por si.
 */
export default function RodapeOpcoesLista() {
  const [chaves, setChaves] = useState<number[]>(OPCOES_NOME.map(() => 0))
  return (
    <main className="bg-[var(--bege-claro)] text-[var(--azul-escuro)]">
      <div className="px-[calc(48*var(--u))] pb-[calc(40*var(--u))] pt-[calc(56*var(--u))]">
        <p className="text-[length:max(11px,calc(12*var(--u)))] opacity-60">Provisório</p>
        <h1 className="mt-[calc(8*var(--u))] font-display text-[length:calc(56*var(--u))] leading-[1.1]">Rodapé: opções de animação do nome</h1>
        <p className="mt-[calc(12*var(--u))] max-w-[calc(680*var(--u))] text-[length:max(11px,calc(14*var(--u)))] leading-[1.5] opacity-80">
          Faz scroll devagar. Cada opção corre quando a faixa entra no ecrã; &ldquo;Repetir&rdquo; volta a corrê-la. A 6 está ligada ao scroll (sobe e desce com
          ele). A 0 é a atual.
        </p>
      </div>
      {OPCOES_NOME.map((o, k) => (
        <div key={o.n}>
          <div className="flex items-end justify-between gap-[calc(40*var(--u))] border-t border-[rgba(28,43,57,0.2)] px-[calc(48*var(--u))] py-[calc(28*var(--u))]">
            <div>
              <p className="text-[length:max(11px,calc(12*var(--u)))] opacity-60">Opção {o.n}</p>
              <p className="font-display text-[length:calc(32*var(--u))] leading-[1.1]">{o.nome}</p>
              <p className="mt-[calc(6*var(--u))] max-w-[calc(720*var(--u))] text-[length:max(11px,calc(13*var(--u)))] leading-[1.5] opacity-75">{o.texto}</p>
            </div>
            <button
              type="button"
              onClick={() => setChaves((c) => c.map((v, i) => (i === k ? v + 1 : v)))}
              className="btn-luz h-[calc(40*var(--u))] shrink-0 rounded-[calc(6*var(--u))] bg-[var(--azul-escuro)] px-[calc(22*var(--u))] text-[length:max(11px,calc(12*var(--u)))] text-[var(--bege-claro-2)]"
            >
              Repetir
            </button>
          </div>
          <div className="bg-[var(--azul-escuro)] px-0 py-[calc(64*var(--u))] max-lg:px-[calc(20*var(--u))]">
            <NomeRodape key={`${o.n}-${chaves[k]}`} label="Basílica da Estrela, Sagrado Coração de Jesus" opcao={o.n} forcar={chaves[k] > 0} className="relative" />
          </div>
          <div className="h-[calc(320*var(--u))]" />
        </div>
      ))}
    </main>
  )
}
