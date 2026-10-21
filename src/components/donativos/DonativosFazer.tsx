import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import DonativosFormulario from '@/components/donativos/DonativosFormulario'

/**
 * Donativos, Fazer um donativo — design novo (Figma, nó 111:2391), desktop 1440.
 *
 * Fundo bege escuro 2, 120 de respiro. Título (label + 80px) e, por baixo, a
 * fotografia do altar (603×598) e o formulário (678). Os textos dos campos são
 * os do formulário que já existia (namespace `donativos`): categorias, valor,
 * notas e a nota de segurança do Easypay. O Figma escreve "Assunto" no campo do
 * valor e "Pocional" na ajuda; aqui ficam "Valor do donativo" e "Opcional".
 */
export default function DonativosFazer() {
  const t = useTranslations('donar')
  const d = useTranslations('donativos')

  return (
    <section
      id="donativo"
      data-barra="var(--bege-escuro-2)"
      className="flex w-full flex-col gap-[calc(64*var(--u))] px-[calc(32*var(--u))] py-[calc(120*var(--u))] bg-[var(--bege-escuro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] tracking-[calc(-0.064*var(--u))]">{t('formLabel')}</p></Revelar>
        <Revelar atraso={100}>
          <h2
            className="font-display text-[length:calc(80*var(--u))] leading-[calc(105.6*var(--u))] font-normal whitespace-nowrap"
            style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
          >
            {t('formTitulo')}
          </h2>
        </Revelar>
      </div>

      <Revelar atraso={150}>
        <DonativosFormulario
          foto="/donativos/forma.jpg"
          fotoAlt={t('formFotoAlt')}
          textos={{
            categoriaLabel: d('formCategoriaLabel'),
            categoriaPlaceholder: d('formCategoriaPlaceholder'),
            categorias: [d('formCat1'), d('formCat2'), d('formCat3'), d('formCat4')],
            valorLabel: d('formValorLabel'),
            valorPlaceholder: d('formValorPlaceholder'),
            notasLabel: d('formNotasLabel'),
            notasPlaceholder: d('formNotasPlaceholder'),
            notasAjuda: d('formNotasHelp'),
            enviar: d('formSubmit'),
            seguranca: d('formSeguranca'),
            pendente: t('formPendente'),
          }}
        />
      </Revelar>
    </section>
  )
}
