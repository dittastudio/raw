<script lang="ts" setup>
import type { BlockTeam } from '#storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockTeam
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-if="block.teams"
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
