import { defineRouting } from 'next-intl/routing'

/**
 * Só português, por agora. A versão inglesa fica para depois de o design novo
 * estar todo construído: src/messages/en.json continua no repositório mas não
 * é servido. Para a reativar basta voltar a pôr 'en' em `locales`.
 *
 * `localeDetection: false` impede o redirecionamento automático para /en pela
 * língua do browser — com um só idioma não há nada para detetar.
 */
export const routing = defineRouting({
  locales: ['pt'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  localeDetection: false,
})
