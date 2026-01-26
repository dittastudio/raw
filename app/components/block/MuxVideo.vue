<script lang="ts" setup>
import type { BlockMuxVideo } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockMuxVideo
}

const { block } = defineProps<Props>()
</script>

<template>
  <pre>{{ block }}</pre>
</template>
