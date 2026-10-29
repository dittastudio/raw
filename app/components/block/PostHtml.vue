<script lang="ts" setup>
import type { Block } from '#storyblok-schema'

interface Props {
  block: Block<'post_html'>
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
