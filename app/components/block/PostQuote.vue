<script lang="ts" setup>
import type { PostQuote } from '#storyblok-components'

interface Props {
  block: PostQuote
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
