<script lang="ts" setup>
import type { Carousel } from './Carousel.vue'

const carousel = inject<Carousel>('carousel')

const totalDots = computed(() => carousel?.details.value?.slides.length ?? 0)
const currentDot = computed(() => carousel?.details.value?.rel ?? 0)

const dots = computed(() => Array.from({ length: totalDots.value }, (_, index) => index))

const goTo = (index: number) => {
  carousel?.slider.value?.moveToIdx(index)
}
</script>

<template>
  <div
    v-if="carousel && dots.length > 1"
    class="mt-6 flex items-center justify-center gap-2"
  >
    <button
      v-for="dot in dots"
      :key="dot"
      type="button"
      class="
        size-2.5
        rounded-full
        border
        border-solid
        border-current
        transition-colors
        duration-200
        ease-smooth
      "
      :class="dot === currentDot ? 'bg-current' : 'bg-transparent'"
      :aria-label="`Go to slide ${dot + 1}`"
      :aria-current="dot === currentDot ? 'true' : undefined"
      @click="goTo(dot)"
    />
  </div>
</template>
