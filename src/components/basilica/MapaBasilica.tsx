'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

/** A Basílica da Estrela, na Praça da Estrela */
const CENTRO: [number, number] = [38.71305, -9.1613]
const ZOOM = 16
/** Base cinzenta e limpa da Esri (sem chave), com os nomes das ruas numa camada à parte;
 *  a cor do mapa vem do CSS (.mapa-basilica) */
const BASE = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
const NOMES = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
const ATRIBUICAO = '© Esri, HERE, Garmin, © OpenStreetMap'
/** Direções no Google Maps, a partir de onde a pessoa estiver */
const DIRECOES = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Basílica da Estrela, Praça da Estrela, 1200-667 Lisboa')}`

/**
 * Mapa interativo da Basílica, com as cores do site (Leaflet + a base cinzenta e limpa
 * da Esri, sem chave). O mapa arrasta-se e aproxima-se; a cor é o bege do site, aplicado
 * à base por CSS (ver `.mapa-basilica` em globals.css), com os nomes das ruas por cima em
 * azul suave. O marcador é o símbolo da Basílica num círculo bege, com o nome ao lado;
 * os botões de zoom ficam em cima à direita e o "Como chegar" (direções no Google Maps)
 * em baixo à direita.
 *
 * O mapa só reage depois de um clique ou toque: antes disso uma camada por cima deixa o
 * scroll da página passar (num telemóvel, um mapa sempre ativo prendia o dedo e a página
 * deixava de rolar). Volta a ficar parado ao tocar fora dele ou ao sair com o rato.
 * Só carrega quando se aproxima do ecrã.
 */
export default function MapaBasilica({ titulo, dica, nome, comoChegar, className = '' }: { titulo: string; dica: string; nome: string; comoChegar: string; className?: string }) {
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
      mapa = L.map(mapaEl.current, { center: CENTRO, zoom: ZOOM, minZoom: 13, maxZoom: 18, scrollWheelZoom: true, attributionControl: false, zoomControl: false })
      L.control.zoom({ position: 'topright' }).addTo(mapa)
      L.control.attribution({ position: 'bottomleft', prefix: false }).addAttribution(ATRIBUICAO).addTo(mapa)
      L.tileLayer(BASE, { maxZoom: 18, className: 'mapa-base' }).addTo(mapa)
      L.tileLayer(NOMES, { maxZoom: 18, className: 'mapa-nomes' }).addTo(mapa)
      L.marker(CENTRO, {
        keyboard: false,
        icon: L.divIcon({
          className: 'mapa-marcador',
          html: `<span class="mapa-marcador-pino"><img src="/home/menu-logo-marca.svg" alt="" /></span><span class="mapa-marcador-nome">${nome}</span>`,
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        }),
      }).addTo(mapa)
    })
    return () => {
      cancelado = true
      mapa?.remove()
    }
  }, [visto, nome])

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
      {/* Como chegar: abre as direções no Google Maps */}
      <a
        href={DIRECOES}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cc absolute bottom-[calc(12*var(--u))] right-[calc(12*var(--u))] z-[600] flex items-center gap-[calc(8*var(--u))] rounded-[calc(4*var(--u))] bg-[var(--azul-escuro)] px-[calc(14*var(--u))] py-[calc(9*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-none text-[var(--bege-claro-2)]"
      >
        {comoChegar}
        <span aria-hidden="true" className="seta-externa transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover/cc:translate-x-[2px] group-hover/cc:-translate-y-[2px]" />
      </a>
      {!ativo && (
        <button
          type="button"
          onClick={() => setAtivo(true)}
          aria-label={dica}
          className="absolute inset-0 z-[500] flex cursor-pointer items-start justify-start p-[calc(12*var(--u))] outline-none focus-visible:ring-2 focus-visible:ring-[var(--azul-escuro)]"
        >
          <span className="rounded-full bg-[rgba(247,242,238,0.92)] px-[calc(12*var(--u))] py-[calc(7*var(--u))] text-[length:max(11px,calc(12*var(--u)))] leading-none text-[var(--azul-escuro)] shadow-[0_2px_10px_rgba(28,43,57,0.12)]">
            {dica}
          </span>
        </button>
      )}
    </div>
  )
}
