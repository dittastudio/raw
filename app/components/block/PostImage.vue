<script lang="ts" setup>
import type { PostImage } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: PostImage
}

const { block } = defineProps<Props>()
</script>

<template>
  <div class="w-full">
    <NuxtImg
      v-if="block.image?.filename && storyblokAssetType(block.image.filename) === 'image'"
      class="block w-full h-auto"
      :src="block.image.filename"
      :alt="block.image.alt || ''"
      :width="500"
      :height="Math.round(storyblokImageDimensions(block.image.filename).height / storyblokImageDimensions(block.image.filename).width * 500)"
      quality="85"
      loading="lazy"
      :modifiers="{
        smart: true,
      }"
    />
  </div>
</template>
