import { useTranslations } from 'next-intl'
import AberturaTexto from '@/components/home/AberturaTexto'

/** Donativos, abertura — design novo (Figma, nó 111:2366), 344 de altura. */
export default function DonativosAbertura() {
  const t = useTranslations('donar')
  return <AberturaTexto label={t('label')} titulo={t('titulo')} texto={t('texto')} />
}
