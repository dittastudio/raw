<script lang="ts" setup>
import { TransitionPresets, useIntersectionObserver, useTransition } from '@vueuse/core'

const root = useTemplateRef<HTMLElement>('root')
const bar = useTemplateRef<SVGCircleElement>('bar')
const maxValue = 200
const targetValue = 109.5
const durationMs = 2000
const isAnimated = ref(false)

const sourceValue = computed(() => (isAnimated.value ? targetValue : 0))
const animatedValue = useTransition(sourceValue, {
  duration: durationMs,
  transition: TransitionPresets.easeInOutExpo,
})
const displayedPercent = computed(() => (animatedValue.value / maxValue) * 100)

const setCircleProgress = (percentage: number) => {
  if (!bar.value) {
    return
  }

  const radius = Number.parseFloat(bar.value.getAttribute('r') || '180')
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, percentage))
  const offset = circumference - (clamped / 100) * circumference

  bar.value.style.setProperty('--circumference', `${circumference.toFixed(0)}`)
  bar.value.style.setProperty('--offset', `${offset.toFixed(0)}`)
}

watchEffect(() => {
  setCircleProgress(displayedPercent.value)
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
    class="ui-graph @container relative max-w-96 mx-auto"
  >
    <div class="size-full aspect-square max-h-full">
      <svg
        class="size-full rotate-90"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
      >
        <!-- grey background ring -->
        <circle
          class="ui-graph__circle ui-graph__circle--background"
          cx="200"
          cy="200"
          r="185"
        />

        <!-- animated progress ring -->
        <circle
          ref="bar"
          class="ui-graph__circle ui-graph__circle--animated stroke-green"
          cx="200"
          cy="200"
          r="185"
        />
      </svg>

      <div
        class="
        absolute
        inset-0
        flex
        items-center
        justify-center
        type-h2
        text-[min(40cqi,29px)]
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
          {{ animatedValue.toFixed(1) }}<small>%</small>
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
  stroke: --alpha(var(--color-white) / 10%);
}

.ui-graph__circle--animated {
  stroke: var(--color-green);
  stroke-dasharray: var(--circumference) var(--circumference);
  stroke-dashoffset: var(--offset);
}
</style>
