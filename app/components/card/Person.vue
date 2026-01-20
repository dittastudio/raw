<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'

interface Props {
  image?: StoryblokAsset
  name?: string | null
  position?: string | null
}

const { image, name, position } = defineProps<Props>()
</script>

<template>
  <div class="group grid grid-cols-1 grid-rows-1 place-items-end overflow-hidden">
    <div class="col-start-1 row-start-1 w-full aspect-3/4 overflow-hidden">
      <NuxtImg
        v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
        class="block size-full object-cover"
        :src="image.filename"
        :alt="image.alt || name"
        :width="400"
        :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 400)"
        quality="85"
        :modifiers="{
          smart: true,
        }"
      />
    </div>

    <div class="col-start-1 row-start-1 w-full bg-blue p-4 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
      <h5
        v-if="name"
        class="type-mono-14"
      >
        {{ name }}
      </h5>

      <p
        v-if="position"
        class="type-mono-14"
      >
        {{ position }}
      </p>
    </div>
  </div>
</template>
