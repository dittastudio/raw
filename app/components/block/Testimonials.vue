<script lang="ts" setup>
import type { BlockTestimonials } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockTestimonials
}

const { block } = defineProps<Props>()

const media = computed(() => block.media?.[0])
</script>

<template>
  <div
    v-editable="block"
    class="py-(--app-vertical-spacing) relative isolate overflow-hidden"
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
      :items="block.items"
      :options="{ loop: true }"
      autoplay
      :autoplay-interval="4000"
    >
      <template #item="{ item, isActive }">
        <blockquote
          class="testimonials__quote wrapper-max flex flex-col items-center justify-center text-center gap-y-10 md:gap-y-15"
          :class="{ 'is-active': isActive }"
        >
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
