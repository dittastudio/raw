<script lang="ts" setup>
import type { PostGallery } from '#storyblok-components'

interface Props {
  block: PostGallery
}

const { block } = defineProps<Props>()
</script>

<template>
  <ul
    v-if="block.items?.length"
    v-editable="block"
    class="grid gap-4"
    :class="{
      'grid-cols-1': block.items.length === 1,
      'grid-cols-2': block.items.length >= 2,
    }"
  >
    <li
      v-for="image in block.items"
      :key="image.id"
    >
      <NuxtImg
        v-if="image.filename && storyblokAssetType(image.filename) === 'image'"
        class="block size-full object-cover"
        :src="image.filename"
        :alt="image.alt || ''"
        :width="400"
        :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 400)"
        loading="lazy"
      />
    </li>
  </ul>
</template>
