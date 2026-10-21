import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Seta from '@/components/home/Seta'
import { u } from '@/lib/escala'

const COL_BASILICA: [string, string][] = [
  ['menuSobre', '/sobre-a-basilica'],
  ['menuVisitar', '/basilica-e-convento'],
  ['menuCelebracoes', '/celebracoes'],
  ['menuVida', '/vida-paroquia'],
  ['menuObra', '/obra-social'],
  ['menuNoticias', '/blog'],
]
const COL_CONTACTO: [string, string][] = [
  ['menuContactos', '/contactos'],
  ['menuDonativos', '/donativos'],
]

const LINK = 'transition-colors duration-[400ms] ease-[var(--ease-out)] hover:text-[var(--bege-claro-2)]'

/**
 * Rodapé — design novo (Figma, nó 115:414), desktop 1440, 900 de altura.
 *
 * Quatro colunas separadas por réguas verticais (morada, duas listas de links,
 * fotografia), uma régua horizontal a 452 e, por baixo, o nome da Basílica em
 * letras grandes (os ficheiros SVG do desenho, em quatro blocos, posicionados
 * como no Figma) e a barra legal.
 *
 * Links ainda sem página (política, termos) e redes sem endereço conhecido
 * ficam como texto, como no menu de ecrã.
 *
 * Mobile: tudo em coluna, sem réguas verticais — marca e morada, as listas em
 * duas colunas, a fotografia, o nome da Basílica (as mesmas quatro peças, a
 * toda a largura, com as três de baixo numa linha) e a barra legal.
 */
