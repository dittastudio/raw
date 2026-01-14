<script lang="ts" setup>
import type { BlockImpactStatement } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()

const sectionRef = useTemplateRef('sectionRef')
const sectionId = block._uid

const activeSection = useState<string | null>('activeSection', () => null)

const initialColors = {
  background: '',
  text: '',
}

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

const updateThemeVariables = (theme: keyof typeof themeColors) => {
  const colors = themeColors[theme]

  if (colors) {
    document.documentElement.style.setProperty('--app-background-color', colors.background)
    document.documentElement.style.setProperty('--app-text-color', colors.text)
    activeSection.value = sectionId
  }
}

const revertToInitialColors = () => {
  if (activeSection.value === sectionId && initialColors.background && initialColors.text) {
    document.documentElement.style.setProperty('--app-background-color', initialColors.background)
    document.documentElement.style.setProperty('--app-text-color', initialColors.text)
    activeSection.value = null
  }
}

onMounted(() => {
  if (!sectionRef.value || !block.theme) {
    return
  }

  const computedStyle = getComputedStyle(document.documentElement)

  initialColors.background = computedStyle.getPropertyValue('--app-background-color').trim()
  initialColors.text = computedStyle.getPropertyValue('--app-text-color').trim()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateThemeVariables(block.theme as keyof typeof themeColors)
        }
        else {
          revertToInitialColors()
        }
      })
    },
    {
      threshold: 0,
      rootMargin: '-50% 0px -50% 0px',
    },
  )

  observer.observe(sectionRef.value)

  onUnmounted(() => {
    observer.disconnect()

    if (activeSection.value === sectionId) {
      activeSection.value = null
    }
  })
})
</script>

<template>
  <section ref="sectionRef">
    <slot />
  </section>
</template>
