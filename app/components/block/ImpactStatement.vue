<script lang="ts" setup>
import type { BlockImpactStatement } from '#storyblok-components'

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
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
