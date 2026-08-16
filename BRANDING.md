# Branding — como aplicar ao site

Notas extraídas da apresentação **"Basílica da Estrela — Apresentação.pdf"** (Alfred, 42 páginas).
As referências de página abaixo são desse PDF.

---

## 1. As fontes

| Uso | Fonte | Variável CSS |
|---|---|---|
| Display / títulos | **Forevs** (serif, OH no Type Co.) | `--font-display` |
| Corpo / labels | **Area Normal** (grotesca, Blaze Type) | `--font-body` |

⚠️ **O Manrope que aparece no PDF não é do branding** — é apenas o template da apresentação da agência (os cabeçalhos "Alfred / Basílica da Estrela Identidade" nas margens). Ignorar.

Vêm do Adobe Fonts por link (ver `layout.tsx`). O kit atual só tem Regular (400) e Bold (700) de cada família, mais um Light (300) à parte. Se forem precisos pesos intermédios, adicionar ao Web Project no Adobe Fonts — o link mantém-se.

---

## 2. A descoberta principal: duas linhas tipográficas

O branding usa **dois registos distintos** consoante o conteúdo (visível na paleta da p26, que também se divide em "Linha cultural" e "Linha Religiosa"):

### Linha Cultural — exposições, concertos, editorial
Títulos em **Forevs itálico**, caixa alta e baixa. Registo expressivo, artístico.

> *The Beauty is a Choice* (p27, p31) · *Requiem for Mozart* (p27) · *Magnificat* (p27, p38) · *Semana Santa* (p32) · *Coral Públia Hortênsia* (p34)

### Linha Religiosa — horários, liturgia, informação
Títulos em **Forevs MAIÚSCULAS**. Registo formal, institucional.

> SEMANA SANTA · NATAL · SAGRADO CORAÇÃO DE JESUS (p28, p32)

**Mapeamento para o site:**

| Secção | Linha | Tratamento |
|---|---|---|
| Hero, Manifesto, Visitar, Quem Somos, Notícias | Cultural | Forevs itálico (já aplicado) |
| **Celebrações / Horários** | **Religiosa** | **Forevs MAIÚSCULAS** ← por aplicar |
| Obra Social | Religiosa ou neutra | a decidir |

---

## 3. Estrutura dos horários (p28 e p32)

Este é o modelo a replicar na secção de Celebrações. Anatomia dos cartazes:

```
HORÁRIOS DAS CELEBRAÇÕES        ← Area, MAIÚSC., pequeno, com tracking
SEMANA SANTA                    ← Forevs, MAIÚSC., muito grande
────────────────────────────    ← régua fina
QUINTA-FEIRA SANTA              ← Area, MAIÚSC., pequeno, semibold
19H00                           ← Area, MAIÚSC., semibold
MISSA DA CEIA                   ← Area, MAIÚSC., light, pequeno
DO SENHOR
```

Disposto em **3 colunas**. Logótipo em baixo à direita; `@basilicadaestrela` e `basilicadaestrela.com` em baixo à esquerda.

**Formato das horas — importante:** o branding usa `19H00`, `11H30 ÀS 13H00` (H maiúsculo, sem dois pontos).
O site usa atualmente `10h · 12h · 19h` em `messages/pt.json` — **deve ser alinhado**.

Variante em `p28` (Sagrado Coração): as **datas** aparecem em Forevs serif grande (`21, 22 E 23 / DE JUNHO`), com o mês numa segunda linha. Bom recurso para dar hierarquia a datas de eventos.

**p39** (sinalética informativa) mostra a versão bilingue, útil para o site PT/EN:
`HORÁRIOS DE ABERTURA / Opening Hours`, `CONFISSÕES / Confessions`, `CELEBRAÇÕES DE MISSAS / Mass Celebrations` — label em maiúsculas PT, tradução em caixa baixa por baixo.

---

## 4. Cores (p26)

Paleta institucional: **azul-marinho escuro, terracota/rosa, azul, areia, creme**.
Existem duas variantes da mesma paleta — a **Linha cultural** mais saturada, a **Linha Religiosa** mais dessaturada/pastel.

O azul-marinho da marca é **`#1c2b39`** (confirmado: é a cor usada nos SVGs do logótipo).
O site usa atualmente `--color-bg-dark: oklch(22% 0.010 260)`, que é um escuro mais neutro. **Alinhar com o `#1c2b39`**, que é visivelmente mais azulado.

---

## 5. "More Than Just Another Church"

Frase-assinatura da marca. Aparece em:
- **p30** — capa do folheto tríptico
- **p31** — folheto díptico cultural
- **p36** — sinalética exterior

Composta em **Forevs romano** (não itálico), em caixa alta e baixa, quebrada em linhas:
`More Than / Just Another / Church`.

O tamanho varia com o suporte: na capa do tríptico (p30) é o título principal, grande;
no díptico e na sinalética é pequena, como assinatura.

✅ **Aplicado:** no header, ao lado do logótipo, separada por um filete vertical
(escondida abaixo de `lg`, para não competir com a navegação em ecrãs estreitos).

---

## 6. Posicionamento (p11, p13)

Citações do próprio documento, úteis para decisões editoriais:

> "A Basílica da Estrela é mais do que um local de culto; é um monumento emblemático de Lisboa que une história, arte e cultura." (p11)

> "…posicionar a Basílica não apenas como uma igreja, mas como um **destino imperdível na cidade**, onde a arquitetura e a história encontram uma oferta cultural rica e diversificada." (p13)

Isto valida o registo editorial/cultural que o site já segue.

---

## 7. Nem tudo é maiúsculas

Nos **cartazes** quase tudo está em maiúsculas, porque são peças de leitura rápida à distância.
Mas nos **folhetos** (p30), onde há texto corrido, os labels pequenos estão em **caixa baixa a
negrito**: `Opening Hours:`, `How to get there:`, `Admission and Tickets:`.

Regra prática para o site:
- Maiúsculas → eyebrows de secção, cabeçalhos de coluna, horas (peças curtas e estruturais)
- Caixa baixa → tudo o que seja texto para ler

---

## 8. Estado

**Aplicado:**
- Forevs + Area via Adobe Fonts
- Logótipo (3 variantes em `public/logos/`, inline em `components/ui/Logo.tsx`)
- Registo editorial itálico nas secções culturais
- Cantos a 6px
- **Paleta da marca** com os valores exatos (tokens `--brand-*` em `globals.css`)
- **Linha Religiosa** na secção de Celebrações: título em maiúsculas Forevs
- **Anatomia da p28**: eyebrow → título → régua → 3 colunas (classes `.schedule-*`)
- **Formato das horas** `10H00`, `18H00 ÀS 19H00`
- **"More Than Just Another Church"** no header

**Por aplicar:**
1. Rever os pesos de fonte — o kit Adobe só tem Regular (400) e Bold (700). Onde o CSS
   pede 500/medium o browser aproxima. Ou adicionar os pesos ao Web Project, ou ajustar o CSS.
2. Considerar usar as cores da **Linha Religiosa** (dessaturadas) para distinguir
   visualmente as secções litúrgicas das culturais — está definido no branding mas
   ainda não explorado no site.
3. Restantes páginas do site.
