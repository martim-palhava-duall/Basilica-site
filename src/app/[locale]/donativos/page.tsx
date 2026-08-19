import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/ui/Reveal'
import MaskReveal from '@/components/ui/MaskReveal'
import Parallax from '@/components/ui/Parallax'
import SectionRail from '@/components/ui/SectionRail'
import DonationForm from '@/components/ui/DonationForm'

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

/** Secções desta página, pela ordem do sitemap (nó "Donativos"). */
const SECTIONS = [
  { id: 'modalidades', label: 'modalidadesLabel' },
  { id: 'contribuir',  label: 'formLabel' },
]

/** As cinco modalidades do sitemap. */
const MODALIDADES = ['unica', 'periodico', 'palavra', 'obras', 'gerais'] as const

export default function DonativosPage() {
  const t = useTranslations('donativos')

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  const modalidades = MODALIDADES.map((k, i) => ({
    n: String(i + 1).padStart(2, '0'),
    title: t(`${k}Title` as 'unicaTitle'),
    desc: t(`${k}Desc` as 'unicaDesc'),
  }))

  return (
    <>
      <Nav />
      <SectionRail sections={rail} />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col justify-end pb-14 md:pb-20 overflow-hidden">
          <Parallax inset amount={7}>
            <Image
              src="/images/figma-nave-wide.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(8,8,10,0.52) 0%, rgba(8,8,10,0.12) 26%, rgba(8,8,10,0.24) 52%, rgba(8,8,10,0.64) 78%, rgba(8,8,10,0.86) 100%)',
            }}
          />

          <div className="container relative z-10">
            <MaskReveal delay={0.15}>
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-80 !mb-4">
                {t('heroLabel')}
              </SectionLabel>
            </MaskReveal>

            <MaskReveal as="h1" delay={0.25} className="mb-8">
              <span
                className="font-display block text-[var(--color-text-inverse)] max-w-5xl"
                style={{
                  fontSize: 'var(--text-display)',
                  letterSpacing: 'var(--tracking-display)',
                  lineHeight: 0.98,
                }}
              >
                {t.rich('heroTitleRich', { em })}
              </span>
            </MaskReveal>

            <Reveal delay={0.55}>
              <p
                className="!text-[var(--color-text-inverse)] max-w-md"
                style={{
                  fontFamily: 'var(--font-body-light)',
                  fontWeight: 300,
                  fontSize: 'var(--text-body-lg)',
                  lineHeight: 1.6,
                }}
              >
                {t('heroSubtitle')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── INTRO ──
            Momento de pausa centrado, como o manifesto da homepage. */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            <Reveal className="max-w-3xl mx-auto text-center">
              <SectionLabel className="opacity-75">{t('introLabel')}</SectionLabel>
              <p className="type-editorial">{t.rich('intro', { em })}</p>
            </Reveal>
          </div>
        </section>

        {/* ── AS CINCO MODALIDADES ──
            Índice editorial numerado, o mesmo motivo da Obra Social na homepage. */}
        <section id="modalidades" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <Reveal className="mb-16 md:mb-20">
              <SectionLabel>{t('modalidadesLabel')}</SectionLabel>
              <h2
                className="font-display font-light max-w-2xl"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('modalidadesTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-md mt-6">
                {t('modalidadesText')}
              </p>
            </Reveal>

            <div className="border-t border-[var(--color-border-light)]">
              {modalidades.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 0.06}
                  y={20}
                  className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[5rem_minmax(0,22rem)_1fr] items-baseline gap-x-6 border-b border-[var(--color-border-light)] py-8 md:py-11"
                >
                  <span className="label tabular-nums">{item.n}</span>
                  <h3
                    className="font-display font-light"
                    style={{
                      fontSize: 'var(--text-h3)',
                      letterSpacing: 'var(--tracking-heading)',
                      lineHeight: 'var(--leading-heading)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="col-start-2 mt-3 max-w-md text-[var(--color-text-secondary)] md:col-start-3 md:mt-0">
                    {item.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULÁRIO ──
            Fundo areia para o destacar do resto: é o único ponto da página onde
            se age, e não apenas se lê. */}
        <section id="contribuir" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-24 items-start">
              <div>
                <Reveal>
                  <SectionLabel>{t('formLabel')}</SectionLabel>
                  <h2
                    className="font-display font-light mb-10"
                    style={{
                      fontSize: 'var(--text-h1)',
                      letterSpacing: 'var(--tracking-heading)',
                      lineHeight: 'var(--leading-heading)',
                    }}
                  >
                    {t.rich('formTitleRich', { em })}
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <Parallax className="media aspect-[4/3] hidden lg:block" amount={6}>
                    <Image
                      src="/images/figma-nave-aerial.jpg"
                      alt={t('imgAltInterior')}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </Parallax>
                </Reveal>
              </div>

              <Reveal delay={0.15} className="lg:pt-4">
                <DonationForm />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <SectionLabel>{t('ctaLabel')}</SectionLabel>
                <h2
                  className="font-display font-light"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('ctaTitleRich', { em })}
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6 items-start">
                <p className="text-[var(--color-text-secondary)]">{t('ctaSubtitle')}</p>
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
