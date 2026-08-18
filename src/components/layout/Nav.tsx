'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import Logo from '@/components/ui/Logo'

export default function Nav() {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/sobre-a-basilica', label: t('sobreBasilica') },
    { href: '/visita',           label: t('visita') },
    { href: '/celebracoes',      label: t('celebracoes') },
    { href: '/horarios',         label: t('horarios') },
    { href: '/obra-social',      label: 'Obra Social' },
    { href: '/contactos',        label: t('contactos') },
  ]

  // Over the photographic hero the nav floats transparent with light text;
  // once scrolled past it, it gains a blurred cream backing with dark text.
  const linkColor = scrolled
    ? '!text-[var(--color-text-secondary)] hover:!text-[var(--color-text-primary)]'
    : '!text-[var(--color-text-inverse)] opacity-85 hover:opacity-100'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-transparent'
      } ${scrolled ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-inverse)]'}`}
    >
      {/* items-start: o logótipo (grande, à la Figma) fica mais alto do que a
          linha de links/idioma/bilheteira, que se mantêm pequenos e alinhados
          ao topo — ele é que dita a altura do header, não o contrário. Ao
          fazer scroll, encolhe para um logótipo de nav normal. */}
      <nav className="container relative flex items-start justify-between pt-5 md:pt-7 pb-5">
        {/* Logo */}
        <Link href="/" className="transition-all duration-500" aria-label="Basílica da Estrela">
          <Logo className={`w-auto transition-all duration-500 ${scrolled ? 'h-9 md:h-11' : 'h-16 md:h-24 lg:h-28'}`} />
        </Link>

        {/* Desktop links — centrados, sobre o hero */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 top-7 md:top-9">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`label transition-colors duration-200 ${linkColor}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bilheteira + lang + mobile toggle */}
        <div className="flex items-center gap-5 pt-2 md:pt-4">
          {/* CTA de bilheteira — o sitemap prevê-a como destino principal da Visita,
              e a compra é feita em plataforma externa. */}
          <Link
            href="/visita"
            className={`hidden sm:inline-flex items-center border px-5 py-2.5 text-[0.8rem] font-medium transition-colors duration-300 ${
              scrolled
                ? 'border-[var(--color-text-primary)] !text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:!text-[var(--color-text-inverse)]'
                : 'border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)] hover:bg-[var(--color-text-inverse)] hover:!text-[var(--color-text-primary)]'
            }`}
            style={{ borderRadius: 'var(--radius)' }}
          >
            {t('bilheteira')}
          </Link>

          <Link
            href={locale === 'pt' ? '/en' : '/'}
            className={`label transition-colors duration-200 ${linkColor}`}
          >
            {locale === 'pt' ? tc('en') : tc('pt')}
          </Link>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1 transition-colors duration-500"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] px-6 py-8">
          <ul className="flex flex-col gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-2xl !text-[var(--color-text-primary)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bilheteira: no topo o botão está escondido abaixo de sm, por isso repete-se aqui */}
          <Link
            href="/visita"
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex items-center bg-[var(--color-text-primary)] !text-[var(--color-text-inverse)] px-6 py-3 text-[0.8rem] font-medium"
            style={{ borderRadius: 'var(--radius)' }}
          >
            {t('bilheteira')}
          </Link>
        </div>
      )}
    </header>
  )
}
