import Revelar from '@/components/home/Revelar'

/**
 * Abertura só de texto das páginas interiores (Donativos, Notícias; Figma
 * 111:2366 e 111:2678): label e título (80px, caixa trimada às maiúsculas) à
 * esquerda, a 80 do topo, e o texto alinhado à direita a 60% de opacidade
 * (445 de largura). 344 de altura em Donativos, 320 em Notícias (o texto tem
 * menos uma linha). Mobile: tudo à esquerda, título a 40, texto a toda a largura.
 */
export default function AberturaTexto({ label, titulo, texto }: { label: string; titulo: string; texto: string }) {
  return (
    <section
      data-barra="var(--bege-claro-2)"
      className="flex w-full flex-col items-end gap-[calc(32*var(--u))] max-lg:items-start max-lg:gap-[calc(24*var(--u))] px-[calc(32*var(--u))] py-[calc(80*var(--u))] max-lg:px-[calc(20*var(--u))] max-lg:py-[calc(48*var(--u))] bg-[var(--bege-claro-2)] text-[var(--azul-escuro)]"
    >
      <div className="flex w-full flex-col gap-[calc(12*var(--u))]">
        <Revelar><p className="text-[length:max(11px,calc(12*var(--u)))] leading-[calc(14*var(--u))]">{label}</p></Revelar>
        <Revelar atraso={100}>
          <h1
            className="w-[calc(879*var(--u))] max-lg:w-full font-display text-[length:calc(80*var(--u))] max-lg:text-[length:calc(40*var(--u))] leading-[1.2] font-normal"
            style={{ textBox: 'trim-both cap alphabetic' } as React.CSSProperties}
          >
            {titulo}
          </h1>
        </Revelar>
      </div>
      <Revelar atraso={200} className="max-lg:w-full">
        <p className="w-[calc(445*var(--u))] max-lg:w-full text-[length:calc(16*var(--u))] leading-[1.5] text-[rgba(29,35,40,0.6)]">{texto}</p>
      </Revelar>
    </section>
  )
}
