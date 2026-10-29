<script lang="ts" setup>
import type { Block } from '#storyblok-schema'
import type { Themes } from '@/types/app'

interface Props {
  block: Block<'block_team'>
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="wrapper-max grid gap-18 md:gap-36"
  >
    <UiTeam
      v-for="team in block.teams"
      :key="team._uid"
      :title="team.title"
      :people="team.people"
      :accent="(block.accent as Themes)"
    />
  </div>
</template>
