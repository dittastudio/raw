<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'

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
      class="flex flex-col items-start justify-start gap-6 size-full border-b border-offblack pb-6"
      :to="`/${slug}`"
    >
      <NuxtImg
        v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
        class="block w-full aspect-video object-cover"
        :src="image.filename"
        :alt="image.alt || headline || ''"
        :width="500"
        :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 500)"
        quality="85"
        :modifiers="{
          smart: true,
        }"
      />

      <p v-if="category">
        {{ category }}
      </p>

      <h3
        v-if="headline"
        class="font-bold type-mono-20 text-balance max-w-[64ch]"
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
