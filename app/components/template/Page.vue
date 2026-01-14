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

    <BlockImpactStatement
      v-if="block.component === 'block_impact_statement'"
      :block="block"
    />
  </AppSection>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.section {
  &--block_impact_statement {
    padding-block: 120px;
  }
}
</style>
