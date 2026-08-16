import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Logo from '@/components/ui/Logo'

/** Aparece no rodapé de todas as peças do branding, junto ao site */
const INSTAGRAM = '@basilicadaestrela'
const INSTAGRAM_URL = 'https://instagram.com/basilicadaestrela'
const SITE = 'basilicadaestrela.com'

export default function Footer() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')
  const tc = useTranslations('common')

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
      <div className="container section-pad-lg">
        {/* Marca e morada à esquerda; a navegação agrupada junto à margem direita,
            terminando à mesma altura que a régua em baixo. */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16">
          <div className="lg:max-w-sm">
            <Logo className="h-20 w-auto" />
            <p
              className="font-display mt-8 whitespace-pre-line opacity-80"
              style={{ fontSize: 'var(--text-tagline)', lineHeight: 1.15 }}
            >
              {tc('tagline')}
            </p>

            <address className="not-italic flex flex-col gap-2.5 mt-10 text-[0.95rem] text-[var(--color-text-on-dark)]">
              <span className="whitespace-pre-line leading-relaxed">{t('morada')}</span>
              <a
                href={`tel:${t('telefone').replace(/\s/g, '')}`}
                className="hover:text-[var(--color-text-inverse)] transition-colors duration-200"
              >
                {t('telefone')}
              </a>
              <a
                href={`mailto:${t('email')}`}
                className="hover:text-[var(--color-text-inverse)] transition-colors duration-200"
              >
                {t('email')}
              </a>
            </address>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-12 lg:flex-nowrap">
            {sections.map((section) => (
              <div key={section.title} className="min-w-[8rem]">
                <p className="label !text-[var(--color-text-on-dark)] opacity-60 mb-5">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-3.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.95rem] text-[var(--color-text-on-dark)] hover:text-[var(--color-text-inverse)] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Régua + barra legal */}
        <div className="mt-24 pt-8 border-t border-[var(--color-text-inverse)]/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.8rem] text-[var(--color-text-on-dark)]">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-inverse)] transition-colors duration-200"
            >
              {INSTAGRAM}
            </a>
            <span className="opacity-70">{SITE}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.8rem] text-[var(--color-text-on-dark)]">
            <Link href="/privacidade" className="hover:text-[var(--color-text-inverse)] transition-colors duration-200">
              {t('privacidade')}
            </Link>
            <Link href="/termos" className="hover:text-[var(--color-text-inverse)] transition-colors duration-200">
              {t('termos')}
            </Link>
            <span className="opacity-60">{t('direitos')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
