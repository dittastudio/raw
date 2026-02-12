<script lang="ts" setup>
import type { PostWistia } from '#storyblok-components'

interface Props {
  block: PostWistia
}

const { block } = defineProps<Props>()
</script>

<template>
  <iframe
    v-if="block.id"
    :src="`https://fast.wistia.net/embed/iframe/${block.id}?seo=false&videoFoam=true`"
    allow="autoplay; fullscreen"
    frameborder="0"
    scrolling="no"
    class="w-full aspect-video"
  />
</template>
