<script lang="ts" setup>
import type { Project } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Project>
}

const { story } = defineProps<Props>()

const checkBackgroundMatchesPrevBackground = (index: number) => {
  if (index === 0) {
    return false
  }

  const currentBlock = story.content.blocks?.[index]
  const prevBlock = story.content.blocks?.[index - 1]

  return currentBlock && prevBlock && 'theme' in currentBlock && 'theme' in prevBlock
    ? currentBlock.theme === prevBlock.theme
    : false
}

const checkBlockHasFullWidthBgMedia = (index: number) => {
  const block = story.content.blocks?.[index]

  if (!block) {
    return false
  }

  return isBlockWithMedia(block) && ['block_testimonials', 'block_ticker', 'block_hover_list'].includes(block.component) && block.media?.[0]
}

const checkMediaIsFull = (index: number) => {
  const block = story.content.blocks?.[index]

  if (!block) {
    return false
  }

  return isBlockWithMedia(block) && 'placement' in block && block.placement === 'full'
}
</script>

<template>
  <UiTheme
    v-for="(block, index) in story.content.blocks"
    :key="block._uid"
    :theme="'theme' in block ? (block.theme as Themes) : undefined"
    :class="[
      `block block--${block.component}`,
      {
        'block--same-background': checkBackgroundMatchesPrevBackground(index),
        'block--media-full': checkMediaIsFull(index) || checkBlockHasFullWidthBgMedia(index),
      },
    ]"
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

    <BlockProjectsSelected
      v-else-if="block.component === 'block_projects_selected'"
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
  </UiTheme>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.block:not(.block--block_hero,.block--media-full) {
  padding-block: var(--app-vertical-spacing);
}

.block {
  &:not(.block--media-full,.block--block_hero) + &.block--same-background {
    padding-block-start: 0;
  }
}
</style>
