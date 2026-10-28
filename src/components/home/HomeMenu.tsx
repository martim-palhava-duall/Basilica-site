'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import { useMenu } from '@/components/home/MenuContext'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'
import { BILHETEIRA, externo } from '@/lib/links'

/**
 * Menu de ecrã — design novo (Figma, nó 111:148), desktop 1440.
 *
 * Painel branco de 566px de altura que desce do topo, com um véu escuro por
 * trás a 20%. As medidas são as do desenho; as posições horizontais mantêm as
 * expressões em percentagem do Figma (25% + 21px, 50% + 10px, 75%...), que a
 * 1440 dão os valores certos e a outras larguras acompanham o ecrã.
 *
 * Ordem (pedido do cliente): Home, Sobre, Vida da Paróquia, Visitar, Celebrar,
 * Obra, Donativos, Notícias, Contactos; lê-se da coluna 1 para a 2.
 *
 * Destinos provisórios: o desenho tem "Sobre a Basílica" e "Visitar" como
 * entradas separadas, mas as páginas novas ainda não existem — as duas apontam
 * para a página da Basílica, "Visitar" na secção do mesmo nome.
 */
const COL1: [string, string][] = [
  ['menuHome', '/'],
  ['menuSobre', '/sobre-a-basilica'],
  ['menuVida', '/vida-paroquia'],
  ['menuVisitar', '/basilica-e-convento'],
  ['menuCelebracoes', '/celebracoes'],
]
const COL2: [string, string][] = [
  ['menuObra', '/obra-social'],
  ['menuDonativos', '/donativos'],
  ['menuNoticias', '/blog'],
  ['menuContactos', '/contactos'],
]

