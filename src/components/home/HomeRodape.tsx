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

/** Site do estúdio que fez o desenho e o site ("Design by duall") */
const DUALL = 'https://duallstudio.com'

const LINK = 'alvo-toque transition-colors duration-[400ms] ease-[var(--ease-out)] hover:text-[var(--bege-claro-2)]'

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
 * Mobile (marcação própria, em blocos separados por réguas de ponta a ponta): o símbolo
 * da Basílica, pequeno e centrado, e o lema centrado por baixo, numa linha; as oito páginas em duas colunas iguais; contacto (morada,
 * telefone, email) e redes; a fotografia com "Planear visita" por baixo (fora da imagem); o nome da Basílica (as quatro peças) e a barra legal (ligações em cima, direitos
 * e autoria por baixo). Páginas e redes na mesma grelha de duas colunas, alinhadas. Os rótulos de cada bloco como no desktop (minúsculas normais, a 60% de opacidade).
 */
export default function HomeRodape() {
  const t = useTranslations('inicio')
  const lista = (itens: [string, string][]) =>
    itens.map(([chave, href]) => (
      <li key={chave}><Link href={href} {...externo(href)} className={`block ${LINK}`}>{t(chave)}</Link></li>
    ))

  const linha = <div aria-hidden="true" className="h-px w-full bg-[rgba(247,242,238,0.16)]" />
  const rotulo = 'text-[length:var(--t-etiqueta)] leading-[1.17] opacity-60'

  return (
    <footer
      data-barra="var(--azul-escuro)"
      data-barra-tom="escuro"
      data-barra-oculta
      className="relative w-full overflow-hidden bg-[var(--azul-escuro)] text-[var(--azul-claro)]"
    >
      {/* ── Desktop: o desenho do Figma (posições absolutas) ── */}
      <div className="relative h-[calc(900*var(--u))] w-full max-lg:hidden">
        {/* Réguas */}
        <div aria-hidden="true" className="absolute top-0 h-[calc(452*var(--u))] w-px bg-[rgba(247,242,238,0.2)]" style={{ left: 'calc(25% + 32.8 * var(--u))' }} />
        <div aria-hidden="true" className="absolute top-0 h-[calc(452*var(--u))] w-px bg-[rgba(247,242,238,0.2)]" style={{ left: 'calc(66.67% + 86.8 * var(--u))' }} />
        <div aria-hidden="true" className="absolute left-0 top-[calc(452*var(--u))] h-px w-full bg-[rgba(247,242,238,0.2)]" />

        {/* ── Marca, lema e morada ── */}
        <div className="absolute left-[calc(32*var(--u))] top-[calc(50*var(--u))] flex flex-col gap-[calc(40*var(--u))] w-[calc(326*var(--u))]">
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
          <address className="flex flex-col gap-[calc(16*var(--u))] pt-[calc(18.85*var(--u))] not-italic text-[length:var(--t-corpo)]">
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
        <nav className="absolute top-[calc(49.85*var(--u))] flex gap-[calc(91*var(--u))] text-[length:var(--t-corpo)] leading-[1.19]" style={{ left: 'calc(25% + 89 * var(--u))' }}>
          <div className="flex flex-col gap-[calc(12*var(--u))] w-[calc(134*var(--u))]">
            <p className="text-[length:var(--t-etiqueta)] opacity-60">{t('rodBasilica')}</p>
            <ul className="flex flex-col gap-[calc(10*var(--u))]">{lista(COL_BASILICA)}</ul>
          </div>
          <div className="flex flex-col gap-[calc(12*var(--u))] w-[calc(128*var(--u))]">
            <p className="text-[length:var(--t-etiqueta)] opacity-60">{t('rodContacto')}</p>
            <ul className="flex flex-col gap-[calc(10*var(--u))]">{lista(COL_CONTACTO)}</ul>
          </div>
          <div className="flex flex-col gap-[calc(12*var(--u))] w-[calc(128*var(--u))]">
            <p className="text-[length:var(--t-etiqueta)] opacity-60">{t('rodRedes')}</p>
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
        <div className="absolute top-[calc(50*var(--u))] flex flex-col gap-[calc(23*var(--u))] w-[calc(328*var(--u))]" style={{ left: '75%' }}>
          <div className="relative h-[calc(287*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/home/menu-foto.jpg" alt="" fill sizes="328px" className="object-cover object-[40%_50%]" />
          </div>
          <Link href={BILHETEIRA} {...externo(BILHETEIRA)} className={`alvo-toque group/btn sem-luz self-start flex items-center gap-[calc(9.6*var(--u))] text-[length:var(--t-corpo)] leading-[1.19] ${LINK}`}>
            {t('rodPlanear')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>

        {/* ── Nome da Basílica, em letras grandes ── */}
        {/* Nome da Basílica: revela-se ao entrar no ecrã (NomeRodape) */}
        <NomeRodape label={t('rodMarcaAlt')} className="absolute left-0 top-[calc(517.02*var(--u))]" />

        {/* ── Barra legal ── */}
        <div className="absolute left-0 top-[calc(826.82*var(--u))] flex items-center justify-between w-full h-[calc(40*var(--u))] pt-[calc(24*var(--u))] px-[calc(32*var(--u))] border-t border-solid border-[rgba(247,242,238,0.2)] text-[length:var(--t-etiqueta)] leading-[1.17]">
          <p className="text-[rgba(186,201,213,0.6)]">{t('rodDireitos')}</p>
          <div className="flex items-center gap-[calc(16*var(--u))] w-[calc(404*var(--u))]">
            <span>{t('rodPrivacidade')}</span>
            <span>{t('rodTermos')}</span>
            <a href={DUALL} target="_blank" rel="noopener noreferrer" className={`pl-[calc(24*var(--u))] w-[calc(91*var(--u))] whitespace-nowrap ${LINK}`}>{t('rodDesign')}</a>
          </div>
        </div>
      </div>

      {/* ── Mobile: marcação própria, em blocos separados por réguas de ponta a ponta ── */}
      <div className="lg:hidden flex flex-col">
        {/* Marca pequena e centrada, com o lema centrado por baixo, numa linha */}
        <div className="flex flex-col items-center gap-[calc(6*var(--u))] px-[calc(20*var(--u))] pt-[calc(24*var(--u))] pb-[calc(20*var(--u))]">
          <div className="relative h-[calc(105*var(--u))] w-[calc(135*var(--u))] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home/footer-marca.svg" alt="" className="absolute" style={{ left: '-1.32%', top: '5.93%', width: '93.77%', height: '91.41%' }} />
          </div>
          <p className="font-display text-[length:calc(30*var(--u))] leading-[1.05] whitespace-nowrap text-center text-[var(--bege-claro-2)]">
            {t('rodLema1')} {t('rodLema2')}
          </p>
        </div>

        {linha}

        {/* Páginas: oito, em duas colunas iguais */}
        <nav aria-label={t('rodBasilica')} className="flex flex-col gap-[calc(20*var(--u))] px-[calc(20*var(--u))] py-[calc(36*var(--u))]">
          <p className={rotulo}>{t('rodBasilica')}</p>
          <ul className="grid grid-cols-2 gap-x-[calc(20*var(--u))] gap-y-[calc(14*var(--u))] text-[16px] leading-[1.25]">
            {lista([...COL_BASILICA, ...COL_CONTACTO])}
          </ul>
        </nav>

        {linha}

        {/* Contacto e redes */}
        <div className="flex flex-col gap-[calc(32*var(--u))] px-[calc(20*var(--u))] py-[calc(36*var(--u))]">
          <div className="flex flex-col gap-[calc(14*var(--u))]">
            <p className={rotulo}>{t('rodContacto')}</p>
            <address className="flex flex-col gap-[calc(6*var(--u))] not-italic text-[16px] leading-[1.45]">
              <span>{t('rodMorada1')}, {t('rodMorada2')}</span>
              <a href="tel:+351213960915" className={LINK}>213 960 915</a>
              <a href="mailto:geral@basilicadaestrela.pt" className={LINK}>geral@basilicadaestrela.pt</a>
            </address>
          </div>
          <div className="flex flex-col gap-[calc(14*var(--u))]">
            <p className={rotulo}>{t('rodRedes')}</p>
            <ul className="grid grid-cols-2 gap-x-[calc(20*var(--u))] gap-y-[calc(14*var(--u))] text-[16px] leading-[1.25]">
              <li>Facebook</li>
              <li><a href="https://instagram.com/basilicadaestrela" target="_blank" rel="noopener noreferrer" className={LINK}>Instagram</a></li>
              <li>Whatsapp</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>

        {linha}

        {/* Fotografia e "Planear visita" por baixo (fora da imagem) */}
        <div className="flex flex-col gap-[calc(18*var(--u))] px-[calc(20*var(--u))] pt-[calc(36*var(--u))]">
          <div className="relative h-[calc(190*var(--u))] w-full overflow-hidden rounded-[calc(4*var(--u))]">
            <Image src="/home/menu-foto.jpg" alt="" fill sizes="100vw" className="object-cover object-[40%_50%]" />
          </div>
          <Link href={BILHETEIRA} {...externo(BILHETEIRA)} className={`alvo-toque group/btn sem-luz self-start flex items-center gap-[calc(9.6*var(--u))] text-[16px] leading-[1.25] ${LINK}`}>
            {t('rodPlanear')}
            <Seta className="group-hover/btn:translate-x-[calc(4*var(--u))]" />
          </Link>
        </div>

        {/* Nome da Basílica, em letras grandes */}
        <NomeRodape label={t('rodMarcaAlt')} className="px-[calc(20*var(--u))] pt-[calc(40*var(--u))] pb-[calc(40*var(--u))]" />

        {/* Barra legal */}
        <div className="flex flex-col gap-[calc(14*var(--u))] border-t border-solid border-[rgba(247,242,238,0.16)] px-[calc(20*var(--u))] pt-[calc(20*var(--u))] pb-[calc(28*var(--u))] text-[length:var(--t-etiqueta)] leading-[1.33]">
          <div className="flex flex-wrap gap-x-[calc(20*var(--u))] gap-y-[calc(4*var(--u))]">
            <span>{t('rodPrivacidade')}</span>
            <span>{t('rodTermos')}</span>
          </div>
          <div className="flex flex-col gap-[calc(4*var(--u))] text-[rgba(186,201,213,0.6)]">
            <p>{t('rodDireitos')}</p>
            <p><a href={DUALL} target="_blank" rel="noopener noreferrer" className={LINK}>{t('rodDesign')}</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
