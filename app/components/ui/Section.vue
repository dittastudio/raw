<script lang="ts" setup>
import type { Themes } from '@@/types/app'

interface Props {
  theme?: Themes
}

const { theme } = defineProps<Props>()

const sectionRef = useTemplateRef('sectionRef')
const sectionId = useId()

const activeSection = useState<string | null>('activeSection', () => null)

const themeColors = {
  dark: {
    background: 'var(--color-offblack)',
    text: 'var(--color-white)',
    buttonBackground: 'var(--color-white)',
    buttonText: 'var(--color-offblack)',
  },
  light: {
    background: 'var(--color-white)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-white)',
  },
  blue: {
    background: 'var(--color-blue)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-white)',
  },
  green: {
    background: 'var(--color-green)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-white)',
  },
  pink: {
    background: 'var(--color-pink)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-white)',
  },
  purple: {
    background: 'var(--color-purple)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-white)',
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
    activeSection.value = sectionId
  }
}

onMounted(() => {
  if (!sectionRef.value || !theme) {
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

  observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()

  if (activeSection.value === sectionId) {
    activeSection.value = null
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="section"
  >
    <slot />
  </section>
</template>
