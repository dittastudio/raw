<script lang="ts" setup>
import type { BlockTicker } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockTicker
}

const { block } = defineProps<Props>()

const media = computed(() => block.media?.[0] || null)
</script>

<template>
  <UiTheme
    v-editable="block"
    :theme="(block.theme as Themes)"
    class="relative overflow-hidden py-20 md:py-36"
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
        :width="16"
        :height="9"
        format="webp"
        loading="lazy"
        :modifiers="{
          smart: true,
        }"
        quality="85"
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
        v-else-if="media && isMuxVideoComponent(media) && media.video?.playbackId"
        :playback-id="media.video.playbackId"
        :is-cover="true"
        playsinline
        autoplay
        muted
        loop
      />
    </div>

    <div class="flex flex-col h-full items-center justify-center gap-20 md:gap-40">
      <h4
        v-if="block.text"
        class="wrapper-max type-h4 text-center"
      >
        {{ block.text }}
      </h4>

      <div class="invert-appearance">
        <UiTicker
          duration="30s"
          direction="right"
        >
          <template
            v-for="logo in block.logos"
            :key="logo.id"
          >
            <NuxtImg
              class="block w-auto h-10"
              :src="logo.filename || ''"
              :alt="logo.alt || ''"
              height="40"
              densities="x1 x2"
              format="webp"
              loading="lazy"
            />
          </template>
        </UiTicker>
      </div>
    </div>
  </UiTheme>
</template>

<style scoped>
@reference "@/assets/css/app.css";
</style>
