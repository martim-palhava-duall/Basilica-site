import Image from 'next/image'
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
  const th = useTranslations('home')
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
        { href: '/blog',           label: 'Notícias' },
      ],
    },
  ]

  return (
    <footer
      className="relative overflow-hidden text-[var(--color-text-inverse)]"
      style={{ backgroundColor: 'var(--color-bg-darker)' }}
    >
      {/* Marca d'água decorativa — o mesmo logo do Sagrado Coração usado nas
          peças de branding, a baixa opacidade, recortado no rodapé. Reaproveita
          o SVG do cliente via filtro (fica branco), em vez de traçar um novo. */}
      <Image
        src="/logos/logo-sagrado-coracao.svg"
        alt=""
        aria-hidden="true"
        width={900}
        height={900}
        className="pointer-events-none absolute -right-[10%] -bottom-[22%] w-[38rem] max-w-none opacity-[0.05]"
        style={{ filter: 'brightness(0) invert(1)' }}
      />

      <div className="container relative section-pad-lg">
        {/* Três zonas separadas por réguas verticais (desktop) / horizontais
            (mobile) — marca+morada · navegação · CTA fotográfico. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_0.9fr] gap-x-0 gap-y-14">
          <div className="lg:pr-14 lg:border-r border-b lg:border-b-0 border-[var(--color-text-inverse)]/12 pb-14 lg:pb-0">
            <Logo className="h-16 w-auto" />
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

          <div className="lg:px-14 lg:border-r border-b lg:border-b-0 border-[var(--color-text-inverse)]/12 pb-14 lg:pb-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-8 gap-y-10">
            {sections.map((section) => (
              <div key={section.title}>
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

          <div className="lg:pl-14">
            <div className="relative media aspect-[4/3] mb-6">
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
              className="label !text-[var(--color-text-inverse)] inline-flex items-center gap-2.5 group/link"
            >
              {th('visitCta')}
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover/link:translate-x-[3px]">
                <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Régua + barra legal */}
        <div className="mt-20 pt-8 border-t border-[var(--color-text-inverse)]/12 flex flex-col md:flex-row md:items-center justify-between gap-6">
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
