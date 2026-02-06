<script lang="ts" setup>
import type { Themes } from '@@/types/app'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  tag?: string
  theme?: Themes
  force?: boolean
  rootMargin?: string
}

const {
  tag = 'section',
  theme = 'light',
  force = false,
  rootMargin = '-50% 0px -50% 0px',
} = defineProps<Props>()

const root = useTemplateRef<HTMLElement>('root')
const themeId = useId()
const isInView = ref(false)

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
  ([entry]) => {
    if (!entry) {
      return
    }

    if (entry.isIntersecting && activeTheme.value !== themeId) {
      updateThemeVariables(theme)
    }

    isInView.value = entry.isIntersecting
  },
  {
    threshold: 0,
    rootMargin,
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
    <slot :is-in-view="isInView" />
  </component>
</template>
