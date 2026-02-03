<script lang="ts" setup>
import type { BlockTruths } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { TTruthsItem } from '@/components/ui/Truths.vue'

interface Props {
  block: BlockTruths
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-36"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
      :copy="block.copy"
      :cta="block.cta"
      :cta-title="block.cta_title"
      :cta-type="block.theme === 'dark' ? 'outline' : 'solid'"
    />

    <div class="wrapper-max">
      <UiTruths
        :item="({
          headline: block.bottom_headline,
          copy: block.bottom_copy,
          items: block.items,
        } as TTruthsItem)"
      />
    </div>
  </div>
</template>
