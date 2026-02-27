<script lang="ts" setup>
import type { StoryblokAsset } from '#storyblok-types'

interface Props {
  headline?: string
  slug?: string
  image?: StoryblokAsset
  category?: string
}

const { headline, slug, image, category } = defineProps<Props>()
</script>

<template>
  <article class="size-full">
    <NuxtLink
      class="flex flex-col items-start justify-start gap-6 size-full border-b border-current pb-6"
      :to="`/${slug}`"
    >
      <div class="w-full overflow-hidden aspect-video">
        <NuxtImg
          v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
          class="block size-full object-cover"
          :src="image.filename"
          :alt="image.alt || headline || ''"
          :width="500"
          :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 500)"
          loading="lazy"
        />
      </div>

      <p v-if="category">
        {{ category }}
      </p>

      <h3
        v-if="headline"
        class="type-h5 text-balance max-w-[64ch]"
      >
        {{ headline }}
      </h3>

      <div
        v-if="$slots.author"
        class="mt-auto"
      >
        <slot name="author" />
      </div>
    </NuxtLink>
  </article>
</template>
