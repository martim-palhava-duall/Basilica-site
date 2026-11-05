import type { DocumentoLegal } from '@/lib/legal/tipos'
import { EMAIL, MORADA, interna } from '@/lib/legal/comum'

/**
 * Termos e Condições de utilização do site — conteúdo.
 *
 * Cobre o que o site é e faz: informação institucional e de horários, links para a
 * bilheteira externa, formulário de contacto e donativos (pagos na Easypay).
 *
 * PENDENTE: confirmar a identificação legal do responsável e rever o texto com quem
 * trata dos assuntos jurídicos da Basílica. Atualizar `atualizado` quando mudar.
 */
export const TERMOS: DocumentoLegal = {
  titulo: 'Termos e Condições',
  resumo:
    'Estas são as regras de utilização do site da Basílica da Estrela. Ao navegar neste site, aceita-as. Escrevemo-las de forma simples e curta.',
  atualizado: '5 de novembro de 2026',
  seccoes: [
    {
      id: 'o-site',
      titulo: 'O que é este site',
      curto: 'O site',
      blocos: [
        {
          tipo: 'p',
          texto: `Este site é da Basílica da Estrela (${MORADA}). Serve para dar a conhecer a Basílica e o Convento, divulgar as celebrações, a vida da paróquia e a obra social, e facilitar o contacto e os donativos.`,
        },
        {
          tipo: 'p',
          texto:
            'Ao usar o site, aceita estes termos. Se não concordar, pedimos que deixe de o usar.',
        },
      ],
    },
    {
      id: 'utilizacao',
      titulo: 'Como pode usar o site',
      curto: 'Utilização',
      blocos: [
        {
          tipo: 'p',
          texto: 'O site está aberto a todos, para uso pessoal e sem fins comerciais. Pedimos que não:',
        },
        {
          tipo: 'lista',
          itens: [
            'tente aceder a áreas ou sistemas a que não tem acesso;',
            'prejudique o funcionamento do site, por exemplo com programas que o sobrecarreguem;',
            'use o formulário de contacto para enviar mensagens ofensivas, falsas ou publicidade não solicitada;',
            'copie o site de forma automática em grande escala.',
          ],
        },
      ],
    },
    {
      id: 'conteudos',
      titulo: 'Textos, imagens e marca',
      curto: 'Conteúdos',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Os textos, as fotografias, o logótipo, a identidade visual e os restantes conteúdos do site pertencem à Basílica da Estrela ou a quem no-los cedeu, e estão protegidos pela lei dos direitos de autor.',
        },
        {
          tipo: 'p',
          texto: (
            <>
              Pode partilhar as páginas e citar pequenos trechos, indicando a fonte. Para qualquer outro uso, incluindo
              imprensa e uso comercial, peça autorização por escrito em <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </>
          ),
        },
      ],
    },
    {
      id: 'informacao',
      titulo: 'Horários e informação',
      curto: 'Informação',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Fazemos o possível para que a informação do site esteja certa e atualizada, mas horários de missas, confissões, visitas e eventos podem mudar, por exemplo nas festas litúrgicas ou por razões imprevistas. Em caso de dúvida, confirme com o secretariado antes de se deslocar.',
        },
      ],
    },
    {
      id: 'bilhetes',
      titulo: 'Bilhetes e visitas',
      curto: 'Bilhetes',
      blocos: [
        {
          tipo: 'p',
          texto:
            'A compra de bilhetes para visitas é feita numa plataforma externa, para onde o site o encaminha. Essa compra rege-se pelos termos e pela política de privacidade dessa plataforma, e não por estes. Dúvidas sobre uma compra devem ser dirigidas a essa plataforma.',
        },
      ],
    },
    {
      id: 'donativos',
      titulo: 'Donativos',
      curto: 'Donativos',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Os donativos são voluntários e servem para sustentar a Basílica, a sua liturgia, a conservação do edifício e a obra social. O pagamento é feito no ecrã da Easypay, que o processa de forma segura. Este site não recebe nem guarda dados de cartão.',
        },
        {
          tipo: 'p',
          texto: (
            <>
              Para dúvidas sobre um donativo, ou para donativos de outra natureza, escreva ao secretariado em{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Os dados pessoais associados são tratados como explicado na
              nossa {interna('/politica-de-privacidade', 'Política de Privacidade')}.
            </>
          ),
        },
      ],
    },
    {
      id: 'ligacoes',
      titulo: 'Ligações para outros sites',
      curto: 'Ligações',
      blocos: [
        {
          tipo: 'p',
          texto:
            'O site tem ligações para páginas de outras entidades, como a bilheteira ou as redes sociais. Não controlamos esses sites e não somos responsáveis pelo seu conteúdo nem pelas suas políticas.',
        },
      ],
    },
    {
      id: 'responsabilidade',
      titulo: 'Responsabilidade',
      curto: 'Responsabilidade',
      blocos: [
        {
          tipo: 'p',
          texto:
            'O site é oferecido tal como está. Não garantimos que funcione sem interrupções nem sem erros, e podemos alterá-lo ou suspendê-lo a qualquer momento. Dentro do que a lei permite, não respondemos por danos resultantes do uso do site ou da impossibilidade de o usar. Isto não afeta os direitos que a lei lhe reconhece enquanto consumidor.',
        },
      ],
    },
    {
      id: 'lei',
      titulo: 'Lei aplicável',
      curto: 'Lei aplicável',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Estes termos regem-se pela lei portuguesa. Em caso de litígio, serão competentes os tribunais portugueses, sem prejuízo dos direitos que a lei lhe reconheça como consumidor.',
        },
      ],
    },
    {
      id: 'alteracoes',
      titulo: 'Alterações e contacto',
      curto: 'Alterações',
      blocos: [
        {
          tipo: 'p',
          texto:
            'Podemos alterar estes termos quando o site mudar ou a lei o exigir. A data da última atualização está sempre indicada no topo desta página, e continuar a usar o site depois disso significa que aceita a versão nova.',
        },
        {
          tipo: 'p',
          texto: (
            <>
              Para qualquer questão sobre estes termos, escreva-nos para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </>
          ),
        },
      ],
    },
  ],
}
