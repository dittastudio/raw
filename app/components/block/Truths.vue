<script lang="ts" setup>
import type { Block } from '#storyblok-schema'
import type { TTruthsItem } from '@/components/ui/Truths.vue'
import type { Themes } from '@/types/app'

interface Props {
  block: Block<'block_truths'>
}

const { block } = defineProps<Props>()

const theme = computed(() => (block.theme as Themes) ?? 'light')
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-36 contain-layout"
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

    <div class="wrapper-max">
      <UiTruths
        :item="({
          headline: block.bottom_headline,
          copy: block.bottom_copy,
          items: block.items,
        } as TTruthsItem)"
        :theme="theme"
      />
    </div>
  </div>
</template>
