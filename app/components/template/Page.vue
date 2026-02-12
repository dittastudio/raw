<script lang="ts" setup>
import type { Page } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Page>
}

const { story } = defineProps<Props>()

const isHeroBlock = (index: number, indexFrom: number) => {
  return ['block_hero', 'block_hero_brand'].includes(story.content.blocks?.[index + indexFrom]?.component ?? '')
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
          'pt-[calc(var(--app-vertical-spacing)*1.5)]': isHeroBlock(index, -1),
          'pb-[calc(var(--app-vertical-spacing)*1.5)]': isHeroBlock(index, 1) || (isLastBlock(index) && !isBlockWithBgMedia(index)),
        }"
      >
        <BlockBCorp
          v-if="block.component === 'block_bcorp'"
          :block="block"
        />

        <BlockCarousel
          v-else-if="block.component === 'block_carousel'"
          :block="block"
        />

        <BlockContact
          v-else-if="block.component === 'block_contact'"
          :block="block"
        />

        <BlockGallery
          v-else-if="block.component === 'block_gallery'"
          :block="block"
        />

        <BlockHero
          v-else-if="block.component === 'block_hero'"
          :block="block"
          :name="story.name"
        />

        <BlockHeroBrand
          v-else-if="block.component === 'block_hero_brand'"
          :block="block"
        />

        <BlockHoverGrid
          v-else-if="block.component === 'block_hover_grid'"
          :block="block"
        />

        <BlockHoverList
          v-else-if="block.component === 'block_hover_list'"
          :block="block"
          :is-in-view="isInView"
        />

        <BlockImpactDetails
          v-else-if="block.component === 'block_impact_details'"
          :block="block"
        />

        <BlockImpactStatement
          v-else-if="block.component === 'block_impact_statement'"
          :block="block"
        />

        <BlockLogoWall
          v-else-if="block.component === 'block_logo_wall'"
          :block="block"
        />

        <BlockMedia
          v-else-if="block.component === 'block_media'"
          :block="block"
        />

        <BlockNextEvent
          v-else-if="block.component === 'block_next_event'"
          :block="block"
        />

        <BlockPastEvents
          v-else-if="block.component === 'block_past_events'"
          :block="block"
        />

        <BlockPosts
          v-else-if="block.component === 'block_posts'"
          :block="block"
        />

        <BlockProjects
          v-else-if="block.component === 'block_projects'"
          :block="block"
        />

        <BlockSplitText
          v-else-if="block.component === 'block_split_text'"
          :block="block"
        />

        <BlockTeam
          v-else-if="block.component === 'block_team'"
          :block="block"
        />

        <BlockTestimonials
          v-else-if="block.component === 'block_testimonials'"
          :block="block"
          :is-in-view="isInView"
        />

        <BlockText
          v-else-if="block.component === 'block_text'"
          :block="block"
        />

        <BlockTicker
          v-else-if="block.component === 'block_ticker'"
          :block="block"
          :is-in-view="isInView"
        />

        <BlockTruths
          v-else-if="block.component === 'block_truths'"
          :block="block"
        />
      </div>
    </template>
  </UiTheme>
</template>
