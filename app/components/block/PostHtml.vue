<script lang="ts" setup>
import type { PostHtml } from '@@/.storyblok/types/289672313529140/storyblok-components'

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
