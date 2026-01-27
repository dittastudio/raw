<script lang="ts" setup>
import { TransitionPresets, useIntersectionObserver, useTransition } from '@vueuse/core'

const root = useTemplateRef<HTMLElement>('root')
const bar1 = useTemplateRef<SVGCircleElement>('bar1')
const bar2 = useTemplateRef<SVGCircleElement>('bar2')
const bar3 = useTemplateRef<SVGCircleElement>('bar3')

const maxValue = 200
const targetValues = [109.5, 80, 50.9]
const durationMs = 2000
const isAnimated = ref(false)

const sourceValue1 = computed(() => (isAnimated.value ? targetValues[0] : 0))
const sourceValue2 = computed(() => (isAnimated.value ? targetValues[1] : 0))
const sourceValue3 = computed(() => (isAnimated.value ? targetValues[2] : 0))

const animatedValue1 = useTransition(sourceValue1, {
  duration: durationMs,
  transition: TransitionPresets.easeInOutExpo,
})
const animatedValue2 = useTransition(sourceValue2, {
  duration: durationMs,
  transition: TransitionPresets.easeInOutExpo,
})
const animatedValue3 = useTransition(sourceValue3, {
  duration: durationMs,
  transition: TransitionPresets.easeInOutExpo,
})

const setCircleProgress = (element: SVGCircleElement | null, value: number) => {
  if (!element) {
    return
  }

  const radius = Number.parseFloat(element.getAttribute('r') || '180')
  const circumference = 2 * Math.PI * radius
  const percentage = (value / maxValue) * 100
  const clamped = Math.max(0, Math.min(100, percentage))
  const offset = circumference - (clamped / 100) * circumference

  element.style.setProperty('--circumference', `${circumference.toFixed(0)}`)
  element.style.setProperty('--offset', `${offset.toFixed(0)}`)
}

watchEffect(() => {
  setCircleProgress(bar1.value, animatedValue1.value ?? 0)
  setCircleProgress(bar2.value, animatedValue2.value ?? 0)
  setCircleProgress(bar3.value, animatedValue3.value ?? 0)
})

onMounted(() => {
  if (!root.value) {
    return
  }

  useIntersectionObserver(
    root.value,
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isAnimated.value = true
      }
      else {
        isAnimated.value = false
      }
    },
    {
      threshold: 0.5,
    },
  )
})
</script>

<template>
  <div
    ref="root"
    class="ui-graph @container-[size] relative size-36 mx-auto"
  >
    <div class="size-full aspect-square max-h-full">
      <svg
        class="size-full rotate-90"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
      >
        <g>
          <!-- grey background ring -->
          <circle
            class="ui-graph__circle ui-graph__circle--background"
            cx="200"
            cy="200"
            r="185"
          />

          <!-- animated progress ring 1 -->
          <circle
            ref="bar1"
            class="ui-graph__circle ui-graph__circle--animated stroke-blue"
            cx="200"
            cy="200"
            r="185"
          />
        </g>

        <g>
          <!-- grey background ring 2 -->
          <circle
            class="ui-graph__circle ui-graph__circle--background"
            cx="200"
            cy="200"
            r="156"
          />

          <!-- animated progress ring 2 -->
          <circle
            ref="bar2"
            class="ui-graph__circle ui-graph__circle--animated stroke-green"
            cx="200"
            cy="200"
            r="156"
          />
        </g>

        <g>
          <!-- grey background ring 3 -->
          <circle
            class="ui-graph__circle ui-graph__circle--background"
            cx="200"
            cy="200"
            r="127"
          />

          <!-- animated progress ring 3 -->
          <circle
            ref="bar3"
            class="ui-graph__circle ui-graph__circle--animated stroke-pink"
            cx="200"
            cy="200"
            r="127"
          />
        </g>
      </svg>

      <div
        class="
        absolute
        inset-0
        flex
        items-center
        justify-center
        type-h2
        text-[10cqmin]
        leading-none
      "
      >
        <div
          class="
            relative
            flex
            items-baseline
            gap-[0.1em]
          "
        >
          {{ (animatedValue1 ?? 0).toFixed(1) }}<small>%</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-graph__circle {
  stroke-width: 20;
  stroke-linecap: round;
}

.ui-graph__circle--background {
  stroke: currentColor;
  opacity: 0.1;
}

.ui-graph__circle--animated {
  stroke-dasharray: var(--circumference) var(--circumference);
  stroke-dashoffset: var(--offset);
}
</style>
