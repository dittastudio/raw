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
      <div class="w-full h-60 bg-pink flex flex-col items-start justify-end wrapper">
        {{ item }} - {{ index + 1 }}

        <h4 class="type-h4">
          this is a title
        </h4>

        <p class="type-p">
          this is a description
        </p>
      </div>
    </template>

    <template #other>
      <div class="absolute inset-0 flex items-end justify-start wrapper pointer-events-none">
        <div class="pointer-events-auto">
          <UiCarouselDots />
        </div>
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
