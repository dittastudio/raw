<script lang="ts" setup>
import type { BlockMedia } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockMedia
}

const { block } = defineProps<Props>()

const media = computed(() => block.media?.[0])

const setSizes = computed(() => block.placement === 'inset'
  ? `
    2xs:100vw
    xs:100vw
    sm:100vw
    md:80vw
    lg:80vw
    xl:80vw
    2xl:1200px
  `
  : `
    2xs:100vw
    xs:100vw
    sm:100vw
    md:100vw
    lg:100vw
    xl:100vw
    2xl:1400px
  `)
</script>

<template>
  <div
    v-editable="block"
    :class="{
      'wrapper-max grid gap-x-(--app-inner-gutter) grid-cols-(--app-grid)': block.placement !== 'full',
    }"
  >
    <figure
      :class="{
        'col-span-full': block.placement === 'wide',
        'col-span-full md:col-start-2 md:col-span-10': block.placement === 'inset',
        'flex flex-col items-center text-center gap-12': block.title,
        'pt-(--app-vertical-spacing)': block.placement === 'full' && block.title,
      }"
    >
      <figcaption
        v-if="block.title"
        class="type-h5"
      >
        {{ block.title }}
      </figcaption>

      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="storyblokImageDimensions(media.image.filename).width"
        :height="storyblokImageDimensions(media.image.filename).height"
        :sizes="setSizes"
        loading="lazy"
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoAutoplayComponent(media) && media.video?.playbackId"
        class="block size-full object-cover"
        :playback-id="media.video.playbackId"
        :poster="media.poster?.filename ? storyblokImage(media.poster.filename, {
          width: 1600,
          height: 900,
          format: 'webp',
          quality: 80,
        }) : null"
        playsinline
        autoplay
        muted
        loop
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoPlayerComponent(media) && media.video?.playbackId"
        class="block size-full object-cover"
        :accent-color="getThemeColors[(block.accent) as Themes || 'green'].background"
        :playback-id="media.video.playbackId"
        :poster="media.poster?.filename ? storyblokImage(media.poster.filename, {
          width: 1600,
          height: 900,
          format: 'webp',
          quality: 80,
        }) : null"
        playsinline
        controls
      />
    </figure>
  </div>
</template>
