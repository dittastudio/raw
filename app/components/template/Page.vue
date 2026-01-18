<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Page>
}

const { story } = defineProps<Props>()
</script>

<template>
  <AppSection
    v-for="block in story.content.blocks"
    :key="block._uid"
    :block="block"
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
  </AppSection>
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
