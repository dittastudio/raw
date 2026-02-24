<script lang="ts" setup>
import type { BlockTestimonials } from '#storyblok-components'
import type { Carousel } from '@/components/ui/CarouselFade.vue'
import IconArrow from '@/assets/icons/arrow-left.svg'

interface Props {
  block: BlockTestimonials
}

const { block } = defineProps<Props>()

const media = computed(() => block.media?.[0])

const carouselRef = useTemplateRef<Carousel>('carouselFade')
</script>

<template>
  <div
    v-editable="block"
    class="relative isolate overflow-hidden"
    :class="{ 'py-(--app-vertical-spacing)': media }"
  >
    <div
      v-if="media"
      class="absolute inset-0 -z-1"
    >
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="6"
        :height="2"
        loading="lazy"
        sizes="
          100vw
          xs:100vw
          sm:100vw
          md:100vw
          lg:100vw
          xl:100vw
          2xl:100vw
        "
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoAutoplayComponent(media) && media.video?.playbackId"
        :playback-id="media.video.playbackId"
        :is-cover="true"
        playsinline
        autoplay
        muted
        loop
      />
    </div>

    <UiCarouselFade
      ref="carouselFade"
      :items="block.items"
      :options="{ loop: true }"
      :autoplay-interval="4000"
      autoplay
    >
      <template #item="{ item, isActive }">
        <blockquote
          class="testimonials__quote wrapper-max flex flex-col items-center justify-between text-center gap-y-10 md:gap-y-15 h-full"
          :class="{ 'is-active': isActive }"
        >
          <p class="my-auto type-h4 max-w-[35ch] before:content-[open-quote] after:content-[close-quote] text-balance">
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
        <div class="max-md:hidden absolute inset-0 pointer-events-none flex items-center justify-between wrapper-max">
          <button
            type="button"
            class="group pointer-events-auto p-6 -m-6 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-out"
            @click="carouselRef?.previous()"
          >
            <IconArrow class="size-8 fill-current group-hover:scale-105 transition-[scale] duration-200 ease-out" />
          </button>

          <button
            type="button"
            class="group pointer-events-auto p-6 -m-6 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-out"
            @click="carouselRef?.next()"
          >
            <IconArrow class="size-8 fill-current rotate-180 group-hover:scale-105 transition-[scale] duration-200 ease-out" />
          </button>
        </div>

        <div class="wrapper-max flex justify-center pt-10 md:pt-15 pointer-events-none">
          <div class="pointer-events-auto">
            <UiCarouselDots />
          </div>
        </div>
      </template>
    </UiCarouselFade>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.testimonials__quote {
  opacity: 0;
  scale: 0.975;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition:
    opacity 0.15s var(--ease-in),
    scale 0.15s var(--ease-in);

  &.is-active {
    opacity: 1;
    scale: 1;
    transition:
      opacity 0.3s var(--ease-out) 0.15s,
      scale 0.3s var(--ease-out) 0.15s;
  }
}
</style>
