import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Seta from '@/components/home/Seta'
import NomeRodape from '@/components/home/NomeRodape'
import { BILHETEIRA, externo } from '@/lib/links'

// Mesma ordem do menu de ecrã (Sobre, Vida da Paróquia, Visitar, Celebrar, Obra, Donativos, Notícias, Contactos)
const COL_BASILICA: [string, string][] = [
  ['menuSobre', '/sobre-a-basilica'],
  ['menuVida', '/vida-paroquia'],
  ['menuVisitar', '/basilica-e-convento'],
  ['menuCelebracoes', '/celebracoes'],
  ['menuObra', '/obra-social'],
  ['menuNoticias', '/blog'],
]
const COL_CONTACTO: [string, string][] = [
  ['menuDonativos', '/donativos'],
  ['menuContactos', '/contactos'],
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
 * Mobile: tudo em coluna e direto, com réguas de ponta a ponta do ecrã — marca e
 * lema; as listas (Basílica à esquerda, Contacto e Redes à direita); morada,
 * telefone e email; a fotografia a toda a largura com "Planear visita" por baixo;
 * o nome da Basílica (as mesmas quatro peças) e a barra legal.
 */
export default function HomeRodape() {
  const t = useTranslations('inicio')
  const lista = (itens: [string, string][]) =>
    itens.map(([chave, href]) => (
      <li key={chave}><Link href={href} {...externo(href)} className={`block ${LINK}`}>{t(chave)}</Link></li>
    ))

  return (
    <footer
      data-barra="var(--azul-escuro)"
      data-barra-tom="escuro"
      data-barra-oculta
      className="relative w-full h-[calc(900*var(--u))] max-lg:h-auto max-lg:flex max-lg:flex-col overflow-hidden bg-[var(--azul-escuro)] text-[var(--azul-claro)]"
    >
      {/* Réguas */}
      <div aria-hidden="true" className="max-lg:hidden absolute top-0 h-[calc(452*var(--u))] w-px bg-[rgba(247,242,238,0.2)]" style={{ left: 'calc(25% + 32.8 * var(--u))' }} />
      <div aria-hidden="true" className="max-lg:hidden absolute top-0 h-[calc(452*var(--u))] w-px bg-[rgba(247,242,238,0.2)]" style={{ left: 'calc(66.67% + 86.8 * var(--u))' }} />
      <div aria-hidden="true" className="max-lg:hidden absolute left-0 top-[calc(452*var(--u))] h-px w-full bg-[rgba(247,242,238,0.2)]" />

      {/* ── Marca, lema e morada ── */}
      <div className="absolute left-[calc(32*var(--u))] top-[calc(50*var(--u))] max-lg:static max-lg:w-full max-lg:px-[calc(20*var(--u))] max-lg:pt-[calc(56*var(--u))] max-lg:pb-[calc(40*var(--u))] flex flex-col gap-[calc(40*var(--u))] w-[calc(326*var(--u))]">
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
        <address className="max-lg:hidden flex flex-col gap-[calc(16*var(--u))] pt-[calc(18.85*var(--u))] not-italic text-[length:calc(16*var(--u))]">
          <p className="leading-[1.4]">
            {t('rodMorada1')}
            <br />
            {t('rodMorada2')}
          </p>
          <a href="tel:+351213960915" className={`leading-[1.2] ${LINK}`}>213 960 915</a>
          <a href="mailto:geral@basilicadaestrela.pt" className={`leading-[1.2] ${LINK}`}>geral@basilicadaestrela.pt</a>
        </address>
      </div>

      {/* Mobile: as réguas ocupam a largura toda do ecrã */}
      <div aria-hidden="true" className="lg:hidden h-px w-full bg-[rgba(247,242,238,0.2)]" />

      {/* ── Listas de links ── */}
      <nav className="absolute top-[calc(49.85*var(--u))] max-lg:static max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-[calc(20*var(--u))] max-lg:gap-y-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(40*var(--u))] max-lg:[&>div:first-child]:row-span-2 max-lg:[&>div]:w-auto flex gap-[calc(91*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))]" style={{ left: 'calc(25% + 89 * var(--u))' }}>
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

      <div aria-hidden="true" className="lg:hidden h-px w-full bg-[rgba(247,242,238,0.2)]" />
      <address className="lg:hidden flex flex-col gap-[calc(12*var(--u))] px-[calc(20*var(--u))] py-[calc(40*var(--u))] not-italic text-[length:calc(16*var(--u))]">
        <p className="leading-[1.4]">
          {t('rodMorada1')}
          <br />
          {t('rodMorada2')}
        </p>
        <a href="tel:+351213960915" className={`leading-[1.2] ${LINK}`}>213 960 915</a>
        <a href="mailto:geral@basilicadaestrela.pt" className={`leading-[1.2] ${LINK}`}>geral@basilicadaestrela.pt</a>
      </address>

      {/* ── Fotografia e "Planear visita" ── */}
      <div className="absolute top-[calc(50*var(--u))] max-lg:static max-lg:w-full max-lg:gap-0 flex flex-col gap-[calc(23*var(--u))] w-[calc(328*var(--u))]" style={{ left: '75%' }}>
        <div className="relative h-[calc(287*var(--u))] max-lg:h-[calc(220*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))] max-lg:rounded-none">
          <Image src="/home/menu-foto.jpg" alt="" fill sizes="(max-width: 1023px) 100vw, 328px" className="object-cover object-[40%_50%]" />
        </div>
        <Link href={BILHETEIRA} {...externo(BILHETEIRA)} className={`group/btn sem-luz self-start max-lg:self-stretch max-lg:justify-between max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(24*var(--u))] max-lg:border-b max-lg:border-solid max-lg:border-[rgba(247,242,238,0.2)] max-lg:font-display max-lg:text-[length:calc(28*var(--u))] max-lg:leading-none max-lg:text-[var(--bege-claro-2)] flex items-center gap-[calc(9.6*var(--u))] text-[length:calc(16*var(--u))] leading-[calc(19*var(--u))] ${LINK}`}>
          {t('rodPlanear')}
          <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
        </Link>
      </div>

      {/* ── Nome da Basílica, em letras grandes ── */}
      {/* Nome da Basílica: revela-se ao entrar no ecrã (NomeRodape) */}
      <NomeRodape label={t('rodMarcaAlt')} className="absolute left-0 top-[calc(517.02*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(40*var(--u))]" />

      {/* ── Barra legal ── */}
      <div className="absolute left-0 top-[calc(826.82*var(--u))] max-lg:static max-lg:h-auto max-lg:flex-col max-lg:items-start max-lg:gap-[calc(12*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(24*var(--u))] max-lg:pt-[calc(24*var(--u))] flex items-center justify-between w-full h-[calc(40*var(--u))] pt-[calc(24*var(--u))] px-[calc(32*var(--u))] border-t border-solid border-[rgba(247,242,238,0.2)] text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">
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
