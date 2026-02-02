<script lang="ts" setup>
import type { BlockImpactStatement } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    data-component="impact-statement"
    class="flex flex-col gap-36"
  >
    <UiContent
      v-for="item in block.items"
      :key="item._uid"
      :headline="item.title"
      :copy="item.copy"
    />
  </div>
</template>
