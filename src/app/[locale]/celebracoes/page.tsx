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
import Accordion from '@/components/ui/Accordion'

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

/** Secções desta página, pela ordem do sitemap (Figma, nó "Celebrações da Fé"). */
const SECTIONS = [
  { id: 'sacramentos', label: 'sacramentosLabel' },
  { id: 'liturgia',    label: 'liturgiaLabel' },
  { id: 'missas',      label: 'missasLabel' },
  { id: 'intencoes',   label: 'intencoesLabel' },
  { id: 'confissoes',  label: 'confissoesLabel' },
  { id: 'adoracao',    label: 'adoracaoTitle' },
  { id: 'sextas',      label: 'sextasTitle' },
  { id: 'sabados',     label: 'sabadosTitle' },
  { id: 'terco',       label: 'tercoTitle' },
]

export default function CelebracoesPage() {
  const t = useTranslations('celebracoes')
  // Os horários das missas vivem no namespace da homepage — lidos daqui em vez
  // de duplicados, para não haver duas versões da mesma informação a divergir.
  const th = useTranslations('home')

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  const sacramentos = Array.from({ length: 7 }, (_, i) => ({
    n: String(i + 1).padStart(2, '0'),
    title: t(`sac${i + 1}Title`),
    desc: t(`sac${i + 1}Desc`),
  }))

  const horarios = [
    { head: 'massasCol1Head', slots: [['massasCol1aHora', 'massasCol1aDesc'], ['massasCol1bHora', 'massasCol1bDesc'], ['massasCol1cHora', 'massasCol1cDesc']] },
    { head: 'massasCol2Head', slots: [['massasCol2aHora', 'massasCol2aDesc'], ['massasCol2bHora', 'massasCol2bDesc']] },
  ]

  return (
    <>
      <Nav />
      <SectionRail sections={rail} />

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col justify-end pb-14 md:pb-20 overflow-hidden">
          <Parallax inset amount={7}>
            <Image
              src="/images/destaque-celebracao.jpg"
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

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <Reveal delay={0.55}>
                <p
                  className="!text-[var(--color-text-inverse)] max-w-md"
                  style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}
                >
                  {t('heroSubtitle')}
                </p>
              </Reveal>

              <Reveal delay={0.7} className="xl:hidden">
                <p className="label !text-[var(--color-text-inverse)] opacity-55 mb-3">{t('indice')}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 max-w-xl">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-sm !text-[var(--color-text-inverse)] opacity-75 hover:opacity-100 transition-opacity duration-200"
                      >
                        <span className="opacity-50 mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                        {t(s.label)}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── INTRODUÇÃO ── */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            <Reveal className="max-w-4xl">
              <SectionLabel className="opacity-75">{t('introLabel')}</SectionLabel>
            </Reveal>
            <MaskReveal as="p" className="type-editorial max-w-4xl">
              {t.rich('intro', { em })}
            </MaskReveal>
          </div>
        </section>

        {/* ── 1. SACRAMENTOS ──
            Acordeão: os sete títulos são o que se procura, a prosa é
            secundária — fechado, lê-se como índice. */}
        <section id="sacramentos" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-24 items-start">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('sacramentosLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-6"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('sacramentosTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)] max-w-sm mb-8">
                    {t('sacramentosText')}
                  </p>
                  <p className="label opacity-70 max-w-xs leading-relaxed">
                    {t('sacramentosNota')}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <Accordion items={sacramentos} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. LITURGIA ──
            Fotografia a sangrar à esquerda, texto em duas colunas à direita. */}
        <section id="liturgia" className="scroll-mt-28 bg-secondary overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <Parallax className="w-full min-h-[52vh] lg:min-h-[78vh]" amount={8}>
              <Image
                src="/images/figma-fresco.jpg"
                alt={t('imgAltInterior')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Parallax>

            <Reveal className="flex flex-col justify-center section-pad px-[var(--container-pad)] lg:pr-[max(var(--container-pad),calc((100vw-var(--container-max))/2+var(--container-pad)))]">
              <SectionLabel className="opacity-75">{t('liturgiaLabel')}</SectionLabel>
              <h2
                className="font-display mb-7 max-w-lg"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
              >
                {t.rich('liturgiaTitleRich', { em })}
              </h2>
              <div className="flex flex-col gap-5 max-w-md text-[var(--color-text-secondary)] leading-relaxed">
                <p>{t('liturgiaText')}</p>
                <p>{t('liturgiaText2')}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 3. MISSAS ──
            Composição dos cartazes do branding (p28). Os horários vêm do
            namespace da homepage, não duplicados aqui. */}
        <section id="missas" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('missasLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('missasTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)]">{t('missasText')}</p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <Button href="/horarios" variant="secondary" arrow>{t('missasCta')}</Button>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <hr className="border-0 border-t border-[var(--color-text-primary)] opacity-25 mt-14 mb-12" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
              {horarios.map((col, i) => (
                <Reveal key={col.head} delay={0.15 + i * 0.1}>
                  <p className="schedule-head mb-6">{th(col.head)}</p>
                  <dl className="flex flex-col gap-5">
                    {col.slots.map(([hora, desc]) => (
                      <div key={hora}>
                        <dt className="schedule-time">{th(hora)}</dt>
                        <dd className="schedule-desc">{th(desc)}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ))}

              {/* 4. INTENÇÕES — terceira coluna do mesmo cartaz, para não abrir
                   uma secção inteira a um bloco de três linhas */}
              {/* a âncora vive num wrapper simples — o <Reveal> é animado por
                  GSAP e não expõe `id` */}
              <div id="intencoes" className="scroll-mt-28">
                <Reveal delay={0.35}>
                  <p className="schedule-head mb-6">{t('intencoesLabel')}</p>
                  <h3
                    className="font-display mb-3"
                    style={{ fontSize: 'var(--text-h3)', lineHeight: 1.15 }}
                  >
                    {t.rich('intencoesTitleRich', { em })}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6">
                    {t('intencoesText')}
                  </p>
                  <Button href="/contactos" variant="ghost" arrow>{t('intencoesCta')}</Button>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. CONFISSÕES ── */}
        <section id="confissoes" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-start">
              <div>
                <Reveal>
                  <SectionLabel className="opacity-75">{t('confissoesLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
                >
                  {t.rich('confissoesTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)] max-w-md">{t('confissoesText')}</p>
                </Reveal>
              </div>

              <Reveal delay={0.2} className="border-t border-[var(--color-border)] pt-7">
                <p className="schedule-head mb-5">{t('confissoesHorarioHead')}</p>
                <p className="schedule-time mb-2">{t('confissoesHorario')}</p>
                <p className="schedule-time">{t('confissoesHorario2')}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── DEVOÇÕES ── */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="max-w-3xl">
              <SectionLabel className="opacity-75">{t('devocoesLabel')}</SectionLabel>
            </Reveal>
            <MaskReveal
              as="h2"
              className="font-display mb-5 max-w-3xl"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
            >
              {t.rich('devocoesTitleRich', { em })}
            </MaskReveal>
            <Reveal delay={0.15}>
              <p className="text-[var(--color-text-secondary)] max-w-lg">{t('devocoesText')}</p>
            </Reveal>
          </div>
        </section>

        {/* ── 6. ADORAÇÃO EUCARÍSTICA ──
            Faixa escura: a citação é o bloco, não uma legenda. */}
        <section id="adoracao" className="scroll-mt-28 bg-dark section-pad-lg">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-24 items-start">
              <div>
                <Reveal>
                  <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                    {t('adoracaoTitle')}
                  </SectionLabel>
                </Reveal>
                <MaskReveal as="blockquote" className="pull-quote text-[var(--color-text-inverse)] mb-4">
                  “{t('adoracaoQuote')}”
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="quote-ref !text-[var(--color-text-inverse)] mb-10">{t('adoracaoQuoteRef')}</p>
                  <p className="text-[var(--color-text-on-dark)] max-w-xl leading-relaxed">
                    {t('adoracaoText')}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.25} className="lg:pt-16">
                <Parallax className="media aspect-[3/4] mb-8" amount={7}>
                  <Image
                    src="/images/figma-icon-chalice.jpg"
                    alt={t('imgAltEucaristia')}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
                <blockquote className="pull-quote-sm text-[var(--color-text-inverse)] mb-2">
                  “{t('adoracaoClose')}”
                </blockquote>
                <p className="quote-ref !text-[var(--color-text-inverse)]">{t('adoracaoCloseRef')}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 7. PRIMEIRAS SEXTAS-FEIRAS ── */}
        <section id="sextas" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <Reveal>
              <SectionLabel className="opacity-75">{t('sextasTitle')}</SectionLabel>
            </Reveal>
            <MaskReveal as="blockquote" className="pull-quote max-w-4xl mb-14">
              “{t('sextasQuote')}”
            </MaskReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
              <Reveal delay={0.15}>
                <p className="schedule-head mb-4">{t('origemHead')}</p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{t('sextasOrigem')}</p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="schedule-head mb-4">{t('basilicaHead')}</p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{t('sextasBasilica')}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 8. PRIMEIROS SÁBADOS ──
            Terracota, a espelhar a estrutura das Sextas com o texto à direita
            e a citação de fecho a rematar. */}
        <section
          id="sabados"
          className="section-pad-lg scroll-mt-28"
          style={{ backgroundColor: 'var(--brand-terracota-deep)' }}
        >
          <div className="container">
            <Reveal>
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-90">
                {t('sabadosTitle')}
              </SectionLabel>
            </Reveal>
            <MaskReveal as="blockquote" className="pull-quote text-[var(--color-text-inverse)] max-w-4xl mb-14">
              “{t('sabadosQuote')}”
            </MaskReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mb-14">
              <Reveal delay={0.15}>
                <p className="schedule-head !text-[var(--color-text-inverse)] mb-4">{t('origemHead')}</p>
                <p className="!text-[var(--color-text-inverse)] opacity-90 leading-relaxed">{t('sabadosOrigem')}</p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="schedule-head !text-[var(--color-text-inverse)] mb-4">{t('basilicaHead')}</p>
                <p className="!text-[var(--color-text-inverse)] opacity-90 leading-relaxed">{t('sabadosBasilica')}</p>
              </Reveal>
            </div>

            <Reveal delay={0.35} className="border-t border-[var(--color-text-inverse)]/25 pt-8">
              <blockquote className="pull-quote-sm text-[var(--color-text-inverse)]">
                “{t('sabadosClose')}”
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ── 9. TERÇO DAS FAMÍLIAS ──
            Nota: acontece na Igreja da Lapa, não na Basílica — daí o par
            Quando/Onde em destaque. */}
        <section id="terco" className="scroll-mt-28 bg-secondary overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <Reveal className="flex flex-col justify-center section-pad px-[var(--container-pad)] lg:pl-[max(var(--container-pad),calc((100vw-var(--container-max))/2+var(--container-pad)))]">
              <SectionLabel className="opacity-75">{t('tercoTitle')}</SectionLabel>
              <blockquote className="pull-quote-sm mb-3 max-w-lg">
                “{t('tercoQuote')}”
              </blockquote>
              <p className="quote-ref mb-9">{t('tercoQuoteRef')}</p>

              <p className="text-[var(--color-text-secondary)] max-w-md leading-relaxed mb-10">
                {t('tercoText')}
              </p>

              <div className="flex flex-wrap gap-x-16 gap-y-6 border-t border-[var(--color-border)] pt-7">
                <div>
                  <p className="schedule-head mb-2">{t('tercoQuandoHead')}</p>
                  <p className="schedule-time">{t('tercoQuando')}</p>
                </div>
                <div>
                  <p className="schedule-head mb-2">{t('tercoOndeHead')}</p>
                  <p className="schedule-time">{t('tercoOnde')}</p>
                </div>
              </div>
            </Reveal>

            <Parallax className="w-full min-h-[52vh] lg:min-h-[76vh] order-first lg:order-last" amount={8}>
              <Image
                src="/images/figma-statue-mary.jpg"
                alt={t('imgAltDevocao')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-pad-lg">
          <div className="container">
            <div className="border-t border-[var(--color-border)] pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
              <div>
                <Reveal>
                  <SectionLabel className="opacity-75">{t('ctaLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
                >
                  {t.rich('ctaTitleRich', { em })}
                </MaskReveal>
              </div>
              <Reveal delay={0.15} className="flex flex-col gap-8 lg:items-end lg:text-right">
                <p className="text-[var(--color-text-secondary)] max-w-xs">{t('ctaSubtitle')}</p>
                <Button href="/contactos" arrow>{t('ctaButton')}</Button>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
