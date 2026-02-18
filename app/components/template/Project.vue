<script lang="ts" setup>
import type { Project } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Project>
}

const { story } = defineProps<Props>()

const isHeroBlock = (index: number, indexFrom: number) => {
  return ['block_hero'].includes(story.content.blocks?.[index + indexFrom]?.component ?? '')
}

const isLastBlock = (index: number) => {
  return index === (story.content.blocks?.length ?? 0) - 1 && !isHeroBlock(index, 0)
}

const isBlockWithBgMedia = (index: number) => {
  const block = story.content.blocks?.[index]

  if (!block) {
    return false
  }

  return isBlockWithMedia(block) && ['block_testimonials', 'block_ticker', 'block_hover_list'].includes(block.component) && block.media?.[0]
}
</script>

<template>
  <UiTheme
    v-for="(block, index) in story.content.blocks"
    :key="block._uid"
    :theme="'theme' in block ? (block.theme as Themes) : undefined"
  >
    <div
      :class="{
        'py-(--app-vertical-spacing)': !isHeroBlock(index, 0) && !isBlockWithBgMedia(index),
        'pt-calc(var(--app-vertical-spacing)*1.5)': isHeroBlock(index, -1),
        'pb-calc(var(--app-vertical-spacing)*1.5)': isHeroBlock(index, 1) || (isLastBlock(index) && !isBlockWithBgMedia(index)),
      }"
    >
      <BlockGallery
        v-if="block.component === 'block_gallery'"
        :block="block"
      />

      <BlockHero
        v-else-if="block.component === 'block_hero'"
        :block="block"
        :headline-as="index === 0 ? 'h2' : 'h1'"
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
