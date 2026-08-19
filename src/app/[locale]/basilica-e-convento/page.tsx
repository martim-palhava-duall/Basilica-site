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

/** Secções desta página, pela ordem do sitemap (nó "Basílica e Convento da Estrela"). */
const SECTIONS = [
  { id: 'historia',     label: 'historiaLabel' },
  { id: 'conhecer',     label: 'conhecerLabel' },
  { id: 'visitar',      label: 'visitarLabel' },
  { id: 'horarios',     label: 'horariosLabel' },
  { id: 'tipos',        label: 'tiposLabel' },
  { id: 'experiencias', label: 'experienciasLabel' },
  { id: 'grupos',       label: 'gruposLabel' },
]

/** Os três tipos de visita do sitemap: duração e percurso são dados do cliente. */
const TIPOS = [1, 2, 3] as const

/** Os sete pontos de "Conhecer a Basílica", texto da paróquia. */
const CONHECER = [1, 2, 3, 4, 5, 6, 7] as const

export default function BasilicaConventoPage() {
  const t = useTranslations('visita')
  const thr = useTranslations('horarios')

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  const conhecer = CONHECER.map((n) => ({
    n: String(n).padStart(2, '0'),
    title: t(`c${n}Title` as 'c1Title'),
    desc: t(`c${n}Desc` as 'c1Desc'),
  }))

  const tipos = TIPOS.map((n) => ({
    n: String(n).padStart(2, '0'),
    nome: t(`tipo${n}Nome` as 'tipo1Nome'),
    duracao: t(`tipo${n}Duracao` as 'tipo1Duracao'),
    percurso: t(`tipo${n}Percurso` as 'tipo1Percurso'),
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
              src="/images/fachada-wide.jpg"
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

        {/* ── 1. HISTÓRIA ── */}
        <section id="historia" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14 lg:gap-24 items-start">
              <Reveal className="lg:sticky lg:top-32">
                <SectionLabel className="opacity-75">{t('historiaLabel')}</SectionLabel>
                <h2
                  className="font-display font-light mb-10"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('historiaTitleRich', { em })}
                </h2>
                {/* Datas fora da prosa: são o que se procura de relance. */}
                <div className="flex flex-col gap-5">
                  {(['historiaObra', 'historiaSagracao'] as const).map((k) => (
                    <div key={k} className="border-t border-[var(--color-border)] pt-4">
                      <p className="schedule-head mb-2">{t(`${k}Head` as 'historiaObraHead')}</p>
                      <p className="schedule-time">{t(`${k}Valor` as 'historiaObraValor')}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15} className="flex flex-col gap-6">
                <p className="type-editorial">{t('historiaP1')}</p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                  {t('historiaP2')}
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                  {t('historiaP3')}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 1b. CONHECER A BASÍLICA ──
            Sete pontos, em acordeão: os títulos são o que se procura, e a prosa
            de cada um é densa de mais para estar toda aberta ao mesmo tempo. */}
        <section id="conhecer" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-24 items-start">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <SectionLabel>{t('conhecerLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-6"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('conhecerTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)] max-w-sm">
                    {t('conhecerText')}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <Accordion items={conhecer} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. VISITAR ── */}
        <section id="visitar" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-24 items-center">
              <Reveal>
                <SectionLabel>{t('visitarLabel')}</SectionLabel>
                <h2
                  className="font-display font-light mb-6"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('visitarTitleRich', { em })}
                </h2>
                {/* Ressalva pedida no sitemap — em destaque, não em letra miúda:
                    é o que evita alguém fazer viagem em vão. */}
                <p className="border-l-2 border-[var(--color-terracota)] pl-5 py-1 text-[var(--color-text-primary)] max-w-sm">
                  {t('visitarRessalva')}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <Parallax className="media aspect-[4/3]" amount={6}>
                  <Image
                    src="/images/figma-nave-aerial.jpg"
                    alt={t('imgAltNave')}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2a. HORÁRIOS E ACESSO + BILHETEIRA ──
            No sitemap, o link da bilheteira vive nesta secção — por isso o CTA
            fica aqui, e não numa secção própria. */}
        <section id="horarios" className="section-pad-lg bg-dark scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-24 items-start">
              <Reveal>
                <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                  {t('horariosLabel')}
                </SectionLabel>
                <h2
                  className="font-display font-light text-[var(--color-text-inverse)] mb-8"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('horariosTitleRich', { em })}
                </h2>
                <p className="text-[var(--color-text-on-dark)] max-w-sm mb-8">
                  {t('bilheteiraNote')}
                </p>
                {/* TODO(bilheteira): apontar ao fornecedor quando houver link —
                    o sitemap marca-o como externo (abre em separador novo). */}
                <Button
                  href="/contactos"
                  arrow
                  className="!bg-[var(--color-text-inverse)] !text-[var(--color-text-primary)] !border-transparent"
                >
                  {t('bilheteiraCta')}
                </Button>
              </Reveal>

              <Reveal delay={0.15} className="flex flex-col gap-8 lg:pt-4">
                {/* Horário de acolhimento — dados reais da paróquia, lidos do
                    namespace `horarios`. São dois regimes (fim-de-semana e dias
                    úteis), por isso este bloco leva duas linhas em vez de uma. */}
                <div className="border-t border-[var(--color-text-inverse)]/20 pt-6">
                  <p className="schedule-head !text-[var(--color-text-on-dark)] mb-3">
                    {t('aberturaHead')}
                  </p>
                  <dl className="flex flex-col gap-3">
                    {[
                      { horas: 'acolhimentoFdsHoras', dias: 'acolhimentoFdsDias' },
                      { horas: 'acolhimentoSemHoras', dias: 'acolhimentoSemDias' },
                    ].map((slot) => (
                      <div key={slot.horas}>
                        <dt className="schedule-time !text-[var(--color-text-inverse)]">
                          {thr(slot.horas)}
                        </dt>
                        <dd className="schedule-desc !text-[var(--color-text-on-dark)]">
                          {thr(slot.dias)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {(['morada', 'transportes'] as const).map((k) => (
                  <div key={k} className="border-t border-[var(--color-text-inverse)]/20 pt-6">
                    <p className="schedule-head !text-[var(--color-text-on-dark)] mb-2">
                      {t(`${k}Head` as 'moradaHead')}
                    </p>
                    <p className="schedule-time !text-[var(--color-text-inverse)]">
                      {t(`${k}Valor` as 'moradaValor')}
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2b. TIPOS DE VISITA ──
            As três opções do sitemap. A duração é o dado que decide, por isso é
            o que ganha o corpo grande. */}
        <section id="tipos" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <Reveal className="mb-16 md:mb-20 max-w-2xl">
              <SectionLabel>{t('tiposLabel')}</SectionLabel>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('tiposTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-md mt-6">
                {t('tiposText')}
              </p>
            </Reveal>

            <div className="border-t border-[var(--color-border-light)]">
              {tipos.map((tipo, i) => (
                <Reveal
                  key={tipo.n}
                  delay={i * 0.08}
                  y={20}
                  className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[5rem_minmax(0,16rem)_1fr] items-baseline gap-x-6 border-b border-[var(--color-border-light)] py-8 md:py-11"
                >
                  <span className="label tabular-nums">{tipo.n}</span>
                  <div>
                    <h3
                      className="font-display font-light"
                      style={{
                        fontSize: 'var(--text-h3)',
                        letterSpacing: 'var(--tracking-heading)',
                        lineHeight: 'var(--leading-heading)',
                      }}
                    >
                      {tipo.nome}
                    </h3>
                    <p className="schedule-time mt-2">{tipo.duracao}</p>
                  </div>
                  <p className="col-start-2 mt-3 max-w-lg text-[var(--color-text-secondary)] md:col-start-3 md:mt-0">
                    {tipo.percurso}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. EXPERIÊNCIAS ──
            PROGRAMAÇÃO PROVISÓRIA: as três experiências são propostas nossas,
            não programa confirmado da paróquia. Ancoram-se em elementos reais
            da Basílica (cúpula/miradouro, Presépio de Machado de Castro,
            acústica da nave) para serem plausíveis, mas têm de ser validadas
            antes de ir para o ar — daí a nota sob o CTA.
            A reserva vive na bilhética externa, por isso a secção termina num
            único CTA para lá em vez de detalhar preços ou datas aqui. */}
        <section id="experiencias" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <Reveal className="max-w-2xl mb-16">
              <SectionLabel>{t('experienciasLabel')}</SectionLabel>
              <h2
                className="font-display font-light mb-6"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                  lineHeight: 'var(--leading-heading)',
                }}
              >
                {t.rich('experienciasTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-md">
                {t('experienciasText')}
              </p>
            </Reveal>

            {/* Painéis fotográficos, sem moldura e desalinhados — deliberadamente
                o oposto de "Tipos de Visita", logo acima, que é texto dentro de
                caixas iguais. Ali escolhe-se um percurso comparando dados; aqui
                a fotografia é que convida, por isso a imagem manda e o nome
                assenta sobre ela. */}
            <div
              className="offset-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              style={{ ['--offset-drop' as string]: '4.5rem' }}
            >
              {([
                { n: 1, src: '/images/hero-fachada.jpg' },
                { n: 2, src: '/images/figma-statue-mary.jpg' },
                { n: 3, src: '/images/destaque-celebracao.jpg' },
              ] as const).map((exp, i) => (
                <Reveal key={exp.n} delay={i * 0.1} className="group">
                  <div className="relative media aspect-[3/4] overflow-hidden">
                    {/* `inset`, não `className="absolute inset-0"`: o Parallax
                        define `position` inline e apagaria a classe, deixando a
                        moldura a zero de altura. */}
                    <Parallax inset amount={6}>
                      <Image
                        src={exp.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </Parallax>

                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(8,8,10,0.28) 0%, rgba(8,8,10,0.05) 38%, rgba(8,8,10,0.55) 78%, rgba(8,8,10,0.82) 100%)',
                      }}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                      <p className="schedule-time !text-[var(--color-text-inverse)] opacity-85 mb-2">
                        {t(`exp${exp.n}Duracao` as 'exp1Duracao')}
                      </p>
                      <h3
                        className="font-display text-[var(--color-text-inverse)]"
                        style={{ fontSize: 'var(--text-h3)', lineHeight: 1.1 }}
                      >
                        {t(`exp${exp.n}Nome` as 'exp1Nome')}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mt-5 max-w-sm">
                    {t(`exp${exp.n}Desc` as 'exp1Desc')}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
              {/* TODO(bilheteira): trocar por <Button external href="..."> quando
                  houver o link do fornecedor — o sitemap marca-a como externa. */}
              <Button href="/contactos" arrow>{t('experienciasCta')}</Button>
              <p className="label opacity-70 max-w-sm leading-relaxed">
                {t('experienciasNota')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 4. AGENDAMENTO GRUPOS / ESCOLAS ── */}
        <section id="grupos" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-24 items-center">
              <Reveal delay={0.1}>
                <Parallax className="media aspect-[4/3]" amount={6}>
                  <Image
                    src="/images/figma-cupula-exterior.jpg"
                    alt={t('imgAltCupula')}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>

              <Reveal>
                <SectionLabel>{t('gruposLabel')}</SectionLabel>
                <h2
                  className="font-display font-light mb-6"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('gruposTitleRich', { em })}
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-md mb-8">
                  {t('gruposText')}
                </p>
                <Button href="/contactos" arrow>
                  {t('gruposCta')}
                </Button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
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
