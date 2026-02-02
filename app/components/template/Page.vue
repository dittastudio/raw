<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'
import type { ISbStoryData } from '@storyblok/js'
import type { TypedBlockMuxVideo } from '@/components/block/MuxVideo.vue'

interface Props {
  story: ISbStoryData<Page>
}

const { story } = defineProps<Props>()
</script>

<template>
  <UiTheme
    v-for="(block, index) in story.content.blocks"
    :key="block._uid"
    :theme="'theme' in block ? (block.theme as Themes) : undefined"
    :force="block.component === 'block_hero' || block.component === 'block_hero_brand'"
    :is-hero="block.component === 'block_hero' || block.component === 'block_hero_brand'"
    :is-after-hero="index > 0 && ['block_hero', 'block_hero_brand'].includes(story.content.blocks?.[index - 1]?.component ?? '')"
  >
    <section
      :class="{
        'py-(--app-vertical-spacing)': !['block_hero', 'block_hero_brand'].includes(block.component),
      }"
    >
      <BlockHero
        v-if="block.component === 'block_hero'"
        :block="block"
      />

      <BlockHeroBrand
        v-else-if="block.component === 'block_hero_brand'"
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

      <BlockPosts
        v-else-if="block.component === 'block_posts'"
        :block="block"
      />

      <BlockProjects
        v-else-if="block.component === 'block_projects'"
        :block="block"
      />

      <BlockTeam
        v-else-if="block.component === 'block_team'"
        :block="block"
      />

      <BlockTestimonials
        v-else-if="block.component === 'block_testimonials'"
        :block="block"
      />

      <BlockHoverList
        v-else-if="block.component === 'block_hover_list'"
        :block="block"
      />

      <BlockHoverGrid
        v-else-if="block.component === 'block_hover_grid'"
        :block="block"
      />

      <BlockCarousel
        v-else-if="block.component === 'block_carousel'"
        :block="block"
      />

      <BlockLogoWall
        v-else-if="block.component === 'block_logo_wall'"
        :block="block"
      />

      <BlockSplitText
        v-else-if="block.component === 'block_split_text'"
        :block="block"
      />

      <BlockContact
        v-else-if="block.component === 'block_contact'"
        :block="block"
      />

      <BlockTruths
        v-else-if="block.component === 'block_truths'"
        :block="block"
      />

      <BlockGallery
        v-else-if="block.component === 'block_gallery'"
        :block="block"
      />

      <BlockBCorp
        v-else-if="block.component === 'block_bcorp'"
        :block="block"
      />

      <BlockTicker
        v-else-if="block.component === 'block_ticker'"
        :block="block"
      />
    </section>
  </UiTheme>
</template>
