<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Page>
}

const { story } = defineProps<Props>()
</script>

<template>
  <UiSection
    v-for="block in story.content.blocks"
    :key="block._uid"
    :theme="'theme' in block && block.theme ? block.theme as Themes : undefined"
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

    <BlockPosts
      v-else-if="block.component === 'block_posts'"
      :block="block"
    />

    <BlockTeam
      v-else-if="block.component === 'block_team'"
      :block="block"
    />

    <BlockTestimonials
      v-else-if="block.component === 'block_testimonials'"
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
  &--block_hover_list,
  &--block_impact_statement,
  &--block_team,
  &--block_testimonials {
    padding-block: --spacing(35);
  }
}
</style>
