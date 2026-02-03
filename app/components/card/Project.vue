<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'

interface Props {
  slug?: string
  image?: StoryblokAsset
  tagline?: string
  headline?: string
  isLarge?: boolean
}

const { slug, image, tagline, headline, isLarge = false } = defineProps<Props>()
</script>

<template>
  <article class="size-full">
    <NuxtLink
      class="flex flex-col gap-6 size-full border-b border-(--app-text-color) pb-6"
      :to="`/${slug}`"
    >
      <div
        class="overflow-hidden aspect-video"
        :class="{
          'max-md:-mx-(--app-outer-gutter)': isLarge,
        }"
      >
        <NuxtImg
          v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
          class="block size-full object-cover"
          :src="image.filename"
          :alt="image.alt || headline || ''"
          :width="500"
          :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 500)"
        />
      </div>

      <p
        v-if="tagline"
        class="text-balance"
      >
        {{ tagline }}
      </p>

      <h3
        v-if="headline"
        class="type-h4 text-balance max-w-[64ch]"
      >
        {{ headline }}
      </h3>
    </NuxtLink>
  </article>
</template>
