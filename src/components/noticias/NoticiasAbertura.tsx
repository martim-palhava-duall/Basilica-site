import { useTranslations } from 'next-intl'
import AberturaTexto from '@/components/home/AberturaTexto'

/** Notícias, abertura — design novo (Figma, nó 111:2678), 320 de altura. */
export default function NoticiasAbertura() {
  const t = useTranslations('noticias')
  return <AberturaTexto label={t('label')} titulo={t('titulo')} texto={t('texto')} />
}
