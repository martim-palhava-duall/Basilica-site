import type { ReactNode } from 'react'

/**
 * Estrutura comum das páginas legais (cookies e, mais tarde, privacidade e termos),
 * desenhadas por components/legal/PaginaLegal. Cada documento é só dados: título,
 * resumo, data e secções numeradas com os seus blocos.
 */
export type BlocoLegal =
  | { tipo: 'p'; texto: ReactNode }
  | { tipo: 'sub'; titulo: string }
  | { tipo: 'lista'; itens: ReactNode[] }
  /** `codigo`: a primeira coluna são nomes técnicos (ex.: nomes de cookies), em letra de código */
  | { tipo: 'tabela'; colunas: string[]; linhas: ReactNode[][]; codigo?: boolean }
  /** Lista de casos separados por filetes: nome, resumo numa linha e explicação */
  | { tipo: 'casos'; itens: { titulo: string; resumo: string; texto: ReactNode }[] }

/** `curto`: o nome da secção na faixa de âncoras (tem de caber numa linha) */
export type SeccaoLegal = { id: string; titulo: string; curto: string; blocos: BlocoLegal[] }

export type DocumentoLegal = {
  titulo: string
  resumo: string
  /** Data da última atualização, por extenso */
  atualizado: string
  seccoes: SeccaoLegal[]
}
