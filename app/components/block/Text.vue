<script lang="ts" setup>
import type { Block } from '#storyblok-schema'

interface Props {
  block: Block<'block_text'>
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max max-w-screen-lg"
  >
    <div
      v-if="storyblokRichTextContent(block.copy)"
      class="prose-all"
    >
      <StoryblokText :html="block.copy" />
    </div>
  </div>
</template>
