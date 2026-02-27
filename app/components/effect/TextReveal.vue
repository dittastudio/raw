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

const run = async () => {
  if (!text.value) {
    return
  }

  if (delay > 0) {
    await wait(delay)
  }

  const scrollTriggerConfig = trigger === 'scroll'
    ? {
        scrollTrigger: {
          trigger: text.value,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 1,
        },
      }
    : trigger === 'inview'
      ? {
          scrollTrigger: {
            trigger: text.value,
            start: 'top 80%',
          },
        }
      : {}

  SplitText.create(
    text.value.children,
    {
      type: 'lines',
      autoSplit: true,
      onSplit: (self) => {
        const tl = gsap.from(self.lines, {
          duration,
          opacity: 0,
          yPercent: 100,
          stagger: 0.1,
          ease,
          force3D: true,
          immediateRender: true,
          onComplete: () => {
            gsap.set(self.lines, { clearProps: 'transform' })
            self.lines.forEach((line: Element) => {
              (line as HTMLElement).parentElement?.style.removeProperty('overflow')
            })
          },
          ...scrollTriggerConfig,
        })

        gsap.set(text.value, { visibility: 'inherit' })

        return tl
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
    class="invisible"
  >
    <slot />
  </Component>
</template>
