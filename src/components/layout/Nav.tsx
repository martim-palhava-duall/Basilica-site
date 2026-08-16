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
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo + frase-assinatura da marca (ver folheto tríptico, p30 do branding).
            Composta em Forevs romano, não itálico. */}
        <div className="flex items-center gap-4">
          <Link href="/" className="transition-colors duration-500" aria-label="Basílica da Estrela">
            <Logo className="h-9 md:h-11 w-auto" />
          </Link>
          <span
            aria-hidden="true"
            className="hidden lg:block h-8 w-px bg-current opacity-25"
          />
          <p className="hidden lg:block font-display text-[0.8rem] leading-[1.25] opacity-75 whitespace-pre-line">
            {tc('tagline')}
          </p>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
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

        {/* Lang + mobile toggle */}
        <div className="flex items-center gap-4">
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
        </div>
      )}
    </header>
  )
}
