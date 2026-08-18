import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/ui/Reveal'

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

/** Secções desta página, pela ordem do sitemap (Figma, nó "Vida da Paróquia").
 *  Servem também de índice âncora no topo — o mesmo padrão que o cliente usa
 *  nos seus próprios documentos de conteúdo. */
const SECTIONS = [
  { id: 'grupos',      label: 'gruposLabel' },
  { id: 'escuteiros',  label: 'escuteirosLabel' },
  { id: 'culturais',   label: 'culturaisLabel' },
  { id: 'formacao',    label: 'formacaoLabel' },
  { id: 'cti',         label: 'ctiLabel' },
  { id: 'reservas',    label: 'reservasLabel' },
]

export default function VidaParoquiaPage() {
  const t = useTranslations('vidaParoquia')
  const year = new Date().getFullYear()

  const grupos = [
    { n: '01', title: 'grupo1Title', desc: 'grupo1Desc', src: '/images/figma-icon-priest2.jpg', alt: 'imgAltComunidade' },
    { n: '02', title: 'grupo2Title', desc: 'grupo2Desc', src: '/images/hero.jpg',               alt: 'imgAltJovens' },
    { n: '03', title: 'grupo3Title', desc: 'grupo3Desc', src: '/images/figma-icon-chalice.jpg', alt: 'imgAltComunidade' },
    { n: '04', title: 'grupo4Title', desc: 'grupo4Desc', src: '/images/figma-statue-mary.jpg',  alt: 'imgAltInterior' },
  ]

  const culturais = [
    { title: 'cultural1Title', desc: 'cultural1Desc', src: '/images/destaque-celebracao.jpg', alt: 'imgAltCoro' },
    { title: 'cultural2Title', desc: 'cultural2Desc', src: '/images/figma-fresco.jpg',        alt: 'imgAltInterior' },
    { title: 'cultural3Title', desc: 'cultural3Desc', src: '/images/figma-nave-aerial.jpg',   alt: 'imgAltInterior' },
  ]

  const cursos = [
    { head: 'curso1Head', hora: 'curso1Hora', desc: 'curso1Desc' },
    { head: 'curso2Head', hora: 'curso2Hora', desc: 'curso2Desc' },
    { head: 'curso3Head', hora: 'curso3Hora', desc: 'curso3Desc' },
  ]

  const reservas = [
    { title: 'reserva1Title', desc: 'reserva1Desc' },
    { title: 'reserva2Title', desc: 'reserva2Desc' },
    { title: 'reserva3Title', desc: 'reserva3Desc' },
  ]

  const news = [
    '/images/hero-fachada.jpg',
    '/images/interior-nave.jpg',
    '/images/cupula-torre.jpg',
  ]

  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[88vh] flex flex-col justify-end section-pad-lg overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.jpg"
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
                  'linear-gradient(to bottom, rgba(8,8,10,0.50) 0%, rgba(8,8,10,0.12) 28%, rgba(8,8,10,0.22) 55%, rgba(8,8,10,0.58) 80%, rgba(8,8,10,0.78) 100%)',
              }}
            />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl">
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
                <p
                  className="!text-[var(--color-text-inverse)] max-w-lg"
                  style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}
                >
                  {t('heroSubtitle')}
                </p>
              </Reveal>
            </div>

            {/* Índice âncora — a página é longa e tem seis destinos distintos */}
            <Reveal delay={0.32} className="mt-16 pt-8 border-t border-[var(--color-text-inverse)]/20">
              <p className="label !text-[var(--color-text-inverse)] opacity-60 mb-4">{t('indice')}</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm !text-[var(--color-text-inverse)] opacity-75 hover:opacity-100 transition-opacity duration-200 underline-offset-[6px] hover:underline decoration-[0.5px]"
                    >
                      {t(s.label)}
                    </a>
                  </li>
                ))}
              </ul>
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

        {/* ── 1. GRUPOS ──
            Cartões com fotografia (não os cartões só de texto que tinha antes):
            2×2, imagem em retrato, número discreto sobre a imagem. */}
        <section id="grupos" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <Reveal className="flex flex-wrap items-end justify-between gap-8 mb-16">
              <div className="max-w-xl">
                <SectionLabel className="opacity-75">{t('gruposLabel')}</SectionLabel>
                <h2
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.15 }}
                >
                  {t.rich('gruposTitleRich', { em })}
                </h2>
              </div>
              <p className="text-[var(--color-text-secondary)] max-w-sm">{t('gruposText')}</p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
              {grupos.map((g, i) => (
                <Reveal key={g.n} delay={(i % 2) * 0.1} className="group">
                  <div className="relative media aspect-[4/5] mb-6 overflow-hidden">
                    <Image
                      src={g.src}
                      alt={t(g.alt)}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <span
                      className="absolute top-5 left-5 label !text-[var(--color-text-inverse)] opacity-90"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
                    >
                      {g.n}
                    </span>
                  </div>
                  <h3
                    className="font-display mb-3"
                    style={{ fontSize: 'var(--text-h3b)', letterSpacing: '-0.005em', lineHeight: 1.1 }}
                  >
                    {t(g.title)}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] max-w-md leading-relaxed">
                    {t(g.desc)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. ESCUTEIROS / MOVIMENTOS ──
            Momento de contraste da página: fundo terracota, fotografia a sangrar
            de um lado (padrão dos spreads editoriais do moodboard). */}
        <section
          id="escuteiros"
          className="scroll-mt-28 overflow-hidden"
          style={{ backgroundColor: 'var(--brand-terracota-deep)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <Reveal className="relative min-h-[380px] lg:min-h-[640px] order-2 lg:order-1">
              <Image
                src="/images/fachada-wide.jpg"
                alt={t('imgAltComunidade')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal delay={0.12} className="order-1 lg:order-2 flex flex-col justify-center section-pad px-[var(--container-pad)] lg:pr-[max(var(--container-pad),calc((100vw-var(--container-max))/2+var(--container-pad)))]">
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-90">
                {t('escuteirosLabel')}
              </SectionLabel>
              <h2
                className="font-display text-[var(--color-text-inverse)] mb-6 max-w-lg"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.12 }}
              >
                {t.rich('escuteirosTitleRich', { em })}
              </h2>
              <p
                className="!text-[var(--color-text-inverse)] max-w-md mb-10"
                style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}
              >
                {t('escuteirosText')}
              </p>
              <Button
                href="/contactos"
                variant="secondary"
                arrow
                className="self-start !border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)]"
              >
                {t('escuteirosCta')}
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ── 3. GRUPOS CULTURAIS ── */}
        <section id="culturais" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <Reveal className="max-w-2xl mb-16">
              <SectionLabel className="opacity-75">{t('culturaisLabel')}</SectionLabel>
              <h2
                className="font-display mb-5"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.15 }}
              >
                {t.rich('culturaisTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)]">{t('culturaisText')}</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {culturais.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.1} className="group">
                  <div className="relative media aspect-[3/2] mb-5 overflow-hidden">
                    <Image
                      src={c.src}
                      alt={t(c.alt)}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3
                    className="font-display mb-2"
                    style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-heading)' }}
                  >
                    {t(c.title)}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {t(c.desc)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. CURSOS DE FORMAÇÃO ──
            Composição dos cartazes do branding (p28): Area em maiúsculas, o peso
            a fazer a hierarquia, réguas a separar. Reutiliza .schedule-*. */}
        <section id="formacao" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <Reveal className="flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-xl">
                <SectionLabel className="opacity-75">{t('formacaoLabel')}</SectionLabel>
                <h2
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.15 }}
                >
                  {t.rich('formacaoTitleRich', { em })}
                </h2>
                <p className="text-[var(--color-text-secondary)]">{t('formacaoText')}</p>
              </div>
              <Button href="/contactos" variant="secondary" arrow>{t('formacaoCta')}</Button>
            </Reveal>

            <Reveal delay={0.1}>
              <hr className="border-0 border-t border-[var(--color-text-primary)] opacity-25 mt-14 mb-12" />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
              {cursos.map((c, i) => (
                <Reveal key={c.head} delay={0.15 + i * 0.1}>
                  <p className="schedule-head mb-5">{t(c.head)}</p>
                  <p className="schedule-time">{t(c.hora)}</p>
                  <p className="schedule-desc">{t(c.desc)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CTI JUVENIL ──
            Segundo momento escuro da página, a espelhar o dos Escuteiros mas com
            a fotografia do lado oposto. */}
        <section id="cti" className="scroll-mt-28 bg-dark overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <Reveal className="flex flex-col justify-center section-pad px-[var(--container-pad)] lg:pl-[max(var(--container-pad),calc((100vw-var(--container-max))/2+var(--container-pad)))]">
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-90">
                {t('ctiLabel')}
              </SectionLabel>
              <h2
                className="font-display text-[var(--color-text-inverse)] mb-6 max-w-lg"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.12 }}
              >
                {t.rich('ctiTitleRich', { em })}
              </h2>
              <p
                className="text-[var(--color-text-on-dark)] max-w-md mb-10"
                style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}
              >
                {t('ctiText')}
              </p>
              <Button
                href="/contactos"
                variant="secondary"
                arrow
                className="self-start !border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)]"
              >
                {t('ctiCta')}
              </Button>
            </Reveal>

            <Reveal delay={0.12} className="relative min-h-[380px] lg:min-h-[600px]">
              <Image
                src="/images/figma-liturgy.jpg"
                alt={t('imgAltJovens')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* ── 6. RESERVAS NA SALA ──
            Bloco funcional, não editorial: três colunas de informação prática
            dentro de uma moldura fina. */}
        <section id="reservas" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <Reveal className="border border-[var(--color-border)] p-8 md:p-14" style={{ borderRadius: 'var(--radius)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
                <div>
                  <SectionLabel className="opacity-75">{t('reservasLabel')}</SectionLabel>
                  <h2
                    className="font-display mb-5"
                    style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.15 }}
                  >
                    {t.rich('reservasTitleRich', { em })}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] max-w-md mb-10">{t('reservasText')}</p>
                  <Button href="/contactos" arrow>{t('reservasCta')}</Button>
                </div>

                <dl className="flex flex-col">
                  {reservas.map((r, i) => (
                    <div
                      key={r.title}
                      className={`py-5 ${i > 0 ? 'border-t border-[var(--color-border-light)]' : ''}`}
                    >
                      <dt className="label mb-1.5">{t(r.title)}</dt>
                      <dd className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                        {t(r.desc)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── NOTÍCIAS ──
            Não está no sitemap, mas é o destino do "Ver todas as notícias" da
            homepage — fica no fim, como remate. */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((src, i) => (
                <Reveal as="article" key={src} delay={i * 0.1} className="group cursor-pointer">
                  <div className="relative aspect-[3/2] media mb-5 overflow-hidden">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
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

        {/* ── CTA FINAL ── */}
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
