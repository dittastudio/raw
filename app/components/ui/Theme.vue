<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Props {
  theme?: Themes
}

const { theme } = defineProps<Props>()

const themeRef = useTemplateRef('themeRef')
const themeId = useId()

const activeTheme = useState<string | null>('activeTheme', () => null)

const themeColors = {
  dark: {
    background: 'var(--color-offblack)',
    text: 'var(--color-offwhite)',
    buttonBackground: 'var(--color-offwhite)',
    buttonText: 'var(--color-offblack)',
  },
  light: {
    background: 'var(--color-offwhite)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  blue: {
    background: 'var(--color-blue)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  green: {
    background: 'var(--color-green)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  pink: {
    background: 'var(--color-pink)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  purple: {
    background: 'var(--color-purple)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
}

let observer: IntersectionObserver | null = null

const updateThemeVariables = (theme: keyof typeof themeColors) => {
  const colors = themeColors[theme]

  if (colors) {
    document.documentElement.style.setProperty('--app-background-color', colors.background)
    document.documentElement.style.setProperty('--app-text-color', colors.text)
    document.documentElement.style.setProperty('--app-button-background-color', colors.buttonBackground)
    document.documentElement.style.setProperty('--app-button-text-color', colors.buttonText)
    activeTheme.value = themeId
  }
}

onMounted(() => {
  if (!themeRef.value || !theme) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
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

  observer.observe(themeRef.value)
})

onUnmounted(() => {
  observer?.disconnect()

  if (activeTheme.value === themeId) {
    activeTheme.value = null
  }
})
</script>

<template>
  <div ref="themeRef">
    <slot />
  </div>
</template>
