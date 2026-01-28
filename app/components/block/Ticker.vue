<script lang="ts" setup>
import type { BlockTicker } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockTicker
}

const { block } = defineProps<Props>()

const media = computed(() => block.media?.[0] || null)
const isImage = computed(() => media.value && isImageComponent(media.value) && media.value.image?.filename && storyblokAssetType(media.value.image.filename) === 'image')
const isVideo = computed(() => media.value && isMuxVideoComponent(media.value) && media.value.video?.playbackId)
</script>

<template>
  <UiTheme
    v-editable="block"
    :theme="(block.theme as Themes)"
    class="grid grid-cols-1 grid-rows-1 items-center"
  >
    <div
      v-if="isImage || isVideo"
      class="col-start-1 row-start-1"
    >
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="1000"
        :height="Math.round(storyblokImageDimensions(media.image.filename).height / storyblokImageDimensions(media.image.filename).width * 1000)"
        quality="85"
        :modifiers="{
          smart: true,
        }"
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

    <div class="col-start-1 row-start-1 flex flex-col h-full items-center justify-center gap-20 md:gap-40">
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
