<script lang="ts" setup>
import type { Themes } from '@@/types/app'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  tag?: string
  theme?: Themes
}

const {
  tag = 'section',
  theme = 'light',
} = defineProps<Props>()

const activeTheme = useState<Themes>('activeTheme', () => 'light')
const el = useTemplateRef<HTMLElement>('el')

useIntersectionObserver(
  el,
  (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      activeTheme.value = theme
    }
  },
  {
    rootMargin: '0px 0% -99% 0%',
    threshold: 0,
  },
)
</script>

<template>
  <component
    :is="tag"
    ref="el"
    :data-theme="theme"
    :class="getThemeClasses[theme]"
  >
    <slot />
  </component>
</template>
