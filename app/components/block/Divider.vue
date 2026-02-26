<script lang="ts" setup>
import type { BlockDivider } from '#storyblok-components'

interface Props {
  block: BlockDivider
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    :class="{
      'wrapper-max grid gap-x-(--app-inner-gutter) grid-cols-(--app-grid)': block.placement !== 'full',
      'divider__spacing': block.spacing_top || block.spacing_bottom,
      'divider__spacing--top': block.spacing_top,
      'divider__spacing--bottom': block.spacing_bottom,
    }"
  >
    <div
      class="bg-current h-px"
      :class="{
        'col-span-full': block.placement !== 'full',
        'md:col-start-2 md:col-span-10': block.placement === 'inset',
      }"
    />
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.divider__spacing {
  --spacing-top-px: calc(v-bind(block.spacing_top) * 1px);
  --spacing-bottom-px: calc(v-bind(block.spacing_bottom) * 1px);

  --spacing-top: calc(var(--spacing-top-px) / 2);
  --spacing-bottom: calc(var(--spacing-bottom-px) / 2);

  @variant md {
    --spacing-top: var(--spacing-top-px);
    --spacing-bottom: var(--spacing-bottom-px);
  }
}

.divider__spacing--top {
  padding-block-start: var(--spacing-top);
}

.divider__spacing--bottom {
  padding-block-end: var(--spacing-bottom);
}
</style>
