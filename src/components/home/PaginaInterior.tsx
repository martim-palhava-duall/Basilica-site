import type { ReactNode } from 'react'
import HomeAncoras, { type Ancora } from '@/components/home/HomeAncoras'
import HomeBarra from '@/components/home/HomeBarra'
import HomeLogo from '@/components/home/HomeLogo'
import HomeMenu from '@/components/home/HomeMenu'
import HomeRodape from '@/components/home/HomeRodape'
import { MenuProvider } from '@/components/home/MenuContext'

/**
 * Estrutura comum das páginas interiores (todas menos a homepage): barra de
 * topo sempre visível, logótipo, menu de ecrã, faixa de âncoras com as secções
 * da página e rodapé. Os 88px por cima do conteúdo são o cabeçalho do desenho,
 * que mantém as distâncias do Figma.
 *
 * Cada página só indica as suas âncoras (`id` de cada secção e o nome) e o
 * conteúdo. Qualquer página interior nova deve usar este componente.
 */
export default function PaginaInterior({ ancoras, children }: { ancoras: Ancora[]; children: ReactNode }) {
  return (
    <MenuProvider barraFixa ancoras={ancoras.length > 0}>
      <main className="pt-[calc(88*var(--u))] bg-[var(--bege-claro-2)]">{children}</main>
      <HomeRodape />
      <HomeLogo />
      <HomeBarra />
      {ancoras.length > 0 && <HomeAncoras itens={ancoras} />}
      <HomeMenu />
    </MenuProvider>
  )
}
