<script lang="ts" setup>
import type { Project } from '#storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'

interface Props {
  story: ISbStoryData<Project>
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
      `section section--${block.component}`,
      {
        'section--same-background': checkBackgroundMatchesPrevBackground(index),
        'section--media-full': checkMediaIsFull(index) || checkBlockHasFullWidthBgMedia(index),
      },
    ]"
  >
    <BlockDivider
      v-if="block.component === 'block_divider'"
      :block="block"
    />

    <BlockGallery
      v-else-if="block.component === 'block_gallery'"
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

.section:not(.section--block_hero,.section--media-full,.section--block_divider) {
  padding-block: var(--app-vertical-spacing);
}

.section {
  &:not(.section--media-full,.section--block_hero) + &.section--same-background {
    padding-block-start: 0;
  }
}

.section.section--block_divider {
  background-color: transparent;
}
</style>
