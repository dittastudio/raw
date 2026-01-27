<script lang="ts" setup>
import { TransitionPresets, useIntersectionObserver, useTransition } from '@vueuse/core'

interface Props {
  value1?: number
  value2?: number
  value3?: number
}

const { value1 = 109.5, value2 = 80, value3 = 50.9 } = defineProps<Props>()

const root = useTemplateRef<HTMLElement>('root')
const bar1 = useTemplateRef<SVGCircleElement>('bar1')
const bar2 = useTemplateRef<SVGCircleElement>('bar2')
const bar3 = useTemplateRef<SVGCircleElement>('bar3')

const maxValue = 250
const durationMs = 2000
const isAnimated = ref(false)

const sourceValue1 = computed(() => (isAnimated.value ? value1 : 0))
const sourceValue2 = computed(() => (isAnimated.value ? value2 : 0))
const sourceValue3 = computed(() => (isAnimated.value ? value3 : 0))

const animatedValue1 = useTransition(sourceValue1, {
  duration: durationMs,
  transition: TransitionPresets.easeInOutExpo,
  disabled: computed(() => !isAnimated.value),
})
const animatedValue2 = useTransition(sourceValue2, {
  duration: durationMs,
  transition: TransitionPresets.easeInOutExpo,
  disabled: computed(() => !isAnimated.value),
})
const animatedValue3 = useTransition(sourceValue3, {
  duration: durationMs,
  transition: TransitionPresets.easeInOutExpo,
  disabled: computed(() => !isAnimated.value),
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
      threshold: 0,
    },
  )
})
</script>

<template>
  <div
    ref="root"
    class="ui-graph flex flex-col gap-10"
  >
    <div class="@container-[size] relative size-full aspect-square">
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
            r="158"
          />

          <!-- animated progress ring 2 -->
          <circle
            ref="bar2"
            class="ui-graph__circle ui-graph__circle--animated stroke-green"
            cx="200"
            cy="200"
            r="158"
          />
        </g>

        <g>
          <!-- grey background ring 3 -->
          <circle
            class="ui-graph__circle ui-graph__circle--background"
            cx="200"
            cy="200"
            r="131"
          />

          <!-- animated progress ring 3 -->
          <circle
            ref="bar3"
            class="ui-graph__circle ui-graph__circle--animated stroke-pink"
            cx="200"
            cy="200"
            r="131"
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
        text-[min(10cqmin,29px)]
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
          {{ (animatedValue1 ?? 0).toFixed(1) }}
        </div>
      </div>
    </div>

    <dl class="flex flex-col gap-3 type-p">
      <div class="flex items-start gap-2">
        <dt class="bg-blue size-5 rounded-full shrink-0" />

        <dd>Overall score</dd>
      </div>

      <div class="flex items-start gap-2">
        <dt class="bg-green size-5 rounded-full shrink-0" />

        <dd>Qualifies for certification</dd>
      </div>

      <div class="flex items-start gap-2">
        <dt class="bg-pink size-5 rounded-full shrink-0" />

        <dd>Median score for ordinary businesses</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-graph__circle {
  stroke-width: 18;
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
