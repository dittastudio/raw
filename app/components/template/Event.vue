<script lang="ts" setup>
import type { Event } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Event>
}

const { story } = defineProps<Props>()

const {
  checkBackgroundMatchesPrevBackground,
  checkBlockHasFullWidthBgMedia,
  checkMediaIsFull,
} = blockHelpers(story)
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
    <BlockBCorp
      v-if="block.component === 'block_bcorp'"
      :block="block"
    />

    <BlockProjectCarousel
      v-else-if="block.component === 'block_project_carousel'"
      :block="block"
    />

    <BlockEventOverview
      v-else-if="block.component === 'block_event_overview'"
      :block="block"
      :datetime="story.content.event_datetime"
    />

    <BlockEventText
      v-else-if="block.component === 'block_event_text'"
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

    <BlockHoverGrid
      v-else-if="block.component === 'block_hover_grid'"
      :block="block"
    />

    <BlockHoverList
      v-else-if="block.component === 'block_hover_list'"
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

    <BlockSplitText
      v-else-if="block.component === 'block_split_text'"
      :block="block"
    />

    <BlockTestimonials
      v-else-if="block.component === 'block_testimonials'"
      :block="block"
    />

    <BlockText
      v-else-if="block.component === 'block_text'"
      :block="block"
    />

    <BlockTicker
      v-else-if="block.component === 'block_ticker'"
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
