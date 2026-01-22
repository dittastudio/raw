<script lang="ts" setup>
import type { BlockImpactStatement } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()
</script>

<template>
  <UiTheme
    v-editable="block"
    :theme="(block.theme as Themes)"
    class="flex flex-col gap-36"
  >
    <UiContent
      v-for="item in block.items"
      :key="item._uid"
      :headline="item.title"
      :copy="item.copy"
    />
  </UiTheme>
</template>
