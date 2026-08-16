import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const sections = [
    {
      title: 'Basílica',
      links: [
        { href: '/sobre-a-basilica', label: tn('sobreBasilica') },
        { href: '/visita',           label: tn('visita') },
        { href: '/horarios',         label: tn('horarios') },
      ],
    },
    {
      title: 'Paróquia',
      links: [
        { href: '/sobre-nos',      label: tn('sobreNos') },
        { href: '/celebracoes',    label: tn('celebracoes') },
        { href: '/obra-social',    label: 'Obra Social' },
        { href: '/blog',           label: 'Notícias' },
      ],
    },
    {
      title: 'Contacto',
      links: [
        { href: '/contactos', label: tn('contactos') },
        { href: '/donativos', label: 'Donativos' },
      ],
    },
  ]

  return (
    <footer className="bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]">
      <div className="container section-pad">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Logo className="h-16 w-auto mb-6" />
            <p className="label text-[var(--color-text-muted)] mb-6">Lisboa, desde 1790</p>
            <address className="not-italic text-[var(--color-text-secondary)] text-sm leading-relaxed">
              <p>{t('morada')}</p>
              <p className="mt-2">
                <a href={`tel:${t('telefone')}`} className="hover:text-[var(--color-text-inverse)] transition-colors">
                  {t('telefone')}
                </a>
              </p>
              <p>
                <a href={`mailto:${t('email')}`} className="hover:text-[var(--color-text-inverse)] transition-colors">
                  {t('email')}
                </a>
              </p>
            </address>
          </div>

          {/* Nav sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <p className="label text-[var(--color-text-muted)] mb-4">{section.title}</p>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-inverse)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-xs">{t('direitos')}</p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-inverse)] text-xs transition-colors">
              {t('privacidade')}
            </Link>
            <Link href="/termos" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-inverse)] text-xs transition-colors">
              {t('termos')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
