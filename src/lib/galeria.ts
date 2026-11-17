/**
 * Fotografias das galerias do site — as sete da frame "Galeria" do Figma (nó
 * 201:4996), pela ordem do desenho. Usadas nas Partilhas de Imagens (Sobre nós e
 * Notícias) e na galeria dos painéis laterais (Sacramentos, Grupos Culturais e
 * Devoções). O texto alternativo de cada uma está em `sobre.galAlt1…7`.
 */
export const FOTOS_GALERIA = Array.from({ length: 7 }, (_, k) => `/sobre/partilha-${k + 1}.jpg`)

/** Galeria dos painéis: 400 de altura; as fotografias são 3:2, por isso 600 de largura */
export const GALERIA_PAINEL = FOTOS_GALERIA.map((src) => ({ src, largura: 600 }))

/**
 * Fotografias da paróquia (pasta "fotos cliente"), com a largura que lhes dá a
 * altura de 400 do painel. Da catequese escolheram-se as em que as crianças não
 * se reconhecem (de costas, só as mãos, ou objetos da sala); do batizado, todas.
 */
export const GALERIA_CATEQUESE = [
  { src: '/vida/catequese/1.jpg', largura: 600 },
  { src: '/vida/catequese/2.jpg', largura: 600 },
  { src: '/vida/catequese/3.jpg', largura: 600 },
  { src: '/vida/catequese/4.jpg', largura: 600 },
  { src: '/vida/catequese/5.jpg', largura: 266 },
  { src: '/vida/catequese/6.jpg', largura: 600 },
]
export const GALERIA_BATISMO = [
  { src: '/celebracoes/batizado/1.jpg', largura: 533 },
  { src: '/celebracoes/batizado/2.jpg', largura: 300 },
  { src: '/celebracoes/batizado/3.jpg', largura: 300 },
  { src: '/celebracoes/batizado/4.jpg', largura: 300 },
  { src: '/celebracoes/batizado/5.jpg', largura: 300 },
  { src: '/celebracoes/batizado/6.jpg', largura: 300 },
]
