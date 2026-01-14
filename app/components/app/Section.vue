<script lang="ts" setup>
import type { BlockHero, BlockImpactStatement } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockHero | BlockImpactStatement
}

const { block } = defineProps<Props>()

console.log('Section block:', block)

// Will...don't apply the colours here...just update the vars. Colours should be within the blocks themselves.
// Cheers!
</script>

<template>
  <section>
    <slot />
  </section>
</template>
