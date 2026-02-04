<script lang="ts" setup>
import type { BlockMedia } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockMedia
}

const { block } = defineProps<Props>()

const media = computed(() => block.media?.[0])

const setSizes = computed(() => {
  if (block.full_bleed) {
    return `
      2xs:100vw
      xs:100vw
      sm:100vw
      md:100vw
      lg:100vw
      xl:100vw
      2xl:1400px
    `
  }

  return `
    2xs:100vw
    xs:100vw
    sm:100vw
    md:80vw
    lg:80vw
    xl:80vw
    2xl:1200px
  `
})
</script>

<template>
  <div
    v-editable="block"
    :class="{
      'wrapper-max grid gap-x-(--app-inner-gutter) grid-cols-(--app-grid)': !block.full_bleed,
    }"
  >
    <div
      :class="{
        'col-span-full md:col-start-2 md:col-span-10': !block.full_bleed,
      }"
    >
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="storyblokImageDimensions(media.image.filename).width"
        :height="storyblokImageDimensions(media.image.filename).height"
        :sizes="setSizes"
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoAutoplayComponent(media) && media.video?.playbackId"
        class="block size-full object-cover"
        :playback-id="media.video.playbackId"
        :is-cover="true"
        playsinline
        autoplay
        muted
        loop
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoPlayerComponent(media) && media.video?.playbackId"
        class="block size-full object-cover"
        :playback-id="media.video.playbackId"
        :is-cover="true"
        playsinline
        controls
      />
    </div>
  </div>
</template>
