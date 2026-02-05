<script lang="ts" setup>
import type { Project } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Project>
}

const { story } = defineProps<Props>()

const isHeroBlock = (index: number, indexFrom: number) => {
  return ['block_hero', 'block_hero_brand'].includes(story.content.blocks?.[index + indexFrom]?.component ?? '')
}

const isLastBlock = (index: number) => {
  return index === (story.content.blocks?.length ?? 0) - 1 && !isHeroBlock(index, 0)
}
</script>

<template>
  <UiTheme
    v-for="(block, index) in story.content.blocks"
    :key="block._uid"
    :theme="'theme' in block ? (block.theme as Themes) : undefined"
    :force="isHeroBlock(index, 0)"
    :root-margin="isHeroBlock(index, -1) ? '-50% 0px -1px 0px' : isHeroBlock(index, 0) ? '-100% 0px 0px 0px' : '-50% 0px -50% 0px'"
  >
    <div
      :class="{
        'py-(--app-vertical-spacing)': !isHeroBlock(index, 0),
        'pt-calc(var(--app-vertical-spacing)*1.5)': isHeroBlock(index, -1),
        'pb-calc(var(--app-vertical-spacing)*1.5)': isHeroBlock(index, 1) || isLastBlock(index),
      }"
    >
      <BlockGallery
        v-if="block.component === 'block_gallery'"
        :block="block"
      />

      <BlockHero
        v-else-if="block.component === 'block_hero'"
        :block="block"
      />

      <BlockImpactDetails
        v-else-if="block.component === 'block_impact_details'"
        :block="block"
      />

      <BlockImpactStatement
        v-else-if="block.component === 'block_impact_statement'"
        :block="block"
      />

      <BlockMedia
        v-else-if="block.component === 'block_media'"
        :block="block"
      />

      <BlockTestimonials
        v-else-if="block.component === 'block_testimonials'"
        :block="block"
      />

      <BlockTruths
        v-else-if="block.component === 'block_truths'"
        :block="block"
      />

      <BlockWorkText
        v-else-if="block.component === 'block_work_text'"
        :block="block"
      />
    </div>
  </UiTheme>
</template>
