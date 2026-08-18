'use client'

import { useEffect, useState } from 'react'

export type RailSection = { id: string; label: string }

/**
 * Fixed index of the page's sections, living in the left gutter.
 *
 * At rest it is only a stack of rules — the labels would collide with the
 * container's text at any viewport where the rail fits, so they stay hidden
 * until the rail itself is hovered, and the panel that carries them is
 * opaque rather than blended so the text underneath can't show through.
 *
 * Uses IntersectionObserver rather than ScrollTrigger: it only needs to know
 * which section is current, not to drive an animation, and the observer keeps
 * working identically whether Lenis is running or reduced-motion killed it.
 */
export default function SectionRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        // Clear when the band holds nothing — otherwise the hero and the
        // closing sections keep showing whichever section was last current.
        setActive(visible ? visible.target.id : null)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Índice da página"
      className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="flex flex-col gap-4 py-4 pl-2 pr-3 transition-[background-color,box-shadow,padding] duration-500 ease-[var(--ease-out)]"
        style={{
          backgroundColor: open ? 'var(--color-bg-primary)' : 'transparent',
          boxShadow: open ? '0 8px 40px rgb(27 43 57 / 0.13)' : 'none',
          borderRadius: 'var(--radius)',
          paddingRight: open ? '1.25rem' : '0.75rem',
        }}
      >
        {sections.map((s, i) => {
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group/rail flex items-center gap-3 h-3"
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                aria-hidden="true"
                className="h-px shrink-0 transition-all duration-500 ease-[var(--ease-out)]"
                style={{
                  width: isActive ? '1.75rem' : '0.85rem',
                  backgroundColor: open
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-muted)',
                  opacity: isActive ? 1 : 0.5,
                }}
              />
              <span
                className="text-[0.7rem] whitespace-nowrap transition-[opacity,transform] duration-500 ease-[var(--ease-out)]"
                style={{
                  color: 'var(--color-text-primary)',
                  opacity: open ? (isActive ? 1 : 0.55) : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-0.4rem)',
                  pointerEvents: open ? 'auto' : 'none',
                }}
              >
                <span className="opacity-50 mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
