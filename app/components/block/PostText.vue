<script lang="ts" setup>
import type { Block } from '#storyblok-schema'

interface Props {
  block: Block<'post_text'>
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-if="storyblokRichTextContent(block.text)"
    v-editable="block"
    class="prose-post w-full"
  >
    <StoryblokText :html="block.text" />
  </div>
</template>
