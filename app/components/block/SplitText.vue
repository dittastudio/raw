<script lang="ts" setup>
import type { BlockSplitText } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockSplitText
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="
      split-text
      wrapper-max
      flex
      flex-col
      gap-y-10
      md:gap-y-20
    "
  >
    <div
      v-for="(item, index) in block.items"
      :key="item._uid"
      class="
        col-span-full grid
        grid-cols-(--app-grid)
        gap-x-(--app-inner-gutter)
      "
    >
      <div
        v-if="storyblokRichTextContent(item.copy)"
        class="col-span-3 sm:col-span-4 md:col-span-5"
        :class="index % 2 === 0 ? 'col-start-1 md:col-start-2' : 'col-start-2 sm:col-start-5 md:col-start-7'"
      >
        <StoryblokText :html="item.copy" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.split-text {
  :deep(p) {
    @apply type-h4;

    text-wrap: balance;

    @variant md {
      max-width: 30ch;
    }
  }

  :deep(p + p) {
    padding-top: 1.25em;
  }
}
</style>
