<script lang="ts" setup>
import type { BlockText } from '@@/.storyblok/types/289672313529140/storyblok-components'

interface Props {
  block: BlockText
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="w-full"
    :class="block.background"
  >
    <div
      class="@container wrapper grid gap-x-(--app-fluid-gutter) gap-y-12 grid-cols-2 md:grid-cols-12"
      :class="{
        'pt-12 md:pt-24': block.spacing_top,
        'pb-12 md:pb-24': block.spacing_bottom,
      }"
    >
      <div
        class="col-span-full md:col-span-6 flex flex-col gap-6"
        :class="{
          'md:col-start-7': block.layout === 'right',
        }"
      >
        <h3
          v-if="block.headline"
          class="font-display text-20 @xl:text-24 opacity-40"
        >
          {{ block.headline }}
        </h3>

        <div
          v-if="storyblokRichTextContent(block.text)"
          class="text-pretty text-16 @xl:text-20"
        >
          <StoryblokText :html="block.text" />
        </div>
      </div>
    </div>
  </div>
</template>
