import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale
  }
  // Em desenvolvimento lêem-se do disco a cada pedido: com o `import` o Turbopack
  // guardava o JSON em cache e as alterações aos textos só apareciam depois de
  // reiniciar o servidor. Em produção, o import (empacotado no build).
  const messages =
    process.env.NODE_ENV === 'development'
      ? JSON.parse(await readFile(path.join(process.cwd(), 'src/messages', `${locale}.json`), 'utf8'))
      : (await import(`./messages/${locale}.json`)).default
  return { locale, messages }
})
