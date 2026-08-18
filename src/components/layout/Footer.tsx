import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')
  const th = useTranslations('home')

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
      title: 'Contacto',
      links: [
        { href: '/contactos', label: tn('contactos') },
        { href: '/donativos', label: 'Donativos' },
      ],
    },
    {
      title: 'Paróquia',
      links: [
        { href: '/sobre-nos',      label: tn('sobreNos') },
        { href: '/celebracoes',    label: tn('celebracoes') },
        { href: '/obra-social',    label: 'Obra Social' },
        { href: '/vida-paroquia',  label: tn('vidaParoquia') },
      ],
    },
  ]

  return (
    <footer
      className="text-[var(--color-text-inverse)]"
      style={{ backgroundColor: 'var(--color-bg-darker)' }}
    >
      <div className="container section-pad-lg pb-0">
        {/* Três zonas separadas por réguas verticais (desktop) / horizontais
            (mobile) — marca+morada · navegação · CTA fotográfico. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-x-0 gap-y-14">
          <div className="lg:pr-12 lg:border-r border-b lg:border-b-0 border-[var(--color-text-inverse)]/15 pb-14 lg:pb-0">
            {/* Apenas a marca arquitetónica, sem a wordmark — a "assinatura"
                de texto vive na frase ao lado, não no logótipo (branding p31). */}
            <Logo withWordmark={false} className="h-[4.2rem] w-auto" />
            <p
              className="font-display mt-4 whitespace-pre-line"
              style={{ fontSize: '2rem', lineHeight: 1.1 }}
            >
              {t('tagline')}
            </p>

            <address className="not-italic flex flex-col gap-4 mt-6 text-sm text-[var(--color-text-on-dark)]">
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

          <div className="lg:px-12 lg:border-r border-b lg:border-b-0 border-[var(--color-text-inverse)]/15 pb-14 lg:pb-0 flex flex-wrap gap-x-14 gap-y-10">
            {sections.map((section) => (
              <div key={section.title} className="w-32">
                <p className="text-xs opacity-60 text-[var(--color-text-on-dark)] mb-3">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-text-inverse)] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:pl-12 max-w-[328px]">
            <div className="relative media aspect-[328/287] mb-5">
              <Image
                src="/images/figma-icon-priest1.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
            <Link
              href="/visita"
              className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-text-inverse)] transition-colors duration-200 inline-flex items-center gap-2.5 group/link"
            >
              {th('visitCta')}
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover/link:translate-x-[3px]">
                <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Assinatura tipográfica gigante — o momento de marca do rodapé
            (branding p31): "Basílica da Estrela" numa linha, "Sagrado
            Coração de Jesus" espalhado a toda a largura por baixo. */}
        <div className="mt-24 md:mt-32 flex flex-col gap-2 md:gap-3">
          <p
            className="font-display uppercase whitespace-nowrap overflow-hidden"
            style={{
              fontSize: 'var(--text-wordmark)',
              lineHeight: 1,
              letterSpacing: 'var(--tracking-display)',
            }}
          >
            Basílica da Estrela
          </p>
          <div
            className="font-display uppercase flex flex-wrap justify-between gap-x-6"
            style={{
              fontSize: 'var(--text-wordmark-sm)',
              lineHeight: 1.15,
              letterSpacing: '0.14em',
            }}
          >
            <span>Sagrado</span>
            <span>Coração</span>
            <span>de Jesus</span>
          </div>
        </div>
      </div>

      {/* Régua + barra legal — a toda a largura, fora do container */}
      <div className="border-t border-[var(--color-text-inverse)]/15 mt-16 md:mt-20">
        <div className="container py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-[var(--color-text-on-dark)] opacity-60">{t('direitos')}</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-text-on-dark)]">
            <Link href="/privacidade" className="hover:text-[var(--color-text-inverse)] transition-colors duration-200">
              {t('privacidade')}
            </Link>
            <Link href="/termos" className="hover:text-[var(--color-text-inverse)] transition-colors duration-200">
              {t('termos')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
