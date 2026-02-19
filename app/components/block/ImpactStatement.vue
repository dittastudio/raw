<script lang="ts" setup>
import type { BlockImpactStatement } from '#storyblok-components'

interface Props {
  block: BlockImpactStatement
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="flex flex-col gap-36"
  >
    <div
      v-for="item in block.items"
      :key="item._uid"
      class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-10 md:gap-y-20"
    >
      <div
        v-if="storyblokRichTextContent(item.title)"
        class="md:col-start-2 col-span-full sm:col-start-2 sm:col-span-7 md:col-span-9 [&_h3]:type-h2 [&_h3]:text-wrap[balance] [&_h3]:max-w-[20ch]"
      >
        <StoryblokText :html="item.title" />
      </div>

      <div
        v-if="storyblokRichTextContent(item.copy)"
        class="prose-p flex flex-col gap-10 items-start"
        :class="{
          'col-start-2 col-span-3 sm:col-start-5 sm:col-span-4 md:col-start-9 md:col-span-4 lg:col-start-9 lg:col-span-3': storyblokRichTextContent(item.copy),
          'col-start-1 col-span-full md:col-start-4': !storyblokRichTextContent(item.copy),
        }"
      >
        <div v-if="storyblokRichTextContent(item.copy)">
          <StoryblokText :html="item.copy" />
        </div>
      </div>
    </div>
  </div>
</template>
