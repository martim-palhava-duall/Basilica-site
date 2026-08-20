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

/** Secções pela ordem do sitemap (nó "Blog", 2960:998). */
const SECTIONS = [
  { id: 'publicacoes', label: 'publicacoesLabel' },
  { id: 'galeria',     label: 'galeriaLabel' },
  { id: 'artigos',     label: 'artigosLabel' },
]

/**
 * CONTEÚDO PROVISÓRIO — as publicações, imagens e artigos abaixo são
 * exemplos, não conteúdo real da paróquia. Estão reunidos nestes três
 * arrays de propósito: quando houver CMS, o que muda é a origem destes
 * dados, não o resto da página.
 */
const POSTS = [
  { n: 1, src: '/images/figma-liturgy.jpg' },
  { n: 2, src: '/images/figma-icon-priest2.jpg' },
  { n: 3, src: '/images/destaque-celebracao.jpg' },
] as const

const GALERIA = [
  { n: 1, src: '/images/interior-nave.jpg' },
  { n: 2, src: '/images/figma-fresco.jpg' },
  { n: 3, src: '/images/cupula-torre.jpg' },
  { n: 4, src: '/images/figma-statue-mary.jpg' },
  { n: 5, src: '/images/figma-nave-aerial.jpg' },
  { n: 6, src: '/images/hero-fachada.jpg' },
] as const

const ARTIGOS = [1, 2, 3, 4] as const

