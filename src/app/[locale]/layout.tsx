import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/routing'
import SmoothScroll from '@/components/layout/SmoothScroll'
import TransicaoPagina from '@/components/layout/TransicaoPagina'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Basílica da Estrela — Lisboa',
    template: '%s | Basílica da Estrela',
  },
  description: 'A Basílica da Estrela é um monumento histórico e casa de oração no coração de Lisboa, dedicada ao Sagrado Coração de Jesus.',
  keywords: ['Basílica da Estrela', 'Lisboa', 'monumento', 'visitar Lisboa', 'Sagrado Coração de Jesus', 'paróquia'],
  openGraph: {
    title: 'Basílica da Estrela — Lisboa',
    description: 'Mais do que um monumento. Uma casa de oração no coração de Lisboa.',
    locale: 'pt_PT',
    type: 'website',
  },
}

const TYPEKIT = 'https://use.typekit.net/tuk8ddf.css'

const MENSAGENS_CLIENTE = ['basilica', 'common', 'contactos', 'donativos', 'horarios', 'inicio', 'nav', 'obra', 'sobre']

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const todas = await getMessages()
  // Para o browser só vão as mensagens que os componentes de cliente usam
  // (useTranslations em ficheiros 'use client'); as restantes ficam no servidor.
  // Um componente de cliente novo com outro namespace tem de o acrescentar aqui.
  const messages = Object.fromEntries(MENSAGENS_CLIENTE.filter((ns) => ns in todas).map((ns) => [ns, todas[ns]]))

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Antes do primeiro paint: há JavaScript, por isso as entradas animadas podem começar escondidas */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        {/* Adobe Fonts kit — Forevs (display) + Area Normal (body). See globals.css
            for the --font-display / --font-body assignment.
            Inserido por script para não bloquear o primeiro desenho da página: o CSS
            do kit importa outro (p.typekit.net) e a cadeia atrasava tudo ~0,8s no
            telemóvel. O hero espera pela fonte (HeroArranque), por isso o título não
            aparece com a fonte de recurso. */}
        <link rel="preload" as="style" href={TYPEKIT} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${TYPEKIT}';l.id='typekit';document.head.appendChild(l)})()` }} />
        <noscript><link rel="stylesheet" href={TYPEKIT} /></noscript>
      </head>
      <body>
        <SmoothScroll />
        <TransicaoPagina />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
