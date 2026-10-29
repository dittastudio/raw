<script lang="ts" setup>
import type { Block } from '#storyblok-schema'

interface Props {
  block: Block<'post_quote'>
}

const { block } = defineProps<Props>()
</script>

<template>
  <figure
    v-if="storyblokRichTextContent(block.quote)"
    v-editable="block"
    class="flex flex-col gap-4"
  >
    <blockquote>
      <StoryblokText :html="block.quote" />
    </blockquote>

    <figcaption v-if="block.citation">
      <cite class="font-bold">{{ block.citation }}</cite>
    </figcaption>
  </figure>
</template>
