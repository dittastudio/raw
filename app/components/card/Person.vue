<script lang="ts" setup>
import type { StoryblokAsset } from '@@/.storyblok/types/storyblok'
import type { Themes } from '@@/types/app'

interface Props {
  image?: StoryblokAsset
  name?: string | null
  position?: string | null
  accent: Themes
}

const { image, name, position, accent } = defineProps<Props>()
</script>

<template>
  <div class="group relative items-start overflow-hidden h-full">
    <div class="w-full aspect-3/4 overflow-hidden">
      <NuxtImg
        v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
        class="block size-full object-cover"
        :src="image.filename"
        :alt="image.alt || name"
        :width="300"
        :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 300)"
      />
    </div>

    <div
      class="
        only-hover:absolute
        only-hover:bottom-0
        only-hover:left-0
        only-hover:right-0
        flex
        flex-col
        gap-1
        w-full
        only-touch:h-full
        p-4
        only-hover:transition-transform
        only-hover:duration-300
        only-hover:ease-out
        only-hover:translate-y-full
        group-hover:translate-y-0
      "
      :class="getThemeClasses[accent]"
    >
      <h5
        v-if="name"
        class="type-mono-14 font-bold"
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
