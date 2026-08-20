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
import ContactForm from '@/components/ui/ContactForm'

const em = (chunks: ReactNode) => <em className="em-italic">{chunks}</em>

const INSTAGRAM = '@basilicadaestrela'
const INSTAGRAM_URL = 'https://instagram.com/basilicadaestrela'

/** Secções pela ordem do sitemap (nó "Contactos", 2960:1017). */
/* O formulário deixou de ser secção própria — vive dentro de "Contacto Geral",
   ao lado dos dados diretos — por isso saiu do índice. A âncora #formulario
   continua a existir no bloco, para quem chegue por link direto. */
const SECTIONS = [
  { id: 'geral', label: 'geralLabel' },
  { id: 'fe',    label: 'feLabel' },
  { id: 'redes', label: 'redesLabel' },
]

export default function ContactosPage() {
  const t = useTranslations('contactos')
  // Morada, telefone e email vivem no rodapé e são lidos de lá — aparecem em
  // todas as páginas, não podem ter duas versões.
  const tf = useTranslations('footer')
  // Horários do cartório e das confissões: fonte única, como no resto do site.
  const thr = useTranslations('horarios')

  const rail = SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }))
  const email = tf('email')
  const telefone = tf('telefone')

  return (
    <>
      <Nav />
      <SectionRail sections={rail} />

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[80vh] flex flex-col justify-end pb-14 md:pb-20 overflow-hidden">
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

        {/* ── 1. CONTACTO GERAL + FORMULÁRIO ──
            Numa só secção, lado a lado. Antes o formulário era a terceira
            secção e ficava a dois ecrãs de distância — longe demais para o
            gesto principal da página. Empurrá-lo para cima sozinho apenas
            inverteria o problema, deixando quem só quer o telefone a passar
            por cima de um formulário. Ao pô-los a par, nenhum dos dois fica
            enterrado: o formulário abre a secção e os dados diretos estão à
            mesma altura, do lado. */}
        <section id="geral" className="section-pad-lg bg-secondary scroll-mt-28">
          <div className="container">
            <div className="max-w-2xl mb-14 md:mb-16">
              <Reveal>
                <SectionLabel className="opacity-75">{t('geralLabel')}</SectionLabel>
              </Reveal>
              <MaskReveal
                as="h2"
                className="font-display mb-5"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.05 }}
              >
                {t.rich('geralTitleRich', { em })}
              </MaskReveal>
              <Reveal delay={0.15}>
                <p className="text-[var(--color-text-secondary)]">{t('geralText')}</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-24 items-start border-t border-[var(--color-border)] pt-12">
              {/* Formulário — o gesto principal, por isso abre a secção */}
              <div id="formulario" className="scroll-mt-28">
                <Reveal>
                  <p className="schedule-head mb-3">{t('formLabel')}</p>
                  <h3
                    className="font-display mb-4"
                    style={{ fontSize: 'var(--text-h3b)', lineHeight: 1.1, letterSpacing: '-0.005em' }}
                  >
                    {t.rich('formTitleRich', { em })}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm max-w-sm mb-10">
                    {t('formText')}
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <ContactForm destino={email} />
                </Reveal>
              </div>

              {/* Dados diretos — empilhados, à mesma altura do formulário.
                  Telefone e email como links reais: em telemóvel um disca e o
                  outro abre o cliente já endereçado. */}
              <Reveal delay={0.2} className="lg:border-l lg:border-[var(--color-border-light)] lg:pl-16">
                <dl className="flex flex-col">
                  <div className="pb-7">
                    <dt className="schedule-head mb-3">{t('telefoneHead')}</dt>
                    <dd>
                      <a
                        href={`tel:${telefone.replace(/\s/g, '')}`}
                        className="font-display hover:text-[var(--color-terracota)] transition-colors duration-300"
                        style={{ fontSize: 'var(--text-h3)', lineHeight: 1.15 }}
                      >
                        {telefone}
                      </a>
                    </dd>
                  </div>

                  <div className="py-7 border-t border-[var(--color-border-light)]">
                    <dt className="schedule-head mb-3">{t('emailHead')}</dt>
                    <dd>
                      <a
                        href={`mailto:${email}`}
                        className="font-display break-words hover:text-[var(--color-terracota)] transition-colors duration-300"
                        style={{ fontSize: 'var(--text-body-lg)', lineHeight: 1.3 }}
                      >
                        {email}
                      </a>
                    </dd>
                  </div>

                  <div className="py-7 border-t border-[var(--color-border-light)]">
                    <dt className="schedule-head mb-3">{t('moradaHead')}</dt>
                    <dd>
                      <address className="not-italic whitespace-pre-line text-[var(--color-text-secondary)] leading-relaxed">
                        {tf('morada')}
                      </address>
                    </dd>
                  </div>

                  <div className="pt-7 border-t border-[var(--color-border-light)]">
                    <dt className="schedule-head mb-3">{t('atendimentoHead')}</dt>
                    <dd>
                      <p className="schedule-time">{thr('cartorioHoras')}</p>
                      <p className="schedule-desc">{thr('cartorioDias')}</p>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. CONTACTO FÉ ──
            Faixa escura para separar do administrativo: são pedidos de outra
            natureza e não devem ler-se como mais uma linha da tabela.
            Não inventei um contacto próprio — a paróquia não deu nenhum — por
            isso a secção encaminha pelo que existe: os horários de confissão e
            o secretariado. */}
        <section id="fe" className="section-pad-lg bg-dark scroll-mt-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
              <div>
                <Reveal>
                  <SectionLabel className="!text-[var(--color-text-inverse)] opacity-85">
                    {t('feLabel')}
                  </SectionLabel>
                </Reveal>
                <MaskReveal
                  as="h2"
                  className="font-display text-[var(--color-text-inverse)] mb-6"
                  style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
                >
                  {t.rich('feTitleRich', { em })}
                </MaskReveal>
                <Reveal delay={0.15}>
                  <p className="text-[var(--color-text-on-dark)] max-w-lg leading-relaxed mb-9">
                    {t('feText')}
                  </p>
                  <Button
                    href="/celebracoes"
                    variant="secondary"
                    arrow
                    className="!border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)]"
                  >
                    {t('feCta')}
                  </Button>
                </Reveal>
              </div>

              <Reveal delay={0.2} className="flex flex-col gap-8 w-full">
                <div className="border-t border-[var(--color-text-inverse)]/20 pt-6">
                  <p className="schedule-head !text-[var(--color-text-on-dark)] mb-3">
                    {t('feConfissoesHead')}
                  </p>
                  <p className="schedule-time !text-[var(--color-text-inverse)]">{thr('confissoesDomHoras')}</p>
                  <p className="schedule-desc !text-[var(--color-text-on-dark)] mb-4">{thr('confissoesDomDias')}</p>
                  <p className="schedule-time !text-[var(--color-text-inverse)]">{thr('confissoesSemHoras')}</p>
                  <p className="schedule-desc !text-[var(--color-text-on-dark)]">{thr('confissoesSemDias')}</p>
                </div>

                <div className="border-t border-[var(--color-text-inverse)]/20 pt-6">
                  <p className="schedule-head !text-[var(--color-text-on-dark)] mb-3">
                    {t('feUrgenciaHead')}
                  </p>
                  <p className="text-[var(--color-text-on-dark)] text-sm leading-relaxed">
                    {t('feUrgencia')}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. REDES SOCIAIS ── */}
        <section id="redes" className="scroll-mt-28 bg-secondary overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <Reveal className="flex flex-col justify-center section-pad px-[var(--container-pad)] lg:pl-[max(var(--container-pad),calc((100vw-var(--container-max))/2+var(--container-pad)))]">
              <SectionLabel className="opacity-75">{t('redesLabel')}</SectionLabel>
              <h2
                className="font-display mb-5 max-w-lg"
                style={{ fontSize: 'var(--text-h1b)', letterSpacing: 'var(--tracking-heading)', lineHeight: 1.1 }}
              >
                {t.rich('redesTitleRich', { em })}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-md mb-9">{t('redesText')}</p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/ig inline-flex items-center gap-3 self-start font-display hover:text-[var(--color-terracota)] transition-colors duration-300"
                style={{ fontSize: 'var(--text-h3)', lineHeight: 1.15 }}
              >
                {INSTAGRAM}
                <svg
                  width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor"
                  strokeWidth="1" aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover/ig:translate-x-[3px]"
                >
                  <path d="M0 5h13M9.5 1.5 13 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>

            <Parallax className="w-full min-h-[46vh] lg:min-h-[64vh] order-first lg:order-last" amount={8}>
              <Image
                src="/images/figma-nave-wide.jpg"
                alt={t('imgAltHero')}
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
