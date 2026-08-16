import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/ui/Reveal'

/** Italic emphasis used by the rich-text headings (<em> in the message files) */
const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

export default function HomePage() {
  const t = useTranslations('home')
  const tc = useTranslations('common')
  const year = new Date().getFullYear()

  /** Builds a <media/> renderer: a small rounded photo set inline in a sentence */
  const inlineMedia = (src: string, alt: string) => () => (
    <span className="inline-media">
      <Image src={src} alt={alt} fill sizes="7rem" className="object-cover" />
    </span>
  )

  const media = inlineMedia('/images/interior-nave.jpg', t('manifestoImgAlt'))

  /** Visit section: one editorial line per experience, images alternating sides */
  const experiences = [
    { key: 'visitExp1', src: '/images/cupula-torre.jpg', alt: 'cupulaImgAlt' },
    { key: 'visitExp2', src: '/images/interior-nave.jpg', alt: 'interiorImgAlt' },
    { key: 'visitExp3', src: '/images/destaque-celebracao.jpg', alt: 'destaqueImgAlt' },
  ]

  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col justify-end section-pad-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover ken-burns"
            />
            {/* Scrim kept deliberately light: the interior shot is already dark, so
                this only seats the nav and the headline without muddying the altar. */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(8,8,10,0.50) 0%, rgba(8,8,10,0.12) 26%, rgba(8,8,10,0.18) 52%, rgba(8,8,10,0.52) 78%, rgba(8,8,10,0.72) 100%)',
              }}
            />
          </div>

          <div className="container relative z-10">
            <Reveal>
              <SectionLabel rule className="!text-[var(--color-text-inverse)] opacity-80">
                {t('heroLabel')}
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Staggered serif lines, second set in italic (see tengile / paisana) */}
              <h1
                className="font-display font-light text-[var(--color-text-inverse)] stagger mb-10"
                style={{
                  fontSize: 'var(--text-display)',
                  letterSpacing: 'var(--tracking-display)',
                  lineHeight: 'var(--leading-display)',
                }}
              >
                <span>{t('heroTitleA')}</span>
                <span className="em-italic">{t('heroTitleB')}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-4">
                <Button href="/visita" arrow>{t('visitCta')}</Button>
                <Button
                  href="/sobre-a-basilica"
                  variant="secondary"
                  className="!border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)]"
                >
                  {tc('saberMais')}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MANIFESTO ── */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="max-w-5xl">
              <SectionLabel rule>{t('manifestoLabel')}</SectionLabel>
              <p className="type-editorial">
                {t.rich('manifesto', { em, media })}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── VISITAR A BASÍLICA ──
            Photography set *inside* the headline rather than beside it, with the
            images alternating sides line to line (see paisana.studio). The three
            lines together form the section heading. */}
        <section className="bg-dark section-pad-lg overflow-hidden">
          <div className="container">
            <Reveal>
              <SectionLabel rule className="!text-[var(--color-gold)]">{t('visitLabel')}</SectionLabel>
            </Reveal>

            <h2
              className="font-display font-light text-[var(--color-text-inverse)] text-center text-balance"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 1.18,
                letterSpacing: 'var(--tracking-heading)',
              }}
            >
              {experiences.map((exp, i) => (
                <Reveal as="span" key={exp.key} delay={i * 0.12} className="block py-2">
                  {t.rich(exp.key, { em, media: inlineMedia(exp.src, t(exp.alt)) })}
                </Reveal>
              ))}
            </h2>

            <Reveal delay={0.3} className="flex flex-col items-center text-center mt-20">
              <p className="text-[var(--color-text-secondary)] max-w-sm mb-10">
                {t('visitSubtitle')}
              </p>
              <Button
                href="/visita"
                variant="secondary"
                arrow
                className="border-[var(--color-text-inverse)] text-[var(--color-text-inverse)]"
              >
                {t('visitCta')}
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ── PRÓXIMAS CELEBRAÇÕES ── */}
        <section className="section-pad border-b border-[var(--color-border)]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14 items-start">
              <Reveal>
                <SectionLabel rule>{t('massasLabel')}</SectionLabel>
                <h2
                  className="font-display font-light mb-10"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)' }}
                >
                  {t('massasTitle')}
                </h2>
                <Button href="/horarios" variant="ghost" arrow>{t('massasCta')}</Button>
              </Reveal>

              <Reveal delay={0.1} className="border-t border-[var(--color-border)] pt-8">
                <p className="label mb-4">{t('massasDomingos')}</p>
                <p
                  className="font-display font-light text-[var(--color-terracota)]"
                  style={{ fontSize: 'var(--text-h3)' }}
                >
                  {t('massasDomingosHoras')}
                </p>
              </Reveal>

              <Reveal delay={0.2} className="border-t border-[var(--color-border)] pt-8">
                <p className="label mb-4">{t('massasSemana')}</p>
                <p
                  className="font-display font-light text-[var(--color-terracota)]"
                  style={{ fontSize: 'var(--text-h3)' }}
                >
                  {t('massasSemanaHoras')}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── QUEM SOMOS ── */}
        <section className="bg-secondary section-pad-lg">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <Reveal className="media relative aspect-[4/3] order-2 lg:order-1 group">
                <Image
                  src="/images/interior-nave.jpg"
                  alt={t('interiorImgAlt')}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </Reveal>

              <Reveal delay={0.15} className="order-1 lg:order-2">
                <SectionLabel rule>{t('quemSomosLabel')}</SectionLabel>
                <h2
                  className="font-display font-light mb-8"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('quemSomosTitleRich', { em })}
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-12 max-w-sm">
                  {t('quemSomosSubtitle')}
                </p>
                <Button href="/sobre-nos" variant="secondary" arrow>
                  {t('quemSomosCta')}
                </Button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── OBRA SOCIAL ── */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="max-w-2xl mb-20">
              <SectionLabel rule>{t('obraSocialLabel')}</SectionLabel>
              <h2
                className="font-display font-light mb-8"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('obraSocialTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-sm mb-12">
                {t('obraSocialSubtitle')}
              </p>
              <Button href="/obra-social" variant="secondary" arrow>
                {t('obraSocialCta')}
              </Button>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <IconBasket />, key: 'obraSocialFeat1' as const },
                { icon: <IconHands />, key: 'obraSocialFeat2' as const },
                { icon: <IconHeart />, key: 'obraSocialFeat3' as const },
              ].map((item, i) => (
                <Reveal
                  key={item.key}
                  delay={i * 0.1}
                  className="bg-[var(--color-cream)] p-12 media flex flex-col items-center text-center"
                >
                  <div className="text-[var(--color-terracota)] mb-8">{item.icon}</div>
                  <p className="font-display font-light" style={{ fontSize: 'var(--text-h3)' }}>
                    {t(item.key)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOTÍCIAS / VIDA DA PARÓQUIA ── */}
        <section className="section-pad bg-secondary">
          <div className="container">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-6">
              <div>
                <SectionLabel rule>{t('destaques')}</SectionLabel>
                <h2
                  className="font-display font-light"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)' }}
                >
                  {t.rich('destaquesTitleRich', { em })}
                </h2>
              </div>
              <Button href="/blog" variant="ghost" arrow>{t('destaquesCta')}</Button>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <Reveal as="article" className="group cursor-pointer">
                <div className="relative aspect-[4/3] media mb-5">
                  <Image
                    src="/images/destaque-celebracao.jpg"
                    alt={t('destaqueImgAlt')}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="label mb-3">{t('noticiaLabel')} · {year}</p>
                <h3
                  className="font-display font-light group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                  style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-heading)' }}
                >
                  {t('noticiaPlaceholderTitle')} 1
                </h3>
              </Reveal>

              {[2, 3].map((i) => (
                <Reveal as="article" key={i} delay={(i - 1) * 0.1} className="group cursor-pointer">
                  {/* Placeholder */}
                  <div className="aspect-[4/3] media mb-5 bg-[var(--color-cream)]">
                    <div className="w-full h-full bg-[var(--color-slate)] opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  </div>
                  <p className="label mb-3">{t('noticiaLabel')} · {year}</p>
                  <h3
                    className="font-display font-light group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                    style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-heading)' }}
                  >
                    {t('noticiaPlaceholderTitle')} {i}
                  </h3>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA DOAÇÕES ──
            No photography, no filled block — the page has already spent its
            imagery. A restrained editorial close instead: a hairline rule,
            asymmetric columns, terracotta kept to small accents only. */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="border-t border-[var(--color-border)] pt-16 md:pt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
                <div className="lg:col-span-7">
                  <SectionLabel rule className="!text-[var(--color-terracota)]">
                    {t('doacoesLabel')}
                  </SectionLabel>
                  <h2
                    className="font-display font-light text-balance"
                    style={{
                      fontSize: 'var(--text-h1)',
                      letterSpacing: 'var(--tracking-heading)',
                      lineHeight: 'var(--leading-heading)',
                    }}
                  >
                    {t.rich('doacoesTitleRich', { em })}
                  </h2>
                </div>

                <div className="lg:col-span-5 lg:pb-3">
                  <p className="text-[var(--color-text-secondary)] mb-10 max-w-sm">
                    {t('doacoesSubtitle')}
                  </p>
                  <Button
                    href="/donativos"
                    arrow
                    className="!bg-[var(--color-terracota)] !text-[var(--color-text-inverse)] hover:!opacity-85"
                  >
                    {t('doacoesCta')}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

function IconBasket() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 16h28l-3 17a2 2 0 0 1-2 1.6H11a2 2 0 0 1-2-1.6L6 16Z" />
      <path d="M12 16 16 6M28 16 24 6M16 22v9M20 22v9M24 22v9" strokeLinecap="round" />
    </svg>
  )
}

function IconHands() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 18V9a2.2 2.2 0 0 1 4.4 0v8" strokeLinecap="round" />
      <path d="M12.4 17V7a2.2 2.2 0 0 1 4.4 0v10" strokeLinecap="round" />
      <path d="M16.8 17V9a2.2 2.2 0 0 1 4.4 0v9" strokeLinecap="round" />
      <path d="M21.2 18v-5a2.2 2.2 0 0 1 4.4 0v9c0 6-4.2 11-10.6 11-4 0-6.6-1.8-8.8-5l-4-6a2 2 0 0 1 3.2-2.4l2.6 2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path
        d="M20 33S6 24.5 6 14.9C6 10 9.8 7 13.7 7c2.7 0 5 1.4 6.3 3.8C21.3 8.4 23.6 7 26.3 7c3.9 0 7.7 3 7.7 7.9C34 24.5 20 33 20 33Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}
