<script lang="ts" setup>
import type { Themes } from '@@/types/app'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  tag?: string
  theme?: Themes
  force?: boolean
  disabled?: boolean
}

const {
  tag = 'section',
  theme = 'light',
  force = false,
  disabled = false,
} = defineProps<Props>()

const root = useTemplateRef<HTMLElement>('root')
const themeId = useId()

const activeTheme = useState<string | null>('activeTheme', () => null)

const updateThemeVariables = (theme: keyof typeof getThemeColors) => {
  const colors = getThemeColors[theme]

  if (colors) {
    document.documentElement.style.setProperty('--app-background-color', colors.background)
    document.documentElement.style.setProperty('--app-text-color', colors.text)
    document.documentElement.style.setProperty('--app-button-background-color', colors.buttonBackground)
    document.documentElement.style.setProperty('--app-button-text-color', colors.buttonText)
    activeTheme.value = themeId
  }
}

const { stop } = useIntersectionObserver(
  root,
  (entries) => {
    if (disabled) {
      return
    }

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateThemeVariables(theme)
      }
    })
  },
  {
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px',
  },
)

onUnmounted(() => {
  stop()

  if (activeTheme.value === themeId) {
    activeTheme.value = null
  }
})
</script>

<template>
  <component
    :is="tag"
    ref="root"
    :class="force ? getThemeClasses[theme] : undefined"
  >
    <slot />
  </component>
</template>
