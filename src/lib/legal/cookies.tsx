import type { DocumentoLegal } from '@/lib/legal/tipos'
import { EMAIL, ext, interna } from '@/lib/legal/comum'

/**
 * Política de Cookies — conteúdo.
 *
 * Descreve o que o site faz de facto (verificado em 2026-11-05):
 * - um único cookie próprio, `NEXT_LOCALE` (next-intl, src/routing.ts), de sessão;
 * - Vercel Web Analytics (@vercel/analytics), que mede sem cookies;
 * - o mapa do Google Maps incorporado em Basílica e Convento (MapaBasilica), que
 *   carrega cookies da Google;
 * - os tipos de letra da Adobe Fonts (layout.tsx), sem cookies;
 * - a bilheteira em plataforma externa (lib/links, BILHETEIRA) e as redes sociais,
 *   que são só ligações.
 *
 * Se algum destes mudar (um vídeo do YouTube, outro serviço de estatística, um
 * banner de consentimento), atualizar este texto e a data `atualizado`.
 */

export const POLITICA_COOKIES: DocumentoLegal = {
  titulo: 'Política de Cookies',
  resumo:
    'O site da Basílica da Estrela foi pensado para usar o mínimo de cookies possível. Aqui explicamos quais são, para que servem e como pode controlá-los.',
  atualizado: '5 de novembro de 2026',
  seccoes: [
    {
      id: 'o-que-sao',
      curto: 'O que são',
      titulo: 'O que são cookies?',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Cookies são pequenos ficheiros de texto que um site guarda no seu computador, tablet ou telemóvel quando o visita. Servem para o site funcionar corretamente, lembrar escolhas que fez ou perceber como é utilizado.',
        },
        {
          tipo: 'p',
          texto:
            'Existem tecnologias semelhantes, como o armazenamento local do navegador. Nesta política, quando falamos de cookies, incluímos também essas tecnologias.',
        },
      ],
    },
    {
      id: 'que-cookies',
      curto: 'Cookies usados',
      titulo: 'Que cookies usamos',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Não usamos cookies de publicidade nem criamos perfis de quem nos visita. O site guarda apenas um cookie próprio, necessário ao seu funcionamento.',
        },
        { tipo: 'sub', titulo: '1. Cookies estritamente necessários' },
        {
          tipo: 'p',
          texto:
            'São indispensáveis para o site funcionar e não podem ser desligados. Por isso, a lei não exige o seu consentimento para os utilizar.',
        },
        {
          tipo: 'tabela',
          codigo: true,
          colunas: ['Cookie', 'Finalidade', 'Duração'],
          linhas: [['NEXT_LOCALE', 'Guarda a língua em que o site é apresentado.', 'Sessão (apaga-se ao fechar o navegador)']],
        },
        { tipo: 'sub', titulo: '2. Medição de audiência' },
        {
          tipo: 'p',
          texto: (
            <>
              Para sabermos quantas pessoas visitam o site e que páginas são mais consultadas, usamos o{' '}
              {ext('https://vercel.com/docs/analytics/privacy-policy', 'Vercel Web Analytics')}. Este serviço{' '}
              <strong>não usa cookies</strong> nem guarda dados no seu dispositivo: os números são agregados e não
              permitem identificar quem visita.
            </>
          ),
        },
        { tipo: 'sub', titulo: '3. Cookies funcionais' },
        {
          tipo: 'p',
          texto: 'Não usamos. O site não guarda preferências pessoais no seu dispositivo.',
        },
        { tipo: 'sub', titulo: '4. Cookies de publicidade' },
        {
          tipo: 'p',
          texto: 'Não usamos. Não mostramos publicidade nem partilhamos dados com redes de publicidade.',
        },
      ],
    },
    {
      id: 'terceiros',
      curto: 'Terceiros',
      titulo: 'Serviços de terceiros',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Algumas páginas apresentam conteúdos de outras entidades, que podem usar os seus próprios cookies, de acordo com as suas políticas. Não controlamos esses cookies.',
        },
        {
          tipo: 'lista',
          itens: [
            <>
              <strong>Google Maps.</strong> O mapa da página Basílica e Convento é fornecido pela Google, que pode
              guardar cookies para o mapa funcionar e para fins próprios. Saiba mais na{' '}
              {ext('https://policies.google.com/technologies/cookies?hl=pt-PT', 'política de cookies da Google')}.
            </>,
            <>
              <strong>Adobe Fonts.</strong> Os tipos de letra do site são servidos pela Adobe, que{' '}
              {ext('https://www.adobe.com/privacy/policies/adobe-fonts.html', 'não usa cookies')} para este fim.
            </>,
            <>
              <strong>Bilheteira.</strong> A compra de bilhetes para visitas é feita numa plataforma externa, que tem a
              sua própria política de cookies e de privacidade.
            </>,
            <>
              <strong>Redes sociais.</strong> As ligações para o Instagram e outras redes levam aos sites dessas
              entidades. Só ao abri-los é que esses sites podem usar cookies.
            </>,
          ],
        },
      ],
    },
    {
      id: 'gerir',
      curto: 'Gerir cookies',
      titulo: 'Como gerir os cookies',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Pode ver, apagar ou bloquear cookies a qualquer momento nas definições do seu navegador. Os passos variam de navegador para navegador:',
        },
        {
          tipo: 'lista',
          itens: [
            ext('https://support.google.com/chrome/answer/95647?hl=pt', 'Google Chrome'),
            ext('https://support.apple.com/pt-pt/guide/safari/sfri11471/mac', 'Safari'),
            ext('https://support.mozilla.org/pt-PT/kb/limpar-cookies-e-dados-de-sites-no-firefox', 'Mozilla Firefox'),
            ext('https://support.microsoft.com/pt-pt/microsoft-edge/eliminar-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09', 'Microsoft Edge'),
          ],
        },
        {
          tipo: 'p',
          texto:
            'Se bloquear todos os cookies, algumas partes do site podem deixar de funcionar como esperado, por exemplo o mapa da página Basílica e Convento.',
        },
      ],
    },
    {
      id: 'duracao',
      curto: 'Duração',
      titulo: 'Durante quanto tempo',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Os cookies de sessão apagam-se quando fecha o navegador. Os cookies persistentes ficam guardados durante um período definido, ou até os apagar.',
        },
        {
          tipo: 'p',
          texto:
            'O único cookie próprio do site, NEXT_LOCALE, é de sessão. A duração dos cookies de terceiros é definida por cada serviço, nas respetivas políticas.',
        },
      ],
    },
    {
      id: 'alteracoes',
      curto: 'Alterações',
      titulo: 'Alterações a esta política',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Podemos atualizar esta política quando o site mudar ou a lei o exigir. A data da última atualização está sempre indicada no topo desta página.',
        },
      ],
    },
    {
      id: 'contacto',
      curto: 'Contacto',
      titulo: 'Contacto',
      blocos: [
        {
          tipo: 'p',
          texto: (
            <>
              Para qualquer dúvida sobre esta política ou sobre o tratamento dos seus dados (veja a nossa{' '}
              {interna('/politica-de-privacidade', 'Política de Privacidade')}), escreva-nos para{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou por carta para Basílica da Estrela, Praça da Estrela,
              1200-667 Lisboa.
            </>
          ),
        },
        {
          tipo: 'p',
          texto: (
            <>
              Tem também o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (
              {ext('https://www.cnpd.pt', 'cnpd.pt')}).
            </>
          ),
        },
      ],
    },
  ],
}
