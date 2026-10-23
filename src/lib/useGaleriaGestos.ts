'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Gestos das galerias: arrastar com o rato (ou o dedo) e o scroll horizontal do
 * trackpad. Além das setas, a galeria passa a andar assim:
 *
 * - **Arrastar:** a pista acompanha o ponteiro (`arrasto`, em px, a somar ao
 *   deslocamento; sem transição enquanto `arrastando`) e, ao largar, avança ou
 *   recua um passo se foi além de `limiar` px, senão volta ao sítio.
 * - **Trackpad / roda horizontal:** um gesto vale um passo. O movimento
 *   horizontal acumula até 60 e dispara; depois a galeria ignora o resto do
 *   gesto (a inércia do trackpad dura quase um segundo) até o scroll parar 180ms.
 *   Só se trava o evento quando o gesto é mais horizontal do que vertical, por
 *   isso o scroll vertical da página nunca é afetado, e o gesto de dois dedos
 *   deixa de levar o browser a "recuar" na história.
 *
 * Uso: `const { ref, arrasto, arrastando } = useGaleriaGestos<HTMLDivElement>({ ir, limiar })`,
 * `ref` (de callback) no contentor visível da pista e `arrasto` somado ao `translateX` dela.
 * `ir(d)` recebe +1 (seguinte) ou -1 (anterior).
 */
export function useGaleriaGestos<T extends HTMLElement>({ ir, limiar }: { ir: (d: number) => void; limiar: number }) {
  // Ref de callback: o contentor pode montar-se depois do hook (os painéis das galerias entram por portal)
  const [el, ref] = useState<T | null>(null)
  const [arrasto, setArrasto] = useState(0)
  const [arrastando, setArrastando] = useState(false)

  // Os ouvintes são registados uma vez; chamam sempre a versão mais recente
  const irRef = useRef(ir)
  const limiarRef = useRef(limiar)
  useEffect(() => {
    irRef.current = ir
    limiarRef.current = limiar
  })

  const parar = useCallback(() => {
    setArrasto(0)
    setArrastando(false)
  }, [])

  useEffect(() => {
    if (!el) return

    // ── Scroll horizontal ──
    let acumulado = 0
    let gasto = false
    let fim = 0
    const aoRodar = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      window.clearTimeout(fim)
      fim = window.setTimeout(() => {
        acumulado = 0
        gasto = false
      }, 180)
      if (gasto) return
      acumulado += e.deltaX
      if (Math.abs(acumulado) >= 60) {
        irRef.current(acumulado > 0 ? 1 : -1)
        gasto = true
      }
    }

    // ── Arrastar ──
    let id: number | null = null
    let inicio = 0
    let dx = 0
    let moveu = false
    const aoPremir = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      id = e.pointerId
      inicio = e.clientX
      dx = 0
      moveu = false
    }
    const aoMover = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      dx = e.clientX - inicio
      if (!moveu && Math.abs(dx) < 5) return
      if (!moveu) {
        moveu = true
        el.setPointerCapture(e.pointerId)
        setArrastando(true)
      }
      setArrasto(dx)
    }
    const aoLargar = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      id = null
      if (moveu && Math.abs(dx) > limiarRef.current) irRef.current(dx < 0 ? 1 : -1)
      moveu = false
      parar()
    }
    // Sem isto o browser arrasta a imagem como um ficheiro
    const semFantasma = (e: Event) => e.preventDefault()

    el.addEventListener('wheel', aoRodar, { passive: false })
    el.addEventListener('pointerdown', aoPremir)
    el.addEventListener('pointermove', aoMover)
    el.addEventListener('pointerup', aoLargar)
    el.addEventListener('pointercancel', aoLargar)
    el.addEventListener('dragstart', semFantasma)
    return () => {
      window.clearTimeout(fim)
      el.removeEventListener('wheel', aoRodar)
      el.removeEventListener('pointerdown', aoPremir)
      el.removeEventListener('pointermove', aoMover)
      el.removeEventListener('pointerup', aoLargar)
      el.removeEventListener('pointercancel', aoLargar)
      el.removeEventListener('dragstart', semFantasma)
    }
  }, [el, parar])

  return { ref, arrasto, arrastando }
}

/** Estilo do contentor da pista: cursor de arrastar, scroll vertical por toque livre e sem seleção de texto */
export const ESTILO_GESTOS = { touchAction: 'pan-y', overscrollBehaviorX: 'contain', userSelect: 'none' } as const
