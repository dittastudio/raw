<script lang="ts" setup>
import type { BlockSplitText } from '#storyblok-components'

interface Props {
  block: BlockSplitText
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="
      wrapper-max
      flex
      flex-col
      gap-y-10
      md:gap-y-20
      [&_p]:type-h4
      [&_p]:text-wrap[balance]
      [&_p]:md:max-w-[24ch]
    "
  >
    <div
      v-for="(item, index) in block.items"
      :key="item._uid"
      class="
        col-span-full grid
        grid-cols-(--app-grid)
        gap-x-(--app-inner-gutter)
      "
    >
      <EffectTextReveal
        v-if="storyblokRichTextContent(item.copy)"
        :delay="500 * (index + 1)"
        class="prose col-span-3 sm:col-span-4 md:col-span-5"
        :class="index % 2 === 0 ? 'col-start-1 md:col-start-2' : 'col-start-2 sm:col-start-5 md:col-start-7'"
      >
        <StoryblokText :html="item.copy" />
      </EffectTextReveal>
    </div>
  </div>
</template>
