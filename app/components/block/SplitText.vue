<script lang="ts" setup>
import type { BlockSplitText } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockSplitText
}

const { block } = defineProps<Props>()
</script>

<template>
  <UiTheme
    v-editable="block"
    :theme="(block.theme as Themes)"
    class="wrapper-max split-text flex flex-col gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
  >
    <template
      v-for="(item, index) in block.items"
      :key="item._uid"
    >
      <div
        v-if="storyblokRichTextContent(item.copy)"
        class="md:w-[calc(50%-var(--app-inner-gutter)/2)]"
        :class="{
          'md:ml-auto': index % 2 !== 0,
        }"
      >
        <StoryblokText :html="item.copy" />
      </div>
    </template>
  </UiTheme>
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
