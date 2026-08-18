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
import Marquee from '@/components/ui/Marquee'
import SectionRail from '@/components/ui/SectionRail'
import GroupShowcase from '@/components/ui/GroupShowcase'

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

/** Secções desta página, pela ordem do sitemap (Figma, nó "Vida da Paróquia").
 *  Alimentam o índice do hero, o marquee e a barra lateral fixa. */
const SECTIONS = [
  { id: 'grupos',     label: 'gruposLabel' },
  { id: 'escuteiros', label: 'escuteirosLabel' },
  { id: 'culturais',  label: 'culturaisLabel' },
  { id: 'formacao',   label: 'formacaoLabel' },
  { id: 'cti',        label: 'ctiLabel' },
  { id: 'reservas',   label: 'reservasLabel' },
]

export default function VidaParoquiaPage() {
  const t = useTranslations('vidaParoquia')
  const year = new Date().getFullYear()

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  const grupos = [
    { n: '01', title: t('grupo1Title'), desc: t('grupo1Desc'), src: '/images/figma-icon-priest2.jpg', alt: t('imgAltComunidade') },
    { n: '02', title: t('grupo2Title'), desc: t('grupo2Desc'), src: '/images/hero.jpg',               alt: t('imgAltJovens') },
    { n: '03', title: t('grupo3Title'), desc: t('grupo3Desc'), src: '/images/figma-icon-chalice.jpg', alt: t('imgAltComunidade') },
    { n: '04', title: t('grupo4Title'), desc: t('grupo4Desc'), src: '/images/figma-statue-mary.jpg',  alt: t('imgAltInterior') },
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

  const news = ['/images/hero-fachada.jpg', '/images/interior-nave.jpg', '/images/cupula-torre.jpg']

  return (
    <>
      <Nav />
      <SectionRail sections={rail} />

      <main>

        {/* ── HERO ──
            A fotografia deriva atrás do título em vez de estar fixa; o título
            entra por baixo de uma máscara, linha a linha. */}
        <section className="relative min-h-screen flex flex-col justify-end pb-14 md:pb-20 overflow-hidden">
          <Parallax inset amount={7}>
            <Image
              src="/images/hero.jpg"
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
                'linear-gradient(to bottom, rgba(8,8,10,0.52) 0%, rgba(8,8,10,0.10) 26%, rgba(8,8,10,0.22) 52%, rgba(8,8,10,0.62) 78%, rgba(8,8,10,0.84) 100%)',
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

              {/* Índice inline — abaixo de xl é este que faz o trabalho da barra lateral */}
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

        {/* ── MARQUEE ──
            Faz a passagem do hero para o corpo da página e volta a nomear as
            seis secções, agora como gesto de marca. */}
        <div className="bg-secondary py-6 md:py-8 border-y border-[var(--color-border-light)]">
          <Marquee items={SECTIONS.map((s) => t(s.label))} />
        </div>

        {/* ── MANIFESTO ──
            A fotografia sobrepõe-se ao bloco de texto em vez de ficar ao lado. */}
        {/* sem overflow-hidden: a fotografia tem de poder sair da secção — é
            essa invasão que faz a sobreposição ler-se */}
        <section className="section-pad-lg bg-secondary relative z-10">
          <div className="container relative">
            <div className="lg:pr-[26rem]">
              <Reveal>
                <SectionLabel className="opacity-75">{t('manifestoLabel')}</SectionLabel>
              </Reveal>
              <MaskReveal as="p" className="type-editorial">
                {t.rich('manifesto', { em })}
              </MaskReveal>
            </div>

            <Reveal
              delay={0.2}
              className="hidden lg:block absolute right-0 -bottom-24 w-[19rem] xl:w-[22rem]"
            >
              <Parallax className="media aspect-[3/4]" amount={11}>
                <Image
                  src="/images/figma-icon-priest1.jpg"
                  alt={t('imgAltComunidade')}
                  fill
                  sizes="22rem"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>
        </section>

        {/* ── 1. GRUPOS ──
            O momento principal da página: índice tipográfico com a fotografia
            a acompanhar em coluna fixa. */}
        <section id="grupos" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8 mb-16 md:mb-24">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('gruposLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('gruposTitleRich', { em })}
                </MaskReveal>
              </div>
              <Reveal delay={0.15}>
                <p className="text-[var(--color-text-secondary)] max-w-sm">{t('gruposText')}</p>
              </Reveal>
            </div>

            <GroupShowcase items={grupos} />
          </div>
        </section>

        {/* ── 2. ESCUTEIROS / MOVIMENTOS ──
            Fotografia a toda a largura com o bloco de texto em terracota a
            invadir-lhe o canto — a quebra de grelha da página. */}
        <section id="escuteiros" className="scroll-mt-28 relative">
          <Parallax className="w-full h-[62vh] md:h-[86vh]" amount={8}>
            <Image
              src="/images/fachada-wide.jpg"
              alt={t('imgAltComunidade')}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>

          <div className="container relative">
            {/* O posicionamento vive neste wrapper, não no <Reveal>: o Reveal
                anima via GSAP, que escreve `transform` inline e apagaria
                qualquer translate vindo de uma classe. */}
            <div className="lg:absolute lg:right-[var(--container-pad)] lg:bottom-0 lg:translate-y-[33%] w-full lg:max-w-[34rem] -mt-16 lg:mt-0">
            <Reveal
              className="p-9 md:p-12"
              style={{ backgroundColor: 'var(--brand-terracota-deep)', borderRadius: 'var(--radius)' }}
            >
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-90">
                {t('escuteirosLabel')}
              </SectionLabel>
              <h2
                className="font-display text-[var(--color-text-inverse)] mb-5"
                style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
              >
                {t.rich('escuteirosTitleRich', { em })}
              </h2>
              <p
                className="!text-[var(--color-text-inverse)] mb-9"
                style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, lineHeight: 1.6 }}
              >
                {t('escuteirosText')}
              </p>
              <Button
                href="/contactos"
                variant="secondary"
                arrow
                className="!border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)]"
              >
                {t('escuteirosCta')}
              </Button>
            </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. GRUPOS CULTURAIS ──
            Grelha desencontrada (.offset-grid), cada imagem com a sua deriva. */}
        <section id="culturais" className="section-pad-lg scroll-mt-28 lg:pt-56">
          <div className="container">
            <div className="max-w-2xl mb-16 md:mb-24">
              <Reveal>
                <SectionLabel className="opacity-75">{t('culturaisLabel')}</SectionLabel>
              </Reveal>
              <MaskReveal
                as="h2"
                className="font-display mb-5"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
              >
                {t.rich('culturaisTitleRich', { em })}
              </MaskReveal>
              <Reveal delay={0.15}>
                <p className="text-[var(--color-text-secondary)]">{t('culturaisText')}</p>
              </Reveal>
            </div>

            <div className="offset-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-16 md:pb-24">
              {culturais.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.1}>
                  <Parallax className="media aspect-[3/4] mb-6" amount={6}>
                    <Image
                      src={c.src}
                      alt={t(c.alt)}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </Parallax>
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
            Composição dos cartazes do branding (p28): Area em maiúsculas, o
            peso a fazer a hierarquia, réguas a separar. */}
        <section id="formacao" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('formacaoLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('formacaoTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)]">{t('formacaoText')}</p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <Button href="/contactos" variant="secondary" arrow>{t('formacaoCta')}</Button>
              </Reveal>
            </div>

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
            Texto assente sobre a fotografia, não ao lado dela. */}
        <section id="cti" className="scroll-mt-28 relative min-h-[85vh] flex items-end overflow-hidden">
          <Parallax inset amount={7}>
            <Image
              src="/images/figma-liturgy.jpg"
              alt={t('imgAltJovens')}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(8,8,10,0.30) 0%, rgba(8,8,10,0.08) 35%, rgba(8,8,10,0.50) 72%, rgba(8,8,10,0.84) 100%)',
            }}
          />

          <div className="container relative z-10 section-pad">
            <div className="max-w-2xl">
              <Reveal>
                <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                  {t('ctiLabel')}
                </SectionLabel>
              </Reveal>
              <MaskReveal
                as="h2"
                className="font-display text-[var(--color-text-inverse)] mb-6"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
              >
                {t.rich('ctiTitleRich', { em })}
              </MaskReveal>
              <Reveal delay={0.2}>
                <p
                  className="!text-[var(--color-text-inverse)] max-w-md mb-9"
                  style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}
                >
                  {t('ctiText')}
                </p>
                <Button
                  href="/contactos"
                  variant="secondary"
                  arrow
                  className="!border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)]"
                >
                  {t('ctiCta')}
                </Button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 6. RESERVAS NA SALA ──
            Bloco funcional e deliberadamente calmo, a seguir ao momento mais
            cheio da página. */}
        <section id="reservas" className="section-pad-lg scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-start">
              <div>
                <Reveal>
                  <SectionLabel className="opacity-75">{t('reservasLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
                >
                  {t.rich('reservasTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)] max-w-md mb-10">{t('reservasText')}</p>
                  <Button href="/contactos" arrow>{t('reservasCta')}</Button>
                </Reveal>
              </div>

              <Reveal delay={0.2} as="dl" className="flex flex-col border-t border-[var(--color-border-light)]">
                {reservas.map((r) => (
                  <div key={r.title} className="py-6 border-b border-[var(--color-border-light)]">
                    <dt className="label mb-1.5">{t(r.title)}</dt>
                    <dd className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {t(r.desc)}
                    </dd>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── NOTÍCIAS ──
            Não está no sitemap, mas é o destino do "Ver todas as notícias" da
            homepage — fica no fim, como remate. */}
        <section className="section-pad-lg bg-secondary">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-20">
              <div>
                <Reveal>
                  <SectionLabel className="mb-4 opacity-75">{t('newsLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
                >
                  {t.rich('newsTitleRich', { em })}
                </MaskReveal>
              </div>
              <Reveal delay={0.15}>
                <Button href="/vida-paroquia" variant="ghost" arrow>{t('newsCta')}</Button>
              </Reveal>
            </div>

            <div className="offset-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-12 md:pb-20" style={{ ['--offset-drop' as string]: '3rem' }}>
              {news.map((src, i) => (
                <Reveal as="article" key={src} delay={i * 0.1} className="group cursor-pointer">
                  <Parallax className="media aspect-[3/2] mb-5" amount={5}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </Parallax>
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
            <div className="border-t border-[var(--color-border)] pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
              <div>
                <Reveal>
                  <SectionLabel className="opacity-75">{t('ctaLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('ctaTitleRich', { em })}
                </MaskReveal>
              </div>
              <Reveal delay={0.15} className="flex flex-col gap-8 lg:items-end lg:text-right">
                <p className="text-[var(--color-text-secondary)] max-w-xs">
                  {t('ctaSubtitle')}
                </p>
                <Button href="/contactos" arrow>
                  {t('ctaButton')}
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
