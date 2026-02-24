<script lang="ts" setup>
import type { BlockTicker } from '#storyblok-components'

interface Props {
  block: BlockTicker
}

const { block } = defineProps<Props>()

const media = computed(() => block.media?.[0] || null)
</script>

<template>
  <div
    v-editable="block"
    class="relative isolate overflow-hidden"
    :class="{ 'py-[calc(var(--app-vertical-spacing)*2)]': media }"
  >
    <div
      v-if="media"
      class="absolute inset-0 -z-1"
    >
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || block.text || ''"
        :width="16"
        :height="9"
        loading="lazy"
        sizes="
          100vw
          xs:100vw
          sm:100vw
          md:100vw
          lg:100vw
          xl:100vw
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

    <div class="flex flex-col h-full items-center justify-center gap-20 md:gap-40">
      <h4
        v-if="block.text"
        class="wrapper-max type-h4 text-center"
      >
        {{ block.text }}
      </h4>

      <UiTicker
        duration="30s"
        direction="right"
      >
        <template
          v-for="logo in block.logos"
          :key="logo.id"
        >
          <template v-if="logo.filename">
            <img
              v-if="fileExtension(logo.filename) === 'svg'"
              class="block w-auto h-11"
              :src="logo.filename"
              :alt="logo.alt || block.text || ''"
              :width="storyblokImageDimensions(logo.filename).width"
              :height="storyblokImageDimensions(logo.filename).height"
              loading="lazy"
            >

            <NuxtImg
              v-else
              class="block w-auto h-11"
              :src="logo.filename"
              :alt="logo.alt || block.text || ''"
              :width="storyblokImageDimensions(logo.filename).width"
              :height="storyblokImageDimensions(logo.filename).height"
              densities="x1 x2"
              loading="lazy"
            />
          </template>
        </template>
      </UiTicker>
    </div>
  </div>
</template>
