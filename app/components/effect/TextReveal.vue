<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)
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

const run = async () => {
  if (!text.value) {
    return
  }

  if (delay > 0) {
    await wait(delay)
  }

  ready.value = true

  const isTriggerScroll = trigger === 'scroll'
    ? {
        scrollTrigger: {
          trigger: text.value,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 1,
          markers: true,
        },
      }
    : {}

  const isTriggerInView = trigger === 'inview'
    ? {
        scrollTrigger: {
          trigger: text.value,
          start: 'top 80%',
          markers: true,
        },
      }
    : {}

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
          stagger: 0.15,
          ease: 'expo.out',
          ...isTriggerScroll,
          ...isTriggerInView,
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

  await run()
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
