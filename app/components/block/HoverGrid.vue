<script lang="ts" setup>
import type { BlockHoverGrid } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockHoverGrid
}

const { block } = defineProps<Props>()

const items = computed(() => block.items ?? [])
const theme = computed(() => (block.theme as Themes) ?? 'light')
const accent = computed(() => (block.accent as Themes) ?? 'light')
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-y-20"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
      :copy="block.copy"
      :cta="block.cta"
      :cta-title="block.cta_title"
      :cta-type="block.theme === 'dark' ? 'outline' : 'solid'"
      :cta-theme="theme"
    />

    <UiGrid
      v-if="items.length"
      :theme="theme"
      :accent="accent"
      :items="items"
    />
  </div>
</template>
