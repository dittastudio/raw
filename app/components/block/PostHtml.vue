<script lang="ts" setup>
import type { PostHtml } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: PostHtml
}

const { block } = defineProps<Props>()
</script>

<template>
  <div>
    {{ block }}
  </div>
</template>
