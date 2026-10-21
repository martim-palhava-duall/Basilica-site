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
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Antes do primeiro paint: há JavaScript, por isso as entradas animadas podem começar escondidas */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        {/* Adobe Fonts kit — Forevs (display) + Area Normal (body). See globals.css
            for the --font-display / --font-body assignment. */}
        <link rel="stylesheet" href="https://use.typekit.net/tuk8ddf.css" />
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
