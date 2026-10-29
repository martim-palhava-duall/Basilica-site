import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Revelar from '@/components/home/Revelar'
import Seta from '@/components/home/Seta'

/**
 * Contactos, Redes Sociais — design novo (Figma, nó 111:3595), desktop 1440,
 * 561 de altura, fundo azul.
 *
 * Fotografia de 710×561 à esquerda e, à direita (678, centrado na vertical),
 * label, título de 80px, frase e as quatro redes em grelha de duas colunas.
 * Só o Instagram da basílica tem endereço conhecido; os outros ficam
 * por ligar (`href: undefined` → sem ligação até haver URL). A secção é baixa:
 * a barra de topo mantém a cor da anterior (bege claro 2).
 */
const REDES = [
  { chave: 'rInstagram', href: 'https://instagram.com/basilicadaestrela' },
  { chave: 'rInstagramVisitas', href: undefined },
  { chave: 'rFacebook', href: undefined },
  { chave: 'rWhatsapp', href: undefined },
] as const

export default function ContactosRedes() {
  const t = useTranslations('contactar')

  return (
    <section
      id="redes"
      data-barra="var(--bege-claro-2)"
      className="flex h-[calc(561*var(--u))] max-lg:h-auto max-lg:flex-col max-lg:items-stretch max-lg:gap-[calc(40*var(--u))] w-full items-center gap-[calc(20*var(--u))] max-lg:pb-[calc(72*var(--u))] bg-[var(--brand-blue)] text-[var(--bege-claro-2)]"
    >
      <div className="relative h-[calc(561*var(--u))] w-[calc(710*var(--u))] max-lg:h-[calc(300*var(--u))] max-lg:w-full shrink-0">
        <Image src="/contactos/redes.jpg" alt={t('redesAlt')} fill sizes="710px" className="object-cover" />
      </div>

      <div className="flex h-[calc(370*var(--u))] max-lg:h-auto w-[calc(678*var(--u))] max-lg:w-full flex-col px-[calc(32*var(--u))] max-lg:px-[calc(20*var(--u))]">
        <div className="flex w-[calc(614*var(--u))] max-lg:w-full flex-col gap-[calc(40*var(--u))] max-lg:gap-[calc(24*var(--u))]">
          <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
            <Revelar><p className="text-[length:var(--t-etiqueta)] leading-[1.4]">{t('redesLabel')}</p></Revelar>
            <Revelar atraso={100}>
              <h2
                className="font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(44*var(--u))] leading-none tracking-[calc(0.96*var(--u))] max-lg:tracking-normal font-normal"
                style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
              >
                {t('redesTitulo')}
              </h2>
            </Revelar>
          </div>
          <Revelar atraso={200}><p className="w-[calc(320*var(--u))] max-lg:w-full text-[length:var(--t-etiqueta)] max-lg:text-[length:var(--t-pequeno)] leading-[1.4] max-lg:leading-[1.5]">{t('redesTexto')}</p></Revelar>
        </div>

        <Revelar atraso={250} className="mt-[calc(106.5*var(--u))] max-lg:mt-[calc(36*var(--u))]">
          <ul className="grid w-[calc(341*var(--u))] max-lg:w-full grid-cols-2 max-lg:grid-cols-1 gap-x-[calc(12*var(--u))] gap-y-[calc(20*var(--u))] max-lg:gap-y-[calc(24*var(--u))]">
            {REDES.map((r) => {
              const conteudo = (
                <>
                  <span
                    className="font-display text-[length:calc(24*var(--u))] leading-none tracking-[calc(0.96*var(--u))] whitespace-nowrap"
                    style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
                  >
                    {t(r.chave)}
                  </span>
                  <Seta className="group-hover/rede:translate-x-[calc(4*var(--u))]" />
                </>
              )
              return (
                <li key={r.chave}>
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="alvo-toque group/rede flex items-center gap-[calc(12*var(--u))]">
                      {conteudo}
                    </a>
                  ) : (
                    <span className="group/rede flex items-center gap-[calc(12*var(--u))]">{conteudo}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </Revelar>
      </div>
    </section>
  )
}
