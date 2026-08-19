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

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

/** Secções desta página, pela ordem do sitemap (nó "Obra Social"). */
const SECTIONS = [
  { id: 'projetos',      label: 'projetosLabel' },
  { id: 'sao-bento',     label: 'saoBentoLabel' },
  { id: 'banco',         label: 'bancoLabel' },
  { id: 'voluntariado',  label: 'voluntariadoLabel' },
  { id: 'recursos',      label: 'recursosLabel' },
]

/** As quatro frentes, na ordem do sitemap. */
const FRENTES = ['saoBento', 'banco', 'voluntariado', 'recursos'] as const

export default function ObraSocialPage() {
  const t = useTranslations('obraSocial')

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  const frentes = FRENTES.map((k, i) => ({
    n: String(i + 1).padStart(2, '0'),
    title: t(`${k}Label` as 'bancoLabel'),
    desc: t(`${k}Desc` as 'bancoDesc'),
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
              src="/images/figma-icon-priest2.jpg"
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

        {/* ── INTRO ── */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            <Reveal className="max-w-3xl mx-auto text-center">
              <SectionLabel className="opacity-75">{t('introLabel')}</SectionLabel>
              <p className="type-editorial">{t.rich('intro', { em })}</p>
            </Reveal>
          </div>
        </section>

        {/* ── PROJETOS EM CURSO ──
            Índice das quatro frentes, no motivo editorial da homepage. */}
        <section id="projetos" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <Reveal className="mb-16 md:mb-20 max-w-2xl">
              <SectionLabel>{t('projetosLabel')}</SectionLabel>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('projetosTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-md mt-6">
                {t('projetosText')}
              </p>
            </Reveal>

            <div className="border-t border-[var(--color-border-light)]">
              {frentes.map((item, i) => (
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

        {/* ── COMUNIDADE SÃO BENTO ── */}
        <section id="sao-bento" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-24 items-center">
              <Reveal>
                <SectionLabel>{t('saoBentoLabel')}</SectionLabel>
                <h2
                  className="font-display font-light mb-6"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('saoBentoTitleRich', { em })}
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-md">
                  {t('saoBentoDesc')}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <Parallax className="media aspect-[4/3]" amount={6}>
                  <Image
                    src="/images/figma-icon-priest1.jpg"
                    alt={t('imgAltComunidade')}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── BANCO DE ALIMENTOS ── */}
        <section id="banco" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-24 items-center">
              <Reveal delay={0.1}>
                <Parallax className="media aspect-[4/3]" amount={6}>
                  <Image
                    src="/images/figma-liturgy.jpg"
                    alt={t('imgAltComunidade')}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
              <Reveal>
                <SectionLabel>{t('bancoLabel')}</SectionLabel>
                <h2
                  className="font-display font-light mb-6"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('bancoTitleRich', { em })}
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-md">
                  {t('bancoDesc')}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── VOLUNTARIADO ──
            Fundo escuro e CTA próprio: é a única frente onde se pede uma ação
            direta ao leitor, e não apenas se informa. */}
        <section id="voluntariado" className="section-pad-lg bg-dark scroll-mt-28">
          <div className="container">
            <Reveal className="max-w-2xl">
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                {t('voluntariadoLabel')}
              </SectionLabel>
              <h2
                className="font-display font-light text-[var(--color-text-inverse)] mb-6"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('voluntariadoTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-on-dark)] max-w-md mb-10">
                {t('voluntariadoDesc')}
              </p>
              <Button
                href="/contactos"
                arrow
                className="!bg-[var(--color-text-inverse)] !text-[var(--color-text-primary)] !border-transparent"
              >
                {t('voluntariadoCta')}
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ── RECURSOS MATERIAIS ── */}
        <section id="recursos" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <Reveal className="max-w-2xl">
              <SectionLabel>{t('recursosLabel')}</SectionLabel>
              <h2
                className="font-display font-light mb-6"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('recursosTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-md">
                {t('recursosDesc')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ──
            Dois caminhos: tempo (contacto) ou dinheiro (donativos). */}
        <section className="section-pad-lg bg-secondary">
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
                <div className="flex flex-wrap gap-4">
                  <Button href="/donativos" arrow>
                    {t('ctaDonativos')}
                  </Button>
                  <Button href="/contactos" variant="secondary">
                    {t('ctaButton')}
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
