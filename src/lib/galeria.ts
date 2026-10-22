/**
 * Fotografias das galerias do site — as sete da frame "Galeria" do Figma (nó
 * 201:4996), pela ordem do desenho. Usadas nas Partilhas de Imagens (Sobre nós e
 * Notícias) e na galeria dos painéis laterais (Sacramentos, Grupos Culturais e
 * Devoções). O texto alternativo de cada uma está em `sobre.galAlt1…7`.
 */
export const FOTOS_GALERIA = Array.from({ length: 7 }, (_, k) => `/sobre/partilha-${k + 1}.jpg`)

/** Galeria dos painéis: 400 de altura; as fotografias são 3:2, por isso 600 de largura */
export const GALERIA_PAINEL = FOTOS_GALERIA.map((src) => ({ src, largura: 600 }))
