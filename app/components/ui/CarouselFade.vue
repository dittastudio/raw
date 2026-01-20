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
  autoplay?: boolean
  autoplayInterval?: number
}

const {
  items,
  options = {},
  perView = 1,
  spacing = 0,
  autoplay = false,
  autoplayInterval = 5000,
} = defineProps<Props<T>>()

const details = ref<TrackDetails>()
const isInView = ref(false)
const opacities = ref<number[]>([])

const isAutoplayActive = computed(() => autoplay && isInView.value)

const autoplayControls = {
  start: () => {},
  stop: () => {},
}

const createAutoplayPlugin = ({
  isActive,
  interval,
}: {
  isActive: () => boolean
  interval: () => number
}) => {
  return (slider: KeenSliderInstance) => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    let mouseOver = false

    const clear = () => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = undefined
      }
    }

    const schedule = () => {
      clear()
      if (!isActive() || mouseOver) {
        return
      }

      timeout = setTimeout(() => {
        if (!isActive() || mouseOver) {
          return
        }

        slider.next()
      }, interval())
    }

    const stop = () => {
      clear()
    }

    const start = () => {
      schedule()
    }

    autoplayControls.start = start
    autoplayControls.stop = stop

    const handleMouseOver = () => {
      mouseOver = true
      stop()
    }

    const handleMouseOut = () => {
      mouseOver = false
      start()
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', handleMouseOver)
      slider.container.addEventListener('mouseout', handleMouseOut)

      start()
    })

    slider.on('dragStarted', () => {
      stop()
    })

    slider.on('animationEnded', start)
    slider.on('updated', start)

    slider.on('destroyed', () => {
      stop()

      slider.container.removeEventListener('mouseover', handleMouseOver)
      slider.container.removeEventListener('mouseout', handleMouseOut)
    })
  }
}

const [container, slider] = useKeenSlider({
  loop: false,
  mode: 'snap',
  defaultAnimation: {
    duration: 500,
  },
  slides: items?.length || 0,
  // slides: {

  //   perView,
  //   spacing,
  // },
  detailsChanged: (slider) => {
    opacities.value = slider.track.details.slides.map((s: any) => s.portion)
  },
  created(slider) {
    details.value = slider.track.details

    slider.on('detailsChanged', (s) => {
      details.value = s.track.details
    })
  },
  ...options,
}, [
  createAutoplayPlugin({
    isActive: () => isAutoplayActive.value,
    interval: () => autoplayInterval,
  }),
])

// watch(() => [perView, spacing], ([newPerView, newSpacing]) => {
//   slider.value?.update({
//     slides: {
//       perView: newPerView,
//       spacing: newSpacing,
//     },
//     ...options,
//   })
// })

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

watch(isAutoplayActive, (active) => {
  if (active) {
    autoplayControls.start()
    return
  }

  autoplayControls.stop()
})

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
      class="ui-carousel-fade__slider relative size-full flex touch-pan-y select-none overflow-hidden"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="ui-carousel-fade__slide shrink-0x w-full"
        :class="[
          opacities[index] === 1 ? 'pointer-events-auto' : 'pointer-events-none',
          { 'is-active': details?.rel === index },
        ]"
        :style="{ opacity: opacities[index] }"
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

<style scoped>
@reference "@/assets/css/app.css";

.ui-carousel-fade__slider {
  display: grid;
  grid-template-areas: "stack";
}

.ui-carousel-fade__slide {
  grid-area: stack;
}
</style>
