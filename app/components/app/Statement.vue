<script lang="ts" setup>
import type { Image, MuxVideo } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { StoryblokMultilink } from '@@/.storyblok/types/storyblok'

interface Props {
  media?: (Image | MuxVideo)
  statement?: string
  title?: string
  link?: StoryblokMultilink
}

const { media, statement, title, link } = defineProps<Props>()
</script>

<template>
  <div class="relative isolate w-full bg-green text-offblack">
    <div class="absolute inset-0 -z-1">
      <NuxtImg
        v-if="media && isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
        class="block size-full object-cover"
        :src="media.image.filename"
        :alt="media.image.alt || ''"
        :width="3"
        :height="2"
        sizes="
          100vw
          xs:100vw
          sm:100vw
          md:100vw
          lg:100vw
          xl:100vw
          2xl:100vw
        "
        loading="lazy"
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

    <div class="wrapper py-35 flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center gap-8 w-full max-w-325">
        <h5
          v-if="statement"
          class="type-h2 text-center"
        >
          {{ statement }}
        </h5>

        <StoryblokLink
          v-if="title && link"
          :item="link"
        >
          <UiButton
            theme-override="dark"
            type="solid"
          >
            {{ title }}
          </UiButton>
        </StoryblokLink>
      </div>
    </div>
  </div>
</template>
