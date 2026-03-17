<script lang="ts" setup>
import type { PostImage } from '#storyblok-components'

interface Props {
  block: PostImage
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="w-full"
  >
    <NuxtImg
      v-if="block.image?.filename && storyblokAssetType(block.image.filename) === 'image'"
      class="block w-full h-auto"
      :src="block.image.filename"
      :alt="block.image.alt || ''"
      :width="storyblokImageDimensions(block.image.filename).width"
      :height="storyblokImageDimensions(block.image.filename).height"
      sizes="
        xs:100vw
        sm:100vw
        md:60vw
        lg:50vw
        xl:815px
      "
      loading="lazy"
    />
  </div>
</template>
