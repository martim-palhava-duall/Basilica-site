'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

/** A Basílica da Estrela, na Praça da Estrela */
const CENTRO: [number, number] = [38.71305, -9.1613]
const ZOOM = 16
/** Mosaicos do OpenStreetMap (sem chave); a cor do mapa vem do CSS (.mapa-basilica) */
const MOSAICOS = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATRIBUICAO = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'

/**
 * Mapa interativo da Basílica, com as cores do site (Leaflet + mosaicos do
 * OpenStreetMap, sem chave). O mapa arrasta-se e aproxima-se; a cor é um tom de bege quente aplicado aos
 * mosaicos por CSS (ver `.mapa-basilica` em globals.css), o marcador é um ponto azul
 * escuro e os botões de zoom seguem o estilo dos botões do site.
 *
 * O mapa só reage depois de um clique ou toque: antes disso uma camada por cima deixa o
 * scroll da página passar (num telemóvel, um mapa sempre ativo prendia o dedo e a página
 * deixava de rolar). Volta a ficar parado ao tocar fora dele ou ao sair com o rato.
 * Só carrega quando se aproxima do ecrã.
 */
export default function MapaBasilica({ titulo, dica, className = '' }: { titulo: string; dica: string; className?: string }) {
  const [ativo, setAtivo] = useState(false)
  const [visto, setVisto] = useState(false)
  const raiz = useRef<HTMLDivElement>(null)
  const mapaEl = useRef<HTMLDivElement>(null)

  // Carrega o mapa quando a secção se aproxima do ecrã
  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisto(true)
          obs.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visto || !mapaEl.current) return
    let mapa: import('leaflet').Map | undefined
    let cancelado = false
    import('leaflet').then((L) => {
      if (cancelado || !mapaEl.current) return
      mapa = L.map(mapaEl.current, { center: CENTRO, zoom: ZOOM, scrollWheelZoom: true, attributionControl: true, zoomControl: true })
      L.tileLayer(MOSAICOS, { attribution: ATRIBUICAO, maxZoom: 19 }).addTo(mapa)
      L.marker(CENTRO, {
        keyboard: false,
        icon: L.divIcon({ className: 'mapa-marcador', html: '<span></span>', iconSize: [28, 28], iconAnchor: [14, 14] }),
      }).addTo(mapa)
    })
    return () => {
      cancelado = true
      mapa?.remove()
    }
  }, [visto])

  // Toque ou clique fora do mapa: volta a ficar parado
  useEffect(() => {
    if (!ativo) return
    const fora = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAtivo(false)
    }
    document.addEventListener('pointerdown', fora)
    return () => document.removeEventListener('pointerdown', fora)
  }, [ativo])

  return (
    <div
      ref={raiz}
      onMouseLeave={() => setAtivo(false)}
      role="region"
      aria-label={titulo}
      className={`mapa-basilica relative overflow-hidden rounded-[calc(4*var(--u))] bg-[var(--bege-escuro-2)] ${className}`}
    >
      <div ref={mapaEl} className="absolute inset-0" style={{ pointerEvents: ativo ? 'auto' : 'none' }} />
      {!ativo && (
        <button
          type="button"
          onClick={() => setAtivo(true)}
          aria-label={dica}
          className="absolute inset-0 z-[500] flex cursor-pointer items-end justify-start p-[calc(12*var(--u))] outline-none focus-visible:ring-2 focus-visible:ring-[var(--azul-escuro)]"
        >
          <span className="rounded-full bg-[var(--azul-escuro)] px-[calc(12*var(--u))] py-[calc(6*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-none text-[var(--bege-claro-2)]">
            {dica}
          </span>
        </button>
      )}
    </div>
  )
}
