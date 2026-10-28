'use client'

import { useState } from 'react'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

export type TextosContacto = {
  nomeLabel: string
  nomePh: string
  emailLabel: string
  emailPh: string
  assuntoLabel: string
  assuntoPh: string
  assuntos: string[]
  msgLabel: string
  msgPh: string
  enviar: string
  /** endereço que recebe as mensagens */
  destino: string
}

const LABEL = 'text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold'
const LINHA = 'border-b border-solid border-[rgba(28,43,57,0.25)]'
const CAMPO = 'w-full bg-transparent text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] outline-none placeholder:text-[rgba(28,43,57,0.25)]'

/**
 * Formulário de contacto — design novo (Figma, nó 111:3545): nome e email lado
 * a lado, assunto, mensagem e o botão "Enviar mensagem", com campos só de linha.
 *
 * Não há servidor de email: ao enviar, abre o programa de email do visitante
 * com a mensagem preenchida (`mailto:`), dirigida ao secretariado. Para enviar
 * pelo site, trocar `aoSubmeter` por uma chamada a uma rota própria.
 */
export default function ContactosFormulario({ textos }: { textos: TextosContacto }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')

  function aoSubmeter(e: React.FormEvent) {
    e.preventDefault()
    const corpo = `${mensagem}\n\n${nome}\n${email}`
    window.location.href = `mailto:${textos.destino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
  }

  return (
    <form onSubmit={aoSubmeter} className="flex w-full flex-col gap-[calc(40*var(--u))]">
      <div className="flex w-full items-center gap-[calc(20*var(--u))] max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(32*var(--u))]">
        <div className="flex w-[calc(445*var(--u))] max-lg:w-full flex-col gap-[calc(24*var(--u))]">
          <label htmlFor="contacto-nome" className={LABEL}>{textos.nomeLabel}</label>
          <input
            id="contacto-nome"
            type="text"
            autoComplete="name"
            required
            placeholder={textos.nomePh}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={`${CAMPO} h-[calc(27*var(--u))] pb-[calc(7*var(--u))] ${LINHA}`}
          />
        </div>
        <div className="flex w-[calc(446*var(--u))] max-lg:w-full flex-col gap-[calc(24*var(--u))]">
          <label htmlFor="contacto-email" className={LABEL}>{textos.emailLabel}</label>
          <input
            id="contacto-email"
            type="email"
            autoComplete="email"
            required
            placeholder={textos.emailPh}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${CAMPO} h-[calc(27*var(--u))] pb-[calc(7*var(--u))] ${LINHA}`}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
        <label htmlFor="contacto-assunto" className={LABEL}>{textos.assuntoLabel}</label>
        <div className={`relative h-[calc(27*var(--u))] w-full pb-[calc(7*var(--u))] ${LINHA}`}>
          <select
            id="contacto-assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            required
            className="block h-[calc(19*var(--u))] w-full cursor-pointer appearance-none bg-transparent pr-[calc(32*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] outline-none"
            style={{ color: assunto === '' ? 'rgba(28,43,57,0.25)' : 'var(--azul-escuro)' }}
          >
            <option value="" disabled>{textos.assuntoPh}</option>
            {textos.assuntos.map((a) => (
              <option key={a} value={a} style={{ color: 'var(--azul-escuro)' }}>{a}</option>
            ))}
          </select>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/donativos/chevron.svg" alt="" width={13} height={7} aria-hidden="true" className="pointer-events-none absolute right-0 top-[calc(6*var(--u))]" style={{ width: u(13), height: u(7) }} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
        <div className="flex w-full flex-col gap-[calc(24*var(--u))]">
          <label htmlFor="contacto-mensagem" className={LABEL}>{textos.msgLabel}</label>
          <textarea
            id="contacto-mensagem"
            required
            placeholder={textos.msgPh}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={`${CAMPO} h-[calc(219*var(--u))] max-lg:h-[calc(160*var(--u))] resize-none ${LINHA}`}
          />
        </div>
        <button
          type="submit"
          className="group/btn flex h-[calc(46.8*var(--u))] items-center gap-[calc(11.91*var(--u))] self-start rounded-[calc(4*var(--u))] bg-[var(--vermelho)] px-[calc(29.6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-colors duration-[400ms] ease-[var(--ease-out)]"
        >
          {textos.enviar}
          <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
        </button>
      </div>
    </form>
  )
}
