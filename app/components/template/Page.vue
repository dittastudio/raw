<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Page>
}

const { story } = defineProps<Props>()

const blocks = computed(() => {
  return story.content.blocks?.map((block) => {
    const theme = ('theme' in block ? block.theme : undefined) as Themes | undefined

    return {
      ...block,
      theme: theme ?? 'light',
    }
  })
})
</script>

<template>
  <UiSection
    v-for="block in blocks"
    :key="block._uid"
    :theme="block.component === 'block_hover_list' ? 'light' : block.theme"
    :class="`section section--${block.component}`"
  >
    <BlockHero
      v-if="block.component === 'block_hero'"
      :block="block"
    />

    <BlockHeroBrand
      v-else-if="block.component === 'block_hero_brand'"
      :block="block"
    />

    <BlockImpactStatement
      v-else-if="block.component === 'block_impact_statement'"
      :block="block"
    />

    <BlockTestimonials
      v-if="block.component === 'block_testimonials'"
      :block="block"
    />

    <BlockHoverList
      v-else-if="block.component === 'block_hover_list'"
      :block="block"
    />
  </UiSection>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.section {
  &--block_impact_statement,
  &--block_hover_list,
  &--block_testimonials {
    padding-block: --spacing(35);
  }
}
</style>
