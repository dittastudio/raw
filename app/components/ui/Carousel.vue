<script generic="T" lang="ts" setup>
import type { KeenSliderInstance, KeenSliderOptions, TrackDetails } from 'keen-slider'
import { onKeyStroke, useIntersectionObserver } from '@vueuse/core'
import { useKeenSlider } from 'keen-slider/vue.es'

export interface Carousel {
  slider: Ref<KeenSliderInstance | undefined>
  details: Ref<TrackDetails | undefined>
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
    details.value = slider.track.details

    slider.on('detailsChanged', (s) => {
      details.value = s.track.details
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
  <div class="relative size-full">
    <div
      ref="container"
      class="keen-slider size-full flex touch-pan-y select-none overflow-hidden"
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

    <slot name="other" />
  </div>
</template>
