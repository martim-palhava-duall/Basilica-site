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

/** Sand-toned first word in the Visitar headline (<w> in the message files) —
 * matches the branding's two-tone treatment of those three lines. */
const w = (chunks: ReactNode) => <span style={{ color: 'var(--brand-sand-pale)' }}>{chunks}</span>

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

  /** Visit section: one editorial line per experience, images alternating sides */
  const experiences = [
    { key: 'visitExp1', src: '/images/figma-cupula-exterior.jpg', alt: 'cupulaImgAlt' },
    { key: 'visitExp2', src: '/images/figma-nave-aerial.jpg', alt: 'interiorImgAlt' },
    { key: 'visitExp3', src: '/images/figma-icon-chalice.jpg', alt: 'destaqueImgAlt' },
  ]

  const obraSocial = [
    { n: '01', title: 'obraSocialFeat1', desc: 'obraSocialDesc1' },
    { n: '02', title: 'obraSocialFeat2', desc: 'obraSocialDesc2' },
    { n: '03', title: 'obraSocialFeat3', desc: 'obraSocialDesc3' },
  ]

  const destaques = [
    { src: '/images/destaque-celebracao.jpg', alt: 'destaqueImgAlt' },
    { src: '/images/figma-statue-mary.jpg', alt: 'destaqueImgAlt2' },
    { src: '/images/figma-icon-priest2.jpg', alt: 'destaqueImgAlt3' },
  ]

  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ──
            A frase-assinatura da marca ("More Than Just Another Church") é agora
            o próprio título gigante, em Forevs Light Italic — o Figma consolidou
            o que antes eram dois blocos (título + tagline) num só. "Basílica da
            Estrela" como texto vive apenas no logótipo do Nav. */}
        <section className="relative min-h-screen flex flex-col justify-end section-pad-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(8,8,10,0.50) 0%, rgba(8,8,10,0.12) 26%, rgba(8,8,10,0.18) 52%, rgba(8,8,10,0.52) 78%, rgba(8,8,10,0.72) 100%)',
              }}
            />
          </div>

          <div className="container relative z-10 max-w-[1152px]">
            <Reveal>
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-80">
                {t('heroLabel')}
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="font-display text-[var(--color-text-inverse)] em-italic stagger mb-8"
                style={{
                  fontSize: 'var(--text-display)',
                  letterSpacing: 'var(--tracking-display)',
                  lineHeight: 'var(--leading-display)',
                }}
              >
                {tc('tagline').split('\n').map((line) => <span key={line}>{line}</span>)}
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-4">
                <Button
                  href="/basilica-e-convento"
                  arrow
                  className="!bg-[var(--brand-terracota-deep)] !text-[var(--color-text-inverse)] hover:!opacity-90"
                >
                  {t('visitCta')}
                </Button>
                <Button
                  href="/sobre-a-basilica"
                  variant="secondary"
                  className="!border-[var(--color-text-inverse)]/45 !text-[var(--color-text-inverse)]"
                >
                  {tc('saberMais')}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MANIFESTO ──
            Declaração tipográfica, com uma pequena imagem + legenda por baixo
            (branding: par imagem 72×72 + texto de apoio). */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            {/* Centrado numa coluna estreita: o parágrafo-manifesto é um momento de
                pausa entre secções mais movimentadas (hotelbelavista.net — ver
                DESIGN.md), não um bloco de texto a abranger a largura toda. */}
            <Reveal className="max-w-3xl mx-auto text-center">
              <SectionLabel className="opacity-75">{t('manifestoLabel')}</SectionLabel>
              <p className="type-editorial mb-12">
                {t.rich('manifesto', { em })}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex items-center justify-center gap-4">
              <div className="relative media shrink-0" style={{ width: 72, height: 72 }}>
                <Image
                  src="/images/figma-icon-priest1.jpg"
                  alt={t('manifestoImgAlt')}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </div>
              <p className="text-[0.75rem] opacity-85 leading-relaxed max-w-[224px]">
                {t('visitSubtitle')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── VISITAR A BASÍLICA ──
            Fundo terracota (não navy) — a Linha Cultural do branding usa esta cor
            para a secção de visita. As três linhas alternam imagem/texto; a
            primeira palavra de cada linha fica num tom areia pálido, a segunda
            (itálico) em branco puro. Localização à esquerda, legenda + CTA à
            direita — não centrado. */}
        <section
          className="section-pad-lg overflow-hidden"
          style={{ backgroundColor: 'var(--brand-terracota-deep)' }}
        >
          <div className="container">
            <Reveal>
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-90">
                {t('visitLabel')}
              </SectionLabel>
            </Reveal>

            <div className="flex flex-col items-center text-center">
              {experiences.map((exp, i) => (
                <Reveal
                  key={exp.key}
                  delay={i * 0.12}
                  as="h2"
                  className="font-display text-[var(--color-text-inverse)] flex items-center gap-6 md:gap-8 py-2"
                  style={{ fontSize: 'var(--text-h1)', lineHeight: 1.05, letterSpacing: 'var(--tracking-heading)' }}
                >
                  {t.rich(exp.key, { em, w, media: inlineMedia(exp.src, t(exp.alt)) })}
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35} className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mt-24">
              <p className="label !text-[var(--color-text-inverse)] opacity-90">
                {t('visitLocation')}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:ml-auto">
                <p className="lead !text-[var(--color-text-inverse)] max-w-xs" style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300 }}>
                  {t('visitSubtitle')}
                </p>
                <Button
                  href="/basilica-e-convento"
                  variant="secondary"
                  arrow
                  className="shrink-0 !border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)]"
                >
                  {t('visitCta')}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── HORÁRIOS DAS CELEBRAÇÕES ──
            (por fazer — ainda não está pronta no Figma; mantida como estava) */}
        <section className="section-pad bg-secondary">
          <div className="container">
            <Reveal>
              <SectionLabel>{t('massasLabel')}</SectionLabel>
              <h2
                className="font-display font-light uppercase"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                }}
              >
                {t('massasTitle')}
              </h2>
            </Reveal>

            {/* régua, como nos cartazes */}
            <Reveal delay={0.1}>
              <hr className="border-0 border-t border-[var(--color-text-primary)] opacity-25 mt-8 mb-12" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
              {[
                { head: 'massasCol1Head', slots: [['massasCol1aHora','massasCol1aDesc'], ['massasCol1bHora','massasCol1bDesc'], ['massasCol1cHora','massasCol1cDesc']] },
                { head: 'massasCol2Head', slots: [['massasCol2aHora','massasCol2aDesc'], ['massasCol2bHora','massasCol2bDesc']] },
                { head: 'massasCol3Head', slots: [['massasCol3aHora','massasCol3aDesc'], ['massasCol3bHora','massasCol3bDesc']] },
              ].map((col, i) => (
                <Reveal key={col.head} delay={0.15 + i * 0.1}>
                  <p className="schedule-head mb-6">{t(col.head)}</p>
                  <dl className="flex flex-col gap-5">
                    {col.slots.map(([hora, desc]) => (
                      <div key={hora}>
                        <dt className="schedule-time">{t(hora)}</dt>
                        <dd className="schedule-desc">{t(desc)}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-16">
              <Button href="/horarios" variant="ghost" arrow>{t('massasCta')}</Button>
            </Reveal>
          </div>
        </section>

        {/* ── QUEM SOMOS ──
            Texto à esquerda, fotografia à direita (o Figma inverteu a ordem que
            tínhamos). Título a 80px (--text-h1b), não os 96px da Visitar. */}
        <section className="bg-secondary section-pad-lg">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <Reveal className="flex flex-col gap-16">
                <div>
                  <SectionLabel className="opacity-75">{t('quemSomosLabel')}</SectionLabel>
                  <h2
                    className="font-display mb-6"
                    style={{
                      fontSize: 'var(--text-h1b)',
                      letterSpacing: 'var(--tracking-heading)',
                      lineHeight: 1.32,
                    }}
                  >
                    {t.rich('quemSomosTitleRich', { em })}
                  </h2>
                  <p className="lead text-[var(--color-text-secondary)] max-w-sm">
                    {t('quemSomosSubtitle')}
                  </p>
                </div>
                <Button href="/sobre-nos" variant="secondary" arrow className="self-start">
                  {t('quemSomosCta')}
                </Button>
              </Reveal>

              <Reveal delay={0.15} className="media relative aspect-[3/4] lg:aspect-auto lg:h-[720px] group">
                <Image
                  src="/images/figma-nave-wide.jpg"
                  alt={t('interiorImgAlt')}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── OBRA SOCIAL ──
            Lista numerada com régua horizontal, não os cards com ícone que
            tínhamos — é assim que o Figma a desenha. */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="flex flex-col gap-6">
              <SectionLabel className="opacity-75">{t('obraSocialLabel')}</SectionLabel>
              <div className="flex flex-wrap items-start justify-between gap-8">
                <h2
                  className="font-display max-w-2xl"
                  style={{
                    fontSize: 'var(--text-h1b)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 1.32,
                  }}
                >
                  {t.rich('obraSocialTitleRich', { em })}
                </h2>
                <Button href="/obra-social" variant="secondary" arrow>
                  {t('obraSocialCta')}
                </Button>
              </div>
            </Reveal>

            <div className="border-t border-[var(--color-border-light)] mt-16">
              {obraSocial.map((item, i) => (
                <Reveal
                  key={item.n}
                  delay={i * 0.1}
                  className="border-b border-[var(--color-border-light)] py-9 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8"
                >
                  <span className="label opacity-60 sm:pt-3 sm:w-20 shrink-0">{item.n}</span>
                  <h3
                    className="font-display sm:w-[352px] shrink-0"
                    style={{ fontSize: 'var(--text-h3b)', letterSpacing: '-0.005em', lineHeight: 1.1 }}
                  >
                    {t(item.title)}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] sm:pt-3 max-w-md">
                    {t(item.desc)}
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
                <SectionLabel className="mb-4 opacity-75">{t('destaques')}</SectionLabel>
                <h2
                  className="font-display"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)' }}
                >
                  {t.rich('destaquesTitleRich', { em })}
                </h2>
              </div>
              <Button href="/vida-paroquia" variant="ghost" arrow>{t('destaquesCta')}</Button>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {destaques.map((d, i) => (
                <Reveal as="article" key={d.src} delay={i * 0.1} className="group cursor-pointer">
                  <div className="relative aspect-[3/2] media mb-5">
                    <Image
                      src={d.src}
                      alt={t(d.alt)}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="label mb-3">{t('noticiaLabel')} · {year}</p>
                  <h3
                    className="font-display group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                    style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-heading)' }}
                  >
                    {t('noticiaPlaceholderTitle')} {i + 1}
                  </h3>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA DOAÇÕES ──
            De volta ao tratamento fotográfico full-bleed — é o que o Figma
            mostra (detalhe de fresco do teto). Título à esquerda, legenda + CTA
            à direita, sem colunas nem régua. */}
        <section className="relative min-h-[900px] flex items-center overflow-hidden">
          <Image
            src="/images/figma-fresco.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(8,8,10,0.50) 0%, rgba(8,8,10,0.12) 26%, rgba(8,8,10,0.18) 52%, rgba(8,8,10,0.52) 78%, rgba(8,8,10,0.72) 100%)',
            }}
          />

          <div className="container relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
              <Reveal className="max-w-2xl">
                <SectionLabel className="!text-[var(--color-text-inverse)] opacity-80">
                  {t('doacoesLabel')}
                </SectionLabel>
                <h2
                  className="font-display text-[var(--color-text-inverse)]"
                  style={{
                    fontSize: 'var(--text-h1)',
                    letterSpacing: 'var(--tracking-heading)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {t.rich('doacoesTitleRich', { em })}
                </h2>
              </Reveal>

              <Reveal delay={0.15} className="lg:max-w-xs lg:pb-3 flex flex-col gap-10">
                <p className="!text-[var(--color-text-inverse)]" style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}>
                  {t('doacoesSubtitle')}
                </p>
                <Button
                  href="/donativos"
                  arrow
                  className="self-start !bg-[var(--color-terracota)] !text-[var(--color-text-inverse)] hover:!opacity-90"
                >
                  {t('doacoesCta')}
                </Button>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
