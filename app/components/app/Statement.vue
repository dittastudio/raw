<script lang="ts" setup>
import type { MultilinkFieldValue, RichTextFieldValue } from '@storyblok/schema'
import type { Block } from '#storyblok-schema'

interface Props {
  media?: (Block<'image'> | Block<'mux_video_autoplay'> | Block<'mux_video_player'>)
  statement?: RichTextFieldValue | null
  title?: string | null
  link?: MultilinkFieldValue | null
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
        :alt="media.image.alt || statement || ''"
        :width="3"
        :height="2"
        sizes="
          xs:100vw
          sm:100vw
          md:100vw
          lg:100vw
          xl:100vw
        "
        loading="lazy"
      />

      <UiMuxVideo
        v-else-if="media && isMuxVideoAutoplayComponent(media) && media.video?.playbackId"
        :playback-id="media.video.playbackId"
        :is-cover="true"
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
    </div>

    <div class="wrapper py-35 flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center gap-8 w-full max-w-325">
        <div
          v-if="storyblokRichTextContent(statement)"
          class="[&_h5]:type-h2 text-center"
        >
          <StoryblokText :html="statement" />
        </div>

        <StoryblokLink
          v-if="title && link"
          :item="link"
        >
          <UiButton type="solid">
            {{ title }}
          </UiButton>
        </StoryblokLink>
      </div>
    </div>
  </div>
</template>
