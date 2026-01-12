<script lang="ts" setup>
import type { PostText } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: PostText
}

const { block } = defineProps<Props>()
</script>

<template>
  <div v-if="storyblokRichTextContent(block.text)">
    <StoryblokText :html="block.text" />
  </div>
</template>
