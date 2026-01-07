<script lang="ts" setup>
import type {
  Page,
  Project,
} from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  content: Page | Project
}

const { content } = defineProps<Props>()
</script>

<template>
  <div>
    <section
      v-for="block in content.blocks"
      :key="block._uid"
    >
      <BlockText
        v-if="block.component === 'block_text'"
        :block="block"
      />
    </section>
  </div>
</template>
