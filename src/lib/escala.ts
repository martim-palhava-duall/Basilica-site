/**
 * Escala do desenho acima dos 1440px.
 *
 * O site foi desenhado a 1440 de largura. Daí para cima e para baixo tudo
 * acompanha a largura em proporção (títulos, textos, espaços, margens,
 * fotografias), em rampa contínua: de 0,711 (1024px) a 1,78 (2560px). Os textos
 * pequenos têm um piso de 11px para não ficarem ilegíveis nos ecrãs mais estreitos.
 *
 * Abaixo de 1024 (mobile) a referência passa a ser 390: `--u` vale 1px a 390.
 *
 * Em CSS: `--u` vale 1px a 1440 e cresce com a largura (ver globals.css); todos
 * os tamanhos em píxeis do código são `calc(N * var(--u))`. Em JavaScript,
 * `escalaUi()` dá o mesmo fator (para medidas que se calculam em runtime) e
 * `u(n)` escreve um comprimento já escalado para usar em `style`.
 */
export const LARGURA_BASE = 1440
export const ESCALA_MIN = 1024 / 1440
export const ESCALA_MAX = 1.78

/** Abaixo desta largura é o mobile (`max-lg:` no Tailwind) */
export const LIMITE_MOBILE = 1024
/** Largura de referência do mobile: aí `--u` vale 1px */
export const LARGURA_MOBILE = 390
export const ESCALA_MAX_MOBILE = 1.6
/** Tablet (768 a 1023): `--u` vale 1,2px a 768 e sobe até 1,35px (largura de referência 640) */
export const LIMITE_TABLET = 768
export const LARGURA_TABLET = 640
export const ESCALA_MAX_TABLET = 1.35

export function ehMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < LIMITE_MOBILE
}

export function escalaUi(): number {
  if (typeof window === 'undefined') return 1
  if (ehMobile()) {
    if (window.innerWidth >= LIMITE_TABLET) return Math.min(window.innerWidth / LARGURA_TABLET, ESCALA_MAX_TABLET)
    return Math.min(window.innerWidth / LARGURA_MOBILE, ESCALA_MAX_MOBILE)
  }
  return Math.min(Math.max(window.innerWidth / LARGURA_BASE, ESCALA_MIN), ESCALA_MAX)
}

/**
 * Escala do menu de âncoras: acompanha só 40% do crescimento (em CSS, `--ui`).
 * Num ecrã grande a faixa é uma ajuda de navegação, não conteúdo: cresce menos.
 */
export const FATOR_ANCORAS = 0.4
export function escalaAncoras(): number {
  return 1 + (escalaUi() - 1) * FATOR_ANCORAS
}

/** Comprimento escalado: u(32) → "calc(32 * var(--u))" */
export const u = (n: number) => `calc(${n} * var(--u))`
