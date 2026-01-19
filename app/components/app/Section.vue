<script lang="ts" setup>
import type { BlockTypes } from '@@/types/app'

interface Props {
  block: BlockTypes
}

const { block } = defineProps<Props>()

const sectionRef = useTemplateRef('sectionRef')
const sectionId = block._uid

const activeSection = useState<string | null>('activeSection', () => null)

const themeColors = {
  dark: {
    background: 'var(--color-offblack)',
    text: 'var(--color-white)',
  },
  light: {
    background: 'var(--color-white)',
    text: 'var(--color-offblack)',
  },
  blue: {
    background: 'var(--color-blue)',
    text: 'var(--color-offblack)',
  },
  green: {
    background: 'var(--color-green)',
    text: 'var(--color-offblack)',
  },
  pink: {
    background: 'var(--color-pink)',
    text: 'var(--color-offblack)',
  },
  purple: {
    background: 'var(--color-purple)',
    text: 'var(--color-offblack)',
  },
}

let observer: IntersectionObserver | null = null

const updateThemeVariables = (theme: keyof typeof themeColors) => {
  const colors = themeColors[theme]

  if (colors) {
    document.documentElement.style.setProperty('--app-background-color', colors.background)
    document.documentElement.style.setProperty('--app-text-color', colors.text)
    activeSection.value = sectionId
  }
}

onMounted(() => {
  if (!sectionRef.value || !block.theme) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateThemeVariables(block.theme as keyof typeof themeColors)
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
