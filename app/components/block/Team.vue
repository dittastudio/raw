<script lang="ts" setup>
import type { BlockTeam } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockTeam
}

const { block } = defineProps<Props>()
// const theme = computed<Themes>(() => (block.theme as Themes) ?? 'light')
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
      :cta="
        block.cta
          ? {
            ...block.cta,
            title: block.cta_title ?? block.cta.title,
          }
          : undefined
      "
    />

    <div
      v-if="block.teams"
      class="wrapper-max grid gap-35"
    >
      <UiTeam
        v-for="team in block.teams"
        :key="team._uid"
        :title="team.title"
        :people="team.people"
        :accent="block.accent as Themes"
      />
    </div>
  </div>
</template>
