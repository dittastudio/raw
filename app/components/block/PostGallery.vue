<script lang="ts" setup>
import type { PostGallery } from '#storyblok-components'

interface Props {
  block: PostGallery
}

const { block } = defineProps<Props>()

const sizesFull = 'xs:100vw sm:100vw md:60vw lg:50vw xl:800px'
const sizesHalf = 'xs:50vw sm:50vw md:30vw lg:25vw xl:400px'
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
        :width="storyblokImageDimensions(image.filename).width"
        :height="storyblokImageDimensions(image.filename).height"
        :sizes="block.items.length === 1 ? sizesFull : sizesHalf"
        loading="lazy"
      />
    </li>
  </ul>
</template>
