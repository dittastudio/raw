<script lang="ts" setup>
import type { Project } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'
import type { TypedBlockMuxVideo } from '@/components/block/MuxVideo.vue'

interface Props {
  story: ISbStoryData<Project>
}

const { story } = defineProps<Props>()
</script>

<template>
  <UiTheme
    v-for="(block, index) in story.content.blocks"
    :key="block._uid"
    :theme="'theme' in block ? (block.theme as Themes) : undefined"
    :force="setForcedTheme(block)"
    :is-hero="isHeroBlock(block)"
    :is-after-hero="index > 0 && ['block_hero', 'block_hero_brand'].includes(story.content.blocks?.[index - 1]?.component ?? '')"
  >
    <section
      :class="{
        'py-(--app-vertical-spacing)': !['block_hero', 'block_hero_brand', 'block_testimonials', 'block_ticker'].includes(block.component),
      }"
    >
      <BlockHero
        v-if="block.component === 'block_hero'"
        :block="block"
      />

      <BlockWorkText
        v-else-if="block.component === 'block_work_text'"
        :block="block"
      />

      <BlockGallery
        v-else-if="block.component === 'block_gallery'"
        :block="block"
      />

      <BlockTestimonials
        v-else-if="block.component === 'block_testimonials'"
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

      <BlockMuxVideo
        v-else-if="block.component === 'block_mux_video'"
        :block="(block as TypedBlockMuxVideo)"
      />

      <BlockMedia
        v-else-if="block.component === 'block_media'"
        :block="block"
      />
    </section>
  </UiTheme>
</template>
