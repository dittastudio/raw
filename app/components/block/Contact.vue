<script lang="ts" setup>
import type { BlockContact } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockContact
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max flex flex-col gap-19 md:gap-38"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-(--app-inner-gutter) gap-y-6">
      <h2 class="col-span-full md:col-span-1 type-h5">
        {{ block.title }}
      </h2>

      <EffectTextReveal
        v-if="storyblokRichTextContent(block.headline)"
        :delay="500"
        class="col-span-full md:col-span-2 type-h4 [&_h3+*]:mt-[1.25em] [&_h3]:max-w-[29ch]"
      >
        <StoryblokText :html="block.headline" />
      </EffectTextReveal>
    </div>

    <ul class="prose-p flex flex-col">
      <li
        v-for="info in block.info"
        :key="info._uid"
        class="
          grid
          grid-cols-(--app-grid)
          gap-x-(--app-inner-gutter)
          gap-y-6
          border-b
          border-current
          py-15
          md:py-20
          first:border-t
        "
      >
        <h3 class="col-span-full md:col-span-4 type-h5">
          {{ info.title }}
        </h3>

        <div class="col-span-full md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-(--app-inner-gutter) gap-y-6">
          <div
            v-if="info.media?.[0]"
            class="col-span-full max-md:order-1"
          >
            <NuxtImg
              v-if="info.media?.[0] && isImageComponent(info.media?.[0]) && info.media?.[0].image?.filename && storyblokAssetType(info.media?.[0].image.filename) === 'image'"
              class="block size-full object-cover"
              :src="info.media?.[0].image.filename"
              :alt="info.media?.[0].image.alt || ''"
              :width="storyblokImageDimensions(info.media?.[0].image.filename).width"
              :height="storyblokImageDimensions(info.media?.[0].image.filename).height"
              sizes="
                xs:100vw
                lg:66vw
                xl:920px
              "
              loading="lazy"
            />

            <UiMuxVideo
              v-else-if="info.media?.[0] && isMuxVideoAutoplayComponent(info.media?.[0]) && info.media?.[0].video?.playbackId"
              class="block size-full object-cover"
              :playback-id="info.media?.[0].video.playbackId"
              playsinline
              autoplay
              muted
              loop
            />

            <UiMuxVideo
              v-else-if="info.media?.[0] && isMuxVideoPlayerComponent(info.media?.[0]) && info.media?.[0].video?.playbackId"
              class="block size-full object-cover"
              :playback-id="info.media?.[0].video.playbackId"
              :poster="info.media?.[0].poster?.filename ? storyblokImage(info.media?.[0].poster.filename, {
                width: 1600,
                height: 900,
                format: 'webp',
                quality: 80,
              }) : null"
              playsinline
              controls
            />
          </div>

          <div
            v-if="storyblokRichTextContent(info.column_one)"
            class="col-span-full md:col-span-1"
          >
            <StoryblokText :html="info.column_one" />
          </div>

          <div
            v-if="storyblokRichTextContent(info.column_two)"
            class="col-span-full md:col-span-1"
          >
            <StoryblokText :html="info.column_two" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
