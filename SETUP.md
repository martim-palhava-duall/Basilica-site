# Basílica da Estrela — continuar noutro computador

## 1. Onde colocar a pasta

**⚠️ NÃO coloques o projeto no Desktop nem em Documentos se essas pastas estiverem sincronizadas com iCloud (ou Dropbox/Google Drive).**

Isto já nos custou várias horas neste projeto. Quando o projeto está numa pasta sincronizada, cada leitura das ~6.500 ficheiros do `node_modules` passa pela camada de sincronização, e o servidor de desenvolvimento (Turbopack) **encrava a compilar em vez de dar erro** — abre a porta 3000, fica à escuta, e nunca responde. Parece um bug do código, mas não é.

Coloca antes em algo como:

```
~/Projects/basilica-da-estrela
~/dev/basilica-da-estrela
```

Para confirmar se o Desktop está sincronizado no outro Mac:
Definições do Sistema → [a tua conta Apple] → iCloud → iCloud Drive → "Pastas Desktop e Documentos".

## 2. Arrancar

```bash
cd basilica-da-estrela
npm install
npm run dev
```

Depois abre <http://localhost:3000>.

Precisas de **Node 20.19+** (ou 22.13+). O `npm install` avisa se a versão for demasiado antiga.

## 3. Tipografia — já está tratada

As fontes vêm do **Adobe Fonts** por link, não por ficheiros locais:

```html
<link rel="stylesheet" href="https://use.typekit.net/tuk8ddf.css">
```

Está em [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx). Como é um URL, **funciona em qualquer computador** — não precisas de ter as fontes instaladas no sistema para o site as mostrar.

| Uso | Fonte | Variável CSS |
|---|---|---|
| Títulos, display | Forevs (serif, OH no Type Co.) | `--font-display` |
| Corpo, labels | Area Normal (grotesca, Blaze Type) | `--font-body` |

**⚠️ Os cortes Light são uma família separada.** A Adobe serve-os com nome próprio
(`area-normal-light`), por isso `font-weight: 300` sobre `area-normal` é silenciosamente
ignorado. No site usa-se o token `--font-body-light` (classe `.lead`).

Faltam ainda no kit: **Forevs Light** e **Area Normal Medium/SemiBold**. Ver
[`BRANDING.md`](BRANDING.md) §1 para o detalhe e o que fazer.

## 4. Armadilha conhecida: traduções não atualizam

O [`src/i18n.ts`](src/i18n.ts) carrega os textos com `await import()` dinâmico:

```ts
messages: (await import(`./messages/${locale}.json`)).default
```

O Turbopack **não recarrega estes JSON em hot-reload**. Depois de editares
`src/messages/pt.json` ou `en.json`, o site continua a mostrar os textos antigos — ou pior,
imprime a própria chave (`home.massasCol1Head`) e enche a consola de `MISSING_MESSAGE`.

⚠️ **Reiniciar o servidor não chega.** A cache do Turbopack vive em `.next/` e sobrevive ao
restart. É preciso apagá-la:

```bash
rm -rf .next && npm run dev
```

Não é erro teu — é uma limitação do Turbopack com imports dinâmicos de JSON.

## 5. Estrutura

```
src/
  app/[locale]/
    layout.tsx      ← <head>, fontes Adobe, SmoothScroll
    page.tsx        ← a homepage inteira (todas as secções)
    globals.css     ← design tokens: cores, tipografia, espaçamentos, .media, .stagger…
  components/
    layout/  Nav, Footer, SmoothScroll (Lenis)
    ui/      Button, SectionLabel, Reveal (GSAP), Logo
  messages/  pt.json, en.json  ← todo o texto do site
  i18n.ts, routing.ts, middleware.ts  ← next-intl (PT por defeito, EN em /en)

public/
  images/  fotografias
  logos/   os 3 logótipos em SVG (o componente Logo.tsx tem o traçado inline)
```

## 6. Ponto de situação

**Feito:**
- Homepage completa, seguindo a ordem do sitemap do Figma: Hero → Manifesto → Visitar → Celebrações → Quem Somos → Obra Social → Notícias → Doações
- Bilingue PT/EN
- Scroll suave (Lenis) + animações de entrada (GSAP ScrollTrigger)
- Fontes da marca (Forevs + Area) aplicadas
- Logótipo inline em SVG, herda a cor do contexto (claro sobre a foto do hero, escuro depois do scroll)
- Cantos a 6px em tudo (`--radius`)

**A fazer / em curso:**

👉 **Começa por ler estes dois:**

- **[`BRANDING.md`](BRANDING.md)** — o que a *marca* define: as duas linhas tipográficas,
  a anatomia dos horários (p28), as cores exatas, o formato das horas, e a armadilha dos
  pesos Light do Adobe Fonts.
- **[`DESIGN.md`](DESIGN.md)** — as decisões de *design do site*: os cinco sites de
  referência e o que se tirou de cada um, porque é que o Manifesto e a secção Visitar
  são deliberadamente diferentes, como estão feitos os botões e o footer, e a lista
  do que falta.

Além disso:
- Restantes páginas do site (Visita, Sobre a Basílica, etc.) ainda não começadas
- Notícias ainda com conteúdo de exemplo

O PDF de branding **não está no repositório** (59 MB) — está no Desktop de ambas as máquinas.
O `BRANDING.md` foi escrito para que não precises de o reanalisar, mas as referências de
página estão lá caso queiras confirmar algo.

## 7. Git

O projeto já está em **<https://github.com/martim-palhava-duall/Basilica>** (privado).

```bash
git pull     # antes de começar
git push     # ao terminar
```

Numa máquina nova:

```bash
git clone https://github.com/martim-palhava-duall/Basilica.git ~/Projects/Basilica
cd ~/Projects/Basilica && npm install
```

**Autenticação:** o repositório pertence à conta de trabalho `martim-palhava-duall`.
Cada máquina precisa do seu token — [github.com/settings/tokens](https://github.com/settings/tokens)
→ Generate new token (classic) → scope **`repo`**. No push, o username é
`martim-palhava-duall` e a password é o token.

Se o Mac tiver guardada a credencial de outra conta GitHub, o push falha com
*"Repository not found"* em vez de um erro de permissões (é assim que o GitHub protege
repositórios privados). Nesse caso, põe o utilizador no próprio URL do remote:

```bash
git remote set-url origin https://martim-palhava-duall@github.com/martim-palhava-duall/Basilica.git
```

O `.gitignore` já ignora `node_modules` e `.next`.
