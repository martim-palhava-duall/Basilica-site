import type { DocumentoLegal } from '@/lib/legal/tipos'
import { EMAIL, MORADA, ext, interna } from '@/lib/legal/comum'

/**
 * Política de Privacidade — conteúdo.
 *
 * Descreve o que o site faz de facto (verificado em 2026-11-05):
 * - formulário de contacto (ContactosFormulario): não há servidor de email, abre o
 *   programa de email do visitante com a mensagem para o secretariado (`mailto:`);
 * - donativos (DonationForm): o site recolhe só a intenção; o pagamento é feito no
 *   checkout da Easypay e o site nunca toca em dados de cartão. Ainda NÃO está ligado;
 * - Vercel Web Analytics (sem cookies) e alojamento na Vercel;
 * - Google Maps incorporado, Adobe Fonts, bilheteira externa.
 *
 * PENDENTE: confirmar a identificação legal do responsável (paróquia / fábrica da
 * igreja / entidade, NIF) e rever o texto com quem trata do RGPD na Basílica.
 * Atualizar este texto e `atualizado` quando algum destes pontos mudar (ex.: ligar a
 * Easypay, passar o formulário a enviar por servidor).
 */
export const POLITICA_PRIVACIDADE: DocumentoLegal = {
  titulo: 'Política de Privacidade',
  resumo:
    'Respeitamos a sua privacidade. Explicamos aqui que dados pessoais tratamos quando visita este site ou nos contacta, para que os usamos e que direitos tem sobre eles.',
  atualizado: '5 de novembro de 2026',
  seccoes: [
    {
      id: 'responsavel',
      titulo: 'Quem é o responsável',
      curto: 'Responsável',
      blocos: [
        {
          tipo: 'p',
          texto: `O responsável pelo tratamento dos dados pessoais recolhidos neste site é a Basílica da Estrela, com sede na ${MORADA}, Portugal.`,
        },
        {
          tipo: 'p',
          texto: (
            <>
              Para qualquer questão sobre os seus dados, escreva-nos para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              Tratamos os dados de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a lei portuguesa.
            </>
          ),
        },
      ],
    },
    {
      id: 'dados',
      titulo: 'Que dados tratamos e porquê',
      curto: 'Dados tratados',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Só tratamos os dados de que precisamos, e só para a finalidade indicada. Não vendemos dados nem os usamos para publicidade.',
        },
        {
          tipo: 'casos',
          itens: [
            {
              titulo: 'Quando nos contacta',
              resumo: 'Nome, email, assunto e mensagem, para lhe responder.',
              texto:
                'O formulário não guarda a mensagem no site: ao enviar, abre-se o seu programa de email com a mensagem já escrita e dirigida ao secretariado. Só recebemos o que o seu email enviar.',
            },
            {
              titulo: 'Quando faz um donativo',
              resumo: 'Categoria, valor e notas, para registar o donativo.',
              texto: (
                <>
                  O pagamento é feito no ecrã da Easypay, que o processa. Os dados do cartão ou da conta são introduzidos
                  aí, nunca neste site, e nós não os recebemos nem os guardamos.
                </>
              ),
            },
            {
              titulo: 'Quando visita o site',
              resumo: 'Páginas vistas, tipo de dispositivo e país, sempre agregados, para melhorar o site.',
              texto: (
                <>
                  Usamos o {ext('https://vercel.com/docs/analytics/privacy-policy', 'Vercel Web Analytics')}, que conta
                  as visitas sem cookies e sem criar um perfil de quem visita. Saiba mais na{' '}
                  {interna('/politica-de-cookies', 'Política de Cookies')}.
                </>
              ),
            },
          ],
        },
      ],
    },
    {
      id: 'fundamento',
      titulo: 'Em que nos baseamos',
      curto: 'Fundamento',
      blocos: [
        {
          tipo: 'p',
          texto: 'Cada tratamento tem uma base legal prevista no RGPD:',
        },
        {
          tipo: 'lista',
          itens: [
            <>
              <strong>Responder a pedidos e donativos.</strong> É necessário para tratar do que nos pediu (execução de
              diligências a seu pedido).
            </>,
            <>
              <strong>Estatísticas do site.</strong> É do nosso interesse legítimo perceber como o site é usado para o
              melhorar, e fazemo-lo de forma agregada e sem identificar ninguém.
            </>,
            <>
              <strong>Obrigações legais.</strong> Quando a lei nos obriga a conservar certos registos.
            </>,
          ],
        },
      ],
    },
    {
      id: 'partilha',
      titulo: 'Com quem partilhamos',
      curto: 'Partilha',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Só partilhamos dados com quem nos presta serviços necessários ao site, e apenas o que for preciso:',
        },
        {
          tipo: 'lista',
          itens: [
            <>
              <strong>Vercel.</strong> Aloja o site e fornece a medição de audiência.
            </>,
            <>
              <strong>Easypay.</strong> Processa os pagamentos dos donativos.
            </>,
            <>
              <strong>Google.</strong> Fornece o mapa da página Basílica e Convento. Ao ver o mapa, a Google pode
              receber o seu endereço IP.
            </>,
            <>
              <strong>Adobe Fonts.</strong> Fornece os tipos de letra do site.
            </>,
            <>
              <strong>Plataforma de bilheteira.</strong> A compra de bilhetes é feita num site externo, com a sua
              própria política de privacidade.
            </>,
          ],
        },
        {
          tipo: 'p',
          texto:
            'Alguns destes fornecedores podem tratar dados fora da União Europeia. Nesses casos, exigimos as garantias previstas na lei, como as cláusulas contratuais-tipo aprovadas pela Comissão Europeia.',
        },
      ],
    },
    {
      id: 'conservacao',
      titulo: 'Durante quanto tempo guardamos',
      curto: 'Conservação',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Guardamos os dados só o tempo necessário para a finalidade para que foram recolhidos. As mensagens que nos envia ficam no email do secretariado o tempo preciso para tratar do pedido. Os registos de donativos são conservados durante os prazos exigidos pela lei. Depois, são apagados ou anonimizados.',
        },
      ],
    },
    {
      id: 'direitos',
      titulo: 'Os seus direitos',
      curto: 'Direitos',
      blocos: [
        { tipo: 'p', texto: 'Em relação aos seus dados pessoais, tem o direito de:' },
        {
          tipo: 'lista',
          itens: [
            'saber que dados temos sobre si e pedir uma cópia;',
            'corrigir dados incorretos ou incompletos;',
            'pedir que os apaguemos, quando já não forem necessários;',
            'pedir que limitemos o tratamento ou opor-se a ele;',
            'receber os seus dados num formato que possa levar para outra entidade (portabilidade);',
            'retirar a qualquer momento um consentimento que tenha dado, sem afetar o que já foi feito até aí.',
          ],
        },
        {
          tipo: 'p',
          texto: (
            <>
              Para exercer qualquer destes direitos, escreva-nos para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              Respondemos no prazo de um mês. Se achar que os seus dados não são bem tratados, pode apresentar
              reclamação à Comissão Nacional de Proteção de Dados ({ext('https://www.cnpd.pt', 'cnpd.pt')}).
            </>
          ),
        },
      ],
    },
    {
      id: 'seguranca',
      titulo: 'Como protegemos os dados',
      curto: 'Segurança',
      blocos: [
        {
          tipo: 'p',
          texto:
            'O site usa ligação segura (HTTPS) e limitamos o acesso aos dados a quem precisa deles para o seu trabalho. Nenhum sistema é totalmente seguro, mas tomamos as medidas razoáveis para proteger o que nos confia.',
        },
      ],
    },
    {
      id: 'alteracoes',
      titulo: 'Alterações a esta política',
      curto: 'Alterações',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Podemos atualizar esta política quando o site mudar ou a lei o exigir. A data da última atualização está sempre indicada no topo desta página.',
        },
      ],
    },
  ],
}
