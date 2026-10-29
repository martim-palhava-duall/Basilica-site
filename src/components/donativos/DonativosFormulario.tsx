'use client'

import Image from 'next/image'
import { useState } from 'react'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

export type TextosFormulario = {
  categoriaLabel: string
  categoriaPlaceholder: string
  categorias: string[]
  valorLabel: string
  valorPlaceholder: string
  notasLabel: string
  notasPlaceholder: string
  notasAjuda: string
  enviar: string
  seguranca: string
  pendente: string
}

const LABEL = 'text-[length:var(--t-etiqueta)] leading-[1.17] font-bold'
const LINHA = 'border-b border-solid border-[rgba(28,43,57,0.25)]'

/**
 * Formulário de donativos — design novo (Figma, nó 111:2391): categoria, valor
 * e notas, com campos de linha e o botão "Continuar para pagamento".
 *
 * ⚠️ INTEGRAÇÃO POR FAZER — o pagamento é do Easypay. Este componente recolhe a
 * *intenção* de donativo e mais nada: não toca, nem deve vir a tocar, em dados
 * de cartão, que são introduzidos no checkout do Easypay, do lado deles (mantém
 * o site fora do âmbito de PCI-DSS). Para ligar, substituir o corpo de
 * `aoSubmeter` por uma chamada a uma rota própria (ex.: `POST /api/donativos`)
 * que, no servidor, cria o pagamento na API do Easypay e devolve o URL de
 * checkout para onde redirecionar. As chaves vivem em variáveis de ambiente do
 * servidor, nunca aqui.
 */
export default function DonativosFormulario({ textos, foto, fotoAlt }: { textos: TextosFormulario; foto: string; fotoAlt: string }) {
  const [categoria, setCategoria] = useState('')
  const [valor, setValor] = useState('')
  const [notas, setNotas] = useState('')
  const [submetido, setSubmetido] = useState(false)

  // Sem categoria ou sem valor positivo não há donativo que faça sentido criar
  const valido = categoria !== '' && Number(valor.replace(',', '.')) > 0

  function aoSubmeter(e: React.FormEvent) {
    e.preventDefault()
    if (!valido) return
    // TODO(easypay): criar o pagamento no servidor e redirecionar para o checkout.
    console.info('Donativo por submeter ao Easypay:', { categoria, valor, notas })
    setSubmetido(true)
  }

  return (
    <div className="flex w-full items-center gap-[calc(58*var(--u))] max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(40*var(--u))]">
      <div className="relative h-[calc(598*var(--u))] w-[calc(603*var(--u))] max-lg:h-[calc(280*var(--u))] max-lg:w-full shrink-0 overflow-hidden rounded-[calc(4*var(--u))]">
        <Image src={foto} alt={fotoAlt} fill sizes="603px" className="object-cover object-[40%_50%]" />
      </div>

      <form onSubmit={aoSubmeter} className="flex w-[calc(678*var(--u))] max-lg:w-full flex-col gap-[calc(48*var(--u))] max-lg:gap-[calc(36*var(--u))]">
        {/* Categoria */}
        <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
          <label htmlFor="donativo-categoria" className={LABEL}>{textos.categoriaLabel}</label>
          <div className={`relative w-full pb-[calc(8*var(--u))] ${LINHA}`}>
            <select
              id="donativo-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              className="w-full appearance-none bg-transparent pr-[calc(32*var(--u))] text-[length:var(--t-corpo)] leading-[1.19] outline-none cursor-pointer"
              style={{ color: categoria === '' ? 'rgba(28,43,57,0.45)' : 'var(--azul-escuro)' }}
            >
              <option value="" disabled>{textos.categoriaPlaceholder}</option>
              {textos.categorias.map((c) => (
                <option key={c} value={c} style={{ color: 'var(--azul-escuro)' }}>{c}</option>
              ))}
            </select>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/donativos/chevron.svg" alt="" width={13} height={7} aria-hidden="true" className="pointer-events-none absolute right-0 top-[calc(6*var(--u))]" style={{ width: u(13), height: u(7) }} />
          </div>
        </div>

        {/* Valor */}
        <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
          <label htmlFor="donativo-valor" className={LABEL}>{textos.valorLabel}</label>
          <div className={`flex w-full items-center gap-[calc(8*var(--u))] pb-[calc(8*var(--u))] ${LINHA}`}>
            <span className="font-display text-[length:calc(32*var(--u))] leading-[calc(35.2*var(--u))]" aria-hidden="true">€</span>
            <input
              id="donativo-valor"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder={textos.valorPlaceholder}
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^0-9.,]/g, ''))}
              required
              className="min-w-0 flex-1 bg-transparent font-display text-[length:calc(32*var(--u))] leading-[calc(35.2*var(--u))] outline-none placeholder:text-[rgba(28,43,57,0.3)]"
            />
          </div>
        </div>

        {/* Notas, botão e nota de segurança */}
        <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
            <label htmlFor="donativo-notas" className={LABEL}>{textos.notasLabel}</label>
            <textarea
              id="donativo-notas"
              rows={3}
              placeholder={textos.notasPlaceholder}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className={`min-h-[calc(99*var(--u))] w-full resize-none bg-transparent text-[length:var(--t-corpo)] leading-[1.19] outline-none placeholder:text-[rgba(28,43,57,0.45)] ${LINHA}`}
            />
          </div>

          <div className="flex w-full flex-col gap-[calc(32*var(--u))]">
            <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
              <p className="text-[length:var(--t-corpo)] leading-[1.19] text-[rgba(28,43,57,0.45)]">{textos.notasAjuda}</p>
              <button
                type="submit"
                disabled={!valido}
                className="group/btn flex h-[calc(47.3*var(--u))] items-center gap-[calc(11.91*var(--u))] self-start rounded-[calc(4*var(--u))] bg-[var(--vermelho)] px-[calc(29.6*var(--u))] text-[length:var(--t-etiqueta)] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color,opacity] duration-[400ms] ease-[var(--ease-out)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {textos.enviar}
                <Seta className="group-enabled/btn:group-hover/btn:translate-x-[calc(4*var(--u))]" />
              </button>
            </div>
            <p className="text-[length:var(--t-corpo)] leading-[1.19] text-[rgba(28,43,57,0.45)]">{textos.seguranca}</p>
            <p role="status" aria-live="polite" className="text-[length:var(--t-etiqueta)] leading-[1.17]">{submetido ? textos.pendente : ''}</p>
          </div>
        </div>
      </form>
    </div>
  )
}
