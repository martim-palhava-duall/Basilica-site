import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import HomeLogo from '@/components/home/HomeLogo'
import HomeTopButtons from '@/components/home/HomeTopButtons'
import Seta from '@/components/home/Seta'
import HeroArranque from '@/components/home/HeroArranque'

/**
 * Hero da homepage — design novo (Figma, nó 173:3884), desktop 1440.
 *
 * Ocupa o ecrã todo (100svh), sem scroll. No desenho tem 900 de altura, que é
 * o ecrã de referência; para o ecrã ter outra altura, tudo o que está na parte
 * de baixo (título, CTAs, cartão) está ancorado ao fundo e o que está em cima
 * (logótipo, botões) ao topo — assim, com 900, as medidas são exatamente as do
 * Figma, e com outra altura o espaço extra fica no meio, sobre a fotografia.
 *
 * Os títulos usam `text-box: trim-both cap alphabetic`, como no Figma: a caixa
 * de cada linha é só a altura das maiúsculas, e é o centro dessa caixa que
 * fica na coordenada do design.
 *
 * Entrada: coreografia só em CSS (ver "entrada do hero" em globals.css),
 * arrancada por HeroArranque quando a fotografia e a fonte estão prontas.
 *
 * Hovers (o desenho não os define): botões de contorno enchem-se de bege, os
 * cheios trocam de cor, as setas avançam; o cartão do evento enche-se de azul
 * e a seta sai e volta a entrar.
 */
export default function HomeHero() {
  const t = useTranslations('inicio')

  return (
    <section data-hero="espera" suppressHydrationWarning data-barra="var(--bege-claro-2)" className="relative w-full h-svh min-h-[calc(640*var(--u))] overflow-hidden bg-[var(--azul-escuro)]">
      <Image src="/home/hero.jpg" alt="" fill priority sizes="100vw" className="hero-foto object-cover" />
      <HeroArranque />

      {/* Gradiente do Figma (nó 173:3885) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(8,8,10,0.56) 16.286%, rgba(8,8,10,0.096) 31.78%, rgba(8,8,10,0.144) 44.672%, rgba(8,8,10,0.256) 65.466%, rgba(8,8,10,0.576) 91.625%)',
        }}
      />

      {/* Logótipo: fixo, encolhe com o scroll (ver HomeLogo) */}
      <HomeLogo />

      {/* Menu + Visitar */}
      <HomeTopButtons />

      {/* Título: duas linhas desencontradas. Centros a 323 e 222 do fundo
          (577 e 678 num ecrã de 900); a segunda subiu 16 em relação ao Figma
          (206) para as duas linhas se lerem como uma só frase. */}
      <h1 className="hero-titulo text-[var(--bege-claro-2)]">
        <span className="hero-janela left-[calc(32*var(--u))]" style={{ top: 'calc(100% - 323 * var(--u))' }}>
          <span className="hero-linha w-[calc(998.39*var(--u))]">{t('heroLinha1')}</span>
        </span>
        <span className="hero-janela left-[calc(113*var(--u))]" style={{ top: 'calc(100% - 222 * var(--u))' }}>
          <span className="hero-linha w-[calc(886.39*var(--u))]">{t('heroLinha2')}</span>
        </span>
      </h1>

      {/* CTAs: 47.8 de altura, a 61.8 do fundo (790.4 num ecrã de 900) */}
      {/* Mobile: a 20 das margens e a 32 do fundo */}
      <div className="hero-cta absolute left-[calc(32*var(--u))] bottom-[calc(61.8*var(--u))] max-lg:left-[calc(20*var(--u))] max-lg:bottom-[calc(32*var(--u))] max-lg:gap-[calc(10*var(--u))] flex gap-[calc(15.91*var(--u))] h-[calc(47.8*var(--u))]">
        <Link
          href="/basilica-e-convento"
          className="group/btn flex items-center gap-[calc(11.91*var(--u))] px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--vermelho)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[#f9f5f0] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
        >
          {t('heroCtaVisita')}
          <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
        </Link>
        <Link
          href="/sobre-a-basilica"
          className="btn-luz flex items-center px-[calc(29.6*var(--u))] py-[calc(14.4*var(--u))] rounded-[calc(4*var(--u))] border border-solid border-[rgba(249,246,243,0.45)] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] whitespace-nowrap text-[var(--bege-claro-2)] transition-[background-color,color,border-color] duration-[400ms] ease-[var(--ease-out)]"
        >
          {t('heroCtaSaber')}
        </Link>
      </div>

      {/* Cartão de evento: 212 de largura, 62 do fundo, 32 da direita. No mobile
          não cabe com o título e os botões: fica só no desktop. */}
      <Link
        href="/blog/celebracao-da-missa-do-galo"
        className="hero-cartao group/card max-lg:hidden absolute right-[calc(32*var(--u))] bottom-[calc(62*var(--u))] w-[calc(212*var(--u))] p-[calc(4*var(--u))] rounded-[calc(4*var(--u))] overflow-hidden flex flex-col gap-[calc(10*var(--u))] bg-[rgba(28,43,57,0.6)] transition-colors duration-[450ms] ease-[var(--ease-out)] hover:bg-[var(--azul-escuro)]"
      >
        <div className="flex flex-col gap-[calc(8*var(--u))] items-center w-full">
          <div className="relative h-[calc(120*var(--u))] w-full rounded-[calc(2*var(--u))] overflow-hidden">
            <div className="absolute left-0 w-full" style={{ top: '-10.89%', height: '113.31%' }}>
              <Image src="/home/hero-evento.jpg" alt="" fill sizes="204px" className="object-cover" />
            </div>
          </div>
          <div className="flex items-end justify-between pb-[calc(4*var(--u))] w-full">
            <div className="flex flex-col gap-[calc(4*var(--u))] w-[calc(179*var(--u))]">
              <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] text-[rgba(255,255,255,0.6)]">{t('heroEventoMeta')}</p>
              <p className="font-display text-[length:calc(20*var(--u))] leading-none text-white" style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}>
                {t('heroEventoTitulo')}
              </p>
            </div>

            {/* Seta: ao passar, a atual sai para a direita e outra entra pela
                esquerda. Duas cópias dentro de uma janela que corta o excesso. */}
            <span className="relative block w-[calc(14*var(--u))] h-[calc(8*var(--u))] shrink-0 overflow-hidden" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/seta-curta.svg"
                alt=""
                width={14}
                height={8}
                className="absolute inset-0 h-full w-full transition-transform duration-500 ease-[var(--ease-out)] group-hover/card:translate-x-[160%]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/seta-curta.svg"
                alt=""
                width={14}
                height={8}
                className="absolute inset-0 h-full w-full -translate-x-[160%] transition-transform duration-500 ease-[var(--ease-out)] group-hover/card:translate-x-0"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  )
}
