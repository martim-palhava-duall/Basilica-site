/** Partilhado pelos documentos legais: contacto da Basílica e ligação externa */
export const EMAIL = 'geral@basilicadaestrela.pt'
export const MORADA = 'Praça da Estrela, 1200-667 Lisboa'

export const ext = (href: string, texto: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{texto}</a>
)

/** Ligação a outra página do site */
export const interna = (href: string, texto: string) => <a href={href}>{texto}</a>
