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
  const thr = useTranslations('horarios')

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  const sacramentos = Array.from({ length: 7 }, (_, i) => ({
    n: String(i + 1).padStart(2, '0'),
    title: t(`sac${i + 1}Title`),
    desc: t(`sac${i + 1}Desc`),
  }))

  const horarios = [
    { horas: 'missasDomHoras', dias: 'missasDomDias' },
    { horas: 'missasSemHoras', dias: 'missasSemDias' },
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
              {/* Horas do namespace `horarios` — fonte única */}
              <Reveal delay={0.15}>
                <p className="schedule-head mb-6">{thr('missasHead')}</p>
                <dl className="flex flex-col gap-5">
                  {horarios.map((slot) => (
                    <div key={slot.horas}>
                      <dt className="schedule-time">{thr(slot.horas)}</dt>
                      <dd className="schedule-desc">{thr(slot.dias)}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="schedule-head mb-6">{thr('adoracaoHead')}</p>
                <dl className="flex flex-col gap-5">
                  <div>
                    <dt className="schedule-time">{thr('adoracaoSemHoras')}</dt>
                    <dd className="schedule-desc">{thr('adoracaoSemDias')}</dd>
                  </div>
                </dl>
              </Reveal>

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
                <dl className="flex flex-col gap-4">
                  {[
                    { horas: 'confissoesDomHoras', dias: 'confissoesDomDias' },
                    { horas: 'confissoesSemHoras', dias: 'confissoesSemDias' },
                  ].map((slot) => (
                    <div key={slot.horas}>
                      <dt className="schedule-time">{thr(slot.horas)}</dt>
                      <dd className="schedule-desc">{thr(slot.dias)}</dd>
                    </div>
                  ))}
                </dl>
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

            {/* Abre-capítulo: em vez de gastar um ecrã só com um título, lista
                as quatro devoções com o seu número e âncora. Dá ao leitor o
                mapa do que aí vem, que é o que falta a uma sequência longa. */}
            <div className="mt-16 md:mt-20 border-t border-[var(--color-border-light)]">
              {([
                { id: 'adoracao', titulo: 'adoracaoTitle' },
                { id: 'sextas',   titulo: 'sextasTitle' },
                { id: 'sabados',  titulo: 'sabadosTitle' },
                { id: 'terco',    titulo: 'tercoTitle' },
              ] as const).map((d, i) => (
                <Reveal key={d.id} delay={i * 0.07} y={20}>
                  <a
                    href={`#${d.id}`}
                    className="group/dev flex items-baseline gap-6 md:gap-10 border-b border-[var(--color-border-light)] py-6 md:py-7"
                  >
                    <span className="label tabular-nums opacity-50 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-display flex-1 transition-transform duration-500 ease-[var(--ease-out)] group-hover/dev:translate-x-2"
                      style={{ fontSize: 'var(--text-h3b)', lineHeight: 1.1, letterSpacing: '-0.005em' }}
                    >
                      {t(d.titulo)}
                    </span>
                    <svg
                      width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor"
                      strokeWidth="1" aria-hidden="true"
                      className="shrink-0 opacity-40 transition-all duration-500 ease-[var(--ease-out)] group-hover/dev:opacity-100 group-hover/dev:translate-x-1 rotate-90"
                    >
                      <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Reveal>
              ))}
            </div>
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
                  {/* A secção era puramente devocional — quem quisesse vir não
                      ficava a saber quando. Mesmo padrão do Terço/Confissões. */}
                  <div className="mt-10 pt-8 border-t border-[var(--color-text-inverse)]/20">
                    <p className="schedule-head !text-[var(--color-text-on-dark)] mb-2">
                      {t('adoracaoQuandoHead')}
                    </p>
                    <p className="schedule-time !text-[var(--color-text-inverse)]">
                      {thr('adoracaoSemHoras')}
                    </p>
                    <p className="schedule-desc !text-[var(--color-text-on-dark)]">
                      {thr('adoracaoSemDias')}
                    </p>
                  </div>
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

        {/* ── 7. PRIMEIRAS SEXTAS-FEIRAS ──
            Composição assimétrica: a citação ocupa a coluna larga e a
            fotografia sobe pelo lado, enquanto os factos passam a uma régua
            horizontal por baixo. Antes eram duas colunas de prosa, iguais às
            dos Primeiros Sábados — as duas secções liam-se como a mesma. */}
        <section id="sextas" className="section-pad-lg scroll-mt-28 overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-20 items-start">
              <div>
                <Reveal>
                  <SectionLabel className="opacity-75">{t('sextasTitle')}</SectionLabel>
                </Reveal>
                <MaskReveal as="blockquote" className="pull-quote">
                  “{t('sextasQuote')}”
                </MaskReveal>
              </div>

              <Reveal delay={0.15} className="lg:-mt-24">
                <Parallax className="media aspect-[4/5]" amount={7}>
                  <Image
                    src="/images/figma-liturgy.jpg"
                    alt={t('imgAltEucaristia')}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
            </div>

            {/* Origem · Na Basílica · Quando · Programa numa só régua — o que
                antes ocupava duas colunas de prosa cabe aqui de relance. */}
            <div className="mt-16 md:mt-20 pt-10 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              <Reveal delay={0.1}>
                <p className="schedule-head mb-4">{t('origemHead')}</p>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{t('sextasOrigem')}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="schedule-head mb-4">{t('basilicaHead')}</p>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{t('sextasBasilica')}</p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="schedule-head mb-4">{t('sextasQuandoHead')}</p>
                <p className="schedule-time">{t('sextasQuando')}</p>
              </Reveal>
              <Reveal delay={0.34}>
                <p className="schedule-head mb-4">{t('sextasProgramaHead')}</p>
                <p className="schedule-time">{t('sextasAdoracao')}</p>
                <p className="schedule-time">{t('sextasMissa')}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 8. PRIMEIROS SÁBADOS ──
            O momento visual da sequência: a promessa de Nossa Senhora assente
            sobre a imagem, a toda a largura, e os factos numa régua terracota
            por baixo. É a devoção mariana, daí a escultura. */}
        <section id="sabados" className="scroll-mt-28">
          <div className="relative min-h-[88vh] flex items-end overflow-hidden">
            <Parallax inset amount={7}>
              <Image
                src="/images/figma-statue-mary.jpg"
                alt={t('imgAltDevocao')}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </Parallax>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.20) 32%, rgba(8,8,10,0.45) 66%, rgba(8,8,10,0.86) 100%)',
              }}
            />

            <div className="container relative z-10 section-pad">
              <Reveal>
                <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                  {t('sabadosTitle')}
                </SectionLabel>
              </Reveal>
              <MaskReveal as="blockquote" className="pull-quote text-[var(--color-text-inverse)] max-w-4xl">
                “{t('sabadosQuote')}”
              </MaskReveal>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--brand-terracota-deep)' }}>
            <div className="container py-14 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
                <Reveal delay={0.1}>
                  <p className="schedule-head !text-[var(--color-text-inverse)] mb-4">{t('origemHead')}</p>
                  <p className="!text-[var(--color-text-inverse)] opacity-90 text-sm leading-relaxed">
                    {t('sabadosOrigem')}
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <p className="schedule-head !text-[var(--color-text-inverse)] mb-4">{t('basilicaHead')}</p>
                  <p className="!text-[var(--color-text-inverse)] opacity-90 text-sm leading-relaxed">
                    {t('sabadosBasilica')}
                  </p>
                </Reveal>
                <Reveal delay={0.26}>
                  <blockquote className="pull-quote-sm text-[var(--color-text-inverse)]">
                    “{t('sabadosClose')}”
                  </blockquote>
                </Reveal>
              </div>
            </div>
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

            {/* A escultura mariana passou para os Primeiros Sábados; aqui fica a
                nave com gente, que é o que o Terço das Famílias é — assembleia,
                não imagem de devoção. */}
            <Parallax className="w-full min-h-[52vh] lg:min-h-[76vh] order-first lg:order-last" amount={8}>
              <Image
                src="/images/figma-nave-wide.jpg"
                alt={t('imgAltInterior')}
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
