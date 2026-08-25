import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { POSTS } from '@/lib/posts'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/ui/Reveal'
import MaskReveal from '@/components/ui/MaskReveal'
import Parallax from '@/components/ui/Parallax'

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

/* A lista passou para src/lib/posts.ts — a página de detalhe precisa dos
   mesmos dados, e duas cópias divergiriam à primeira alteração. */
const [DESTAQUE, ...RESTANTES] = POSTS

/**
 * GALERIA — CONTEÚDO PROVISÓRIO. Não são as imagens das publicações: é um
 * arquivo à parte, das fotografias da igreja. Ficam aqui em vez de em
 * lib/posts.ts porque não são posts e ninguém mais precisa delas.
 */
const GALERIA = [
  { n: 1, src: '/images/interior-nave.jpg' },
  { n: 2, src: '/images/figma-fresco.jpg' },
  { n: 3, src: '/images/cupula-torre.jpg' },
  { n: 4, src: '/images/figma-statue-mary.jpg' },
  { n: 5, src: '/images/figma-nave-aerial.jpg' },
  { n: 6, src: '/images/hero-fachada.jpg' },
] as const

export default function BlogPage() {
  const t = useTranslations('blog')

  return (
    <>
      <Nav />

      <main>

        {/* ── HERO ──
            Mais curto do que nas outras páginas: aqui o que interessa é
            chegar depressa às publicações, não demorar-se numa capa. */}
        <section className="relative min-h-[62vh] flex flex-col justify-end pb-14 md:pb-16 overflow-hidden">
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
                'linear-gradient(to bottom, rgba(8,8,10,0.48) 0%, rgba(8,8,10,0.14) 30%, rgba(8,8,10,0.34) 58%, rgba(8,8,10,0.70) 82%, rgba(8,8,10,0.88) 100%)',
            }}
          />

          <div className="container relative z-10">
            <MaskReveal delay={0.15}>
              <SectionLabel className="!text-[var(--color-text-inverse)] opacity-80 !mb-4">
                {t('heroLabel')}
              </SectionLabel>
            </MaskReveal>

            <MaskReveal as="h1" delay={0.25} className="mb-6">
              <span
                className="font-display block text-[var(--color-text-inverse)] max-w-4xl"
                style={{
                  fontSize: 'var(--text-h1)',
                  letterSpacing: 'var(--tracking-display)',
                  lineHeight: 1,
                }}
              >
                {t.rich('heroTitleRich', { em })}
              </span>
            </MaskReveal>

            <Reveal delay={0.5}>
              <p
                className="!text-[var(--color-text-inverse)] max-w-md"
                style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}
              >
                {t('heroSubtitle')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── DESTAQUE ──
            Uma só publicação, em imagem larga e com o texto assente por cima.
            É o único momento da página em que o título compete em tamanho com
            o do hero — é isso que a separa da listagem que vem a seguir. */}
        <section className="section-pad bg-secondary">
          <div className="container">
            <Reveal className="mb-8">
              <SectionLabel className="opacity-75">{t('destaqueEtiqueta')}</SectionLabel>
            </Reveal>

            {/* A fotografia está encostada à direita e o título arranca da
                margem da página, atravessando-lhe o rebordo. O texto é branco
                com mix-blend-difference: sobre o creme inverte-se para um tom
                quase igual ao navy da marca, sobre a foto fica claro — a mesma
                palavra muda de cor ao cruzar a fronteira, sem precisar de dois
                elementos sobrepostos.
                Só a partir de md: em ecrã estreito não há margem por onde o
                título saia, por isso ele assenta simplesmente por baixo. */}
            <Reveal as="article" delay={0.1} className="group">
              <Link href={`/blog/${DESTAQUE.slug}`} className="block">
                <div className="relative">
                  <div className="md:ml-auto md:w-[74%]">
                    <div className="relative media aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                      <Parallax inset amount={5}>
                        <Image
                          src={DESTAQUE.src}
                          alt=""
                          fill
                          priority
                          sizes="(min-width: 768px) 74vw, 100vw"
                          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                        />
                      </Parallax>

                      {/* Véu só na banda inferior, onde o título passa. Sem ele
                          o resultado do blend fica à mercê da fotografia: sobre
                          uma zona clara — o altar, nesta — a diferença dá um
                          tom lavado e o título perde-se. Com o véu, a faixa por
                          onde o título cruza é sempre escura, e o efeito é o
                          mesmo seja qual for a imagem que venha do CMS. */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to bottom, rgba(8,8,10,0) 42%, rgba(8,8,10,0.55) 72%, rgba(8,8,10,0.78) 100%)',
                        }}
                      />
                    </div>
                  </div>

                  <h2
                    className="font-display mt-6 md:mt-0 md:absolute md:left-0 md:bottom-[8%] md:z-10 md:mix-blend-difference md:text-white md:pr-[6%]"
                    style={{
                      fontSize: 'var(--text-h1)',
                      lineHeight: 1,
                      letterSpacing: 'var(--tracking-heading)',
                    }}
                  >
                    {t('post1Titulo')}
                  </h2>
                </div>

                {/* Meta e resumo ficam no creme, por baixo: sobre a imagem
                    obrigariam a um véu que rouba contraste ao título. */}
                <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-16 items-start">
                  <p className="label opacity-70">
                    {t('post1Cat')} · {t('post1Data')}
                  </p>
                  <div>
                    <p className="lead text-[var(--color-text-secondary)] max-w-xl mb-6">
                      {t('post1Resumo')}
                    </p>
                    <span className="label inline-flex items-center gap-2.5">
                      {t('lerMais')}
                      <svg
                        width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor"
                        strokeWidth="1" aria-hidden="true"
                        className="shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-[3px]"
                      >
                        <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── LISTAGEM ──
            Grelha regular e sem hierarquia interna: depois do destaque, todas
            as publicações valem o mesmo e o que se pede à página é deixar
            percorrer. */}
        <section className="section-pad-lg">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <Reveal>
                  <SectionLabel className="opacity-75">{t('listagemLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
                >
                  {t.rich('listagemTitleRich', { em })}
                </MaskReveal>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
              {RESTANTES.map((p, i) => (
                <Reveal as="article" key={p.n} delay={(i % 3) * 0.08} className="group">
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="relative media aspect-[4/3] mb-5 overflow-hidden">
                      <Image
                        src={p.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>

                    <p className="label opacity-70 mb-2.5">
                      {t(`post${p.n}Cat` as 'post2Cat')} · {t(`post${p.n}Data` as 'post2Data')}
                    </p>
                    <h3
                      className="font-display group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                      style={{ fontSize: 'var(--text-h3)', lineHeight: 1.2 }}
                    >
                      {t(`post${p.n}Titulo` as 'post2Titulo')}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Paginação por fazer — só faz sentido quando houver conteúdo
                real e uma origem de dados que saiba quantos posts existem. */}
            <Reveal delay={0.2} className="mt-16 md:mt-20 pt-10 border-t border-[var(--color-border-light)]">
              <Button href="/blog" variant="ghost" arrow>{t('listagemLabel')}</Button>
            </Reveal>
          </div>
        </section>

        {/* ── PARTILHAS DE IMAGENS ──
            Fica depois da listagem, não antes: a página tem de abrir nas
            publicações, que é o que se vem cá procurar. Como remate, o
            arquivo de fotografias funciona bem.
            Tira horizontal em vez de grelha — a galeria é para percorrer, não
            para comparar, e sangra pela margem direita a dizer que há mais
            sem precisar de setas. Padrão do moodboard (Dar Elyah). */}
        <section id="galeria" className="section-pad-lg bg-secondary scroll-mt-28 overflow-hidden">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-8 mb-12 md:mb-14">
              <div className="max-w-xl">
                <Reveal>
                  <SectionLabel className="opacity-75">{t('galeriaLabel')}</SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display mb-5"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
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

      </main>
      <Footer />
    </>
  )
}