export default function BlogPage() {
  const t = useTranslations('blog')
  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))

  return (
    <>
      <Nav />
      <SectionRail sections={rail} />

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[78vh] flex flex-col justify-end pb-14 md:pb-20 overflow-hidden">
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
                'linear-gradient(to bottom, rgba(8,8,10,0.48) 0%, rgba(8,8,10,0.12) 28%, rgba(8,8,10,0.28) 55%, rgba(8,8,10,0.66) 80%, rgba(8,8,10,0.86) 100%)',
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

        {/* ── 1. PUBLICAÇÕES ──
            Uma em destaque, grande e na horizontal, e as outras a seguir em
            coluna — o desequilíbrio é o que faz um feed parecer um feed, em
            vez de três cartões iguais. */}
        <section id="publicacoes" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8 mb-14 md:mb-16">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('publicacoesLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('publicacoesTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)]">{t('publicacoesText')}</p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <Button href="/blog" variant="ghost" arrow>{t('verTodas')}</Button>
              </Reveal>
            </div>

            {/* Destaque */}
            <Reveal as="article" className="group grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-14 items-center mb-16 md:mb-20">
              <Parallax className="media aspect-[16/10]" amount={6}>
                <Image
                  src={POSTS[0].src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </Parallax>

              <div>
                <p className="label opacity-70 mb-4">
                  {t('destaqueEtiqueta')} · {t('post1Cat')} · {t('post1Data')}
                </p>
                <h3
                  className="font-display mb-4 group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                  style={{ fontSize: 'var(--text-h1b)', lineHeight: 1.1, letterSpacing: 'var(--tracking-heading)' }}
                >
                  {t('post1Titulo')}
                </h3>
                <p className="text-[var(--color-text-secondary)] max-w-md leading-relaxed mb-7">
                  {t('post1Resumo')}
                </p>
                <Button href="/blog" variant="ghost" arrow>{t('lerMais')}</Button>
              </div>
            </Reveal>

            {/* Restantes, em linhas com régua */}
            <div className="border-t border-[var(--color-border-light)]">
              {POSTS.slice(1).map((p, i) => (
                <Reveal
                  as="article"
                  key={p.n}
                  delay={i * 0.1}
                  y={20}
                  className="group grid grid-cols-[5rem_1fr] md:grid-cols-[10rem_1fr_9rem] items-center gap-x-6 md:gap-x-10 border-b border-[var(--color-border-light)] py-6"
                >
                  <div className="relative media aspect-[3/2]">
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="10rem"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="label opacity-70 mb-2">
                      {t(`post${p.n}Cat` as 'post2Cat')} · {t(`post${p.n}Data` as 'post2Data')}
                    </p>
                    <h3
                      className="font-display group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                      style={{ fontSize: 'var(--text-h3)', lineHeight: 1.15 }}
                    >
                      {t(`post${p.n}Titulo` as 'post2Titulo')}
                    </h3>
                  </div>

                  <span className="hidden md:inline-flex label opacity-70 items-center gap-2.5 justify-self-end">
                    {t('lerMais')}
                    <svg
                      width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor"
                      strokeWidth="1" aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-[3px]"
                    >
                      <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. PARTILHAS DE IMAGENS ──
            Tira horizontal em vez de grelha: a galeria é para percorrer, não
            para comparar, e assim sangra pela margem direita a dizer que há
            mais. Padrão vindo do moodboard (Dar Elyah). */}
        <section id="galeria" className="section-pad-lg scroll-mt-28 overflow-hidden">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8 mb-12 md:mb-14">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('galeriaLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
                >
                  {t.rich('galeriaTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-secondary)]">{t('galeriaText')}</p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <p className="label opacity-60">{t('galeriaNota')} →</p>
              </Reveal>
            </div>
          </div>

          {/* fora do .container: a tira tem de poder sangrar até à margem */}
          <Reveal>
            <ul className="filmstrip">
              {GALERIA.map((g) => (
                <li key={g.n}>
                  <figure className="group">
                    <div className="relative media aspect-[4/5]">
                      <Image
                        src={g.src}
                        alt={t(`img${g.n}` as 'img1')}
                        fill
                        sizes="(min-width: 768px) 30vw, 80vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption className="label opacity-70 mt-4">
                      <span className="opacity-60 mr-2">{String(g.n).padStart(2, '0')}</span>
                      {t(`img${g.n}` as 'img1')}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ── 3. ARTIGOS ──
            Sem imagens, de propósito: os textos longos distinguem-se do feed
            por serem só tipografia — título, autor e tempo de leitura. */}
        <section id="artigos" className="section-pad-lg bg-dark scroll-mt-28">
          <div className="container">
            <div className="max-w-xl mb-14 md:mb-16">
              <Reveal>
                <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                  {t('artigosLabel')}
                </SectionLabel>
              </Reveal>
              <MaskReveal
                as="h2"
                className="font-display text-[var(--color-text-inverse)] mb-5"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
              >
                {t.rich('artigosTitleRich', { em })}
              </MaskReveal>
              <Reveal delay={0.15}>
                <p className="text-[var(--color-text-on-dark)]">{t('artigosText')}</p>
              </Reveal>
            </div>

            <div className="border-t border-[var(--color-text-inverse)]/20">
              {ARTIGOS.map((n, i) => (
                <Reveal
                  as="article"
                  key={n}
                  delay={i * 0.08}
                  y={20}
                  className="group grid grid-cols-1 md:grid-cols-[4rem_1fr_auto] items-baseline gap-x-8 gap-y-2 border-b border-[var(--color-text-inverse)]/20 py-7 md:py-9"
                >
                  <span className="label !text-[var(--color-text-on-dark)] opacity-60 tabular-nums">
                    {String(n).padStart(2, '0')}
                  </span>

                  <h3
                    className="font-display text-[var(--color-text-inverse)] transition-opacity duration-300 group-hover:opacity-70"
                    style={{ fontSize: 'var(--text-h3b)', lineHeight: 1.15, letterSpacing: '-0.005em' }}
                  >
                    {t(`artigo${n}Titulo` as 'artigo1Titulo')}
                  </h3>

                  <p className="label !text-[var(--color-text-on-dark)] opacity-70 md:text-right whitespace-nowrap">
                    {t(`artigo${n}Autor` as 'artigo1Autor')} · {t(`artigo${n}Data` as 'artigo1Data')} ·{' '}
                    {t(`artigo${n}Min` as 'artigo1Min')} {t('artigoTempo')}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
