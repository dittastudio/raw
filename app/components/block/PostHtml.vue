<script lang="ts" setup>
import type { PostHtml } from '#storyblok-components'

interface Props {
  block: PostHtml
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-if="block.html"
    v-editable="block"
    v-html="block.html"
  />
</template>
