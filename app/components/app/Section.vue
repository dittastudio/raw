<script lang="ts" setup>
import type { BlockHero, BlockImpactStatement } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockHero | BlockImpactStatement
}

const { block } = defineProps<Props>()

console.log('Section block:', block)
</script>

<template>
  <section>
    <slot />
  </section>
</template>
