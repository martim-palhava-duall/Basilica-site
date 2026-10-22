'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Entrada de texto: sobe 28px (1,4s, --ease-entrada) e acende (1s, --ease-suave) quando chega a 80% do
 * ecrã. O fade é mais curto e numa curva mais calma do que o movimento, para o texto não acender de
 * repente e ficar parado à espera de assentar. Só isso — a animação do site é sempre simples e discreta.
 *
 * O conteúdo está visível por omissão (servidor e antes de hidratar). Só depois
 * de montado, e só se o bloco ainda estiver abaixo do ecrã, é que fica oculto à
 * espera de entrar; o que já está à vista não pisca nem anima.
 * Sob `prefers-reduced-motion` as transições são anuladas por regra global.
 */
export default function Revelar({
  children,
  atraso = 0,
  className = '',
}: {
  children: ReactNode
  /** atraso em ms — para escalonar linhas seguidas */
  atraso?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<'inicial' | 'escondido' | 'visivel'>('inicial')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return
    setEstado('escondido')
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEstado('visivel')
          obs.disconnect()
        }
      },
      { rootMargin: '0px 0px -20% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={
        estado === 'escondido'
          ? { opacity: 0, transform: 'translateY(calc(28 * var(--u)))' }
          : {
              opacity: 1,
              transform: 'none',
              transition:
                estado === 'visivel'
                  ? `opacity 1000ms var(--ease-suave) ${atraso}ms, transform 1400ms var(--ease-entrada) ${atraso}ms`
                  : undefined,
            }
      }
    >
      {children}
    </div>
  )
}
