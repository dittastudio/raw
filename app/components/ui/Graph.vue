<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

const root = useTemplateRef<HTMLElement>('root')
const bar = useTemplateRef<SVGCircleElement>('bar')
const targetPercentage = 50
const durationMs = 1500
const isAnimated = ref(false)

const clampPercentage = (percentage: number) => Math.max(0, Math.min(100, percentage))

const setCircleProgress = (percentage: number) => {
  if (!bar.value) {
    return
  }

  const radius = Number.parseFloat(bar.value.getAttribute('r') || '180')
  const circumference = 2 * Math.PI * radius
  const clamped = clampPercentage(percentage)
  const offset = circumference - (clamped / 100) * circumference

  bar.value.style.setProperty('--circumference', `${circumference.toFixed(0)}`)
  bar.value.style.setProperty('--offset', `${offset.toFixed(0)}`)
}

const displayedPercentage = computed(() => (isAnimated.value ? targetPercentage : 0))
const durationStyle = computed(() => `${isAnimated.value ? durationMs : 0}ms`)

watchEffect(() => {
  setCircleProgress(displayedPercentage.value)
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
    :class="{ 'is-animated': isAnimated }"
    :style="{
      '--percentage': displayedPercentage,
      '--duration': durationStyle,
    }"
  >
    <div class="size-full aspect-square max-h-full">
      <svg
        class="
        progress-bar-circle__svg
        size-full
        -rotate-90
      "
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
      >
        <!-- grey background ring -->
        <circle
          class="
          progress-bar-circle__ring-background
          stroke-blue
        "
          stroke-width="29"
          cx="200"
          cy="200"
          r="185"
        />

        <!-- animated progress ring -->
        <circle
          ref="bar"
          data-js-progress-bar
          class="
          progress-bar-circle__bar
          stroke-green
        "
          stroke-width="29"
          stroke-linecap="round"
          cx="200"
          cy="200"
          r="185"
        />
      </svg>

      <div
        class="
        progress-bar-circle__number-outer
      "
      >
        <div
          class="
        progress-bar-circle__number-inner
      "
        >
          <span
            class="
          progress-bar-circle__number
        "
          />

          <small
            class="
          progress-bar-circle__unit
        "
          >%</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

@property --percentage-count {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0;
}

@keyframes progress-percentage-animation {
  from {
    --percentage-count: 0;
  }
  to {
    --percentage-count: var(--percentage);
  }
}

.progress-bar-circle__bar {
  stroke: var(--color-green);
  stroke-dasharray: var(--circumference) var(--circumference);
  stroke-dashoffset: var(--offset);

  transition:
    stroke-dashoffset var(--duration) var(--ease-inOutQuart),
    stroke 0.2s var(--ease-out);
}

.progress-bar-circle__number-outer {
  @apply absolute
  inset-0
  flex
  items-center
  justify-center
  text-white
  text-[min(40cqb,40cqi,160px)]
  tracking-[-0.04em]
  leading-none;
}

.progress-bar-circle__number-inner {
  @apply relative
  flex
  items-baseline
  gap-[0.1em];
}

.progress-bar-circle__number {
  --percentage-count: 0;

  counter-reset: progress-count var(--percentage-count);

  &::before {
    content: counter(progress-count);
  }
}

.is-animated .progress-bar-circle__number {
  animation: progress-percentage-animation var(--duration) var(--ease-out) forwards;
}

.progress-bar-circle__unit {
  @apply text-[60%];
}
</style>
