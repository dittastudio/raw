<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

interface Props {
  tag?: string
  delay?: number
  duration?: number
  ease?: string
  trigger?: 'immediate' | 'scroll' | 'inview'
}

const { tag = 'div', delay = 0, duration = 1, ease = 'expo.out', trigger = 'inview' } = defineProps<Props>()
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
          end: 'bottom 50%',
          scrub: 1,
          markers: false,
        },
      }
    : {}

  const isTriggerInView = trigger === 'inview'
    ? {
        scrollTrigger: {
          trigger: text.value,
          start: 'top 80%',
          markers: false,
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
          stagger: 0.1,
          ease,
          onComplete: () => {
            self.lines.forEach((line: Element) => {
              (line as HTMLElement).parentElement?.style.removeProperty('overflow')
            })
          },
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
