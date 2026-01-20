<script lang="ts" setup>
import type { PostHeading } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: PostHeading
}

const { block } = defineProps<Props>()
</script>

<template>
  <h3
    v-editable="block"
    class="type-h5"
  >
    {{ block.heading }}
  </h3>
</template>
