<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Props {
  theme?: Themes
  force?: boolean
  isHero?: boolean
  isAfterHero?: boolean
}

const { theme = 'light', force = false, isHero = false, isAfterHero = false } = defineProps<Props>()

const themeRef = useTemplateRef('themeRef')
const themeId = useId()

const activeTheme = useState<string | null>('activeTheme', () => null)

let observer: IntersectionObserver | null = null

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

onMounted(() => {
  if (!themeRef.value || !theme) {
    return
  }

  let rootMargin = '-50% 0px -50% 0px'
  if (isHero) {
    rootMargin = '-100% 0px 0px 0px'
  }
  else if (isAfterHero) {
    rootMargin = '-50% 0px -1px 0px'
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
      rootMargin,
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
  <div
    ref="themeRef"
    :class="force ? getThemeClasses[theme] : ''"
  >
    <slot />
  </div>
</template>
