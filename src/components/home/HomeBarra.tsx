'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useMenu } from '@/components/home/MenuContext'

/**
 * Barra que aparece ao fazer scroll — design novo (Figma, nó 179:73).
 *
 * 64px, com a cor da secção por baixo (e, se for escura, versão clara) e régua em baixo; o logótipo (HomeLogo) vem ocupar
 * o lado esquerdo e à direita ficam Menu (contorno escuro) e Visitar (azul
 * escuro). Desce do topo quando a página passa dos 40px e sobe ao voltar.
 */
export default function HomeBarra() {
  const t = useTranslations('inicio')
  const { abrir, aberto, recolhido, barra } = useMenu()
  const clara = barra.escuro // fundo escuro → botões e texto claros

  return (
    <div
      inert={!recolhido || barra.oculta}
      className="fixed left-0 top-0 z-40 w-full h-[calc(64*var(--u))] border-b border-solid border-[rgba(27,43,57,0.07)]"
      style={{
        backgroundColor: barra.cor,
        transform: recolhido && !barra.oculta ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 650ms var(--ease-entrada), background-color 500ms var(--ease-suave)',
      }}
    >
      <div
        className="absolute right-[calc(32*var(--u))] flex items-center gap-[calc(12*var(--u))]"
        style={{ top: 'calc(50% + 0.1px)', transform: 'translateY(-50%)' }}
      >
        <span className="flex opacity-85 hover:opacity-100 transition-opacity duration-[400ms]">
          <button
            type="button"
            data-menu-trigger
            aria-haspopup="dialog"
            aria-expanded={aberto}
            aria-controls="home-menu"
            onClick={abrir}
            className={`btn-luz h-[calc(32*var(--u))] px-[calc(20*var(--u))] flex items-center rounded-[calc(6*var(--u))] border border-solid text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)] ${clara ? 'border-[var(--bege-claro-2)] text-[var(--bege-claro-2)]' : 'border-[var(--texto-escuro)] text-[var(--texto-escuro)]'}`}
          >
            {t('heroMenu')}
          </button>
        </span>
        <Link
          href="/basilica-e-convento"
          className={`btn-luz h-[calc(32*var(--u))] px-[calc(20*var(--u))] flex items-center rounded-[calc(4*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)] ${clara ? 'bg-[var(--bege-claro-2)] text-[rgba(18,28,36,0.85)]' : 'bg-[var(--azul-escuro)] text-[rgba(247,242,238,0.85)]'}`}
        >
          {t('heroVisitar')}
        </Link>
      </div>
    </div>
  )
}
