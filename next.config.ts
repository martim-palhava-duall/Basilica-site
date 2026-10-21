import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig: NextConfig = {
  images: {
    // WebP: descodifica bem mais depressa que o AVIF, que num ecrã retina (2x) com
    // fotos de 1376 a 2880 de largura pesava no CPU ao entrar numa página.
    formats: ['image/webp'],
    // Teto de 2400px de largura: nítido em retina sem gerar imagens de 3840
    deviceSizes: [640, 960, 1280, 1600, 1920, 2400],
    imageSizes: [16, 32, 64, 128, 256, 384, 512, 710],
    qualities: [75, 80],
  },
}

export default withNextIntl(nextConfig)
