'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

/**
 * Formulário de donativos: categoria, valor e notas.
 *
 * ⚠️ INTEGRAÇÃO POR FAZER — o pagamento é do Easypay.
 * Este componente recolhe a *intenção* de donativo e mais nada. Não toca, nem
 * deve vir a tocar, em dados de cartão: esses são introduzidos no checkout do
 * Easypay, do lado deles. Manter assim mantém o site fora do âmbito de PCI-DSS.
 *
 * Para ligar, substituir o corpo de `onSubmit` por uma chamada a uma rota
 * própria (ex.: `POST /api/donativos`) que, no servidor, cria o pagamento na
 * API do Easypay e devolve o URL de checkout para onde redirecionar. As chaves
 * do Easypay vivem em variáveis de ambiente do servidor — nunca aqui, que é
 * código que corre no browser.
 */
export default function DonationForm() {
  const t = useTranslations('donativos')

  const [categoria, setCategoria] = useState('')
  const [valor, setValor] = useState('')
  const [notas, setNotas] = useState('')

  const categorias = [t('formCat1'), t('formCat2'), t('formCat3'), t('formCat4')]

  // Sem categoria ou sem valor positivo não há donativo que faça sentido criar.
  const podeSubmeter = categoria !== '' && Number(valor.replace(',', '.')) > 0

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO(easypay): criar o pagamento no servidor e redirecionar para o checkout.
    console.info('Donativo por submeter ao Easypay:', { categoria, valor, notas })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 max-w-xl">
      <div>
        <label htmlFor="donativo-categoria" className="field-label">
          {t('formCategoriaLabel')}
        </label>
        <select
          id="donativo-categoria"
          className="field"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="" disabled>
            {t('formCategoriaPlaceholder')}
          </option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="donativo-valor" className="field-label">
          {t('formValorLabel')}
        </label>
        <div className="flex items-baseline gap-3">
          <span className="font-display font-light" style={{ fontSize: 'var(--text-h3)' }} aria-hidden="true">
            €
          </span>
          <input
            id="donativo-valor"
            className="field field-amount"
            type="number"
            inputMode="decimal"
            min="1"
            step="0.01"
            placeholder={t('formValorPlaceholder')}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="donativo-notas" className="field-label">
          {t('formNotasLabel')}
        </label>
        <textarea
          id="donativo-notas"
          className="field"
          rows={3}
          placeholder={t('formNotasPlaceholder')}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
        <p className="field-help">{t('formNotasHelp')}</p>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <button
          type="submit"
          disabled={!podeSubmeter}
          className="inline-flex items-center bg-[var(--color-text-primary)] !text-[var(--color-text-inverse)] px-7 py-3.5 text-[0.8rem] font-medium transition-opacity duration-300 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ borderRadius: 'var(--radius)' }}
        >
          {t('formSubmit')}
        </button>
        {/* Quem vai dar dinheiro tem direito a saber para onde vão os dados. */}
        <p className="field-help !mt-0 max-w-sm">{t('formSeguranca')}</p>
      </div>
    </form>
  )
}
