/**
 * Bilheteira / compra de visitas — plataforma externa (ver DESIGN.md, "Bilheteira").
 * PROVISÓRIO: aponta para o Google até haver o link do fornecedor; trocar só aqui.
 * Usado por todos os "Visitar": o botão ao lado do Menu (hero e barra), o do
 * cabeçalho do menu e as ligações "Visitar" das listas do menu e do rodapé.
 */
export const BILHETEIRA = 'https://www.google.com'

/** Atributos para abrir ligações externas num separador novo (as internas ficam como estão) */
export function externo(href: string) {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
