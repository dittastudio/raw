<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

interface Props {
  wrapper?: string
  tag?: string
  delay?: number
  duration?: number
  ease?: string
  trigger?: 'immediate' | 'scroll' | 'inview'
}

const { wrapper = 'div', tag = 'span', delay = 0, duration = 1, ease = 'expo.out', trigger = 'inview' } = defineProps<Props>()
const text = useTemplateRef('text')
const ready = ref(false)
let ctx: gsap.Context | null = null
let unmounted = false

const run = async () => {
  if (!text.value?.children?.length) {
    return
  }

  if (delay > 0) {
    await wait(delay)
  }

  // The component may have unmounted during the delay (e.g. fast page switch)
  if (unmounted || !text.value?.children?.length) {
    return
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

  const el = text.value

  ctx = gsap.context(() => {
    SplitText.create(
      el.children,
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
            force3D: true,
            immediateRender: true,
            onComplete: () => {
              gsap.set(self.lines, { clearProps: 'transform' })

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
  }, el)
}

onMounted(async () => {
  if (!text.value?.children?.length) {
    return
  }

  await nextTick()
  await run()
})

onBeforeUnmount(() => {
  unmounted = true
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <Component
    :is="wrapper"
    ref="text"
    class="text-reveal"
    :class="{
      'opacity-0': !ready,
    }"
  >
    <slot />
  </Component>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.text-reveal {
  :deep(.lines),
  :deep(.lines-mask) {
    display: block;
  }
}
</style>
