import type { BlocoLegal, DocumentoLegal } from '@/lib/legal/tipos'
import PaginaInterior from '@/components/home/PaginaInterior'
import Revelar from '@/components/home/Revelar'
import IndiceLegal from '@/components/legal/IndiceLegal'

const CORPO = 'text-[length:var(--t-corpo)] leading-[1.6]'
/**
 * Ligações dentro do texto: em bege escuro da marca, com o sublinhado no bege escuro
 * puro. O bege escuro sozinho (#dcbc98) quase não se lê sobre o creme, por isso o
 * texto da ligação leva metade de azul da marca; ao passar, acende no azul.
 */
const TEXTO =
  '[&_a]:text-[color-mix(in_srgb,var(--bege-escuro)_50%,var(--azul-escuro))] [&_a]:underline [&_a]:decoration-[var(--bege-escuro)] [&_a]:decoration-[0.08em] [&_a]:underline-offset-[0.22em] [&_a]:transition-colors [&_a]:duration-[400ms] hover:[&_a]:text-[var(--azul-escuro)] hover:[&_a]:decoration-[var(--azul-escuro)] [&_strong]:font-bold'

function Bloco({ bloco }: { bloco: BlocoLegal }) {
  switch (bloco.tipo) {
    case 'p':
      return <p className={CORPO}>{bloco.texto}</p>
    case 'sub':
      return (
        <h3 className="pt-[calc(16*var(--u))] text-[length:var(--t-corpo)] leading-[1.4] font-bold" style={{ fontFamily: 'var(--font-body)' }}>
          {bloco.titulo}
        </h3>
      )
    case 'lista':
      return (
        <ul className={`flex flex-col gap-[calc(12*var(--u))] ps-[calc(20*var(--u))] list-disc marker:text-[rgba(28,43,57,0.4)] ${CORPO}`}>
          {bloco.itens.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    case 'casos':
      return (
        <ul className="flex flex-col border-b border-[rgba(28,43,57,0.12)]">
          {bloco.itens.map((caso) => (
            <li key={caso.titulo} className={`flex flex-col gap-[calc(8*var(--u))] border-t border-[rgba(28,43,57,0.12)] py-[calc(24*var(--u))] ${CORPO}`}>
              <p className="font-bold">{caso.titulo}</p>
              <p className="opacity-60">{caso.resumo}</p>
              <p className="pt-[calc(4*var(--u))]">{caso.texto}</p>
            </li>
          ))}
        </ul>
      )
    case 'tabela':
      return (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[calc(320*var(--u))] border-collapse text-left text-[length:var(--t-corpo)] leading-[1.45]">
            <thead>
              <tr className="border-b border-[rgba(28,43,57,0.2)]">
                {bloco.colunas.map((c) => (
                  <th key={c} scope="col" className="pb-[calc(12*var(--u))] pe-[calc(24*var(--u))] text-[length:var(--t-etiqueta)] font-normal uppercase tracking-[calc(0.24*var(--u))] opacity-60 last:pe-0">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloco.linhas.map((linha, i) => (
                <tr key={i} className="border-b border-[rgba(28,43,57,0.12)] align-top">
                  {linha.map((celula, j) => (
                    <td key={j} className={`py-[calc(14*var(--u))] pe-[calc(24*var(--u))] last:pe-0 ${j === 0 && bloco.codigo ? 'whitespace-nowrap font-mono text-[0.92em]' : ''}`}>
                      {celula}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

/**
 * Página legal (Política de Cookies e, mais tarde, Privacidade e Termos).
 *
 * Composição da referência dada pelo cliente (opterion.com/cookie-policy), no
 * registo do site: título grande em Forevs, encostado à esquerda, com o resumo e
 * a data por baixo; depois um painel de contorno fino com o índice à esquerda,
 * preso ao lado do texto enquanto se lê (IndiceLegal), e o texto numa coluna de
 * leitura à direita.
 *
 * Mobile: tudo numa coluna, sem painel; o índice passa a ser a drop de âncoras
 * do resto do site (só no mobile: `ancorasSoMobile`).
 *
 * O conteúdo vem de lib/legal (só dados).
 */
export default function PaginaLegal({ documento }: { documento: DocumentoLegal }) {
  const ancoras = documento.seccoes.map(({ id, curto }) => ({ id, label: curto }))
  const indice = documento.seccoes.map(({ id, titulo }) => ({ id, label: titulo }))

  return (
    <PaginaInterior ancoras={ancoras} ancorasSoMobile>
      <section
        data-barra="var(--bege-claro-2)"
        className="w-full bg-[var(--bege-claro-2)] px-[calc(32*var(--u))] pt-[calc(120*var(--u))] pb-[calc(96*var(--u))] text-[var(--azul-escuro)] max-lg:px-[calc(20*var(--u))] max-lg:pt-[calc(88*var(--u))] max-lg:pb-[calc(40*var(--u))]"
      >
        <div className="flex w-full flex-col gap-[calc(32*var(--u))] max-lg:gap-[calc(20*var(--u))]">
          <div className="flex flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:calc(16*var(--u))] leading-[1.17]">Informação legal</p></Revelar>
            <Revelar atraso={100}>
              <h1 className="font-display text-[length:calc(120*var(--u))] max-lg:text-[length:calc(48*var(--u))] leading-[1] font-normal">
                {documento.titulo}
              </h1>
            </Revelar>
          </div>
          <Revelar atraso={200}>
            <div className="flex items-start justify-between gap-[calc(40*var(--u))] max-lg:flex-col max-lg:items-start max-lg:gap-[calc(16*var(--u))]">
              <p className="w-[calc(560*var(--u))] max-lg:w-full text-[length:var(--t-lead)] max-lg:text-[length:var(--t-corpo)] leading-[1.4] max-lg:leading-[1.5]" style={{ fontFamily: 'var(--font-body-light)' }}>
                {documento.resumo}
              </p>
              <p className="text-[length:calc(16*var(--u))] leading-[1.17] opacity-60">Última atualização: {documento.atualizado}</p>
            </div>
          </Revelar>
        </div>
      </section>

      <div data-barra="var(--bege-claro-2)" className="w-full bg-[var(--bege-claro-2)] px-[calc(32*var(--u))] pb-[calc(120*var(--u))] text-[var(--azul-escuro)] max-lg:px-[calc(20*var(--u))] max-lg:pb-[calc(80*var(--u))]">
        <div className="grid grid-cols-[1fr_calc(678*var(--u))] gap-x-[calc(80*var(--u))] rounded-[calc(6*var(--u))] border border-[rgba(28,43,57,0.16)] px-[calc(40*var(--u))] py-[calc(56*var(--u))] max-lg:grid-cols-1 max-lg:rounded-none max-lg:border-x-0 max-lg:border-b-0 max-lg:px-0 max-lg:py-[calc(40*var(--u))]">
          <aside className="sticky top-[calc(112*var(--u))] self-start max-lg:hidden">
            <IndiceLegal itens={indice} />
          </aside>

          <div className={`flex flex-col gap-[calc(72*var(--u))] max-lg:gap-[calc(48*var(--u))] ${TEXTO}`}>
            {documento.seccoes.map((seccao) => (
              <section key={seccao.id} id={seccao.id} aria-labelledby={`${seccao.id}-titulo`} className="flex flex-col gap-[calc(20*var(--u))]">
                <h2 id={`${seccao.id}-titulo`} className="pb-[calc(4*var(--u))] font-display text-[length:calc(40*var(--u))] max-lg:text-[length:calc(28*var(--u))] leading-[1.15] font-normal">
                  {seccao.titulo}
                </h2>
                {seccao.blocos.map((bloco, j) => <Bloco key={j} bloco={bloco} />)}
              </section>
            ))}
          </div>
        </div>
      </div>
    </PaginaInterior>
  )
}