export default function HomeRodape() {
  const t = useTranslations('inicio')
  const lista = (itens: [string, string][]) =>
    itens.map(([chave, href]) => (
      <li key={chave}><Link href={href} className={`block ${LINK}`}>{t(chave)}</Link></li>
    ))

  return (
    <footer
      data-barra="var(--azul-escuro)"
      data-barra-tom="escuro"
      data-barra-oculta
      className="relative w-full h-[calc(900*var(--u))] max-lg:h-auto max-lg:flex max-lg:flex-col max-lg:gap-[calc(48*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:pt-[calc(64*var(--u))] max-lg:pb-[calc(24*var(--u))] overflow-hidden bg-[var(--azul-escuro)] text-[var(--azul-claro)]"
    >
      {/* Réguas */}
      <div aria-hidden="true" className="max-lg:hidden absolute top-0 h-[calc(452*var(--u))] w-px bg-[rgba(247,242,238,0.2)]" style={{ left: 'calc(25% + 32.8 * var(--u))' }} />
      <div aria-hidden="true" className="max-lg:hidden absolute top-0 h-[calc(452*var(--u))] w-px bg-[rgba(247,242,238,0.2)]" style={{ left: 'calc(66.67% + 86.8 * var(--u))' }} />
      <div aria-hidden="true" className="max-lg:hidden absolute left-0 top-[calc(452*var(--u))] h-px w-full bg-[rgba(247,242,238,0.2)]" />

      {/* ── Marca, lema e morada ── */}
      <div className="absolute left-[calc(32*var(--u))] top-[calc(50*var(--u))] max-lg:static max-lg:w-full max-lg:gap-[calc(32*var(--u))] flex flex-col gap-[calc(40*var(--u))] w-[calc(326*var(--u))]">
        <div className="flex flex-col gap-[calc(16*var(--u))]">
          <div className="relative h-[calc(78*var(--u))] w-[calc(100.475*var(--u))] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home/footer-marca.svg" alt="" className="absolute" style={{ left: '-1.32%', top: '5.93%', width: '93.77%', height: '91.41%' }} />
          </div>
          <p className="font-display text-[length:calc(32*var(--u))] leading-[1.1] text-[var(--bege-claro-2)]">
            {t('rodLema1')}
            <br />
            {t('rodLema2')}
          </p>
        </div>
        <address className="flex flex-col gap-[calc(16*var(--u))] pt-[calc(18.85*var(--u))] not-italic text-[length:calc(16*var(--u))]">
          <p className="leading-[1.4]">
            {t('rodMorada1')}
            <br />
            {t('rodMorada2')}
          </p>
          <a href="tel:+351213960915" className={`leading-[1.2] ${LINK}`}>213 960 915</a>
          <a href="mailto:geral@basilicadaestrela.pt" className={`leading-[1.2] ${LINK}`}>geral@basilicadaestrela.pt</a>
        </address>
      </div>

      {/* ── Listas de links ── */}
      <nav className="absolute top-[calc(49.85*var(--u))] max-lg:static max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-[calc(20*var(--u))] max-lg:gap-y-[calc(32*var(--u))] max-lg:border-t max-lg:border-solid max-lg:border-[rgba(247,242,238,0.2)] max-lg:pt-[calc(40*var(--u))] flex gap-[calc(91*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))]" style={{ left: 'calc(25% + 89 * var(--u))' }}>
        <div className="flex flex-col gap-[calc(12*var(--u))] w-[calc(134*var(--u))]">
          <p className="text-[length:max(11px,calc(12*var(--u)))] opacity-60">{t('rodBasilica')}</p>
          <ul className="flex flex-col gap-[calc(10*var(--u))]">{lista(COL_BASILICA)}</ul>
        </div>
        <div className="flex flex-col gap-[calc(12*var(--u))] w-[calc(128*var(--u))]">
          <p className="text-[length:max(11px,calc(12*var(--u)))] opacity-60">{t('rodContacto')}</p>
          <ul className="flex flex-col gap-[calc(10*var(--u))]">{lista(COL_CONTACTO)}</ul>
        </div>
        <div className="flex flex-col gap-[calc(12*var(--u))] w-[calc(128*var(--u))]">
          <p className="text-[length:max(11px,calc(12*var(--u)))] opacity-60">{t('rodRedes')}</p>
          <ul className="flex flex-col gap-[calc(10*var(--u))]">
            <li>Facebook</li>
            <li>
              <a href="https://instagram.com/basilicadaestrela" target="_blank" rel="noopener noreferrer" className={`block ${LINK}`}>Instagram</a>
            </li>
            <li>Whatsapp</li>
            <li>Youtube</li>
          </ul>
        </div>
      </nav>

      {/* ── Fotografia e "Planear visita" ── */}
      <div className="absolute top-[calc(50*var(--u))] max-lg:static max-lg:w-full flex flex-col gap-[calc(23*var(--u))] w-[calc(328*var(--u))]" style={{ left: '75%' }}>
        <div className="relative h-[calc(287*var(--u))] max-lg:h-[calc(220*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
          <div className="absolute left-0 w-full" style={{ top: '-39.26%', height: '162.68%' }}>
            <Image src="/home/menu-foto.jpg" alt="" fill sizes="(max-width: 1023px) 100vw, 328px" className="object-cover" />
          </div>
        </div>
        <Link href="/basilica-e-convento" className={`group/btn sem-luz self-start flex items-center gap-[calc(9.6*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] ${LINK}`}>
          {t('rodPlanear')}
          <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
        </Link>
      </div>

      {/* ── Nome da Basílica, em letras grandes ── */}
      <div role="img" aria-label={t('rodMarcaAlt')} className="max-lg:flex max-lg:flex-wrap max-lg:items-end max-lg:justify-between max-lg:gap-y-[calc(12*var(--u))]">
        {/* Mobile: as peças saem das posições do desenho e ficam em fluxo, à largura do ecrã */}
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/home/footer-basilica.svg" alt="" className="max-lg:static max-lg:w-full! max-lg:h-auto! absolute" style={{ left: u(36.64), top: u(517.02), width: u(1371.364), height: u(137.329) }} />
        <img src="/home/footer-sagrado.svg" alt="" className="max-lg:static max-lg:w-[30%]! max-lg:h-auto! absolute" style={{ left: u(34), top: u(692.3), width: u(349.886), height: u(57.133) }} />
        <img src="/home/footer-coracao.svg" alt="" className="max-lg:static max-lg:w-[31%]! max-lg:h-auto! absolute" style={{ left: 'calc(33.33% + 61.48 * var(--u))', top: u(680.21), width: u(359.829), height: u(82.614) }} />
        <img src="/home/footer-jesus.svg" alt="" className="max-lg:static max-lg:w-[26%]! max-lg:h-auto! absolute" style={{ left: 'calc(75% + 22.79 * var(--u))', top: u(692.49), width: u(304.555), height: u(65.349) }} />
        {/* eslint-enable @next/next/no-img-element */}
      </div>

      {/* ── Barra legal ── */}
      <div className="absolute left-0 top-[calc(826.82*var(--u))] max-lg:static max-lg:h-auto max-lg:flex-col max-lg:items-start max-lg:gap-[calc(12*var(--u))] max-lg:px-0 flex items-center justify-between w-full h-[calc(40*var(--u))] pt-[calc(24*var(--u))] px-[calc(32*var(--u))] border-t border-solid border-[rgba(247,242,238,0.2)] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">
        <p className="text-[rgba(186,201,213,0.6)]">{t('rodDireitos')}</p>
        <div className="flex items-center gap-[calc(16*var(--u))] w-[calc(404*var(--u))] max-lg:w-auto max-lg:flex-wrap">
          <span>{t('rodPrivacidade')}</span>
          <span>{t('rodTermos')}</span>
          <span className="pl-[calc(24*var(--u))] max-lg:pl-0 w-[calc(91*var(--u))] max-lg:w-auto whitespace-nowrap">{t('rodDesign')}</span>
        </div>
      </div>
    </footer>
  )
}
