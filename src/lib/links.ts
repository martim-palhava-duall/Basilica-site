/**
 * Bilheteira / compra de visitas — plataforma externa (ver DESIGN.md, "Bilheteira").
 * PROVISÓRIO: aponta para o Google até haver o link do fornecedor; trocar só aqui.
 * Usado por todos os botões de bilhetes — "Planear visita" (hero, menu, rodapé,
 * Sobre nós, Celebrações) e "Comprar bilhete" (Basílica e Convento). Os "Visitar"
 * levam à página Basílica e Convento.
 */
export const BILHETEIRA = 'https://www.google.com'

/** Atributos para abrir ligações externas num separador novo (as internas ficam como estão) */
export function externo(href: string) {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
