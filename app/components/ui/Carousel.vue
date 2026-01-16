<script generic="T" lang="ts" setup>
import type { KeenSliderInstance, KeenSliderOptions, TrackDetails } from 'keen-slider'
import { onKeyStroke, useIntersectionObserver } from '@vueuse/core'
import { useKeenSlider } from 'keen-slider/vue.es'

export interface Carousel {
  slider: Ref<KeenSliderInstance>
  details: Ref<TrackDetails>
  next: () => void
  previous: () => void
}

interface Props<T> {
  items?: T[]
  options?: KeenSliderOptions
  perView?: number
  spacing?: number
}

const {
  items,
  options = {},
  perView = 1,
  spacing = 0,
} = defineProps<Props<T>>()

const details = ref<TrackDetails>()

const dots = ref<number[]>([])
const currentDot = ref(0)

const [container, slider] = useKeenSlider({
  loop: false,
  mode: 'snap',
  dragSpeed: 1,
  rubberband: true,
  defaultAnimation: {
    duration: 500,
  },
  slides: {
    perView,
    spacing,
  },
  created(slider) {
    const trackDetails = slider.track.details
    const count = trackDetails.slides.length

    details.value = trackDetails
    currentDot.value = trackDetails.rel
    dots.value = Array.from({ length: count }, (_, index) => index)

    slider.on('detailsChanged', (s) => {
      const updatedDetails = s.track.details
      const updatedCount = updatedDetails.slides.length

      details.value = updatedDetails
      currentDot.value = updatedDetails.rel
      dots.value = Array.from({ length: updatedCount }, (_, index) => index)
    })
  },
  ...options,
})

watch(() => [perView, spacing], ([newPerView, newSpacing]) => {
  slider.value?.update({
    defaultAnimation: {
      duration: 500,
    },
    slides: {
      perView: newPerView,
      spacing: newSpacing,
    },
    ...options,
  })
})

const next = () => {
  slider.value?.next()
}

const previous = () => {
  slider.value?.prev()
}

const goTo = (index: number) => {
  slider.value?.moveToIdx(index)
}

const carousel = {
  slider,
  details,
  next,
  previous,
}

// Provide carousel to child components
provide('carousel', carousel)

const isInView = ref(false)

useIntersectionObserver(
  container,
  ([entry]) => {
    if (entry) {
      isInView.value = entry.isIntersecting
    }
  },
  {
    threshold: 0.3,
  },
)

onKeyStroke('ArrowLeft', (e: KeyboardEvent) => {
  if (isInView.value) {
    e.preventDefault()
    previous()
  }
})

onKeyStroke('ArrowRight', (e: KeyboardEvent) => {
  if (isInView.value) {
    e.preventDefault()
    next()
  }
})
</script>

<template>
  <div
    ref="container"
    class="keen-slider size-full relative flex touch-pan-y select-none overflow-hidden"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="keen-slider__slide shrink-0"
      :class="{ 'is-active': details?.abs === index }"
    >
      <slot
        name="item"
        :item="item"
        :index="index"
      />
    </div>
  </div>

  <div
    v-if="dots.length > 1"
    class="mt-6 flex items-center justify-center gap-2"
  >
    <button
      v-for="dot in dots"
      :key="dot"
      type="button"
      class="
          size-2 rounded-full transition
          ring-1 ring-transparent
          hover:ring-black/50
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-black
        "
      :class="dot === currentDot ? 'bg-black' : 'bg-black/30'"
      :aria-label="`Go to slide ${dot + 1}`"
      :aria-current="dot === currentDot ? 'true' : undefined"
      @click="goTo(dot)"
    />
  </div>
</template>
