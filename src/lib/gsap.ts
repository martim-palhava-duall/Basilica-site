import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aoRolar } from './lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // O GSAP só é carregado por quem o usa (as animações antigas); mantém o
  // ScrollTrigger em sintonia com o scroll suave do Lenis.
  aoRolar(() => ScrollTrigger.update())
}

export { gsap, ScrollTrigger }
