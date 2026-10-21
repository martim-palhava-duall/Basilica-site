import { use } from 'react'
import { setRequestLocale } from 'next-intl/server'
import HomeHero from '@/components/home/HomeHero'
import HomeMissao from '@/components/home/HomeMissao'
import HomeOQueProcura from '@/components/home/HomeOQueProcura'
import HomeHorarios from '@/components/home/HomeHorarios'
import HomeQuemSomos from '@/components/home/HomeQuemSomos'
import HomeObraSocial from '@/components/home/HomeObraSocial'
import HomeDestaques from '@/components/home/HomeDestaques'
import HomeDonativos from '@/components/home/HomeDonativos'
import HomeRodape from '@/components/home/HomeRodape'
import HomeMenu from '@/components/home/HomeMenu'
import HomeBarra from '@/components/home/HomeBarra'
import { MenuProvider } from '@/components/home/MenuContext'

/**
 * Homepage — design novo (Figma "Basilica da Estrela (duall)", nó 115:138).
 *
 * Construída secção a secção, só desktop 1440 por agora. A homepage antiga
 * fica no histórico do git (último commit antes desta reescrita).
 *
 * O MenuProvider envolve a página porque o estado do menu é partilhado entre
 * o botão do hero, o logótipo e o painel.
 */
export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale)
  return (
    <MenuProvider>
      <main>
        <HomeHero />
        <HomeMissao />
        <HomeOQueProcura />
        <HomeHorarios />
        <HomeQuemSomos />
        <HomeObraSocial />
        <HomeDestaques />
        <HomeDonativos />
      </main>
      <HomeRodape />
      <HomeBarra /><HomeMenu />
    </MenuProvider>
  )
}
