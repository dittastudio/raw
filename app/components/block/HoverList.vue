<script lang="ts" setup>
import type { BlockHoverList } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockHoverList
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="hover-list"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
      :copy="block.copy"
      :cta="
        block.cta
          ? {
            ...block.cta,
            title: block.cta_title ?? block.cta.title,
          }
          : undefined
      "
    />
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.impact-statement__item {
  & + & {
    margin-block-start: --spacing(30);

    @variant lg {
      margin-block-start: --spacing(60);
    }
  }
}

.impact-statement__headline {
  :deep(h2, h3, h4) {
    @apply type-h2;

    text-wrap: balance;
  }
}

.impact-statement__text {
  :deep(p) {
    @apply type-p;
    text-wrap: pretty;

    max-width: 24em;
  }

  :deep(p + p) {
    padding-top: 1.25em;
  }
}
</style>
