import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/ui/Reveal'
import MaskReveal from '@/components/ui/MaskReveal'
import Parallax from '@/components/ui/Parallax'
import { POSTS, getPost, getRelacionados, tempoDeLeitura } from '@/lib/posts'

/** Pré-gera as rotas dos posts conhecidos. Com CMS, passa a consultar a
 *  origem de dados em vez de percorrer o array. */
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

const Seta = ({ className = '' }: { className?: string }) => (
  <svg
    width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor"
    strokeWidth="1" aria-hidden="true" className={`shrink-0 ${className}`}
  >
    <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* `params` é uma Promise nesta versão do Next — tem de ser esperado antes de
   se lhe tocar, como o layout já faz. Sem isto a rota estoira e devolve 404. */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return <Artigo n={post.n} src={post.src} slug={post.slug} />
}

/** Separado do default para poder usar hooks depois do notFound(). */
function Artigo({ n, src, slug }: { n: number; src: string; slug: string }) {
  const t = useTranslations('blog')

  const corpo = [t('corpoLead'), t('corpoP1'), t('corpoP2'), t('corpoP3'), t('corpoP4')]
  const minutos = tempoDeLeitura(...corpo)
  const relacionados = getRelacionados(slug)

  return (
    <>
      <Nav />

      <main>
        {/* ── CABEÇALHO ──
            Sem fotografia de fundo nem texto por cima: aqui o título é para
            ler, não para impressionar, e ganha mais em respirar sobre o creme
            do que em disputar contraste com uma imagem. A capa vem a seguir,
            já depois de se saber o que se vai ler. */}
        <header className="bg-secondary pt-36 md:pt-44 pb-14 md:pb-16">
          <div className="container">
            <Reveal>
              <Link
                href="/blog"
                className="label inline-flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity duration-200 mb-10 group/voltar"
              >
                <Seta className="rotate-180 transition-transform duration-300 group-hover/voltar:-translate-x-[3px]" />
                {t('detalheVoltar')}
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionLabel className="opacity-70">
                {t(`post${n}Cat` as 'post1Cat')}
              </SectionLabel>
            </Reveal>

            <MaskReveal
              as="h1"
              delay={0.1}
              className="font-display max-w-4xl mb-8"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 1.02,
                letterSpacing: 'var(--tracking-heading)',
              }}
            >
              {t(`post${n}Titulo` as 'post1Titulo')}
            </MaskReveal>

            {/* Autor · data · tempo de leitura. O tempo é calculado a partir
                do texto real do artigo, não um número escolhido à mão. */}
            <Reveal delay={0.2}>
              <p className="label opacity-70">
                {t('detalheAutor')} · {t(`post${n}Data` as 'post1Data')} · {minutos} {t('detalheTempo')}
              </p>
            </Reveal>
          </div>
        </header>

        {/* ── CAPA ── */}
        <div className="bg-secondary">
          <div className="container">
            <Reveal>
              <Parallax className="media aspect-[16/9] md:aspect-[2/1]" amount={5}>
                <Image
                  src={src}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>

        {/* ── CORPO ──
            Texto recuado numa coluna estreita, com a margem esquerda livre —
            é lá que a citação sai para fora, mais abaixo. */}
        <article className="bg-secondary section-pad-lg pt-14 md:pt-20">
          <div className="container">
            <div className="md:grid md:grid-cols-[8rem_1fr] md:gap-16">
              <div aria-hidden="true" />

              <div className="prose-artigo">
                <p className="lead-artigo">{t('corpoLead')}</p>
                <p>{t('corpoP1')}</p>
                <p>{t('corpoP2')}</p>

                <h3>{t('corpoSub')}</h3>
                <p>{t('corpoP3')}</p>
              </div>
            </div>

            {/* Citação a sair da coluna de texto para a margem, em Forevs —
                interrompe a leitura de propósito, como num artigo impresso. */}
            <Reveal className="my-14 md:my-20 md:pl-0 max-w-4xl">
              <blockquote className="pull-quote mb-3">
                “{t('corpoCitacao')}”
              </blockquote>
              <p className="quote-ref">{t('corpoCitacaoRef')}</p>
            </Reveal>

            <div className="md:grid md:grid-cols-[8rem_1fr] md:gap-16">
              <div aria-hidden="true" />
              <div className="prose-artigo">
                <p>{t('corpoP4')}</p>
              </div>
            </div>
          </div>
        </article>

        {/* ── CONTINUAR A LER ── */}
        <section className="section-pad-lg">
          <div className="container">
            <Reveal className="mb-12">
              <SectionLabel className="opacity-75">{t('relacionadosLabel')}</SectionLabel>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {relacionados.map((p, i) => (
                <Reveal as="article" key={p.slug} delay={i * 0.1} className="group">
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="relative media aspect-[16/9] mb-5 overflow-hidden">
                      <Image
                        src={p.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="label opacity-70 mb-2.5">
                      {t(`post${p.n}Cat` as 'post1Cat')} · {t(`post${p.n}Data` as 'post1Data')}
                    </p>
                    <h3
                      className="font-display group-hover:text-[var(--color-terracota)] transition-colors duration-300"
                      style={{ fontSize: 'var(--text-h3)', lineHeight: 1.2 }}
                    >
                      {t(`post${p.n}Titulo` as 'post1Titulo')}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-16 pt-10 border-t border-[var(--color-border-light)]">
              <Link
                href="/blog"
                className="label inline-flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity duration-200 group/todos"
              >
                <Seta className="rotate-180 transition-transform duration-300 group-hover/todos:-translate-x-[3px]" />
                {t('detalheVoltar')}
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
