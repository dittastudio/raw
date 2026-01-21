<script lang="ts" setup>
import type { BlockImpactDetails } from '@@/.storyblok/types/289672313529140/storyblok-components'
// import type { Themes } from '@@/types/app'

interface Props {
  block: BlockImpactDetails
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="grid gap-y-35"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
    />

    <!-- <pre>{{ block }}</pre> -->
  </div>
</template>
