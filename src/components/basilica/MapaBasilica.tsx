'use client'

import { useEffect, useRef, useState } from 'react'

/** Endereço que o mapa mostra (a Basílica da Estrela, na Praça da Estrela) */
const CONSULTA = 'Basílica da Estrela, Praça da Estrela, Lisboa'
const SRC = `https://maps.google.com/maps?q=${encodeURIComponent(CONSULTA)}&z=16&hl=pt-PT&output=embed`

/**
 * Mapa interativo da Basílica (Google Maps, sem chave): arrasta-se, aproxima-se e
 * pede direções como no próprio Google Maps.
 *
 * O mapa só reage depois de um clique ou toque: antes disso uma camada por cima deixa o
 * scroll da página passar (num telemóvel, um mapa sempre ativo prendia o dedo e a página
 * deixava de rolar). Volta a ficar parado ao tocar fora dele ou ao sair com o rato.
 * Carrega só quando se aproxima do ecrã (`loading="lazy"`), por isso não pesa na abertura
 * da página.
 */
export default function MapaBasilica({ titulo, dica, className = '' }: { titulo: string; dica: string; className?: string }) {
  const [ativo, setAtivo] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Toque ou clique fora do mapa: volta a ficar parado
  useEffect(() => {
    if (!ativo) return
    const fora = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setAtivo(false)
    }
    document.addEventListener('pointerdown', fora)
    return () => document.removeEventListener('pointerdown', fora)
  }, [ativo])

  return (
    <div
      ref={ref}
      onMouseLeave={() => setAtivo(false)}
      className={`relative overflow-hidden rounded-[calc(4*var(--u))] bg-[rgba(247,242,238,0.12)] ${className}`}
    >
      <iframe
        title={titulo}
        src={SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.3)_contrast(1.02)]"
        style={{ pointerEvents: ativo ? 'auto' : 'none' }}
      />
      {!ativo && (
        <button
          type="button"
          onClick={() => setAtivo(true)}
          aria-label={dica}
          className="absolute inset-0 flex cursor-pointer items-end justify-start p-[calc(12*var(--u))] outline-none focus-visible:ring-2 focus-visible:ring-[var(--bege-claro-2)]"
        >
          <span className="rounded-full bg-[rgba(28,43,57,0.78)] px-[calc(12*var(--u))] py-[calc(6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-none text-[var(--bege-claro-2)] backdrop-blur-sm">
            {dica}
          </span>
        </button>
      )}
    </div>
  )
}
