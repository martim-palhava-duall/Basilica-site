# Decisões de design

O `BRANDING.md` explica o que a **marca** define (fontes, cores, hierarquias, vindas
da apresentação da Alfred). Este documento regista as decisões de **design do site** —
de onde vieram e porquê — para não se perderem entre sessões.

---

## 1. Os sites de referência

Cinco sites escolhidos pelo cliente como direção. Todos partilham o mesmo registo:
editorial, fotográfico, com serif expressiva e muito espaço branco.

| Site | O que se tirou de lá |
|---|---|
| [living.paisana.studio](https://living.paisana.studio) | **Fotografia encaixada dentro do título** — a assinatura do site. Serif com romano e itálico misturados na mesma frase. |
| [tengilemalamala.com](https://tengilemalamala.com) | Linhas de título **desencontradas** (indentação assimétrica). Seta em compartimento próprio no botão. |
| [vivre.agency](https://vivre.agency) | Label com **filete horizontal** ao lado (`VISITAR ———`). Hero fotográfico full-bleed. |
| [insidermadeira.com](https://www.insidermadeira.com) | **Cards creme com ícones de linha** (usados na Obra Social). Seta separada no botão. |
| [hotelbelavista.net](https://www.hotelbelavista.net/pt) | **Parágrafo-manifesto** em serif grande e centrado como momento de pausa. |

**Tecnologia:** confirmei por inspeção que paisana, vivre, insider e bela vista usam
todos **Lenis** (scroll suave) + **GSAP ScrollTrigger** (animações de entrada). O tengile
não usa. É exatamente a combinação que o projeto já tinha instalada e que está agora ligada
(`components/layout/SmoothScroll.tsx` e `components/ui/Reveal.tsx`).

**Direção escolhida pelo cliente:** *editorial delicado* (família paisana/tengile), em
detrimento do registo mais declarativo e turístico do bela vista/vivre.

---

## 2. Decisões tomadas

### Hero
- Fotografia do interior durante a missa (não a fachada) — capta melhor "casa de oração".
- Scrim **deliberadamente leve**: a foto já é escura. O gradiente pesado que servia a foto
  anterior (fachada clara) enlameava esta. Ver comentário em `page.tsx`.
- Título desencontrado: `Basílica` / *`da Estrela`* em itálico, à maneira do tengile.
- **Título e CTAs à esquerda; frase da marca alinhada à direita**, na mesma base.

### Manifesto vs. Visitar — porque são diferentes
As duas secções chegaram a ter o **mesmo** tratamento (serif grande, itálicos e fotografias
dentro do texto) e competiam uma com a outra. Resolvido assim:

- **Manifesto** — declaração puramente tipográfica, sem imagens, alinhada à esquerda, sobre creme.
- **Visitar** — fundo escuro, centrada, com as fotografias encaixadas no título a alternar
  de lado. As imagens inline são agora a **assinatura exclusiva desta secção**.

⚠️ Não voltar a pôr `<media></media>` na chave `manifesto` dos ficheiros de tradução.

### Celebrações
Segue a Linha Religiosa do branding — ver `BRANDING.md` §2 e §3.

### Botões
- Seta em **compartimento próprio**, separada por um filete dentro do botão (tengile, insider).
- Contornos a *hairline* (`current/45`), não traço cheio.
- **Caixa baixa, sem tracking largo.** Maiúsculas espacejadas liam-se como template genérico
  contra a serif editorial — nenhum dos cinco sites de referência as usa nos CTAs.
- Peso *regular*, não *medium*: nos botões cheios é o fundo que dá o contraste.

### Footer
- Duas âncoras: marca + morada à esquerda, navegação agrupada junto à margem direita,
  terminando exatamente onde a régua acaba.
- Handle de Instagram, que aparece no rodapé de todas as peças impressas do branding.

### Bilheteira
Botão próprio no header, com contorno para não se confundir com os links de navegação.
Repetido dentro do menu mobile, onde o do topo fica escondido.
Aponta para `/visita` — **o sitemap indica que a compra é feita em plataforma externa**,
por isso quando houver link do fornecedor deve passar a `external` (abre em separador novo).

---

## 3. Detalhes que é fácil estragar

- **`--color-text-on-dark`** existe porque o `--color-text-secondary` perdeu contraste
  quando o fundo escuro passou a ser o navy da marca. Usar aquele nas secções escuras.
- **`.arch`** tem de vir depois de `.media` no CSS, senão perde a cascata do `border-radius`.
- **`.lead`** usa `--font-body-light` (família `area-normal-light`) e **não**
  `font-weight: 300` — ver `BRANDING.md` §1.
- O **Lenis intercepta o scroll**, o que dificulta capturas de ecrã automáticas de secções
  a meio da página. Para inspecionar o footer, esconder `main` e `header` temporariamente.

---

## 4. Por fazer

1. **Pesos em falta no Adobe Fonts** — Forevs Light e Area Normal Medium/SemiBold.
   O kit ainda não foi republicado (`last_published` continua em 2026-08-15), por isso
   o título do hero renderiza a Regular em vez de Light.
2. **Link real da bilheteira** (plataforma externa).
3. **Restantes páginas** — Visita, Sobre a Basílica, Celebrações, etc.
4. **Notícias** ainda com conteúdo e imagens de exemplo.
5. Considerar as cores **dessaturadas da Linha Religiosa** para distinguir as secções
   litúrgicas das culturais — definido no branding, ainda não explorado.
