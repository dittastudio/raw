<script lang="ts" setup>
import type { PostEmbed } from '#storyblok-components'

interface Props {
  block: PostEmbed
  name: string
}

const { block, name } = defineProps<Props>()

const { data: oembed, error } = await useAsyncData(
  () => `oembed-${block.url}`,
  async () => await $fetch('/api/oembed', {
    method: 'post',
    body: {
      url: block.url,
      name,
    },
  }),
)
</script>

<template>
  <div
    v-if="oembed && !error"
    v-editable="block"
    class="oembed overflow-hidden w-full"
    :style="{
      '--oembed-width': oembed.width || 16,
      '--oembed-height': oembed.height || 9,
    }"
    v-html="oembed.html"
  />
</template>

<style scoped>
@reference "@/assets/css/app.css";

.oembed {
  :deep(iframe) {
    width: 100%;
    aspect-ratio: calc(var(--oembed-width) / var(--oembed-height));
  }
}
</style>