export default function HomeMenu() {
  const t = useTranslations('inicio')
  const th = useTranslations('horarios')
  const { aberto, fechar } = useMenu()
  const fecharRef = useRef<HTMLButtonElement>(null)
  const fecharMobRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Foco no botão "Fechar" do painel que está à vista (desktop ou mobile)
  useEffect(() => {
    if (!aberto) return
    const visivel = [fecharRef.current, fecharMobRef.current].find((b) => b?.checkVisibility({ visibilityProperty: true }))
    visivel?.focus({ preventScroll: true })
  }, [aberto])

  /**
   * Entrada escalonada: cada bloco sobe e aparece com um atraso próprio, a
   * começar depois de o painel ter descido. Ao fechar não há atrasos nem
   * deslize — o conteúdo só se desvanece, mais depressa do que entrou.
   */
  // Na hero da homepage o logótipo ainda está a diminuir quando o painel chega, e
  // o texto espera que acabe para não passar por cima dele. Para a animação ser
  // sempre igual, em todas as páginas, a espera é a mesma, mesmo onde o
  // logótipo já é pequeno.
  const esperaLogo = 450
  const entra = (atrasoMs: number): CSSProperties => ({
    opacity: aberto ? 1 : 0,
    transform: aberto ? 'none' : 'translateY(calc(24 * var(--u)))',
    transition: aberto
      ? `opacity 600ms var(--ease-out) ${atrasoMs + esperaLogo}ms, transform 800ms var(--ease-out) ${atrasoMs + esperaLogo}ms`
      : 'opacity 250ms var(--ease-out), transform 250ms var(--ease-out)',
  })

  return (
    <>
    <div
      id="home-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t('menuAria')}
      inert={!aberto}
      className="fixed inset-0 z-[44] max-lg:hidden"
      // Visível de imediato ao abrir (senão o foco não entra) e só invisível
      // depois de a animação de saída acabar.
      style={{
        visibility: aberto ? 'visible' : 'hidden',
        transition: `visibility 0s linear ${aberto ? '0s' : '0.8s'}`,
      }}
    >
      {/* Véu: azul-escuro (#121c24) a 20% */}
      <div
        aria-hidden="true"
        onClick={fechar}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: 'rgba(18,28,36,0.2)', opacity: aberto ? 1 : 0 }}
      />

      {/* Painel */}
      <div
        className="absolute left-0 top-0 w-full h-[calc(566*var(--u))] bg-white overflow-hidden"
        style={{
          transform: aberto ? 'translateY(0)' : 'translateY(-100%)',
          transition: `transform ${aberto ? 750 : 550}ms var(--ease-inout)`,
        }}
      >
        {/* ── Barra do topo: 88px, com régua em baixo ── */}
        <div className="absolute left-0 top-0 w-full h-[calc(88*var(--u))] border-b border-solid border-[rgba(27,43,57,0.07)]">
          {/* O logótipo vive fora do painel (HomeLogo) e desce para aqui. */}
          <div
            className="absolute right-[calc(32*var(--u))] flex items-center gap-[calc(12*var(--u))]"
            style={{ top: 'calc(50% + 0.1px)', transform: 'translateY(-50%)' }}
          >
            <span className="flex opacity-85 hover:opacity-100 transition-opacity duration-[400ms]">
              <button
                ref={fecharRef}
                type="button"
                onClick={fechar}
                className="btn-luz h-[calc(32*var(--u))] px-[calc(20*var(--u))] flex items-center rounded-[calc(6*var(--u))] border border-solid border-[var(--texto-escuro)] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] text-[var(--texto-escuro)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
              >
                {t('menuFechar')}
              </button>
            </span>
            <Link
              href="/basilica-e-convento"
              onClick={fechar}
              className="btn-luz h-[calc(32*var(--u))] px-[calc(20*var(--u))] flex items-center rounded-[calc(4*var(--u))] bg-[var(--texto-escuro)] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] text-[rgba(247,242,238,0.85)] transition-[background-color,color] duration-[400ms] ease-[var(--ease-out)]"
            >
              {t('menuVisitar')}
            </Link>
          </div>
        </div>

        {/* Régua vertical antes da coluna da fotografia */}
        <div
          aria-hidden="true"
          className="absolute w-px bg-[rgba(27,43,57,0.07)]"
          style={{ top: u(88), bottom: 0, left: 'calc(66.67% + 87 * var(--u))' }}
        />

        {/* ── Coluna 1 ── */}
        <ul className="menu-lista absolute top-[calc(120*var(--u))] w-[calc(329*var(--u))] flex flex-col gap-[calc(32*var(--u))]" style={{ left: u(32) }}>
          {COL1.map(([chave, href], i) => (
            <li key={chave} style={entra(260 + i * 60)}>
              <Link href={href} {...externo(href)} onClick={fechar} className="menu-link">{t(chave)}</Link>
            </li>
          ))}
        </ul>

        {/* ── Coluna 2 ── */}
        <ul className="menu-lista absolute top-[calc(120*var(--u))] w-[calc(329*var(--u))] flex flex-col gap-[calc(32*var(--u))]" style={{ left: 'calc(25% + 21 * var(--u))' }}>
          {COL2.map(([chave, href], i) => (
            <li key={chave} style={entra(320 + i * 60)}>
              <Link href={href} onClick={fechar} className="menu-link">{t(chave)}</Link>
            </li>
          ))}
        </ul>

        {/* ── Horário: lido da fonte única, não escrito aqui ── */}
        <div
          className="absolute top-[calc(120*var(--u))] w-[calc(213*var(--u))] flex flex-col gap-[calc(32*var(--u))] text-[var(--texto-escuro)]"
          style={{ left: 'calc(50% + 10 * var(--u))', ...entra(560) }}
        >
          <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('menuHorarioHead')}</p>
          <div className="flex flex-col gap-[calc(24*var(--u))]">
            <div className="flex flex-col gap-[calc(3.19*var(--u))]">
              <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold uppercase whitespace-nowrap">{th('missasSemHoras')}</p>
              <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] whitespace-nowrap">{th('missasSemDias')}</p>
            </div>
            <div className="flex flex-col gap-[calc(3.19*var(--u))]">
              <p className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold uppercase whitespace-nowrap">{th('missasDomHoras')}</p>
              <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] whitespace-nowrap">{th('missasDomDias')}</p>
            </div>
          </div>
        </div>

        {/* ── Fotografia + bilhete ── */}
        <div className="absolute top-[calc(120*var(--u))] w-[calc(328*var(--u))] flex flex-col gap-[calc(46*var(--u))]" style={{ left: '75%', ...entra(620) }}>
          <div className="flex flex-col gap-[calc(12*var(--u))]">
            <div className="relative h-[calc(287*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
              <div className="absolute left-0 w-full" style={{ top: '-39.26%', height: '162.68%' }}>
                <Image src="/home/menu-foto.jpg" alt="" fill sizes="328px" className="object-cover" />
              </div>
            </div>
            <p className="font-display text-[length:calc(24*var(--u))] leading-[1.2] text-[var(--texto-escuro)]">{t('menuBilhete')}</p>
          </div>

          <Link
            href={BILHETEIRA}
            {...externo(BILHETEIRA)}
            onClick={fechar}
            className="group/btn sem-luz self-start inline-flex items-center gap-[calc(9.6*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] text-[var(--texto-escuro)]"
          >
            {t('menuPlanear')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>

        {/* ── Redes sociais ──
            Só o Instagram tem endereço conhecido; os restantes ficam como
            texto até haver os links. */}
        <div
          className="absolute top-[calc(523*var(--u))] left-[calc(32*var(--u))] flex items-center gap-[calc(24*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] text-[var(--texto-escuro)]"
          style={entra(700)}
        >
          <span className="opacity-40">Facebook</span>
          <a
            href="https://instagram.com/basilicadaestrela"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-100 transition-opacity duration-[400ms]"
          >
            Instagram
          </a>
          <span className="opacity-40">Whatsapp</span>
          <span className="opacity-40">Youtube</span>
        </div>
      </div>
    </div>

    {/* ═══ Mobile (abaixo de 1024): painel azul, a descer do topo ═══
        Ecrã inteiro (pedido do cliente), azul, com a estrutura da referência: a descer do topo: barra com o logótipo (que desce do hero, ver HomeLogo) e "Fechar"; horário e
        contacto em duas colunas; a lista das páginas em Forevs grande; e, em baixo,
        o CTA da bilheteira (ligação externa) e as redes. Os textos entram em
        cascata como no desktop. Sem desenho no Figma: valores a 390 de largura. */}
    <div
      id="home-menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label={t('menuAria')}
      inert={!aberto}
      className="fixed inset-0 z-[44] lg:hidden"
      style={{
        visibility: aberto ? 'visible' : 'hidden',
        transition: `visibility 0s linear ${aberto ? '0s' : '0.8s'}`,
      }}
    >
      <div
        aria-hidden="true"
        onClick={fechar}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: 'rgba(18,28,36,0.45)', opacity: aberto ? 1 : 0 }}
      />

      <div
        data-lenis-prevent
        className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain bg-[var(--azul-escuro)] text-[var(--bege-claro-2)]"
        style={{
          transform: aberto ? 'translateY(0)' : 'translateY(-100%)',
          transition: `transform ${aberto ? 750 : 550}ms var(--ease-inout)`,
        }}
      >
        {/* Barra: 64 de altura, como a barra de scroll; o logótipo (fixo, claro) e o "Fechar" ficam
            centrados nela, no mesmo sítio do logótipo e do "Menu" da barra de scroll */}
        <div className="sticky top-0 z-10 flex h-[calc(64*var(--u))] shrink-0 items-center justify-end bg-[var(--azul-escuro)] px-[calc(20*var(--u))] shadow-[inset_0_-1px_0_rgba(247,242,238,0.12)]">
          <button
            ref={fecharMobRef}
            type="button"
            onClick={fechar}
            className="btn-luz min-w-[calc(76*var(--u))] justify-center h-[calc(36*var(--u))] px-[calc(16*var(--u))] flex items-center rounded-[calc(4*var(--u))] border border-solid border-[rgba(247,242,238,0.4)] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] text-[var(--bege-claro-2)]"
          >
            {t('menuFechar')}
          </button>
        </div>

        <div className="flex flex-1 flex-col px-[calc(20*var(--u))] pb-[calc(24*var(--u))] pt-[calc(24*var(--u))]">
          {/* Páginas: lista grande (40, passo de 45 como no Figma, onde as caixas de texto têm 27 + 18 de espaço), em Forevs Regular, como no Figma; se não couber, o painel rola */}
          <ul className="flex flex-col pb-[calc(26*var(--u))]">
            {[...COL1, ...COL2].map(([chave, href], i) => (
              <li key={chave} style={entra(220 + i * 40)}>
                <Link
                  href={href}
                  onClick={fechar}
                  aria-current={pathname === href ? 'page' : undefined}
                  className="group block aria-[current=page]:opacity-45"
                >
                  <span
                    className="block font-display text-[length:calc(40*var(--u))] leading-[calc(45*var(--u))] transition-transform duration-[400ms] ease-[var(--ease-out)] group-active:translate-x-[calc(6*var(--u))]"
                    style={{ fontWeight: 400 }}
                  >
                    {t(chave)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Horário e contacto, um por cima do outro (Figma 239:4) */}
          <div className="flex flex-col gap-[calc(28*var(--u))] pb-[calc(44*var(--u))]" style={entra(560)}>
            <div className="flex flex-col gap-[calc(8*var(--u))]">
              <p className="text-[length:calc(15*var(--u))] leading-[calc(18*var(--u))] opacity-60">{t('menuHorarioHead')}</p>
              <div className="flex flex-col gap-[calc(8*var(--u))]">
                <p className="flex flex-col gap-[calc(2*var(--u))] text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))]"><span className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{th('missasSemHoras')}</span>{th('missasSemDias')}</p>
                <p className="flex flex-col gap-[calc(2*var(--u))] text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))]"><span className="text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] font-bold">{th('missasDomHoras')}</span>{th('missasDomDias')}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[calc(8*var(--u))]">
              <p className="text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))] opacity-60">{t('menuContacto')}</p>
              <div className="flex flex-col gap-[calc(8*var(--u))] text-[length:calc(16*var(--u))] leading-[1.2]">
                <a href="tel:+351213960915">213 960 915</a>
                <a href="mailto:geral@basilicadaestrela.pt">geral@basilicadaestrela.pt</a>
              </div>
            </div>
          </div>

          {/* Bilheteira (ligação externa): o destaque do menu. Foto, frase e "Planear visita" são um
              só bloco, no tom azul claro do cartão da foto, que é todo o link */}
          <div style={entra(600)}>
            <Link
              href={BILHETEIRA}
              {...externo(BILHETEIRA)}
              onClick={fechar}
              className="btn-luz flex flex-col overflow-hidden rounded-[calc(4*var(--u))] bg-[rgba(247,242,238,0.09)] text-[var(--bege-claro-2)]"
            >
              <span className="relative block h-[calc(168*var(--u))] w-full overflow-hidden">
                <Image src="/home/menu-foto.jpg" alt="" fill sizes="390px" className="object-cover" />
              </span>
              <span className="flex min-h-[calc(90*var(--u))] items-center px-[calc(18*var(--u))] font-display text-[length:calc(24*var(--u))] leading-[1.2]">{t('menuBilhete')}</span>
              <span className="flex items-center justify-between border-t border-solid border-[rgba(247,242,238,0.22)] px-[calc(18*var(--u))] py-[calc(18*var(--u))]">
                <span className="text-[length:calc(16*var(--u))] leading-none">{t('menuPlanear')}</span>
                <span aria-hidden="true" className="flex h-[calc(44*var(--u))] w-[calc(44*var(--u))] items-center justify-center rounded-full bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]">
                  <span className="seta-externa" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
