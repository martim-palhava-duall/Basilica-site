import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/ui/Reveal'

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

export default function VidaParoquiaPage() {
  const t = useTranslations('vidaParoquia')
  const year = new Date().getFullYear()

  const groups = [
    { n: '01', title: 'group1Title', desc: 'group1Desc' },
    { n: '02', title: 'group2Title', desc: 'group2Desc' },
    { n: '03', title: 'group3Title', desc: 'group3Desc' },
    { n: '04', title: 'group4Title', desc: 'group4Desc' },
    { n: '05', title: 'group5Title', desc: 'group5Desc' },
    { n: '06', title: 'group6Title', desc: 'group6Desc' },
  ]

  const news = [
    '/images/hero-fachada.jpg',
    '/images/interior-nave.jpg',
    '/images/figma-nave-wide.jpg',
    '/images/cupula-torre.jpg',
    '/images/destaque-celebracao.jpg',
    '/images/figma-statue-mary.jpg',
  ]

  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex flex-col justify-end section-pad-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/fachada-wide.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover ken-burns"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(8,8,10,0.45) 0%, rgba(8,8,10,0.10) 30%, rgba(8,8,10,0.20) 55%, rgba(8,8,10,0.55) 80%, rgba(8,8,10,0.75) 100%)',
              }}
            />
          </div>

          <div className="container relative z-10 max-w-3xl">
            <Reveal>
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-80">
                {t('heroLabel')}
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="font-display text-[var(--color-text-inverse)] mb-6"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('heroTitleRich', { em })}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lead !text-[var(--color-text-inverse)] max-w-lg" style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300 }}>
                {t('heroSubtitle')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── MANIFESTO ── */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            <Reveal className="max-w-4xl">
              <SectionLabel className="opacity-75">{t('manifestoLabel')}</SectionLabel>
              <p className="type-editorial">
                {t.rich('manifesto', { em })}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── GRUPOS E MOVIMENTOS ──
            Grelha com réguas (inspirada na fila de categorias da referência
            "Royal Church" no Pinterest), mas em cartões — para se distinguir
            da lista da Obra Social na homepage, que usa linhas horizontais. */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="max-w-2xl mb-16">
              <SectionLabel className="opacity-75">{t('groupsLabel')}</SectionLabel>
              <h2
                className="font-display"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.2 }}
              >
                {t.rich('groupsTitleRich', { em })}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--color-border-light)]">
              {groups.map((g, i) => (
                <Reveal
                  key={g.n}
                  delay={(i % 3) * 0.08}
                  className="border-r border-b border-[var(--color-border-light)] p-8 md:p-10 flex flex-col gap-6"
                >
                  <span className="label opacity-60">{g.n}</span>
                  <div>
                    <h3
                      className="font-display mb-3"
                      style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-heading)' }}
                    >
                      {t(g.title)}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {t(g.desc)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARA ALÉM DA MISSA ──
            Spread assimétrico (inspirado nos spreads editoriais "Dar Elyah" /
            magazine do moodboard): uma foto grande + bloco de texto e uma foto
            pequena empilhados ao lado. */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              <Reveal className="lg:col-span-7 media relative aspect-[4/5] lg:aspect-auto group">
                <Image
                  src="/images/figma-liturgy.jpg"
                  alt={t('spreadImgAlt1')}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </Reveal>

              <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
                <Reveal delay={0.1} className="flex-1 flex flex-col justify-center">
                  <SectionLabel className="opacity-75">{t('spreadLabel')}</SectionLabel>
                  <h2
                    className="font-display mb-5"
                    style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.15 }}
                  >
                    {t.rich('spreadTitleRich', { em })}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] max-w-sm">
                    {t('spreadText')}
                  </p>
                </Reveal>
                <Reveal delay={0.2} className="media relative aspect-[4/3]">
                  <Image
                    src="/images/interior-nave.jpg"
                    alt={t('spreadImgAlt2')}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── NOTÍCIAS ── */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-16">
              <div>
                <SectionLabel className="mb-4 opacity-75">{t('newsLabel')}</SectionLabel>
                <h2
                  className="font-display"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)' }}
                >
                  {t.rich('newsTitleRich', { em })}
                </h2>
              </div>
              <Button href="/vida-paroquia" variant="ghost" arrow>{t('newsCta')}</Button>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((src, i) => (
                <Reveal as="article" key={src} delay={(i % 3) * 0.1} className="group cursor-pointer">
                  <div className="relative aspect-[3/2] media mb-5">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="label mb-3">{t('newsLabel')} · {year}</p>
                  <h3
                    className="font-display group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                    style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-heading)' }}
                  >
                    {t('newsPlaceholderTitle')} {i + 1}
                  </h3>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA "PARTICIPE" ── */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            <Reveal className="border-t border-[var(--color-border)] pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
              <div>
                <SectionLabel className="opacity-75">{t('ctaLabel')}</SectionLabel>
                <h2
                  className="font-display"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.15 }}
                >
                  {t.rich('ctaTitleRich', { em })}
                </h2>
              </div>
              <div className="flex flex-col gap-8 lg:items-end lg:text-right">
                <p className="text-[var(--color-text-secondary)] max-w-xs">
                  {t('ctaSubtitle')}
                </p>
                <Button href="/contactos" arrow>
                  {t('ctaButton')}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
