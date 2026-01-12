<script lang="ts" setup>
import type { ISbStoryData } from '@storyblok/js'
import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  story: ISbStoryData<Page>
}

const { story } = defineProps<Props>()
</script>

<template>
  <section
    v-for="block in story.content.blocks"
    :key="block._uid"
  >
    <BlockHero
      v-if="block.component === 'block_hero'"
      :block="block"
    />
  </section>
</template>