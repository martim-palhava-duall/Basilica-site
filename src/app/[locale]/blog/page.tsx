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

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

/**
 * CONTEÚDO PROVISÓRIO — os sete posts abaixo são exemplos, não conteúdo real
 * da paróquia. Estão num único array de propósito: quando houver CMS, o que
 * muda é a origem destes dados, não o resto da página. O primeiro é o
 * destaque; os restantes formam a listagem.
 */
const POSTS = [
  { n: 1, src: '/images/figma-liturgy.jpg' },
  { n: 2, src: '/images/figma-icon-priest2.jpg' },
  { n: 3, src: '/images/destaque-celebracao.jpg' },
  { n: 4, src: '/images/figma-fresco.jpg' },
  { n: 5, src: '/images/figma-nave-aerial.jpg' },
  { n: 6, src: '/images/figma-statue-mary.jpg' },
  { n: 7, src: '/images/figma-icon-chalice.jpg' },
] as const

const [DESTAQUE, ...RESTANTES] = POSTS

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

            <Reveal as="article" delay={0.1} className="group">
              <a href="/blog" className="block">
                <div className="relative media aspect-[4/3] md:aspect-[21/9] overflow-hidden">
                  <Parallax inset amount={5}>
                    <Image
                      src={DESTAQUE.src}
                      alt=""
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                    />
                  </Parallax>

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(8,8,10,0.20) 0%, rgba(8,8,10,0.05) 40%, rgba(8,8,10,0.58) 80%, rgba(8,8,10,0.84) 100%)',
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
                    <p className="label !text-[var(--color-text-inverse)] opacity-85 mb-3">
                      {t('post1Cat')} · {t('post1Data')}
                    </p>
                    <h2
                      className="font-display text-[var(--color-text-inverse)] max-w-3xl mb-4"
                      style={{ fontSize: 'var(--text-h1b)', lineHeight: 1.05, letterSpacing: 'var(--tracking-heading)' }}
                    >
                      {t('post1Titulo')}
                    </h2>
                    <p
                      className="!text-[var(--color-text-inverse)] opacity-90 max-w-xl hidden md:block"
                      style={{ fontFamily: 'var(--font-body-light)', fontWeight: 300, lineHeight: 1.6 }}
                    >
                      {t('post1Resumo')}
                    </p>
                  </div>
                </div>
              </a>
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
                  <a href="/blog" className="block">
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
                  </a>
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

      </main>
      <Footer />
    </>
  )
}
