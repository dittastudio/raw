<script lang="ts" setup>
import type { BlockTeam } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockTeam
}

const { block } = defineProps<Props>()
</script>

<template>
  <div v-editable="block">
    <pre>{{ block }}</pre>
  </div>
</template>
