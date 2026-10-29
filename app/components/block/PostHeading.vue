<script lang="ts" setup>
import type { Block } from '#storyblok-schema'

interface Props {
  block: Block<'post_heading'>
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
