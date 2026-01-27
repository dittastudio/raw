<script lang="ts" setup>
import type { BlockBcorp } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

interface Props {
  block: BlockBcorp
}

const { block } = defineProps<Props>()
</script>

<template>
  <UiTheme
    v-editable="block"
    :theme="(block.theme as Themes)"
    class="flex flex-col gap-36"
  >
    <UiContent
      :title="block.title"
      :headline="block.headline"
      :cta="block.cta"
      :cta-title="block.cta_title"
      :cta-type="block.theme === 'dark' ? 'outline' : 'solid'"
    />

    <div class="wrapper-max grid grid-cols-(--app-grid) gap-x-(--app-inner-gutter) gap-y-20">
      <div class="col-span-full md:col-start-4 md:col-span-4">
        <div class="w-full max-w-[400px] max-md:mx-auto">
          <UiGraph
            :value1="Number(block.overall_score)"
            :value2="Number(block.qualify_score)"
            :value3="Number(block.median_score)"
          />
        </div>
      </div>

      <div
        v-if="storyblokRichTextContent(block.copy)"
        class="col-span-full md:col-start-9 md:col-span-4 [&_p]:max-w-[34ch]"
      >
        <StoryblokText :html="block.copy" />
      </div>
    </div>
  </UiTheme>
</template>
