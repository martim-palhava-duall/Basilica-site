'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useMenu } from '@/components/home/MenuContext'
import { u } from '@/lib/escala'

/**
 * Menu + Visitar, canto superior direito do hero (Figma 173:3932). No mobile fica só
 * o Menu (pedido do cliente): o Visitar já está na lista do menu.
 *
 * Hovers (o desenho não os define, são escolha de implementação, coerentes
 * com o resto): o contorno enche-se de bege; o botão cheio passa a vermelho.
 */
export default function HomeTopButtons() {
  const t = useTranslations('inicio')
  const { abrir, aberto, recolhido } = useMenu()

  return (
    <div
      className="hero-botoes absolute right-[calc(32*var(--u))] max-lg:right-[calc(20*var(--u))] max-lg:top-[calc(32*var(--u))]! flex items-center gap-[calc(12*var(--u))] max-lg:gap-[calc(8*var(--u))]"
      style={{
        top: u(43.6),
        transform: 'translateY(-50%)',
        opacity: recolhido ? 0 : 1,
        visibility: recolhido ? 'hidden' : 'visible',
        transition: 'opacity 300ms var(--ease-out), visibility 0s linear ' + (recolhido ? '0.3s' : '0s'),
      }}
    >
      <span className="flex opacity-85 hover:opacity-100 transition-opacity duration-[400ms]">
        <button
          type="button"
          data-menu-trigger
          aria-haspopup="dialog"
          aria-expanded={aberto}
          aria-controls="home-menu"
          onClick={abrir}
          className="btn-luz max-lg:min-w-[calc(84*var(--u))] max-lg:justify-center h-[calc(32*var(--u))] px-[calc(20*var(--u))] flex items-center rounded-[calc(6*var(--u))] border border-solid border-[var(--bege-claro-2)] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] text-[var(--bege-claro-2)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
        >
          {t('heroMenu')}
        </button>
      </span>
      <Link
        href="/basilica-e-convento"
        className="btn-luz max-lg:hidden h-[calc(32*var(--u))] px-[calc(20*var(--u))] flex items-center rounded-[calc(4*var(--u))] bg-[var(--bege-claro-2)] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] text-[rgba(18,28,36,0.85)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
      >
        {t('heroVisitar')}
      </Link>
    </div>
  )
}
