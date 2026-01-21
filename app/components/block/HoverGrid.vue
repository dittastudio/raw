<script lang="ts" setup>
import type { BlockHoverGrid } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockHoverGrid
}

const { block } = defineProps<Props>()

const items = computed(() => block.items ?? [])
const accent = computed(() => (block.accent as Themes) ?? 'light')
</script>

<template>
  <div
    v-editable="block"
    class="hover-list flex flex-col gap-y-20"
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

    <UiGrid
      v-if="items.length"
      :accent="accent"
      :items="items"
    />
  </div>
</template>
