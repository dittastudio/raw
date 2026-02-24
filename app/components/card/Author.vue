<script lang="ts" setup>
import type { StoryblokAsset } from '#storyblok-types'

interface Props {
  name?: string | null
  image?: StoryblokAsset
  date?: string | null
  size?: 'small' | 'large'
}

const { name, image, date, size = 'large' } = defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center justify-start"
    :class="{
      'gap-6': size === 'large',
      'gap-3': size === 'small',
    }"
  >
    <div
      v-if="image?.filename && storyblokAssetType(image.filename) === 'image'"
      class="rounded-full overflow-hidden"
      :class="{
        'size-18': size === 'large',
        'size-12': size === 'small',
      }"
    >
      <NuxtImg
        class="block size-full object-cover rounded-full"
        :src="image.filename"
        :alt="image.alt || name || ''"
        :width="100"
        :height="Math.round(storyblokImageDimensions(image.filename).height / storyblokImageDimensions(image.filename).width * 100)"
        loading="lazy"
      />
    </div>

    <div>
      <p
        v-if="name"
        class="font-bold"
        :class="{
          'type-mono-14': size === 'small',
        }"
      >
        {{ name }}
      </p>

      <time
        v-if="date"
        :datetime="date"
        :class="{
          'type-mono-14': size === 'small',
        }"
      >
        {{ formatDateEditorial(date) }}
      </time>
    </div>
  </div>
</template>
