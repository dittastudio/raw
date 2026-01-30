<script lang="ts" setup>
import type { Project } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { ISbStoryData } from '@storyblok/js'
import type { TypedBlockMuxVideo } from '@/components/block/MuxVideo.vue'

interface Props {
  story: ISbStoryData<Project>
}

const { story } = defineProps<Props>()
</script>

<template>
  <section
    v-for="block in story.content.blocks"
    :key="block._uid"
    :class="{
      'py-20 md:py-36': !['block_hero', 'block_hero_brand', 'block_testimonials', 'block_ticker'].includes(block.component),
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

    <BlockMuxVideo
      v-else-if="block.component === 'block_mux_video'"
      :block="(block as TypedBlockMuxVideo)"
    />

    <BlockImpactStatement
      v-else-if="block.component === 'block_impact_statement'"
      :block="block"
    />
  </section>
</template>
