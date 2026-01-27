<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

interface Props {
  tag?: string
  delay?: number
  duration?: number
  trigger?: 'immediate' | 'scroll' | 'inview'
}

const { tag = 'div', delay = 0, duration = 1, trigger = 'inview' } = defineProps<Props>()
const text = useTemplateRef('text')
const ready = ref(false)

const immediateFn = async () => {
  if (!text.value) {
    return
  }

  if (delay > 0) {
    await wait(delay)
  }

  ready.value = true

  SplitText.create(
    text.value.children,
    {
      type: 'lines',
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.lines, {
          duration,
          autoAlpha: 0,
          yPercent: 100,
          skewY: -3,
          transformOrigin: 'top left',
          stagger: 0.1,
          ease: 'expo.out',
        })
      },
      mask: 'lines',
      tag,
      linesClass: 'lines',
    },
  )
}

onMounted(async () => {
  if (!text.value) {
    return
  }

  if (trigger === 'immediate') {
    await immediateFn()
  }
  else if (trigger === 'inview') {
    const { stop } = useIntersectionObserver(
      text.value,
      async (entry) => {
        if (entry[0]?.isIntersecting) {
          await immediateFn()
          stop()
        }
      },
      {
        threshold: 0.75,
      },
    )
  }
})
</script>

<template>
  <Component
    :is="tag"
    ref="text"
    :class="{
      'opacity-0': !ready,
    }"
  >
    <slot />
  </Component>
</template>
