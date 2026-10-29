<script lang="ts" setup>
import type { Block } from '#storyblok-schema'

interface Props {
  block: Block<'post_wistia'>
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
