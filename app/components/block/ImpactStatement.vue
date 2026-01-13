<script lang="ts" setup>
import type { BlockImpactStatement } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    class="impact-statement wrapper py-30"
  >
    <div
      v-for="item in block.items"
      :key="item._uid"
      class="z-1 flex flex-col items-center justify-center gap-10 text-center p-(--app-outer-gutter)"
    >
      <div
        v-if="storyblokRichTextContent(item.title)"
        class="impact-statement__headline"
      >
        <StoryblokText :html="item.title" />
      </div>

      <div
        v-if="storyblokRichTextContent(item.copy)"
        class="impact-statement__text"
      >
        <StoryblokText :html="item.copy" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.impact-statement {
  &__headline {
    :deep(h1) {
      @apply type-h1;
    }

    :deep(h2) {
      @apply type-h2;
    }

    :deep(h3) {
      @apply type-h3;
    }
  }

  &__text {
    :deep(p) {
      @apply type-h4;

      text-wrap: balance;
      max-width: 30em;
    }
  }
}
</style>
