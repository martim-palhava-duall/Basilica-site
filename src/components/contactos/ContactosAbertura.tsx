import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import ContactosFormulario from '@/components/contactos/ContactosFormulario'

const TRIM = { textBox: 'trim-both cap alphabetic' } as React.CSSProperties

/**
 * Contactos, abertura e formulário — design novo (Figma, nó 111:3534), desktop
 * 1440, 1194 de altura.
 *
 * Cabeçalho (label, título de 80px e frase) com régua por baixo; depois duas
 * colunas separadas por um traço vertical: à esquerda o formulário (911) e, à
 * direita (329), telefone, email, morada e atendimento no cartório. As horas
 * do cartório lêem-se de `horarios` (fonte única) e os assuntos do formulário
 * vêm dos que já existiam em `contactos`.
 */
export default function ContactosAbertura() {
  const t = useTranslations('contactar')
  const a = useTranslations('contactos')
  const h = useTranslations('horarios')

  const textos = {
    nomeLabel: t('nomeLabel'),
    nomePh: t('nomePh'),
    emailLabel: t('emailLabel'),
    emailPh: t('emailPh'),
    assuntoLabel: t('assuntoLabel'),
    assuntoPh: t('assuntoPh'),
    assuntos: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => a(`assunto${n}`)),
    msgLabel: t('msgLabel'),
    msgPh: t('msgPh'),
    enviar: t('enviar'),
    destino: t('emailValor'),
  }

  const dados: { chave: string; label: string; linhas: string[]; href?: string }[] = [
    { chave: 'telefone', label: t('telefone'), linhas: [t('telefoneValor')], href: `tel:${t('telefoneValor').replace(/\s/g, '')}` },
    { chave: 'email', label: t('email'), linhas: [t('emailValor')], href: `mailto:${t('emailValor')}` },
    { chave: 'morada', label: t('morada'), linhas: [t('morada1'), t('morada2')] },
    { chave: 'cartorio', label: t('cartorio'), linhas: [h('cartorioHoras').replace(/ ÀS /g, ' às '), h('cartorioDias')] },
  ]

  return (
    <section
      id="contacto"
      data-barra="var(--bege-claro-2)"
      className="flex w-full flex-col gap-[calc(64*var(--u))] px-[calc(32*var(--u))] py-[calc(120*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-full flex-col gap-[calc(48*var(--u))]">
        <div className="flex w-[calc(562*var(--u))] flex-col gap-[calc(40*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('label')}</p></Revelar>
            <Revelar atraso={100}>
              <h1 className="font-display text-[length:calc(80*var(--u))] leading-none tracking-[calc(0.96*var(--u))] font-normal" style={TRIM}>{t('titulo')}</h1>
            </Revelar>
          </div>
          <Revelar atraso={200}><p className="w-[calc(561*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-[1.4]">{t('sub')}</p></Revelar>
        </div>
        <div aria-hidden="true" className="h-px w-full bg-[rgba(28,43,57,0.25)]" />
      </div>

      <div className="flex w-full items-start gap-[calc(68*var(--u))]">
        <div className="flex w-[calc(911*var(--u))] shrink-0 flex-col gap-[calc(64*var(--u))]">
          <Revelar>
            <div className="flex w-[calc(561*var(--u))] flex-col gap-[calc(24*var(--u))]">
              <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
                <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{t('formLabel')}</p>
                <h2 className="font-display text-[length:calc(24*var(--u))] leading-none tracking-[calc(0.96*var(--u))] font-normal" style={TRIM}>{t('formTitulo')}</h2>
              </div>
              <p className="text-[length:max(11px,calc(12*var(--u)))] leading-[1.4] opacity-60">
                {t('formTexto1')}
                <br />
                {t('formTexto2')}
              </p>
            </div>
          </Revelar>
          <ContactosFormulario textos={textos} />
        </div>

        <div aria-hidden="true" className="h-[calc(631*var(--u))] w-px shrink-0 bg-[rgba(28,43,57,0.25)]" />

        <dl className="flex w-[calc(329*var(--u))] flex-col gap-[calc(48*var(--u))] py-[calc(40*var(--u))]">
          {dados.map((d) => (
            <div key={d.chave} className="flex w-full flex-col gap-[calc(12*var(--u))]">
              <dt className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))] font-bold">{d.label}</dt>
              <dd className="font-display text-[length:calc(24*var(--u))] leading-none tracking-[calc(0.96*var(--u))]" style={TRIM}>
                {d.href ? (
                  <a href={d.href} className="transition-opacity duration-[400ms] ease-[var(--ease-out)] hover:opacity-60">{d.linhas[0]}</a>
                ) : (
                  d.linhas.map((l) => <span key={l} className="block">{l}</span>)
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
