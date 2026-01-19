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
  <article>
    <NuxtLink
      class="flex flex-col gap-4"
      :to="`/${slug}`"
    >
      <NuxtImg
        v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
        class="block w-full h-auto"
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
        class="font-bold type-mono-20 text-pretty"
      >
        {{ headline }}
      </h3>

      <slot name="author" />
    </NuxtLink>
  </article>
</template>
