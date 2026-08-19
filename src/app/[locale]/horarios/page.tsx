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

/** Secções pela ordem do sitemap (nó "Horários e Intenções", 2960:954). */
const SECTIONS = [
  { id: 'basilica',  label: 'basilicaLabel' },
  { id: 'outras',    label: 'outrasLabel' },
  { id: 'agenda',    label: 'agendaLabel' },
  { id: 'intencoes', label: 'intencoesLabel' },
]

export default function HorariosPage() {
  const t = useTranslations('horariosPagina')
  // Os horários vivem no namespace `horarios` — fonte única partilhada com a
  // homepage e as Celebrações. Esta página mostra-os na íntegra, mas não os
  // redeclara.
  const thr = useTranslations('horarios')
  // Os compromissos mensais saem do texto das devoções, nas Celebrações: são
  // os mesmos dados, não uma segunda versão deles.
  const tc = useTranslations('celebracoes')

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  /** Blocos do cartaz da Basílica. Cada um pode ter uma ou duas linhas. */
  const basilica = [
    { head: 'missasHead',      slots: [['missasDomHoras', 'missasDomDias'], ['missasSemHoras', 'missasSemDias']] },
    { head: 'confissoesHead',  slots: [['confissoesDomHoras', 'confissoesDomDias'], ['confissoesSemHoras', 'confissoesSemDias']] },
    { head: 'adoracaoHead',    slots: [['adoracaoSemHoras', 'adoracaoSemDias']] },
    { head: 'acolhimentoHead', slots: [['acolhimentoFdsHoras', 'acolhimentoFdsDias'], ['acolhimentoSemHoras', 'acolhimentoSemDias']] },
    { head: 'cartorioHead',    slots: [['cartorioHoras', 'cartorioDias']] },
  ]

  /** Os outros espaços de culto da paróquia. */
  const outras = [
    { titulo: 'lapaTitle',        slots: [['lapaSabHoras', 'lapaSabDias'], ['lapaDomHoras', 'lapaDomDias']] },
    { titulo: 'clarissasTitle',   slots: [['clarissasHoras', 'clarissasDias']] },
    { titulo: 'navegantesTitle',  slots: [['navegantesHoras', 'navegantesDias']] },
  ]

  return (
    <>
      <Nav />
      <SectionRail sections={rail} />

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex flex-col justify-end pb-14 md:pb-20 overflow-hidden">
          <Parallax inset amount={7}>
            <Image
              src="/images/figma-nave-aerial.jpg"
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
                'linear-gradient(to bottom, rgba(8,8,10,0.50) 0%, rgba(8,8,10,0.12) 28%, rgba(8,8,10,0.26) 55%, rgba(8,8,10,0.66) 80%, rgba(8,8,10,0.86) 100%)',
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
                <ul className="flex flex-wrap gap-x-6 gap-y-2 max-w-lg">
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

        {/* ── 1. HORÁRIOS DA BASÍLICA ──
            O cartaz do branding (p28) a toda a largura: Area em maiúsculas, o
            peso a fazer a hierarquia, réguas a separar. É a razão de ser da
            página, por isso ocupa-a inteira em vez de partilhar a linha. */}
        <section id="basilica" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8 mb-4">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('basilicaLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('basilicaTitleRich', { em })}
                </MaskReveal>
              </div>
              <Reveal delay={0.15}>
                <p className="label opacity-70 max-w-xs leading-relaxed">{t('basilicaNota')}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <hr className="border-0 border-t border-[var(--color-text-primary)] opacity-25 mt-12" />
            </Reveal>

            <div className="border-b border-[var(--color-border-light)]">
              {basilica.map((bloco, i) => (
                <Reveal
                  key={bloco.head}
                  delay={0.1 + i * 0.07}
                  y={20}
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_1fr] gap-y-4 gap-x-10 border-t border-[var(--color-border-light)] py-8 md:py-9 first:border-t-0"
                >
                  <p className="schedule-head md:pt-1">{thr(bloco.head)}</p>
                  <dl className="flex flex-col sm:flex-row sm:flex-wrap gap-y-5 gap-x-16">
                    {bloco.slots.map(([horas, dias]) => (
                      <div key={horas} className="min-w-[14rem]">
                        <dt className="schedule-time">{thr(horas)}</dt>
                        <dd className="schedule-desc">{thr(dias)}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. OUTRAS IGREJAS E CAPELAS ──
            Faixa escura para separar do cartaz da Basílica: são espaços
            distintos, e a mudança de fundo evita que se leiam como
            continuação da mesma tabela. */}
        <section id="outras" className="section-pad-lg bg-dark scroll-mt-28">
          <div className="container">
            <div className="max-w-2xl mb-14 md:mb-16">
              <Reveal>
                <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                  {t('outrasLabel')}
                </SectionLabel>
              </Reveal>
              <MaskReveal
                as="h2"
                className="font-display text-[var(--color-text-inverse)] mb-5"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
              >
                {t.rich('outrasTitleRich', { em })}
              </MaskReveal>
              <Reveal delay={0.15}>
                <p className="text-[var(--color-text-on-dark)]">{t('outrasText')}</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[var(--color-text-inverse)]/20">
              {outras.map((igreja, i) => (
                <Reveal
                  key={igreja.titulo}
                  delay={i * 0.1}
                  className={`py-9 md:py-10 md:pr-10 border-b md:border-b-0 border-[var(--color-text-inverse)]/20 ${
                    i > 0 ? 'md:border-l md:border-[var(--color-text-inverse)]/20 md:pl-10' : ''
                  }`}
                >
                  <h3
                    className="font-display text-[var(--color-text-inverse)] mb-7"
                    style={{ fontSize: 'var(--text-h3)', lineHeight: 1.15 }}
                  >
                    {thr(igreja.titulo)}
                  </h3>
                  <dl className="flex flex-col gap-5">
                    {igreja.slots.map(([horas, dias]) => (
                      <div key={horas}>
                        <dt className="schedule-time !text-[var(--color-text-inverse)]">{thr(horas)}</dt>
                        <dd className="schedule-desc !text-[var(--color-text-on-dark)]">{thr(dias)}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. AGENDA PAROQUIAL ──
            Não são eventos inventados: são os compromissos que se repetem
            todos os meses, tirados do texto das devoções que o cliente
            forneceu — Primeiras Sextas, Primeiros Sábados e o Terço das
            Famílias no dia 13. Lidos do namespace `celebracoes`. */}
        <section id="agenda" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8 mb-14 md:mb-16">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('agendaLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('agendaTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)]">{t('agendaText')}</p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <Button href="/celebracoes" variant="secondary" arrow>{t('agendaCta')}</Button>
              </Reveal>
            </div>

            <div className="border-t border-[var(--color-border-light)]">
              {([
                { n: '01', titulo: tc('sextasTitle'), quando: tc('sextasQuando'),  detalhe: [tc('sextasAdoracao'), tc('sextasMissa')] },
                { n: '02', titulo: tc('sabadosTitle'), quando: tc('sabadosQuando'), detalhe: [tc('sabadosBasilica')] },
                { n: '03', titulo: tc('tercoTitle'),   quando: tc('tercoQuando'),   detalhe: [tc('tercoOnde')] },
              ]).map((item, i) => (
                <Reveal
                  key={item.n}
                  delay={i * 0.08}
                  y={20}
                  className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_minmax(0,15rem)_1fr] items-baseline gap-x-6 border-b border-[var(--color-border-light)] py-8 md:py-10"
                >
                  <span className="label tabular-nums opacity-50">{item.n}</span>
                  <div>
                    <h3
                      className="font-display"
                      style={{ fontSize: 'var(--text-h3)', lineHeight: 1.15 }}
                    >
                      {item.titulo}
                    </h3>
                    <p className="schedule-time mt-2">{item.quando}</p>
                  </div>
                  <div className="col-start-2 md:col-start-3 mt-3 md:mt-0 flex flex-col gap-1.5">
                    {item.detalhe.map((d) => (
                      <p key={d} className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-md">
                        {d}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. INTENÇÕES DE MISSA ── */}
        <section id="intencoes" className="scroll-mt-28 bg-secondary overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <Reveal className="flex flex-col justify-center section-pad px-[var(--container-pad)] lg:pl-[max(var(--container-pad),calc((100vw-var(--container-max))/2+var(--container-pad)))]">
              <SectionLabel className="opacity-75">{t('intencoesLabel')}</SectionLabel>
              <h2
                className="font-display mb-6 max-w-lg"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
              >
                {t.rich('intencoesTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-md leading-relaxed mb-10">
                {t('intencoesText')}
              </p>

              {/* O pedido faz-se no cartório — o horário dele fica aqui, para
                  não obrigar a subir à tabela. */}
              <div className="border-t border-[var(--color-border)] pt-7 mb-10">
                <p className="schedule-head mb-2">{thr('cartorioHead')}</p>
                <p className="schedule-time">{thr('cartorioHoras')}</p>
                <p className="schedule-desc">{thr('cartorioDias')}</p>
              </div>

              <Button href="/contactos" arrow className="self-start">{t('intencoesCta')}</Button>
            </Reveal>

            <Parallax className="w-full min-h-[52vh] lg:min-h-[80vh] order-first lg:order-last" amount={8}>
              <Image
                src="/images/figma-icon-chalice.jpg"
                alt={t('imgAltIntencoes')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>
        </section>

        {/* ── LIGAÇÃO À VISITA ──
            O sitemap remata esta página com um atalho para a Visita. */}
        <section className="section-pad-lg">
          <div className="container">
            <div className="border-t border-[var(--color-border)] pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
              <div>
                <Reveal>
                  <SectionLabel className="opacity-75">{t('visitaLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
                >
                  {t.rich('visitaTitleRich', { em })}
                </MaskReveal>
              </div>
              <Reveal delay={0.15} className="flex flex-col gap-8 lg:items-end lg:text-right">
                <p className="text-[var(--color-text-secondary)] max-w-xs">{t('visitaText')}</p>
                <Button href="/basilica-e-convento" arrow>{t('visitaCta')}</Button>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
