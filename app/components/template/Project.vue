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
  return ['block_testimonials', 'block_ticker', 'block_hover_list'].includes(story.content.blocks?.[index]?.component ?? '') && story.content.blocks?.[index]?.media?.[0]
}

const setForceTheme = (index: number) => {
  return isHeroBlock(index, 0)
}

const setRootMargin = (index: number) => {
  if (isHeroBlock(index, -1)) {
    return '-50% 0px -1px 0px'
  }
  else if (isHeroBlock(index, 0)) {
    return '-100% 0px 0px 0px'
  }
  else {
    return '-50% 0px -50% 0px'
  }
}
</script>

<template>
  <UiTheme
    v-for="(block, index) in story.content.blocks"
    :key="block._uid"
    :theme="'theme' in block ? (block.theme as Themes) : undefined"
    :force="setForceTheme(index)"
    :root-margin="setRootMargin(index)"
  >
    <template #default="{ isInView }">
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
          :is-in-view="isInView"
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
    </template>
  </UiTheme>
</template>
