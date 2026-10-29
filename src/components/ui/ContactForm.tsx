'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

/**
 * Formulário de contacto.
 *
 * Submete por `mailto:` — abre o programa de email do visitante com o assunto
 * e o corpo já preenchidos. É deliberado: a paróquia não tem backend, e um
 * formulário que finge enviar e não envia perde mensagens sem ninguém dar por
 * isso. Assim funciona desde o primeiro dia, e nenhum dado pessoal passa por
 * um servidor nosso.
 *
 * TODO(backend): havendo servidor, trocar por `POST /api/contacto` com
 * proteção anti-spam. O `mailto:` obriga o visitante a ter cliente de email
 * configurado e não deixa registo do lado da paróquia — serve para arrancar,
 * não para sempre.
 */
export default function ContactForm({ destino }: { destino: string }) {
  const t = useTranslations('contactos')

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')

  const assuntos = [
    t('assunto1'), t('assunto2'), t('assunto3'), t('assunto4'),
    t('assunto5'), t('assunto6'), t('assunto7'), t('assunto8'),
  ]

  const podeSubmeter = nome.trim() !== '' && email.trim() !== '' && assunto !== '' && mensagem.trim() !== ''

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!podeSubmeter) return

    // O nome e o email vão no corpo porque o `mailto:` parte do endereço de
    // quem envia — sem isto, a paróquia recebia a mensagem sem saber de quem é
    // nem para onde responder.
    const corpo = `${nome}\n${email}\n\n${mensagem}`
    window.location.href =
      `mailto:${destino}` +
      `?subject=${encodeURIComponent(assunto)}` +
      `&body=${encodeURIComponent(corpo)}`
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 max-w-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="contacto-nome" className="field-label">{t('formNomeLabel')}</label>
          <input
            id="contacto-nome"
            type="text"
            autoComplete="name"
            className="field"
            placeholder={t('formNomePlaceholder')}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="contacto-email" className="field-label">{t('formEmailLabel')}</label>
          <input
            id="contacto-email"
            type="email"
            autoComplete="email"
            className="field"
            placeholder={t('formEmailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="contacto-assunto" className="field-label">{t('formAssuntoLabel')}</label>
        <select
          id="contacto-assunto"
          className="field"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          required
        >
          <option value="" disabled>{t('formAssuntoPlaceholder')}</option>
          {assuntos.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contacto-mensagem" className="field-label">{t('formMensagemLabel')}</label>
        <textarea
          id="contacto-mensagem"
          className="field"
          rows={5}
          placeholder={t('formMensagemPlaceholder')}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <button
          type="submit"
          disabled={!podeSubmeter}
          className="group/btn inline-flex items-stretch overflow-hidden text-[0.85rem] bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] transition-[background-color,opacity] duration-[350ms] ease-[var(--ease-out)] hover:bg-[var(--brand-blue)] disabled:opacity-40 disabled:pointer-events-none self-start"
          style={{ borderRadius: 'calc(4 * var(--u))' }}
        >
          <span className="flex items-center px-7 py-3.5 leading-none">{t('formEnviar')}</span>
          <span className="flex items-center px-4 border-l border-current/25">
            <svg
              width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor"
              strokeWidth="1" aria-hidden="true"
              className="shrink-0 transition-transform duration-[350ms] ease-[var(--ease-out)] group-hover/btn:translate-x-[3px]"
            >
              <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <p className="field-help !mt-0 max-w-xs">{t('formNota')}</p>
      </div>
    </form>
  )
}
