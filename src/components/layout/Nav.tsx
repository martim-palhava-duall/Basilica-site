'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import Logo from '@/components/ui/Logo'
import { getLenis } from '@/lib/lenis'

export default function Nav() {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Com o menu em ecrã inteiro, a página por trás não pode continuar a correr.
  // O `overflow: hidden` sozinho não chega — o Lenis conduz o scroll pelo seu
  // próprio rAF e ignora-o, por isso é preciso pará-lo explicitamente.
  useEffect(() => {
    const lenis = getLenis()
    if (menuOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Rodar o tablet para landscape pode passar dos 1024px: o overlay desaparecia
  // por CSS mas o estado ficava aberto, deixando o scroll travado.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const links = [
    { href: '/sobre-a-basilica', label: t('sobreBasilica') },
    { href: '/visita',           label: t('visita') },
    { href: '/celebracoes',      label: t('celebracoes') },
    { href: '/horarios',         label: t('horarios') },
    { href: '/obra-social',      label: 'Obra Social' },
    { href: '/contactos',        label: t('contactos') },
  ]

  // Over the photographic hero the nav floats transparent with light text;
  // once scrolled past it, it gains a blurred cream backing with dark text.
  // O menu aberto força o mesmo fundo sólido: o painel é creme opaco e a barra
  // por cima não pode continuar transparente com texto claro.
  const solid = scrolled || menuOpen

  const linkColor = solid
    ? '!text-[var(--color-text-secondary)] hover:!text-[var(--color-text-primary)]'
    : '!text-[var(--color-text-inverse)] opacity-85 hover:opacity-100'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        menuOpen
          ? // Sem fundo aqui: o <header> pinta por baixo do overlay, por isso um fundo
            // neste elemento não taparia os links a passar. Vai no <nav>, que está acima.
            'bg-transparent'
          : scrolled
            ? 'bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)]'
            : 'bg-transparent'
      } ${solid ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-inverse)]'}`}
    >
      {/* relative z-10: o overlay é irmão dentro do <header> e vem depois no DOM,
          logo pintaria por cima do logótipo e do botão de fechar. O fundo opaco com o
          menu aberto vive aqui (e não no <header>) porque é esta camada que fica acima
          do overlay — é ela que tapa os links quando se percorre o menu. */}
      {/* A barra e os restantes itens da fila (bilheteira, botão de menu) mantêm
          sempre a mesma posição — só o logótipo cresce. Em desktop (lg+), com a hero
          por baixo (!scrolled), cresce por transform: scale(), não por mudar de classe
          de altura: a caixa do logo no flex continua do tamanho normal, por isso os
          irmãos não são empurrados — só cresce visualmente, por cima da hero.
          origin-top-left para crescer para baixo/direita a partir do canto onde já
          está, sem subir por cima do topo da janela. */}
      <nav
        className={`container relative z-10 flex items-center justify-between h-16 md:h-20 ${
          menuOpen ? 'bg-[var(--color-bg-primary)]' : ''
        }`}
      >
        {/* Logo */}
        <Link href="/" className="transition-colors duration-500" aria-label="Basílica da Estrela">
          <Logo
            className={`h-11 md:h-14 w-auto origin-top-left transition-transform duration-500 ${
              // !solid, não !scrolled: com o menu aberto a barra fica creme opaca, mas o
              // logótipo ampliado transbordava-a para baixo e o wordmark ficava escuro
              // sobre a foto escura da hero. Com o menu aberto volta ao tamanho normal.
              !solid ? 'lg:scale-[2.3]' : ''
            }`}
          />
        </Link>

        {/* Bilheteira + lang + botão de menu. Os links de navegação deixaram de
            aparecer soltos na barra em qualquer tamanho de ecrã — chegaram a ser 6,
            mas com "Vida da Paróquia" / "Donativos" / "Notícias" que o site vai
            ganhar a seguir seriam 9, demasiados para caberem numa fila só. Vivem
            todos dentro do menu de ecrã inteiro, sempre por trás do mesmo botão. */}
        <div className="flex items-center gap-5">
          {/* CTA de bilheteira — o sitemap prevê-a como destino principal da Visita,
              e a compra é feita em plataforma externa. */}
          <Link
            href="/visita"
            className={`hidden sm:inline-flex items-center border px-5 py-2.5 text-[0.8rem] font-medium transition-colors duration-300 ${
              solid
                ? 'border-[var(--color-text-primary)] !text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:!text-[var(--color-text-inverse)]'
                : 'border-[var(--color-text-inverse)] !text-[var(--color-text-inverse)] hover:bg-[var(--color-text-inverse)] hover:!text-[var(--color-text-primary)]'
            }`}
            style={{ borderRadius: 'var(--radius)' }}
          >
            {t('bilheteira')}
          </Link>

          <Link
            href={locale === 'pt' ? '/en' : '/'}
            className={`label transition-colors duration-200 ${linkColor}`}
          >
            {locale === 'pt' ? tc('en') : tc('pt')}
          </Link>

          <button
            className="flex flex-col gap-1.5 p-1 transition-colors duration-500"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
          >
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Menu de mobile/tablet: ecrã inteiro (a página por trás não faz sentido
          ver-se num telemóvel), com o pt-* a compensar a altura da barra para os links
          não passarem por baixo do logótipo.
          Em desktop (lg+) é outro objeto: um painel que PENDE da barra e abre só para
          baixo — `lg:inset-auto` larga os quatro lados que o `inset-0` prendia, e
          top-20/right-0 recolocam-no colado ao canto do botão que o abre. A altura é a
          do conteúdo (sem min-h-full), com max-h a permitir scroll interno se um dia os
          links não couberem. */}
      {menuOpen && (
        <>
          {/* Zona clicável só em desktop: fecha o menu ao clicar fora do painel. Não
              tem escurecimento (o exemplo enviado também não tinha) — só apanha o
              clique. Abaixo de lg é redundante, o painel já cobre tudo. */}
          <div
            className="hidden lg:block fixed inset-0"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="menu-principal"
            // Sem isto o overlay não percorre: o Lenis faz preventDefault na roda e no
            // toque em toda a página, mesmo depois de stop(), e em landscape o último
            // link ficava inalcançável. O atributo diz-lhe para não tocar neste elemento.
            data-lenis-prevent
            className="fixed inset-0 lg:inset-auto lg:top-20 lg:right-0 lg:w-[460px] lg:max-w-[90vw] lg:max-h-[calc(100vh-5rem)] lg:border-l lg:border-b lg:border-[var(--color-border)] lg:shadow-2xl bg-[var(--color-bg-primary)] overflow-y-auto"
          >
            {/* min-h-full + justify-center centra quando há espaço e deixa crescer quando
                não há — em landscape (375px de altura) os seis links não cabem, e com
                `justify-center` num contentor de altura fixa o topo era cortado.
                px-6/md:px-10 substitui o .container aqui de propósito: o padding do
                .container é calculado em vw da JANELA (`clamp(1.5rem, 5vw, 6rem)`), não
                da largura do painel — a partir de lg o painel tem 460px fixos, e esse
                padding vw ia comer quase tudo o que sobra de coluna de texto. */}
            <div className="flex min-h-full lg:min-h-0 flex-col justify-center lg:justify-start px-6 md:px-10 pt-16 md:pt-20 lg:pt-10 pb-12 lg:pb-10">
              {/* Índice numerado — o mesmo motivo da Obra Social (page.tsx), para o
                  menu ler-se como o mesmo sistema editorial e não como um menu genérico
                  de app. Tamanho da letra desce em lg (h3 em vez de h2): dentro de um
                  painel de 460px, --text-h2 (até 3.5rem) partia "Sobre a Basílica" em
                  duas linhas com um ar apertado. */}
              <ul className="flex flex-col gap-6 md:gap-8 lg:gap-5">
                {links.map((link, i) => (
                  <li key={link.href} className="flex items-baseline gap-4 md:gap-6">
                    <span className="label tabular-nums shrink-0" aria-hidden="true">
                      {`0${i + 1}`}
                    </span>
                    <Link
                      href={link.href}
                      className="font-display font-light !text-[var(--color-text-primary)] text-[length:var(--text-h2)] lg:text-[length:var(--text-h3)]"
                      style={{
                        letterSpacing: 'var(--tracking-heading)',
                        lineHeight: 'var(--leading-heading)',
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Bilheteira: no topo o botão está escondido abaixo de sm, por isso repete-se
                  aqui. De sm para cima o do topo já é visível — em tablet/desktop este
                  esconde-se para não aparecer duas vezes. */}
              <Link
                href="/visita"
                onClick={() => setMenuOpen(false)}
                className="mt-12 sm:hidden self-start inline-flex items-center bg-[var(--color-text-primary)] !text-[var(--color-text-inverse)] px-6 py-3 text-[0.8rem] font-medium"
                style={{ borderRadius: 'var(--radius)' }}
              >
                {t('bilheteira')}
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
