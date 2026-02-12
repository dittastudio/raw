<script lang="ts" setup>
import type { PostText } from '#storyblok-components'

interface Props {
  block: PostText
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
