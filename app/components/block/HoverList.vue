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
    class="hover-list flex flex-col gap-y-30"
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

    <UiList
      :items="block.items"
    />
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";
</style>
