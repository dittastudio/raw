<script lang="ts" setup>
import type { BlockImpactStatement } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()
</script>

<template>
  <div class="impact-statement wrapper-max">
    <div
      v-for="item in block.items"
      :key="item._uid"
      class="grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-20"
    >
      <div
        v-if="storyblokRichTextContent(item.title)"
        class="
          impact-statement__headline
          col-span-full
          sm:col-start-2
          sm:col-span-7
          md:col-start-2
          md:col-span-7
        "
      >
        <StoryblokText :html="item.title" />
      </div>

      <div
        v-if="storyblokRichTextContent(item.copy)"
        class="
          impact-statement__text
          row-start-2
          col-start-2
          col-span-3
          sm:col-start-5
          sm:col-span-4
          md:col-start-9
          md:col-span-4
          lg:col-start-9
          lg:col-span-3
        "
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
    :deep(h2, h3, h4) {
      @apply type-h2;

      text-wrap: balance;
    }
  }

  &__text {
    :deep(p) {
      @apply type-p;
      text-wrap: pretty;

      max-width: 24em;
    }

    :deep(p + p) {
      padding-top: 1.25em;
    }
  }
}
</style>
