/**
 * Seta dos botões (ficheiro seta.svg do Figma, usado como máscara — ver .seta
 * em globals.css). Herda a cor do texto, por isso acompanha-a no hover.
 * Para animar, passar classes de transform: `group-hover/btn:translate-x-1`.
 */
export default function Seta({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`seta transition-transform duration-[400ms] ease-[var(--ease-out)] ${className}`}
    />
  )
}
