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
