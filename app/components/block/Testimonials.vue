<script lang="ts" setup>
import type { BlockTestimonials } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockTestimonials
}

const { block } = defineProps<Props>()
</script>

<template>
  <div v-editable="block">
    <UiCarousel
      :items="block.items"
      :options="{ loop: true }"
      autoplay
      :autoplay-interval="4000"
    >
      <template #item="{ item }">
        <blockquote class="testimonials__quote wrapper-max flex flex-col items-center justify-center text-center gap-y-10 md:gap-y-15">
          <p class="type-h4 max-w-[35ch] before:content-[open-quote] after:content-[close-quote] text-balance">
            {{ item.quote }}
          </p>

          <footer class="flex flex-col items-center gap-y-1 type-p">
            <span class="font-bold text-[120%]">
              {{ item.name }}
            </span>

            <cite>
              @ {{ item.desc }}
            </cite>
          </footer>
        </blockquote>
      </template>

      <template #other>
        <div class="wrapper-max flex justify-center pt-10 md:pt-15 pointer-events-none">
          <div class="pointer-events-auto">
            <UiCarouselDots />
          </div>
        </div>
      </template>
    </UiCarousel>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.testimonials__quote {
  opacity: 0;
  transition: opacity 0.05s var(--ease-out);

  .is-active & {
    opacity: 1;
    transition: opacity 0.4s var(--ease-out) 0.1s;
  }
}
</style>
