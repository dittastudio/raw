<script lang="ts" setup>
import type { BlockImpactDetails } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockImpactDetails
}

const { block } = defineProps<Props>()

const theme = computed(() => (block.theme as Themes) ?? 'light')
const media = computed(() => block.media?.[0])
</script>

<template>
  <div
    v-editable="block"
    class="grid gap-y-10 md:gap-y-20"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
    />

    <div
      class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
      :class="{
        'grid-rows-[auto_auto] md:grid-rows-1': media && (storyblokRichTextContent(block.copy) || block.cta?.cached_url),
      }"
    >
      <div
        v-if="media"
        class="col-start-1 col-span-full md:col-span-7"
        :class="{
          'max-md:row-start-2': media && (storyblokRichTextContent(block.copy) || block.cta?.cached_url),
        }"
      >
        <NuxtImg
          v-if="isImageComponent(media) && media.image?.filename && storyblokAssetType(media.image.filename) === 'image'"
          class="block w-full h-auto"
          :src="media.image.filename"
          :alt="media.image.alt || block.headline || block.title || ''"
          :width="500"
          :height="Math.round(storyblokImageDimensions(media.image.filename).height / storyblokImageDimensions(media.image.filename).width * 500)"
          loading="lazy"
        />
      </div>

      <div
        class="flex flex-col gap-10 col-start-2 sm:col-start-5 md:col-start-9 col-span-full"
        :class="{
          'max-md:row-start-1': media && (storyblokRichTextContent(block.copy) || block.cta?.cached_url),
        }"
      >
        <div
          v-if="storyblokRichTextContent(block.copy)"
          class="prose-p"
        >
          erergerge
          <StoryblokText :html="block.copy" />
        </div>

        <StoryblokLink
          v-if="block.cta_title && block.cta?.cached_url"
          class="inline-block"
          :item="block.cta"
        >
          <UiButton
            :type="block.theme === 'dark' ? 'outline' : 'solid'"
            :theme="theme"
          >
            {{ block.cta_title }}
          </UiButton>
        </StoryblokLink>

        <ul
          v-if="block.logos?.length"
          class="w-full grid grid-cols-3 gap-5 mt-auto -ml-2"
        >
          <li
            v-for="logo in block.logos"
            :key="logo.id"
            class="w-full flex items-center justify-center aspect-square"
          >
            <template v-if="logo.filename && storyblokAssetType(logo.filename) === 'image'">
              <img
                v-if="fileExtension(logo.filename) === 'svg'"
                class="block size-full object-contain"
                :src="logo.filename"
                :alt="logo.alt || block.title || ''"
                loading="lazy"
              >

              <NuxtImg
                v-else
                class="block w-auto h-10 md:h-15 object-contain"
                :src="logo.filename"
                :alt="logo.alt || block.title || ''"
                densities="x1 x2"
                height="60"
                loading="lazy"
              />
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
