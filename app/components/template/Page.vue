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
      v-if="block.component === 'block_hero_brand'"
      :block="block"
    />

    <BlockImpactStatement
      v-if="block.component === 'block_impact_statement'"
      :block="block"
    />
  </AppSection>

  <UiCarousel
    :items="['1', '2', '3']"
    :options="{ loop: true }"
  >
    <template #item="{ item, index }">
      <div class="w-full h-60 bg-pink flex items-center justify-center">
        {{ item }} - {{ index + 1 }}
      </div>
    </template>
  </UiCarousel>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.section {
  &--block_impact_statement {
    padding-block: --spacing(35);
  }
}
</style>
