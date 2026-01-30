import type { Themes } from '@@/types/app'
import { themeColors } from '@/utils/theme'

interface BlockWithTheme {
  component: string
  theme?: string | number
}

export function useInitialTheme(blocks: BlockWithTheme[] | undefined | null) {
  const heroBlocks = ['block_hero', 'block_hero_brand']

  const theme = blocks?.find(block =>
    heroBlocks.includes(block.component) && typeof block.theme === 'string',
  )?.theme as Themes | undefined

  const colors = theme ? themeColors[theme] : undefined

  if (!colors) {
    return
  }

  useHead({
    htmlAttrs: {
      style: {
        '--app-background-color': colors.background,
        '--app-text-color': colors.text,
        '--app-button-background-color': colors.buttonBackground,
        '--app-button-text-color': colors.buttonText,
      },
    },
  })
}
