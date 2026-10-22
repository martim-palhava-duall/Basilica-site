/**
 * Estado da transição de página (TransicaoPagina), partilhado com quem precise de
 * esperar por ela. Enquanto o véu bege cobre o ecrã, `<html data-transicao="cobrir">`;
 * quando começa a sair, o atributo sai e é lançado o evento `transicao:revela`.
 *
 * Serve às entradas que correm ao chegar a uma página (a do hero da homepage): ao
 * navegar dentro do site, a página nova monta por trás do véu e a entrada acabava
 * escondida; assim espera e corre à vista, como na primeira visita.
 */
const EVENTO = 'transicao:revela'

export function marcarTransicao(fase: 'repouso' | 'cobrir' | 'revelar') {
  const html = document.documentElement
  if (fase === 'cobrir') {
    html.dataset.transicao = 'cobrir'
  } else if (html.dataset.transicao) {
    delete html.dataset.transicao
    window.dispatchEvent(new Event(EVENTO))
  }
}

/** Resolve logo, ou quando o véu começar a sair se a página nasceu por trás dele */
export function esperarVeu(): Promise<void> {
  if (document.documentElement.dataset.transicao !== 'cobrir') return Promise.resolve()
  return new Promise((r) => window.addEventListener(EVENTO, () => r(), { once: true }))
}
