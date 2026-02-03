<script lang="ts" setup>
import type { BlockTeam } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockTeam
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
      :copy="block.copy"
      :cta="block.cta"
      :cta-title="block.cta_title"
    />

    <div
      v-if="block.teams"
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
  </div>
</template>
